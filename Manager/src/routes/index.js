import { lazy, Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

// components
import LoadingScreen from '../components/LoadingScreen';
// guards
import AuthGuard from '../guards/AuthGuard';
// layouts
import MainLayout from '../layouts/main';

const Loadable = Component => props => {
    return (
        <Suspense
            fallback={<LoadingScreen />}
        >
            <Component {...props} />
        </Suspense>
    );
};

const Router = () => {
    return useRoutes([
        // Auth routes
        {
            path: 'auth',
            children: [
                { path: 'login', element: <Login /> },
                { path: 'reset-password', element: <ResetPassword /> },
                { path: 'edit-account', element: <EditAccount /> }
            ]
        },
        {
            path: '*',
            children: [
                { path: '404', element: <NotFound /> },
                { path: '*', element: <Navigate to='/404' replace /> }
            ]
        },
        // Main routes
        {
            path: '/',
            element: (
                <AuthGuard>
                    <MainLayout />
                </AuthGuard>
            ),
            children: [
                { path: '', element: <Navigate to='/dashboard' replace /> },
                { path: 'dashboard', element: <Dashboard /> },
                {
                    path: 'project',
                    children: [
                        { path: '', element: <Navigate to='/project/list' replace /> },
                        { path: 'list', element: <Projects /> },
                        { path: 'new', element: <ProjectCreate /> },
                        { path: 'edit/:projectSlug', element: <ProjectCreate /> },
                    ]
                },
                {
                    path: 'news',
                    children: [
                        { path: '', element: <Navigate to='/news/list' replace /> },
                        { path: 'list', element: <News /> },
                        { path: 'new', element: <NewsCreate /> },
                        { path: 'edit/:newsSlug', element: <NewsCreate /> }
                    ]
                },
                {
                    path: 'architect',
                    children: [
                        { path: '', element: <Navigate to='/architect/list' replace /> },
                        { path: 'list', element: <Architects /> },
                        { path: 'new', element: <ArchitectCreate /> },
                        { path: 'edit/:architectId', element: <ArchitectCreate /> }
                    ]
                },
                { path: 'menu', element: <Menu /> },
                { path: 'banner', element: <Banner /> },
                { path: 'about', element: <About /> },
                { path: 'footer', element: <Footer /> }
            ]
        },
        { path: '*', element: <Navigate to='/404' replace /> }
    ]);
};

export default Router;

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const EditAccount = Loadable(lazy(() => import('../pages/authentication/EditAccount')));

// Main
const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
const NotFound = Loadable(lazy(() => import('../pages/NotFound')));

// Project
const Projects = Loadable(lazy(() => import('../pages/project/Projects')));
const ProjectCreate = Loadable(lazy(() => import('../pages/project/ProjectCreate')));
// News
const News = Loadable(lazy(() => import('../pages/news/News')));
const NewsCreate = Loadable(lazy(() => import('../pages/news/NewsCreate')));
// Architect
const Architects = Loadable(lazy(() => import('../pages/architect/Architects')));
const ArchitectCreate = Loadable(lazy(() => import('../pages/architect/ArchitectCreate')));
// Menu
const Menu = Loadable(lazy(() => import('../pages/Menu')));
// Banner
const Banner = Loadable(lazy(() => import('../pages/Banner')));
// About
const About = Loadable(lazy(() => import('../pages/About')));
// Footer
const Footer = Loadable(lazy(() => import('../pages/Footer')));
