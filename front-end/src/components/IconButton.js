import Button from "react-bootstrap/esm/Button";
import './../styles/components.css';
import { Icon } from '@iconify/react';

// This functional component helps to display a circular button with an icon in it's center
// It expects icon XOR SVGIcon XOR SVGComponent
// icon is an icon from an @iconify library: https://iconify.design/icon-sets/, i.e. import CalendarIcon from '@iconify/icons-icons/calendar'
// SVGIcon is an icon that's actually an SVG which was imported normally, i.e. import CalendarIcon from 'calendar.svg'
// SVGComponent is an icon that's actually an SVG imported as a React component, i.e. import { ReactComponent as CalendarIcon } from 'calendar.svg'
export default function IconButton({ icon, SVGIcon, SVGComponent, size, ...props }) {

    const sizeClass = size != null ? size : 'md'

    return (
        <Button style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} bsPrefix={"icon-btn " + sizeClass} {...props}>
            {icon != null && <Icon icon={icon} style={{ fontSize: sizeClass === 'sm' ? '1rem' : sizeClass === 'lg' ? '2rem' : '1.5rem', minHeight: '24px', minWidth: '24px' }} />}
            {icon == null && SVGIcon != null && <img alt={props.alt || 'Icon for button'} className={"icon " + sizeClass} src={SVGIcon} />}
            {icon == null && SVGIcon == null && <SVGComponent className={"icon " + sizeClass} />}
        </Button>
    )
}