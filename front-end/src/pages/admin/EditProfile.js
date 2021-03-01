import { useParams } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import React, { useContext } from "react";
import Card from 'react-bootstrap/Card';

import AdminLayout from "../../components/AdminLayout";
import { UserContext } from "../../providers/UserProvider";

import '../../styles/AdminPages.css';
import Circle from '../../assets/circle.png';


export default function EditProfile() {
    const user = useContext(UserContext);

    return (
        <AdminLayout pageName="Profile">
            <div className="edit-profile-page">
                <Container>
                    <Image src={Circle} style={{ width: '25vh', height: '25vh' }}></Image>
                    <Row className="my-4">
                        <h1 className="item-align-center font-weight-bold">{user.name}</h1>
                    </Row>
                    <Row style={{ textAlign: "left" }}>
                        <h3 className="item-align-center font-weight-bold">Website</h3>
                    </Row>
                    <Row>
                        <Card className="drop-shadow mb-4 edit-profile-info-card" style={{ width: '100%' }}>
                            {user.website}
                        </Card>
                    </Row>
                    <Row style={{ textAlign: "left" }}>
                        <h3 className="item-align-center font-weight-bold">Description</h3>
                    </Row>
                    <Row>
                        <Card className="drop-shadow mb-4 edit-profile-info-card" style={{ width: '100%' }}>
                            {user.description}
                        </Card>
                    </Row>
                    <Row style={{ textAlign: "left" }}>
                        <h3 className="item-align-center font-weight-bold">Social Media Links</h3>
                    </Row>
                    <Row>
                        {user.socialMedia.facebook &&
                            <div>
                                <h5>Facebook:</h5>
                                <Card className="drop-shadow mb-4 edit-profile-info-card" style={{ width: '100%' }}>
                                    {user.socialMedia.facebook}
                                </Card>
                            </div>}
                        {user.socialMedia.LinkedIn &&
                            <div>
                                <h5>LinkedIn:</h5>
                                <Card className="drop-shadow mb-4 edit-profile-info-card" style={{ width: '100%' }}>
                                    {user.socialMedia.linkedin}
                                </Card>
                            </div>}
                    </Row>
                </Container>
            </div>
        </AdminLayout>
    )
}