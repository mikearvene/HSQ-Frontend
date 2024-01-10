import { useEffect, useState } from "react"

export default function ThreeImageNewsCard({data, imageCount}){
    const [remainder, setRemainder] = useState(imageCount-3)
    useEffect(()=>{
        setRemainder(imageCount -3)
    },[imageCount])

    return(
        <>
        <img
            key={data.imageUrl[0]}
            src={data.imageUrl[0]}
            alt={`Preview-${data.imageUrl[0]}`}
            className="img-thumbnail"
            style={{ width: '50%', height: '100%', objectFit: 'cover', borderRadius:'8px' }}
        />
        <div className="d-flex flex-column" style={{ width: '50%', height: '100%'}}>
        <img
            key={data.imageUrl[1]}
            src={data.imageUrl[1]}
            alt={`Preview-${data.imageUrl[1]}`}
            className="img-thumbnail"
            style={{ width: '100%', height: '50%', objectFit: 'cover', borderRadius:'8px' }}
        />
        <img
            key={data.imageUrl[2]}
            src={data.imageUrl[2]}
            alt={`Preview-${data.imageUrl[2]}`}
            className="img-thumbnail"
            style={{ width: '100%', height: '50%', objectFit: 'cover', borderRadius:'8px' }}
        />
        {remainder >= 1 ? <span className="white" style={{position:'absolute', right:'28%', bottom:'17%'}}><h3>+{remainder}</h3></span> : null}
        </div>
        
        </>
        

    )
}