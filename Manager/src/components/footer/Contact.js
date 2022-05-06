import { Stack, Typography, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormikProvider, Form, useFormik } from 'formik';

// apis
import footerApi from '../../apis/footerApi';
// hooks
import useSnackbar from '../../hooks/useSnackbar';
// utils
import { footerContactSchema } from '../../utils/yupSchemas';

const Contact = ({ contact }) => {
    const { setSnackbar } = useSnackbar();
    const formik = useFormik({
        initialValues: {
            contactOne: contact[0]?.title || '',
            contactOneLink: contact[0]?.link || '',
            contactTwo: contact[1]?.title || '',
            contactTwoLink: contact[1]?.link || '',
            contactThree: contact[2]?.title || '',
            contactThreeLink: contact[2]?.link || '',
        },
        validationSchema: footerContactSchema,
        onSubmit: async values => {
            const { contactOne, contactOneLink, contactTwo, contactTwoLink, contactThree, contactThreeLink } = values;
            const contact = [
                {
                    title: contactOne,
                    link: contactOneLink
                },
                {
                    title: contactTwo,
                    link: contactTwoLink
                },
                {
                    title: contactThree,
                    link: contactThreeLink
                }
            ];
            const res = await footerApi.editContact({
                contact
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
                    <Typography variant='subtitle2'>Liên hệ</Typography>
                    <Stack
                        direction='row'
                        alignItems='center'
                        spacing={2}
                    >
                        <TextField
                            fullWidth
                            variant='standard'
                            label='Địa chỉ'
                            {...getFieldProps('contactOne')}
                            error={Boolean(touched.contactOne && errors.contactOne)}
                            helperText={touched.contactOne && errors.contactOne}
                        />
                        <TextField
                            fullWidth
                            variant='standard'
                            label='Liên kết địa chỉ'
                            {...getFieldProps('contactOneLink')}
                            error={Boolean(touched.contactOneLink && errors.contactOneLink)}
                            helperText={touched.contactOneLink && errors.contactOneLink}
                        />
                    </Stack>
                    <Stack
                        direction='row'
                        alignItems='center'
                        spacing={2}
                    >
                        <TextField
                            fullWidth
                            variant='standard'
                            label='Số điện thoại'
                            {...getFieldProps('contactTwo')}
                            error={Boolean(touched.contactTwo && errors.contactTwo)}
                            helperText={touched.contactTwo && errors.contactTwo}
                        />
                        <TextField
                            fullWidth
                            variant='standard'
                            label='Liên kết số điện thoại'
                            {...getFieldProps('contactTwoLink')}
                            error={Boolean(touched.contactTwoLink && errors.contactTwoLink)}
                            helperText={touched.contactTwoLink && errors.contactTwoLink}
                        />
                    </Stack>
                    <Stack
                        direction='row'
                        alignItems='center'
                        spacing={2}
                    >
                        <TextField
                            fullWidth
                            variant='standard'
                            label='Email'
                            {...getFieldProps('contactThree')}
                            error={Boolean(touched.contactThree && errors.contactThree)}
                            helperText={touched.contactThree && errors.contactThree}
                        />
                        <TextField
                            fullWidth
                            variant='standard'
                            label='Liên kết email'
                            {...getFieldProps('contactThreeLink')}
                            error={Boolean(touched.contactThreeLink && errors.contactThreeLink)}
                            helperText={touched.contactThreeLink && errors.contactThreeLink}
                        />
                    </Stack>
                    <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                        Lưu
                    </LoadingButton>
                </Stack>
            </Form>
        </FormikProvider>
    );
};

export default Contact;
