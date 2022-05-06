import { styled } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import { EditAccountForm } from '../../components/authentication/edit-account';

const EditAccount = () => (
    <Page title='Cập nhật tài khoản | A7 Studio'>
        <RootStyle>
            <Stack alignItems='center'>
                <Logo sx={{ width: '70px', height: '70px' }} />
                <Typography variant='subtitle2' my={1}>Cập nhật tài khoản</Typography>
                <EditAccountForm />
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

export default EditAccount;
