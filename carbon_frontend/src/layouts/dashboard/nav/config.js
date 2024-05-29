// component
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import SvgColor from '../../../components/svg-color';
import Result from '../../../assets/result.png'
import digitalContent from '../../../assets/Digital.png'
import dashboard from '../../../assets/dashboard.png'
import AirFreight from '../../../assets/Travel.png'
import contact from '../../../assets/contact.png'

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;


const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: <img src={dashboard} alt='dashboard' width={25} />,
  },
  {
    title: 'Air freight',
    path: '/dashboard/airfreight',
    icon: <img src={AirFreight} alt='Result' width={30} />,
  },
  {
    title: 'Digital Content',
    path: '/dashboard/digitalContent',
    icon: <img src={digitalContent} alt='digitalContent' width={30} />,
  },
  {
    title: 'Calculation',
    path: '/dashboard/calculation',
    icon: <img src={Result} alt='Result' width={30} />,
  },
  {
    title: 'contactUs',
    path: '/dashboard/contactUs',
    icon: <img src={contact} alt='Result' width={30} />,
  },
  {
    title: 'Events',
    path: '/dashboard/events',
    icon: <img src={contact} alt='Result' width={30} />,
  },
  // {
  //   title: 'User Management',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'Lead Management',
  //   path: '/dashboard/lead',
  //   icon: icon('ic_lead'),
  // },
  // {
  //   title: 'Contact Management',
  //   path: '/dashboard/contact',
  //   icon: icon('ic_contact'),
  // },
  // {
  //   title: 'Policy Management',
  //   path: '/dashboard/policy',
  //   icon: icon('ic_policy'),
  // },
  // {
  //   title: 'Tasks',
  //   path: '/dashboard/task',
  //   icon: icon('ic_task'),
  // },
  // {
  //   title: 'Meetings',
  //   path: '/dashboard/meeting',
  //   icon: icon('ic_meeting'),
  // },
  // {
  //   title: 'Calls',
  //   path: '/dashboard/call',
  //   icon: icon('ic_call'),
  // },
  // {
  //   title: 'Emails',
  //   path: '/dashboard/email',
  //   icon: icon('ic_email'),
  // },
  // {
  //   title: 'SMS',
  //   path: '/dashboard/sms',
  //   icon: icon('sms'),
  // },
  // {
  //   title: 'Email Template',
  //   path: '/dashboard/emailtemplate',
  //   icon: icon('ic_emailTemplate'),
  // },
  // {
  //   title: 'SMS Template',
  //   path: '/dashboard/smstemplate',
  //   icon: icon('sms'),
  // },
  // {
  //   title: 'Calendar',
  //   path: '/dashboard/calendar',
  //   icon: icon('ic_calendar'),
  // },
  // {
  //   title: 'Document Management',
  //   path: '/dashboard/document',
  //   icon: icon('ic_document'),
  // },
  // {
  //   title: 'Payment',
  //   path: '/dashboard/payment',
  //   icon: <PaymentsRoundedIcon />,
  // },


  // {
  //   title: 'History',
  //   path: '/dashboard/history',
  //   icon: icon('ic_history'),
  // },

];

export default navConfig;
