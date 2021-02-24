import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function OrgPageEventCard({ event, pastEvent }) {
    const backgroundColor = pastEvent == true ? "org-page-past-event-card" : "";
    if (event != null) {
        return (
            <Card className={"drop-shadow mb-4 " + backgroundColor}>
                <Row>
                    <Col style={{ textAlign: 'left' }}>
                        <h5 className="font-weight-bold">{event.title}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} md={2} style={{ textAlign: 'left' }}>
                        {/* <p className="mb-0">{event.start.toDateString()}</p> */}
                        {/* <span>{!event.allDay ? event.start.toLocaleTimeString() + " - " + event.end.toLocaleTimeString() : null}</span> */}
                        <p className="mb-0">{event.start}</p>
                        <p className="mb-0">{event.location}</p>
                        <p className="mb-0">{event.org}</p>
                        <a className="mb-0" href={event.link}>More Info</a>
                    </Col>
                    <Col style={{ textAlign: 'left' }}>
                        <p>{event.description}</p>
                    </Col>
                </Row>
            </Card>
        )
    } else {
        return (
            null
        );
    }
}