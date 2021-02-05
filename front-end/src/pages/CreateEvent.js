import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import './../App.css';

export default function CreateEvent() {
    return (
        <div className="App">
            <Jumbotron>
                <Container>
                    <h1>Create Event Page</h1>
                </Container>
            </Jumbotron>
        </div>
    )
}