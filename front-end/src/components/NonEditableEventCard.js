import { useContext } from 'react';
import { Container, Col, Card, Row } from 'react-bootstrap'

import { AllOrgContext } from '../providers/AllOrgProvider';
import { getFormattedTime } from './TimeUtils';

// This functional component displays a card with event info on the edit events page in the admin portal
// This card is used when either no event has been selected or the selected event is not owned by the user
export default function NonEditableEventCard({ event }) {

    const allOrgs = useContext(AllOrgContext);
    var relevantOrgs = event != null ? allOrgs.filter(org => event.orgs.includes(org.uId)) : null;

    if (event != null) {
        return (
            <Container>
                <Col>
                    <Card className={"drop-shadow pb-3"}>
                        <Row>
                            <Col style={{ textAlign: 'left' }}>
                                <h5 className="font-weight-bold">{event.title}</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={2} style={{ textAlign: 'left' }}>
                                <p className="mb-0">{(new Date(event.startTime)).toLocaleDateString()}</p>
                                <p className="mb-0">{!event.allDay ? getFormattedTime(new Date(event.startTime)) + " - " + getFormattedTime(new Date(event.endTime)) : null}</p>
                                <p className="mb-0">{event.location}</p>
                                <p className="mb-0">{relevantOrgs != null && relevantOrgs.map(org => org.shortName).join(", ")}</p>
                                {event.link != null && event.link !== '' && <a className="mb-0" href={event.link} target="_blank">Link</a>}
                            </Col>
                            <Col style={{ textAlign: 'left' }}>
                                <p>{event.description}</p>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Container>
        )
    }
    else {
        return (
            <Container>
                <Col>
                    <Card className={"drop-shadow pb-0"}>
                        <Row className="pb-2">
                            <Col style={{ textAlign: 'left' }}>
                                <h5 className="font-weight-bold card-title">No Event Selected</h5>
                            </Col>
                        </Row>
                        <Row className="pb-2">
                            <Col style={{ textAlign: 'center' }}>
                                <h6>Please select an event to get started!</h6>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Container>
        )
    }
}