
import { Button, Container, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Markup } from "interweave";

import Page from "../components/elements/Page";
import LoadingSpinner from "../components/elements/LoadingSpinner";
import { useEffect } from "react";
import RatingBadge from "../components/animedetail/RatingBadge";
import SvgIconStyle from "../components/elements/SvgIconStyle";
import MaxLine from "../components/elements/MaxLine";
import DescriptionBox from "../components/animedetail/DescriptionBox";
import LinksBox from "../components/animedetail/LinksBox";

const getAnimeDetail = (id:string) => {
    const GET_ANIME_DETAIL = gql`
        query{
            Media(id: ${id}){
                id
                title {
                    romaji
                }
                description
                format
                episodes
                duration
                status
                siteUrl
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
                season
                studios {
                    nodes{
                        name
                    }
                }
                trending
                popularity
                meanScore
                averageScore
                coverImage {
                    large
                    medium
                    color
                }
                bannerImage
                externalLinks {
                    site
                    icon
                    url
                }
            }
        }
    `;

    return GET_ANIME_DETAIL;
}

const AnimeDetailPage = () => {
    const theme = useTheme();
    const { id } = useParams();

    const {error, data, loading }= useQuery(getAnimeDetail(id ? id : ""));

    useEffect(() => {
        if(data){
            console.log(data.Media);
        }
    }, [data]);
    
    return(
        <Page>
            {data &&
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'relative', zIndex: '5', height: '12rem' }}>
                        <div style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 100%)', zIndex: '2', width: '100%', height: '100%', position: 'absolute' }} />
                        <img src={data.Media.bannerImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', zIndex: '1' }} />
                    </div>

                    
                    <div style={{ backgroundColor: theme.palette.background.paper, paddingTop: '1rem' }}>
                        <Container maxWidth="xl">
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'start', zIndex: '5', position: 'relative', paddingLeft: '1rem' }}>
                                <div>
                                    <img src={data.Media.coverImage.large} alt="" style={{ width: '10rem', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '1rem', marginTop: '-10rem' }} />
                                </div>

                                <div style={{ marginLeft: '1rem', width: '100%' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'space-between', width: '100%' }}>
                                        <div>
                                            <RatingBadge value={data.Media.averageScore/10} />
                                        </div>

                                        <Button variant="contained" color="primary">
                                            Add
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '0rem', padding: '1rem', color: 'black' }}>
                                <Typography variant="h6" component="h1" style={{ fontWeight: '600'}}>
                                    {data.Media.title.romaji}
                                    <button className="shrink-click" style={{ marginLeft: '0.4rem', opacity: '0.6' }}>    
                                        <SvgIconStyle src="/assets/icons/icon_redirect.svg" sx={{ width: '1.2rem', height: '1.2rem' }} />
                                    </button>
                                </Typography>

                                {data.Media.isAdult &&
                                    <div style={{ opacity: '0.6' }}>
                                        Contains adult content
                                    </div>
                                }
                            </div>
                        </Container>
                    </div>

                    <Container maxWidth="xl" style={{ marginTop: '1rem' }}>
                        <DescriptionBox description={data.Media.description} />

                        <LinksBox links={data.Media.externalLinks} />
                    </Container>
                </div>
            }
            <Container>
                <div>
                    {data &&
                        <div>
                            
                        </div>
                    }

                    {loading &&
                        <LoadingSpinner />
                    }

                    {error &&
                        <p>
                            Sorry, something went wrong :(
                        </p>
                    }
                </div>
            </Container>
        </Page>
    )
}

export default AnimeDetailPage;