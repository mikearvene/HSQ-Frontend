import NewsCardImageView from "./NewsCardImageView";
import { useState } from "react";

export default function TwoImageNewsCard({data}){
    const [fullscreenIndex, setFullscreenIndex] = useState(null);

    const handleImageClick = (index) => {
        setFullscreenIndex(index === fullscreenIndex ? null : index);
    };

    return(
        <>
        <NewsCardImageView images={data.imageUrl} fullscreenIndex={fullscreenIndex} setFullscreenIndex={setFullscreenIndex}/>

        {data.imageUrl.map((image, index) => (
            <img
                onClick={() => handleImageClick(index)}
                src={image}
                alt={`Image ${index + 1}`}
                style={{ width: '50%', height: '100%', objectFit: 'cover', borderRadius:'8px', cursor:'pointer' }}
                className="img-thumbnail"
            />
        ))}
        {/* <img
            onClick={setFullscreenIndex}
            key={data.imageUrl[0]}
            src={data.imageUrl[0]}
            alt={`Preview-${data.imageUrl[0]}`}
            className="img-thumbnail"
            style={{ width: '50%', height: '100%', objectFit: 'cover', borderRadius:'8px' }}
        />
        <img
            onClick={setFullscreenIndex}
            key={data.imageUrl[1]}
            src={data.imageUrl[1]}
            alt={`Preview-${data.imageUrl[1]}`}
            className="img-thumbnail"
            style={{ width: '50%', height: '100%', objectFit: 'cover', borderRadius:'8px' }}
        /> */}
        </>
        

    )
}