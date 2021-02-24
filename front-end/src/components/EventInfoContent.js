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

export default function EventInfoContent({ event, mobile }) {
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
                            {event.extendedProps.org || 'Organization'}
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
                    <p className="text-muted " style={{ fontSize: '.75rem' }}>Last updated 2 mins ago</p>
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