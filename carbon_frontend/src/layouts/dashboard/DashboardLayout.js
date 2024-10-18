import { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { RiRobot2Fill } from "react-icons/ri";
import { styled } from '@mui/material/styles';
//
// import { fetchCustomFieldData } from '../../redux/slice/customFieldSlice';
import Header from './header';
import Nav from './nav';
import ToolHome from '../../pages/tool';
import F2fEvent from '../../pages/f2fEvent';
import VirtualEvent from '../../pages/virtualEvent';
import PrEvent from '../../pages/prEvent';
import DigitalCampaign from '../../pages/digitalCampaign';
import TermConditions from '../user/components/termCondition/termConditions';
import User from '../../pages/user/User';
import RetrieveEventsData from '../../pages/retrieveEvents/index';
// import User from '../../pages/user/index';

// import banner from '../user/assets/images/home_banner.jpg';
import banner from '../user/assets/images/NetZero Tool Pic.jpeg';
import Bot from '../user/components/bot';

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
  const [openBot, setOpenBot] = useState(false);
  const handleCloseBot = () => setOpenBot(false);

  const toolDataToolDetails = useSelector((state) => state.toolDetails);
  const toolData = useSelector((state) => state.toolDetails?.data);
  const toolFormData = toolData.find((item) => item?.type === "toolForm");
  const userdata = JSON.parse(sessionStorage.getItem('user'));

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
        {/* <div style={{ display: 'flex', marginBottom: "10px", overflow: 'hidden', alignItems: 'center', justifyContent: 'center', height: '600px' }}>
          <img src={banner} alt="top_img" width="100%" />
        </div> */}
        {/* <Outlet /> */}
        <Routes>
          <Route path="*" element={<Navigate to="/dashboard/home" />} />
          <Route path="/dashboard/home" element={<ToolHome />} />
          <Route path="/dashboard/retrieve-events" element={<RetrieveEventsData />} />
          <Route path="/dashboard/terms-conditions" element={<TermConditions />} />
          {
            (toolFormData?.isSubmited) &&
            <>
              <Route path="/dashboard/f2f-event" element={<F2fEvent />} />
              <Route path="/dashboard/virtual-event" element={<VirtualEvent />} />
              <Route path="/dashboard/pr-event" element={<PrEvent />} />
              <Route path="/dashboard/campaign" element={<DigitalCampaign />} />
            </>
          }
          {
            (userdata?.role === 'admin') &&
            <>
              <Route path="/dashboard/user" element={<User />} />
            </>
          }
        </Routes>

        <button
          onClick={() => setOpenBot(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: '1000',
            padding: '5px',
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '30%',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: 'none'
          }}>
          <RiRobot2Fill style={{ fontSize: '3rem', color: '#007BFF' }} />
        </button>
        <Bot openBot={openBot} handleCloseBot={handleCloseBot} subject='NetZero Platform- Customer Query' />

      </Main>
    </StyledRoot>
  );
}
