import { useLocation, useNavigate, matchPath } from "react-router-dom";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material";
// components
import SvgIconStyle from "../components/elements/SvgIconStyle";

type NavbarItemProps = {
    active: boolean
}

const getActive = (path:string, pathname:string) => {
    return path ? !!matchPath({ path, end: false }, pathname) : false;
}

const Navbar = () => {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    // styling
    const MENU_LIST = [
        {
            id: 'animelist',
            path: '/anime/trending/1',
            basePath: '/anime',
            label: 'Anime List', 
            icons: '/assets/icons/icon_animelist.svg'
        },{
            id: 'mycollections',
            path: '/mycollections',
            basePath: '/mycollections',
            label: 'My Collections',
            icons: '/assets/icons/icon_mycollections.svg'
        },
    ]

    const NavbarContainer = styled.div(
        {
            width: '100%',
            maxWidth: '16rem',
            bottom: '1rem',
            left: '50%',
            position: 'fixed',
            zIndex: '5',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            borderRadius: '100px',
            padding: '0.4rem',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            boxShadow: 'rgba(149, 157, 165, 0.3) 0px 8px 16px'
        }
    )

    const NavbarItem = styled.button<NavbarItemProps>(
        {
            width: '50%',
            padding: '0.2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            height: '100%',
        },
        props => ({
            color: props.active ? theme.palette.text.primary : theme.palette.text.secondary,
            ".navbar-item-label": {
                fontWeight: props.active ? '500' : '400',
            },
            "span" : {
                color: props.active ? theme.palette.primary.main : theme.palette.text.secondary,
            },
        })
    )

    // navigating
    const handleNavigate = (path: string) => {
        console.log('navigate to: ', path);
        navigate(path);
    }

    return(
        <NavbarContainer>
            {MENU_LIST.map((item, index) => {
                return(
                    <NavbarItem onClick={() => handleNavigate(item.path)} className="shrink-click" active={getActive(item.basePath, location.pathname)} key={index}>
                        <SvgIconStyle src={item.icons} sx={{ width: '1.4rem', marginBottom: '0.2rem' }} />

                        <div className="navbar-item-label">
                            {item.label}
                        </div>
                    </NavbarItem>
                )
            })}
        </NavbarContainer>
    )
}

export default Navbar;