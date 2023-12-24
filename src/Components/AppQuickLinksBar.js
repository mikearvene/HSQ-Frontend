import { Container, Row } from "react-bootstrap";
import LinkCard from "./LinkCard";
import {links} from "../Util/externalLinks"

export default function AppQuickLinksBar () {

    return(
        <>
        <div className="quick-link-bar" >
            {/* Below serves as a header */}
            <div className="p-2">
                <p className="text-muted text-center smallest">Company Tools</p>
                <hr />
            </div>
            <Container>
                <Row className="mb-4">
                    {/* Render LinkCard's Here */}
                    {/* Map each link to a LinkCard */}
                    {links.map((link, index) => (
                      <LinkCard key={index} siteName={link.siteName} link={link.link} icon={link.icon}/>
                    ))}
                </Row>
            </Container>
            

        </div>
        </>
    )
}