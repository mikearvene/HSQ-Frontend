import { useEffect, useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavUserIcon from './Subcomponents/NavUserIcon';
import Logo from './Subcomponents/Logo';
import UserIconPop from './UserIconPop';
import { useLocation } from 'react-router-dom';
import UserContext from '../userContext';

const AppNavbar = ({setIsInCompose,setIsInArticleView, setIsInEditArticleView}) => {
    const { user } = useContext(UserContext);
    let location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        console.log(location.pathname)
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
        
        console.log(`isInArticlePath: ${isInArticlePath}`)
        console.log(`isInEditArticlePath: ${isInEditArticlePath}`)
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
                        <NavUserIcon setIsOpen={setIsOpen} isOpen={isOpen} user={user}/>
                        {isOpen ? <UserIconPop />:
                        <></>
                        }
                    </Col>
                </Row>
            </Container>
        </nav>
    );
};

export default AppNavbar;
