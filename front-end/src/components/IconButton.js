import Button from "react-bootstrap/esm/Button";
import './../styles/components.css';
import { Icon } from '@iconify/react';

export default function IconButton({ icon, SVGIcon, SVGComponent, size, ...props }) {

    const sizeClass = size != null ? size : 'md'

    return (
        <Button bsPrefix={"icon-btn " + sizeClass} {...props}>
            <span class="helper"></span>
            {icon != null && <Icon icon={icon} style={{ fontSize: sizeClass == 'sm' ? '1rem' : sizeClass == 'lg' ? '2rem' : '1.5rem' }} />}
            {icon == null && SVGIcon != null && <img className={"icon " + sizeClass} src={SVGIcon} />}
            {icon == null && SVGIcon == null && <SVGComponent className={"icon " + sizeClass} />}
        </Button>
    )
}