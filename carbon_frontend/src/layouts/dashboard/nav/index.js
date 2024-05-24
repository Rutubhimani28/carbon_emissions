
import { Box, Drawer, } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavSection from '../../../components/nav-section';
import Scrollbar from '../../../components/scrollbar';
import useResponsive from '../../../hooks/useResponsive';
import navConfig from './config';
import UserConfig from './userconfig';
import Logo from '../../user/assets/images/logo.png'
//
// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const navigate = useNavigate()

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  const home = () => {
    navigate('/dashboard/app')
  }

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex', cursor: "pointer" }} onClick={home}>
        <img src={Logo} width={120} style={{ marginLeft: "60px" }} alt='' />
      </Box>


      {
        user?.role === "user" ? <NavSection data={UserConfig} /> : <NavSection data={navConfig} />
      }


      <Box sx={{ flexGrow: 1 }} />


    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
