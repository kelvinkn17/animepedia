import {Markup} from "interweave"
import {Typography, useTheme} from "@mui/material"
import Box from "../elements/BoxItem";
import {useState} from "react";

interface DescriptionBoxProps{
    description: string,
    tags: any[]
}

const DescriptionBox = ({ description }:DescriptionBoxProps) => {
    const theme = useTheme();

    let expandFlag;
    expandFlag = description.length > 300;

    const [isExpanded, setIsExpanded] = useState(false);
    const [needExpand] = useState(expandFlag);

    const onClickExpand = () => {
        setIsExpanded(!isExpanded);
    }

    return(
        <Box className="pop-in">
            <Typography variant="h6" component="h2">
                Description
            </Typography>

            <div style={{ lineHeight: '1.5', fontSize: '1rem'}}>
                {needExpand ?
                    isExpanded ?
                        <div>
                            <Markup content={description}/>
                        </div>
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