import { useState, useEffect } from "react";
import { Container } from "react-bootstrap"
import EmployeeCard from "../Components/EmployeeCard"
import TeamDirectorySearchArea from "../Components/TeamDirectorySearchArea"

export default function TeamDirectory (){
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);

    const refreshEffect = () => {
        fetch(`${process.env.REACT_APP_API_URL}/api/users/search`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                firstName: '',
                lastName: '',
                department: ''
            })
        })
        .then(res => res.json())
        .then(data => {
            const sortedData = data.sort((a, b) => (a.department > b.department) ? 1 : -1);
            setResult(sortedData);
            setLoading(false);
        })
    }

    useEffect(()=>{
        refreshEffect();
    },[])

    return(
        <>
            <div className="row">
                <div className="mb-0 col-3">
                    <h4 className="text-muted">Team Directory</h4>
                </div>
                <div className="col-9 ml-auto d-flex align-items-center">
                    <TeamDirectorySearchArea setLoading={setLoading} refreshEffect={refreshEffect} setResult={setResult}/>
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-start flex-wrap p-3">
                {result !== null ? 
                    result.length > 0 ? 
                    <>
                        {
                            result.map(user =>(
                                <EmployeeCard 
                                key={user._id}
                                user={user}
                                refreshEffect={refreshEffect}
                                
                                />
                            ))
                        }
                    </>
                    :
                    <h3 className="muted">0 Users found</h3>
                
                :
                <><h2 className="muted">fetching data...</h2></>}
            </div>
        </>
    )
}