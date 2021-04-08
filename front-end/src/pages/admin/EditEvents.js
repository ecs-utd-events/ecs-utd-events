import React, { useEffect, useState, useContext, createRef } from "react";

import FullCalendar, { isArraysEqual } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Row, Col, Table } from 'react-bootstrap';

import AdminLayout from "../../components/AdminLayout";
import EditableEventCard, { LoadingEventCard } from '../../components/EditableEventCard';
import CustomButton from '../../components/CustomButton';
import { UserContext } from "../../providers/UserProvider";
import { parseEventsToFullCalendarFormat, formatFCEventToDB } from "../../components/FullCalendarUtils";
import { eventCardFormatToISO, getFormattedTime, lastUpdatedToISO } from '../../components/TimeUtils';
import NonEditableEventCard from "../../components/NonEditableEventCard";
import { sortTagsAlphabetically } from "../HomeFilters"

async function sortedEventInsert(sortedEventArr, newEvent) {
    const apparentIndex = binarySearch(sortedEventArr, newEvent, 0, sortedEventArr.length);
    sortedEventArr.splice(apparentIndex, 0, newEvent)
    return sortedEventArr
}

function binarySearch(sortedArr, x, start, end) {
    if (start >= sortedArr.length) return sortedArr.length
    if (end < start) return end + 1;
    const mid = Math.floor((start + end) / 2);
    const midDate = new Date(sortedArr[mid].start);
    const xDate = new Date(x.start);
    if (midDate.getTime() === xDate.getTime()) {
        return mid;
    }
    if (midDate < xDate) {
        return binarySearch(sortedArr, x, mid + 1, end);
    }
    if (midDate > xDate) {
        return binarySearch(sortedArr, x, start, mid - 1);
    }
}

function removeTagIds(allTags) {
    var tagNamesOnly = [];
    for (var i = 0; i < allTags.length; i++) {
        tagNamesOnly.push(allTags[i].name);
    }
    return tagNamesOnly;
}

