import {Box, BoxProps} from "@mui/material";

const ListItem = ({ children, ...other}:BoxProps) => {
    return(
        <Box sx={{ padding: '1.2rem 0.6rem', display: 'flex', alignItems: 'center', borderBottom: '1px solid #00000010' }} {...other}>
            {children}
        </Box>
    )
}

export default ListItem;