import { useTheme, BoxProps, Box } from "@mui/material"
import React from "react"

const BoxItem = ({ children, sx, ...others }:BoxProps) => {
    const theme = useTheme();
    
    return(
        <Box sx={{ backgroundColor: theme.palette.background.paper, padding: '1rem', borderRadius: '1rem', display: 'flex', flexDirection: 'column', ...sx }} {...others} >
            {children}
        </Box>
    )
}

export default BoxItem;