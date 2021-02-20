import { useState } from 'react';

import Card from "react-bootstrap/esm/Card";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import IconButton from '../components/IconButton';
import Image from 'react-bootstrap/Image';
import {
    Link
} from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShowMoreText from 'react-show-more-text';

import Calendar from '../assets/calendar.svg';
import Placeholder from '../assets/placeholder.svg';
import Description from '../assets/product-description.svg';
import Share from '../assets/share.svg';
import Group from '../assets/group.svg';
import LinkSVG from '../assets/link.svg';
import Dropdown from '../assets/down-arrow.svg';

const INFO_CARD_WIDTH = 50;
export default function EventInfoCard({ event, animateCard, setAnimateCard }) {
    const [open, setOpen] = useState(false);
    const onAnimationEnd = () => {
        setAnimateCard('')
    }
    if (event != null) {
        return (
            <Card className="drop-shadow card">
                <div style={{ height: "100%", width: "100%", position: "absolute", top: 0, left: 0 }}>
                    <div style={{ height: "100%", width: "100%", position: "relative", overflow: "hidden" }}>
                        <div style={{ display: animateCard == '' ? 'none' : 'block' }} className={"blob " + animateCard} onAnimationEnd={onAnimationEnd}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 350">
                                <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <Card.Header className="card-header-no-border">
                    <h3 className="font-weight-bold card-title">{event.title}</h3>
                </Card.Header>
                <Card.Body>
                    <ListGroup className="list-group-flush text-left">
                        <ListGroupItem className="px-0">
                            <Image className="event-icon mr-2" src={Calendar}></Image>
                            <span>{event.start.toDateString()}</span><br />
                            <span>{!event.allDay ? event.start.toLocaleTimeString() + " - " + event.end.toLocaleTimeString() : null}</span>
                        </ListGroupItem>
                        <ListGroupItem className="px-0"><Image className="event-icon mr-2" src={Placeholder}></Image>{event.extendedProps.location || 'Unspecified Location'}</ListGroupItem>
                        <ListGroupItem className="px-0"><Image className="event-icon mr-2" src={Group}></Image>{event.extendedProps.org || 'Organization'} </ListGroupItem>
                        <ListGroupItem className="px-0">
                            <ShowMoreText 
                                lines={2}
                                more={'Read more'}
                                less={'Read less'}
                                expanded={false}>{event.extendedProps.description}</ShowMoreText>
                        </ListGroupItem>
                    </ListGroup>
                </Card.Body>
                <Row>
                    <Col className="d-flex align-items-end">
                        <p className="text-muted " style={{ fontSize: '.75rem'}}>Last updated 2 mins ago</p>
                    </Col>
                    <Col>
                        <ButtonGroup>
                            <IconButton className="mr-1" icon={LinkSVG}></IconButton>
                            <IconButton className="mr-1" icon={Calendar}></IconButton>
                            <IconButton className="mr-1" icon={Share}></IconButton>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Card>
        );
    } else {
        return (
            <Card className="drop-shadow card">
                <Card.Header className="card-header-no-border">
                    <h3 className="font-weight-bold card-title">No Event Selected</h3>
                </Card.Header>
                <Card.Body>
                    <p>Welcome to ECS UTD Events!</p>
                    <p>You can check out all the upcoming events planned by ECS Student Orgs in one place!</p>
                    <p>If you are an organization and are not already partnered with us, sign up <Link to="/login">here</Link></p>
                </Card.Body>
            </Card>
        )
    }
}