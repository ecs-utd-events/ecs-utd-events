import Spinner from 'react-bootstrap/Spinner';

export default function FullPageLoading({ loading }) {
    if (loading) {
        return (
            <div className="login-spinner-wrapper">
                <Spinner animation="border" className="login-spinner" />
            </div>
        )
    } else {
        return(null)
    }
}