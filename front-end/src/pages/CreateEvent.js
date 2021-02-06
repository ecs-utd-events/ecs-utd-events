import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/esm/Card';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import './../styles/App.css';
import CustomButton from '../components/CustomButton';

export default function CreateEvent() {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div className="App vertical-align">
            <Container >
                <Card>
                    <Card.Header><h2>Create Event</h2></Card.Header>
                    <Form onSubmit={handleSubmit(onSubmit)} style={{display: 'inline-block'}}>
                        <Form.Control className="mb-4" type="text" placeholder="Title" name="Title" ref={register} />
                        <Form.Control className="mb-4" type="datetime-local" placeholder="Date" name="Date" ref={register} />
                        <Form.Control className="mb-4" type="text" placeholder="Location" name="Location" ref={register} />
                        <Form.Control className="mb-4" type="url" placeholder="Link" name="Link" ref={register} />
                        <Form.Control className="mb-4"type="text" placeholder="Collaborator(s)" name="Collaborator(s)" as="select" custom>
                            <option>1</option>
                        </Form.Control>
                        <Form.Control type="text" placeholder="Description" name="Description" ref={register} />

                        <CustomButton width={250}>Submit</CustomButton>
                    </Form>
                </Card>
            </Container>
        </div>
    )
}