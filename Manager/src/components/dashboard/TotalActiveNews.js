import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';

const propTypes = {
    totalActive: PropTypes.number.isRequired
};

const TotalActiveNews = ({ totalActive }) => {
    return (
        <Card sx={{ p: 3 }}>
            <Typography variant='subtitle2'>Tổng tin tức</Typography>
            <Typography variant='h4'>{totalActive}</Typography>
        </Card>
    );
};

TotalActiveNews.propTypes = propTypes;

export default TotalActiveNews;
