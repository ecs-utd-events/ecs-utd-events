import { Navbar } from 'react-bootstrap'
import { ReactComponent as ECSLogo } from '../assets/utd-ecs-logo-clipped.svg';

export default function NavbarComponent({ page }) {
    if (page == 'Home') {
        return (
            <Navbar className="mb-0 background">
                <Navbar.Brand href="/">
                    <ECSLogo height='8vh' />
                </Navbar.Brand>
            </Navbar>
        );
    }
    else if (page == 'OrgProfilePage') {
        return (
            <Navbar className="mb-0 App">
                <Navbar.Brand href="/">
                    <ECSLogo height='8vh' />
                </Navbar.Brand>
            </Navbar>
        );
    }
    else {
        return (
            null
        );
    }
}