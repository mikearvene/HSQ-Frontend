import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import LoaderOne from "../Components/Subcomponents/loader/LoaderOne";

export default function ArticleViewer() {

  const [article, setArticle] = useState(null);
  const { articleId } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/articles/article/${articleId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        
      });
  }, [articleId]);
  console.log(article)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    
    <>
    { article === null?  <div style={{backgroundColor:'#F3F3F3', minHeight:'80vh'}}></div>:
      <div
        className="mt-4 container-fluid ml-auto mr-auto"
        style={{ border: '1px solid #ccc', margin: '2rem', width: '800px' }}
      >
        
        <Row className="p-4" style={{backgroundColor:'#F3F3F3', minHeight:'90px'}}>
          {/* this is for the title */}
          <Col md='6' className="d-flex align-items-center" >
            <span style={{color:'#516473'}}><b><i>{article.title}</i></b></span>
          </Col>
          <Col md='6' className="d-flex flex-column align-items-end mt-auto mb-auto">
            <span style={{color:'#516473'}} className="smallest"><i>Date posted: {formatDate(article?.originalPostDate)}</i></span>
            <span style={{color:'#516473'}} className="smallest"><i>Last update: {formatDate(article?.latestUpdate)}</i></span>
            <span style={{color:'#516473'}} className="smallest"><i>Author: {article.author[0].firstName} {article.author[0].lastName}</i></span>
            <span style={{color:'#516473'}} className="smallest"><i>Article Intended for: {article.department}</i></span>
          </Col>
        </Row>

        <div
          style={{
            minHeight: '800px',
            padding: '2rem',
            margin: '2rem',
            outline: 'none'
          }}
          dangerouslySetInnerHTML={{ __html: article ? article.content : '' }}
        />
      </div>
      }
    </>
  );
}
