import {Container, Grid, Typography} from "@mui/material";
import Page from "../components/elements/Page";
import CollectionCard from "../components/mycollections/CollectionCard";
import useCollections from "../hooks/useCollections";
import AddCollectionButton from "../components/mycollections/AddCollectionButton";


const MyCollectionsPage = () => {
    const collections = useCollections();

    return(
        <Page>
            <Container maxWidth="xl" style={{ marginTop: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <Typography gutterBottom variant="h5" component="h1" style={{ fontWeight: '800' }}>
                        My Collections
                    </Typography>

                    <AddCollectionButton variant="contained" />
                </div>

                <Grid spacing="1rem" container>
                    {collections.collectionsData.map(( item:MyCollection, index:number) => {
                        return(
                            <Grid key={index} item xxs={6} xs={6} sm={4} md={2.4}>
                                <CollectionCard id={item.id} title={item.title} coverImage={item.coverImage} items={item.items} />
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </Page>
    )
}

export default MyCollectionsPage;