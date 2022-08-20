import {Container} from "@mui/material";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import Skeleton from "react-loading-skeleton";

import Page from "../components/elements/Page";
import DescriptionBox from "../components/animedetail/DescriptionBox";
import LinksBox from "../components/animedetail/LinksBox";
import TagBox from "../components/animedetail/TagBox";
import AnimeDetailHeader from "../components/animedetail/AnimeDetailHeader";
import InfoBox from "../components/animedetail/InfoBox";
import CharactersList from "../components/animedetail/CharactersList";

import {getAnimeDetail} from "../graphql/AnimeDataQuery";

const AnimeDetailPage = () => {
    const { id } = useParams();

    const {error, data, loading }= useQuery(getAnimeDetail(id ? id : ""));

    return(
        <Page title="Anime Detail">
            {data &&
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <AnimeDetailHeader bannerImage={data.Media.bannerImage} coverImage={data.Media.coverImage} siteUrl={data.Media.siteUrl}
                       title={data.Media.title.romaji} isAdult={data.Media.isAdult} averageScore={data.Media.averageScore} id={data.Media.id}
                    />

                    <Container maxWidth="xl" style={{marginTop: '1rem'}}>
                        <DescriptionBox tags={data.Media.tags} description={data.Media.description}/>

                        <InfoBox format={data.Media.form} episodes={data.Media.episodes} duration={data.Media.duration}
                             status={data.Media.status} startDate={data.Media.startDate} endDate={data.Media.endDate}
                             season={data.Media.season} popularity={data.Media.popularity} studio={data.Media.studios[0]}
                             source={data.Media.source} genres={data.Media.genres}
                        />

                        <LinksBox links={data.Media.externalLinks}/>

                        <TagBox tags={data.Media.tags}/>

                        <CharactersList characters={data.Media.characters.nodes} />
                    </Container>
                </div>
            }

            {loading &&
                <div>
                    <Skeleton height="12rem" />
                    <Container maxWidth="xl" style={{ marginTop: '1rem' }}>
                        <Skeleton height="10rem" />
                        <Skeleton height="8rem" style={{ marginTop: '1rem' }} />
                        <Skeleton height="8rem" style={{ marginTop: '1rem' }} />
                        <Skeleton height="20rem" style={{ marginTop: '1rem' }} />
                    </Container>
                </div>
            }
            <Container>
                <div>
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