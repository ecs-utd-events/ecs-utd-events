import { useParams } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { Icon } from '@iconify/react';
import linkIcon from '@iconify/icons-mdi/link-variant';
import descriptionIcon from '@iconify/icons-mdi/format-align-left';

import OrgPageEventCard from "../components/OrgPageEventCard";
import NavbarComponent from '../components/NavbarComponent';
import Collapse from 'react-bootstrap/Collapse'
import React, { useContext, useEffect, useState } from "react";
import CustomButton from '../components/CustomButton';
import { ToggleButton } from "../components/ToggleButton";

import './../styles/App.css';

import { AllOrgContext } from '../providers/AllOrgProvider';
import { UserContext } from "../providers/UserProvider";

import Circle from '../assets/placeholder_org_image.svg';
import FooterComponent from '../components/FooterComponent';
import IconButton from "../components/IconButton";
import { socialMediaPlatforms } from '../constants/SocialMediaPlatforms';
import groupmeIcon from '../assets/groupme.svg';

function findThisOrg(allOrgs, orgSlug) {
    if (allOrgs != null && orgSlug != null) {
        for (var i = 0; i < allOrgs.length; i++) {
            if (allOrgs[i].slug === orgSlug)
                return allOrgs[i];
        }
    }

    return null;
}

