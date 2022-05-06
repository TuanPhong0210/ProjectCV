import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { NewsForm } from '../../components/news';
// path
import { PATH_DASHBOARD } from '../../routes/path';

const NewsCreate = () => {
    const { pathname } = useLocation();
    const isEdit = pathname.includes('edit');
    const { news } = useSelector(state => state.news);
    const _news = news.find(_news => _news.slug === pathname.split('/').pop());
    return (
        <Page title={`${_news?.title || 'Thêm mới tin tức'} | A7 Studio`}>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header={!isEdit ? 'Tạo tin tức' : _news ? _news.title : ''}
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Tin tức', href: PATH_DASHBOARD.news.list },
                    ]}
                />
                <NewsForm isEdit={isEdit} news={_news} />
            </Container>
        </Page>
    );
};

export default NewsCreate;
