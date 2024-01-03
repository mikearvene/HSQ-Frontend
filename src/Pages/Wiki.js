import { useContext, useState, useEffect } from "react"
import UserContext from '../userContext';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import LoaderTwo from "../Components/Subcomponents/loader/LoaderTwo";
import WikiSearchArea from "../Components/WikiSearchArea";
import ArticleCard from "../Components/ArticleCard"
import NoArticlesFound from "../Components/NoArticlesFound";


export default function Wiki(){
    const {user} = useContext(UserContext);
    const [articles, setArticles]=useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [header, setHeader] = useState('All Forms & Docs')

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/api/articles/`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setArticles(data)
            setLoading(false);
        })
        
    },[])

    const refreshEffect = () =>{
        setLoading(true); 
        fetch(`${process.env.REACT_APP_API_URL}/api/articles/`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setArticles(data)
            console.log(data);
            setLoading(false);
        })
    }
    return( 
        <>
        <div className="row">

            <div className="mb-0 col-3">
                <h4 className="text-muted">Wiki</h4>
            </div>

            <div className="col-9 ml-auto">
                <WikiSearchArea setArticles={setArticles} setLoading={setLoading} refreshEffect={refreshEffect} setHeader={setHeader}/>
            </div>
        </div>
        <hr />
        <div>
        {user.isManager ?
            <>
            <div className="d-flex justify-content-end mb-4">
            <Link to="/compose-article"><span className="anchor-underline">Create New Article</span></Link>
            </div>
            </>
            :
            <>
            </>
        }
        {loading ? (
                // Render loader if data is still being fetched
                <LoaderTwo />
        ) : (
                // Render forms if data has been fetched
                articles !== null && articles.length > 0 ? (
                    articles.map(article => (
                        <ArticleCard
                            article={article}
                            key={article._id}
                            refreshEffect={refreshEffect}
                            user={user}
                        />
                    ))
                ) : (
                        <NoArticlesFound />
                    )
            )}
        </div>
        </>
        
    )
}