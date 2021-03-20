import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div style={{ minHeight: "100vh", backgroundColor: 'var(--secondary1)' }}>
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div>
                    <Row>
                        <Col style={{ textAlign: 'center' }}>
                            <h1 style={{ fontSize: '10rem', fontWeight: 700 }}>404</h1>
                            <h3 style={{ fontWeight: 700 }}>OOPS! PAGE NOT FOUND</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-4" style={{ textAlign: 'center' }}>
                            <h5>Return to <Link to="/">home</Link></h5>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
}