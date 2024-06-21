import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { styled } from '@mui/material/styles';
//
// import { fetchCustomFieldData } from '../../redux/slice/customFieldSlice';
import Header from './header';
import Nav from './nav';
// import banner from '../user/assets/images/home_banner.jpg';
import banner from '../user/assets/images/NetZero Tool Pic.jpeg';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  background: "#1f9e6d",
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  // paddingBottom: theme.spacing(10),
  // paddingTop: APP_BAR_MOBILE + 24,
  paddingTop: APP_BAR_MOBILE + 18,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('lg')]: {
    // paddingTop: APP_BAR_DESKTOP + 24,
    // paddingLeft: theme.spacing(2.5),
    // paddingRight: theme.spacing(2.5),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  // const dispatch = useDispatch();

  // const customFieldData = useSelector((state) => state?.customFieldDetails);

  // useEffect(async () => {
  //   await dispatch(fetchCustomFieldData());
  // }, []);

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      {/* <Nav openNav={open} onCloseNav={() => setOpen(false)} /> */}

      <Main>
        <div style={{ display: 'flex', marginBottom: "10px", overflow: 'hidden', alignItems: 'center', justifyContent: 'center', height: '600px' }}>
          <img src={banner} alt="top_img" width="100%" />
        </div>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
