import React, { useEffect, useState, useContext, createRef } from "react";

import FullCalendar, { isArraysEqual } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import AddIcon from '@iconify/icons-mdi/plus-circle-outline';

import AdminLayout from "../../components/AdminLayout";
import EditableEventCard from '../../components/EditableEventCard';
import IconButton from '../../components/IconButton';
import { UserContext } from "../../providers/UserProvider";
import { parseEventsToFullCalendarFormat } from "../../components/FullCalendarUtils";
import { eventCardFormatToISO, lastUpdatedToISO } from '../../components/TimeUtils';


export default function EditEvents() {
    const { org } = useContext(UserContext);
    const [isAdding, setIsAdding] = useState(false);
    const [dbEvents, setDbEvents] = useState(null);
    const [allEvents, setAllEvents] = useState(null);
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
        fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/events/all')
            .then(response => response.json())
            .then(data => parseEventsToFullCalendarFormat(data))
            .then(data => setDbEvents(data))
            .catch(error => {
                console.error('There was an error fetching events!', error);
            });
    }, []);

    const addEvent = event => {
        event.preventDefault();
        setIsAdding(!isAdding);
        setAllEvents([
            ...allEvents,
            {
                id: '',
                title: '',
                date: '',
                startTime: '',
                endTime: '',
                description: '',
                org: '',
                location: '',
                link: ''
            }
        ]);
    };

    const deleteEvent = (event, id) => {
        event.preventDefault();
        if(event !== null){
            fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/events/' + id, {
                    method: 'DELETE',
                })
                .then(response => {console.log(response)})


            var remainingEvents = allEvents.filter(event => event.id !== id);
            setAllEvents(remainingEvents);
            setIsAdding(allEvents === null && isAdding)
        }

    }

    const saveEvent = (event, id, orgId) => {
        // to ensure that current id is in list
        
        event.orgs.push(orgId);
        var body = {
            "description": event.description,
            "endTime": eventCardFormatToISO(event.date, event.endTime),
            "id": id,
            "link": event.link,
            "orgs": event.orgs,
            "lastUpdated": lastUpdatedToISO(),
            "startTime": eventCardFormatToISO(event.date, event.startTime),
            "title": event.title,
            "location": event.location,
            "tags": null
        };
        

        if (id !== '') {
            fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/events', {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => {console.log(response)})
            .then(_ => {
                var remainingEvents = allEvents.filter(event => event.id !== id);
                remainingEvents.push(body);
                setAllEvents(remainingEvents);
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
            .then(_ => { 
                    var events = allEvents;
                    events.push(event);
                    setAllEvents(events);
                }
            )
            .catch(
            error => {
                console.error('There was an error adding a new Event', error)
            });
        }
    }

    const changeCalendarView = (dateStr) => {
        calendarRef.current.getApi().changeView(calendarRef.current.getApi().view.type, dateStr);
    }

    if (org != null) {
        return (
            <AdminLayout pageName="Events">
                <div style={{ padding: "1rem" }} />
                { allEvents !== null &&
                    allEvents.map(event => {
                        return (
                            <EditableEventCard event={event} isEditable={event.title === ''} deleteEvent={deleteEvent} changeCalendarView={changeCalendarView} saveEvent={saveEvent}></EditableEventCard>
                        )
                    })
                }
                {!isAdding && <IconButton icon={AddIcon} onClick={addEvent}></IconButton>}
                <div className="fullcalendar-wrapper admin">
                    <FullCalendar
                        ref={calendarRef}
                        initialView="timeGridWeek"
                        plugins={[dayGridPlugin, timeGridPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek'
                        }}
                        height="100%"
                        scrollTime='08:00:00'
                        events={dbEvents}
                    />
                </div>
            </AdminLayout>
        )
    }
    else {
        return null;
    }
}