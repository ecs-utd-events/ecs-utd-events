import { Navbar, Nav, NavDropdown, Row } from 'react-bootstrap'
import { useContext, useState, useEffect } from 'react';

import { UserContext } from '../providers/UserProvider';

import { ReactComponent as ECSLogo } from '../assets/utd-ecs-logo-clipped.svg';
import Image from 'react-bootstrap/Image';
import Circle from '../assets/placeholder_org_image.svg';
import { auth } from '../firebase';

export default function NavbarComponent({ page }) {
    const { org, user } = useContext(UserContext);
    const [dummyOrgState, setDummyOrgState] = useState(org);

    const logoutHandler = (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            console.log('Adios! 👋')
            setDummyOrgState(null);
        }).catch((error) => {
            console.log(error.message);
            alert('Sorry there was an issue signing you out 😔. Why not wait for a second then try again 😊');
        })
    }

    useEffect(() => {
        if(user == null)
            setDummyOrgState(null)
        else if(org == null)
            setDummyOrgState(null)
        else
            setDummyOrgState(org);
    }, [org, user])

    const backgroundCSSName = page === 'OrgProfilePage' ? 'App' : 'background';
    var imageSource = dummyOrgState != null ? (dummyOrgState.imageUrl != null && dummyOrgState.imageUrl !== "" ? dummyOrgState.imageUrl : Circle) : null;

    return (
        <Navbar className={'mb-0 ' + backgroundCSSName} style={{ paddingRight: 25 }}>
            <Navbar.Brand href="/">
                <ECSLogo height='8vh' width='8vh' />
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto d-flex align-items-center">
                    <Nav.Link href="https://github.com/siddharthnaik99/utdecsevents_backend" target="_blank" >API Documentation</Nav.Link>
                    {dummyOrgState != null ?
                        (
                            <NavDropdown
                                title={
                                    <span>
                                        <Image src={imageSource} style={{ width: '50px', height: '50px', border: '2px solid var(--accent1)' }} roundedCircle />
                                    </span>
                                }
                                id="basic-nav-dropdown"
                                menuAlign="right"
                            >
                                <NavDropdown.Item href="/admin/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/admin/events">Events</NavDropdown.Item>
                                <NavDropdown.Item href="/admin/help">Help</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
                            </NavDropdown>
                        ) :
                        (
                            <Nav.Link href="/login">Org Login</Nav.Link>
                        )
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}