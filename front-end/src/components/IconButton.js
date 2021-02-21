import Button from "react-bootstrap/esm/Button";
import './../styles/components.css';
import { Icon } from '@iconify/react';

export default function IconButton({ icon, SVGIcon, ...props }) {

    return (
        <Button bsPrefix={"icon-btn"} {...props}>
            <span class="helper"></span>
            {icon != null && <Icon icon={icon} style={{ fontSize: '1.5rem' }} />}
            {icon == null && SVGIcon != null && <img className="icon" src={SVGIcon} />}
        </Button>
    )
}