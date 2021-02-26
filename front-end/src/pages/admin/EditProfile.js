import { useParams } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import React, { useContext, useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';

import AdminLayout from "../../components/AdminLayout";
import { UserContext } from "../../providers/UserProvider";

import '../../styles/AdminPages.css';
import LinkSVG from '../../assets/link.svg';
import Description from '../../assets/product-description.svg';
import Circle from '../../assets/circle.png';

const testOrg = {
    "slug": "association-for-computing-machinery",
    "name": "Association for Computing Machinery",
    "shortName": "ACM",
    "website": "http://acmutd.co/",
    "description": "We're the Association for Computing Machinery at UT Dallas. We're focused on giving back to the engineering community here at UT Dallas and beyond through events projects, HackUTD, and more.",
    "socialMedia": {
        "linkedin": "https://www.linkedin.com/company/acmutd",
        "facebook": "https://www.facebook.com/acmatutd/"
    }
}

export default function EditProfile() {
    const user = useContext(UserContext);

    return (
        <AdminLayout pageName="Profile">
            <div className="edit-profile-page">
                <Container>
                    <Image src={Circle} style={{ width: '25vh', height: '25vh' }}></Image>
                    <Row className="my-4">
                        <h1 className="item-align-center font-weight-bold">{user ? user.uid : testOrg.name}</h1>
                    </Row>
                    <Row style={{ textAlign: "left" }}>
                        <h3 className="item-align-center font-weight-bold">Website</h3>
                    </Row>
                    <Row>
                        <Card className="drop-shadow mb-4 edit-profile-info-card" style={{width: '100%'}}>
                            {testOrg.website}
                        </Card>
                    </Row>
                    <Row style={{ textAlign: "left" }}>
                        <h3 className="item-align-center font-weight-bold">Description</h3>
                    </Row>
                    <Row>
                        <Card className="drop-shadow mb-4 edit-profile-info-card" style={{width: '100%'}}>
                            {testOrg.description}
                        </Card>
                    </Row>
                    <Row style={{ textAlign: "left" }}>
                        <h3 className="item-align-center font-weight-bold">Social Media Links</h3>
                    </Row>
                    <Row>
                        Facebook: 
                        <Card className="drop-shadow mb-4 edit-profile-info-card" style={{width: '100%'}}>
                            {testOrg.socialMedia.facebook}
                        </Card>
                        LinkedIn: 
                        <Card className="drop-shadow mb-4 edit-profile-info-card" style={{width: '100%'}}>
                            {testOrg.socialMedia.linkedin}
                        </Card>

                    </Row>

                </Container>
            </div>
        </AdminLayout>
    )
}