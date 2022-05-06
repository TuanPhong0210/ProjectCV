import axiosInstance from './axiosInstance';

const projectApi = {
    // [GET] /projects
    findAll: () => {
        const url = '/projects';
        return axiosInstance.get(url);
    },

    // [POST] /projects
    insert: body => {
        const url = '/projects';
        return axiosInstance.post(url, body);
    },

    // [PUT] baseURL/projects/:projectId
    edit: (projectId, body) => {
        const url = `/projects/${projectId}`;
        return axiosInstance.put(url, body);
    },

    // [DELETE] baseURL/projects/:projectId
    deleteById: projectId => {
        const url = `/projects/${projectId}`;
        return axiosInstance.delete(url);
    },

    // [PATCH] baseURL/projects
    deleteAll: projectIds => {
        const url = '/projects';
        return axiosInstance.patch(url, {
            projectIds
        });
    },

    // [PATCH] baseURL/projects/restore/:projectId
    restoreById: projectId => {
        const url = `/projects/restore/${projectId}`;
        return axiosInstance.patch(url);
    }
};

export default projectApi;
