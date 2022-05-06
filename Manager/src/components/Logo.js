import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const propTypes = {
    sx: PropTypes.object
};

const Logo = ({ sx }) => {
    return (
        <Box
            component='img'
            alt='A7_logo'
            src='/a7_logo.svg'
            sx={{
                width: '50px',
                ...sx
            }}
        />
    );
};

Logo.propTypes = propTypes;

export default Logo;
