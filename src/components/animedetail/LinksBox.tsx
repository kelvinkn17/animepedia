import {Typography, useTheme} from "@mui/material"
import {useState} from "react";

import CustomDialog from "../elements/CustomDialog";
import ListItem from "../elements/ListItem";
import RedirectButton from "../elements/RedirectButton";
import BoxItem from "../elements/BoxItem";

import {groupBySingleField} from "../../utils/groupData";

interface LinksBoxProps{
    links: [{
        site: string,
        icon: string,
        url: string,
        type: string
    }]
}

const MAX_LINK_ICONS = 3;

const LinksBox = ({ links }:LinksBoxProps) => {
    const theme = useTheme();

    const handleClick = () => {
        handleOpenDialog();
    }

    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const handleOpenDialog = () => {
        setIsOpenDialog(true);
    }
    const handleCloseDialog = () => {
        setIsOpenDialog(false);
    }

    const groupedLinks = groupBySingleField(links, "type");

    return(
        <>
            <BoxItem className="shrink-click pop-in" onClick={handleClick} sx={{ marginTop: '1rem', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer'}} >
                <Typography variant="h6" component="h2" style={{ fontSize: '1rem', marginRight: '1rem'}}>
                    Links
                </Typography>

                <div style={{ flexGrow: '1', marginRight: '1rem', textAlign: 'right', opacity: '0.4', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {links.slice(0,MAX_LINK_ICONS).map((item:any, index:number) => {
                        return(
                            // <img key={index} src={item.icon} alt="" style={{ filter: 'brightness(0.4) invert()', width: '1.4rem', height: '1.4rem', marginRight: '0.4rem' }} />
                            <span key={index}>
                                {item.site}
                                {index !== MAX_LINK_ICONS &&
                                    ", "
                                }
                            </span>
                        )
                    })}

                    {links.length > MAX_LINK_ICONS &&
                        <span style={{ opacity: '0.6' }}>
                            ...
                        </span>
                    }
                </div>

                <div>
                    {'>'}
                </div>
            </BoxItem>

            <CustomDialog open={isOpenDialog} onClose={handleCloseDialog} fullWidth maxWidth="xs" title="Links">
                <div>
                    {Object.keys((groupedLinks)).map((category) => {
                        return(
                            <div key={category} style={{ marginBottom: '2rem' }}>
                                <div style={{ fontWeight: '600' }}>
                                    {category}
                                </div>

                                {links.map((item:any, index:number) => {
                                    if(item.type === category){
                                        return(
                                            <ListItem key={index}>
                                                <img src={item.icon} alt="" style={{ filter: 'brightness(0.4) invert()', width: '1.4rem', height: '1.4rem', marginRight: '1rem', aspectRatio: '1' }} />

                                                <div style={{ color: theme.palette.text.secondary, paddingRight: '1rem', lineBreak: 'anywhere', flexGrow: '1' }}>
                                                    {item.url}
                                                </div>

                                                <RedirectButton link={item.url} />
                                            </ListItem>
                                        )
                                    }
                                    return '';
                                })}
                            </div>
                        )
                    })}
                </div>
            </CustomDialog>
        </>
    )
}

export default LinksBox