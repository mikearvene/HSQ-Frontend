import { Link } from 'react-router-dom';
import { linkStyle } from '../../Util/styling';

export default function NavNotificationPopCard({unread}){

    console.log(unread)
    return(
        <>
        <Link to={'/news-and-updates'}> 
            <div className="p-2 border mb-1" style={{borderRadius:'5px'}}>
                <span className="small" style={{color:'#383C3F'}}><b>{unread.author.firstName} {unread.author.lastName}</b> posted an update</span>
            </div>
        </Link>
        </>
    )
}