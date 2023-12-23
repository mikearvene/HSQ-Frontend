import { useContext, useState, useEffect } from "react"
import UserContext from '../userContext';
import FormCard from "../Components/FormCard";
import AddNewForm from "../Components/AddNewForm";
import LoaderTwo from "../Components/Subcomponents/loader/LoaderTwo";
import WikiSearchArea from "../Components/WikiSearchArea";
import NoFormsFound from "../Components/NoFormsFound";

export default function Wiki(){
    const {user} = useContext(UserContext);
    const [forms, setForms]=useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [header, setHeader] = useState('All Forms & Docs')

    const refreshEffect = () =>{
        setLoading(true); 
        fetch(`${process.env.REACT_APP_API_URL}/api/articles/`,{
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
    return( 
        <>
        <div className="row">
            <div className="mb-0 col-5">
                <h4 className="text-muted">Wiki</h4>
            </div>
            <div className="col-6 ml-auto">
                <WikiSearchArea setForms={setForms} setLoading={setLoading} refreshEffect={refreshEffect} setHeader={setHeader}/>
            </div>
        </div>
        <hr />
        </>
    )
}