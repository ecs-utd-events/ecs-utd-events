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
                        <div>
                            <AdminTab parent={pageName} />
                        </div>
                        {/* marginLeft = AdminTab width (4.25em) + extra 1em for padding */}
                        <Col style={{ marginLeft: '5.25em' }}>
                            {children}
                        </Col>
                    </Row>
                </Container>
            </div>
            <FooterComponent page='Home' />
        </div >
    )
}