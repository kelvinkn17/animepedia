import { Container, Grid, Pagination, Typography, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

import Page from "../components/elements/Page";
import AnimeCard from "../components/animelist/AnimeCard";
import LoadingSpinner from "../components/elements/LoadingSpinner";

const getAnimeList = (page:number, perPage:number) => {
    const GET_CHARACTERS = gql`
        query{
            Page(page: ${page}, perPage: ${perPage}) {
                pageInfo{
                    currentPage
                    lastPage
                }
                media(sort:  TRENDING_DESC) {
                    id
                    trending
                    popularity
                    title {
                        romaji
                    }
                    coverImage {
                        extraLarge
                        large
                        medium
                        color
                    }
                }
            }
        }
    `;

    return GET_CHARACTERS;
}

const AnimeListPage = () => {
    const theme = useTheme();

    // GET DATA
    const [currentPage, setCurrentPage] = useState(1);
    const {error, data, loading, refetch }= useQuery(getAnimeList(currentPage, 12));

    // PAGINATION
    const [totalPage, setTotalPage] = useState();
    useEffect(() => {
        console.log(data);
        if(data){
            console.log(data.Page.pageInfo.lastPage);
            setTotalPage(data.Page.pageInfo.lastPage)
        }
    }, [data]);

    const onChangePage = (event:any, value:number) => { 
        setCurrentPage(value);

        window.scroll({top: 0, left: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        refetch();
    }, [currentPage]);


    return(
        <Page title="Anime List">
            <Container maxWidth="xl" style={{ marginTop: '4rem' }}>
                <Typography gutterBottom variant="h5" component="h1" style={{ fontWeight: '800' }}>
                    Trending Anime
                </Typography>

                <Grid container spacing="0.6rem" alignItems="stretch" >
                    {(data && !loading) &&
                        data.Page.media.map(( item:any, index:number) => { 
                            return(
                                <Grid key={item.id} item xxs={6} xs={4} md={2.4} lg={2} style={{ display: 'flex' }}>
                                    <AnimeCard id={item.id} image={item.coverImage.large} title={item.title.romaji} color={item.coverImage.color} index={index} />
                                </Grid>
                                
                            )
                        })
                    }

                    {(loading) &&
                        Array(12).fill(1).map((item, index) => {
                            return(
                                <Grid key={index} item xxs={6} xs={4} md={2.4} lg={2} style={{ display: 'flex' }}>
                                    <AnimeCard id="" image="" title="" color="" index={index} loading />
                                </Grid>
                                
                            )
                        })
                    }
                </Grid>
                
                {data &&
                    <div style={{ marginTop: '1.2rem', display: 'flex', justifyContent: 'end' }}>
                        <Pagination count={totalPage} page={currentPage} onChange={onChangePage} shape="rounded" />
                    </div>
                }
                

                {error &&
                    <p>
                        Sorry, something went wrong :(
                    </p>
                }
            </Container>
        </Page>
    )
}

export default AnimeListPage;