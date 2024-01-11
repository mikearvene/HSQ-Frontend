import { useState } from "react"
export default function MakeAPost({user}){

    const [message, setMessage]=useState("")
    console.log(user)
    const handleMessageChange = (e) =>{
        const input = e.target.value;
        setMessage(input);
    }
    return(
        <>
        <div className="border p-3 d-flex" style={{ borderRadius:"5px"}}>
            <div className="d-flex">
                <img 
                src={user.profilePicture} 
                alt="user.profilePicture" 
                style={{ borderRadius: '50%', width: '50px', height: '50px', objectFit: "cover" }}/>
            </div>
            <div className="d-flex ml-2">
                <textarea
                    value={message}
                    placeholder={`What do you want to say, ${user.firstName}?`}
                    onChange={handleMessageChange}
                    style={{ borderRadius: '5px',minWidth:'350px', resize: 'none'  }}
                />
            </div>
        
        
        </div>
        </>
    )
}