import { LoadingButton } from '@mui/lab';
import { Card, FormHelperText, Grid, Stack, TextField, Typography } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useConfirm } from 'material-ui-confirm';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// slices
import { insertNews, editNews } from '../../redux/slices/news';
// path
import { PATH_DASHBOARD } from '../../routes/path';
import { fDate } from '../../utils/formatDate';
// utils
import { createNewsSchema } from '../../utils/yupSchemas';
// editor
import QuillEditor from '../editor/quill';
// upload
import UploadSingleFile from '../upload/UploadSingleFile';


const propTypes = {
    isEdit: PropTypes.bool,
    news: PropTypes.object
};

const NewsForm = ({ isEdit, news }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const confirm = useConfirm();
    const descriptionRef = useRef(null);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: news?.title || '',
            image: news?.image || null,
            description: news?.description || ''
        },
        validationSchema: createNewsSchema,
        onSubmit: async (values, { resetForm }) => {
            const { title, image, description } = values;
            var formData = new FormData();
            formData.append('title', title);
            formData.append('image', image.file);
            formData.append('description', description);
            if (isEdit) {
                dispatch(editNews({
                    navigate,
                    path: PATH_DASHBOARD.news.list,
                    confirm,
                    newsId: news._id,
                    formData
                }));
            } else {
                dispatch(insertNews({
                    resetForm,
                    confirm,
                    formData
                }));
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
    const handleChange = value => {
        // Debounce
        if (descriptionRef.current) clearTimeout(descriptionRef.current);
        descriptionRef.current = setTimeout(() => {
            setFieldValue('description', value);
        }, 500);
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
                                    error={Boolean(touched.image && errors.image)}
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
                                />
                                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                                    {Boolean(touched.image && errors.image) && errors.image}
                                </FormHelperText>
                            </div>
                            {isEdit && news && <Typography variant='caption'>Cập nhật lần cuối: <br /> {fDate(news.updatedAt)}</Typography>}
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Card sx={{ p: 3 }}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label='Tiêu đề'
                                    {...getFieldProps('title')}
                                    error={Boolean(touched.title && errors.title)}
                                    helperText={touched.title && errors.title}
                                />
                                <div>
                                    <Typography variant='subtitle2'>Mô tả tin tức</Typography>
                                    <QuillEditor
                                        id='news-description'
                                        value={values.description}
                                        onChange={handleChange}
                                    />
                                </div>
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

NewsForm.propTypes = propTypes;

export default NewsForm;
