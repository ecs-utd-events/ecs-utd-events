import React, { useEffect, useState, useContext, createRef } from "react";
import AdminLayout from "../../components/AdminLayout";
import EditableEventCard from '../../components/EditableEventCard';
import AddIcon from '@iconify/icons-gg/add';
import IconButton from '../../components/IconButton';
import { UserContext } from "../../providers/UserProvider";



export default function EditEvents() {
    // const { org } = useContext(UserContext);
    const [isAdding, setIsAdding] = useState(false);
    const org = 'this';
    // const [organizations, setOrganizations] = useState(null);
    const [allEvents, setAllEvents] = useState([{
        id: 'test',
        title: 'test',
        date: 'test',
        startTime: 'test',
        endTime: 'test',
        description: 'test',
        org: 'test',
        location: 'test',
        link: 'test'
    }]);

    // useEffect(() => {
    //     if (org != null) {
    //         fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/events/org=' + org.uId)
    //             .then(response => response.json())
    //             .then(data => setAllEvents(data))
    //             .catch(error => {
    //                 console.error('There was an error fetching events for this org: ' + org.name, error);
    //             });
    //     }
    // }, [org])

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
        setAllEvents(allEvents.filter(event => event.id !== id));
        setIsAdding(allEvents === null && isAdding)
    }

    const saveEvent = (event, id) => {
        event.preventDefault();
    }

    if (org != null) {
        return (
            <AdminLayout pageName="Events">
                <div style={{ padding: "1rem" }} />
                { allEvents &&
                    allEvents.map(event => {
                        return (
                            <EditableEventCard event={event} isEditable={event.title === ''} deleteEvent={deleteEvent}></EditableEventCard>
                        )
                    })
                }
                {!isAdding && <IconButton icon={AddIcon} onClick={addEvent}></IconButton>}
            </AdminLayout>
        )
    }
    else {
        return null;
    }
}