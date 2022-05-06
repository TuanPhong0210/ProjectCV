import axiosInstance from './axiosInstance';

const aboutApi = {
    // [GET] baseURL/menus
    findAll: () => {
        const url = '/menus';
        return axiosInstance.get(url);
    },

    // [PUT] baseURL/menus
    edit: body => {
        const url = '/menus';
        return axiosInstance.put(url, body);
    }
};

export default aboutApi;
