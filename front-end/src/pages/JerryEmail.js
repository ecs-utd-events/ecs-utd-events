import { Card, Col, Container, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';

import { getAPIFormattedISOString, getFormattedDate } from '../components/TimeUtils';
import CustomButton from "../components/CustomButton";
import { useContext, useRef, useState } from "react";
import { AllOrgContext } from "../providers/AllOrgProvider";

const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

const getEventString = (curEvent, orgs) => {
    let orgString = ''
    for (let j = 0; j < curEvent.orgs.length; j += 1) {
        let curOrg = orgs.find(org => org.uId === curEvent.orgs[j]);
        orgString += curOrg.shortName;
        if (j < curEvent.orgs.length - 1) {
            orgString += ' X ';
        }
    }
    const curDate = new Date(curEvent.startTime);
    const eventLink = curEvent.link != null ? addProtocol(curEvent.link) : ""
    return (curEvent.title + ' -- ' + orgString + '\n' + curDate.toLocaleTimeString() + '\t|\t'
        + curEvent.location + '\n' + curEvent.description + '\n' + eventLink + '\n\n');
}

function addProtocol(str) {
    var pattern = new RegExp('^(https?:\\/\\/).*');
    if (!pattern.test(str)) {
        return 'https://' + str
    } else {
        return str
    }
}

async function getEmailString(apiData, orgs) {
    if (apiData == null || apiData.length == 0) {
        return 'No Events To Display';
    } else {
        // var textObj = {}
        var string = ''
        var i = 0;
        var prevDate = new Date(apiData[0].startTime)
        // textObj.prevDate = [apiData[0]]
        string = prevDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) + '\n';
        while (i < apiData.length) {
            const curEvent = apiData[i]
            const curDate = new Date(curEvent.startTime)
            if (datesAreOnSameDay(curDate, prevDate)) {
                // textObj.prevDate.push(curEvent);
                const eventString = getEventString(curEvent, orgs);
                string += eventString;
            } else {
                // textObj.curDate = [curEvent[i]];
                string += curDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) + '\n';
                const eventString = getEventString(curEvent, orgs);
                string += eventString;
            }
            prevDate = curDate;
            i = i + 1;
        }
        return string;
    }
}

export default function JerryEmail() {
    const today = new Date();
    today.setHours(0, 0, 0);
    const formattedStart = getFormattedDate(today);
    const nextSunday = new Date();
    nextSunday.setDate(today.getDate() + (7 + 6 - today.getDay()) % 7);
    nextSunday.setHours(0, 0, 0);
    const formattedEnd = getFormattedDate(nextSunday);

    const { register, handleSubmit } = useForm();
    const [emailString, setEmailString] = useState('');
    const orgs = useContext(AllOrgContext);
    const emailTextRef = useRef(null);

    const copyToClipboard = (e) => {
        if (emailTextRef == null && emailTextRef.current != null) {
            console.log('failed to copy text')
            return;
        } else {
           navigator.clipboard.writeText(emailString);
           console.log('successfully copied string');
        }
    }


    const generateEmail = (data, e) => {
        var startDate = new Date(data.startDate);
        var endDate = new Date(data.endDate);
        var timeZoneOffset = startDate.getTimezoneOffset() / 60
        startDate.setHours(startDate.getHours() + timeZoneOffset);
        endDate.setHours(endDate.getHours() + timeZoneOffset);

        fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + `/api/events/date/start=${getAPIFormattedISOString(startDate)}&end=${getAPIFormattedISOString(endDate)}`)
            .then(response => response.json())
            .then(data => getEmailString(data, orgs))
            .then(string => {
                setEmailString(string)
            })
            .catch(error => {
                console.error('There was an error fetching events for the email!', error);
            });
    }

    return (
        <div className="background" style={{ minHeight: '100vh' }}>
            <Container className="py-4 d-flex justify-content-center">
                <Card className="p-5" style={{ maxWidth: '500px' }}>
                    <Form onSubmit={handleSubmit(generateEmail)}>
                        <Form.Row className="pb-2">
                            <Form.Group as={Col} controlId="startDate">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control type="date" placeholder="Start Date" name="startDate" ref={register({ required: true, valueAsDate: true })} defaultValue={formattedStart} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="endDate">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control type="date" placeholder="End Date" name="endDate" ref={register({ required: true, valueAsDate: true })} defaultValue={formattedEnd} />
                            </Form.Group>
                        </Form.Row>
                        <CustomButton type="submit" wide>Generate Email</CustomButton>
                    </Form>
                </Card>
            </Container>

            {emailString != null && emailString !== '' &&
                (
                    <Container>
                        <button onClick={copyToClipboard}>Copy text</button>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{emailString}</p>
                    </Container>
                )
            }
        </div>
    )
}