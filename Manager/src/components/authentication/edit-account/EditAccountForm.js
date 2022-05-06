import { useNavigate } from 'react-router-dom';
import { Stack, TextField, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormikProvider, Form, useFormik } from 'formik';
import { useConfirm } from 'material-ui-confirm';

// hooks
import useAuth from '../../../hooks/useAuth';
// utils
import { editAccountSchema } from '../../../utils/yupSchemas';
// path
import { PATH_AUTHENTICATION } from '../../../routes/path';

const EditAccountForm = () => {
    const navigate = useNavigate();
    const confirm = useConfirm();
    const { editAccount } = useAuth();
    const formik = useFormik({
        initialValues: {
            email: '',
            newEmail: '',
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: ''
        },
        validationSchema: editAccountSchema,
        onSubmit: async (values, { setErrors, resetForm }) => {
            try {
                await confirm({
                    title: 'Cập nhật tài khoản',
                    content: <Alert severity='info'>Yêu cầu đăng nhập lại sau khi cập nhật tài khoản!</Alert>
                });
                const res = await editAccount(values.email, values.newEmail, values.oldPassword, values.newPassword, values.newPasswordConfirm);
                if (res) {
                    setErrors({ afterSubmit: res.message });
                    return;
                }
                navigate(PATH_AUTHENTICATION.login);
            } catch (error) {
                console.log(error);
                resetForm();
            }
        }
    });
    const { getFieldProps, isSubmitting, touched, errors } = formik;
    return (
        <FormikProvider value={formik}>
            <Form>
                <Stack
                    spacing={2}
                    sx={{ width: '385px' }}
                >
                    <TextField
                        fullWidth
                        label='Email cũ'
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    <TextField
                        fullWidth
                        label='Email mới'
                        {...getFieldProps('newEmail')}
                        helperText='Chỉ điền trường này nếu muốn cập nhật Email!'
                    />
                    <TextField
                        fullWidth
                        label='Mật khẩu cũ'
                        type='password'
                        {...getFieldProps('oldPassword')}
                        error={Boolean(touched.oldPassword && errors.oldPassword)}
                        helperText={touched.oldPassword && errors.oldPassword}
                    />
                    <TextField
                        fullWidth
                        label='Mật khẩu mới'
                        type='password'
                        {...getFieldProps('newPassword')}
                        error={Boolean(touched.newPassword && errors.newPassword)}
                        helperText={touched.newPassword && errors.newPassword}
                    />
                    <TextField
                        fullWidth
                        label='Nhập lại mật khẩu mới'
                        type='password'
                        {...getFieldProps('newPasswordConfirm')}
                        error={Boolean(touched.newPasswordConfirm && errors.newPasswordConfirm)}
                        helperText={touched.newPasswordConfirm && errors.newPasswordConfirm}
                    />
                    {errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit}</Alert>}
                    <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                        Cập nhật
                    </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider>
    );
};

export default EditAccountForm;
