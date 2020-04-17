import React from 'react';
import PostForm from './PostForm';
import { Modal } from 'react-bootstrap';

export default function PostModal(props) {

    return (
    <div className='modal-container'>
        <Modal 
            show={props.modalState}
            onHide={() => props.toggleModal(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                <div>Share something...</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PostForm />
            </Modal.Body> 
        </Modal>
    </div>
    )
}