import BoxItem from "../elements/BoxItem";
import {Typography, useTheme} from "@mui/material";

interface TagBoxProps{
    tags: any[]
}

const TagBox = ({ tags }:TagBoxProps) => {
    const theme = useTheme();

    return(
        <BoxItem className="pop-in" sx={{ marginTop: '1rem' }}>
            <div>
                <Typography variant="h6" component="h2" style={{ fontSize: '1rem', marginRight: '1rem'}}>
                    Tags
                </Typography>

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {tags.slice(0, 5).map((item: any, index: number) => {
                        return (
                            <div key={index} style={{
                                padding: '0.6rem',
                                backgroundColor: theme.palette.grey["100"],
                                borderRadius: '0.4rem',
                                margin: '0.4rem 0.4rem',
                                marginLeft: '0rem'
                            }}>
                                {item.name}
                            </div>
                        )
                    })}
                </div>
            </div>
        </BoxItem>
    )
}

export default TagBox;