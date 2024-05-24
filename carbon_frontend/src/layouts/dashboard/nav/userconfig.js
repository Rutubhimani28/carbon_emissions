// component
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;


const UserConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Lead Management',
    path: '/dashboard/lead',
    icon: icon('ic_lead'),
  },
  {
    title: 'Contact Management',
    path: '/dashboard/contact',
    icon: icon('ic_contact'),
  },
  {
    title: 'Policy Management',
    path: '/dashboard/policy',
    icon: icon('ic_policy'),
  },
  {
    title: 'Tasks',
    path: '/dashboard/task',
    icon: icon('ic_task'),
  },
  {
    title: 'Meetings',
    path: '/dashboard/meeting',
    icon: icon('ic_meeting'),
  },
  {
    title: 'Calls',
    path: '/dashboard/call',
    icon: icon('ic_call'),
  },
  {
    title: 'Emails',
    path: '/dashboard/email',
    icon: icon('ic_email'),
  },
  {
    title: 'SMS',
    path: '/dashboard/sms',
    icon: icon('sms'),
  },
  {
    title: 'Email Template',
    path: '/dashboard/emailtemplate',
    icon: icon('ic_emailTemplate'),
  },
  {
    title: 'SMS Template',
    path: '/dashboard/smstemplate',
    icon: icon('sms'),
  },
  {
    title: 'Calendar',
    path: '/dashboard/calendar',
    icon: icon('ic_calendar'),
  },
  {
    title: 'Document Management',
    path: '/dashboard/document',
    icon: icon('ic_document'),
  },
  {
    title: 'Payment',
    path: '/dashboard/payment',
    icon: <PaymentsRoundedIcon />,
  },
];

export default UserConfig;
