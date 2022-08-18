import styled from "@emotion/styled";
import { useTheme } from "@mui/material";

interface RatingBadgeProps{
    value: number,
    style?: any
}

const RatingBadge = ({ value, style }:RatingBadgeProps) => {
    const theme = useTheme();
    let backgroundColor, textColor;

    if(value >= 7){
        backgroundColor = theme.palette.success.light;
        textColor = theme.palette.success.dark;
    }else if(value >= 4 && value < 7){
        backgroundColor = theme.palette.warning.light;
        textColor = theme.palette.warning.dark;
    }else if(value >= 0 && value < 4){
        backgroundColor = theme.palette.error.light;
        textColor = theme.palette.error.dark;
    }

    const RatingBadgeItem = styled.div(
        {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: backgroundColor,
            color: textColor,
            fontWeight: '600',
            borderRadius: '100px',
            width: '2.4rem',
            height: '2.4rem',
            ...style
        }
    )
    return(
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.6rem', marginBottom: '0.2rem' }}>
                Ratings:
            </div>
            <RatingBadgeItem>
                {value}
            </RatingBadgeItem>
        </div>
    )
}

export default RatingBadge;