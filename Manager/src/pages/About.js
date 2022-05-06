import { Container } from '@mui/material';

// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { AboutText } from '../components/about';
// path
import { PATH_DASHBOARD } from '../routes/path';

const About = () => {
    return (
        <Page title='Thông tin A7 | A7 Studio'>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header='Thông tin A7'
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                    ]}
                />
                <AboutText />
            </Container>
        </Page>
    );
};

export default About;
