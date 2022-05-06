import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Grid, Stack, Card, Typography, TextField, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormikProvider, Form, useFormik } from 'formik';
import { useDispatch } from 'react-redux';

// upload
import UploadSingleFile from '../upload/UploadSingleFile';
// slices
import { insertArchitect, editArchitect } from '../../redux/slices/architect';
// utils
import { createArchitectSchema } from '../../utils/yupSchemas';
import { fDate } from '../../utils/formatDate';
// path
import { PATH_DASHBOARD } from '../../routes/path';

const propTypes = {
    isEdit: PropTypes.bool,
    architect: PropTypes.object
};

const ArchitectForm = ({ isEdit, architect }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: architect?.name || '',
            image: architect?.image || null,
            subtitle: architect?.subtitle || ''
        },
        validationSchema: createArchitectSchema,
        onSubmit: async (values, { resetForm }) => {
            const { name, image, subtitle } = values;
            var formData = new FormData();
            formData.append('name', name);
            formData.append('image', image.file);
            formData.append('subtitle', subtitle);
            if (isEdit) {
                dispatch(editArchitect({
                    architectId: architect._id,
                    formData
                }));
                navigate(PATH_DASHBOARD.architect.list);
            } else {
                dispatch(insertArchitect(formData));
                resetForm();
            }
        }
    });
    const { values, setFieldValue, getFieldProps, isSubmitting, touched, errors } = formik;
    const handleDrop = acceptedFiles => {
        const file = acceptedFiles[0];
        if (file) {
            setFieldValue('image', {
                file,
                preview: URL.createObjectURL(file)
            });
        }
    };
    return (
        <FormikProvider value={formik}>
            <Form>
                <Grid container spacing={3} mt={1}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ py: 10, px: 3 }}>
                            <div>
                                <UploadSingleFile
                                    accept='image/*'
                                    file={values.image}
                                    onDrop={handleDrop}
                                    caption={
                                        <Typography
                                            variant='caption'
                                            sx={{
                                                my: 2,
                                                mx: 'auto',
                                                display: 'block',
                                                textAlign: 'center',
                                                color: 'text.secondary'
                                            }}
                                        >
                                            Chỉ *.jpeg, *.jpg, *.png, *.gif
                                            <br />Tối đa 1MB
                                        </Typography>
                                    }
                                    sx={{
                                        width: 184,
                                        height: 184,
                                        borderRadius: '50%',
                                        '& > div': {
                                            borderRadius: '50%'
                                        }
                                    }}
                                />
                                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                                    {Boolean(touched.image && errors.image) && errors.image}
                                </FormHelperText>
                            </div>
                            {isEdit && architect && <Typography variant='caption'>Cập nhật lần cuối: <br /> {fDate(architect.updatedAt)}</Typography>}
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Card sx={{ p: 3 }}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label='Tên kiến trúc sư'
                                    {...getFieldProps('name')}
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                                <TextField
                                    fullWidth
                                    label='Chuyên môn'
                                    {...getFieldProps('subtitle')}
                                    error={Boolean(touched.subtitle && errors.subtitle)}
                                    helperText={touched.subtitle && errors.subtitle}
                                />
                                <Stack alignItems='end'>
                                    <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                                        {isEdit ? 'Lưu' : 'Thêm'}
                                    </LoadingButton>
                                </Stack>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider>
    );
};

ArchitectForm.propTypes = propTypes;

export default ArchitectForm;
