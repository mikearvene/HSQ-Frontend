

export default function NavUserIcon({setIsOpen, isOpen, user}){
    
    console.log(user)

    const handleClick = () => {
        if(!isOpen){
            setIsOpen(true)
        } else if(isOpen){
            setIsOpen(false)
        }
    }

    return(
        <a style={{cursor:'pointer'}} onClick={handleClick}>
            {user.profilePicture !== "false" ? 
            <>
            <img 
            src={user.profilePicture} 
            alt="profile-picture" 
            style={{ borderRadius: '50%', width: '25px', height: '25px', border: '1px solid #F3F3F3', objectFit: "contain" }}
            />
            <img 
            className="mt-1 ml-1"
            src='/icons/dropdown-icon.svg' 
            alt="drop-down" 
            style={{ width: '13px', height: '13px'}}
            />
            </>
            :
            <img src="/icons/user-icon.svg" alt="" />
            }
        </a>
    )
}