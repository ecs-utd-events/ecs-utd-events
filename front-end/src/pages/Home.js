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


// Placeholder events for FullCalendar. Demonstrates creating events with unique ids.
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
    {
      id: createEventId(),
      title: 'All-day event',
      start: todayStr
    },
    {
      id: createEventId(),
      title: 'Timed event',
      start: todayStr + 'T12:00:00',
      end: todayStr + 'T12:30:00'
    }
]

export function createEventId() {
    return String(eventGuid++)
}

// Main page components
export default function Home() {
    return (
        <div className="App">
          <div className="HeaderDiv">
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
          </div>
          <div className="main-content">
            <div className="main-page-sidebar">
              <h2>Instructions</h2>
              <ul>
                <li>Select dates and you will be prompted to create a new event</li>
                <li>Drag, drop, and resize events</li>
                <li>Click an event to delete it</li>
              </ul>
            </div>

            <div className="fullcalendar-div">
              <FullCalendar 
                defaultView="dayGridMonth"
                plugins={[ dayGridPlugin, timeGridPlugin ]} 
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                initialEvents={INITIAL_EVENTS}
                height={'auto'}
              />
            </div>
          </div>
        </div>
    );
}

