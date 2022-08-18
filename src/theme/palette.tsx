import alpha from "color-alpha";

const PRIMARY = {
    lighter: '#FFBCEC',
    light: '#FFA1E4',
    main: '#FF79D6',
    dark: '#AD5394',
};
const SECONDARY = {
    lighter: '#D6E4FF',
    light: '#84A9FF',
    main: '#3366FF',
    dark: '#091A7A',
};
const INFO = {
    lighter: '#D0F2FF',
    light: '#74CAFF',
    main: '#1890FF',
    dark: '#04297A',
};
const SUCCESS = {
    lighter: '#D5FDF3',
    light: '#95F7DE',
    main: '#62FFD6',
    dark: '#15B393',
};
const WARNING = {
    lighter: '#FFF6D8',
    light: '#FFE99D',
    main: '#FFDA56',
    dark: '#E5AF00',
};
const ERROR = {
    lighter: '#F9E3E3',
    light: '#FF9C9C',
    main: '#FF6261',
    dark: '#C6403F',
};

const GREY = {
    0: '#FFFFFF',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
    500_8: alpha('#919EAB', 0.08),
    500_12: alpha('#919EAB', 0.12),
    500_16: alpha('#919EAB', 0.16),
    500_24: alpha('#919EAB', 0.24),
    500_32: alpha('#919EAB', 0.32),
    500_48: alpha('#919EAB', 0.48),
    500_56: alpha('#919EAB', 0.56),
    500_80: alpha('#919EAB', 0.8),
};

const palette = {
    common: { black: '#000', white: '#fff' },
    primary: { ...PRIMARY, contrastText: '#fff' },
    secondary: { ...SECONDARY, contrastText: '#fff' },
    info: { ...INFO, contrastText: '#fff' },
    success: { ...SUCCESS, contrastText: GREY[800] },
    warning: { ...WARNING, contrastText: GREY[800] },
    error: { ...ERROR, contrastText: '#fff' },
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: { paper: '#fff', default: '#FAFAFA', neutral: GREY[200] },
}

export default palette;