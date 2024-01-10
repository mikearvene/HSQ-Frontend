

export default function OneImageNewsCard({data}){

    return(
        <>
        <img
            key={data.imageUrl[0]}
            src={data.imageUrl[0]}
            alt={`Preview-${data.imageUrl[0]}`}
            className="img-thumbnail"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius:'8px' }}
          />
        </>
    )
}