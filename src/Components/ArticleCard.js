import EditForm from "./EditForm";

export default function ArticleCard({article, user}){
    console.log(article)
    return(
        <div className="mb-3 mt-3 pr-5 pl-5 pt-2 pb-2">
            <div className="d-flex align-items-center">
                <div>
                    <p className="mb-0" style={{fontWeight:'bold', color:'#383C3F'}}>{article.title}</p>
                </div>
                
                <div className="ml-auto">
                    <div className="mr-1">
                        <a href={`/article/${article._id}`} target="_blank" rel="noopener noreferrer" className="anchor-underline">Open Article</a>
                    </div>
                    {user.isManager? 
                    <div>
                        {/* <EditArticle props={ {name, description, link, formId, refreshEffect}}/> */}
                    </div>
                    : 
                    <></>}
                </div>
            </div>
        </div>
 
    )
}