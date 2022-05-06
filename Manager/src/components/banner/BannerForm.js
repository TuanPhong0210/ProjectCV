import PropTypes from 'prop-types';
import { Grid, Stack, Box, Card, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormikProvider, Form, useFormik } from 'formik';

// apis
import bannerApi from '../../apis/bannerApi';
// upload
import UploadMultipleFile from '../upload/UploadMultipleFile';
// hooks
import useSnackbar from '../../hooks/useSnackbar';
// components
import Slick from '../slick/Slick';
import { settingBanners } from '../slick/SlickSettings';

const propTypes = {
    banners: PropTypes.object
};

const BannerForm = ({ banners }) => {
    const { setSnackbar } = useSnackbar();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            banners: banners?.banners || []
        },
        onSubmit: async values => {
            var formData = new FormData();
            values.banners.forEach(banner => {
                if (typeof banner === 'string') {
                    formData.append('bannersString', banner);
                } else {
                    formData.append('banners', banner);
                }
            });
            const res = await bannerApi.edit(formData);
            const { statusText, message } = res;
            setSnackbar({
                isOpen: true,
                type: statusText,
                message: message,
                anchor: 'bottom-center'
            });
        }
    });
    const { values, setFieldValue, isSubmitting } = formik;
    const handleDrop = acceptedFiles => {
        const files = acceptedFiles.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        );
        setFieldValue('banners', files);
    };
    const handleRemoveAll = () => {
        setFieldValue('banners', []);
    };

    const handleRemove = file => {
        const filteredFiles = values.banners.filter(_file => _file !== file);
        setFieldValue('banners', filteredFiles);
    };
    return (
        <FormikProvider value={formik}>
            <Form>
                <Grid container spacing={3} mt={1}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ py: 10, px: 3 }}>
                            <UploadMultipleFile
                                accept='image/*'
                                files={values.banners}
                                showPreview
                                onDrop={handleDrop}
                                onRemove={handleRemove}
                                onRemoveAll={handleRemoveAll}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Card sx={{ p: 3 }}>
                            <Stack spacing={3}>
                                <Typography variant='subtitle2'>Xem trước</Typography>
                                {values.banners.length > 0 && (
                                    <Slick settings={settingBanners}>
                                        {values.banners.map(banner => (
                                            <Box
                                                key={banner}
                                                component='img'
                                                src={typeof banner === 'string' ? `${process.env.REACT_APP_IMAGE_URL}/${banner}` : banner.preview}
                                                alt=''
                                            />
                                        ))}
                                    </Slick>
                                )}
                                {values.banners.length <= 0 && (
                                    <Stack alignItems='center'>
                                        <Typography variant='subtitle1'>Chọn hình để xem trước</Typography>
                                    </Stack>
                                )}
                                <Stack alignItems='end'>
                                    <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                                        Lưu
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

BannerForm.propTypes = propTypes;

export default BannerForm;
