import Button from "react-bootstrap/esm/Button";
import './../styles/components.css';

export default function CustomButton({ wide, width, primary, secondary, accent, square, round, children, ...props }) {
    function getClassName() {
        var classname = 'btn'
        if (primary != null) {
            classname = classname.concat(' primary-btn')
        } else if (secondary != null) {
            classname = classname.concat(' secondary-btn')
        } else if (accent != null) {
            classname = classname.concat(' accent-btn')
        } else {
            classname = classname.concat(' primary-btn')
        }

        if (wide != null && width == null) {
            classname = classname.concat(' wide-btn')
        }

        if (round != null) {
            classname = classname.concat(' rounded-btn')
        } else if (square != null) {
            classname = classname.concat(' square-btn')
        } else {
            classname = classname.concat(' rounded-btn')
        }

        return classname
    }

    return (
        <Button bsPrefix={getClassName()} {...props} style={{ width: width, ...props.style }}>{children}</Button>
    )
}