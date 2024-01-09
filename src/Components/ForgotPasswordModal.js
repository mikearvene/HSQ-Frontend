import { useState } from "react"
import { Modal, Button } from "react-bootstrap";
import { isEmailValid } from "../Util/validateEmail";
export default function ForgotPasswordModal ({showForgotModal, openResetPasswordModal, closeResetPasswordModal}){
    const [email, setEmail] = useState('')

    const handleEmailchange = (e) => {
        const input = e.target.value;
        setEmail(input);
    };
    const handleSubmitEmail = () =>{

    }

    return(
        <>
            <i onClick={openResetPasswordModal} >Forgot password?</i>
        {/* Modal */}
        <Modal show={showForgotModal} onHide={closeResetPasswordModal}>
            
            <Modal.Header closeButton >
            <Modal.Title className="ml-auto mr-auto" style={{color:'#516473'}}>Password Reset</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="d-flex flex-column justify-content-center align-items-center">
            <span>Email address</span>
            <input type="text" value={email}  onChange={handleEmailchange} />
            {!isEmailValid(email) ? <span className="small" style={{color:'#F22F41'}}>Please enter a valid email address</span> :null}
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={closeResetPasswordModal}>
            Close
            </Button>
            <Button variant="primary" disabled={!isEmailValid(email)} onClick={handleSubmitEmail} style={{backgroundColor:'#016B83'}}>
            Submit
            </Button>
            </Modal.Footer>
     
        </Modal>
            
        </>
    )
}