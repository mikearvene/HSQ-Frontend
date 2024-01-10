
export default function TwoImageNewsCard({data}){

    return(
        <>
        <img
            key={data.imageUrl[0]}
            src={data.imageUrl[0]}
            alt={`Preview-${data.imageUrl[0]}`}
            className="img-thumbnail"
            style={{ width: '50%', height: '100%', objectFit: 'cover', borderRadius:'8px' }}
        />
        <img
            key={data.imageUrl[1]}
            src={data.imageUrl[1]}
            alt={`Preview-${data.imageUrl[1]}`}
            className="img-thumbnail"
            style={{ width: '50%', height: '100%', objectFit: 'cover', borderRadius:'8px' }}
        />
        </>
        

    )
}