import Card from "react-bootstrap/esm/Card";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import IconButton from '../components/IconButton';

export default function EventInfoCard() {
    return(
        <div>
            <h2>Event Information</h2>
            <Card className="drop-shadow">
                <Card.Header className="card-header-no-border">event title</Card.Header>
                <Card.Body>
                    <Card.Text>test1</Card.Text>
                    <Card.Text>test2</Card.Text>
                </Card.Body>
                <Row>
                    <Col> Last updated</Col>
                    <Col>
                        <IconButton className="mr-1"></IconButton>
                        <IconButton className="mr-1"></IconButton>
                        <IconButton className="mr-1"></IconButton>
                        <IconButton className="mr-1"></IconButton>
                    </Col>  
                </Row>
            </Card>
        </div>
    );
}