import { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap/esm";
import { Link, useHistory } from 'react-router-dom';
import { Icon } from '@iconify/react';
import profileIcon from '@iconify/icons-mdi/account-circle-outline';
import calendarIcon from '@iconify/icons-mdi/format-list-text';
import helpIcon from '@iconify/icons-mdi/help-circle-outline';
import logoutIcon from '@iconify/icons-mdi/logout';
import homeIcon from '@iconify/icons-mdi/home';
import { auth } from "../firebase";

import '../styles/AdminPages.css';

const TAB_CONTENTS = [
    {
        title: 'Profile',
        icon: profileIcon,
        link: '/admin/profile',
    },
    {
        title: 'Events',
        icon: calendarIcon,
        link: '/admin/events',
    },
    {
        title: 'Help',
        icon: helpIcon,
        link: '/admin/help',
    },
    {
        title: 'Home',
        icon: homeIcon,
        link: '/'
    },
    {
        title: 'Log Out',
        icon: logoutIcon,
        link: '#',
        flag: true
    }
];

export const ClosedTab = ({ tab, index, parent, logoutHandler }) => {
    const selected = tab.title === parent;
    const orderClass = index === 0 ? 'first' : index === TAB_CONTENTS.length - 1 ? 'last' : ''
    const rowClass = orderClass.concat(' ').concat(selected ? 'selected' : '')
    return (
        <Link to={tab.link} onClick={tab.flag ? logoutHandler : null}>
            <Row className={"admin-tab item py-2 " + rowClass} disabled={tab.title === parent}>
                <Col>
                    <Container className="mx-0 px-0 my-0 py-1">
                        <Row >
                            <Col xs={2} className="sidebar-icon">
                                <Icon icon={tab.icon} style={{ alignItems: 'center', color: 'var(--gray1)', fontSize: '1.5rem' }} />
                            </Col>
                            <Col style={{ alignItems: 'center', textAlign: 'center', height: '100%' }}>
                                <h6 className="admin-tab-title sidebar-text">{tab.title}</h6>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Link>
    )
}

export default function AdminTab({ parent }) {
    const [ isHovered, setIsHovered ] = useState(false);
    const history = useHistory();
    const sidebarClass = isHovered ? 'sidebar' : 'sidebar collapsed';
    const logoutHandler = () => {
        auth.signOut().then(() => {
            console.log('Adios! 👋')
            history.push('/');
        }).catch((error) => {
            console.log(error.message);
            alert('Sorry there was an issue signing you out 😔. Why not wait for a second then try again 😊');
        })
    }
    return (
        <Container className={"mx-0 " + sidebarClass} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="sidebar-items">
            {
                TAB_CONTENTS.map((value, index) => <ClosedTab tab={value} key={index} index={index} parent={parent} logoutHandler={logoutHandler} />)
            }
            </div>
        </Container>
        
    )
}