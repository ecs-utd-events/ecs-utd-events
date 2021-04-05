import React, { useEffect, useState, useContext, createRef } from "react";

import FullCalendar, { isArraysEqual } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import AddIcon from '@iconify/icons-mdi/plus-circle-outline';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import AdminLayout from "../../components/AdminLayout";
import EditableEventCard, { LoadingEventCard } from '../../components/EditableEventCard';
import IconButton from '../../components/IconButton';
import { UserContext } from "../../providers/UserProvider";
import { parseEventsToFullCalendarFormat, formatFCEventToDB } from "../../components/FullCalendarUtils";
import { eventCardFormatToISO, getFormattedTime, lastUpdatedToISO } from '../../components/TimeUtils';
import NonEditableEventCard from "../../components/NonEditableEventCard";

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

export default function EditEvents() {
    const { org } = useContext(UserContext);
    const [allEvents, setAllEvents] = useState(null);
    const [myEvents, setMyEvents] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
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
            setMyEvents(myEventsTemp);
        }
    }, [allEvents, org])

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

        let updatedEvents = await sortedEventInsert(currEvents, newEvent);
        setAllEvents(updatedEvents);

        if (updatedEvents != null && org != null) {
            let myEventsTemp = updatedEvents.filter((event) => event.extendedProps.org.some((orgId) => orgId === org.uId))
            setMyEvents(myEventsTemp);
        }

        setIsEditing(false);
        return updatedEvents
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
            "tags": null
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
            return <EditableEventCard event={selectedEvent} isEditing={isEditing} setIsEditing={setIsEditingHelper} deleteEvent={deleteEvent} changeCalendarView={changeCalendarView} saveEvent={saveEvent}></EditableEventCard>
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
                    <Col className="p-0" xs={3} sm={4} style={{ minWidth: '200px' }}>
                        <h3>My Events</h3>
                        {myEvents != null &&
                            <Table striped hover responsive>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Name</th>
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
                                                <td>{new Date(event.start).toLocaleDateString()}</td>
                                                <td>{getFormattedTime(event.start)} - {getFormattedTime(event.end)}</td>
                                                <td>{event.title}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
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
                    <Col className="d-flex align-items-center justify-content-center p-0">
                        {!isEditing && <IconButton icon={AddIcon} onClick={addEvent}></IconButton>}
                    </Col>
                    <Col xs={11} className="p-0">
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