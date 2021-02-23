import { DialogTitle } from '@material-ui/core';
import { useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Editable } from './Editable';

export default function EditableEventCard({ event }) {
    const inputRef = useRef();
    const [start, setStart] = useState(event.start);
    const [end, setEnd] = useState(event.end);
    const [title, setTitle] = useState(event.title);
    const [location, setLocation] = useState(event.location);
    const [org, setOrg] = useState(event.org);
    const [link, setLink] = useState(event.link);
    const [description, setDescription] = useState(event.description);
    
    if (event != null) {
        return (
            <Card className="drop-shadow mb-4">
                <Row>
                    <Col xs={5} style={{ textAlign: 'left' }}>
                        <h5>
                        <Editable
                                text={title}
                                type="input"
                                childRef={inputRef}
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    name="start"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}>
                                </input>
                            </Editable>
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3} style={{ textAlign: 'left' }}>
                        <Editable
                            text={start}
                            type="input"
                            childRef={inputRef}
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                name="start"
                                value={start}
                                onChange={e => setStart(e.target.value)}>
                            </input>
                        </Editable>
                        {/* <p className="mb-0">{event.start.toDateString()}</p> */}
                        {/* <span>{!event.allDay ? event.start.toLocaleTimeString() + " - " + event.end.toLocaleTimeString() : null}</span> */}
                        <Editable
                            text={location}
                            type="input"
                            childRef={inputRef}
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                name="location"
                                value={location}
                                onChange={e => setLocation(e.target.value)}>
                            </input>
                        </Editable>
                        <Editable
                            text={org}
                            type="input"
                            childRef={inputRef}
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                name="org"
                                placeholder={org}
                                onChange={e => setOrg(e.target.value)}>
                            </input>
                        </Editable>
                        <Editable
                            text={link}
                            type="textarea"
                            childRef={inputRef}
                        >
                            <textarea
                                ref={inputRef}
                                type="text"
                                name="link"
                                value={link}
                                onChange={e => setLink(e.target.value)}>
                            </textarea>
                        </Editable>
                    </Col>
                    <Col style={{ textAlign: 'left' }}>
                    <Editable
                            text={description}
                            type="textarea"
                            childRef={inputRef}
                        >
                            <textarea
                                ref={inputRef}
                                type="text"
                                name="link"
                                value={description}
                                style={{ overflow: "scroll" }}
                                cols="90"
                                rows="5"
                                onChange={e => setDescription(e.target.value)}>
                            </textarea>
                        </Editable>
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