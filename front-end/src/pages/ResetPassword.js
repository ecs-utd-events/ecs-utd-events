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
import { Spinner } from 'react-bootstrap';

function getErrorMessage(errorCode) {
    if (errorCode === 'auth/invalid-email') {
        return '😴 Please enter a valid email'
    } else if (errorCode === 'auth/user-not-found') {
        return '😳 Login failed: Invalid username'
    } else {
        return '😬 There was an unknown error, Please try again!'
    }
}

function ResetPasswordCard({ username, onUsernameChange, submitHandler, errorCode }) {
    return (
        <Card style={{ width: '40vw' }}>
            <Card.Header className="card-header-no-border"><h2>Reset Your Password</h2></Card.Header>
            <Card.Body>
                {errorCode !== '' && <h6 className="text-danger">{getErrorMessage(errorCode)}</h6>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="email">
                        <Form.Label style={{ float: 'left' }}>Email address</Form.Label>
                        <Form.Control required onChange={onUsernameChange} value={username} type="email" placeholder="Email address" />
                    </Form.Group>
                    <Row className="mt-4">
                        <Col>
                            <CustomButton
                                secondary
                                type="submit"
                                className="drop-shadow"
                                width={'10rem'}
                                style={{ backgroundColor: 'var(--primary3)', color: 'var(--gray1)' }}
                                href="/login">
                                Return to Login
                            </CustomButton>
                        </Col>
                        <Col><CustomButton type="submit" className="drop-shadow" width={'10rem'}>Submit</CustomButton></Col>
                    </Row>
                    <Row>
                        <Col className="mt-4 mb-0">
                            <p className="main-text">Don't have an account yet? <a href="/">Sign up!</a></p>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    )
}

function SuccessCard() {
    return (
        <Card style={{ width: '40vw' }}>
            <Card.Header className="card-header-no-border text-success"><h2>Success 🥳</h2></Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <h5>Check your email to finish resetting your password!</h5>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <CustomButton
                            primary
                            type="submit"
                            className="drop-shadow"
                            width={'10rem'}
                            style={{ color: 'var(--gray1)' }}
                            href="/login">
                            Return to Login
                            </CustomButton>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default function ResetPassword() {

    const [username, setUsername] = useState('');
    const [errorCode, setErrorCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const submitHandler = event => {
        event.preventDefault();
        setLoading(true);
        auth.sendPasswordResetEmail(username).then(() => {
            setLoading(false);
            setSuccess(true);
        }).catch((error) => {
            setLoading(false);
            setErrorCode(error.code);
        })
    }

    const onUsernameChange = event => {
        setUsername(event.target.value);
    }

    return (
        <div className="background-accent">
            {loading &&
                <div className="login-spinner-wrapper">
                    <Spinner animation="border" className="login-spinner" />
                </div>
            }
            <div className="login-wrapper">
                <Container fluid>
                    <Row>
                        <Col style={{ display: 'flex', justifyContent: 'center' }}>
                            {!success && <ResetPasswordCard username={username} onUsernameChange={onUsernameChange} submitHandler={submitHandler} errorCode={errorCode} />}
                            {success && <SuccessCard />}
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}