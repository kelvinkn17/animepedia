import SvgIconStyle from "./SvgIconStyle";

const RedirectButton = ({ link } : { link: string }) => {
    return(
        <button onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}
                className="shrink-click" style={{marginLeft: "0.4rem", opacity: "0.6"}}
        >
            <SvgIconStyle src="/assets/icons/icon_redirect.svg" sx={{width: "1.2rem", height: "1.2rem"}}/>
        </button>
    )
}

export default RedirectButton;