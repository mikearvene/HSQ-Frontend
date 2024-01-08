import { Container, Row, Col } from "react-bootstrap"


export default function Home(){
    
    return(
        <>
        <div className="row">
            <div className="mb-0 col-5">
                <h4 className="text-muted">Home</h4>
            </div>
        </div>
        <hr />
        <Container>
            <Row>
                <Col className="mr-5">
                    <h5 className="muted">Nothing to display...</h5>
                    <h5 className="muted mt-5">(Company-wide announcements will be soon posted here.)</h5>
                </Col>
            </Row>
        </Container>
        </>
    )
}