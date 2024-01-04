import { useState } from "react";
import { Form, Button} from "react-bootstrap"

export default function SearchArea({setForms,setLoading,refreshEffect,setHeader,setCurrentPage}){
    const [name, setName] = useState('');

    const submitSearchRequest = () =>{
        
        setLoading(true); 
        setCurrentPage(1)
        fetch(`${process.env.REACT_APP_API_URL}/api/forms/form`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name.replace(/\\/g, "\\\\")
            })
        })
        .then(res => res.json())
        .then(data => {
            
            setForms(data)
            setLoading(false);
            setHeader('Custom Search')
        })

    }
    const reset = () =>{
        setCurrentPage(1)
        setName(''); 
        refreshEffect();
        setHeader('All Forms & Docs')
    }
    return(
        <div className="d-flex">
            <Form.Control
                style={{borderRadius:'8px'}}
                type="text"
                placeholder="Search..."
                onChange={(e) => setName(e.target.value)}
                className='custom-search-input'
                value={name} 
                />
            <div className="d-flex align-items-center">
                <Button className="d-flex ml-1 button-bg" style={{boxShadow:'none', height:'30px'}} size='sm' onClick={submitSearchRequest}>Search</Button>
                <Button className="d-flex ml-1 button-cancel"  style={{boxShadow:'none', height:'30px'}} size='sm' onClick={reset}>Reset</Button>
            </div>
            
        </div>
    )
}