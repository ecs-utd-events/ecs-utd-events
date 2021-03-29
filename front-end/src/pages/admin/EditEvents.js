import React, { useEffect, useState, useContext, createRef } from "react";

import FullCalendar, { isArraysEqual } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import AddIcon from '@iconify/icons-mdi/plus-circle-outline';
import { Container, Row, Col, Card } from 'react-bootstrap';

import AdminLayout from "../../components/AdminLayout";
import EditableEventCard, { LoadingEventCard } from '../../components/EditableEventCard';
import IconButton from '../../components/IconButton';
import { UserContext } from "../../providers/UserProvider";
import { parseEventsToFullCalendarFormat, formatFCEventToDB } from "../../components/FullCalendarUtils";
import { eventCardFormatToISO, lastUpdatedToISO } from '../../components/TimeUtils';
import NonEditableEventCard from "../../components/NonEditableEventCard";

function sortedEventInsert(sortedEventArr, newEvent) {
    const apparentIndex = binarySearch(sortedEventArr, newEvent, 0, sortedEventArr.length);
    sortedEventArr.splice(apparentIndex, 0, newEvent)
    return sortedEventArr
}

function binarySearch(sortedArr, x, start, end) {
    if (start >= sortedArr.length) return sortedArr.length
    if (end < start) return end + 1;
    const mid = Math.floor((start + end) / 2);
    const midDate = new Date(sortedArr[mid].startTime);
    const xDate = new Date(x.startTime);
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
    const [isAdding, setIsAdding] = useState(false);
    const [dbEvents, setDbEvents] = useState(null);
    const [allEvents, setAllEvents] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    let calendarRef = createRef();

    useEffect(() => {
        if (org != null) {
            fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/events/org=' + org.uId)
                .then(response => response.json())
                .then(data => setAllEvents(data))
                .catch(error => {
                    console.error('There was an error fetching events for this org: ' + org.name, error);
                });
        }
    }, [org])

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
                .then(data => setDbEvents(data))
                .catch(error => {
                    console.error('There was an error fetching events!', error);
                });
        }
    }, [org]);

    const setIsAddingHelper = newValue => {
        if (selectedEvent != null && selectedEvent.id === '') {
            setSelectedEvent(null);
            setIsAdding(newValue);
        } else {
            setIsAdding(newValue);
        }
    }

    const addEvent = event => {
        event.preventDefault();
        setIsAdding(!isAdding);
        setSelectedEvent(
            {
                id: '',
                title: '',
                date: '',
                startTime: '',
                endTime: '',
                description: '',
                org: [],
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
                .then(response => { console.log(response) })
        }
        var remainingEvents = allEvents.filter(x => x.id !== id);
        setAllEvents(remainingEvents);
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
                .then(response => { console.log(response) })
                .then(_ => {
                    var remainingEvents = allEvents.filter(event => event.id !== id);
                    return sortedEventInsert(remainingEvents, body);
                })
                .then(newEvents => {
                    setAllEvents(newEvents);
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
                    var events = allEvents.filter(event => event.id !== '');
                    return sortedEventInsert(events, body);
                })
                .then(newEvents => {
                    setAllEvents(newEvents);
                    setIsAdding(false);
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
        if (isAdding || (selectedEvent != null && selectedEvent.orgs.find(collaborator => collaborator === org.uId) != null)) {
            return <EditableEventCard event={selectedEvent} isEditable={selectedEvent != null && selectedEvent.title === ''} deleteEvent={deleteEvent} changeCalendarView={changeCalendarView} saveEvent={saveEvent} setIsAdding={setIsAddingHelper}></EditableEventCard>
        }
        else {
            return <NonEditableEventCard event={selectedEvent} />
        }
    }

    if (org != null) {
        return (
            <AdminLayout pageName="Events">
                <div style={{ padding: "1rem" }} />
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
                        events={dbEvents}
                        eventClick={(info) => {
                            var event = formatFCEventToDB(info.event)
                            setSelectedEvent(event)
                            setIsAdding(false)
                        }}
                    />
                </div>
                <Row>
                    <Col className="d-flex align-items-center justify-content-center p-0">
                        {!isAdding && <IconButton icon={AddIcon} onClick={addEvent}></IconButton>}
                    </Col>
                    <Col xs={11} className="p-0">
                        {dbEvents != null ?
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