import { useState } from "react";
import { Form, Button} from "react-bootstrap"

export default function WikiSearchArea({setArticles,setLoading,refreshEffect,setHeader}){
    const [title, setTitle] = useState('');

    const submitSearchRequest = () =>{
        setLoading(true); 
        fetch(`${process.env.REACT_APP_API_URL}/api/articles/article`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                title: title.replace(/\\/g, "\\\\")
            })
        })
        .then(res => res.json())
        .then(data => {
            setArticles(data);
            setLoading(false);
            setHeader('Custom Search')
        })

    }
    const reset = () =>{
        setTitle(''); 
        refreshEffect();
        setHeader('All Articles')
    }
    return(
        <div className="d-flex">
            <Form.Control
            style={{borderRadius:'8px'}}
            type="text"
            placeholder="Search..."
            onChange={(e) => setTitle(e.target.value)}
            className='custom-search-input'
            value={title} 
            />
            <div className="d-flex align-items-center">
                <Button className="d-flex ml-1 button-bg" style={{boxShadow:'none', height:'30px'}} size='sm' onClick={submitSearchRequest}>Search</Button>
                <Button className="d-flex ml-1 button-cancel"  style={{boxShadow:'none', height:'30px'}} size='sm' onClick={reset}>Reset</Button>
            </div>
            
        </div>
    )
}