import {Grid, Typography} from "@mui/material";
import BoxItem from "../elements/BoxItem";

interface CharactersListProps{
    characters: any[]
}

const CharactersList = ({ characters }:CharactersListProps) => {
    return(
        <BoxItem className="pop-in" sx={{ marginTop: '1rem' }}>
            <Typography variant="h6" component="h2" style={{ fontSize: '1rem', marginRight: '1rem'}}>
                Characters
            </Typography>

            <Grid container>
                {characters.map((item:any, index:number) => {
                    return(
                        <Grid key={index} item xxs={6} xs={4} sm={3} md={2} lg={1.2}>
                            <div style={{ margin: '1rem'}}>
                                <img src={item.image.medium} alt="" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '1rem' }} />
                                <div style={{ opacity: '0.6', marginTop: '0.4rem' }}>
                                    {item.name.full}
                                </div>
                            </div>
                        </Grid>
                    )
                })}
            </Grid>
        </BoxItem>
    )
}

export default  CharactersList;