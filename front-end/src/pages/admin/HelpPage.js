import AdminLayout from "../../components/AdminLayout";
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Icon from '@iconify/react';
import DropdownIcon from '@iconify/icons-mdi/arrow-down-drop-circle-outline';
import { questions } from '../../constants/FrequentlyAskedQuestions';

export default function HelpPage() {
    return (
        <AdminLayout pageName="Help">
            <Container>
            <h1 className="my-3" style={{textAlign:'center'}}>FAQs</h1>
            {questions.map(question => {
                return (
                    <Accordion key={question.ref}>
                        <Card className="mt-2">
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="light" eventKey="0" >
                                <Icon className="mr-3 mb-1" icon={DropdownIcon} />
                                    {question.question}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>{question.answer}</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                )
            })}
            </Container>
        </AdminLayout>
    );
}