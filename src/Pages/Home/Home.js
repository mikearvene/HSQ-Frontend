import { Container, Row, Col } from "react-bootstrap"
import MakeAPost from "./components/MakeAPost"
import { useState, useContext } from "react"
import UserContext from '../../userContext';
export default function Home(){

    const { user } = useContext(UserContext);

    return(
        <>
        <div className="pt-3">
            <div className="row">
                <div className="mb-0 col-5">
                    <h4 className="text-muted">Home</h4>
                </div>
            </div>
            <hr />
            <Container>
                <Row>
                    <Col md={12} className="mr-5 mb-3">
                        <MakeAPost user={user}/>
                    </Col>
                    <Col className="mr-5">
                        <h5 className="muted">Nothing to display...</h5>
                        <h5 className="muted mt-5">(Company-wide announcements will be soon posted here.)</h5>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    )
}