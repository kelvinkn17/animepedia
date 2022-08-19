import moment from "moment/moment";

import BoxItem from "../elements/BoxItem";

interface InfoBoxProps{
    format: string
    episodes: number
    duration: number,
    status: string,
    startDate: {
        year: number,
        month: number,
        day: number
    }
    endDate: {
        year: number,
        month: number,
        day: number
    }
    season: string
    popularity: number,
    studio: string,
    source: string,
    genres: string[]
}

const zeroPrefix = (value:number) => {
    if(value < 10){
        return `0${value};`
    }else{
        return `${value}`;
    }
}

const formatDate = (date:any) => {
    const dateDate = moment(`${zeroPrefix(date.day)}/${zeroPrefix(date.month)}/${zeroPrefix(date.year)}`, 'DD/MM/YYYY').toDate();
    if(dateDate.getDate()){
        return moment(dateDate).format('DD MMM YYYY');
    }else{
        return null;
    }
}

const unCamelCase = (key:string) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
        return str.toUpperCase();
    });
}

const InfoBox = ({ format, episodes, duration, status, startDate, endDate, season, popularity, studio, source, genres }:InfoBoxProps) => {
    const infoKeys = ["format", "episodes", "duration", "status", "startDate", "endDate", "season", "popularity", "studio", "source", "genres"];

    let mergedInfo = [format, episodes, duration, status, formatDate(startDate), formatDate(endDate), season, popularity, studio, source, genres.join(", ")];

    return(
        <BoxItem className="pop-in" sx={{ marginTop: '1rem', padding: '2rem 1rem' }}>
            <div className="no-scrollbar" style={{ display: 'flex', alignItems: 'center', width: '100%', overflow: 'auto' }}>
                {infoKeys.map(( item:string, index:number) => {
                    if(mergedInfo[index]){
                        return(
                            <div key={index} style={{ display: 'flex', flexDirection: "column", marginRight: '2rem' }}>
                                <div style={{ marginBottom: '0.4rem', opacity: '0.6' }}>
                                    {unCamelCase((item))}
                                </div>
                                <div style={{ whiteSpace: 'nowrap', fontWeight: '400' }}>
                                    {mergedInfo[index]}
                                </div>
                            </div>
                        )
                    }

                    return "";
                })}
            </div>
        </BoxItem>
    )
}

export default InfoBox;