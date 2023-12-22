import { useContext, useState, useEffect } from "react"
import UserContext from '../userContext';
import FormCard from "../Components/FormCard";
import AddNewForm from "../Components/AddNewForm";
import LoaderTwo from "../Components/Subcomponents/loader/LoaderTwo";
import SearchArea from "../Components/SearchArea";
import NoFormsFound from "../Components/NoFormsFound";

export default function FormsRepository (){
    const {user} = useContext(UserContext);
    const [forms, setForms]=useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [header, setHeader] = useState('All Forms & Docs')

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/api/forms/`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setForms(data)
            setLoading(false);
        })
        
    },[])
    const refreshEffect = () =>{
        setLoading(true); 
        fetch(`${process.env.REACT_APP_API_URL}/api/forms/`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setForms(data)
            setLoading(false);
        })
    }
    return (
        <>
        <div className="row">
            <div className="mb-0 col-5">
                <h4 style={{color:'#383C3F'}}>Forms Repository</h4>
            </div>
            <div className="col-6 ml-auto">
                <SearchArea setForms={setForms} setLoading={setLoading} refreshEffect={refreshEffect} setHeader={setHeader}/>
            </div>

            
        </div>
        <hr />
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-4">

                </div>
                <div className="col-4 text-center d-flex align-items-center justify-content-center">
                    <h6 className="m-0" style={{textDecoration:'underline'}}>{header}</h6>
                </div>
                
                <div className="col-4 d-flex justify-content-end align-items-center">
                    {/* render condition for add new form button */}
                    {user.isManager? 
                    <AddNewForm setForms={setForms} refreshEffect={refreshEffect}/>
                    :
                    <>
                    </>
                    }
                </div>
                
            </div>
        </div>
        
        <div>
        {loading ? (
                // Render loader if data is still being fetched
                <LoaderTwo />
        ) : (
                // Render forms if data has been fetched
                forms !== null && forms.length > 0 ? (
                    forms.map(form => (
                        <FormCard
                            formId={form._id}
                            key={form._id}
                            name={form.name}
                            description={form.description}
                            link={form.link}
                            refreshEffect={refreshEffect}
                            user={user}
                        />
                    ))
                ) : (
                        <NoFormsFound />
                    )
            )}
        </div>
        </>
    )
}