import { useState, useEffect } from 'react';
import { Container } from '@mui/material';

// apis
import menuApi from '../apis/menuApi';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { MenuItems } from '../components/menu';
// path
import { PATH_DASHBOARD } from '../routes/path';

const Menu = () => {
    const [menus, setMenus] = useState(null);
    useEffect(() => {
        const getMenus = async () => {
            const menus = await menuApi.findAll();
            setMenus(menus);
        };
        getMenus();
    }, []);
    return (
        <Page title='Thanh điều hướng | A7 Studio'>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header='Thanh điều hướng'
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                    ]}
                />
                {menus && <MenuItems menus={menus} />}
            </Container>
        </Page>
    );
};

export default Menu;
