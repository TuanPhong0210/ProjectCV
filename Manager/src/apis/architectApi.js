import axiosInstance from './axiosInstance';

const architectApi = {
    // [GET] baseURL/architects
    findAll: () => {
        const url = '/architects';
        return axiosInstance.get(url);
    },

    // [GET] baseURL/architects/:architectId
    findById: architectId => {
        const url = `/architects/${architectId}`;
        return axiosInstance.get(url);
    },

    // [POST] baseURL/architects
    insert: body => {
        const url = '/architects';
        return axiosInstance.post(url, body);
    },

    // [PUT] baseURL/architects/:architectId
    edit: (architectId, body) => {
        const url = `/architects/${architectId}`;
        return axiosInstance.put(url, body);
    },

    // [DELETE] baseURL/architects/:architectId
    deleteById: architectId => {
        const url = `/architects/${architectId}`;
        return axiosInstance.delete(url);
    },

    // [PATCH] baseURL/architects
    deleteAll: architectIds => {
        const url = '/architects';
        return axiosInstance.patch(url, {
            architectIds
        });
    }
};

export default architectApi;
