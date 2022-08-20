import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button, Container, Grid, Typography} from "@mui/material";

import useCollections from "../hooks/useCollections";

import Page from "../components/elements/Page";
import AnimeCard from "../components/animelist/AnimeCard";
import BoxItem from "../components/elements/BoxItem";

const MyCollectionsDetailPage = () => {
    const { id } = useParams();
    const collections = useCollections();

    const collectionId = id ? id : "";

    useEffect(() => {
        collections.getCollectionDetail(collectionId);
    }, [id])

    const [detailData, setDetailData] = useState<MyCollection>();

    useEffect(() => {
        if(collections.collectionDetail){
            setDetailData(collections.collectionDetail);
        }
    }, [collections.collectionDetail])

    // EDIT COLLECTION
    const handleClickEdit = (e:any) => {
        e.stopPropagation();
        const collectionTitle = detailData?.title ? detailData?.title : "";
        collections.handleOpenEditCollectionDialog(collectionId, collectionTitle);
    }

    return(
        <Page title="Collection Detail">
            <Container maxWidth="xl" style={{ marginTop: '4rem' }}>
                {detailData &&
                    <>
                        <BoxItem sx={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div>
                                    <Typography variant="h6" style={{ fontSize: '1rem', opacity: '0.6'}}>
                                        Collection Detail
                                    </Typography>

                                    <Typography gutterBottom variant="h5" component="h1" style={{ fontWeight: '800' }}>
                                        {detailData?.title}
                                    </Typography>
                                </div>

                                <Button onClick={handleClickEdit} variant="contained" color="primary">
                                    Edit
                                </Button>
                            </div>
                        </BoxItem>

                        <div>
                            {detailData.items &&
                                detailData.items.length > 0 ?
                                    <Grid container spacing="0.6rem" alignItems="stretch" >
                                        {detailData?.items.map(( item:CollectionItem, index: number) =>{
                                            return(
                                                <Grid key={index} item xxs={6} xs={4} md={2.4} lg={2} style={{ display: 'flex' }}>
                                                    <AnimeCard id={item.id} image={item.coverImage} title={item.title} color="" index={0} collectionItem collectionId={collectionId} />
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                :
                                <div style={{ textAlign: 'center', marginTop: '8rem' }}>
                                    This collection is still empty.
                                </div>
                            }


                        </div>
                    </>
                }
            </Container>
        </Page>
    )
}

export default MyCollectionsDetailPage;