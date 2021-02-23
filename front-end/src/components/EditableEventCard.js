import { useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Editable } from './Editable';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

export default function EditableEventCard({ event }) {
    const inputRef = useRef();
    const { register } = useForm();
    const [dateTime, setDateTime] = useState(event.start);
    const [title, setTitle] = useState(event.title);
    const [location, setLocation] = useState(event.location);
    const [org, setOrg] = useState(event.org);
    const [link, setLink] = useState(event.link);
    const [description, setDescription] = useState(event.description);

    if (event != null) {
        return (
            <Form>
                <Card className="drop-shadow mb-4">
                    <Row>
                        <Col xs={5} style={{ textAlign: 'left' }}>
                            <h5>
                                <Editable
                                    text={title}
                                    type="input"
                                    childRef={inputRef}
                                >
                                    <Form.Control type="text" placeholder={title} value={title} name="Title" ref={inputRef} onChange={e => setTitle(e.target.value)} />
                                </Editable>
                            </h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3} style={{ textAlign: 'left' }}>
                            <Editable
                                text={dateTime}
                                type="input"
                                childRef={inputRef}
                            >
                                <Form.Control type="datetime-local" placeholder={dateTime} value={dateTime} name="Start" ref={inputRef} onChange={e => setDateTime(e.target.value)} />
                            </Editable>
                            {/* <p className="mb-0">{event.start.toDateString()}</p> */}
                            {/* <span>{!event.allDay ? event.start.toLocaleTimeString() + " - " + event.end.toLocaleTimeString() : null}</span> */}
                            <Editable
                                text={location}
                                type="input"
                                childRef={inputRef}
                            >
                                <Form.Control type="text" placeholder={location} value={location} name="Location" ref={inputRef} onChange={e => setLocation(e.target.value)} />
                            </Editable>
                            <Editable
                                text={org}
                                type="input"
                                childRef={inputRef}
                            >
                                <Form.Control type="text" placeholder={org} value={org} name="org" ref={inputRef} onChange={e => setOrg(e.target.value)} />
                            </Editable>
                            <Editable
                                text={link}
                                type="textarea"
                                childRef={inputRef}
                            >
                                <Form.Control type="url" placeholder={link} value={link} name="Link" ref={inputRef} onChange={e => setLink(e.target.value)} />
                            </Editable>
                        </Col>
                        <Col style={{ textAlign: 'left' }}>
                            <Editable
                                text={description}
                                type="url"
                                childRef={inputRef}
                            >
                                <Form.Control type="text" as="textarea" rows={5} placeholder="Description" value={description} name="Description" ref={inputRef} onChange={e => setDescription(e.target.value)} />
                            </Editable>
                        </Col>
                    </Row>
                </Card>
            </Form>
        )
    } else {
        return (
            null
        );
    }
}