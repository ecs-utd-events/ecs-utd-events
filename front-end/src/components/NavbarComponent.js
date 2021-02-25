import { Navbar } from 'react-bootstrap'
import { ReactComponent as ECSLogo } from '../assets/utd-ecs-logo-clipped.svg';

export default function NavbarComponent({ page }) {
    const backgroundCSSName = page === 'OrgProfilePage' ? 'App' : 'background';
    return (
        <Navbar className={'mb-0 ' + backgroundCSSName}>
            <Navbar.Brand href="/">
                <ECSLogo height='8vh' width='8vh'/>
            </Navbar.Brand>
        </Navbar>
    );
}