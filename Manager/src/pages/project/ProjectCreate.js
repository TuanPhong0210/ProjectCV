import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';

// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ProjectForm } from '../../components/project';
// path
import { PATH_DASHBOARD } from '../../routes/path';

const ProjectCreate = () => {
    const { pathname } = useLocation();
    const isEdit = pathname.includes('edit');
    const { projects } = useSelector(state => state.project);
    const project = projects.find(project => project.slug === pathname.split('/').pop());
    return (
        <Page title={`${project?.name || 'Thêm mới dự án'} | A7 Studio`}>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header={!isEdit ? 'Tạo dự án' : project ? project.name : ''}
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Dự án', href: PATH_DASHBOARD.project.list },
                    ]}
                />
                <ProjectForm isEdit={isEdit} project={project} />
            </Container>
        </Page>
    );
};

export default ProjectCreate;
