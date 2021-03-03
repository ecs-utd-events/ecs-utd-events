import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import React, { useContext, useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';

import AdminLayout from "../../components/AdminLayout";
import { UserContext } from "../../providers/UserProvider";

import '../../styles/AdminPages.css';
import Circle from '../../assets/circle.png';


export default function EditProfile() {
    const { org } = useContext(UserContext);

    // Display a placeholder image if the organization is null OR the organization's imageUrl field is null.
    const imageSource = org != null ? (org.imageUrl != null ? org.imageUrl : Circle) : Circle;

    return (
        <AdminLayout pageName="Profile">
            <div className="edit-profile-page">
                <Container>
                    <Image src={imageSource} style={{ width: '25vh', height: '25vh' }} roundedCircle></Image>
                    <Row className="my-4">
                        <h1 className="item-align-center font-weight-bold">{org != null ? org.name : 'Name'}</h1>
                    </Row>
                    <Row style={{ textAlign: "left" }}>
                        <h3 className="item-align-center font-weight-bold">Website</h3>
                    </Row>
                    <Row>
                        <Card className="drop-shadow mb-4 edit-profile-info-card" style={{ width: '100%' }}>
                            {org != null ? org.website : 'Website'}
                        </Card>
                    </Row>
                    <Row style={{ textAlign: "left" }}>
                        <h3 className="item-align-center font-weight-bold">Description</h3>
                    </Row>
                    <Row>
                        <Card className="drop-shadow mb-4 edit-profile-info-card" style={{ width: '100%' }}>
                            {org != null ? org.description : 'Description'}
                        </Card>
                    </Row>
                    <Row style={{ textAlign: "left" }}>
                        <h3 className="item-align-center font-weight-bold">Social Media Links</h3>
                    </Row>
                    <Row>
                        {org != null && org.socialMedia.facebook &&
                            <div>
                                <h5>Facebook:</h5>
                                <Card className="drop-shadow mb-4 edit-profile-info-card" style={{ width: '80%' }}>
                                    {org.socialMedia.facebook}
                                </Card>
                            </div>}
                        {org != null && org.socialMedia.linkedin &&
                            <div>
                                <h5>LinkedIn:</h5>
                                <Card className="drop-shadow mb-4 edit-profile-info-card" style={{ width: '100%' }}>
                                    {org.socialMedia.linkedin}
                                </Card>
                            </div>}
                    </Row>
                </Container>
            </div>
        </AdminLayout>
    )
}