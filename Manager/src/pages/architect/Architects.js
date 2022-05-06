import { Container } from '@mui/material';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ArchitectList } from '../../components/architect';
// path
import { PATH_DASHBOARD } from '../../routes/path';

const Architects = () => {
    return (
        <Page title='Kiến trúc sư | A7 Studio'>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header='Kiến trúc sư'
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                    ]}
                />
                <ArchitectList />
            </Container>
        </Page>
    );
};

export default Architects;
