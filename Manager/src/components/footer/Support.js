import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormikProvider, Form, useFormik } from 'formik';

// apis
import footerApi from '../../apis/footerApi';
// hooks
import useSnackbar from '../../hooks/useSnackbar';
// utils
import { footerSupportSchema } from '../../utils/yupSchemas';

const Support = ({ support }) => {
    const { setSnackbar } = useSnackbar();
    const formik = useFormik({
        initialValues: {
            supportOne: 'GOOGLE MAP',
            // supportOne: support[0]?.title || '',
            supportOneLink: support[0]?.link || '',
            // supportTwo: support[1]?.title || '',
            // supportTwoLink: support[1]?.link || '',
        },
        validationSchema: footerSupportSchema,
        onSubmit: async values => {
            const { supportOne, supportOneLink } = values;
            // const { supportOne, supportOneLink, supportTwo, supportTwoLink } = values;
            const support = [
                {
                    title: supportOne,
                    link: supportOneLink
                },
                // {
                //     title: supportTwo,
                //     link: supportTwoLink
                // }
            ];
            const res = await footerApi.editSupport({
                support
            })
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
                >
                    {/* <Typography variant='subtitle2'>Google Map</Typography> */}
                    <Stack
                        direction='row'
                        alignItems='center'
                    >
                        {/* <TextField
                            fullWidth
                            variant='standard'
                            disabled
                            {...getFieldProps('supportOne')}
                            error={Boolean(touched.supportOne && errors.supportOne)}
                            helperText={touched.supportOne && errors.supportOne}
                        /> */}
                        <TextField
                            fullWidth
                            variant='standard'
                            label='Liên kết google map'
                            {...getFieldProps('supportOneLink')}
                            error={Boolean(touched.supportOneLink && errors.supportOneLink)}
                            helperText={touched.supportOneLink && errors.supportOneLink}
                        />
                    </Stack>
                    {/* <Stack
                        direction='row'
                        alignItems='center'
                        spacing={2}
                    >
                        <TextField
                            fullWidth
                            variant='standard'
                            label='Tiêu đề 2'
                            {...getFieldProps('supportTwo')}
                            error={Boolean(touched.supportTwo && errors.supportTwo)}
                            helperText={touched.supportTwo && errors.supportTwo}
                        />
                        <TextField
                            fullWidth
                            variant='standard'
                            label='Liên kết 2'
                            {...getFieldProps('supportTwoLink')}
                            error={Boolean(touched.supportTwoLink && errors.supportTwoLink)}
                            helperText={touched.supportTwoLink && errors.supportTwoLink}
                        />
                    </Stack> */}
                    <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                        Lưu
                    </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider>
    );
};

export default Support;
