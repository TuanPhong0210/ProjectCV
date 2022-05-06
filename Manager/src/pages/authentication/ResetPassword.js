import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import { ResetPasswordForm } from '../../components/authentication/reset-password';

const ResetPassword = () => (
    <Page title='Cài lại mật khẩu | A7 Studio'>
        <RootStyle>
            <Stack alignItems='center'>
                <Logo sx={{ width: '70px', height: '70px' }} />
                <Typography variant='subtitle2' my={1}>Cài lại mật khẩu</Typography>
                <ResetPasswordForm />
            </Stack>
        </RootStyle>
    </Page>
);

const RootStyle = styled('div')({
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

export default ResetPassword;
