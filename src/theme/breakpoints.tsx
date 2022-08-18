
declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xxs: true;
        xs: true; // removes the `xs` breakpoint
        sm: true;
        md: true;
        lg: true;
        xl: true;
    }
}

const breakpoints = {
    values: {
        xxs: 0,
        xs: 300,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536
    },
    unit: "px"
}

export default breakpoints;