export default function EditEvents() {
    const { org } = useContext(UserContext);
    const [allEvents, setAllEvents] = useState(null);
    const [myEvents, setMyEvents] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [allTags, setAllTags] = useState([]);
    let calendarRef = createRef();

    useEffect(() => {
        // GET request for all events using fetch inside useEffect React hook
        if (org != null) {
            fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/events/all')
                .then(response => response.json())
                .then(data => parseEventsToFullCalendarFormat(data))
                .then(parsedEvents =>
                    parsedEvents.map((event) => {
                        if (org != null && event.extendedProps.org.find(eventOrg => eventOrg === org.uId) != null) {
                            event.display = "block"
                            event.color = "var(--primaryshade1)"
                        }
                        return event;
                    })
                )
                .then(data => setAllEvents(data))
                .catch(error => {
                    console.error('There was an error fetching events!', error);
                });
        }
    }, [org]);

    useEffect(() => {
        if (allEvents != null && org != null) {
            let myEventsTemp = allEvents.filter((event) => event.extendedProps.org.some((orgId) => orgId === org.uId))
            myEventsTemp = myEventsTemp.reverse()
            setMyEvents(myEventsTemp);
        }
    }, [allEvents, org])

    useEffect(() => {
        fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/tags/all')
            .then(response => response.json())
            .then(data => sortTagsAlphabetically(data))
            .then(sortedTags => removeTagIds(sortedTags))
            .then(tagNames => setAllTags(tagNames))
            .catch(error => {
                console.error('There was an error fetching tags!', error);
            });
    }, [])

    const setIsEditingHelper = newValue => {
        if (selectedEvent != null && selectedEvent.id === '' && !newValue) {
            setSelectedEvent(null);
            setIsEditing(newValue);
        } else {
            setIsEditing(newValue);
        }
    }

    const addEvent = event => {
        event.preventDefault();
        setIsEditing(true);
        setSelectedEvent(
            {
                id: '',
                title: '',
                date: '',
                startTime: '',
                endTime: '',
                description: '',
                orgs: [],
                location: '',
                link: ''
            }
        );
    };

    const deleteEvent = (id) => {
        if (id !== '') {
            fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/events/' + id, {
                method: 'DELETE',
            })
                .then(response => {
                    console.log(response)
                    return allEvents.filter(event => event.id !== id);
                })
                .then(updatedEvents => {
                    setAllEvents(updatedEvents);
                    setSelectedEvent(null);
                })
        }
    }

    async function saveEventHelper(currEvents, eventToAddBody) {

        setSelectedEvent(eventToAddBody);

        let newEvent = parseEventsToFullCalendarFormat([eventToAddBody])[0]
        newEvent.display = "block"
        newEvent.color = "var(--primaryshade1)"

        sortedEventInsert(currEvents, newEvent).then(updatedEvents => {
            setAllEvents([...updatedEvents])

            if (updatedEvents != null && org != null) {
                let myEventsTemp = updatedEvents.filter((event) => event.extendedProps.org.some((orgId) => orgId === org.uId))
                myEventsTemp = myEventsTemp.reverse()
                setMyEvents(myEventsTemp);
            }
            setIsEditing(false);
            return updatedEvents
        });
    }

    const saveEvent = (event, id, orgId, setLoading) => {
        setLoading(true);
        event.orgs.unshift(orgId);
        var body = {
            "description": event.description,
            "endTime": eventCardFormatToISO(event.date, event.endTime),
            "id": id,
            "orgs": event.orgs,
            "lastUpdated": lastUpdatedToISO(),
            "startTime": eventCardFormatToISO(event.date, event.startTime),
            "title": event.title,
            "location": event.location,
            "tags": event.tags
        };

        if (event.link != null && event.link !== '') {
            body.link = event.link;
        }


        if (id !== '') {
            fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/events', {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    return allEvents.filter(event => event.id !== id)
                })
                .then(filteredEvents => {
                    return saveEventHelper(filteredEvents, body)
                })
                .then(_ => {
                    setLoading(false);
                })
                .catch(
                    error => {
                        console.error('There was an error editing the event.', error)
                    });
        }
        else {
            fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/events', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => {
                    return response.text()
                }).then(newId => {
                    body.id = newId;
                    return saveEventHelper(allEvents, body)
                })
                .then(_ => {
                    setLoading(false);
                })
                .catch(
                    error => {
                        console.error('There was an error adding a new Event', error)
                    }
                );
        }
    }

    const changeCalendarView = (dateStr) => {
        calendarRef.current.getApi().changeView(calendarRef.current.getApi().view.type, dateStr);
    }

    const EventCard = () => {
        if (isEditing || (selectedEvent != null && selectedEvent.orgs.find(collaborator => collaborator === org.uId) != null)) {
            return <EditableEventCard event={selectedEvent} tags={allTags} isEditing={isEditing} setIsEditing={setIsEditingHelper} deleteEvent={deleteEvent} changeCalendarView={changeCalendarView} saveEvent={saveEvent}></EditableEventCard>
        }
        else {
            return <NonEditableEventCard event={selectedEvent} />
        }
    }

    if (org != null) {
        return (
            <AdminLayout pageName="Events">
                <div style={{ padding: "1rem" }} />
                <Row>
                    <Col className="p-0" xs={3} sm={4}>
                        <div className="my-events-header">
                            <div>
                                <h3>My Events</h3>
                            </div>
                            <div className="d-flex justify-content-end flex-grow-1">
                                <CustomButton primary onClick={addEvent} disabled={isEditing}>
                                    <h5 className="m-0">Add Event</h5>
                                </CustomButton>
                            </div>
                        </div>
                        {myEvents != null &&
                            <div className="my-events-table-wrapper">
                                <Table striped hover={myEvents != null && myEvents.length > 0} responsive>
                                    <thead>
                                        <tr>
                                            <th className="date-cell">Date</th>
                                            <th className="time-cell">Time</th>
                                            <th className="name-cell">Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myEvents.map((event) => {
                                            return (
                                                <tr key={event.id} onClick={(e) => {
                                                    var dbEvent = formatFCEventToDB(event)
                                                    changeCalendarView(event.start)
                                                    setSelectedEvent(dbEvent)
                                                    setIsEditing(false)
                                                }}>
                                                    <td className="date-cell">{new Date(event.start).toLocaleDateString()}</td>
                                                    <td className="time-cell">{getFormattedTime(event.start)} - {getFormattedTime(event.end)}</td>
                                                    <td className="name-cell">{event.title}</td>
                                                </tr>
                                            )
                                        })}
                                        {myEvents.length === 0 &&
                                            <tr style={{ height: '100%' }}>
                                                <div className="d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
                                                    <h4 style={{ color: "var(--gray3)" }}>No Events To Display</h4>
                                                </div>
                                            </tr>
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        }
                    </Col>
                    <Col className="p-0">
                        <div className="fullcalendar-wrapper admin">
                            <FullCalendar
                                ref={calendarRef}
                                initialView="dayGridMonth"
                                plugins={[dayGridPlugin, timeGridPlugin]}
                                headerToolbar={{
                                    left: 'prev,next today',
                                    center: 'title',
                                    right: 'dayGridMonth,timeGridWeek'
                                }}
                                height="100%"
                                scrollTime='08:00:00'
                                events={allEvents}
                                eventClick={(info) => {
                                    var event = formatFCEventToDB(info.event)
                                    setSelectedEvent(event)
                                    setIsEditing(false)
                                }}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="px-5 mx-5">
                        {allEvents != null ?
                            <EventCard />
                            :
                            <div>
                                <LoadingEventCard />
                            </div>
                        }
                    </Col>
                </Row>

            </AdminLayout >
        )
    }
    else {
        return (
            <AdminLayout pageName="Events">
                <div style={{ padding: "1rem" }} />
                <LoadingEventCard />
                <LoadingEventCard />
            </AdminLayout>
        );
    }
}