import { Link } from 'react-router-dom';
import { linkStyle } from '../../Util/styling';
import { useState, useEffect } from "react";
export default function NavNotificationPopCard({unread}){
    const [timeDiff, setTimeDiff] = useState(null);
    console.log(unread)
    useEffect(() => {

        const originalPostDate = new Date(unread.originalPostDate);
        const currentTime = new Date();
    
        const timeDifference = currentTime - originalPostDate;
    
        // Calculate minutes, hours, or days
        const minutes = Math.floor(timeDifference / (1000 * 60));
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
        let displayTimeDiff;
        if (minutes === 0){
            displayTimeDiff = `Just now`;
        }else if (minutes < 60) {
          displayTimeDiff = `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        } else if (hours < 24) {
          displayTimeDiff = `${hours} hour${hours === 1 ? '' : 's'} ago`;
        } else {
          displayTimeDiff = `${days} day${days === 1 ? '' : 's'} ago`;
        }
    
        setTimeDiff(displayTimeDiff);
      },[]);
    return(
        <>
        
        <Link to={'/news-and-updates'}> 
            <div className="p-2 border mb-1" style={{borderRadius:'5px'}}>
                <span className="small" style={{color:'#383C3F'}}><b>{unread.author.firstName} {unread.author.lastName}</b> posted an update</span>
                <span className='small d-block' style={{color:'#383C3F'}}>{timeDiff}</span>
            </div>
        </Link>
        </>
    )
}