import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import React, { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import CustomButton from '../../components/CustomButton';
import AdminLayout from "../../components/AdminLayout";
import { socialMediaPlatforms } from '../../constants/SocialMediaPlatforms';
import { UserContext } from "../../providers/UserProvider";
import { AllOrgContext } from '../../providers/AllOrgProvider';
import '../../styles/AdminPages.css';
import Circle from '../../assets/circle.png';

import { InlineIcon } from '@iconify/react';
import EditIcon from '@iconify/icons-mdi/lead-pencil';
import SaveIcon from '@iconify/icons-mdi/content-save';
import CancelIcon from '@iconify/icons-mdi/close';
import ViewIcon from '@iconify/icons-mdi/open-in-new';
import helpIcon from '@iconify/icons-mdi/help-circle-outline';
import Skeleton from '@material-ui/lab/Skeleton';
import IconButton from '../../components/IconButton';


function TitleWithDescription({ children }) {
    return (
        <Accordion>
            <h3 className="item-align-center font-weight-bold" style={{ display: 'inline-block' }}>
                {children[0]} &nbsp;
                <Accordion.Toggle eventKey="0" as="div" variant="link" style={{ display: 'inline-block' }}>
                    <InlineIcon icon={helpIcon} />
                </Accordion.Toggle>
            </h3>
            <Accordion.Collapse eventKey="0">
                {children[1]}
            </Accordion.Collapse>
        </Accordion>
    )
}

export default function EditProfile() {
    const { org } = useContext(UserContext);
    const allOrgs = useContext(AllOrgContext);

    const { register, handleSubmit, watch, reset, errors, clearErrors } = useForm();
    const [isEditing, setEditing] = useState(false);
    const watchDescription = watch("description", org != null ? org.description : 'Description');

    const onSubmit = (newOrgData) => {
        setEditing(false);
        newOrgData["uId"] = org.uId;
        newOrgData["name"] = org.name;
        fetch((process.env.REACT_APP_SERVER_URL || 'http://localhost:80') + '/api/orgs',
            {
                method: 'PUT',
                body: JSON.stringify(newOrgData),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => {
                console.log(response);
                if (response.status !== 200) {
                    handleErrors();
                }
            })
            .catch(error => handleErrors());
    }

    const handleErrors = () => {
        console.log('There was an issue sending the updated profile data to the server. Please try again!');
        setEditing(!isEditing);
    }

    const cancelEditing = () => {
        reset();
        setEditing(!isEditing);
    };

    const validateUniqueSlug = (value) => {
        clearErrors('slug');
        if (org != null && allOrgs != null) {
            for (var i = 0; i < allOrgs.length; i++) {
                if (org.uId !== allOrgs[i].uId && value === allOrgs[i].slug) {
                    // console.log('CAUGHT')
                    return false;
                };
            }
        }
        return true;
    }

    const validateLowerCase = (value) => {
        clearErrors('slug');
        if (value != value.toLowerCase())
            return false;
        return true;
    }

    const validateSpecialChars = (value) => {
        if (value === "")
            return true;
        for (var i = 0; i < value.length; i++) {
            if (!value[i].match(/[a-z]/i) && !value[i].match('-'))
                return false;
        }
        return true;
    }

    const validateMaxDescriptionLength = (value) => {
        if (value.length > 600)
            return false;
        return true;
    }

    // Display a placeholder image if the organization is null OR the organization's imageUrl field is null.
    const imageSource = org != null ? (org.imageUrl != "" ? org.imageUrl : Circle) : Circle;

    if (org != null) {
        return (
            <AdminLayout pageName="Profile">
                <div className="edit-profile-page">
                    <Container className="my-5">
                        <Form onSubmit={handleSubmit(onSubmit)} style={{ display: 'inline-block', width: '100%' }}>
                            <Image src={imageSource} style={{ width: '25vh', height: '25vh', marginBottom: '1rem' }} roundedCircle></Image>
                            <Row style={{ textAlign: "center" }}>
                                <div className="d-flex flex-grow-1 justify-content-center align-items-center">
                                    <h2 className="font-weight-bold m-0 pr-2" style={{paddingTop: '1px'}}>{org.name}</h2>
                                    <Link target="_blank" to={"/org/" + org.slug}>
                                        <IconButton className="m-0" icon={ViewIcon} />
                                    </Link>
                                </div>
                            </Row>
                            <div className="d-flex justify-content-end sticky-button-wrapper">
                                {!isEditing ?
                                    (
                                        <CustomButton secondary className="drop-shadow primary" type="submit" onClick={handleSubmit(() => setEditing(!isEditing))}>
                                            <h4 className="font-weight-bold my-0">
                                                <InlineIcon icon={EditIcon} style={{ fontSize: '1.5rem', marginBottom: '2px' }} /> edit
                                            </h4>
                                        </CustomButton>
                                    )
                                    :
                                    (
                                        <div>
                                            <CustomButton secondary className="drop-shadow primary" type="submit" onClick={handleSubmit(onSubmit)}>
                                                <h4 className="font-weight-bold my-0">
                                                    <InlineIcon icon={SaveIcon} style={{ fontSize: '1.5rem', marginBottom: '2px' }} /> save
                                                </h4>
                                            </CustomButton>
                                            <CustomButton secondary className="drop-shadow" type="submit" onClick={cancelEditing}>
                                                <h4 className="font-weight-bold my-0">
                                                    <InlineIcon icon={CancelIcon} style={{ fontSize: '1.5rem', marginBottom: '2px' }} /> cancel
                                                </h4>
                                            </CustomButton>
                                        </div>
                                    )
                                }
                            </div>
                            <Row style={{ textAlign: "left", paddingTop: 20 }}>
                                <Col className="pl-0">
                                    <TitleWithDescription>
                                        Short Name
                                        <p>
                                            This will appear on <b>all event cards</b> throughout the website. It does NOT need to be unique to your organization! For example, WWC, AIS, DSC, etc.
                                        </p>
                                    </TitleWithDescription>
                                    <Form.Control type="text"
                                        defaultValue={org != null ? org.shortName : 'Organization Short Name'}
                                        ref={register({ required: true })}
                                        name="shortName"
                                        disabled={!isEditing} />
                                    {errors.shortName && <p className="error-edit-profile">⚠ A short name for your organization is required!</p>}
                                </Col>
                                <Col className="pr-0">
                                    <TitleWithDescription>
                                        Slug
                                        <p>
                                            Your "slug" determines the URL where your org info page will be hosted. E.g. if your slug was "women-who-compute",
                                            then your org profile page would be found at /orgs/women-who-compute. It must be <b> UNIQUE </b> (you cannot share it with other organizations), <b>lowercase</b>, and the <b>only special
                                            character it can contain are dashes: '-'</b>. For example, "women-who-compute", "wwc", "ais", "artificial-intelligence-society" are all valid slugs.
                                        </p>
                                    </TitleWithDescription>
                                    <Form.Control type="text"
                                        defaultValue={org != null ? org.slug : 'Organization Slug'}
                                        ref={register({
                                            required: true,
                                            validate: {
                                                uniqueSlug: value => validateUniqueSlug(value),
                                                lowerCase: value => validateLowerCase(value),
                                                onlyDashes: value => validateSpecialChars(value)
                                            }
                                        })}
                                        name="slug"
                                        disabled={!isEditing} />
                                    {errors.slug?.type === 'required' && <p className="error-edit-profile">⚠ An organization slug is required!</p>}
                                    {errors.slug?.type === 'uniqueSlug' && <p className="error-edit-profile">⚠ This organization slug is already taken!</p>}
                                    {errors.slug?.type === 'lowerCase' && <p className="error-edit-profile">⚠ The slug must be all lowercase!</p>}
                                    {errors.slug?.type === 'onlyDashes' && <p className="error-edit-profile">⚠ The only special characters the slug can contain are dashes!</p>}
                                </Col>
                            </Row>

                            <Row style={{ textAlign: "left", paddingTop: 20 }}>
                                <h3 className="item-align-center font-weight-bold">Website</h3>
                            </Row>
                            <Row>
                                <Form.Control type="text"
                                    defaultValue={org != null ? org.website : 'https://www.utdallas.edu/'}
                                    ref={register({ required: true })}
                                    name="website"
                                    disabled={!isEditing} />
                                {errors.website && <p className="error-edit-profile">⚠ A website where students can find out more information about your organization is required!</p>}
                            </Row>

                            <Row style={{ textAlign: "left", paddingTop: 20 }}>
                                <TitleWithDescription>
                                    Logo URL
                                    <p>
                                        This should be a <b>direct link</b> to a png or jpeg image of your logo. For example, see <a href="https://raw.githubusercontent.com/acmutd/brand/master/General/Assets/Logos/acm-logo-black-background.png" target="_blank">this URL</a>.
                                        Transparent backgrounds are preferred. We recommend hosting your image on a platform like imgur or somewhere on your website!
                                    </p>
                                </TitleWithDescription>
                            </Row>
                            <Row>
                                <Form.Control type="text"
                                    defaultValue={org != null ? org.imageUrl : 'logo.url'}
                                    name="imageUrl"
                                    ref={register()}
                                    disabled={!isEditing} />
                            </Row>

                            <Row style={{ textAlign: "left", paddingTop: 20 }}>
                                <Col className="p-0">
                                    <TitleWithDescription>
                                        Description
                                    <p>
                                            A short description of your organization. Must be <b>UNDER 600 characters (~90 words)</b>.
                                    </p>
                                    </TitleWithDescription>
                                </Col>
                                <Col xs={2} className="d-flex justify-content-end align-items-end">
                                    <h5 style={errors.description?.type === 'maxDescriptionLength' ? { color: 'red' } : null}>{watchDescription != null && watchDescription.length}/600 chars</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Control type="text"
                                    as="textarea" rows={4}
                                    name="description"
                                    disabled={!isEditing} defaultValue={org != null ? org.description : 'Description'}
                                    ref={register({
                                        required: true,
                                        validate: {
                                            maxDescriptionLength: value => validateMaxDescriptionLength(value)
                                        }
                                    })} />
                                {errors.description?.type === 'required' && <p className="error-edit-profile">⚠ A short description of your organization is required!</p>}
                                {errors.description?.type === 'maxDescriptionLength' && <p className="error-edit-profile">⚠ Your org description must be 600 characters or less!</p>}

                            </Row>
                            <Row style={{ textAlign: "left", paddingTop: 20 }}>
                                <TitleWithDescription>
                                    Social Media Links
                                    <p>
                                        Your social media links. If you leave a field blank, the icon for that platform will not appear on your org profile page!
                                    </p>
                                </TitleWithDescription>
                            </Row>
                            {socialMediaPlatforms.map(platform => {
                                return (
                                    <Row style={{ padding: 10 }} key={platform.title}>
                                        <Col xs={2} className="d-flex justify-content-start align-items-center px-0">
                                            <h4 className="m-0">{platform.title}</h4>
                                        </Col>
                                        <Col>
                                            <Form.Control type="text"
                                                defaultValue={org.socialMedia[platform.ref] != null ? org.socialMedia[platform.ref] : ""}
                                                placeholder={`(your ${platform.title} link here)`}
                                                name={`socialMedia.${platform.ref}`}
                                                ref={register()}
                                                disabled={!isEditing} />
                                        </Col>
                                    </Row>
                                );
                            })
                            }
                        </Form>
                    </Container>
                </div>
            </AdminLayout>
        )
    }
    else
        return (
            <AdminLayout pageName="Profile">
                <div className="edit-profile-page">
                    <Container className="mb-5">
                        <Container style={{ display: 'inline-block', width: '100%' }}>
                            <div className="d-flex justify-content-center pt-5 pb-1">
                                <Skeleton width="25vh" height="25vh" variant="circle" animation="wave" />
                            </div>
                            <Row style={{ textAlign: "center", paddingLeft: "20%", paddingRight: "20%" }}>
                                <h2 className="item-align-center font-weight-bold"><Skeleton animation="wave" /></h2>
                            </Row>
                            <Row style={{ textAlign: "left", paddingTop: 20 }}>
                                <Col className="pl-0">
                                    <TitleWithDescription>
                                        Short Name
                                        <p>
                                            This will appear on <b>all event cards</b> throughout the website. It does NOT need to be unique to your organization! For example, WWC, AIS, DSC, etc.
                                        </p>
                                    </TitleWithDescription>
                                    <Col className="p-0">
                                        <h1 className="m-0 d-flex"><Skeleton width="100%" animation="wave" /></h1>
                                    </Col>
                                </Col>
                                <Col className="pr-0">
                                    <TitleWithDescription>
                                        Slug
                                        <p>
                                            Your "slug" determines the URL where your org info page will be hosted. E.g. if your slug was "women-who-compute",
                                            then your org profile page would be found at /orgs/women-who-compute. It must be <b> UNIQUE </b> (you cannot share it with other organizations), <b>lowercase</b>, and the <b>only special
                                            character it can contain are dashes: '-'</b>. For example, "women-who-compute", "wwc", "ais", "artificial-intelligence-society" are all valid slugs.
                                        </p>
                                    </TitleWithDescription>
                                    <Col className="p-0">
                                        <h1 className="m-0 d-flex"><Skeleton width="100%" animation="wave" /></h1>
                                    </Col>
                                </Col>
                            </Row>

                            <Row style={{ textAlign: "left", paddingTop: 20 }}>
                                <h3 className="item-align-center font-weight-bold">Website</h3>
                            </Row>
                            <Row>
                                <Col className="p-0">
                                    <h1 className="m-0 d-flex"><Skeleton width="100%" animation="wave" /></h1>
                                </Col>
                            </Row>

                            <Row style={{ textAlign: "left", paddingTop: 20 }}>
                                <TitleWithDescription>
                                    Logo URL
                                    <p>
                                        This should be a <b>direct link</b> to a png or jpeg image of your logo. For example, see <a href="https://raw.githubusercontent.com/acmutd/brand/master/General/Assets/Logos/acm-logo-black-background.png" target="_blank">this URL</a>.
                                        Transparent backgrounds are preferred. We recommend hosting your image on a platform like imgur or somewhere on your website!
                                    </p>
                                </TitleWithDescription>
                            </Row>
                            <Row>
                                <Col className="p-0">
                                    <h1 className="m-0 d-flex"><Skeleton width="100%" animation="wave" /></h1>
                                </Col>
                            </Row>

                            <Row style={{ textAlign: "left", paddingTop: 20 }}>
                                <Col className="p-0">
                                    <TitleWithDescription>
                                        Description
                                    <p>
                                            A short description of your organization. Must be <b>UNDER 600 characters (~90 words)</b>.
                                    </p>
                                    </TitleWithDescription>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="p-0">
                                    <h1 className="m-0 d-flex"><Skeleton width="100%" animation="wave" /></h1>
                                </Col>
                            </Row>
                            <Row style={{ textAlign: "left", paddingTop: 20 }}>
                                <TitleWithDescription>
                                    Social Media Links
                                    <p>
                                        Your social media links. If you leave a field blank, the icon for that platform will not appear on your org profile page!
                                    </p>
                                </TitleWithDescription>
                            </Row>
                            {
                                socialMediaPlatforms.map(platform => {
                                    return (
                                        <Row style={{ padding: 10 }} key={platform.title}>
                                            <Col xs={2} className="d-flex justify-content-start align-items-center px-0">
                                                <h4 className="m-0">{platform.title}</h4>
                                            </Col>
                                            <Col>
                                                <h2 className="m-0"><Skeleton animation="wave" /></h2>
                                            </Col>
                                        </Row>
                                    );
                                })
                            }
                        </Container>
                    </Container>
                </div>
            </AdminLayout>
        );
}