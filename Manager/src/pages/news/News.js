import { Container } from '@mui/material';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { NewsList } from '../../components/news';
// path
import { PATH_DASHBOARD } from '../../routes/path';

const News = () => {
    return (
        <Page title='Tin tức | A7 Studio'>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header='Tin tức'
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                    ]}
                />
                <NewsList />
            </Container>
        </Page>
    );
};

export default News;
