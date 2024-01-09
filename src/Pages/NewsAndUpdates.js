import { Container, Row, Col } from "react-bootstrap"
import {useState, useEffect} from "react";
import NewsCard from "../Components/NewsCard"
import PostNewsAndUpdateModal from "../Components/Subcomponents/PostNewsAndUpdateModal";
export default function NewsAndUpdates(){
    const [loading, setLoading] = useState(true);
    const [mainData, setMainData] = useState(null)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/api/newsAndUpdates`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setMainData(data);
            setLoading(false);
        });
    };

    console.log(mainData)
    return(
        <>
            <div className="row">
                <div className="mb-0 col-7">
                    <h4 className="text-muted">News & Updates</h4>
                </div>
                <div className="mb-0 col-3 d-flex justify-content-end align-items-center ml-auto mr-3">
                    <PostNewsAndUpdateModal />
                </div>
            </div>
            <hr />
            <Container >
                <Row >
                {mainData !== null ? 
                    mainData.length > 0 ? 
                    <>
                        {
                            mainData.map(data =>(
                                <NewsCard 
                                key={data._id}
                                data={data}                                
                                />
                            ))
                        }
                    </>
                    :
                    <h3 className="muted">0 Users found</h3>
                
                :
                <><h2 className="muted">fetching data...</h2></>}
                </Row>
            </Container>
        </>
    )
}