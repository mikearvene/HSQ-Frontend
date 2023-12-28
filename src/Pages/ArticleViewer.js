import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ArticleViewer() {
  const [article, setArticle] = useState(null);
  const { articleId } = useParams();

  useEffect(() => {
    console.log(articleId);
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

  return (
    <>
      <div
        className="mt-4 container-fluid"
        style={{ border: '1px solid #ccc', margin: '2rem', width: '800px' }}
      >
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
    </>
  );
}
