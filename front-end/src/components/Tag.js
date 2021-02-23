import Chip from '@material-ui/core/Chip';

export default function Tag({ children, type, ...props }) {
    // type can be of the following: 'primary', 'secondary', 'accent'
    // check https://material-ui.com/components/chips/ for all prop options
    return (
        <Chip className={"custom-tag " + type} label={children} {...props}/>
    )
}