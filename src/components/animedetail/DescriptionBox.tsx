import { Markup } from "interweave"
import { Typography, useTheme } from "@mui/material"
import Box from "../elements/Box";
import { useState } from "react";

interface DescriptionBoxProps{
    description: string
}

const DescriptionBox = ({ description }:DescriptionBoxProps) => {
    const theme = useTheme();

    console.log(description.length);

    let expandFlag;
    if(description.length > 300){
        expandFlag = true;
    }else{
        expandFlag = false;
    }

    const [isExpanded, setIsExpanded] = useState(false);
    const [needExpand, setNeedExpand] = useState(expandFlag);

    const onClickExpand = () => {
        setIsExpanded(!isExpanded);
    }

    return(
        <Box>
            <Typography variant="h6" component="h2">
                Description
            </Typography>
            
            <div style={{ lineHeight: '1.5', fontSize: '1rem'}}>
                {needExpand ?
                    isExpanded ?
                        <>
                            <Markup content={description} />
                        </>
                        :
                        <>
                            <Markup content={description.slice(0, 300)} />...
                        </>
                    :
                    <>
                        <Markup content={description.slice(0, 300)} />
                    </>
                }
            </div>

            {needExpand &&
                <>
                    <button onClick={onClickExpand} style={{ fontSize: '1rem', color: theme.palette.primary.main, marginInline: 'auto', marginTop: '1rem' }}>
                        {isExpanded ? "Show less" : "Show all"}
                    </button>
                </>
            }
        </Box>
    )
}

export default DescriptionBox