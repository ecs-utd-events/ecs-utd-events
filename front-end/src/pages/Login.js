import Container from 'react-bootstrap/Container';
import CustomButton from '../components/CustomButton';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { ReactComponent as ECSLogo } from '../assets/utd-ecs-logo-clipped.svg';
import './../styles/App.css';

export default function Login() {
    return (
        <div className="App">
            <Container>
                <Row>
                    <Col>
                    <Card>
                        <Card.Header>Organization Login</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="email">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Email address" />
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <CustomButton ></CustomButton>
                            </Form>
                        </Card.Body>
                        </Card>
                    </Col>
                    <Col >
                        <ECSLogo />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}