export default function OrgProfile() {
    let { orgSlug } = useParams();
    const [thisOrg, setThisOrg] = useState(null);
    const [allEvents, setAllEvents] = useState(null);
    const [openUpcomingEvents, setOpenUpcomingEvents] = useState(false);
    const [openPastEvents, setOpenPastEvents] = useState(false);
    const [selected, setSelected] = useState(false);
    const maxEventsDisplayed = 3;
    const organizations = useContext(AllOrgContext);
    const { org } = useContext(UserContext);

    useEffect(() => {
        setThisOrg(findThisOrg(organizations, orgSlug));
    }, [organizations, orgSlug])

    useEffect(() => {
        if (thisOrg != null) {
            fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/events/org=' + thisOrg.uId)
                .then(response => response.json())
                .then(data => setAllEvents(data))
                .catch(error => {
                    console.error('There was an error fetching events for this org: ' + thisOrg.name, error);
                });
        }
    }, [thisOrg])

    if (thisOrg != null && allEvents != null) {
        // Sort events into past and future based on endTime.
        var UPCOMING_EVENTS = [];
        var PAST_EVENTS = [];
        for (var i = 0; i < allEvents.length; i++) {
            var eventEndTime = Date.parse(allEvents[i].endTime);
            if (Date.now() < eventEndTime) {
                UPCOMING_EVENTS.push(allEvents[i]);
            }
            else {
                PAST_EVENTS.push(allEvents[i]);
            }
        }

        // Reverse order for past events, we want the most recent displaying first
        PAST_EVENTS = PAST_EVENTS.reverse()

        // These objects allow us to put "expand" for additional (more than 3) events.
        var additionalUpcomingEvents;
        if (UPCOMING_EVENTS.length > maxEventsDisplayed) {
            additionalUpcomingEvents =
                <div>
                    <CustomButton className="drop-shadow" onClick={() => setOpenUpcomingEvents(!openUpcomingEvents)}
                        aria-controls="expand-events"
                        aria-expanded={openUpcomingEvents}>
                        see all events...</CustomButton>
                    <Collapse in={openUpcomingEvents} style={{ paddingTop: '1vh' }}>
                        <div>
                            {UPCOMING_EVENTS.slice(maxEventsDisplayed, UPCOMING_EVENTS.length).map(event => {
                                return (
                                    <OrgPageEventCard key={event.id} event={event} pastEvent={false} orgs={organizations}></OrgPageEventCard>
                                );
                            })}
                        </div>
                    </Collapse>
                </div>
        }

        if (UPCOMING_EVENTS.length === 0)
            additionalUpcomingEvents = <h6><i>No upcoming events.</i></h6>;

        var additionalPastEvents;
        if (PAST_EVENTS.length > maxEventsDisplayed) {
            additionalPastEvents =
                <div>
                    <CustomButton className="drop-shadow" onClick={() => setOpenPastEvents(!openPastEvents)}
                        aria-controls="expand-events"
                        aria-expanded={openPastEvents}>
                        see all events...</CustomButton>
                    <Collapse in={openPastEvents} style={{ paddingTop: '1vh' }}>
                        <div>
                            {PAST_EVENTS.slice(maxEventsDisplayed, PAST_EVENTS.length).map(event => {
                                return (
                                    <OrgPageEventCard key={event.id} event={event} pastEvent={true} orgs={organizations}></OrgPageEventCard>
                                );
                            })}
                        </div>
                    </Collapse>
                </div>
        }

        if (PAST_EVENTS.length === 0)
            additionalPastEvents = <h6><i>No recent events.</i></h6>;


        // Display a placeholder image if the organization is null OR the organization's imageUrl field is null.
        var imageSource = thisOrg != null ? (thisOrg.imageUrl != null && thisOrg.imageUrl !== "" ? thisOrg.imageUrl : Circle) : Circle;

        return (
            <div className="App">
                {/* minHeight of the separate wrapping div is set to push the footer to the bottom of the page */}
                <div style={{ minHeight: 'calc(100vh - 5rem)' }}>
                    <NavbarComponent page='OrgProfilePage' org={org} />
                    <Container>
                        <Image src={imageSource} style={{ width: '25vh', height: '25vh' }} roundedCircle></Image>
                        <Row className="mt-4 mb-0">
                            <h1 className="item-align-center font-weight-bold">{thisOrg.name}</h1>
                        </Row>
                        <Row className="center-row">
                            <ButtonGroup>
                                {socialMediaPlatforms.map(platform => {
                                    if (thisOrg.socialMedia[platform.ref] && platform.type === 'iconify') {
                                        return (<a href={thisOrg.socialMedia[platform.ref]} target="_blank"><IconButton icon={platform.icon} className="mr-2 social-media-icon-button" /></a>);
                                    }
                                    else if (thisOrg.socialMedia[platform.ref] && platform.type === 'svg') {
                                        return (<a href={thisOrg.socialMedia[platform.ref]} target="_blank"><IconButton SVGIcon={platform.icon} className="mr-2 social-media-icon-button" /></a>);
                                    }
                                })
                                }
                            </ButtonGroup>
                        </Row>
                        <Row className="mb-3">
                            <Col xs={2} style={{ textAlign: 'right', marginTop: '-4px' }}>
                                <Icon icon={linkIcon} style={{ fontSize: '2rem', color: 'var(--gray3)' }} />
                            </Col>
                            <Col style={{ textAlign: 'left' }}>
                                <a href={thisOrg.website} target="_blank" rel="noreferrer">{thisOrg.website}</a>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col xs={2} style={{ textAlign: 'right', marginTop: '3px', marginBottom: 'auto' }}>
                                <Icon icon={descriptionIcon} style={{ fontSize: '2rem', color: 'var(--gray3)' }} />
                            </Col>
                            <Col xs={8} style={{ textAlign: 'left' }}>
                                {thisOrg.description}
                            </Col>
                        </Row>
                        <ToggleButton
                            selected={selected}
                            toggleSelected={() => {
                                setSelected(!selected);
                            }}
                        />
                        {!selected && <Container style={{ paddingBottom: "40px" }}>
                            <Row className="mb-3" style={{ textAlign: 'center' }}>
                                <h1 className="item-align-center font-weight-bold">Upcoming Events</h1>
                            </Row>
                            {/* DISPLAY UPCOMING EVENTS, assumes sorted order of UPCOMING_EVENTS array. */}
                            {UPCOMING_EVENTS.slice(0, maxEventsDisplayed).map(event => {
                                return (
                                    <OrgPageEventCard key={event.id} event={event} pastEvent={false} orgs={organizations}></OrgPageEventCard>
                                );
                            })}
                            {additionalUpcomingEvents}
                        </Container>
                        }
                        {selected &&
                            <Container>
                                {/* DISPLAY PAST EVENTS */}
                                <Row className="mb-3" style={{ textAlign: 'center' }}>
                                    <h1 className="item-align-center font-weight-bold org-page-past-event-header">Past Events</h1>
                                </Row>
                                {PAST_EVENTS.slice(0, maxEventsDisplayed).map(event => {
                                    return (
                                        <OrgPageEventCard key={event.id} event={event} pastEvent={true} orgs={organizations}></OrgPageEventCard>
                                    );
                                })}
                                {additionalPastEvents}
                            </Container>
                        }
                    </Container>
                </div>
                <FooterComponent page='OrgProfilePage' />
            </div>
        )
    }
    else
        return null;
}