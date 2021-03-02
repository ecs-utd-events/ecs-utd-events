import { useState } from 'react';
import AdminLayout from "../../components/AdminLayout";
import EditableEventCard from '../../components/EditableEventCard';
import AddIcon from '@iconify/icons-gg/add';
import IconButton from '../../components/IconButton';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const today = new Date()
let todayStr = today.toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

const curEvents = [ 
    {
        id: '123',
        title: 'A Look into NLP and Research Engineering at Google',
        start: todayStr + 'T20:00:00',
        end: todayStr + 'T21:00:00',
        description: 'As an Education x Research x Industry Event, if you\'re interested in learning how natural language processing and deep learning play several roles in language-oriented products like the Google Assistant or Alexa, come hear from a software engineer at Google discuss the challenges that go with creating these products. We\'ll also be discussing differences between industry and academia, important skills to be an effective software engineer, and what different software-engineering centric career paths in tech might look like. The talk will conclude with an open-ended Q&A forum.',
        org: 'ACM',
        location: 'Zoom',
        link: 'https://cdn.discordapp.com/attachments/714723430079135755/808062875062108180/ACM_Research_Engineering_at_Google_Flyer_1.png'
    }
];

const newEvent = {
    id: '',
    title: 'newevent',
    start: todayStr + 'T20:00:00',
    end: todayStr + 'T21:00:00',
    description: '',
    org: 'ACM',
    location: 'Zoom',
    link: 'https://cdn.discordapp.com/attachments/714723430079135755/808062875062108180/ACM_Research_Engineering_at_Google_Flyer_1.png'
};



export default function EditEvents() {
    const [events, setEvents] = useState(curEvents);

    const addEvent = event => {
        event.preventDefault();
        setEvents([
            ...events,
            {
                id: '',
                title: 'newevent',
                start: todayStr + 'T20:00:00',
                end: todayStr + 'T21:00:00',
                description: '',
                org: 'ACM',
                location: 'Zoom',
                link: 'https://cdn.discordapp.com/attachments/714723430079135755/808062875062108180/ACM_Research_Engineering_at_Google_Flyer_1.png'
            }
        ]);
    }

    const deleteEvent = (ev,event) => {
        console.log(ev)
        event.preventDefault();
        setEvents(
            events.filter((event) => event !== this)
        );
    }
    return (
        <AdminLayout pageName="Events">
            <Container>
                {events.map(event => { return(<EditableEventCard event={event} handleDelete={deleteEvent}></EditableEventCard>); }) }
            <Row>
                <Col md={{span:4 , offset:4}}>
                    <IconButton icon={AddIcon} onClick={addEvent}></IconButton>
                </Col>
            </Row>
            </Container>
        </AdminLayout>
    )
}