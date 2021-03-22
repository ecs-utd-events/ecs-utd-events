import Spinner from 'react-bootstrap/Spinner';

export default function FullPageLoading({ loading }) {
    if (loading) {
        return (
            <div className="loading-spinner-wrapper">
                <Spinner animation="border" className="loading-spinner" />
            </div>
        )
    } else {
        return (null)
    }
}