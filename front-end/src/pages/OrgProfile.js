import { useParams } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import OrgPageEventCard from "../components/OrgPageEventCard";
import NavbarComponent from '../components/NavbarComponent';
import Collapse from 'react-bootstrap/Collapse'
import React, { useEffect, useState } from "react";

import './../styles/App.css';

import LinkSVG from '../assets/link.svg';
import DescriptionIcon from '../assets/product-description.svg';
import Circle from '../assets/circle.png';


export default function OrgProfile() {
    let { orgSlug } = useParams();
    const [org, setOrgInfo] = useState({});
    const [allEvents, setOrgEvents] = useState([]);
    const [openUpcomingEvents, setUpcomingOpen] = useState(false);
    const [openPastEvents, setPastOpen] = useState(false);
    const maxEventsDisplayed = 3;

    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/orgs/slug=' + orgSlug)
            .then(response => response.json())
            .then(data => setOrgInfo(data))
            .catch(error => {
                console.error('There was an error fetching the org info for this org: ' + orgSlug, error);
            });

    }, [orgSlug]);

    useEffect(() => {
        fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/events/org=' + org.uId)
            .then(response => response.json())
            .then(data => setOrgEvents(data))
            .catch(error => {
                console.error('There was an error fetching events for this org: ' + org.name, error);
            });
    }, [org])

    // Sort events into past and future based on endTime.
    const UPCOMING_EVENTS = [];
    const PAST_EVENTS = [];
    for (var i = 0; i < allEvents.length; i++) {
        var eventEndTime = Date.parse(allEvents[i].endTime);
        if (Date.now() < eventEndTime) {
            UPCOMING_EVENTS.push(allEvents[i]);
        }
        else {
            PAST_EVENTS.push(allEvents[i]);
        }
    }

    // These objects allow us to put "expand" for additional (more than 3) events.
    var additionalUpcomingEvents;
    if (UPCOMING_EVENTS.length > maxEventsDisplayed) {
        additionalUpcomingEvents =
            <div>
                <button
                    onClick={() => setUpcomingOpen(!openUpcomingEvents)}
                    aria-controls="expand-events"
                    aria-expanded={openUpcomingEvents}>
                    expand...
                </button>
                <Collapse in={openUpcomingEvents}>
                    <div>
                        {UPCOMING_EVENTS.slice(maxEventsDisplayed, UPCOMING_EVENTS.length).map(event => {
                            return (
                                <OrgPageEventCard key={event.id} event={event} pastEvent={false} ></OrgPageEventCard>
                            );
                        })}
                    </div>
                </Collapse>
            </div>
    }
    var additionalPastEvents;
    if (PAST_EVENTS.length > maxEventsDisplayed) {
        additionalPastEvents =
            <div>
                <button
                    onClick={() => setPastOpen(!openPastEvents)}
                    aria-controls="expand-events"
                    aria-expanded={openPastEvents}>
                    expand...
                </button>
                <Collapse in={openPastEvents}>
                    <div>
                        {PAST_EVENTS.slice(maxEventsDisplayed, PAST_EVENTS.length).map(event => {
                            return (
                                <OrgPageEventCard key={event.id} event={event} pastEvent={true} ></OrgPageEventCard>
                            );
                        })}
                    </div>
                </Collapse>
            </div>
    }
    return (
        <div className="App" style={{ minHeight: '100vh', paddingBottom: '15vh' }}>
            <NavbarComponent page='OrgProfilePage' />
            <Container>
                {/* Test Image */}
                <Image src={Circle} style={{ width: '25vh', height: '25vh' }}></Image>
                <Row className="my-4">
                    <h1 className="item-align-center font-weight-bold">{org.name}</h1>
                </Row>
                <Row className="mb-3">
                    <Col xs={2} style={{ textAlign: 'right' }}>
                        <Image src={LinkSVG}></Image>
                    </Col>
                    <Col style={{ textAlign: 'left' }}>
                        <a href={org.website} target="_blank" rel="noreferrer">{org.website}</a>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col xs={2} style={{ textAlign: 'right', marginTop: 5, marginBottom: 'auto' }}>
                        <Image src={DescriptionIcon}></Image>
                    </Col>
                    <Col xs={8} style={{ textAlign: 'left' }}>
                        {org.description}
                    </Col>
                </Row>
                <Row className="mb-3" style={{ textAlign: 'center' }}>
                    <h1 className="item-align-center font-weight-bold">Upcoming Events</h1>
                </Row>
                {/* DISPLAY UPCOMING EVENTS, assumes sorted order of UPCOMING_EVENTS array. */}
                {UPCOMING_EVENTS.slice(0, maxEventsDisplayed).map(event => {
                    return (
                        <OrgPageEventCard key={event.id} event={event} pastEvent={false} isEditable={false}></OrgPageEventCard>
                    );
                })}
                {additionalUpcomingEvents}
                {/* DISPLAY PAST EVENTS */}
                <Row className="mb-3" style={{ textAlign: 'center' }}>
                    <h1 className="item-align-center font-weight-bold org-page-past-event-header">Past Events</h1>
                </Row>
                {PAST_EVENTS.slice(0, maxEventsDisplayed).map(event => {
                    return (
                        <OrgPageEventCard key={event.id} event={event} pastEvent={true} isEditable={false}></OrgPageEventCard>
                    );
                })}
                {additionalPastEvents}
            </Container>
        </div >
    )
}