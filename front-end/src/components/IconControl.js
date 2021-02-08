import InputGroup from "react-bootstrap/esm/InputGroup";
import './../styles/components.css';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';

export default function IconControl({ icon, ...props }) {
    const { register, handleSubmit, watch, errors } = useForm();
    return (
        <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text>
                <img className="icon" src={icon} />
                </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control  type="datetime-local" placeholder="Date" name="Date" ref={register}/>
        </InputGroup>
    )
}