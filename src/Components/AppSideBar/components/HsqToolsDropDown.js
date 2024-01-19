
export default function HsqToolsDropDown({ComingSoonBadge, isHsqToolsDropped}){
    return(
        <>
            <div className={`ml-4 mt-2 ${isHsqToolsDropped ? 'd-none' : null}`}>
                <span className="user-select-none text-muted">Form Builder<ComingSoonBadge/> </span>
            </div>
        </>
    )
}