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

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function SuccessfullyResetCard() {
    return (
        <Card className="px-5 pt-4">
            <Card.Header className="card-header-no-border"><h2 className="font-weight-bold">You've successfully reset your password!</h2></Card.Header>
            <Card.Body className="px-0">
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
                </Row>
            </Card.Body>
        </Card>
    );
}

function ResetCard({ email, onPasswordChange, submitForm, errorCode}) {
    return (
        <Card className="px-5 pt-4">
            <Card.Header className="card-header-no-border">
                <h2 className="font-weight-bold">Resetting Password for:</h2 >
                <p className="mb-0">{email}</p>
            </Card.Header >
            <Card.Body className="px-0">
                {errorCode !== '' && <h6 className="text-danger">{ }</h6>}
                <Form onSubmit={submitForm}>
                    <Form.Group controlId="password">
                        <Form.Control
                            className="py-4"
                            required
                            type="password"
                            onChange={onPasswordChange}
                            placeholder="New Password" />
                    </Form.Group>
                    <Row className="mt-2 px-0">
                        <Col className="pr-3 py-1">
                            <CustomButton
                                wide
                                type="submit"
                                className="drop-shadow py-2"
                            > 
                                Save
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
        </Card >
    );
}
export default function ResetPassword({ errorCode }) {
    const mode = getParameterByName('mode');
    const actionCode = getParameterByName('oobCode');
    const continueUrl = getParameterByName('continueUrl');
    const lang = getParameterByName('lang') || 'en';
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(null);
    const [success, setSuccess] = useState(false);

    auth.verifyPasswordResetCode(actionCode)
        .then((email) => {
            setEmail(email);
        })
        .catch((error) => {
            console.log(error.message)
        });

    const onPasswordChange = event => {
        setPassword(event.target.value);
    }

    const submitForm = event => {
        event.preventDefault();
        auth.confirmPasswordReset(actionCode, password).then(() => {
            setSuccess(true);
        }).catch((error) => {
            console.log(error.message)
        })
    }

    return (
        <div className="background-accent">
            <FullPageLoading loading={loading} />
            <div className="login-wrapper">
                <Container fluid>
                    <Row>
                        <Col style={{ display: 'flex', justifyContent: 'center' }}>
                            {success && <SuccessfullyResetCard />}
                            {!success && <ResetCard email={email} onPasswordChange={onPasswordChange} submitForm={submitForm} errorCode={errorCode}/>}
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )

}