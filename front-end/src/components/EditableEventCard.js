import { useState, useContext, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Skeleton from '@material-ui/lab/Skeleton';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import EditIcon from '@iconify/icons-mdi/lead-pencil';
import TrashIcon from '@iconify/icons-mdi/delete';
import Container from 'react-bootstrap/Container';
import SaveIcon from '@iconify/icons-mdi/content-save';
import CancelIcon from '@iconify/icons-mdi/close';

import IconButton from './IconButton';
import { getFormattedTime, getCSTFormattedDate, getCSTFormattedTime, eventCardFormatToISO } from './TimeUtils';
import { UserContext } from '../providers/UserProvider';
import { AllOrgContext } from '../providers/AllOrgProvider';
import DeleteEventModal from "../components/DeleteEventModal";
import Tag from "./Tag";


export function LoadingEventCard() {
    return (
        <Container>
            <Col>
                <Card className={"drop-shadow mb-4 pb-0"}>
                    <Row>
                        <Col style={{ textAlign: 'left' }}>
                            <h5 className="font-weight-bold"><Skeleton animation="wave" /></h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2} style={{ textAlign: 'left' }}>
                            <p className="mb-0"><Skeleton animation="wave" /></p>
                            <p className="mb-0"><Skeleton animation="wave" /></p>
                            <p className="mb-0"><Skeleton animation="wave" /></p>
                            <p className="mb-0"><Skeleton animation="wave" /></p>
                            <a className="mb-0"><Skeleton animation="wave" /></a>
                        </Col>
                        <Col style={{ textAlign: 'left' }}>
                            <Skeleton animation="wave" variant="rect" height="5em" />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-end m-0">
                            <Skeleton animation="wave" className="mr-2"><IconButton icon={EditIcon} /></Skeleton>
                            <Skeleton animation="wave"><IconButton icon={TrashIcon} /></Skeleton>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Container>
    )
}

function getOrgIds(allOrgs) {
    var orgIdsOnly = [];
    for (var i = 0; i < allOrgs.length; i++) {
        orgIdsOnly.push(allOrgs[i].uId);
    }
    return orgIdsOnly;
}

