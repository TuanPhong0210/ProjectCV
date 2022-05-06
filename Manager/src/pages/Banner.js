import { useState, useEffect } from 'react';
import { Container } from '@mui/material';

// apis
import bannerApi from '../apis/bannerApi';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { BannerForm } from '../components/banner';
// path
import { PATH_DASHBOARD } from '../routes/path';

const Banners = () => {
    const [banners, setBanners] = useState(null);
    useEffect(() => {
        const getBanners = async () => {
            const banners = await bannerApi.findByKey();
            setBanners(banners)
        };
        getBanners();
    }, []);
    return (
        <Page title='Ảnh trang chủ | A7 Studio'>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header='Quản lý ảnh trang chủ'
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                    ]}
                />
                <BannerForm banners={banners} />
            </Container>
        </Page>
    );
};

export default Banners;
