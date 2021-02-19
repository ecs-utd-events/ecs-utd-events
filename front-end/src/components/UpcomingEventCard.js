import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function UpcomingEventCard({ event }){
    if (event != null) {
        return (
            <Card className="drop-shadow mb-4">
                <Row>
                    <Col xs={5} style={{ textAlign: 'left' }}>
                        <h5 className="font-weight-bold">{event.title}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3} style={{ textAlign: 'left' }}>
                        {/* <p className="mb-0">{event.start.toDateString() + "|"
                        + !event.allDay ? event.start.toLocaleTimeString() + " - " + event.end.toLocaleTimeString() : null}</p> */}
                        <p className="mb-0">{event.extendedProps.location}</p>
                        <p className="mb-0">{event.extendedProps.org}</p>
                        <a className="mb-0" href={event.extendedProps.link}>{event.extendedProps.link}</a>
                    </Col>
                    <Col style={{ textAlign: 'left'}}>
                        <p>{event.extendedProps.description}</p>
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