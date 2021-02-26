import Container from 'react-bootstrap/Container';
import CustomButton from '../components/CustomButton';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

import { auth } from '../firebase';
import { ReactComponent as ECSLogo } from '../assets/utd-ecs-logo-clipped.svg';
import './../styles/App.css';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const submitHandler = event => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(username, password).then((authCredentials) => {
            console.log('SIGNED IN')
            history.push('/admin/profile');
        }
        ).catch((error) => {
            console.log(error.code);
            console.log(error.message);
            alert('Looks like there was an error logging you in :( More detailed error messaging to come :((');
        })
    }

    return (
        <div className="background-accent">
            <div className="login-wrapper">
                <Container>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Header className="card-header-no-border"><h2>Organization Login</h2></Card.Header>
                                <Card.Body>
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId="email">
                                            <Form.Label style={{ float: 'left' }}>Email address</Form.Label>
                                            <Form.Control onChange={(event) => setUsername(event.target.value)} value={username} type="email" placeholder="Email address" />
                                        </Form.Group>
                                        <Form.Group controlId="password">
                                            <Form.Label style={{ float: 'left' }}>Password</Form.Label>
                                            <Form.Control onChange={(event) => setPassword(event.target.value)} value={password} type="password" placeholder="Password" />
                                        </Form.Group>
                                        <Row>
                                            <Col><CustomButton type="submit" className="drop-shadow" width={'10rem'}>Submit</CustomButton></Col>
                                            <Col><a className="link-button" href="/" style={{ textAlign: 'center', lineHeight: '3.0rem' }}>Forgot password?</a></Col>
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
                            <ECSLogo className="mt-5" />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}