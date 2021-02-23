import { Container, Row, Col, Card } from "react-bootstrap/esm";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import profileIcon from '@iconify/icons-gg/profile';
import calendarIcon from '@iconify/icons-gg/feed';
import helpIcon from '@iconify/icons-gg/info';
import logoutIcon from '@iconify/icons-gg/log-out';

export const TAB_CONTENTS = [
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
        link: '/'
    }
];

export const Tab = ({ tab, index, parent }) => {
    const selected = tab.title === parent;
    const orderClass = index === 0 ? 'first' : index === TAB_CONTENTS.length - 1 ? 'last' : ''
    const rowClass = orderClass.concat(' ').concat(selected ? 'selected' : '')
    return (
        <Link to={tab.link}>
            <Row className={"admin-tab " + rowClass} disabled={tab.title === parent}>
                <Col>
                    <Container>
                        <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Col xs={3}>
                                <Icon icon={tab.icon} style={{ color: 'var(--gray1)', fontSize: '2.5rem' }} />
                            </Col>
                            <Col style={{ alignItems: 'center', textAlign: 'center', height: '100%' }}>
                                <h1 className="admin-tab-title">{tab.title}</h1>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Link>
    )
}

export default function AdminTab({ parent }) {
    return (
        <Card className="card admin-tab-wrapper">
            {
                TAB_CONTENTS.map((value, index) => <Tab tab={value} index={index} parent={parent} />)
            }
        </Card>
    )
}