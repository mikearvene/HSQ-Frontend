import { useEffect, useState } from "react"
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Profile(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastname] = useState('');
    const [department, setDepartment] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [workEmail, setWorkEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [personalEmail, setPersonalEmail] = useState('');
    const [profilePictureKey, setProfilePictureKey] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    
    useEffect(()=>{
        fetchUserData()
    },[])
    const fetchUserData = () =>{
        fetch(`${process.env.REACT_APP_API_URL}/api/users/user/detail`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
    
            data = data.result
            if(typeof data !== "undefined"){
                setFirstName(data.firstName)
                setLastname(data.lastName)
                setDepartment(data.department)
                setJobTitle(data.jobTitle)
                setWorkEmail(data.email)
                setContactNo(data.mobileNo)
                setPersonalEmail(data.personalEmail)
                setProfilePictureKey(data.profilePictureKey)
                setProfilePictureUrl(data.profilePictureUrl)
            } else {
                Swal.fire({
                    title: 'Something went wrong :(',
                    text: 'Please try to refresh your browser.'
                });
            }   
        })
    }
    
    const linkStyle = {
        fontSize: "12.8px",
        color: "#016B83",
        textDecoration:'underline',
        cursor:'pointer'
    }
    const openUpdatePictureModal = () => {
        setShowModal(true);
      };
    
      const closeUpdatePictureModal = () => {
        setShowModal(false);
      };
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
      };
    
      const handleUpload = () => {
        if (!selectedImage) {
            // Handle case where no image is selected
            return;
          }
      
          const formData = new FormData();
          formData.append("image", selectedImage);
            if(typeof profilePictureKey === 'object'){
                formData.append("key", profilePictureKey.key);
            }
          fetch(`${process.env.REACT_APP_API_URL}/api/users/user/profilePicture/update`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
            fetchUserData()


            closeUpdatePictureModal();
            Swal.fire({
            title: 'Profile updated!',
            customClass: {
                title: 'custom-swal-title',
                confirmButton: 'custom-swal-confirm-button',
            }
            });
            })
            .catch((error) => {
              // Handle error during upload
              Swal.fire({
                        title: 'Something went wrong. :(',
                        text: 'Please try again',
                    });
            });
        // Close the modal after successful upload
        closeUpdatePictureModal();
      };

    return(
        <>

            <div  className="d-flex flex-column justify-content-center text-center">
                {profilePictureUrl !== 'false' ? 
                <div>
                    <img 
                        src={profilePictureUrl} 
                        alt="profile-picture" 
                        style={{ borderRadius: '50%', width: '125px', height: '125px', border: '2px solid #516473', objectFit: "cover" }}
                    />
                </div>
                :
                <div>
                    <img 
                        src='/icons/sidebar-user-icon.svg' 
                        alt="profile-picture" 
                        style={{ borderRadius: '50%', width: '125px', height: '125px' }}
                    />
                </div>
                }
                <span className="mt-2 small" style={linkStyle} onClick={openUpdatePictureModal}>Update Profile picture</span>
            </div>
            <div  className="d-flex flex-column justify-content-center text-center mt-3 mb-4">
                <div  className="mt-2">
                    <span className="muted">BASIC INFO</span>
                    <hr style={{width:'50%'}}/>
                </div>
                <div className="mt-2">
                    <span className="muted"><u>NAME</u></span>
                </div>

                <div>
                    <span className="muted"><b>{firstName} {lastName}</b></span>
                    <hr style={{width:'50%'}}/>
                </div>
                <div  className="mt-2">
                    <span  className="muted"><u>DEPARTMENT</u></span>
                </div>

                <div>
                    <span className="muted"><b>{department}</b></span>
                    <hr style={{width:'50%'}}/>
                </div>
                <div  className="mt-2">
                    <span className="muted"><u>POSITION</u></span>
                </div>
                <div>
                    <span className="muted"><b>{jobTitle}</b></span>
                    <hr style={{width:'50%'}}/>
                </div>
                <hr />
                <div  className="mt-2">
                    <span className="muted">CONTACT DETAILS</span>
                    <hr style={{width:'50%'}}/>
                </div>
                <div  className="mt-2">
                    <span className="muted"><u>HSQ EMAIL</u></span>
                </div>
                <div>
                    <span className="muted"><b><i>{workEmail}</i></b></span>
                    <hr style={{width:'50%'}}/>
                </div>
                <div  className="mt-2">
                    <span className="muted"><u>CONTACT NUMBER</u></span>
                </div>
                <div>
                    <span className="muted"><b><i>{contactNo}</i></b></span><span className="small" style={linkStyle} onClick={{}}><i>Edit</i></span>
                    <hr style={{width:'50%'}}/>
                </div>
                <div  className="mt-2">
                    <span className="muted"><u>PERSONAL EMAIL</u></span>
                </div>
                <div>
                    <span className="muted"><b><i>{personalEmail}</i></b></span> <span className="small" style={linkStyle} onClick={{}}><i>Edit</i></span>
                </div>
            </div>

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