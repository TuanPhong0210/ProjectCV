import axiosInstance from './axiosInstance';

const newsApi = {
    // [GET] baseURL/news
    findAll: () => {
        const url = '/news';
        return axiosInstance.get(url);
    },

    // [GET] baseURL/news/:newsSlug
    findBySlug: newsSlug => {
        const url = `/news/${newsSlug}`;
        return axiosInstance.get(url);
    },

    // [POST] baseURL/news
    insert: body => {
        const url = '/news';
        return axiosInstance.post(url, body);
    },

    // [PUT] baseURL/news/:newsId
    edit: (newsId, body) => {
        const url = `/news/${newsId}`;
        return axiosInstance.put(url, body);
    },

    // [DELETE] baseURL/news/:newsId
    deleteById: newsId => {
        const url = `/news/${newsId}`;
        return axiosInstance.delete(url);
    },

    // [PATCH] baseURL/news
    deleteAll: newsIds => {
        const url = '/news';
        return axiosInstance.patch(url, {
            newsIds
        });
    },

    // [PATCH] baseURL/news/restore/:newsId
    restoreById: newsId => {
        const url = `/news/restore/${newsId}`;
        return axiosInstance.patch(url);
    }
};

export default newsApi;
