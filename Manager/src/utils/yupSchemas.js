import * as yup from 'yup';

export const createProjectSchema = yup.object().shape({
    name: yup
        .string()
        .required('Không được bỏ trống!')
        .max(50, 'Tối đa 50 ký tự'),
    architectId: yup
        .mixed()
        .required('Không được bỏ trống!'),
    // subtitle: yup
    //     .string()
    //     .required('Không được bỏ trống!')
    //     .max(100, 'Tối đa 100 ký tự'),
    images: yup
        .array()
        .min(1, 'Không được bỏ trống!'),
});

export const createNewsSchema = yup.object().shape({
    title: yup
        .string()
        .required('Không được bỏ trống!')
        .max(80, 'Tối đa 80 ký tự'),
    image: yup
        .mixed()
        .required('Không được bỏ trống!'),
});

export const createArchitectSchema = yup.object().shape({
    name: yup
        .string()
        .required('Không được bỏ trống!')
        .max(50, 'Tối đa 50 ký tự'),
    subtitle: yup
        .string()
        .required('Không được bỏ trống!')
        .max(50, 'Tối đa 50 ký tự'),
    image: yup
        .mixed()
        .required('Không được bỏ trống!'),
});

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('Trường này phải là email!')
        .required('Không được bỏ trống!'),
    password: yup
        .string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,}$/,
            'Ít nhất 3 ký tự. Gồm 1 chữ, 1 số và 1 ký tự đặc biệt!')
        .required('Không được bỏ trống!')
});

export const resetPasswordSchema = yup.object().shape({
    email: yup
        .string()
        .email('Trường này phải là email!')
        .required('Không được bỏ trống!'),
    securityCode: yup
        .string()
        .required('Không được bỏ trống!'),
    newPassword: yup
        .string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,}$/,
            'Ít nhất 3 ký tự. Gồm 1 chữ, 1 số và 1 ký tự đặc biệt!')
        .required('Không được bỏ trống!'),
    newPasswordConfirm: yup
        .string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,}$/,
            'Ít nhất 3 ký tự. Gồm 1 chữ, 1 số và 1 ký tự đặc biệt!')
        .oneOf([yup.ref('newPassword'), null], 'Mật khẩu mới không đồng bộ!')
        .required('Không được bỏ trống!')
});

export const editAccountSchema = yup.object().shape({
    email: yup
        .string()
        .email('Trường này phải là email!')
        .required('Không được bỏ trống!'),
    oldPassword: yup
        .string()
        .required('Không được bỏ trống!'),
    newPassword: yup
        .string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,}$/,
            'Ít nhất 3 ký tự. Gồm 1 chữ, 1 số và 1 ký tự đặc biệt!')
        .required('Không được bỏ trống!'),
    newPasswordConfirm: yup
        .string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{3,}$/,
            'Ít nhất 3 ký tự. Gồm 1 chữ, 1 số và 1 ký tự đặc biệt!')
        .oneOf([yup.ref('newPassword'), null], 'Mật khẩu mới không đồng bộ!')
        .required('Không được bỏ trống!')
});

export const menuSchema = yup.object().shape({
    navOne: yup
        .string()
        .required('Không được bỏ trống!'),
    navTwo: yup
        .string()
        .required('Không được bỏ trống!'),
    navThree: yup
        .string()
        .required('Không được bỏ trống!'),
});

export const footerConnectSchema = yup.object().shape({
    connectOne: yup
        .string()
        .required('Không được bỏ trống!'),
    connectOneLink: yup
        .string()
        .required('Không được bỏ trống!'),
    connectTwo: yup
        .string()
        .required('Không được bỏ trống!'),
    connectTwoLink: yup
        .string()
        .required('Không được bỏ trống!'),
    connectThree: yup
        .string()
        .required('Không được bỏ trống!'),
    connectThreeLink: yup
        .string()
        .required('Không được bỏ trống!'),
});

export const footerContactSchema = yup.object().shape({
    contactOne: yup
        .string()
        .required('Không được bỏ trống!'),
    contactOneLink: yup
        .string()
        .required('Không được bỏ trống!'),
    contactTwo: yup
        .string()
        .required('Không được bỏ trống!'),
    contactTwoLink: yup
        .string()
        .required('Không được bỏ trống!'),
    contactThree: yup
        .string()
        .email('Trường này phải là email!')
        .required('Không được bỏ trống!'),
    contactThreeLink: yup
        .string()
        .required('Không được bỏ trống!'),
});

export const footerSupportSchema = yup.object().shape({
    supportOne: yup
        .string()
        .required('Không được bỏ trống!'),
    supportOneLink: yup
        .string()
        .required('Không được bỏ trống!'),
    // supportTwo: yup
    //     .string()
    //     .required('Không được bỏ trống!'),
    // supportTwoLink: yup
    //     .string()
    //     .required('Không được bỏ trống!')
});
