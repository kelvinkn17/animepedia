import {Container, Grid, Pagination, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";

import Page from "../components/elements/Page";
import AnimeCard from "../components/animelist/AnimeCard";

import {getAnimeList} from "../graphql/AnimeDataQuery";

const PER_PAGE = 12;

const AnimeListPage = () => {
    const navigate = useNavigate();

    const { page } = useParams();

    useEffect(() => {
        if (typeof page === "string" && page) {
            setCurrentPage(parseInt(page));
            setStartIndexNumber((parseInt(page)-1) * PER_PAGE);
        }
    }, []);

    // GET DATA
    const [currentPage, setCurrentPage] = useState(1);
    const {error, data, loading }= useQuery(getAnimeList(currentPage, PER_PAGE));
    const [startIndexNumber, setStartIndexNumber] = useState(0);

    // PAGINATION
    const [totalPage, setTotalPage] = useState();
    useEffect(() => {
        if(data){
            setTotalPage(data.Page.pageInfo.lastPage)
        }
    }, [data]);

    const onChangePage = (event:any, value:number) => { 
        setCurrentPage(value);
        setStartIndexNumber((value-1) * PER_PAGE);
        navigate(`/anime/trending/${value}`);
    }

    return(
        <Page title="Anime List">
            <Container maxWidth="xl" style={{ marginTop: '4rem' }}>
                <Typography gutterBottom variant="h5" component="h1" style={{ fontWeight: '800', marginBottom: '1rem' }}>
                    Trending Anime
                </Typography>

                <Grid container spacing="0.6rem" alignItems="stretch" >
                    {(data && !loading) &&
                        data.Page.media.map(( item:any, index:number) => {
                            return(
                                <Grid key={item.id} item xxs={6} xs={4} md={2.4} lg={2} style={{ display: 'flex' }}>
                                    <AnimeCard id={item.id} image={item.coverImage.large} title={item.title.romaji} color={item.coverImage.color} index={startIndexNumber+index} />
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