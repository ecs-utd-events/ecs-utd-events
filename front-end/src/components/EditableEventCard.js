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
        <OrgPageEventCard event={event} pastEvent={false}></OrgPageEventCard>
    );
   
}
// if (event) {
//     return (
//         <Card className={"drop-shadow mb-4"}>
//             <Row>
//                 <Col style={{ textAlign: 'left' }}>
//                     <h5 className="font-weight-bold">{event.title}</h5>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col xs={2} style={{ textAlign: 'left' }}>
//                     {/* <p className="mb-0">{event.start.toDateString()}</p> */}
//                     <p className="mb-0">{!event.allDay ? getFormattedTime(new Date(event.startTime)) + " - " + getFormattedTime(new Date(event.endTime)) : null}</p>
//                     <p className="mb-0">{event.start}</p>
//                     <p className="mb-0">{event.location}</p>
//                     <p className="mb-0">{event.orgs}</p>
//                     <a className="mb-0" href={event.link}>More Info</a>
//                 </Col>
//                 <Col style={{ textAlign: 'left' }}>
//                     <p>{event.description}</p>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col md={{ span: 10, offset: 10 }}>
//                     <ButtonGroup>
//                         <IconButton className="mr-2" icon={EditIcon}></IconButton>
//                         <IconButton icon={TrashIcon}></IconButton>
//                     </ButtonGroup>
//                 </Col>
//             </Row>
//         </Card>
//     );
// } else {