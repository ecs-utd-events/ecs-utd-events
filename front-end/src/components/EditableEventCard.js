import { useState, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Editable } from './Editable';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import OrgPageEventCard from './OrgPageEventCard';
import IconButton from './IconButton';
import EditIcon from '@iconify/icons-gg/edit-markup';
import DeleteIcon from '@iconify/icons-gg/trash';



export default function EditableEventCard({ event, handleDelete }) {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    const [isEditing, setEditing] = useState(false);



    return(
        <Row>
            <Col xs={12} md={8}>
                <OrgPageEventCard event={event} pastEvent={false}></OrgPageEventCard>
            </Col>
            <Col xs={6} md={4}>
                <Row >
                    <IconButton icon={EditIcon}></IconButton>
                </Row>
                <Row>
                    <IconButton icon={DeleteIcon} onClick={handleDelete}></IconButton>
                </Row>
            </Col>  
        </Row>
    );
   
    
}