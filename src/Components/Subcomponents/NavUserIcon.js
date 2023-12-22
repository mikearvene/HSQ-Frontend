export default function NavUserIcon({setIsOpen, isOpen}){
    
    const handleClick = () => {
        if(!isOpen){
            setIsOpen(true)
        } else if(isOpen){
            setIsOpen(false)
        }
    }
    return(
        <a style={{cursor:'pointer'}} onClick={handleClick}>
            <img src="/icons/user-icon.svg" alt="" />
        </a>
    )
}