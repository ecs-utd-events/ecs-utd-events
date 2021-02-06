import Button from "react-bootstrap/esm/Button";
import './../styles/components.css';

export default function IconButton({ icon, ...props }) {
    return (
        <Button bsPrefix={"icon-btn"} {...props}>
                <span class="helper"></span>
                <img className="icon" src={icon} />
        </Button>
    )
}