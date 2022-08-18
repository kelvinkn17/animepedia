import { useTheme } from "@mui/material"
import React from "react"

interface BoxProps{
    children: React.ReactNode,
    style?: React.CSSProperties
}

const Box = ({ children, style }:BoxProps) => {
    const theme = useTheme();
    
    return(
        <div style={{ backgroundColor: theme.palette.background.paper, padding: '1rem', borderRadius: '1rem', display: 'flex', flexDirection: 'column', ...style }}>
            {children}
        </div>
    )
}

export default Box;