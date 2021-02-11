import Card from "react-bootstrap/esm/Card";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PlaceholderOrgImage from '../assets/placeholder_org_image.svg';
import Image from 'react-bootstrap/Image'

export default function OrgInfoCard({ orgName }) {
    return (
        <Card className="drop-shadow card">
            <div >
                <Card.Body>
                    <Row>
                        <Col xs={4}>
                            <div className="org-info-card-style">
                                <Image src={PlaceholderOrgImage} fluid />
                            </div>
                        </Col>
                        <Col xs={8}>
                            <div className="org-info-card-style">
                                <h3 className="font-weight-bold card-title">{orgName}</h3>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </div>
        </Card>
    );
}