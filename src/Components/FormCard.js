import EditForm from "./EditForm";

export default function FormCard({ name, description, link, formId, refreshEffect, user}){
    return(
        <div className="mb-3 mt-3 pr-5 pl-5 pt-2 pb-2">
            <div className="d-flex align-items-center">
                <div>
                    <p className="mb-0" style={{fontWeight:'bold', color:'#383C3F'}}>{name}</p>
                    <p className="mb-0 text-muted">{description}</p>
                </div>
                
                <div className="ml-auto">
                    <div className="mr-1">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="anchor-underline">Download Form</a>
                    </div>
                    {user.isManager? 
                    <div>
                        <EditForm props={ {name, description, link, formId, refreshEffect}}/>
                    </div>
                    : 
                    <></>}
                </div>
            </div>
        </div>
 
    )
}