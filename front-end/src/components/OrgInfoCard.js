import Card from "react-bootstrap/esm/Card";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PlaceholderOrgImage from '../assets/placeholder_org_image.svg';
import Image from 'react-bootstrap/Image'

// This functional component renders a card to display org profile picture and name which we display on the home page
export default function OrgInfoCard({ orgName, orgImageUrl }) {
    var imageSource = orgImageUrl || PlaceholderOrgImage;
    return (
        <Card className="drop-shadow card interactive-card">
            <div >
                <Card.Body>
                    <Row>
                        <Col xs={4}>
                            <div className="org-info-card-style">
                                <Image src={imageSource} roundedCircle style={{ width: '10vh', height: '10vh' }}/>
                            </div>
                        </Col>
                        <Col xs={8}>
                            <div className="org-info-card-style">
                                <h3 className="font-weight-bold card-title text-break">{orgName}</h3>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </div>
        </Card>
    );
}