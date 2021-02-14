import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import {
  Link
} from "react-router-dom";
import { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/App.css';
import './../styles/fullcalendar-custom.css';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import EventInfoCard from '../components/EventInfoCard'
import OrgInfoCard from '../components/OrgInfoCard'
import CustomButton from '../components/CustomButton';
import { ReactComponent as ECSLogo } from '../assets/utd-ecs-logo-clipped.svg';

// Placeholder events for FullCalendar. Demonstrates creating events with unique ids.
let eventGuid = 0
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
const yday = new Date(today)
yday.setDate(yday.getDate() + -1)

let todayStr = today.toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
let tmrwStr = tomorrow.toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
let ydayStr = yday.toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
    extendedProps: {
      description: 'This is a sample description for an all-day event.'
    }
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
    end: todayStr + 'T12:30:00',
    extendedProps: {
      description: 'Come out to our event! We will have food and cool guest speakers! If you come and ask a question you’ll be put in a raffle to win a free Google Home Mini! Also come learn how to participate in our upcoming Hackathon even if it’s your first one! Please come to our event!! I need friendz!!!',
      org: 'ACM',
      location: 'Zoom',
      link: 'https://www.acmutd.com'
    }
  },
  {
    id: createEventId(),
    title: 'Timed event2',
    start: todayStr + 'T11:00:00',
    end: todayStr + 'T12:00:00'
  },
  {
    id: createEventId(),
    title: 'Tmrw event',
    start: tmrwStr + 'T11:00:00',
    end: tmrwStr + 'T12:00:00'
  },
  {
    id: createEventId(),
    title: 'Yday event',
    start: ydayStr + 'T11:00:00',
    end: ydayStr + 'T12:00:00'
  }
]

export function createEventId() {
  return String(eventGuid++)
}

export const ORGANIZATIONS = [
  {
    name: 'Artificial Intelligence Society'
  },
  {
    name: 'Women Who Compute'
  },
  {
    name: 'Association for Computing Machinery'
  },
  {
    name: 'Women Who Compute'
  },
  {
    name: 'Women Who Compute'
  },
  {
    name: 'Women Who Compute'
  },
  {
    name: 'Women Who Compute'
  },
  {
    name: 'Women Who Compute'
  },
  {
    name: 'Women Who Compute'
  },
  {
    name: 'Women Who Compute'
  },
]

// Main page components
export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  return (
    <div className="App">
      <div style={{ paddingTop: "5rem" }} className="background">
        <Container style={{ minHeight: '100vh' }} fluid>
          <Row>
            <Col className="d-none d-md-block">
              <div className="main-page-sidebar">
                <div>
                  <h2 className="font-weight-bold">Event Information</h2>
                  <EventInfoCard event={selectedEvent} />
                </div>
              </div>
            </Col>
            {/* THIS CALENDAR RENDERS ON WINDOWS WITH WIDTH LARGER THAN 768px (md breakpoint)*/}
            <Col lg={9} className="d-none d-md-block">
              <div className="fullcalendar-wrapper">
                <FullCalendar
                  initialView="dayGridMonth"
                  plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,upcomingWeek'
                  }}
                  height="100%"
                  scrollTime='08:00:00'
                  listDayFormat={{
                    weekday: 'long'
                  }}
                  listDaySideFormat={{
                    month: "long",
                    day: "numeric"
                  }}
                  views={{
                    upcomingWeek: {
                      buttonText: 'upcoming',
                      type: 'list',
                      dayCount: 7
                    }
                  }}
                  initialEvents={INITIAL_EVENTS}
                  eventClick={(info) => {
                    setSelectedEvent(info.event)
                  }}
                />
              </div>
            </Col>
            {/* THIS CALENDAR RENDERS ON WINDOWS WITH WIDTH SMALLER THAN 768px (md breakpoint)*/}
            <Col className="d-sm-block d-md-none">
              <div className="fullcalendar-wrapper fullcalendar-wrapper-mobile">
                <FullCalendar
                  initialView="upcomingWeek"
                  plugins={[timeGridPlugin, listPlugin]}
                  headerToolbar={{
                    left: '',
                    center: 'title',
                    right: ''
                  }}
                  footerToolbar={{
                    left: 'prev,next',
                    center: '',
                    right: 'upcomingWeek,threeDay'
                  }}
                  height="100%"
                  scrollTime='08:00:00'
                  listDayFormat={{
                    weekday: 'long'
                  }}
                  listDaySideFormat={{
                    month: "long",
                    day: "numeric"
                  }}
                  views={{
                    threeDay: {
                      buttonText: '3-day',
                      type: 'timeGrid',
                      dayCount: 3,
                      displayEventTime: false
                    },
                    upcomingWeek: {
                      buttonText: 'upcoming',
                      type: 'list',
                      dayCount: 7,
                      displayEventTime: true,
                    }
                  }}
                  initialEvents={INITIAL_EVENTS}
                  eventClick={(info) => {
                    setSelectedEvent(info.event)
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={{ size: 2, offset: 3 }}>
              <Link to="/login" style={{ padding: 10 }}>
                <CustomButton className="drop-shadow button-org-login-main-page">Organization Login</CustomButton>
              </Link>
              <Link to="/" style={{ padding: 10 }}>
                <CustomButton className="drop-shadow button-api-docs-main-page">API Documentation</CustomButton>
              </Link>
            </Col>
          </Row>
        </Container>
        <h1 className="font-weight-bold">Organizations</h1>
        <Container fluid style={{ paddingLeft: "5.5vw", paddingRight: "5.5vw" }}>
          <Row>
            {
              ORGANIZATIONS.map(org => {
                return (
                  <Col md={4}>
                    <Container style={{ paddingTop: 20 }}>
                      <OrgInfoCard orgName={org.name} />
                    </Container>
                  </Col>
                );
              })
            }
          </Row>
        </Container>
        <div style={{ padding: "5rem" }}>
          <Link to="/" style={{ padding: 10 }}>Home</Link>
          <Link to="/login">Organization Login</Link>
          <Link to="/org/create" style={{ padding: 10 }}>Create Event</Link>
        </div>
      </div>
    </div >
  );
}

