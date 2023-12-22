import { useState } from "react";
import { Button , Form  , Modal} from "react-bootstrap";
import Swal from "sweetalert2";

export default function EditForm({props}){

    const refreshEffect = props.refreshEffect;
    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [link , setLink] = useState(props.link);
    const [formId] = useState(props.formId);
    const [showEditForm , setShowEditForm] = useState(false)
    
    
    const openEdit = () => {
        console.log(formId)
        setShowEditForm(true);
    }
    const editForm = (e) =>{
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/api/forms/form/edit`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                formId: formId,
                name: name,
                description:description,
                link:link
            })
        })
        .then(data => {
            if(data.status === 200){
                Swal.fire({
                    title: "Success",
                    icon: 'success',
                    text: 'Form edited succesfully'
                })
                refreshEffect();
                closeEdit();
            } else {
                Swal.fire({
                    title: "Error!!",
                    icon: 'error',
                    text: 'Please try again'
                })
                closeEdit();
            }

        })
    }
    const closeEdit = () => {
        setName('');
        setDescription('');
        setLink('');
        setShowEditForm(false);
    }
    return(
        <>
        <span className="anchor-underline cursor-pointer" onClick={() => openEdit()}>Edit Form</span>
        <Modal show={showEditForm} onHide={closeEdit}>
            <Form onSubmit={(e)=> editForm(e)}>
                <Modal.Header>
                    <Modal.Title>Add New Form</Modal.Title>
                    <Button onClick={() => closeEdit()} className="modal-close bg-contrast">X</Button>
                </Modal.Header>
                <Modal.Body>    
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Form Description</Form.Label>
                        <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group controlId="link">
                        <Form.Label>Form Link</Form.Label>
                        <Form.Control type="text" value={link} onChange={(e) => setLink(e.target.value)} required/>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeEdit}>Close</Button>
                    <Button variant="success" type="submit">Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}