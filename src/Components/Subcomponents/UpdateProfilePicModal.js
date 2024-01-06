import { Modal, Button } from "react-bootstrap";

export default function UpdateProfilePicModal({showModal, closeUpdatePictureModal, handleImageChange, handleUpload}){

    return(
        <>
        {/* Modal */}
        <Modal show={showModal} onHide={closeUpdatePictureModal}>
            <Modal.Header closeButton>
            <Modal.Title>Update Profile Picture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <input type="file" onChange={handleImageChange} />
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={closeUpdatePictureModal}>
            Close
            </Button>
            <Button variant="primary" onClick={handleUpload}>
            Upload
            </Button>
            </Modal.Footer>
            </Modal>
        </>
    )
}