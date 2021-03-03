import React, { useEffect, useState, useContext } from "react";
import AdminLayout from "../../components/AdminLayout";
import EditableEventCard from '../../components/EditableEventCard';
import AddIcon from '@iconify/icons-gg/add';
import IconButton from '../../components/IconButton';
import { UserContext } from "../../providers/UserProvider";

const today = new Date()
let todayStr = today.toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export default function EditEvents() {
    const { org } = useContext(UserContext);
    // const [organizations, setOrganizations] = useState(null);
    const [allEvents, setAllEvents] = useState(null);

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

    const addEvent = event => {
        event.preventDefault();
        setAllEvents([
            ...allEvents,
            {
                id: '',
                title: '',
                start: todayStr + '',
                end: todayStr + 'T21:00:00',
                description: '',
                org: '',
                location: '',
                link: ''
            }
        ]);
    };

    const deleteEvent = (event, id) => {
        event.preventDefault();
        setAllEvents(allEvents.filter(event => event.id !== id));
    }

    const saveEvent = (event, id) => {
        event.preventDefault();
    }

    if (org != null) {
        return (
            <AdminLayout pageName="Events">
                { allEvents &&
                    allEvents.map(event => {
                        return (
                            <EditableEventCard event={event} isEditable={event.title === ''} deleteEvent={deleteEvent} ></EditableEventCard>
                        )
                    })
                }
                <IconButton icon={AddIcon} onClick={addEvent}></IconButton>
            </AdminLayout>
        )
    }
    else {
        return null;
    }
}