import styled from "@emotion/styled";
import { useTheme, Fade, Zoom } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import MaxLine from "../elements/MaxLine";
import useCollections from "../../hooks/useCollections";
import {useState} from "react";
import AddButton from "./AddButton";

interface AnimeCardProps {
    id: string,
    image: string,
    title: string,
    color: string,
    index: number,
    loading?: boolean
}

const AnimeCard = ({ id, image, title, color, index, loading }:AnimeCardProps) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const AnimeCardContainer = styled.div(
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
            "&:hover":{
                ".anime-card-title": {
                    color: color,
                }
            },
            ".anime-card-title": {
                margin: '0.8rem',
                fontSize: '0.8rem',
                transition: 'color 0.2s ease-out',
                fontWeight: '500'
            },
            ".anime-card-title-skeleton": {
                fontSize: '1.6rem',
            },
            "img, .anime-card-image-skeleton": {
                width: '100%', 
                borderRadius: '1rem', 
                aspectRatio: '3/4', 
                objectFit: 'cover', 
                maxWidth: '100%', 
                height: 'auto'
            },
            ".anime-card-add-button": {
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
                transition: 'all 0.2s ease-in'
            },
            ".anime-card-add-button.selected": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
            },
            ".anime-card-ranking": {
                position: 'absolute',
                zIndex: '2',
                top: '-0.2rem',
                left: '-0.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.4rem',
                fontSize: '0.8rem',
                borderRadius: '0.4rem',
                backgroundColor: color ? color : "#fff",
                fontWeight: '500'
            }
        }
    )

    const handleClick = () => {
        navigate(`/anime/${id}`);
    }

    if(loading){
        return(
            <AnimeCardContainer className="pop-in">
                <Skeleton className="anime-card-image-skeleton" />
                <div style={{ margin: '0.8rem'}}>
                    <Skeleton className="anime-card-title-skeleton" count={1} />
                </div>
            </AnimeCardContainer> 
        )
    }

    return(
        <Fade in={!loading}>
            <AnimeCardContainer onClick={handleClick}>
                <img src={image} alt="" />
                <div className="anime-card-title">
                    <MaxLine line={2}>
                        {title}
                    </MaxLine>
                </div>

                <AddButton id={id} title={title} coverImage={image} />

                <div className="anime-card-ranking">
                    <span style={{ color: 'grey', mixBlendMode: 'difference' }}>
                        #{index+1}
                    </span>
                </div>
            </AnimeCardContainer>
        </Fade>
    )
}

export default AnimeCard;