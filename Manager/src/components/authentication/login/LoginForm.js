import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Stack, TextField, Alert, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormikProvider, Form, useFormik } from 'formik';

// hooks
import useAuth from '../../../hooks/useAuth';
// utils
import { loginSchema } from '../../../utils/yupSchemas';
// path
import { PATH_DASHBOARD, PATH_AUTHENTICATION } from '../../../routes/path';

const LoginForm = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { login } = useAuth();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: async (values, { setErrors, resetForm }) => {
            try {
                const res = await login(values.email, values.password);
                if (res) {
                    setErrors({ afterSubmit: res.message });
                    return;
                }
                const path = state?.from ? state.from : PATH_DASHBOARD.root;
                navigate(path, { replace: true });
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
                        label='Email'
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    <TextField
                        fullWidth
                        label='Mật khẩu'
                        type='password'
                        {...getFieldProps('password')}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                    <Stack direction='row' alignItems='center' justifyContent='end'>
                        <Link
                            variant='overline'
                            component={RouterLink}
                            to={PATH_AUTHENTICATION.resetPassword}
                            sx={{ fontStyle: 'italic' }}
                        >
                            Quên mật khẩu
                        </Link>
                    </Stack>
                    {errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit}</Alert>}
                    <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                        Đăng nhập
                    </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider>
    );
};

export default LoginForm;
