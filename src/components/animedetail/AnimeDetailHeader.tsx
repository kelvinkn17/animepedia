import {Button, Container, Typography, useTheme} from "@mui/material";
import RatingBadge from "./RatingBadge";
import SvgIconStyle from "../elements/SvgIconStyle";
import RedirectButton from "../elements/RedirectButton";

interface AnimeDetailHeaderProps{
    bannerImage: string,
    coverImage: any,
    title: string,
    isAdult: boolean,
    averageScore: number,
    siteUrl: string
}
const AnimeDetailHeader = ({ bannerImage, coverImage, title, isAdult, averageScore, siteUrl }:AnimeDetailHeaderProps) => {
    const theme = useTheme();

    return(
        <div>
            <div style={{position: "relative", zIndex: "5", height: "12rem"}}>
                {bannerImage &&
                    <>
                        <div style={{
                            background: "linear-gradient(0deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 100%)",
                            zIndex: "2",
                            width: "100%",
                            height: "100%",
                            position: "absolute"
                        }}/>
                        <img src={bannerImage} alt=""
                             style={{width: "100%", height: "100%", objectFit: "cover", zIndex: "1"}}/>
                    </>
                }
            </div>

            <div style={{backgroundColor: theme.palette.background.paper, paddingTop: "1rem"}}>
                <Container maxWidth="xl">
                    <div className="pop-in" style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "start",
                        zIndex: "5",
                        position: "relative",
                        paddingLeft: "1rem"
                    }}>
                        <div>
                            <img src={coverImage.large} alt="" style={{
                                width: "10rem",
                                aspectRatio: "3/4",
                                objectFit: "cover",
                                borderRadius: "1rem",
                                marginTop: "-10rem"
                            }}/>
                        </div>

                        <div style={{marginLeft: "1rem", width: "100%"}}>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "start",
                                justifyContent: "space-between",
                                width: "100%"
                            }}>
                                {averageScore > 0 &&
                                    <div>
                                        <RatingBadge value={averageScore / 10}/>
                                    </div>
                                }

                                <Button variant="contained" color="primary">
                                    Add
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="pop-in" style={{marginTop: "0rem", padding: "1rem", color: "black"}}>
                        <Typography variant="h6" component="h1" style={{fontWeight: "600"}}>
                            {title}
                            <RedirectButton link={siteUrl} />
                        </Typography>

                        {isAdult &&
                            <div style={{opacity: "0.6"}}>
                                Contains adult content
                            </div>
                        }
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default AnimeDetailHeader;