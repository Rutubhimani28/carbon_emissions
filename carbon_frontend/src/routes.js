import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
// import User from './pages/user/User'
import User from './pages/user/User'
import UserView from './pages/user/View'
import DashboardAppPage from './pages/DashboardAppPage';
import ImportView from './components/Import/ImportView';
import UserLayout from './layouts/user';
import Services from './layouts/user/components/services/index'
import DigitalContent from './pages/digitalContent';
import F2fEvent from './pages/f2fEvent';
import VirtualEvent from './pages/virtualEvent';
import AirFreight from './pages/airFreight';
import ContactUs from './pages/contactUs/ContactUs';
import Events from './pages/events/Events';
import Production from './pages/production';
import Food from './pages/food';
import Energy from './pages/energy';
import AirTravel from './pages/airTravel';
import Transportation from './pages/transportation';
import Accomodation from './pages/accomodation';
import Waste from './pages/waste';
import ToolHome from './pages/tool';
import DigitalCampaign from './pages/digitalCampaign/index';
import TermConditions from './layouts/user/components/termCondition/termConditions';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/home" />, index: true },
        { element: <Navigate to="/dashboard/f2f-event" />, index: true },
        { element: <Navigate to="/dashboard/virtual-event" />, index: true },
        { element: <Navigate to="/dashboard/campaign" />, index: true },
        { element: <Navigate to="/dashboard/user" />, index: true },
        // { path: 'app', element: <DashboardAppPage /> },
        // { path: 'user', element: <User /> },
        // { path: 'user/view/:id', element: <UserView /> },
        // { path: ':view/import', element: <ImportView /> },
        // { path: 'digitalContent', element: <DigitalContent /> },
        // { path: 'production', element: <Production /> },
        // { path: 'food', element: <Food /> },
        // { path: 'energy', element: <Energy /> },
        // { path: 'airTravel', element: <AirTravel /> },
        // { path: 'transportation', element: <Transportation /> },
        // { path: 'accomodation', element: <Accomodation /> },
        // { path: 'waste', element: <Waste /> },
        // { path: 'airFreight', element: <AirFreight /> },
        { path: 'home', element: <ToolHome /> },
        { path: 'f2f-event', element: <F2fEvent /> },
        { path: 'virtual-event', element: <VirtualEvent /> },
        { path: 'campaign', element: <DigitalCampaign /> },
        { path: 'user', element: <User /> },
        { path: 'terms-conditions', element: <TermConditions /> },
        // { path: 'contactUs', element: <ContactUs /> },
        // { path: 'events', element: <Events /> },
      ],
    },
    { path: '/', element: <UserLayout /> },
    { path: '/netzero-platform', element: <Services /> },
    {
      element: <SimpleLayout />,
      children: [
        // { path: '*', element: <Navigate to="/dashboard/f2f-event" />, index: true },  // Prev
        // { path: 'home', element: <Navigate to="/dashboard/home" />, index: true },
        { path: 'f2f-event', element: <Navigate to="/dashboard/f2f-event" />, index: true },
        { path: 'virtual-event', element: <Navigate to="/dashboard/virtual-event" />, index: true },
        { path: 'campaign', element: <Navigate to="/dashboard/campaign" />, index: true },
        { path: 'user', element: <Navigate to="/dashboard/user" />, index: true },
        { path: 'terms-conditions', element: <Navigate to="/dashboard/terms-conditions" />, index: true },
        // { path: '404', element: <Page404 /> },
        // { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}
