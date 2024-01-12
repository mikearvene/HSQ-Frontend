import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavUserIcon from './Subcomponents/NavUserIcon';
import Logo from './Subcomponents/Logo';
import UserIconPop from './UserIconPop';
import { useLocation } from 'react-router-dom';
import UserContext from '../userContext';
import NavNotificationIcon from './Subcomponents/NavNotificationIcon';
// const dotenv = require('dotenv').config().parsed;
import io from "socket.io-client";
import NavNotificationPop from './Subcomponents/NavNotificationPop';

const socket = io.connect(`${process.env.REACT_APP_SOCKET_URL}`);

const AppNavbar = ({setIsInCompose,setIsInArticleView, setIsInEditArticleView}) => {
    const { user } = useContext(UserContext);
    let location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [notifIsOpen, setNotifIsOpen] = useState(false);
    const [notification, setNotification] = useState(null)
    const room = `${user.id}`;
    
    useEffect(()=>{
        socket.emit("join_room", room);
        initNotifications()
    },[])

    const initNotifications = () =>{
        socket.emit("init_notifications", {room})

        socket.on("init_notifications", (result) => {
            setNotification(result.notifications)
            // Handle the result as needed
        });

    }

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Optional smooth scrolling animation
        });
        if(location.pathname === "/compose-article"){
            setIsInCompose(true)
        } else {
            setIsInCompose(false)
        }
        // Check if the first 8 characters of location.pathname are "/article"
        const isInArticlePath = location.pathname.slice(0, 8) === '/article' && location.pathname.slice(0, 13) !== '/article/edit';
       
        const isInEditArticlePath = location.pathname.slice(0, 13) === '/article/edit';

         // Set the state based on the condition
         setIsInArticleView(isInArticlePath);
         setIsInEditArticleView(isInEditArticlePath)    

    },[location])
    
    return (
        <nav className="navbarContainer" >
            <Container className='navbar-min-height'>
                <Row className='align-items-center navbar-min-height'>
                    {/* Column Below is for logo */}
                    <Col md='4' className='d-flex justify-content-start'> 
                        <Logo />
                    </Col>
                    {/* Column Below is for search area */}
                    <Col md='4'> 

                    </Col>
                    {/* Column Below is for profile/notifications */}
                    <Col md='4' className='d-flex justify-content-end align-items-center'> 
                        <Row className='align-items-center'>
                            <Col md={3}>
                            <NavNotificationIcon setIsOpen={setIsOpen} notification={notification} notifIsOpen={notifIsOpen} setNotifIsOpen={setNotifIsOpen}/>
                            </Col>
                            <Col md={3}>
                            <NavUserIcon setNotifIsOpen={setNotifIsOpen} setIsOpen={setIsOpen} isOpen={isOpen} user={user}/>
                            </Col>
                        </Row>

                        {notifIsOpen ? <NavNotificationPop notification={notification}/> : <></>}
                        {isOpen ? <UserIconPop setIsOpen={setIsOpen}/>:
                        <></>
                        }
                    </Col>
                </Row>
            </Container>
        </nav>
    );
};

export default AppNavbar;
