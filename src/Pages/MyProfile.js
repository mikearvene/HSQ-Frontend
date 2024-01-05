import { Container, Row, Col } from "react-bootstrap"
import {BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import Profile from "../Components/Profile"
import UpdatePassword from "../Components/UpdatePassword"

export default function  MyProfile (){
    const linkStyle = {
        fontSize: "12.8px",
        color: "#016B83",
        textDecoration:'underline'
    }
    return(
        <>
            <div className="row">
                <div className="mb-0 col-5">
                    <h4 className="text-muted">My Profile</h4>
                </div>
            </div>
            <hr />
            
            <Container>
            <Link to={'/my-profile/detail'} style={linkStyle} className="mr-3"> My Profile </Link>
            <Link to={'/my-profile/update-password'} style={linkStyle}>Update Password</Link>
                <Row className="mt-5">
                    <Col className="d-flex flex-column justify-content-center">
                    <Routes>
                        <Route path="/detail" element={<Profile/>} />
                        <Route path='/update-password' element={<UpdatePassword/>} />

                    </Routes> 
                    </Col> 
                </Row>
            </Container>

        </>
    )
}