import { useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Editable } from './Editable';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import OrgPageEventCard from './OrgPageEventCard';
import IconButton from './IconButton';
import CloseIcon from '@iconify/icons-gg/close';
import EditIcon from '@iconify/icons-gg/edit-markup';

export default function EditableEventCard({ event }) {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    const [isEditing, setEditing] = useState(false);
    // var isEdit = false;
    if (isEditing) {
        return (
            <div className="App">
            <Card className={"drop-shadow mb-4 "}>
                <Form>
                    <Row>
                        <Col xs={5} style={{ textAlign: 'left' }}>
                            <Form.Control className="mb-4" type="text" placeholder="Title" name="Title" value={event.title} ref={register} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3} style={{ textAlign: 'left' }}>
                            {/* <p className="mb-0">{event.start.toDateString()}</p> */}
                            {/* <span>{!event.allDay ? event.start.toLocaleTimeString() + " - " + event.end.toLocaleTimeString() : null}</span> */}
                            <Form.Control className="mb-4" type="datetime-local" placeholder="Date" value={event.start} name="Date" ref={register} />
                            <Form.Control className="mb-4" type="text" placeholder="Location" value={event.location} name="Location" ref={register} />
                            <Form.Control className="mb-4" type="url" placeholder="Link" value={event.link}name="Link" ref={register} />
                            <Form.Control className="mb-4" type="text" placeholder="Collaborator(s)" name="Collaborator(s)" as="select" value={event.org} custom>
                                <option>1</option>
                            </Form.Control>
                        </Col>
                        <Col style={{ textAlign: 'left' }}>
                            <Form.Control type="text" as="textarea" rows={3} placeholder="Description" name="Description" value={event.desecription} ref={register} />
                            <IconButton icon={CloseIcon} onClick={() => setEditing(!isEditing)}></IconButton>
                        </Col>
                    </Row>
                </Form>
            </Card>
            </div>
        )
    } else {
        return (
            <div>
                <Card className="drop-shadow mb-4">
                    <Row>
                        <Col xs={5} style={{ textAlign: 'left' }}>
                            <Form.Control className="mb-4" type="text" placeholder="Title" name="Title" value={event.title} ref={register} readOnly/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3} style={{ textAlign: 'left' }}>
                            <Form.Control className="mb-4" type="datetime-local" placeholder="Date" value={event.start} name="Date" ref={register} readOnly/>
                            <Form.Control className="mb-4" type="text" placeholder="Location" value={event.location} name="Location" ref={register} readOnly/>
                            <Form.Control className="mb-4" type="url" placeholder="Link" value={event.link}name="Link" ref={register} readonly={true} readOnly />
                            <Form.Control className="mb-4" type="url" placeholder="Collaborator(s)" value={event.org} name="Org" ref={register} readonly={true} readOnly />
                        </Col>
                        <Col style={{ textAlign: 'left' }}>
                            <Form.Control className="mb-4" type="text" placeholder="Description" value={event.description} name="description" ref={register} readOnly/>

                            <IconButton icon={EditIcon} onClick={() => setEditing(!isEditing)}></IconButton>
                        </Col>


                    </Row>

                </Card>
            </div>
        );
    }
}