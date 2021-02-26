import { Container, Row, Col } from "react-bootstrap/esm";
import { Link, useHistory } from 'react-router-dom';
import { Icon } from '@iconify/react';
import profileIcon from '@iconify/icons-gg/profile';
import calendarIcon from '@iconify/icons-gg/feed';
import helpIcon from '@iconify/icons-gg/info';
import logoutIcon from '@iconify/icons-gg/log-out';
import { auth } from "../firebase";

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
        title: 'Log Out',
        icon: logoutIcon,
        link: '#',
        flag: true
    }
];

export const Tab = ({ tab, index, parent, logoutHandler }) => {
    const selected = tab.title === parent;
    const orderClass = index === 0 ? 'first' : index === TAB_CONTENTS.length - 1 ? 'last' : ''
    const rowClass = orderClass.concat(' ').concat(selected ? 'selected' : '')
    return (
        <Link to={tab.link} onClick={tab.flag ? logoutHandler : null}>
            <Row className={"admin-tab " + rowClass} disabled={tab.title === parent}>
                <Col>
                    <Container className="mx-0 px-0">
                        <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Col xs={2}>
                                <Icon icon={tab.icon} style={{ color: 'var(--gray1)', fontSize: '1.5rem' }} />
                            </Col>
                            <Col style={{ alignItems: 'center', textAlign: 'center', height: '100%' }}>
                                <h6 className="admin-tab-title">{tab.title}</h6>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Link>
    )
}

export default function AdminTab({ parent }) {
    const history = useHistory();
    const logoutHandler = () => {
        auth.signOut().then(() => {
            history.push('/');
        }).catch((error) => {
            console.log(error.message);
            alert('Sorry there was an issue signing you out 😔. Why not wait for a second then try again 😊');
        })
    }
    return (
        <Container className="admin-tab-wrapper mx-0">
            {
                TAB_CONTENTS.map((value, index) => <Tab tab={value} index={index} parent={parent} logoutHandler={logoutHandler} />)
            }
        </Container>
    )
}