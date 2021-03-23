import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DeleteEventModal(props) {
    return (
        <div>
            <Modal {...props} animation={false} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Deleting Event: {props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this event?</Modal.Body>
                <Modal.Footer>
                    <Button className="secondary-btn" onClick={props.delete}>
                        Delete
                    </Button>
                    <Button className="primary-btn" onClick={props.onHide}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}