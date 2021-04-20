import Container from 'react-bootstrap/Container';
import CustomButton from '../components/CustomButton';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import React, { useState } from 'react';
import { auth } from '../firebase';

import FullPageLoading from '../components/FullPageLoading';
import './../styles/App.css';

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
        <Card className="px-5 pt-4">
            <Card.Header className="card-header-no-border"><h2 className="font-weight-bold">Reset Your Password</h2></Card.Header>
            <Card.Body className="px-0">
                {errorCode !== '' && <h6 className="text-danger">{getErrorMessage(errorCode)}</h6>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="email">
                        <Form.Control
                            className="py-4"
                            required
                            onChange={onUsernameChange}
                            value={username}
                            type="email"
                            placeholder="Email address" />
                    </Form.Group>
                    <Row className="mt-2 px-0">
                        <Col className="pl-3 py-1">
                            <CustomButton
                                wide
                                secondary
                                type="button"
                                className="drop-shadow py-2"
                                style={{ backgroundColor: 'var(--primary3)', color: 'var(--gray1)' }}
                                href="/login"
                            >
                                Return to Login
                            </CustomButton>
                        </Col>
                        <Col className="pr-3 py-1">
                            <CustomButton
                                wide
                                type="submit"
                                className="drop-shadow py-2"
                            >
                                Submit
                            </CustomButton>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-4">
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
        });
    }

    const onUsernameChange = event => {
        setUsername(event.target.value);
    }

    return (
        <div className="background-accent">
            <FullPageLoading loading={loading} />
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