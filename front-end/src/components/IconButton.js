import Button from "react-bootstrap/esm/Button";
import './../styles/components.css';
import { Icon } from '@iconify/react';

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