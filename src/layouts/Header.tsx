const Header = () => {
    return(
        <div style={{ display: 'flex', justifyContent: 'center', position: 'fixed', top: 0, zIndex: '5', backgroundColor: 'white', width: '100%', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
            <img src="/assets/logo/full_logo.svg" alt="" style={{ width: '100%', maxWidth: '12rem'}}/>
        </div>
    )
}

export default Header;