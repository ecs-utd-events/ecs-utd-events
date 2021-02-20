
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

const today = new Date()
let todayStr = today.toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

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
                {/* Upcoming events have data >= today */}
                {events.filter(event => {
                    return (Date.parse(event.end) >= today)
                }).map(event => {
                    return (
                        <OrgPageEventCard event={event}></OrgPageEventCard>
                    );
                })}
                <Row className="mb-3" style={{ textAlign: 'center' }}>
                    <h1 className="item-align-center font-weight-bold">Past Events</h1>
                </Row>

            </Container>
        </div>
    )
}