import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { ReactComponent as ECSLogo } from '../assets/utd-ecs-logo-clipped.svg';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';

export default function NavbarComponent({ page, org }) {
    // We display different navbar stuff depending on whether the org is logged in or not
    var orgProfile = null;
    var orgProfileLogo = null;

    // Some weird bug where on click, the text stays highlighted. Therefore, we manually keep track of the on click State for 
    // the API Documentation link on the navbar
    var clickState = false;
    const backgroundCSSName = page === 'OrgProfilePage' ? 'App' : 'background';
    if (org != null) {
        // Display a placeholder image if the organization is null OR the organization's imageUrl field is null.
        var imageSource = org.imageUrl != null && org.imageUrl !== "" ? org.imageUrl : null;

        orgProfile =
            <NavDropdown title={org.shortName} id="basic-nav-dropdown">
                <NavDropdown.Item href="/admin/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/admin/events">Events</NavDropdown.Item>
                <NavDropdown.Item href="/admin/help">Help</NavDropdown.Item>
                <NavDropdown.Divider />
                {/* TODO: @Mustafa, could you implement log out here? */}
                <NavDropdown.Item href="/login">Log Out</NavDropdown.Item>
            </NavDropdown>
        orgProfileLogo =
            <Navbar.Brand>
                <Image src={imageSource} style={{ width: '5vh', height: '5vh' }} roundedCircle />
            </Navbar.Brand>
    }
    else {
        orgProfile =
            <Nav.Link href="/login">Org Login</Nav.Link>
    }

    return (
        <Navbar className={'mb-0 ' + backgroundCSSName} style={{ paddingRight: 100 }}>
            <Navbar.Brand href="/">
                <ECSLogo height='8vh' width='8vh' />
            </Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="https://github.com/siddharthnaik99/utdecsevents_backend" target="_blank" active={clickState} onClick={clickState = false}>API Documentation</Nav.Link>
                    {orgProfile}
                </Nav>
                {orgProfileLogo}

            </Navbar.Collapse>
        </Navbar>
    );
}