import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormikProvider, Form, useFormik } from 'formik';

// apis
import menuApi from '../../apis/menuApi';
// hooks
import useSnackbar from '../../hooks/useSnackbar';
// utils
import { menuSchema } from '../../utils/yupSchemas';

const MenuItems = ({ menus }) => {
    const { setSnackbar } = useSnackbar();
    const formik = useFormik({
        initialValues: {
            navOne: menus.filter(menu => menu.key === 'navOne')[0]?.title || '',
            navTwo: menus.filter(menu => menu.key === 'navTwo')[0]?.title || '',
            navThree: menus.filter(menu => menu.key === 'navThree')[0]?.title || '',
        },
        validationSchema: menuSchema,
        onSubmit: async values => {
            const { navOne, navTwo, navThree } = values;
            const data = [
                {
                    key: 'navOne',
                    title: navOne
                },
                {
                    key: 'navTwo',
                    title: navTwo
                },
                {
                    key: 'navThree',
                    title: navThree
                }
            ];
            const res = await menuApi.edit(data);
            const { statusText, message } = res;
            setSnackbar({
                isOpen: true,
                type: statusText,
                message: message,
                anchor: 'bottom-center'
            });
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
                        variant='standard'
                        label='Điều hướng 1'
                        {...getFieldProps('navOne')}
                        error={Boolean(touched.navOne && errors.navOne)}
                        helperText={touched.navOne && errors.navOne}
                    />
                    <TextField
                        fullWidth
                        variant='standard'
                        label='Điều hướng 2'
                        {...getFieldProps('navTwo')}
                        error={Boolean(touched.navTwo && errors.navTwo)}
                        helperText={touched.navTwo && errors.navTwo}
                    />
                    <TextField
                        fullWidth
                        variant='standard'
                        label='Điều hướng 3'
                        {...getFieldProps('navThree')}
                        error={Boolean(touched.navThree && errors.navThree)}
                        helperText={touched.navThree && errors.navThree}
                    />
                    <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                        Lưu
                    </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider>
    );
};

export default MenuItems;
