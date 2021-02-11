import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import {
  Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/App.css';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import EventInfoCard from '../components/EventInfoCard'
import OrgInfoCard from '../components/OrgInfoCard'

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
      <div style={{ paddingTop: "5rem" }}>
        <Container style={{ minHeight: '100vh' }} fluid>
          <Row>
            <Col>
              <div className="main-page-sidebar">
                <div>
                  <h2 className="font-weight-bold">Event Information</h2>
                  <EventInfoCard />
                </div>
              </div>
            </Col>
            <Col xs={9}>
              <div className="fullcalendar-div">
                <FullCalendar
                  defaultView="dayGridMonth"
                  plugins={[dayGridPlugin, timeGridPlugin]}
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                  }}
                  initialEvents={INITIAL_EVENTS}
                  height={'auto'}
                />
              </div>
            </Col>
          </Row>
        </Container>
        <h1 className="font-weight-bold">Organizations</h1>
        <Container fluid>
          <Row>
            <Col md={4}>
              <Container style={{ paddingTop: 20 }}>
                <OrgInfoCard orgName='Artificial Intelligence Society' />
              </Container>
            </Col>
            <Col md={4}>
              <Container style={{ paddingTop: 20 }}>
                <OrgInfoCard orgName='Artificial Intelligence Society' />
              </Container>
            </Col>
            <Col md={4}>
              <Container style={{ paddingTop: 20 }}>
                <OrgInfoCard orgName='Artificial Intelligence Society' />
              </Container>
            </Col>
            <Col md={4}>
              <Container style={{ paddingTop: 20 }}>
                <OrgInfoCard orgName='Artificial Intelligence Society' />
              </Container>
            </Col>
            <Col md={4}>
              <Container style={{ paddingTop: 20 }}>
                <OrgInfoCard orgName='Artificial Intelligence Society' />
              </Container>
            </Col>
            <Col md={4}>
              <Container style={{ paddingTop: 20 }}>
                <OrgInfoCard orgName='Artificial Intelligence Society' />
              </Container>
            </Col>
            <Col md={4}>
              <Container style={{ paddingTop: 20 }}>
                <OrgInfoCard orgName='Artificial Intelligence Society' />
              </Container>
            </Col>
            <Col md={4}>
              <Container style={{ paddingTop: 20 }}>
                <OrgInfoCard orgName='Artificial Intelligence Society' />
              </Container>
            </Col>
            <Col md={4}>
              <Container style={{ paddingTop: 20 }}>
                <OrgInfoCard orgName='Artificial Intelligence Society' />
              </Container>
            </Col>

          </Row>
        </Container>
        <div style={{ padding: "5rem" }}>
          <Link to="/" style={{ padding: 10 }}>Home</Link>
          <Link to="/login">Organization Login</Link>
          <Link to="/org/create" style={{ padding: 10 }}>Create Event</Link>
        </div>
      </div>
    </div>
  );
}

