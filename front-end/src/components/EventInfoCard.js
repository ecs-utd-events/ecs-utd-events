import Card from "react-bootstrap/esm/Card";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import IconButton from '../components/IconButton';
import Image from 'react-bootstrap/Image';
import Calendar from '../assets/calendar.svg';
import Placeholder from '../assets/placeholder.svg';
import Description from '../assets/product-description.svg';
import Share from '../assets/share.svg';
import Group from '../assets/group.svg';
import Link from '../assets/link.svg';



export default function EventInfoCard() {
    return (
        <Card className="drop-shadow card">
            <Card.Header className="card-header-no-border">
                <h3 className="font-weight-bold card-title">Event Title</h3>
            </Card.Header>
            <Card.Body>
                <ListGroup className="list-group-flush text-left">
                    <ListGroupItem><Image className="event-icon mr-2" src={Calendar}></Image>Date</ListGroupItem>
                    <ListGroupItem><Image className="event-icon mr-2" src={Placeholder}></Image>Location</ListGroupItem>
                    <ListGroupItem><Image className="event-icon mr-2" src={Group}></Image>Organization </ListGroupItem>
                    <ListGroupItem><Image className="event-icon mr-2" src={Description}></Image>Description</ListGroupItem>
                </ListGroup>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted mr-sm-2">Last updated 2 mins ago</small>
                <ButtonGroup>
                    <IconButton className="mr-1" icon={Link}></IconButton>
                    <IconButton className="mr-1" icon={Calendar}></IconButton>
                    <IconButton className="mr-1" icon={Calendar}></IconButton>
                    <IconButton className="mr-1" icon={Share}></IconButton>
                </ButtonGroup>
            </Card.Footer>
        </Card>
    );
}