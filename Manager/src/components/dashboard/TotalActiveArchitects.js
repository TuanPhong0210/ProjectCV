import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';

const propTypes = {
    totalActive: PropTypes.number.isRequired
};

const TotalActiveProjects = ({ totalActive }) => {
    return (
        <Card sx={{ p: 3 }}>
            <Typography variant='subtitle2'>Tổng kiến trúc sư</Typography>
            <Typography variant='h4'>{totalActive}</Typography>
        </Card>
    );
};

TotalActiveProjects.propTypes = propTypes;

export default TotalActiveProjects;
