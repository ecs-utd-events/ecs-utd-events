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
import CloseIcon from '@iconify/icons-gg/close';


export default function EditableEventCard({ event }) {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    const [isEditing, setEditing] = useState(false);



    return(
        <OrgPageEventCard event={event} pastEvent={false} isEditable={true}></OrgPageEventCard>
    );
   
    
}