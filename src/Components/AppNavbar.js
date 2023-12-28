import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavUserIcon from './Subcomponents/NavUserIcon';
import Logo from './Subcomponents/Logo';
import UserIconPop from './UserIconPop';
import { useLocation } from 'react-router-dom';


const AppNavbar = ({setIsInCompose}) => {
    let location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        console.log(location.pathname)
        if(location.pathname === "/compose-article"){
            setIsInCompose(true)
        } else {
            setIsInCompose(false)
        }
        
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
                        <NavUserIcon setIsOpen={setIsOpen} isOpen={isOpen}/>
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
