import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tag from './Tag';
import { getFormattedTime } from './TimeUtils';

export default function OrgPageEventCard({ event, pastEvent, orgs }) {
    const backgroundColor = pastEvent === true ? "org-page-past-event-card" : "";
    if (event != null && orgs != null) {
        // Get the relevant other organizations for this event
        var relevantOrgs = orgs.filter(org => event.orgs.includes(org.uId));
        return (
            <Card className={"drop-shadow mb-4 " + backgroundColor}>
                <Row>
                    <Col style={{ textAlign: 'left', wordBreak: 'break-all' }}>
                        <h5 className="font-weight-bold">{event.title}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} md={2} style={{ textAlign: 'left', paddingBottom: '5px' }}>
                        {/* <p className="mb-0">{event.start.toDateString()}</p> */}
                        <p className="mb-0">{!event.allDay ? getFormattedTime(new Date(event.startTime)) + " - " + getFormattedTime(new Date(event.endTime)) : null}</p>
                        <p className="mb-0">{event.location}</p>
                        <p className="mb-0">{relevantOrgs != null && relevantOrgs.map(org => org.shortName).join(", ")}</p>
                        <a className="mb-0" href={event.link} target="_blank">More Info</a>
                    </Col>
                    <Col style={{ textAlign: 'left' }}>
                        <p>{event.description}</p>
                    </Col>
                </Row>
                {event.tags != null && <Row className="ml-0">
                    {
                        event.tags.map((label, index) =>
                            <Tag
                                key={index}
                                type={pastEvent ? "" : "accent"}
                                style={{ backgroundColor: pastEvent && 'var(--secondary3)', margin: '2px' }}
                            >
                                {label}
                            </Tag>
                        )
                    }
                </Row>}
            </Card>
        )
    } else {
        return (
            null
        );
    }
}