export default function EditableEventCard({ tags, event, deleteEvent, setIsEditing, isEditing, changeCalendarView, saveEvent }) {
    const orgs = useContext(AllOrgContext);
    const currOrg = useContext(UserContext);

    const relevantOrgs = (event != null && event.orgs != null) ? orgs.filter(org => event.orgs.includes(org.uId)) : [];
    const defaultTags = event.tags != null ? event.tags : [];
    const defaultCollaborators = relevantOrgs.filter(org => org.uId !== currOrg.org.uId);

    const { register, handleSubmit, watch, errors } = useForm();
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [tagsFilterValue, setTagsFilterValue] = useState(defaultTags)
    const [orgFilterValue, setOrgFilterValue] = useState(defaultCollaborators)

    const watchDescription = watch("description", event != null ? event.description : false);

    useEffect(() => {
        if (event != null) {
            setStartTime(getCSTFormattedTime(event.startTime));
            setEndTime(getCSTFormattedTime(event.endTime));
        }
    }, []);

    const onSubmit = (eventInfo) => {
        eventInfo["tags"] = tagsFilterValue;
        eventInfo["orgs"] = orgFilterValue;
        saveEvent(eventInfo, event.id, currOrg.org.uId, setIsLoading);
    }

    const validateTime = async () => {
        if (startTime > endTime) return false;
    }

    const validateDate = async (date) => {
        const fullDate = eventCardFormatToISO(date, startTime);
        if (event.id === '') {
            var today = new Date();
            return today < new Date(fullDate);
        }
        return true;
    }

    const cancelEditing = (e) => {
        e.preventDefault()
        if (event.id === '') {
            deleteEvent(event.id);
        }
        setIsEditing(false);
    };

    const startEditing = (e) => {
        setIsEditing(true);
        changeCalendarView(event.startTime);
    }

    if (isLoading) {
        return <LoadingEventCard />
    }

    if (event != null && !isEditing) {
        return (
            <Container>
                <Col>
                    <Card className={"drop-shadow pb-0"}>
                        <Row>
                            <Col style={{ textAlign: 'left' }}>
                                <h5 className="font-weight-bold">{event.title}</h5>
                            </Col>
                        </Row>
                        <Row className="pb-3">
                            <Col xs={2} style={{ textAlign: 'left' }}>
                                <p className="mb-0">{(new Date(event.startTime)).toLocaleDateString()}</p>
                                <p className="mb-0">{!event.allDay ? getFormattedTime(new Date(event.startTime)) + " - " + getFormattedTime(new Date(event.endTime)) : null}</p>
                                <p className="mb-0">{event.location}</p>
                                <p className="mb-0">{relevantOrgs != null && relevantOrgs.map(org => org.shortName).join(", ")}</p>
                                {event.link != null && event.link !== '' && <a className="mb-0" href={event.link} target="_blank">Link</a>}
                            </Col>
                            <Col style={{ textAlign: 'left' }} className="d-flex">
                                <Row>
                                    <p className="pr-3">{event.description}</p>
                                </Row>
                                {event.tags == null &&
                                    <Row className="d-flex flex-grow-1">
                                        <Col className="d-flex justify-content-end align-items-end m-0">
                                            <IconButton className="mr-2 my-0" icon={EditIcon} onClick={startEditing}></IconButton>
                                            <IconButton className="my-0" icon={TrashIcon} onClick={(e) => { e.preventDefault(); setShow(true); }}></IconButton>
                                        </Col>
                                    </Row>
                                }
                            </Col>
                        </Row>
                        {event.tags != null &&
                            <Row>
                                <Col>
                                    {event.tags.map((label, index) => <Tag key={index} type="accent">{label}</Tag>)}
                                </Col>
                                <Col className="d-flex justify-content-end align-items-end m-0 mb-3">
                                    <IconButton className="mr-2 my-0" icon={EditIcon} onClick={startEditing}></IconButton>
                                    <IconButton className="my-0" icon={TrashIcon} onClick={(e) => { e.preventDefault(); setShow(true); }}></IconButton>
                                </Col>
                            </Row>
                        }
                    </Card>
                </Col>
                <DeleteEventModal show={show} onHide={() => setShow(false)} delete={() => deleteEvent(event.id)} title={event.title} />
            </Container>
        );
    } else if (event != null && isEditing) {
        return (
            <Container>
                <Col>
                    <Card className={"drop-shadow"}>
                        <Form onSubmit={handleSubmit(onSubmit)} style={{ display: 'inline-block' }}>
                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="eventTitle">
                                        <Form.Label>Event Title</Form.Label>
                                        <Form.Control type="text" placeholder="Title" name="title" ref={register({ required: true })} defaultValue={event.title} />
                                    </Form.Group>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="date">
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control type="date" placeholder="Date" name="date" ref={register({ required: true, validate: validateDate })} onChange={e => changeCalendarView(e.target.value)} defaultValue={event.startTime == '' ? getCSTFormattedDate(new Date()) : getCSTFormattedDate(event.startTime)} />
                                            {errors.date && <p className="error">⚠ Please do not create past events.</p>}
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="startTime">
                                            <Form.Label>Start time</Form.Label>
                                            <Form.Control type="time" placeholder="Start Time" name="startTime" ref={register({ required: true })} onChange={e => { setStartTime(e.target.value); changeCalendarView(e.target.value) }} defaultValue={getCSTFormattedTime(event.startTime)} />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="endTime">
                                            <Form.Label>End time</Form.Label>
                                            <Form.Control type="time" placeholder="End Time" name="endTime" ref={register({ required: true, validate: validateTime })} onChange={e => setEndTime(e.target.value)} defaultValue={getCSTFormattedTime(event.endTime)} />
                                            {errors.endTime && <p className="error">⚠ The start time must be before the end time.</p>}
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col xs={3} style={{ textAlign: 'left' }}>
                                            <Form.Group controlId="location">
                                                <Form.Label>Location</Form.Label>
                                                <Form.Control type="text" placeholder="Location" name="location" ref={register({ required: true })} defaultValue={event.location} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Collaborators</Form.Label>
                                                <Autocomplete
                                                    name="orgs"
                                                    defaultValue={defaultCollaborators}
                                                    options={orgs.filter(org => org.uId != currOrg.org.uId)}
                                                    defaultValue={relevantOrgs.filter(org => org.uId !== currOrg.org.uId)}
                                                    onChange={(e, value, _) => setOrgFilterValue(getOrgIds(value))}
                                                    loading={orgs.length === 0}
                                                    renderInput={(params) => <TextField {...params} margin="small" />}
                                                    getOptionLabel={(org) => org.shortName}
                                                    getOptionSelected={(option, value) => option.uId === value.uId}
                                                    limitTags={1}
                                                    // clearOnEscape
                                                    multiple
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col style={{ textAlign: 'left' }}>
                                            {/* <Col className="d-flex align-items-end"> */}
                                            <Form.Group controlId="link">
                                                <Form.Label>Link</Form.Label>
                                                <Form.Control type="url" placeholder="Link" name="link" ref={register()} defaultValue={event.link || ''} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Row>
                                                    <Col>
                                                        <Form.Label>Description</Form.Label>
                                                    </Col>
                                                    <Col style={{ textAlign: 'end' }}>
                                                        <Form.Label style={watchDescription.length > 500 ? { color: "red" } : null}>{watchDescription.length}/500 chars</Form.Label>
                                                    </Col>
                                                </Row>
                                                <Form.Control type="text" as="textarea" rows={4} placeholder="Description" name="description" ref={register({ required: true, maxLength: 500 })} defaultValue={event.description} />
                                            </Form.Group>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Group>
                                                <Form.Label>Tags (max 5)</Form.Label>
                                                <Autocomplete
                                                    defaultValue={defaultTags}
                                                    loading={tags.length === 0}
                                                    options={tags}
                                                    renderInput={(params) => <TextField {...params} margin="small" />}
                                                    multiple
                                                    onChange={(e, value, _) => setTagsFilterValue(value)}
                                                    getOptionDisabled={(_) => tagsFilterValue.length >= 5 ? true : false}
                                                    disableCloseOnSelect />
                                            </Form.Group>
                                        </Col>
                                    </Form.Row>
                                </Col>
                                <Col xs={1}>
                                    <div className="sticky-button-wrapper">
                                        <Row>
                                            <IconButton className="ml-4 my-0" icon={SaveIcon} type="submit" disabled={orgs.some(org => org.uId === currOrg.org)} onClick={handleSubmit(onSubmit)}></IconButton>
                                        </Row>
                                        <Row>
                                            <IconButton className="ml-4 mt-2" icon={CancelIcon} onClick={cancelEditing}></IconButton>
                                        </Row>
                                    </div>
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
