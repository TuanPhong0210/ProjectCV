import axiosInstance from './axiosInstance';

const aboutApi = {
    // [GET] baseURL/about
    findByKey: () => {
        const url = '/about';
        return axiosInstance.get(url);
    },

    // [PUT] baseURL/about
    edit: text => {
        const url = '/about';
        return axiosInstance.put(url, {
            text
        });
    }
};

export default aboutApi;
