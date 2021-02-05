import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {
    Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/App.css';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'


export default function Home() {
    return (
        <div className="App">
            <Jumbotron>
                <Container>
                    <h1>Home Page</h1>
                    <div>
                        <Link to="/" style={{ padding: 10 }}>Home</Link>
                        <Link to="/login">Organization Login</Link>
                        <Link to="/org/create" style={{ padding: 10 }}>Create Event</Link>
                    </div>
                </Container>
            </Jumbotron>
            <FullCalendar 
              defaultView="dayGridMonth" 
              plugins={[ dayGridPlugin, timeGridPlugin ]} 
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}

            />
        </div>
    );
}

