import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from "react";

// theme
import palette from "./palette";
import breakpoints from "./breakpoints";
import typography from './typography';
import ComponentsOverrides from './overrides';
import shadows from './shadows';

declare module '@mui/material/styles/createTheme' {
    interface ThemeOptions {
      [key: string]: any; // 
    }
}

const theme = createTheme({
    palette: palette,
    breakpoints: breakpoints,
    typography: typography,
    customShadows: shadows
});   

theme.components = ComponentsOverrides(theme);


type ThemeProviderProps = React.PropsWithChildren<{}>;

const theThemeProvider = ({ children } : ThemeProviderProps) => {
    return(
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default theThemeProvider;