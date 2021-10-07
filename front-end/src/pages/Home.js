import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Spinner from 'react-bootstrap/esm/Spinner';
import {
  Link
} from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react'
import ReactTooltip from 'react-tooltip';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';

import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/App.css';
import './../styles/fullcalendar-custom.css';

import EventInfoCard from '../components/EventInfoCard'
import OrgInfoCard from '../components/OrgInfoCard'
import NavbarComponent from '../components/NavbarComponent';
import FooterComponent from '../components/FooterComponent';

import EventInfoModal from '../components/EventInfoModal';
import HomeFilters from './HomeFilters';
import { AllOrgContext } from '../providers/AllOrgProvider';

import { parseEventsToFullCalendarFormat } from '../components/FullCalendarUtils';
import { usePrevious } from '../components/CustomHooks';
import { apiProvider } from '../providers/Provider';

/* Randomize array in-place using Durstenfeld shuffle algorithm. We use this
to randomize the order of presented organizations. 
See: https://researchonresearch.blog/2018/11/28/theres-lots-in-a-name/ for bias in 
alphabetical ordering. */
function shuffleArray(array) {
  var newArr = array;
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// Main page components
export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [animateCard, setAnimateCard] = useState('');
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);

  const organizations = useContext(AllOrgContext);
  const prevSelectedEvent = usePrevious(selectedEvent);

  useEffect(() => {
    setIsLoadingEvents(true);
    // GET request for all events using fetch inside useEffect React hook
    apiProvider.getAll('events', setEvents)
    setEvents(parseEventsToFullCalendarFormat(events))
    setFilteredEvents(events)
    if (events == null)
      setIsLoadingEvents(false)

    fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/events/all')
      .then(response => response.json())
      .then(data => parseEventsToFullCalendarFormat(data))
      .then(data => { setEvents(data); setFilteredEvents(data); })
      .then(_ => setIsLoadingEvents(false))
      .catch(error => {
        console.error('There was an error fetching events!', error);
        setIsLoadingEvents(false);
      });
  }, []);

  useEffect(() => {
    if (filteredEvents.length > 0 && selectedEvent != null) {
      var tempFilteredEvents = filteredEvents;
      if (prevSelectedEvent != null) {
        if (prevSelectedEvent.id === selectedEvent.id) {
          return;
        }
        var prevSelectedEventRef = tempFilteredEvents.find(event => event.id === prevSelectedEvent.id);
        prevSelectedEventRef.color = "none";
        prevSelectedEventRef.display = "list-item";
      }
      var selectedEventRef = tempFilteredEvents.find(event => event.id === selectedEvent.id);
      selectedEventRef.color = "var(--primaryshade1)";
      selectedEventRef.display = "block";
      setFilteredEvents([...tempFilteredEvents]);
    }
  }, [selectedEvent])

  return (
    <div className="App">
      <NavbarComponent page='Home' />
      <div className="background">
        <EventInfoModal mobileModalOpen={mobileModalOpen} setMobileModalOpen={setMobileModalOpen} event={selectedEvent} orgs={organizations} />
        <Container style={{ minHeight: '100vh', paddingBottom: '10vh' }} fluid>
          <Row>
            <Col className="d-none d-md-block">
              <div className="main-page-sidebar">
                <div>
                  <h2 style={{ fontWeight: 600 }}>Event Information</h2>
                  <EventInfoCard event={selectedEvent} orgs={organizations} animateCard={animateCard} setAnimateCard={setAnimateCard} />
                </div>
              </div>
            </Col>
            {/* THIS CALENDAR RENDERS ON WINDOWS WITH WIDTH LARGER THAN 768px (md breakpoint)*/}
            <Col lg={9}>
              <HomeFilters setFilteredEvents={setFilteredEvents} allEvents={events} />
              <div className="fullcalendar-wrapper d-none d-md-block">
                <div className="loading-spinner-wrapper" style={{ pointerEvents: "none" }}>
                  {isLoadingEvents && <Spinner animation="border" className="loading-spinner" />}
                </div>
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
                  events={filteredEvents}
                  eventClick={(info) => {
                    if (selectedEvent == null || info.event.id !== selectedEvent.id) {
                      setAnimateCard('blob-animation')
                      info.el.style.backgroundColor = "var(--primaryshade1)";
                      info.el.style.borderColor = "var(--primaryshade1)";
                      setTimeout(() => { setSelectedEvent(info.event) }, 100)
                    }
                  }}
                />
              </div>
              {/* THIS CALENDAR RENDERS ON WINDOWS WITH WIDTH SMALLER THAN 768px (md breakpoint)*/}
              <div className="fullcalendar-wrapper fullcalendar-wrapper-mobile d-sm-block d-md-none">
                <div className="loading-spinner-wrapper" style={{ pointerEvents: "none" }}>
                  {isLoadingEvents && <Spinner animation="border" className="loading-spinner" />}
                </div>
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
                  events={filteredEvents}
                  eventClick={(info) => {
                    setSelectedEvent(info.event)
                    setMobileModalOpen(true);
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
        {/* We put a tooltip on only the ⓘ in "Organizations ⓘ" */}
        <h1 className="font-weight-bold" style={{ display: "inline" }}>Organizations</h1>
        <h3 style={{ display: "inline", verticalAlign: "2px", color: "var(--gray3)" }}
          data-tip="Randomized ordering. See <a target=&quot _blank &quot href=https://researchonresearch.blog/2018/11/28/theres-lots-in-a-name/>here</a> for the dangers of alphabetical order."
          className="font-weight-bold"> ⓘ</h3>
        {/* backgroundColor = var(--primary4) from App.css. */}
        <ReactTooltip backgroundColor="#D8E2DC" textColor="black" clickable={true} delayHide={500} effect="solid" offset={{ top: 0 }} html={true} />
        <Container fluid style={{ paddingLeft: "5.5vw", paddingRight: "5.5vw" }}>
          <Row>
            {
              shuffleArray(organizations).map(org => {
                return (
                  <Col md={4} key={org.slug} className='align-items-stretch'>
                    <Container style={{ paddingTop: 20 }}>
                      <Link to={`org/${org.slug}`} style={{ textDecoration: 'none' }}>
                        <OrgInfoCard orgName={org.name} orgImageUrl={org.imageUrl} />
                      </Link>
                    </Container>
                  </Col>
                );
              })
            }
          </Row>
        </Container>
      </div>
      <FooterComponent page='Home' />
    </div >
  );
}

