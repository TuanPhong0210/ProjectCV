import axiosInstance from './axiosInstance';

const footerApi = {
    // [GET] baseURL/footer
    findByKey: () => {
        const url = '/footer';
        return axiosInstance.get(url);
    },

    // [PUT] baseURL/footer/connect
    editConnect: body => {
        const url = '/footer/connect';
        return axiosInstance.put(url, body);
    },

    // [PUT] baseURL/footer/contact
    editContact: body => {
        const url = '/footer/contact';
        return axiosInstance.put(url, body);
    },

    // [PUT] baseURL/footer/support
    editSupport: body => {
        const url = '/footer/support';
        return axiosInstance.put(url, body);
    }
};

export default footerApi;
