
import { useParams } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import OrgPageEventCard from "../components/OrgPageEventCard";
import NavbarComponent from '../components/NavbarComponent';

import './../styles/App.css';

import LinkSVG from '../assets/link.svg';
import Description from '../assets/product-description.svg';
import Circle from '../assets/circle.png';

// Placeholder events.
let eventGuid = 0
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
const yday = new Date(today)
yday.setDate(yday.getDate() + -1)

let todayStr = today.toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
let tmrwStr = tomorrow.toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
let ydayStr = yday.toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
export const UPCOMING_EVENTS = [
    {
        id: createEventId(),
        title: 'A Look into NLP and Research Engineering at Google',
        start: todayStr + 'T20:00:00',
        end: todayStr + 'T21:00:00',
        description: 'As an Education x Research x Industry Event, if you\'re interested in learning how natural language processing and deep learning play several roles in language-oriented products like the Google Assistant or Alexa, come hear from a software engineer at Google discuss the challenges that go with creating these products. We\'ll also be discussing differences between industry and academia, important skills to be an effective software engineer, and what different software-engineering centric career paths in tech might look like. The talk will conclude with an open-ended Q&A forum.',
        org: 'ACM',
        location: 'Zoom',
        link: 'https://cdn.discordapp.com/attachments/714723430079135755/808062875062108180/ACM_Research_Engineering_at_Google_Flyer_1.png'
    },
    {
        id: createEventId(),
        title: 'Pitching Yourself Workshop and Resume Critique with Xilinx',
        start: tmrwStr + 'T16:00:00',
        end: tmrwStr + 'T17:15:00',
        description: 'Attend to get a chance to win a swag bag containing a pair of AirPods!',
        org: 'SWE',
        location: 'Zoom',
        link: 'https://xilinx.zoom.us/j/2792764728?pwd=ekpwcWpOY25FTWlSb3g2U3RBa1lMdz09'
    },
    {
        id: createEventId(),
        title: 'HackUTD',
        start: todayStr,
        description: 'HackUTD, the largest university hackathon in North Texas, is a weekend long event where students build apps, hardware, and more. HackUTD provides a venue for self-expression and creativity through technology. People with varying technical backgrounds come together, form teams around a problem or idea, and collaboratively code a unique solution from scratch. Whether you\'re a frequent hackathon attendee or just getting started, we\'d love to see what you can make.',
        org: 'HackUTD',
        location: 'ECSW',
        link: 'https://2021.hackutd.co/'
    },
    {
        id: createEventId(),
        title: 'Timed event',
        start: todayStr + 'T12:00:00',
        end: todayStr + 'T12:30:00',
        description: 'Come out to our event! We will have food and cool guest speakers! If you come and ask a question you’ll be put in a raffle to win a free Google Home Mini! Also come learn how to participate in our upcoming Hackathon even if it’s your first one! Please come to our event!! I need friendz!!!',
        org: 'ACM',
        location: 'Zoom',
        link: 'https://www.acmutd.com'
    },
]

export const PAST_EVENTS = [
    {
        id: createEventId(),
        title: 'Development Fireside Presentation',
        start: ydayStr + 'T17:30:00',
        end: ydayStr + 'T18:45:00',
        description: 'One exciting initiative that we are also proud to be launching this semester is Fireside Chats with ACM Development. Each month we will have an opportunity for everyone to come in and listen to the amazing new features and products that we release. In addition to that there will be conversation about the latest trends in tech, discussions around real-world software development & more.',
        org: 'ACM',
        location: 'Discord',
        link: 'https://discord.gg/Azq7zZn457'
    }
]

export function createEventId() {
    return String(eventGuid++)
}

export default function OrgProfile() {
    let { orgName } = useParams();
    /** Test data */
    let events = [
        {
            title: 'event title test',
            location: 'zoom',
            link: 'test',
            org: 'acm',
            description: 'Come out to our event! We will have food and cool guest speakers! If you come and ask a question you’ll be put in a raffle to win a free Google Home Mini! Also come learn how to participate in our upcoming Hackathon even if it’s your first one! Please come to our event!! I need friendz!!!'
        },
        {
            title: 'event title test2',
            location: 'zoom',
            link: 'test',
            org: 'acm',
            description: 'Come out to our event! We will have food and cool guest speakers! If you come and ask a question you’ll be put in a raffle to win a free Google Home Mini! Also come learn how to participate in our upcoming Hackathon even if it’s your first one! Please come to our event!! I need friendz!!!'
        }
    ];
    return (
        <div className="App" style={{ minHeight: '100vh', paddingBottom: '15vh' }}>
            <NavbarComponent page='OrgProfilePage' />
            <Container>
                {/* Test Image */}
                <Image src={Circle} style={{ width: '25vh', height: '25vh' }}></Image>
                <Row className="my-4">
                    <h1 className="item-align-center font-weight-bold">{orgName}</h1>
                </Row>
                <Row className="mb-3">
                    <Col xs={3} style={{ textAlign: 'right' }}>
                        <Image src={LinkSVG}></Image>
                    </Col>
                    <Col style={{ textAlign: 'left' }}>
                        <a href="#">link</a>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col xs={3} style={{ textAlign: 'right', marginTop: 'auto', marginBottom: 'auto' }}>
                        <Image src={Description}></Image>
                    </Col>
                    <Col xs={6} style={{ textAlign: 'left' }}>
                        this is the description of the organization im testing i hoep that this alignment works
                    </Col>
                </Row>
                <Row className="mb-3" style={{ textAlign: 'center' }}>
                    <h1 className="item-align-center font-weight-bold">Upcoming Events</h1>
                </Row>
                {UPCOMING_EVENTS.map(event => {
                    return (
                        <OrgPageEventCard event={event} pastEvent={false} ></OrgPageEventCard>
                    );
                })}
                <Row className="mb-3" style={{ textAlign: 'center' }}>
                    <h1 className="item-align-center font-weight-bold org-page-past-event-header">Past Events</h1>
                </Row>
                {PAST_EVENTS.map(event => {
                    return (
                        <OrgPageEventCard event={event} pastEvent={true} ></OrgPageEventCard>
                    );
                })}
            </Container>
        </div >
    )
}