import { withStyles } from '@mui/styles';

const GlobalStyles = withStyles((theme) => ({
    '@global': {
        'html': {
            scrollBehavior: 'smooth'
        },
        '::-webkit-scrollbar': {
            width: '11px',
            height: '11px'
        },
        '::-webkit-scrollbar-thumb': {
            background: 'gray',
            borderRadius: '10px',
            border: `2px solid ${theme.palette.background.default}`
        },
        '::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#bbb'
        },
        '*': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            fontFamily: 'Avo',
            listStyle: 'none'
        },
        'img': {
            width: '100%',
            height: '100%',
            objectFit: 'contain'
        },
        '.Mui-checked': {
            color: `${theme.palette.secondary.main} !important`
        },
        '.slick-slider:hover button': {
            opacity: 1
        },
        '.slick-dots li.slick-active div': {
            backgroundColor: '#f53d2d'
        }
    }
}))(() => null);

export default GlobalStyles;
