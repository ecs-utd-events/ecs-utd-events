import { useState, useRef, useContext, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FormProvider, useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import IconButton from './IconButton';
import { getFormattedTime, getEventCardFormattedDate, getEventCardFormattedTime } from './TimeUtils';
import EditIcon from '@iconify/icons-mdi/lead-pencil';
import TrashIcon from '@iconify/icons-mdi/delete';
import Container from 'react-bootstrap/Container';
import SaveIcon from '@iconify/icons-mdi/content-save';
import CancelIcon from '@iconify/icons-mdi/close';
import { UserContext } from '../providers/UserProvider';
import { AllOrgContext } from '../providers/AllOrgProvider';

export default function EditableEventCard({ event, deleteEvent, isEditable, changeCalendarView, saveEvent }) {
    const { register, handleSubmit, watch, errors } = useForm();
    const [isEditing, setEditing] = useState(isEditable);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const orgs = useContext(AllOrgContext);
    const currOrg = useContext(UserContext);
    const relevantOrgs = event.orgs != null ? orgs.filter(org => event.orgs.includes(org.uId)) : [];
    const onSubmit = (eventInfo) => {
        setEditing(!isEditing);
        saveEvent(eventInfo, event.id);
    }

    const validateTime = async () => {
        if(startTime > endTime) return false;
    }

    const validateDate = async (date) => {
        var today = new Date().getTime(),
        date = date.split("/");

        date = new Date(date[2], date[1] - 1, date[0]).getTime();
        return (today - date) < 0;
    }

    const cancelEditing = (e) => {
        if(event.id === ''){
            deleteEvent(e, event.id);
        }
        setEditing(!isEditing);
    };

    if (event && !isEditing) {
        return (
            <Container>
                <Col>
                    <Card className={"drop-shadow mb-4 pb-0"}>
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
                                <a className="mb-0" href={event.link} target="_blank">More Info</a>
                            </Col>
                            <Col style={{ textAlign: 'left' }}>
                                <a className="mb-0" href={event.link}>Link</a>
                                <p>{event.description}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-end m-0">
                                <IconButton className="mr-2" icon={EditIcon} onClick={() => { setEditing(!isEditing); changeCalendarView(event.startTime); }}></IconButton>
                                <IconButton icon={TrashIcon} onClick={(e) => deleteEvent(e, event.id)}></IconButton>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Container>
        );
    } else if (event && isEditing) {
        return (
            <Container>
                <Col>
                    <Card className={"drop-shadow mb-4"}>
                        <Form onSubmit={handleSubmit(onSubmit)} style={{ display: 'inline-block' }}>
                            <Form.Group controlId="eventTitle">
                                <Form.Label>Event Title</Form.Label>
                                <Form.Control type="text" placeholder="Title" name="title" ref={register({ required: true })} defaultValue={event.title} />
                            </Form.Group>
                            <Form.Row>
                                <Form.Group as={Col} controlId="date">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" placeholder="Date" name="date" ref={register({ required: true, validate: validateDate })} defaultValue={getEventCardFormattedDate(event.startTime)}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="startTime">
                                    <Form.Label>Start time</Form.Label>
                                    <Form.Control type="time" placeholder="Start Time" name="startTime" ref={register({ required: true })} onChange={e => setStartTime(e.target.value)} defaultValue={getEventCardFormattedTime(event.startTime)}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="endTime">
                                    <Form.Label>End time</Form.Label>
                                    <Form.Control type="time" placeholder="End Time" name="endTime" ref={register({ required: true, validate: validateTime })} onChange={e => setEndTime(e.target.value)} defaultValue={getEventCardFormattedTime(event.endTime)}/>
                                    { errors.endTime && <p className="error">⚠ The start time must be before the end time.</p>}
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Col xs={3} style={{ textAlign: 'left' }}>
                                    <Form.Group controlId="location">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control type="text" placeholder="Location" name="location" ref={register({ required: true })} defaultValue={event.location} />
                                    </Form.Group>
                                    <Form.Group controlId="orgs">
                                        <Form.Label>Collaborator(s)</Form.Label>
                                        <Form.Control type="text" placeholder="Collaborator(s)" name="orgs" as="select" multiple ref={register({ required: false })} defaultValue={event.orgs}>
                                            {orgs.map(org => { if(currOrg.org.uId !== org.uId) { return <option key={org.uId} value={org.uId}>{org.shortName}</option> }})}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col style={{ textAlign: 'left' }}>
                                    <Form.Group controlId="link">
                                        <Form.Label>Link</Form.Label>
                                        <Form.Control type="url" placeholder="Link" name="link" ref={register({ required: true })} defaultValue={event.link} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" as="textarea" rows={4} placeholder="Description" name="description" ref={register({ required: true })} defaultValue={event.description} />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col md={{ span: 10, offset: 10 }}>
                                    <IconButton className="mr-2" icon={SaveIcon} type="submit" disabled={orgs.some(org => org.uId === currOrg.org)} onClick={handleSubmit(onSubmit)}></IconButton>
                                    <IconButton className="mr-2" icon={CancelIcon} onClick={cancelEditing}></IconButton>
                                    {/* <IconButton icon={TrashIcon} onClick={(e) => deleteEvent(e, event.id)}></IconButton> */}
                                </Col>
                            </Form.Row>
                        </Form>
                    </Card>
                </Col>
            </Container>
        );
    } else {
        return (
            null
        );
    }
}
