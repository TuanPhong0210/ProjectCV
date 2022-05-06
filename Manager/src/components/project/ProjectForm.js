import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Stack, Card, Typography, TextField, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormikProvider, Form, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useConfirm } from 'material-ui-confirm';

// slices
import { insertProject, editProject } from '../../redux/slices/project';
// upload
import { UploadMultipleFile } from '../upload';
// editor
import QuillEditor from '../editor/quill';
// utils
import { createProjectSchema } from '../../utils/yupSchemas';
import { fDate } from '../../utils/formatDate';
// path
import { PATH_DASHBOARD } from '../../routes/path';
// 
import ProjectInCharge from './ProjectInCharge';

const propTypes = {
    isEdit: PropTypes.bool,
    project: PropTypes.object
};

const ProjectForm = ({ isEdit, project }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const confirm = useConfirm();
    const descriptionRef = useRef(null);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: project?.name || '',
            images: project?.images || [],
            architectId: project?.architectId || null,
            // subtitle: project?.subtitle || '',
            description: project?.description || '',
        },
        validationSchema: createProjectSchema,
        onSubmit: async (values, { resetForm }) => {
            const { name, images, architectId, description } = values;
            // const { name, images, architectId, subtitle, description } = values;
            var formData = new FormData();
            formData.append('name', name);
            images.forEach(image => {
                if (typeof image === 'string') {
                    formData.append('imagesString', image);
                } else {
                    formData.append('images', image);
                }
            });
            formData.append('architectId', architectId);
            // formData.append('subtitle', subtitle);
            formData.append('description', description);
            if (isEdit) {
                dispatch(editProject({
                    confirm,
                    navigate,
                    path: PATH_DASHBOARD.project.list,
                    projectId: project._id,
                    formData
                }));
            } else {
                dispatch(insertProject({
                    confirm,
                    resetForm,
                    formData
                }));
            }
        }
    });
    const { values, setFieldValue, getFieldProps, isSubmitting, touched, errors } = formik;
    const handleDrop = acceptedFiles => {
        const files = acceptedFiles.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        );
        setFieldValue('images', files);
    };
    const handleSelect = architect => {
        setFieldValue('architectId', architect?._id || null);
    };
    const handleRemoveAll = () => {
        setFieldValue('images', []);
    };

    const handleRemove = file => {
        const filteredFiles = values.images.filter(_file => _file !== file);
        setFieldValue('images', filteredFiles);
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
                        <Card sx={{ py: 10, px: 2 }}>
                            <div>
                                <UploadMultipleFile
                                    accept='image/*'
                                    files={values.images}
                                    showPreview
                                    onDrop={handleDrop}
                                    onRemove={handleRemove}
                                    onRemoveAll={handleRemoveAll}
                                />
                                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                                    {Boolean(touched.images && errors.images) && errors.images}
                                </FormHelperText>
                            </div>
                            {isEdit && project && <Typography variant='caption'>Cập nhật lần cuối: <br /> {fDate(project.updatedAt)}</Typography>}
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Card sx={{ p: 3 }}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label='Tên dự án'
                                    {...getFieldProps('name')}
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                                {/* <TextField
                                    fullWidth
                                    label='Tiêu đề phụ'
                                    {...getFieldProps('subtitle')}
                                    error={Boolean(touched.subtitle && errors.subtitle)}
                                    helperText={touched.subtitle && errors.subtitle}
                                /> */}
                                <div>
                                    <Typography variant='subtitle2'>Kiến trúc sư phụ trách</Typography>
                                    <ProjectInCharge architectId={values.architectId} handleSelect={handleSelect} />
                                    <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                                        {Boolean(touched.architectId && errors.architectId) && errors.architectId}
                                    </FormHelperText>
                                </div>
                                <div>
                                    <Typography variant='subtitle2'>Mô tả dự án</Typography>
                                    <QuillEditor
                                        id='project-description'
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

ProjectForm.propTypes = propTypes;

export default ProjectForm;
