import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useTheme } from "@mui/material";

const LoadingSpinner = () => {
    const theme = useTheme();

    const ripple = keyframes`
        0% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 0;
        }
        4.9% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 0;
        }
        5% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
        opacity: 1;
        }
        100% {
            top: 0;
            left: 0;
            width: 72px;
            height: 72px;
            opacity: 0;
        }
    `

    const LoadingSpinnerItem = styled.div(
        {
            position: 'relative',
            width: '80px',
            height: '80px',
            "div": {
                position: 'absolute',
                border: `4px solid ${theme.palette.primary.main}`,
                opacity: '0',
                borderRadius: '50%',
                animation: `${ripple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite`,
            },
            "div:nth-of-type(2)": {
                animationDelay: '0.5s'
            }
        }
    )
    return(
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <LoadingSpinnerItem>
                <div/>
                <div/>
            </LoadingSpinnerItem>
        </div>
    )
}

export default LoadingSpinner;