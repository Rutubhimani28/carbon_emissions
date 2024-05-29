import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import User from './pages/user/User'
import UserView from './pages/user/View'
import DashboardAppPage from './pages/DashboardAppPage';
import ImportView from './components/Import/ImportView';
import UserLayout from './layouts/user';
import Services from './layouts/user/components/services/index'
import DigitalContent from './pages/digitalContent';
import Calculation from './pages/calculation';
import AirFreight from './pages/airFreight';
import ContactUs from './pages/contactUs/ContactUs';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <User /> },
        { path: 'user/view/:id', element: <UserView /> },
        { path: ':view/import', element: <ImportView /> },
        { path: 'digitalContent', element: <DigitalContent /> },
        { path: 'airFreight', element: <AirFreight /> },
        { path: 'calculation', element: <Calculation /> },
        { path: 'contactUs', element: <ContactUs /> },
      ],
    },
    { path: '/', element: <UserLayout /> },
    { path: '/measure-ghg-emissions', element: <Services /> },
    {
      element: <SimpleLayout />,
      children: [
        { path: '*', element: <Navigate to="/dashboard/app" />, index: true },
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
