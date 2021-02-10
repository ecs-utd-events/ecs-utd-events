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
        <div className="background-accent">
            <div className="login-wrapper">
                <Container>
                    <Row>
                        <Col>
                        <Card>
                            <Card.Header className="card-header-no-border"><h2>Organization Login</h2></Card.Header>
                            <Card.Body >
                                <Form >
                                    <Form.Group controlId="email">
                                        <Form.Label style={{float: 'left'}}>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Email address" />
                                    </Form.Group>

                                    <Form.Group controlId="password">
                                        <Form.Label style={{float: 'left'}}>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>
                                    <Row>
                                        <Col><CustomButton className="drop-shadow" width={'10rem'}>Submit</CustomButton></Col>
                                        <Col><a href="/" style={{textAlign: 'center', lineHeight:'3.0rem'}}>Forgot password?</a></Col>
                                    </Row>
                                    <Row>
                                        <Col className="mt-3">
                                        <p className="main-text">Don't have an account yet? <a href="/">Sign up!</a></p>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <ECSLogo className="mt-5"/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}