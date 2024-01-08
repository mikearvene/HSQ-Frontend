import './CSS/ProfileSkeleton.css'

export default function ProfileSkeleton(){
    return(
        <>
            <div className="profile-skeleton-background" style={{position:'absolute', borderRadius: '50%', width: '125px', height: '125px', border: '2px solid #516473'}}></div>
            <div className="profile-skeleton" style={{position:'absolute', borderRadius: '50%', width: '125px', height: '125px', border: '2px solid #516473'}}></div>
        </>
    )
}