import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";
import EditableEventCard from '../../components/EditableEventCard';
import AddIcon from '@iconify/icons-gg/add';
import IconButton from '../../components/IconButton';



export default function EditEvents() {
    let { orgSlug } = useParams();
    const [organizations, setOrganizations] = useState(null);
    const [thisOrg, setThisOrg] = useState(null);
    const today = new Date()
    let todayStr = today.toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

    const [allEvents, setAllEvents] = useState([{
        id: '123',
        title: 'A Look into NLP and Research Engineering at Google',
        date: todayStr,
        startTime: today.toTimeString().substr(0,5),
        endTime: today.toTimeString().substr(0,5),
        description: 'As an Education x Research x Industry Event, if you\'re interested in learning how natural language processing and deep learning play several roles in language-oriented products like the Google Assistant or Alexa, come hear from a software engineer at Google discuss the challenges that go with creating these products. We\'ll also be discussing differences between industry and academia, important skills to be an effective software engineer, and what different software-engineering centric career paths in tech might look like. The talk will conclude with an open-ended Q&A forum.',
        org: 'ACM',
        location: 'Zoom',
        link: 'https://cdn.discordapp.com/attachments/714723430079135755/808062875062108180/ACM_Research_Engineering_at_Google_Flyer_1.png'
    }]);

    
    
 
    // useEffect(() => {
    //     if (thisOrg != null) {
    //         fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/events/org=' + thisOrg.uId)
    //             .then(response => response.json())
    //             .then(data => setAllEvents(data))
    //             .catch(error => {
    //                 console.error('There was an error fetching events for this org: ' + thisOrg.name, error);
    //             });
    //     }
    // }, [thisOrg])
    const addEvent = event => {
        event.preventDefault();
        setAllEvents([
            ...allEvents,
            {
                id: '',
                title: '',
                date: todayStr,
                startTime: today.toTimeString().substr(0,5),
                endTime: today.toTimeString().substr(0,5),
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
    return (

        <AdminLayout pageName="Events">
            { allEvents &&
                allEvents.map(event => {
                    return (<EditableEventCard event={event} isEditable={event.title === ''} deleteEvent={deleteEvent} ></EditableEventCard>)
                })
            }

            <IconButton icon={AddIcon} onClick={addEvent}></IconButton>
        </AdminLayout>

    )
}