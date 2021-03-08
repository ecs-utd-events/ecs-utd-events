import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import React, { useContext, useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import ReactTooltip from 'react-tooltip';

import IconButton from '../../components/IconButton';
import AdminLayout from "../../components/AdminLayout";
import { UserContext } from "../../providers/UserProvider";

import EditIcon from '@iconify/icons-gg/pen';
import SaveIcon from '@iconify/icons-gg/check';
import '../../styles/AdminPages.css';
import Circle from '../../assets/circle.png';
import FullPageLoading from '../../components/FullPageLoading';
import CancelIcon from '@iconify/icons-gg/close';
import { AllOrgContext } from '../../providers/AllOrgProvider';

export default function EditProfile() {
    const { org } = useContext(UserContext);
    const allOrgs = useContext(AllOrgContext);

    const { register, handleSubmit, watch, reset, errors, clearErrors } = useForm();
    const [isEditing, setEditing] = useState(false);

    const socialMediaPlatforms =
        [{ title: 'Facebook', ref: 'facebook' },
        { title: 'LinkedIn', ref: 'linkedIn' },
        { title: 'Discord', ref: 'discord' },
        { title: 'Instagram', ref: 'instagram' },
        { title: 'Snapchat', ref: 'snapchat' }];

    const onSubmit = (newOrgData) => {
        // If currently not editing, set editing.
        if (isEditing == false) {
            setEditing(!isEditing);
        }
        // otherwise, we were actually editing the form so do the real submission here.
        else {
            setEditing(!isEditing);
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
                    if (response.status != 200) {
                        console.log('There was an issue sending the updated profile data to the server. Please try again!');
                        setEditing(!isEditing);
                    }
                })
                .catch(error => handleErrors());
        }
        return null;
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
        if (value.length > 599)
            return false;
        return true;
    }

    // Display a placeholder image if the organization is null OR the organization's imageUrl field is null.
    const imageSource = org != null ? (org.imageUrl != "" ? org.imageUrl : Circle) : Circle;

    if (org != null) {
        return (
            <AdminLayout pageName="Profile">
                <div className="edit-profile-page">
                    <Container>
                        <Form onSubmit={handleSubmit(onSubmit)} style={{ display: 'inline-block', width: '100%' }}>
                            <Image src={imageSource} style={{ width: '25vh', height: '25vh' }} roundedCircle></Image>
                            <IconButton className="mr-2"
                                icon={isEditing == false ? EditIcon : SaveIcon}
                                type="submit"
                                onClick={handleSubmit(onSubmit)} />

                            {/* If editing, give user the option to undo changes. */}
                            {isEditing &&
                                <IconButton className="mr-2" icon={CancelIcon} onClick={cancelEditing} />
                            }

                            <Row style={{ textAlign: "center" }}>
                                <h2 className="item-align-center font-weight-bold">{org.name}</h2>
                            </Row>

                            <Row style={{ textAlign: "left", paddingTop: 20 }}>
                                <h3 className="item-align-center font-weight-bold">
                                    Short Name
                                </h3>
                                <p>
                                    This will appear on <b>all event cards</b> throughout the website. It does NOT need to be unique to your organization! For example, WWC, AIS, DSC, etc.
                                </p>
                            </Row>
                            <Row>
                                <Form.Control type="text"
                                    defaultValue={org != null ? org.shortName : 'Organization Short Name'}
                                    ref={register({ required: true })}
                                    name="shortName"
                                    disabled={!isEditing} />
                                {errors.shortName && <p className="error-edit-profile">⚠ A short name for your organization is required!</p>}

                            </Row>

                            <Row style={{ textAlign: "left", paddingTop: 20 }}>
                                <h3 className="item-align-center font-weight-bold">Slug
                                </h3>
                                <p>
                                    Your "slug" determines the URL where your org info page will be hosted. E.g. if your slug was "women-who-compute",
                                then your org profile page would be found at /orgs/women-who-compute. It must be <b> UNIQUE </b> (you cannot share it with other organizations), <b>lowercase</b>, and the <b>only special
                                character it can contain are dashes: '-'</b>. For example, "women-who-compute", "wwc", "ais", "artificial-intelligence-society" are all valid slugs.
                                </p>
                            </Row>
                            <Row>
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
                                <h3 className="item-align-center font-weight-bold">Logo URL</h3>
                                <p>
                                    This should be a <b>direct link</b> to a png or jpeg image of your logo. For example, see <a href="https://raw.githubusercontent.com/acmutd/brand/master/General/Assets/Logos/acm-logo-black-background.png" target="_blank">this URL</a>.
                                    Transparent backgrounds are preferred. We recommend hosting your image on a platform like imgur or somewhere on your website!
                                </p>
                            </Row>
                            <Row>
                                <Form.Control type="text"
                                    defaultValue={org != null ? org.imageUrl : 'logo.url'}
                                    name="imageUrl"
                                    ref={register()}
                                    disabled={!isEditing} />
                            </Row>

                            <Row style={{ textAlign: "left", paddingTop: 20 }}>
                                <h3 className="item-align-center font-weight-bold">Description</h3>
                                <p>
                                    A short description of your organization. Must be <b>UNDER 600 characters (~90 words)</b>.
                                </p>
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
                                {errors.description?.type === 'maxDescriptionLength' && <p className="error-edit-profile">⚠ Your org description must be under 600 characters!</p>}

                            </Row>
                            <Row style={{ textAlign: "left", paddingTop: 20 }}>
                                <h3 className="item-align-center font-weight-bold">Social Media Links</h3>
                                <p>
                                    Your social media links. If you leave a field blank, the icon for that platform will not appear on your org profile page!
                                </p>
                            </Row>
                            {org != null &&
                                socialMediaPlatforms.map(platform => {
                                    return (
                                        <Row style={{ padding: 10 }}>
                                            <Col xs={3}>
                                                <h4 className="item-align-center">{platform.title}</h4>
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
        return null;
}