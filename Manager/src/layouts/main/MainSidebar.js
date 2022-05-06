import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Drawer } from '@mui/material';

// components
import Hidden from '../../components/Hidden';
import SidebarSection from '../../components/SidebarSection';
import Logo from '../../components/Logo';
// 
import SIDEBAR_CONFIG from './SidebarConfig';

const DRAWER_WIDTH = 280;

const propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func
};

const MainSidebar = ({ isOpenSidebar, onCloseSidebar }) => {
    const drawerStyle = {
        width: DRAWER_WIDTH,
        bgcolor: 'background.default',
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    };
    const renderContent = (
        <>
            <Box sx={{ px: 2.5, py: 5, textAlign: 'center' }}>
                <Logo />
            </Box>

            <SidebarSection navConfig={SIDEBAR_CONFIG} />
        </>
    );
    return (
        <RootStyle>
            <Hidden width='lgUp'>
                <Drawer
                    open={isOpenSidebar}
                    onClose={onCloseSidebar}
                    PaperProps={{
                        sx: { ...drawerStyle }
                    }}
                >
                    {renderContent}
                </Drawer>
            </Hidden>
            <Hidden width='lgDown'>
                <Drawer
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: { ...drawerStyle }
                    }}
                >
                    {renderContent}
                </Drawer>
            </Hidden>
        </RootStyle>
    );
};

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
    }
}));

MainSidebar.propTypes = propTypes;

export default MainSidebar;
