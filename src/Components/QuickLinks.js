
export default function QuickLinks () {
    const containerStyling ={
        border:'solid',
        borderWidth:'1px',
        borderRadius:'3px'
    }

    return(
        <div className="container-fluid p-0" style={containerStyling}>

            <div style={{backgroundColor:'#016B83', width:'100px', borderRadius:'3px 0px'}} className="p-0 text-center">
                <span className="brand-text-white">Quick links</span>
            </div>

            <div className="d-flex flex-wrap my-3 pr-5 pl-5">

                <div className="mr-3">
                    <a className="anchor-underline" href="https://teams.microsoft.com/v2/" target="_blank"  rel="noopener noreferrer">Microsoft Teams</a>
                </div>
                <div className="mr-3">
                    <a className="anchor-underline" href="https://www.onlinejobs.ph/" target="_blank"  rel="noopener noreferrer">OnlineJobsPH</a>
                </div>
                <div className="mr-3">
                    <a className="anchor-underline" href="https://www.canva.com/" target="_blank"  rel="noopener noreferrer">Canva</a>
                </div>
                <div className="mr-3">
                    <a className="anchor-underline" href="https://www.fiverr.com/" target="_blank"  rel="noopener noreferrer">Fiverr</a>
                </div>
                <div className="mr-3">
                    <a className="anchor-underline" href="https://outlook.office.com/mail/" target="_blank"  rel="noopener noreferrer">Outlook</a>
                </div>
                <div className="mr-3">
                    <a className="anchor-underline" href="https://www.testgorilla.com/" target="_blank"  rel="noopener noreferrer">TestGorilla</a>
                </div>
                <div className="mr-3">
                    <a className="anchor-underline" href="https://www.deel.com/" target="_blank"  rel="noopener noreferrer">Deel</a>
                </div>
                <div className="mr-3">
                    <a className="anchor-underline" href="https://www.xero.com/ph/" target="_blank"  rel="noopener noreferrer">Xero</a>
                </div>
                <div className="mr-3">
                    <a className="anchor-underline" href="https://trello.com/" target="_blank" rel="noopener noreferrer">Trello</a>
                </div>

            </div>
            <div className="d-flex flex-wrap my-3 pr-5 pl-5">

                <div className="mr-3">
                    <a className="anchor-underline" href="https://music.youtube.com/" target="_blank" rel="noopener noreferrer">Youtube Music</a>
                </div>
                <div className="mr-3">
                    <a className="anchor-underline" href="https://artists.spotify.com/home" target="_blank" rel="noopener noreferrer">Spotify</a>
                </div>
                <div className="mr-3">
                    <a className="anchor-underline" href="https://artists.apple.com/" target="_blank" rel="noopener noreferrer">Apple Music</a>
                </div>
                <div className="mr-3">
                    <a className="anchor-underline" href="https://dittomusic.com/en" target="_blank" rel="noopener noreferrer">Ditto Music</a>
                </div>

                <div className="mr-3">
                    <a className="anchor-underline" href="https://www.airgigs.com/" target="_blank" rel="noopener noreferrer">AirGigs</a>
                </div>
                <div className="mr-3">
                    <a className="anchor-underline" href="https://www.apple.com/logic-pro/" target="_blank" rel="noopener noreferrer">Logic Pro X</a>
                </div>
                
            </div>
        </div>
    )

}