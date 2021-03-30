import { Container, Row, Col } from "react-bootstrap/esm";
import AdminTab from "./AdminTab";
import FooterComponent from '../components/FooterComponent';

export default function AdminLayout({ children, pageName }) {
    return (
        <div className="background" style={{ minHeight: '100vh' }}>
            {/* minHeight of the separate wrapping div is set to push the footer to the bottom of the page */}
            <div style={{ minHeight: 'calc(100vh - 5rem)' }}>
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
            </div>
            <FooterComponent page='Home' />
        </div >
    )
}