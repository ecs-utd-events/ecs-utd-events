import { Container, Row, Col } from "react-bootstrap/esm";
import AdminTab from "./AdminTab";

export default function AdminLayout({children, pageName}) {
    return (
        <div className="background" style={{ minHeight: '100vh' }}>
            <Container fluid>
                <Row>
                    <Col xs={2}>
                        <AdminTab parent={pageName} />
                    </Col>
                    <Col>
                        {children}
                    </Col>
                </Row>
            </Container>
        </div >
    )
}