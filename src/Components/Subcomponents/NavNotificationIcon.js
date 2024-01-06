import { useState } from "react"

export default function NavNotificationIcon(){
    const [unreadNotifications, setUnreadNotifications] = useState(0)
    return(
        <>
        <a style={{cursor:'pointer'}}>
            <img src="/icons/notification-bell.svg" alt="" />
            <div className="d-flex justify-content-center align-items-center" style={{backgroundColor:'#F22F41',borderRadius: '50%', width: '18px', height: '18px', position: 'fixed', transform: 'translate(40%, -160%)'}}>
                <span className="small white">{unreadNotifications}</span>
            </div>
            
        </a>
        </>
    )
}