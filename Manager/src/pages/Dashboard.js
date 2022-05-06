import { Container, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

// components
import Page from '../components/Page';
import {
    TotalActiveProjects,
    TotalActiveArchitects,
    TotalActiveNews
} from '../components/dashboard';

const Team = () => {
    const { architects } = useSelector(state => state.architect);
    const { news } = useSelector(state => state.news);
    const { projects } = useSelector(state => state.project);
    return (
        <Page title='Dashboard | A7 Studio'>
            <Container sx={{ pb: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <TotalActiveProjects totalActive={projects.length} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TotalActiveNews totalActive={news.length} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TotalActiveArchitects totalActive={architects.length} />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
};

export default Team;
