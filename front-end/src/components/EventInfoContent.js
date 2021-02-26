import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Card from "react-bootstrap/esm/Card";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShowMoreText from 'react-show-more-text';
import ShareIcon from '@iconify/icons-gg/share';
import LinkIcon from '@iconify/icons-gg/link';

import IconButton from '../components/IconButton';
import Tag from "./Tag";
import { ReactComponent as CalendarIcon } from './../assets/calendar.svg';
import { ReactComponent as GroupIcon } from './../assets/group.svg';
import { ReactComponent as PlaceholderIcon } from './../assets/placeholder.svg';
import { useEffect, useState } from "react";

export function ListItemLayout({ Icon, children }) {
    return (
        <Row>
            <Col xs={2}>
                <Icon className="event-icon" />
            </Col>
            <Col>
                {children}
            </Col>
        </Row>
    )
}

export function getFormattedTime(time) {
    return time.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
}

export function lastUpdatedToString(time) {
    var lastUpdatedUnixTime = Date.parse(time);
    // difference in milliseconds
    var milliDiff = Date.now() - lastUpdatedUnixTime;
    var minutes = Math.floor(milliDiff / 60000);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var months = Math.floor(days / 30);
    var years = Math.floor(months / 12);

    if (minutes === 1)
        return '1 minute ago.'
    else if (minutes < 60)
        return String(minutes) + ' minutes ago.'
    else if (hours < 24)
        return String(hours) + ' hours ago.'
    else if (days < 30)
        return String(days) + ' days ago.'
    else if (months < 12)
        return String(months) + ' months ago.'
    else
        return String(years) + ' years ago.'

}

export default function EventInfoContent({ event, mobile }) {
    // Need to fetch orgName from the org with orgSlug given by: "event.extendedProps.org"
    const [org, setOrgInfo] = useState({});
    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/orgs/' + event.extendedProps.org)
            .then(response => response.json())
            .then(data => setOrgInfo(data))
            .catch(error => {
                console.error('There was an error fetching events for this org: ' + event.extendedProps.org, error);
            });
    }, [event.extendedProps.org]);

    var lastUpdatedStr = lastUpdatedToString(event.extendedProps.lastUpdated);

    return (
        <>
            <Card.Header className="card-header-no-border">
                <h3 className="font-weight-bold card-title mb-0">{event.title}</h3>
            </Card.Header>
            <Card.Body className="pt-2">
                <ListGroup className="list-group-flush text-left">
                    <ListGroupItem className="px-0">
                        <ListItemLayout Icon={CalendarIcon}>
                            {event.start.toDateString()}<br />
                            {!event.allDay ? getFormattedTime(event.start) + " - " + getFormattedTime(event.end) : null}
                        </ListItemLayout>
                    </ListGroupItem>
                    <ListGroupItem className="px-0">
                        <ListItemLayout Icon={PlaceholderIcon}>
                            {event.extendedProps.location || 'Unspecified Location'}
                        </ListItemLayout>
                    </ListGroupItem>
                    <ListGroupItem className="px-0">
                        <ListItemLayout Icon={GroupIcon}>
                            {org.name || 'Organization'}
                        </ListItemLayout>
                    </ListGroupItem>
                    <ListGroupItem className="px-0">
                        {(mobile == null || !mobile) &&
                            <ShowMoreText
                                lines={3}
                                more={'Read more'}
                                less={'Read less'}
                                expanded={false}>{event.extendedProps.description}
                            </ShowMoreText>
                        }
                        {mobile &&
                            <p>{event.extendedProps.description}</p>
                        }
                    </ListGroupItem>
                </ListGroup>
            </Card.Body>
            {event.extendedProps.tags != null &&
                <Row>
                    <Col>
                        {event.extendedProps.tags.map((label, index) => <Tag key={index} type="accent">{label}</Tag>)}
                    </Col>
                </Row>
            }
            <Row>
                <Col className="d-flex align-items-end">
                    <p className="text-muted " style={{ fontSize: '.75rem' }}>Last updated {lastUpdatedStr}</p>
                </Col>
                <Col className="d-flex align-item-end justify-content-end">
                    <ButtonGroup>
                        {event.extendedProps.link != null &&
                            <IconButton className="mr-1 color-black" icon={LinkIcon} href={event.extendedProps.link} target="_blank"></IconButton>
                        }
                        <IconButton className="mr-1" SVGComponent={CalendarIcon}></IconButton>
                        <IconButton className="mr-1" icon={ShareIcon}></IconButton>
                    </ButtonGroup>
                </Col>
            </Row>
        </>
    )
}