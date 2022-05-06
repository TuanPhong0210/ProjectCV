const path = (root, sublink) => {
    return `${root}${sublink}`;
};

const ROOT_AUTHENTICATION = '/auth';

const ROOT_DASHBOARD = '/dashboard';
const ROOT_PROJECT = '/project';
const ROOT_NEWS = '/news';
const ROOT_ARCHITECT = '/architect';
const ROOT_MENU = '/menu';
const ROOT_BANNER = '/banner';
const ROOT_ABOUT = '/about';
const ROOT_FOOTER = '/footer';

export const PATH_AUTHENTICATION = {
    login: path(ROOT_AUTHENTICATION, '/login'),
    resetPassword: path(ROOT_AUTHENTICATION, '/reset-password'),
    editAccount: path(ROOT_AUTHENTICATION, '/edit-account')
};

export const PATH_DASHBOARD = {
    root: ROOT_DASHBOARD,
    project: {
        root: ROOT_PROJECT,
        list: path(ROOT_PROJECT, '/list'),
        create: path(ROOT_PROJECT, '/new'),
        edit: path(ROOT_PROJECT, '/edit')
    },
    news: {
        root: ROOT_NEWS,
        list: path(ROOT_NEWS, '/list'),
        create: path(ROOT_NEWS, '/new'),
        edit: path(ROOT_NEWS, '/edit')
    },
    architect: {
        root: ROOT_ARCHITECT,
        list: path(ROOT_ARCHITECT, '/list'),
        create: path(ROOT_ARCHITECT, '/new'),
        edit: path(ROOT_ARCHITECT, '/edit')
    },
    menu: ROOT_MENU,
    banner: ROOT_BANNER,
    about: ROOT_ABOUT,
    footer: ROOT_FOOTER
};
