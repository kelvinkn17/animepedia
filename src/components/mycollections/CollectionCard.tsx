import styled from "@emotion/styled";
import {Button, Grid, useTheme, Zoom} from "@mui/material";
import {useNavigate} from "react-router-dom";

import MaxLine from "../elements/MaxLine";
import SvgIconStyle from "../elements/SvgIconStyle";

import useCollections from "../../hooks/useCollections";

interface CollectionCardProps extends MyCollection{
    loading?: boolean
}

const CollectionCard = ({ id, title, items }:CollectionCardProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const collections = useCollections();

    const CollectionCardContainer = styled.div(
        {
            backgroundColor: theme.palette.background.paper,
            padding: '0.2rem',
            borderRadius: '1rem',
            display: 'flex',
            textAlign: 'left',
            flexDirection: 'column',
            width: '100%',
            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
            position: 'relative',
            cursor: 'pointer',
            ".collection-card-title": {
                margin: '0.8rem',
                fontSize: '1rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
            },
            ".collection-card-title-skeleton": {
                fontSize: '1.6rem',
            },
            "img, .collection-card-image-skeleton, .collection-card-default-cover": {
                width: '100%', 
                borderRadius: '1rem', 
                aspectRatio: '3/4', 
                objectFit: 'cover', 
                maxWidth: '100%', 
                height: 'auto'
            },
            ".collection-card-default-cover": {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.grey["200"],
                color: theme.palette.grey["500"],
            },
            ".collection-card-collage": {
                aspectRatio: '3/4',
                maxWidth: '100%',
                height: 'auto',
                backgroundColor: theme.palette.grey["200"],
                padding: '0.4rem',
                borderRadius: '1rem'
            },
            ".collection-card-add-button": {
                position: 'absolute',
                zIndex: '2',
                right: '0',
                marginTop: '95%',
                backgroundColor: '#ffffff95',
                backdropFilter: 'blur(4px)',
                borderRadius: '0.4rem',
                fontSize: '2rem',
                width: '2.4rem',
                height: '2.4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }
        }
    )

    const handleClick = () => {
        navigate(`/mycollections/${id}`);
    }

    // EDIT COLLECTION
    const handleClickEdit = (e:any) => {
        e.stopPropagation();
        collections.handleOpenEditCollectionDialog(id, title);
    }

    // DELETE COLLECTION
    const handleClickDelete = (e:any) => {
        e.stopPropagation();
        collections.handleOpenDeleteCollectionDialog(id, title);
    }

    const itemImages = items.flatMap(item => item.coverImage).slice(0, 4);

    return(
        <>
            <Zoom in>
                <CollectionCardContainer onClick={handleClick}>
                    {(itemImages.length === 0) ?
                        <div className="collection-card-default-cover">
                            <SvgIconStyle src="/assets/icons/icon_movie.svg" sx={{ width: '50%', height: '50%' }} />
                        </div>
                        :
                        <div className="collection-card-collage">
                            <Grid container spacing="0.4rem">
                                {itemImages.map(( item:string, index:number) => {
                                    return(
                                        <Grid key={index} item xxs={6}>
                                            <img src={item} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </div>
                    }

                    <div className="collection-card-title">
                        <div style={{ flexGrow: '1', lineBreak: 'anywhere', paddingRight: '1rem' }}>
                            <MaxLine line={2}>
                                {title}
                            </MaxLine>
                        </div>

                        <Button onClick={handleClickDelete} variant="text" color="error" sx={{ width: '2rem', height: '2rem', padding: '0', minWidth: '2rem'  }}>
                            <SvgIconStyle src="/assets/icons/icon_trash.svg" sx={{ width: '100%', height: '100%' }} />
                        </Button>
                    </div>

                    <button onClick={handleClickEdit} className="collection-card-add-button shrink-click">
                        <SvgIconStyle src="/assets/icons/icon_edit.svg" />
                    </button>
                </CollectionCardContainer>
            </Zoom>


        </>
    )
}

export default CollectionCard;