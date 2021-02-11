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
import Collapse from 'react-bootstrap/Collapse';
import Calendar from '../assets/calendar.svg';
import Placeholder from '../assets/placeholder.svg';
import Description from '../assets/product-description.svg';
import Share from '../assets/share.svg';
import Group from '../assets/group.svg';
import LinkSVG from '../assets/link.svg';


export default function EventInfoCard({ event }) {
    const [open, setOpen] = useState(false);
    if (event != null) {
        return (
            <Card className="drop-shadow card">
                <Card.Header className="card-header-no-border">
                    <h3 className="font-weight-bold card-title">{event.title}</h3>
                </Card.Header>
                <Card.Body>
                    <ListGroup className="list-group-flush text-left">
                        <ListGroupItem>
                            <Image className="event-icon mr-2" src={Calendar}></Image>
                            <span>{event.start.toDateString()}</span><br/>
                            <span>{!event.allDay ? event.start.toLocaleTimeString() + " - " + event.end.toLocaleTimeString() : null}</span>
                        </ListGroupItem>
                        <ListGroupItem><Image className="event-icon mr-2" src={Placeholder}></Image>{event.extendedProps.location || 'Unspecified Location'}</ListGroupItem>
                        <ListGroupItem><Image className="event-icon mr-2" src={Group}></Image>{event.extendedProps.org || 'Organization'} </ListGroupItem>
                        <ListGroupItem>
                            <span onClick={() => setOpen(!open)}>
                                <Image className="event-icon mr-2" src={Description}></Image>
                                Description
                            </span>
                            <Collapse in={open}>
                                <div className="mt-2" id="collapse-text">
                                    {event.extendedProps.description || 'Here\'s the Description'}
                                </div>
                            </Collapse>
                        </ListGroupItem>
                    </ListGroup>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted mr-sm-2">Last updated 2 mins ago</small>
                    <ButtonGroup>
                        <IconButton className="mr-1" icon={LinkSVG}></IconButton>
                        <IconButton className="mr-1" icon={Calendar}></IconButton>
                        <IconButton className="mr-1" icon={Share}></IconButton>
                    </ButtonGroup>
                </Card.Footer>
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