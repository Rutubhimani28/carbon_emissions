import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  FormLabel,
} from '@mui/material';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { saveAs } from 'file-saver';
import { useFormik } from 'formik';
import moment from 'moment';
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { CiExport } from 'react-icons/ci';
import { IoIosArrowDown } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select, { components } from 'react-select';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import * as yup from 'yup';
// import TableStyle from '../../components/TableStyle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import TableStyle from '../../components/TableStyle';
import { fetchEventsEmissionsData } from '../../redux/slice/eventsEmissionsDataSlice';
import { apiget, apipost, apipostBlob } from '../../service/api';
import { commonUtils } from '../../utils/utils';
import 'react-toastify/dist/ReactToastify.css';
// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// const previousEvents = [
//     { value: 'event1', label: 'Event 1 - Description goes here' },
//     { value: 'event2', label: 'Event 2 - Description goes here' },
//     { value: 'event3', label: 'Event 3 - Description goes here' },
//     { value: 'event4', label: 'Event 4 - Description goes here' },
// ];

const MyEventSelector = () => {
  const columns = [
    {
      field: 'activityName',
      headerName: 'Activity Name',
      width: 175,
    },
    {
      field: 'f2fEventTotalEmission',
      headerName: 'F2F Event Emission',
      width: 175,
    },
    {
      field: 'virtualEventTotalEmission',
      // "headerName": "Virtual Event Emission",
      headerName: 'Outdoor Marketing Emission',
      width: 175,
    },
    {
      field: 'prEventTotalEmission',
      headerName: 'PR Event Emission',
      width: 175,
    },
    {
      field: 'digitalCampaignTotalEmission',
      headerName: 'Digital Campaign Emission',
      width: 175,
    },
    {
      field: 'dateTime',
      headerName: 'Date/Time',
      width: 175,
      valueFormatter: (params) => {
        return params.value;
        // return dayjs(params.value).format('MM/DD/YYYY hh:mm');
      },
    },
    {
      field: 'budget',
      headerName: 'Budget ($)',
    },
    {
      field: 'createdBy',
      headerName: 'Created By',
      width: 175,
    },
  ];

  const csvColumns = [
    { Header: 'Activity Name', accessor: 'activityName' },
    { Header: 'F2F Event Emission', accessor: 'f2fEventTotalEmission' },
    { Header: 'Outdoor Marketing Emission', accessor: 'virtualEventTotalEmission' },
    { Header: 'PR Event Emission', accessor: 'prEventTotalEmission' },
    { Header: 'Digital Campaign Emission', accessor: 'digitalCampaignTotalEmission' },
    { Header: 'Date/Time', accessor: 'dateTime' },
    { Header: 'Budget ($)', accessor: 'budget' },
    { Header: 'Created By', accessor: 'createdBy' },
  ];
  const selectRef = useRef(null);

  const userid = sessionStorage.getItem('user_id');
  const userSessionData = sessionStorage.getItem('user');
  const userData = JSON.parse(userSessionData);
  const isAdmin = userData?.role === 'admin';
  // const isAdmin = false;
  const resultTableData = useSelector((state) => state.resultTableDataDetails);
  // const previousEvents = resultTableData?.userAllEventsData?.map((item) => ({ value: item._id, label: `${item?.activityName} - ${dayjs(item?.dateTime).format('MM/DD/YYYY hh:mm')}` }));

  const [isGraphLoading, setIsGraphLoading] = useState(false);
  const [isFieldsLoading, setIsFieldsLoading] = useState(false);
  const [previousAllAccounts, setPreviousAllAccounts] = useState([]);
  const [previousEvents, setPreviousEvents] = useState([]);
  const [selectedAccountPreviousEvents, setselectedAccountPreviousEvents] = useState([]); // for options

  const [userAction, setUserAction] = useState(null);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  const [emailInput, setEmailInput] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading } = useSelector((state) => state?.eventsEmissionsDetails);
  const [filteredTableData, setFilteredTableData] = useState(data);
  const [selectedData, setselectedData] = useState([]); // for options

  const [isopen, setIsOpen] = React.useState(false);
  const [range, setRange] = useState([null, null]);
  const [sDate, setSDate] = useState(null);
  const [eDate, setEDate] = useState(null); // for options

  const [emails, setEmails] = useState([]);
  const [emailsDate, setEmailsDate] = useState(emails || []);
  const [emailInputDate, setEmailInputDate] = useState('');
  const [isLoadingDate, setIsLoadingDate] = useState(false);

  const formatOptionLabel = ({ label }) => (
    <Typography noWrap title={label}>
      {label}
    </Typography>
  );

  const handleChange = (value) => {
    setRange(value);
  };

  const validationSchema = yup.object({
    addEmail: yup.string().email('Email not valid'),
    selectedAccount: yup
      .object()
      .required('Account is required')
      .test('is-not-null', 'Account is required', (value) => value !== null),
  });

  const dateValidationSchema = yup.object({
    emailInputDate: yup.string().email('Email not valid'),
    sDate: yup.string().nullable().required('Start Date is required'),
    eDate: yup
      .string()
      .nullable()
      .required('To Date is required')
      .test('is-greater', 'To Date must be greater than or equal to Start Date', (value, context) => {
        const sDate = context.parent.sDate;
        return !value || !sDate || value >= sDate;
      }),
  });

  const formik = useFormik({
    initialValues: {
      selectedEvents: [],
      emails: userData?.loginId ? [`${userData.loginId}`] : emails, // Safely handle undefined userData
      addEmail: '',
      selectedAccount: null,
    },
    validationSchema,
    validate: (values) => {
      const errors = {};
      if (values.selectedEvents.length < 2) {
        errors.selectedEvents = 'You must select at least 2 events';
      }
      if (values.selectedEvents.length > 2) {
        errors.selectedEvents = 'You can select a maximum of 2 events';
      }
      return errors;
    },
    onSubmit: (values) => {
      // Handle form submission
    },
  });

  // formik for Generate Date Report
  const formikDate = useFormik({
    initialValues: {
      selectedEvents: [],
      emailsDate: [`${userData.loginId}`],
      emailInputDate: '',
      addEmail: '',
      selectedAccount: null,
      sDate: null,
      eDate: null,
    },
    validationSchema: dateValidationSchema, // <-- Correctly assign the validation schema
    onSubmit: async (values) => {
      await handleGenerateReport();
    },
  });

  const addEmail = async (eventsData) => {
    setIsFieldsLoading(true);
    try {
      await apipost('api/email/add-email-for-two-events', { eventsData });
    } catch (error) {
      console.error('--- addEmail error ', error);
    }
    setIsFieldsLoading(false);
  };

  // send graphs data to genearet pdf and send to mail
  const addEmailForGraphs = async (payload) => {
    try {
      await apipost('api/email/addGraph', payload);
    } catch (error) {
      console.error('--- addEmail error ', error);
    }
  };

  const handleRetrieveCalculations = async () => {
    setIsFieldsLoading(true);
    const returnArr = [];

    const selectedValues = formik.values.selectedEvents.map((event) => event.value);

    const apiPath = `api/eventData?_id[]=${selectedValues.join('&_id[]=')}`;
    const response = await apiget(apiPath);
    const responseData = response.data.data;

    const virtualEventsDataCreate = (data) => {
      const dataTwo = [];

      data.forEach((item) => {
        const emissionsData = item?.vitrualEventAllData?.data?.[0]?.data;

        if (emissionsData && emissionsData.length > 0) {
          const obj = {
            totalTvAd: Number(emissionsData.find((i) => i?.name === 'TV Ad')?.emission) || 0,
            totalNewspaper: Number(emissionsData.find((i) => i?.name === 'Newspaper- Full page Ad')?.emission) || 0,
            totalMagazine: Number(emissionsData.find((i) => i?.name === 'Magazine')?.emission) || 0,
            totalPodcast: Number(emissionsData.find((i) => i?.name === 'Podcast')?.emission) || 0,
            totalPolyethylene: Number(emissionsData.find((i) => i?.name === 'Polyethylene HDPE Banner')?.emission) || 0,
            totalPVC: Number(emissionsData.find((i) => i?.name === 'PVC Banners')?.emission) || 0,
            grandTotal: Number(item?.vitrualEventAllData?.totalEmission).toFixed(2) || 0,
          };
          dataTwo.push(obj);
        } else {
          const obj = {
            totalTvAd: 0,
            totalNewspaper: 0,
            totalMagazine: 0,
            totalPodcast: 0,
            totalPolyethylene: 0,
            totalPVC: 0,
            grandTotal: 0,
          };
          dataTwo.push(obj);
        }
      });

      return dataTwo;
    };

    const dataOne = responseData?.map((item) => {
      return {
        totalAirTravel: Number(item?.airTravelAllData?.totalEmission).toFixed(2),
        totalLocalTransportation: Number(item?.localTranspotationAllData?.totalEmission).toFixed(2),
        totalHotel: Number(item?.hotelAllData?.totalEmission).toFixed(2),
        totalFood: Number(item?.foodAllData?.totalEmission).toFixed(2),
        totalAirFreight: Number(item?.airFreightAllData?.totalEmission).toFixed(2),
        totalProduction: Number(item?.productionAllData?.totalEmission).toFixed(2),
        totalEnergyUpdated: Number(item?.energyAllData?.totalEmission).toFixed(2),
        totalDigitalContent: Number(item?.digitalCommsAllData?.totalEmission).toFixed(2),
        totalWaste: Number(item?.wasteAllData?.totalEmission).toFixed(2),
        grandTotal: (
          Number(item?.airTravelAllData?.totalEmission || 0) +
          Number(item?.localTransportationAllData?.totalEmission || 0) +
          Number(item?.hotelAllData?.totalEmission || 0) +
          Number(item?.foodAllData?.totalEmission || 0) +
          Number(item?.airFreightAllData?.totalEmission || 0) +
          Number(item?.productionAllData?.totalEmission || 0) +
          Number(item?.energyAllData?.totalEmission || 0) +
          Number(item?.digitalCommsAllData?.totalEmission || 0) +
          Number(item?.wasteAllData?.totalEmission || 0)
        ).toFixed(2),
      };
    });

    const dataTwo = virtualEventsDataCreate(responseData);

    const dataThree = responseData?.map((item) => {
      return {
        totalComms: Number(item?.commsAllData?.totalEmission).toFixed(2),
        totalPrAgency: Number(item?.prAgencyAllData?.totalEmission).toFixed(2),
        totalHospitality: Number(item?.hospitalityAllData?.totalEmission).toFixed(2),
        grandTotal: (
          Number(item?.commsAllData?.totalEmission || 0) +
          Number(item?.prAgencyAllData?.totalEmission || 0) +
          Number(item?.hospitalityAllData?.totalEmission || 0)
        ).toFixed(2),
      };
    });

    const dataFour = responseData?.map((item) => {
      return {
        totalDigitalCampaign: Number(item?.digitalCampaignAllData?.totalEmission).toFixed(2),
        grandTotal: Number(item?.digitalCampaignAllData?.totalEmission).toFixed(2),
      };
    });

    // f2f-event
    dataOne.forEach((item, ind) => {
      if (Number(item?.grandTotal) > 0) {
        const obj = {
          dataOne: dataOne[ind],
          attachmentTemplateNameOne: 'f2f_event_retrieve_data_filled_fields_Template',
          totalTonCo2One: (Number(item?.grandTotal) / 1000).toFixed(2) || 0,
          eveydolarCo2One: (Number(item?.grandTotal) / Number(responseData[ind]?.budget)).toFixed(2) || 0,
          resultTableDataOne: {
            from: 'f2fEvent',
            allDataOfTab: responseData[ind]?.f2fEventData || [],
          },
          attachmentPdfNameOne: `F2F Event- ${responseData[ind]?.activityName}`,
          activityName: responseData[ind]?.activityName || '',
          budget: responseData[ind]?.budget || '',
          country: responseData[ind]?.country || '',
          dateTime: responseData[ind]?.dateTime || '',
          isAttachment: true,
          subject: `Total Carbon Footprint generated from ${responseData[0]?.activityName} and ${responseData[1]?.activityName} activity`,
          // receiver: [userData?.loginId],
          receiver: formik.values?.emails,
          sender: userid,
          name: userData?.cnctPerson,
        };

        returnArr[ind] = { ...returnArr[ind], ...obj };
      }
    });

    // virtual-event
    dataTwo.forEach((item, ind) => {
      if (Number(item?.grandTotal) > 0) {
        const obj = {
          dataTwo: dataTwo[ind],
          attachmentTemplateNameTwo: 'virtual_event_retrieve_data_filled_fields_Template',
          totalTonCo2Two: (Number(item?.grandTotal) / 1000).toFixed(2) || 0,
          eveydolarCo2Two: (Number(item?.grandTotal) / Number(responseData[ind]?.budget)).toFixed(2) || 0,
          resultTableDataTwo: {
            from: 'virtualEvent',
            allDataOfTab: responseData[ind]?.prEventData || [],
          },
          // attachmentPdfNameTwo: `Virtual Event- ${responseData[ind]?.activityName}`,
          attachmentPdfNameTwo: `Outdoor Marketing- ${responseData[ind]?.activityName}`,
          activityName: responseData[ind]?.activityName || '',
          budget: responseData[ind]?.budget || '',
          country: responseData[ind]?.country || '',
          dateTime: responseData[ind]?.dateTime || '',
          isAttachment: true,
          subject: `Total Carbon Footprint generated from ${responseData[0]?.activityName} and ${responseData[1]?.activityName} activity`,
          // receiver: [userData?.loginId],
          receiver: formik.values?.emails,
          sender: userid,
          name: userData?.cnctPerson,
        };
        returnArr[ind] = { ...returnArr[ind], ...obj };
      }
    });

    // pr-event
    dataThree.forEach((item, ind) => {
      if (Number(item?.grandTotal) > 0) {
        const obj = {
          dataThree: dataThree[ind],
          attachmentTemplateNameThree: 'pr_event_retrieve_data_filled_fields_Template',
          totalTonCo2Three: (Number(item?.grandTotal) / 1000).toFixed(2) || 0,
          eveydolarCo2Three: (Number(item?.grandTotal) / Number(responseData[ind]?.budget)).toFixed(2) || 0,
          resultTableDataThree: {
            from: 'prEvent',
            allDataOfTab: responseData[ind]?.prEventData || [],
          },
          attachmentPdfNameThree: `PR Event- ${responseData[ind]?.activityName}`,
          activityName: responseData[ind]?.activityName || '',
          budget: responseData[ind]?.budget || '',
          country: responseData[ind]?.country || '',
          dateTime: responseData[ind]?.dateTime || '',
          isAttachment: true,
          subject: `Total Carbon Footprint generated from ${responseData[0]?.activityName} and ${responseData[1]?.activityName} activity`,
          // receiver: [userData?.loginId],
          receiver: formik.values?.emails,
          sender: userid,
          name: userData?.cnctPerson,
        };

        returnArr[ind] = { ...returnArr[ind], ...obj };
      }
    });

    // digital-campaign
    dataFour.forEach((item, ind) => {
      if (Number(item?.grandTotal) > 0) {
        const obj = {
          dataFour: dataFour[ind],
          attachmentTemplateNameFour: 'digital_campaign_retrieve_data_filled_fields_Template',
          totalTonCo2Four: (Number(item?.grandTotal) / 1000).toFixed(2) || 0,
          eveydolarCo2Four: (Number(item?.grandTotal) / Number(responseData[ind]?.budget)).toFixed(2) || 0,
          resultTableDataFour: {
            from: 'digitalCampaign',
            allDataOfTab: responseData[ind]?.digitalCampaignData || [],
          },
          attachmentPdfNameFour: `Digital Campaign- ${responseData[ind]?.activityName}`,
          activityName: responseData[ind]?.activityName || '',
          budget: responseData[ind]?.budget || '',
          country: responseData[ind]?.country || '',
          dateTime: responseData[ind]?.dateTime || '',
          isAttachment: true,
          subject: `Total Carbon Footprint generated from ${responseData[0]?.activityName} and ${responseData[1]?.activityName} activity`,
          // receiver: [userData?.loginId],
          receiver: formik.values?.emails,
          sender: userid,
          name: userData?.cnctPerson,
        };

        returnArr[ind] = { ...returnArr[ind], ...obj };
      }
    });
    const filteredReturnArr = returnArr.filter((item) => item !== undefined && item !== null);

    // await addEmail(returnArr); // send all selected two events filled fields data as pdf
    await addEmail(filteredReturnArr); // send all selected two events filled fields data as pdf
    setIsFieldsLoading(false);
  };

  const handleRetrieveGraphs = async () => {
    setIsGraphLoading(true);
    const returnArr = [];
    const selectedValues = formik.values.selectedEvents.map((event) => event.value);

    const apiPath = `api/eventData?_id[]=${selectedValues.join('&_id[]=')}`;
    const response = await apiget(apiPath);
    const responseData = response?.data?.data;

    // count total emission by event wise
    const allEventsEmissions = [];

    responseData.forEach((event) => {
      // f2f-event
      const airTravelEmission = event?.airTravelAllData?.totalEmission;
      const localTranspotationEmission = event?.localTranspotationAllData?.totalEmission;
      const hotelEmission = event?.hotelAllData?.totalEmission;
      const foodEmission = event?.foodAllData?.totalEmission;
      const airFreightEmission = event?.airFreightAllData?.totalEmission;
      const productionEmission = event?.productionAllData?.totalEmission;
      const energyEmission = event?.energyAllData?.totalEmission;
      const digitalContentEmission = event?.digitalCommsAllData?.totalEmission;
      const wasteEmission = event?.wasteAllData?.totalEmission;

      // virtual-event
      const outboundMarketingEmission = event?.vitrualEventAllData?.totalEmission;

      // pr-event
      const commsEmission = event?.commsAllData?.totalEmission;
      const prAgencyEmission = event?.prAgencyAllData?.totalEmission;
      const hospitalityEmission = event?.hospitalityAllData?.totalEmission;

      // digital-campaign
      const digitalCampaignEmission = event?.digitalCampaignAllData?.totalEmission;

      const f2fEventTotalEmission = Number(
        Number(airTravelEmission || 0) +
          Number(localTranspotationEmission || 0) +
          Number(hotelEmission || 0) +
          Number(foodEmission || 0) +
          Number(airFreightEmission || 0) +
          Number(productionEmission || 0) +
          Number(energyEmission || 0) +
          Number(digitalContentEmission || 0) +
          Number(wasteEmission || 0)
      ).toFixed(2);
      const virtualEventTotalEmission = Number(outboundMarketingEmission || 0).toFixed(2);
      const prEventTotalEmission = Number(
        Number(commsEmission || 0) + Number(prAgencyEmission || 0) + Number(hospitalityEmission || 0)
      ).toFixed(2);
      const digitalCampaignTotalEmission = Number(digitalCampaignEmission || 0).toFixed(2);

      allEventsEmissions.push({
        f2fEventTotalEmission,
        virtualEventTotalEmission,
        prEventTotalEmission,
        digitalCampaignTotalEmission,
        activity: `${event?.activityName}-${moment(event?.dateTime).format('DD/MM/YYYY HH:mm')}`,
        // activity: `${event?.activityName} - ${dayjs(event?.dateTime).format('DD/MM/YYYY hh:mm')}`,
        eventId: event?._id,
      });
    });

    const payload = {
      allEventsEmissions,
      name: userData?.cnctPerson,
      activityName: `${responseData?.[0]?.activityName} and ${responseData?.[1]?.activityName}`,
      // receiver: [userData?.loginId],
      receiver: formik.values?.emails,
      subject: 'Retrieve Graphs',
      attachmentTemplateName: 'bar_chart',
      attachmentPdfName: `Marketing Activity Analytics`,
      emailBodyTemplateName: 'retrieve_graph_ebody_Template',
    };

    await addEmailForGraphs(payload);
    setIsGraphLoading(false);
  };

  const handleSelectionChange = (selectionModel) => {
    setSelectedRowIds(selectionModel);
  };

  const downloadCsvOrExcel = async (extension, selectedIds) => {
    if (selectedIds && selectedIds?.length > 0) {
      const selectedRecordsWithSpecificFileds = data
        ?.filter((rec) => selectedIds.includes(rec._id))
        ?.map((rec) => {
          const selectedFieldsData = {};
          csvColumns?.forEach((item) => {
            selectedFieldsData[item.accessor] = rec[item.accessor];
          });
          return selectedFieldsData;
        });
      commonUtils.convertJsonToCsvOrExcel({
        jsonArray: selectedRecordsWithSpecificFileds,
        csvColumns,
        fileName: 'All Users Events',
        extension,
        setSelectedRowIds,
      });
    } else {
      const AllRecordsWithSpecificFileds = data?.map((rec) => {
        const selectedFieldsData = {};
        csvColumns?.forEach((item) => {
          selectedFieldsData[item?.accessor] = rec[item?.accessor];
        });
        return selectedFieldsData;
      });
      commonUtils.convertJsonToCsvOrExcel({
        jsonArray: AllRecordsWithSpecificFileds,
        csvColumns,
        fileName: 'All Users EVents',
        extension,
        setSelectedRowIds,
      });
    }
  };

  const handleExportData = (extension) => {
    if (selectedRowIds && selectedRowIds?.length > 0) {
      downloadCsvOrExcel(extension, selectedRowIds);
    } else {
      downloadCsvOrExcel(extension);
    }
  };

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSDate(null);
    setEDate(null);
    setEmailInputDate('');
    formikDate.resetForm();
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (isopen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isopen]);

  const handleGenerateReport = async () => {
    const startDate = formikDate.values.sDate;
    const endDate = formikDate.values.eDate;
    const email = formikDate.values.emailsDate;
    const name = userData?.cnctPerson;

    setIsLoadingDate(true);

    try {
      const response = await apipost('api/eventData/events-data-find', { startDate, endDate, email, name });

      // Correct status check: if the response status is not 200
      if (response.status !== 201) {
        throw new Error('Failed to fetch the PDF');
      }
      handleClose();
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsLoadingDate(false); // Re-enable the button
    }
  };

  const removeTag = (index) => {
    // const newTags = [...emails];
    const newTags = [...formik.values?.emails];
    newTags.splice(index, 1);
    // setEmails(newTags);
    formik.setFieldValue('emails', newTags);
  };

  const removeEmailTag = (index) => {
    // const newTags = [...emails];
    const newTags = [...formikDate.values?.emailsDate];
    newTags.splice(index, 1);
    // setEmails(newTags);
    formikDate.setFieldValue('emailsDate', newTags);
  };

  const handleInputChange = (e) => {
    setEmailInput(e.target.value);
    formik.setFieldValue('addEmail', e.target.value);
    formik.setFieldTouched('addEmail', true);
  };

  const handleEmailInputChange = (event) => {
    setEmailInputDate(event.target.value);
    formikDate.setFieldValue('emailInputDate', event.target.value);
  };

  const addTagsButton = (e) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailInput !== '') {
      if (regex.test(emailInput)) {
        // if (emails?.find(email => email === emailInput)) {
        if (formik.values?.emails?.find((email) => email === emailInput)) {
          formik.setFieldError('addEmail', 'Email is already exists');
        } else {
          // setEmails([...emails, emailInput]);
          formik.setFieldValue('emails', [...formik.values?.emails, emailInput]);
          setEmailInput('');
        }
      } else {
        formik.setFieldError('addEmail', 'Email not valid');
      }
    }
  };

  const addTagButtonForDate = (e) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailInputDate !== '') {
      if (regex.test(emailInputDate)) {
        // if (emails?.find(email => email === emailInput)) {
        if (formikDate.values?.emailsDate?.find((email) => email === emailInputDate)) {
          formikDate.setFieldError('emailInputDate', 'Email is already exists');
          // formikDate.setFieldTouched('emailInputDate', true);
        } else {
          // setEmails([...emails, emailInput]);
          formikDate.setFieldValue('emailsDate', [...formikDate.values?.emailsDate, emailInputDate]);
          setEmailInputDate('');
          formikDate.setFieldValue('emailInputDate', '');
        }
      } else {
        formikDate.setFieldError('emailInputDate', 'Email not valid');
      }
    }
  };

  const CustomDropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <AddCircleOutlineIcon
          onClick={() => props.selectProps.onPlusClick()}
          style={{ marginRight: '8px', color: '#fff' }}
        />
        <div style={{ height: '16px', width: '1px', backgroundColor: '#fff', marginRight: '8px' }} />
        <IoIosArrowDown style={{ color: '#fff' }} />
      </div>
    </components.DropdownIndicator>
  );

  // const handlePlusClick = () => {
  //     if (selectRef.current) {
  //         selectRef.current.focus();
  //     }
  // };
  const handlePlusClick = () => {
    if (selectRef.current) {
      selectRef.current.focus(); // Focus the select
      selectRef.current.openMenu(); // Open the dropdown menu
    }
  };
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (options) => {
    if (options.length > 2) {
      options = options.slice(0, 2); // Limit to 2 selections
    }
    setSelectedOptions(options);
  };

  useEffect(() => {
    dispatch(fetchEventsEmissionsData());
  }, []);
  // }, [userAction])

  useEffect(() => {
    const fetchUsers = async () => {
      // try {
      const res = await apiget('api/eventData/events-users-list');
      setPreviousAllAccounts(res?.data?.data);
      // } catch (error) {
      //     console.error("--- addEmail error ", error);
      // }
    };

    fetchUsers(); // Call the async function
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #ccc',
          borderRadius: '8px',
          padding: '20px',
          width: '600px',
          boxShadow: 3,
          margin: 'auto',
          marginTop: '40px',
          position: 'relative', // Required for absolute positioning of the overlay
        }}
      >
        {isAdmin && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
              <Typography variant="h6" className="text-white" gutterBottom>
                Select Account
              </Typography>
              <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
            </Box>
            <Select
              isClearable
              name="selectedAccount"
              placeholder="Select an account..."
              options={previousAllAccounts} // Change to your accounts array
              formatOptionLabel={formatOptionLabel} // Ensure this function is relevant for accounts
              onChange={(selectedOption) => {
                formik.setFieldValue('selectedAccount', selectedOption);
                const selectedUserEvents = data?.filter((event) => event?.createdById === selectedOption?.value);
                const filterdeEvents = selectedUserEvents?.map((item) => ({
                  value: item._id,
                  label: `${item?.activityName} - ${item?.dateTime}`,
                }));
                // const filterdeEvents = selectedUserEvents?.map((item) => ({ value: item._id, label: `${item?.activityName} - ${dayjs(item?.dateTime).format('MM/DD/YYYY hh:mm')}` }));
                setselectedAccountPreviousEvents(filterdeEvents || []);
                setFilteredTableData(selectedUserEvents);
              }}
              value={formik.values.selectedAccount} // Ensure this corresponds to the single account
              styles={{
                control: (base) => ({
                  ...base,
                  width: '100%',
                  minWidth: '550px',
                  color: '#fff',
                  borderColor: formik.errors.selectedAccount ? 'red' : 'white',
                  '&:hover': {
                    borderColor: formik.errors.selectedAccount ? 'red' : 'white',
                  },
                  backgroundColor: 'transparent',
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 9999,
                  maxWidth: '600px',
                }),
                placeholder: (base) => ({
                  ...base,
                  color: 'white', // Set placeholder color to white
                }),
                singleValue: (base) => ({
                  ...base,
                  color: 'white', // Set selected text color to white for single selection
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: 'white', // Set selected text color to white for multiple selections
                }),
              }}
            />
            {formik.errors.selectedAccount && (
              <Typography
                color="error"
                variant="caption"
                sx={{ marginTop: '4px', fontSize: '1rem', justifyContent: 'flex-start', width: '100%' }}
              >
                {formik.errors.selectedAccount}
              </Typography>
            )}
          </>
        )}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            marginTop: '10px',
          }}
        >
          <Typography variant="h6" className="text-white" gutterBottom>
            Select Previous Activities
          </Typography>
          <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
        </Box>
        {/* <Select
                    isMulti
                    name="selectedEvents"
                    placeholder="Select any two activities..."
                    disabled={isAdmin && !formik.values?.selectedAccount}
                    options={isAdmin ? selectedAccountPreviousEvents : previousEvents}
                    formatOptionLabel={formatOptionLabel}
                    onChange={selectedOptions => {
                        formik.setFieldValue('selectedEvents', selectedOptions);
                    }}
    value={formik.values.selectedEvents}
    styles={{
        control: (base) => ({
            ...base,
            width: '100%',
            minWidth: '550px',
            borderColor: formik.errors.selectedEvents ? 'red' : 'white',
            '&:hover': {
                borderColor: formik.errors.selectedEvents ? 'red' : 'white',
            },
            backgroundColor: 'transparent',
        }),
        menu: (base) => ({
            ...base,
            zIndex: 9999,
            maxWidth: '600px',
        }),
        placeholder: (base) => ({
            ...base,
            color: 'white', // Set placeholder color to white
        }),
    }}
/> */}
        {/* ready code */}
        {/* <Select
                    ref={selectRef}
                    isMulti
                    name="selectedEvents"
                    placeholder="Select any two activities..."
                    closeMenuOnSelect={false} // Keep open initially until we control it
                    disabled={isAdmin && !formik.values?.selectedAccount}
                    options={isAdmin ? selectedAccountPreviousEvents : previousEvents}
                    formatOptionLabel={formatOptionLabel}
                    onChange={handleChange}
                    value={formik.values.selectedEvents}
                    components={{ DropdownIndicator: CustomDropdownIndicator }}
                    onPlusClick={handlePlusClick} // Custom prop to trigger opening on plus icon click
                    styles={{
                        control: (base) => ({
                            ...base,
                            width: '100%',
                            minWidth: '550px',
                            borderColor: formik.errors.selectedEvents ? 'red' : 'white',
                            '&:hover': {
                                borderColor: formik.errors.selectedEvents ? 'red' : 'white',
                            },
                            backgroundColor: 'transparent',
                        }),
                        menu: (base) => ({
                            ...base,
                            zIndex: 9999,
                            maxWidth: '600px',
                        }),
                        placeholder: (base) => ({
                            ...base,
                            color: 'white',
                        }),
                    }}
                />
                {formik.errors.selectedEvents && (
                    <Typography
                        color="error"
                        variant="caption"
                        sx={{ marginTop: '4px', fontSize: '1rem', justifyContent: 'flex-start', width: '100%' }} // Increase font size here
                    >
                        {formik.errors.selectedEvents}
                    </Typography>
                )} */}

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Select
            ref={selectRef}
            isMulti
            name="selectedEvents"
            placeholder="Select any two activities..."
            disabled={isAdmin && !formik.values?.selectedAccount}
            options={isAdmin ? selectedAccountPreviousEvents : previousEvents}
            formatOptionLabel={formatOptionLabel}
            onChange={(selectedOptions) => {
              if (selectedOptions.length > 2) {
                selectedOptions = selectedOptions.slice(0, 2);
              }
              formik.setFieldValue('selectedEvents', selectedOptions);
            }}
            value={formik.values.selectedEvents}
            components={{ DropdownIndicator: null }}
            styles={{
              control: (base) => ({
                ...base,
                width: '100%',
                minWidth: '500px',
                marginLeft: '9px',
                borderColor: formik.errors.selectedEvents ? 'red' : 'white',
                '&:hover': {
                  borderColor: formik.errors.selectedEvents ? 'red' : 'white',
                },
                backgroundColor: 'transparent',
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999,
                marginLeft: '9px',
                maxWidth: '520px',
              }),
              placeholder: (base) => ({
                ...base,
                color: 'white',
              }),
            }}
          />

          <div
            onClick={() => formik.values.selectedEvents.length < 2 && handlePlusClick()}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                selectRef.current.focus();
              }
            }}
            role="button"
            tabIndex="0"
            style={{
              width: '10%',
              marginLeft: '18px',
              marginRight: '15px',
              cursor: formik.values.selectedEvents.length < 2 ? 'pointer' : 'not-allowed',
              color: '#fff',
              fontSize: '20px',
              opacity: formik.values.selectedEvents.length < 2 ? 1 : 0.5,
            }}
            aria-disabled={formik.values.selectedEvents.length >= 2}
          >
            <AddCircleOutlineIcon style={{ fontSize: '31px' }} />
          </div>
        </Box>

        {/* 
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Select
                        ref={selectRef}
                        isMulti
                        name="selectedEvents"
                        placeholder="Select any two activities..."
                        disabled={isAdmin && !formik.values?.selectedAccount}
                        options={isAdmin ? selectedAccountPreviousEvents : previousEvents}
                        formatOptionLabel={formatOptionLabel}
                        onChange={(selectedOptions) => {
                            if (selectedOptions.length > 2) {
                                selectedOptions = selectedOptions.slice(0, 2);
                            }
                            formik.setFieldValue('selectedEvents', selectedOptions);
                        }}
                        value={formik.values.selectedEvents}
                        components={{ DropdownIndicator: null }}
                        styles={{
                            control: (base) => ({
                                ...base,
                                width: '100%',
                                minWidth: '500px',
                                marginLeft: "9px",
                                borderColor: formik.errors.selectedEvents ? 'red' : 'white',
                                '&:hover': {
                                    borderColor: formik.errors.selectedEvents ? 'red' : 'white',
                                },
                                backgroundColor: 'transparent',
                            }),
                            menu: (base) => ({
                                ...base,
                                zIndex: 9999,
                                marginLeft: "9px",
                                maxWidth: '520px',
                            }),
                            placeholder: (base) => ({
                                ...base,
                                color: 'white',
                            }),
                        }}
                    />

                    <div
                        onClick={() => handlePlusClick()}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                selectRef.current.focus();
                            }
                        }}
                        role="button"
                        tabIndex="0"
                        style={{
                            width: '10%',
                            marginLeft: "18px",
                            marginRight: "15px",
                            cursor: formik.values.selectedEvents.length < 2 ? 'pointer' : 'not-allowed',
                            color: "#fff",
                            fontSize: "20px",
                            opacity: formik.values.selectedEvents.length < 2 ? 1 : 0.5,
                        }}
                        aria-disabled={formik.values.selectedEvents.length < 2}
                    >
                        <AddCircleOutlineIcon style={{ fontSize: "31px" }} />
                    </div>
                </Box> */}

        {/* </div > */}
        <Box
          sx={{
            width: '100%',
            border: formik.values.emails?.length > 0 ? '1px solid #dce0e4' : '0',
            borderRadius: '4px',
            padding: formik.values.emails?.length > 0 ? '5px' : '0',
            marginTop: '20px',
          }}
        >
          <ul
            id="tags"
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              width: '100%',
              overflowX: 'auto',
              padding: '0',
              margin: '0',
            }}
          >
            {formik.values.emails?.map((tag, index) => (
              <li
                key={index}
                style={{
                  display: 'flex',
                  listStyle: 'none',
                  margin: '0 5px 5px 0',
                  backgroundColor: 'grey',
                  padding: '2px 5px 2px 8px',
                  borderRadius: '20px',
                  color: '#fff',
                  fontSize: '14px',
                  alignItems: 'center',
                }}
              >
                <span>{tag}</span>
                {index === 0 ? (
                  ''
                ) : (
                  <CloseIcon
                    style={{
                      fontSize: '14px',
                      color: '#fff',
                      marginLeft: '5px',
                      cursor: 'pointer',
                    }}
                    onClick={(event) => removeTag(index)}
                  />
                )}
              </li>
            ))}
          </ul>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          style={{ marginTop: '20px', width: '100%' }} // Full width for the container
        >
          <TextField
            name="addEmail"
            type="text"
            size="small"
            fullWidth
            value={emailInput}
            placeholder="Add Email"
            onChange={(e) => handleInputChange(e)}
            // error={
            //     formik.touched.addEmail &&
            //     Boolean(formik.errors.addEmail)
            // }
            // helperText={
            //     formik.touched.addEmail && formik.errors.addEmail
            // }
            style={{
              flex: 1,
              border: formik.touched.addEmail && formik.errors.addEmail ? '1px solid red' : '1px solid white',
              borderRadius: '6px',
            }}
            inputProps={{
              className: 'custom-placeholder',
              style: { color: 'white', background: 'trasnparent' },
            }}
            InputProps={{
              style: { backgroundColor: 'transparent' }, // Ensure background is transparent
            }}
          />
          <Box>
            <AddCircleOutlineIcon
              onClick={(event) => addTagsButton(event)}
              style={{ fontSize: '30px', cursor: 'pointer', marginLeft: '10px', color: 'white' }}
            />
          </Box>
        </Box>
        {formik.errors.addEmail && (
          <Typography
            color="error"
            variant="caption"
            sx={{ marginTop: '4px', fontSize: '1rem', justifyContent: 'flex-start', width: '100%' }}
          >
            {formik.errors.addEmail}
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: 2, marginTop: '16px', marginLeft: '5px', justifyContent: 'flex-start' }}>
          {/* {userData?.role === 'admin' && (
            <Button
              variant="contained"
              style={{ backgroundColor: '#054723' }}
              onClick={handleRetrieveCalculations}
              disabled={formik.values.selectedEvents.length !== 2} // Enabled only if exactly 2 events are selected
            >
              Retrieve Calculations
            </Button>
          )} */}
          <Button
            variant="contained"
            style={{ backgroundColor: '#054723' }}
            onClick={handleRetrieveGraphs}
            disabled={formik.values.selectedEvents.length !== 2} // Enabled only if exactly 2 events are selected
          >
            {/* {isGraphLoading ? <CircularProgress size={27} /> : 'Retrieve Graphs'} */}
            Retrieve Graphs
          </Button>
          {userData?.role === 'admin' && (
            <Button variant="contained" style={{ backgroundColor: '#054723' }} onClick={handleClickOpen}>
              Generate report
            </Button>
          )}
        </Box>

        {/* Loader Overlay */}
        {(isGraphLoading || isFieldsLoading) && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              // bgcolor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
              backdropFilter: 'blur(1px)', // Blur effect
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10, // Ensure it’s above other content
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
      <>
        <Dialog
          open={isopen}
          onClose={handleClose}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Generate Report</DialogTitle>
          <DialogContent>
            <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  {/* From Date Field */}
                  <div style={{ flex: 1 }}>
                    <FormLabel className="fontFamily fw-bold text-dark mt-1">
                      From Date <span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <TextField
                      type="date"
                      name="sDate"
                      size="small"
                      fullWidth
                      value={formikDate.values.sDate}
                      onChange={(e) => formikDate.setFieldValue('sDate', e.target.value)}
                      error={formikDate.touched.sDate && Boolean(formikDate.errors.sDate)}
                      helperText={formikDate.touched.sDate && formikDate.errors.sDate}
                    />
                  </div>

                  {/* To Date Field */}
                  <div style={{ flex: 1 }}>
                    <FormLabel className="fontFamily fw-bold text-dark mt-1">
                      To Date <span style={{ color: 'red' }}>*</span>
                    </FormLabel>
                    <TextField
                      type="date"
                      name="eDate"
                      size="small"
                      fullWidth
                      value={formikDate.values.eDate}
                      onChange={(e) => formikDate.setFieldValue('eDate', e.target.value)}
                      error={formikDate.touched.eDate && Boolean(formikDate.errors.eDate)}
                      helperText={formikDate.touched.eDate && formikDate.errors.eDate}
                    />
                  </div>
                </div>
              </div>

              <Grid container spacing={2}>
                {/* Email tags display */}
                <Grid item xs={12}>
                  <ul
                    id="email-tags"
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      width: '100%',
                      border: formikDate.values.emailsDate?.length > 0 ? '1px solid #dce0e4' : '0',
                      padding: formikDate.values.emailsDate?.length > 0 ? '5px' : '0',
                    }}
                  >
                    {formikDate.values.emailsDate?.map((email, index) => (
                      <li
                        key={index}
                        style={{
                          display: 'flex',
                          listStyle: 'none',
                          margin: '0 5px 5px 5px',
                          backgroundColor: 'grey',
                          padding: '2px 5px 2px 8px',
                          borderRadius: '20px',
                          color: '#fff',
                          fontSize: '14px',
                          alignItems: 'center',
                        }}
                      >
                        <span>{email}</span>
                        {index === 0 ? (
                          ''
                        ) : (
                          <CloseIcon
                            style={{ fontSize: '14px', color: '#fff', marginLeft: '5px', cursor: 'pointer' }}
                            onClick={() => removeEmailTag(index)}
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </Grid>

                {/* Email input field */}
                <Grid item xs={11}>
                  <TextField
                    name="emailInputDate"
                    type="text"
                    size="small"
                    fullWidth
                    value={formikDate.values.emailInputDate}
                    placeholder="Add Email"
                    onChange={handleEmailInputChange}
                    // error={formikDate.touched.emailInputDate && Boolean(formikDate.errors.emailInputDate)}
                    // helperText={formikDate.touched.emailInputDate && formikDate.errors.emailInputDate}
                  />
                  <span style={{ color: '#ff4842', fontSize: '12px', margin: '4px 14px 0px' }}>
                    {formikDate.errors.emailInputDate}
                  </span>
                </Grid>

                {/* Add email button */}
                <Grid item xs={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                  <AddCircleOutlineIcon onClick={addTagButtonForDate} style={{ fontSize: '30px', cursor: 'pointer' }} />
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={() => formikDate.handleSubmit()} disabled={isLoadingDate}>
              Send
            </Button>
          </DialogActions>
          <ToastContainer position="top-right" autoClose={5000} />
        </Dialog>
      </>

      {userData?.role === 'admin' && (
        <Container maxWidth style={{ marginTop: '36px' }}>
          <Card style={{ height: 'auto', padding: '10px' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
              <Typography variant="h4">All Users Events</Typography>
              <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<CiExport icon="eva:plus-fill" />}
                  onClick={() => {
                    handleExportData('xlsx');
                  }}
                >
                  {selectedRowIds && selectedRowIds?.length > 0 ? 'Export Selected Data' : 'Export'}
                </Button>
              </Stack>
            </Stack>
            <TableStyle>
              {/* <Box width="100%" style={{ minHeight: '670px', overflowY: 'auto', padding: '10px' }} > */}
              <Box width="100%" style={{ height: '680px', overflowY: 'auto', padding: '10px' }}>
                {isLoading ? (
                  <Card style={{ display: 'flex', justifyContent: 'center', height: '680px' }}>
                    <span className="loader" />
                  </Card>
                ) : (
                  <DataGrid
                    rows={formik.values?.selectedAccount ? filteredTableData : data || []}
                    columns={columns}
                    checkboxSelection
                    disableSelectionOnClick
                    onRowSelectionModelChange={handleSelectionChange}
                    rowSelectionModel={selectedRowIds}
                    components={{
                      Toolbar: () => (
                        <Box padding="10px 0">
                          <GridToolbarColumnsButton />
                          <GridToolbarFilterButton />
                          <GridToolbarDensitySelector slotProps={{ tooltip: { title: 'Change density' } }} />
                        </Box>
                      ),
                      NoRowsOverlay: () => (
                        <Typography
                          className="fs-5"
                          style={{
                            textAlign: 'center',
                            padding: '20px',
                            marginTop: '50px', // Add margin to separate from pagination
                          }}
                        >
                          No Records
                        </Typography>
                      ),
                    }}
                    getRowId={(row) => row._id}
                    pageSize={5}
                    pagination
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    initialState={{
                      ...data?.initialState,
                      pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    // rowsPerPageOptions={[5, 10, 25, 50, 100]}
                  />
                )}
              </Box>
            </TableStyle>
          </Card>
        </Container>
      )}
    </>
  );
};

export default MyEventSelector;
