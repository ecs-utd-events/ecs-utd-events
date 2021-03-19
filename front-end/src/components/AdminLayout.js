import { Container, Row, Col } from "react-bootstrap/esm";
import AdminTab from "./AdminTab";
import FooterComponent from '../components/FooterComponent';

export default function AdminLayout({ children, pageName }) {
    return (
        <div className="background" style={{ minHeight: '100vh' }}>
            <Container fluid>
                <Row>
                    <Col xs={2} style={{ minWidth: "200px" }}>
                        <AdminTab parent={pageName} />
                    </Col>
                    <Col>
                        {children}
                    </Col>
                </Row>
            </Container>
            <FooterComponent page='Home' /> 
        </div >
    )
}