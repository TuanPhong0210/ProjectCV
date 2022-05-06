import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, Tooltip, IconButton, Alert } from '@mui/material';
import { ListOutlined, Logout, VpnKey } from '@mui/icons-material';
import { useConfirm } from 'material-ui-confirm';

// components
import Hidden from '../../components/Hidden';
// hooks
import useAuth from '../../hooks/useAuth';
// path
import { PATH_AUTHENTICATION } from '../../routes/path';

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const propTypes = {
    onOpenSidebar: PropTypes.func
};

const MainAppbar = ({ onOpenSidebar }) => {
    const navigate = useNavigate();
    const confirm = useConfirm();
    const { logout } = useAuth();
    const handleLogout = async () => {
        try {
            await confirm({
                title: 'Bạn có chắc muốn thoát?',
                content: <Alert severity='error'>Sau khi thoát sẽ yêu cầu đăng nhập nếu truy cập lại!</Alert>,
                confirmationButtonProps: {
                    color: 'error'
                }
            });
            await logout();
            navigate(PATH_AUTHENTICATION.login, { replace: true });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <RootStyle>
            <ToolbarStyle>
                <Hidden width='lgUp'>
                    <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
                        <ListOutlined />
                    </IconButton>
                </Hidden>
                <Box sx={{ flexGrow: 1 }} />
                <Stack
                    spacing={2}
                    direction='row'
                    alignItems='center'
                >
                    <Tooltip title='Cập nhật tài khoản'>
                        <IconButton onClick={() => navigate(PATH_AUTHENTICATION.editAccount)}>
                            <VpnKey />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Đăng xuất'>
                        <IconButton onClick={handleLogout}>
                            <Logout color='error' />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </ToolbarStyle>
        </RootStyle>
    );
};

const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    backgroundColor: alpha(theme.palette.background.default, 0.72),
    [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
    }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('lg')]: {
        minHeight: APPBAR_DESKTOP,
        padding: theme.spacing(0, 5)
    }
}));

MainAppbar.propTypes = propTypes;

export default MainAppbar;
