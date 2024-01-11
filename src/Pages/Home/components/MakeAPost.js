import { useState } from "react"
export default function MakeAPost({user}){

    const [message, setMessage]=useState("")
    console.log(user)
    const openModal = () =>{

    }
    return(
        <>
        <div className="border p-3 d-flex" style={{backgroundColor: 'rgba(81, 100, 115, 0.3)', borderRadius:"8px", width:'100%'}}>
            <div className="d-flex">
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
            <div className="d-flex align-items-center ml-2" style={{width:'100%'}}  > 
                <button className="" onClick={openModal}  style={{ borderRadius: '25px',width:'75%', backgroundColor:'white', borderColor:'muted', borderWidth:'0.5px' }}>
                    {`What's on your mind, ${user.firstName}?`}
                </button>
            </div>
        
        
        </div>
        </>
    )
}