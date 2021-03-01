import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import EditIcon from '@iconify/icons-gg/edit-markup';
import TrashIcon from '@iconify/icons-gg/trash';
import IconButton from './IconButton';
import { ButtonGroup, OverlayTrigger } from 'react-bootstrap';
import { getFormattedTime } from './TimeUtils';

export default function OrgPageEventCard({ event, pastEvent, isEditable }) {
    const backgroundColor = pastEvent === true ? "org-page-past-event-card" : "";
    if (event && !isEditable) {
        return (
            <Card className={"drop-shadow mb-4 " + backgroundColor}>
                <Row>
                    <Col style={{ textAlign: 'left', wordBreak: 'break-all' }}>
                        <h5 className="font-weight-bold">{event.title}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} md={2} style={{ textAlign: 'left' }}>
                        {/* <p className="mb-0">{event.start.toDateString()}</p> */}
                        <p className="mb-0">{!event.allDay ? getFormattedTime(new Date(event.startTime)) + " - " + getFormattedTime(new Date(event.endTime)) : null}</p>
                        <p className="mb-0">{event.location}</p>
                        <p className="mb-0">{event.orgs}</p>
                        <a className="mb-0" href={event.link }target="_blank">More Info</a>
                    </Col>
                    <Col style={{ textAlign: 'left' }}>
                        <p>{event.description}</p>
                    </Col>
                </Row>
            </Card>
        )
    } else if (event && isEditable) {
        return (
            <Card className={"drop-shadow mb-4"}>
                <Row>
                    <Col style={{ textAlign: 'left' }}>
                        <h5 className="font-weight-bold">{event.title}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} style={{ textAlign: 'left' }}>
                        {/* <p className="mb-0">{event.start.toDateString()}</p> */}
                        <p className="mb-0">{!event.allDay ? getFormattedTime(new Date(event.startTime)) + " - " + getFormattedTime(new Date(event.endTime)) : null}</p>
                        <p className="mb-0">{event.start}</p>
                        <p className="mb-0">{event.location}</p>
                        <p className="mb-0">{event.orgs}</p>
                        <a className="mb-0" href={event.link}>More Info</a>
                    </Col>
                    <Col style={{ textAlign: 'left' }}>
                        <p>{event.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 10, offset: 10 }}>
                        <ButtonGroup>
                            <IconButton className="mr-2" icon={EditIcon}></IconButton>
                            <IconButton icon={TrashIcon}></IconButton>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Card>
        );
    } else {
        return (
            null
        );
    }
}