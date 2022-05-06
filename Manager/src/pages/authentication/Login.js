import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import { LoginForm } from '../../components/authentication/login';

const Login = () => (
    <Page title='Đăng nhập | A7 Studio'>
        <RootStyle>
            <Stack alignItems='center'>
                <Logo sx={{ width: '70px', height: '70px' }} />
                <Typography variant='subtitle2' my={1}>Đăng nhập A7 Studio</Typography>
                <LoginForm />
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

export default Login;
