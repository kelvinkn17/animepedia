const Footer = () => {
    return(
        <div style={{ display: 'flex', zIndex: '3', backgroundColor: 'white', width: '100', fontSize: '0.8rem', padding: '0.8rem', justifyContent: 'space-between' }}>
            <div style={{ opacity: '0.6' }}>
                @Kelvin Adithya
            </div>

            <div>
                Powered by&nbsp;
                <a href="https://anilist.gitbook.io/anilist-apiv2-docs/" target="_blank" rel="noreferrer">Anilist</a>
            </div>
        </div>
    )
}

export default Footer;