import axiosInstance from './axiosInstance';

const bannerApi = {
    // [GET] baseURL/banners
    findByKey: () => {
        const url = '/banners';
        return axiosInstance.get(url);
    },

    // [PUT] baseURL/banners
    edit: body => {
        const url = '/banners';
        return axiosInstance.put(url, body);
    }
};

export default bannerApi;
