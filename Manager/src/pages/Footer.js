import { useState, useEffect } from 'react';
import { Container } from '@mui/material';

// apis
import footerApi from '../apis/footerApi';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { FooterItems } from '../components/footer';
// path
import { PATH_DASHBOARD } from '../routes/path';

const Footer = () => {
    const [footer, setFooter] = useState(null);
    useEffect(() => {
        const getFooter = async () => {
            const footer = await footerApi.findByKey();
            setFooter(footer);
        };
        getFooter();
    }, []);
    return (
        <Page title='Cuối trang | A7 Studio'>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header='Quản lý cuối trang'
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                    ]}
                />
                {footer && <FooterItems footer={footer} />}
            </Container>
        </Page>
    );
};

export default Footer;
