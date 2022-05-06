import axiosInstance from './axiosInstance';

const accountApi = {
    // [GET] /accounts/checkExist/:email
    checkExist: (email) => {
        const url = `/accounts/checkExist/${email}`;
        return axiosInstance.get(url);
    },

    // [GET] /accounts
    listAccounts: () => {
        const url = '/accounts';
        return axiosInstance.get(url);
    },

    // [GET] /accounts/profile
    getProfile: () => {
        const url = '/accounts/profile';
        return axiosInstance.get(url);
    },

    // [POST] /accounts/login
    login: (email, password) => {
        const url = '/accounts/login';
        return axiosInstance.post(url, {
            email,
            password
        });
    },

    // [POST] /accounts/reset-password
    resetPassword: (email, securityCode, newPassword, newPasswordConfirm) => {
        const url = '/accounts/reset-password';
        return axiosInstance.post(url, {
            email,
            securityCode,
            newPassword,
            newPasswordConfirm
        });
    },

    // [PUT] /accounts
    editAccount: (email, newEmail, oldPassword, newPassword, newPasswordConfirm) => {
        const url = '/accounts';
        return axiosInstance.put(url, {
            email,
            newEmail,
            oldPassword,
            newPassword,
            newPasswordConfirm
        });
    },

    // [POST] /accounts/register
    register: (name, email, password, passwordConfirm) => {
        const url = '/accounts/register';
        return axiosInstance.post(url, {
            name,
            email,
            password,
            passwordConfirm
        });
    }
};

export default accountApi;
