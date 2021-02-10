import Card from "react-bootstrap/esm/Card";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import IconButton from '../components/IconButton';

export default function EventInfoCard() {
    return (
        <Card className="drop-shadow card">
            <Card.Header className="card-header-no-border">
                <h3 className="font-weight-bold card-title">Event Title</h3>
            </Card.Header>
            <Card.Body>
                <Card.Text>test1</Card.Text>
                <Card.Text>test2</Card.Text>
            </Card.Body>
            <Row>
                <Col> Last updated</Col>
                <Col xs={8}>
                    <IconButton className="mr-1"></IconButton>
                    <IconButton className="mr-1"></IconButton>
                    <IconButton className="mr-1"></IconButton>
                    <IconButton className="mr-1"></IconButton>
                </Col>
            </Row>
        </Card>
    );
}