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
import NavbarComponent from '../components/NavbarComponent';

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
    title: 'A Look into NLP and Research Engineering at Google',
    start: todayStr + 'T20:00:00',
    end: todayStr + 'T21:00:00',
    extendedProps: {
      description: 'As an Education x Research x Industry Event, if you\'re interested in learning how natural language processing and deep learning play several roles in language-oriented products like the Google Assistant or Alexa, come hear from a software engineer at Google discuss the challenges that go with creating these products. We\'ll also be discussing differences between industry and academia, important skills to be an effective software engineer, and what different software-engineering centric career paths in tech might look like. The talk will conclude with an open-ended Q&A forum.',
      org: 'ACM',
      location: 'Zoom',
      link: 'https://cdn.discordapp.com/attachments/714723430079135755/808062875062108180/ACM_Research_Engineering_at_Google_Flyer_1.png',
      tags: ['Google', 'ACM Education', 'ACM Research', 'Industry', 'ML']
    }
  },
  {
    id: createEventId(),
    title: 'Development Fireside Presentation',
    start: ydayStr + 'T17:30:00',
    end: ydayStr + 'T18:45:00',
    extendedProps: {
      description: 'One exciting initiative that we are also proud to be launching this semester is Fireside Chats with ACM Development. Each month we will have an opportunity for everyone to come in and listen to the amazing new features and products that we release. In addition to that there will be conversation about the latest trends in tech, discussions around real-world software development & more.',
      org: 'ACM',
      location: 'Discord',
      link: 'https://discord.gg/Azq7zZn457',
      tags: ['ACM Dev', 'Discord', 'Software', 'Engineering']
    }
  },
  {
    id: createEventId(),
    title: 'Pitching Yourself Workshop and Resume Critique with Xilinx',
    start: tmrwStr + 'T16:00:00',
    end: tmrwStr + 'T17:15:00',
    extendedProps: {
      description: 'Attend to get a chance to win a swag bag containing a pair of AirPods!',
      org: 'SWE',
      location: 'Zoom',
      link: 'https://xilinx.zoom.us/j/2792764728?pwd=ekpwcWpOY25FTWlSb3g2U3RBa1lMdz09',
      tags: ['Industry', 'womxn', 'oSTEM', 'raffle', 'workshop']
    }
  },
  {
    id: createEventId(),
    title: 'HackUTD',
    start: todayStr,
    extendedProps: {
      description: 'HackUTD, the largest university hackathon in North Texas, is a weekend long event where students build apps, hardware, and more. HackUTD provides a venue for self-expression and creativity through technology. People with varying technical backgrounds come together, form teams around a problem or idea, and collaboratively code a unique solution from scratch. Whether you\'re a frequent hackathon attendee or just getting started, we\'d love to see what you can make.',
      org: 'HackUTD',
      location: 'ECSW',
      link: 'https://2021.hackutd.co/',
      tags: ['hackathon']
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
      link: 'https://www.acmutd.com',
      tags: ['Industry', 'ML', 'AI', 'collab']
    }
  },
]

export function createEventId() {
  return String(eventGuid++)
}

export const ORGANIZATIONS = [
  {
    name: 'Artificial Intelligence Society',
    slug: 'artificial-intelligence-society'
  },
  {
    name: 'Women Who Compute',
    slug: 'women-who-compute'
  },
  {
    name: 'Association for Computing Machinery',
    slug: 'association-for-computing-machinery'
  },
  {
    name: 'Women Who Compute',
    slug: 'women-who-compute'
  },
  {
    name: 'Women Who Compute',
    slug: 'women-who-compute'
  },
  {
    name: 'Women Who Compute',
    slug: 'women-who-compute'
  },
  {
    name: 'Women Who Compute',
    slug: 'women-who-compute'
  },
  {
    name: 'Women Who Compute',
    slug: 'women-who-compute'
  },
  {
    name: 'Women Who Compute',
    slug: 'women-who-compute'
  },
  {
    name: 'Women Who Compute',
    slug: 'women-who-compute'
  },
]

// Main page components
export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [animateCard, setAnimateCard] = useState('');

  return (
    <div className="App">
      <NavbarComponent page='Home' />
      <div className="background">
        <Container style={{ minHeight: '100vh', paddingBottom: '10vh' }} fluid>
          <Row>
            <Col className="d-none d-md-block">
              <div className="main-page-sidebar">
                <div>
                  <h2 style={{ fontWeight: 600 }}>Event Information</h2>
                  <EventInfoCard event={selectedEvent} animateCard={animateCard} setAnimateCard={setAnimateCard} />
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
                      duration: { days: 7 },
                      dayCount: 7
                    }
                  }}
                  initialEvents={INITIAL_EVENTS}
                  eventClick={(info) => {
                    setAnimateCard('blob-animation')
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
                      duration: { days: 3 },
                      displayEventTime: false
                    },
                    upcomingWeek: {
                      buttonText: 'upcoming',
                      type: 'list',
                      dayCount: 7,
                      duration: { days: 7 },
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
                      <Link to={`org/${org.slug}`} style={{ textDecoration: 'none' }}>
                        <OrgInfoCard orgName={org.name} />
                      </Link>
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
          <Link to="/org" style={{ paddingLeft: 10 }}>Org Profile</Link>
          <Link to="/admin/create" style={{ padding: 10 }}>Create Event</Link>
        </div>
      </div>
    </div >
  );
}

