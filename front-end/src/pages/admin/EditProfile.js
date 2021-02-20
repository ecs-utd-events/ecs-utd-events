import { Container, Row, Col, Card } from "react-bootstrap/esm";
import AdminTab from "../../components/AdminTab";

export default function EditProfile() {
    return (
        <div className="background" style={{ minHeight: '100vh' }}>
            <Container fluid>
                <Row>
                    <Col xs={3}>
                        <AdminTab parent="Profile" />
                    </Col>
                    <Col>
                        <h1>Org Profile</h1>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}