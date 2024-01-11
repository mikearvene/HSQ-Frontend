import { useState } from "react"
export default function MakeAPost({user}){

    const [message, setMessage]=useState("")
    console.log(user)
    const openModal = () =>{

    }
    return(
        <>
        <div className="border p-3 row" style={{backgroundColor: 'rgba(81, 100, 115, 0.3)', borderRadius:"8px", width:'100%'}}>
            <div className="d-flex justify-content-center align-items-center col-2">
                {user.profilePicture !== 'false' ? 
                <img 
                src={user.profilePicture} 
                alt="user.profilePicture" 
                style={{ borderRadius: '50%', width: '45px', height: '45px', objectFit: "cover" }}/>
                :
                <img
                src='/icons/sidebar-user-icon.svg'
                alt="defaultPic" 
                style={{ borderRadius: '50%', width: '45px', height: '45px', objectFit: "cover" }}/>
                }
            </div>
            <div className="d-flex justify-content-center align-items-center col-7" style={{width:'100%'}}  > 
                <button className="" onClick={openModal}  style={{ borderRadius: '25px',width:'100%', backgroundColor:'white', borderColor:'muted', borderWidth:'0.5px' }}>
                    {`What's on your mind, ${user.firstName}?`}
                </button>
            </div>
            <hr />
            <div className="col-3 d-flex justify-content-center align-items-center">
                <button className="" onClick={openModal}  style={{ borderRadius: '25px',width:'100%', backgroundColor:'white', borderColor:'muted', borderWidth:'0.5px' }}>Upload image</button>
            </div>
        
        
        </div>
        
        </>
    )
}