import Card from "react-bootstrap/esm/Card";
import EventInfoContent from './EventInfoContent.js';

// This functional component displays the event info card on large screens
export default function EventInfoCard({ event, animateCard, setAnimateCard, orgs }) {
    const onAnimationEnd = () => {
        setAnimateCard('')
    }
    if (event != null) {
        return (
            <Card className="drop-shadow card pb-0">
                {/* This div handles animating a colorful blob whenever animateCard === 'blob-animation' */}
                <div style={{ height: "100%", width: "100%", position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
                    <div style={{ height: "100%", width: "100%", position: "relative", overflow: "hidden" }}>
                        <div style={{ display: animateCard === '' ? 'none' : 'block' }} className={"blob " + animateCard} onAnimationEnd={onAnimationEnd}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 350">
                                <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <EventInfoContent event={event} orgs={orgs} />
            </Card >
        );
    } else {
        // When no event has been selected yet display a helper/intro card
        return (
            <Card className="drop-shadow card">
                <Card.Header className="card-header-no-border">
                    <h3 className="font-weight-bold card-title">No Event Selected</h3>
                </Card.Header>
                <Card.Body>
                    <p>Welcome to ECS UTD Events!</p>
                    <p>You can check out all the upcoming events planned by ECS Student Orgs in one place!</p>
                    <p>If you are an organization and are not already partnered with us, sign up <a target="_blank"href="https://forms.gle/jjV72W34txZLvZuw7">here</a></p>
                </Card.Body>
            </Card>
        )
    }
}