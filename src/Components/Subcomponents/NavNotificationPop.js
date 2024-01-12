
import { useState, useEffect } from "react"
import NavNotificationPopCard from './NavNotificationPopCard';

export default function NavNotificationPop({notification, setNotifIsOpen}){
    
    const [timeDiff, setTimeDiff] = useState(null);
    console.log(notification)
    return(
        <>
            <div className="d-flex flex-column justify-content-center align-items-center p-3" style={{border:`solid`,borderWidth:`1px`,borderRadius:`8px`,minHeighteight:`129px`, width:`250px`, zIndex: '1', position: 'fixed', transform: 'translate(-10%, 80%)', backgroundColor:'#F3F3F3'}}>

            {notification !== null ? 
                notification.unread.length > 0 ? 
                <>
                    {
                        notification.unread.map(data => (
                            <NavNotificationPopCard
                                key={data._id}
                                unread={data}
                                setNotifIsOpen={setNotifIsOpen}
                            />
                        ))
                    }
                </>
                :
                <span className="muted">You're all caught-up!</span>
            :
            <><span className="muted">Problem with retrieving data.</span></>}

            </div>
        </>
    )
}