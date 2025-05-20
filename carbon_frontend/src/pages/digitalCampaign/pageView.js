import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Box,
  TextField,
  Container,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Select,
  MenuItem,
} from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { FaAngleDoubleRight, FaImage, FaFileVideo } from 'react-icons/fa';
import useEventData from '../../hooks/useEventData';
import { addCampaignData, deleteCampaignData } from '../../redux/slice/totalDigitalCampaignSlice';
import {
  addResultTableData,
  deleteResTabDgCampaignData,
  addResultTableDatasToDb,
  updateResultTableDatasToDb,
  deleteResTabPageViewData,
  // deleteResTabPageViewData,
} from '../../redux/slice/resultTableDataSlice';
// import { addImageData, deleteImageData } from '../../redux/slice/imageSlice';
import { deletePageSizeMb, fetchPageSize } from '../../redux/slice/greenCheckSlice';
import { addPageViewData, deletePageViewData } from '../../redux/slice/pageViewSlice';
import { IconDiv } from '../../components/IconDiv';
import webpage from '../../assets/Webpage.png';


// import { useTheme } from '@mui/material/styles';


const countries = [
  { code: 'IN', name: 'India', emissionFactor: 0.8552 },
  { code: 'AL', name: 'Algeria', emissionFactor: 0.508179 },
  { code: 'AN', name: 'Angola', emissionFactor: 0.166970 },
  { code: 'BR', name: 'Brazil', emissionFactor: 0.166970 },
  { code: 'CA', name: 'Canada', emissionFactor: 0.508179 },
]

// const countriesDevice = [
//   { code: 'IN', name: 'India', emissionFactor: 0.8552 },
//   { code: 'AL', name: 'Algeria', emissionFactor: 0.508179 },
//   { code: 'AN', name: 'Angola', emissionFactor: 0.166970 },
//   { code: 'US', name: 'United States', emissionFactor: 0.8552 },
//   { code: 'CA', name: 'Canada', emissionFactor: 0.508179 },
//   { code: 'BR', name: 'Brazil', emissionFactor: 0.166970 },
// ]

const PageView = (props) => {
  const { setValue, value } = props;
  const allData = useSelector((state) => state?.totalPageViewDetails?.data?.[0]?.data);
  const totalEmission = useSelector((state) => state?.totalPageViewDetails?.totalEmission);
  const resultTableData = useSelector((state) => state?.resultTableDataDetails);
  const { pageSizeMB, loading, error } = useSelector((state) => state.totalGreenCheckDetails);
  // const { pageSizeMB } = useSelector((state) => state?.totalGreenCheckDetails);
  const eventsData = useEventData();
  const dispatch = useDispatch();
  // const [networkRows, setNetworkRows] = useState([
  //   {
  //     country: '',
  //     wifiImpression: '',
  //     wifi4GImpression: '',
  //     wifi5GImpression: '',
  //     wifiTotalEmissions: ''
  //   }
  // ]);

  // const [deviceRows, setDeviceRows] = useState([
  //   {
  //     mobileDevice: '',
  //     mobileDeviceEmissions: '',
  //     // EFMobile1: 0.000017,
  //     EFMobile3: 0.8552,
  //     tabletDevice: '',
  //     tabletDeviceEmissions: '',
  //     // tabletEF1: 0.01875,
  //     tabletEF3: 0.8552,
  //     laptopDevice: '',
  //     laptopDeviceEmissions: '',
  //     // laptopEF1: 0.041667,
  //     laptopEF3: 0.8552,
  //     desktopDevice: '',
  //     desktopDeviceEmissions: '',
  //     // desktopEF1: 0.291666,
  //     desktopEF3: 0.8552,
  //   }
  // ]);

  const initialValues = {
    APIGreenWebUrl: '',
    TimeOnPageSecs: '',
    TotalImpression: '',
    pageSizeMB: '',
    // pageSizeMB: '',

    // wifiImpression: '',
    // wifi4GImpression: '',
    // wifi5GImpression: '',
    // wifiTotalEmissions: '',
    // pageSizeMB: '',
    mobileDevice: '',
    mobileDeviceEmissions: '',
    // EFMobile1: 0.000017,
    EFMobile3: 0.8552,
    tabletDevice: '',
    tabletDeviceEmissions: '',
    // tabletEF1: 0.01875,
    tabletEF3: 0.8552,
    laptopDevice: '',
    laptopDeviceEmissions: '',
    // laptopEF1: 0.041667,
    laptopEF3: 0.8552,
    desktopDevice: '',
    desktopDeviceEmissions: '',
    // desktopEF1: 0.291666,
    desktopEF3: 0.8552,

    dataCenter: '',
    dataRenewable: '',
    dataEmissions: '',

    networkRows: [
      {
        country: '',
        wifiImpression: "",
        wifi4GImpression: '',
        wifi5GImpression: '',
        wifiTotalEmissions: '',
      }
    ],

    deviceRows: [
      {
        country: '',
        mobileDevice: '',
        mobileDeviceEmissions: '',
        // EFMobile3: 0.8552,
        tabletDevice: '',
        tabletDeviceEmissions: '',
        // tabletEF3: 0.8552,
        laptopDevice: '',
        laptopDeviceEmissions: '',
        // laptopEF3: 0.8552,
        desktopDevice: '',
        desktopDeviceEmissions: '',
        // desktopEF3: 0.8552,
        deviceTotalEmissions: '',
      }
    ]
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const updatedValues = { ...values, pageSizeMB: Number(values.pageSizeMB) };
      const pageSizeMB = updatedValues.pageSizeMB;
      // const wifiEF2 = Number(values?.wifiImpression) * 0.0000017 * Number(values?.pageSizeMB);
      // const wifiEF4 = Number(values?.wifi4GImpression) * 0.00000189 * Number(values?.pageSizeMB);
      // const wifiEF6 = Number(values?.wifi5GImpression) * 0.000000189 * Number(values?.pageSizeMB);
      // const wifiTotalEF = wifiEF2 + wifiEF4 + wifiEF6;
      // const wifiTotalEmissions = Number(wifiTotalEF * 0.8552).toFixed(5);
      // const wifiEF2 = Number(values?.wifiImpression) * 0.0000017 * values?.pageSizeMB;
      // const wifiEF4 = Number(values?.wifi4GImpression) * 0.00000189 * values?.pageSizeMB;
      // const wifiEF6 = Number(values?.wifi5GImpression) * 0.000000189 * values?.pageSizeMB;
      // const wifiTotalEF = wifiEF2 + wifiEF4 + wifiEF6;
      // const wifiTotalEmissions = Number(wifiTotalEF * 0.8552).toFixed(5);
      const networkEmissions = formik.values.networkRows.map(row => {
        const countryData = countries.find(c => c.code === row.country);
        const emissionFactor = countryData ? { ...countryData }.emissionFactor : 0.8552;

        const wifiEF2 = Number(row.wifiImpression || 0) * 0.0000017 * pageSizeMB;
        const wifiEF4 = Number(row.wifi4GImpression || 0) * 0.00000189 * pageSizeMB;
        const wifiEF6 = Number(row.wifi5GImpression || 0) * 0.000000189 * pageSizeMB;
        const wifiTotalEF = Number(wifiEF2 + wifiEF4 + wifiEF6);
        const wifiTotalEmissions = Number(wifiTotalEF * emissionFactor).toFixed(5);

        return {
          country: row.country,
          wifi: row.wifiImpression,
          wifi4g: row.wifi4GImpression,
          wifi5g: row.wifi5GImpression,
          emission: wifiTotalEmissions
        };


      });

      const wifiTotal = networkEmissions.reduce((total, emission) => total + Number(emission.emission), 0).toFixed(5);
      formik.setFieldValue('wifiTotal', wifiTotal);

      const deviceEmissions = formik.values.deviceRows.map(row => {
        const countryData = countries.find(c => c.code === row.country);
        const emissionFactor = countryData ? { ...countryData }.emissionFactor : 0.8552;
        const timeOnPageSecs = Number(values?.TimeOnPageSecs) || 0;

        // Mobile emissions
        const mobileEmissions = row.mobileDevice
          ? (0.001111 * timeOnPageSecs * Number(row.mobileDevice)) * emissionFactor
          : 0;

        // Tablet emissions
        const tabletEmissions = row.tabletDevice
          ? (0.00625 * timeOnPageSecs * Number(row.tabletDevice)) * emissionFactor
          : 0;

        // Laptop emissions
        const laptopEmissions = row.laptopDevice
          ? (0.013889 * timeOnPageSecs * Number(row.laptopDevice)) * emissionFactor
          : 0;

        // Desktop emissions
        const desktopEmissions = row.desktopDevice
          ? (0.097222 * timeOnPageSecs * Number(row.desktopDevice)) * emissionFactor
          : 0;

        const deviceTotalEmissions = (mobileEmissions + tabletEmissions + laptopEmissions + desktopEmissions).toFixed(5)
        // if (mobileEmissions > 0) formik.setFieldValue('mobileEmissions', mobileEmissions.toFixed(5));
        // if (tabletEmissions > 0) formik.setFieldValue('tabletEmissions', tabletEmissions.toFixed(5));
        // if (laptopEmissions > 0) formik.setFieldValue('laptopEmissions', laptopEmissions.toFixed(5));
        // if (desktopEmissions > 0) formik.setFieldValue('desktopEmissions', desktopEmissions.toFixed(5));

        return {
          country: row.country,
          mobile: row.mobileDevice,
          mobileEmission: mobileEmissions.toFixed(5),
          tablet: row.tabletDevice,
          tabletEmission: tabletEmissions.toFixed(5),
          laptop: row.laptopDevice,
          laptopEmission: laptopEmissions.toFixed(5),
          desktop: row.desktopDevice,
          desktopEmission: desktopEmissions.toFixed(5),
          total: deviceTotalEmissions
        };
      });

      // const mobileEmissions = deviceEmissions.reduce((sum, row) => sum + (Number(row.mobileEmission) || 0), 0);
      // const tabletEmissions = deviceEmissions.reduce((sum, row) => sum + (Number(row.tabletEmission) || 0), 0);
      // const laptopEmissions = deviceEmissions.reduce((sum, row) => sum + (Number(row.laptopEmission) || 0), 0);
      // const desktopEmissions = deviceEmissions.reduce((sum, row) => sum + (Number(row.desktopEmission) || 0), 0);

      // formik.setFieldValue('mobileEmissions', mobileEmissions);
      // formik.setFieldValue('tabletEmissions', tabletEmissions);
      // formik.setFieldValue('laptopEmissions', laptopEmissions);
      // formik.setFieldValue('desktopEmissions', desktopEmissions);
      // const EFMobile1 = 0.001111 * Number(values?.TimeOnPageSecs);
      // const EFMobile2 = Number(values?.mobileDevice) * EFMobile1;
      // const mobileDeviceEmissions = (EFMobile2 * values?.EFMobile3).toFixed(5);

      // const tabletEF1 = 0.00625 * Number(values?.TimeOnPageSecs);
      // const tabletEF2 = Number(values?.tabletDevice) * tabletEF1;
      // const tabletDeviceEmissions = (tabletEF2 * values?.tabletEF3).toFixed(5);

      // const laptopEF1 = 0.013889 * Number(values?.TimeOnPageSecs);
      // const laptopEF2 = Number(values?.laptopDevice) * laptopEF1;
      // const laptopDeviceEmissions = (laptopEF2 * values?.laptopEF3).toFixed(5);

      // const desktopEF1 = 0.097222 * Number(values?.TimeOnPageSecs);
      // const desktopEF2 = Number(values?.desktopDevice) * desktopEF1;
      // const desktopDeviceEmissions = (desktopEF2 * values?.desktopEF3).toFixed(5);



      const dataEf1 = (Number(values?.dataCenter) * values?.pageSizeMB) / 1024;
      const dataEF3 = dataEf1 * 0.3;
      const dataEF4 = dataEF3 * 1.7;
      const renewableValue = 100 - values?.dataRenewable;
      const dataTotalEF = (dataEF4 * renewableValue) / 100;
      const dataEmissions = (dataTotalEF * 0.4).toFixed(5);
      // if (values.APIGreenWebUrl) {
      //     dispatch(fetchPageSize(values.APIGreenWebUrl));
      // }

      // if (emission > 0) formik.setFieldValue('wifiTotalEmissions', emission);
      // Calculate total network emissions across all 
      // const totalNetworkEmissions = networkEmissions.reduce((sum, row) => {
      //   return sum + (Number(row.emission) || 0);
      // }, 0).toFixed(5);
      // formik.setFieldValue('wifiTotalEmissions', totalNetworkEmissions);

      // console.log("totalNetworkEmissions", totalNetworkEmissions)

      // const totalDeviceEmissions = deviceEmissions.reduce(
      //   (sum, row) => sum + (Number(row.total) || 0),
      //   0
      // ).toFixed(5);

      // formik.setFieldValue('deviceTotalEmissions', totalDeviceEmissions); 

      if (dataEmissions) {
        formik.setFieldValue('dataEmissions', dataEmissions || 0);
      } else {
        formik.setFieldValue('dataEmissions', dataEmissions);
      }
      // if (mobileEmission > 0) formik.setFieldValue('mobileDeviceEmissions', mobileEmission);
      // if (tabletEmission > 0) formik.setFieldValue('tabletDeviceEmissions', tabletEmission);
      // if (laptopEmission > 0) formik.setFieldValue('laptopDeviceEmissions', laptopEmission);
      // if (desktopEmission > 0) formik.setFieldValue('desktopDeviceEmissions', desktopEmission);

      // const data = [
      //   // ...values?.networkEmissions,
      //   {
      //     type: 'Network Emissions',
      //     wifi: networkRows?.wifi, 
      //     wifi4g: values?.wifi4GImpression,
      //     wifi5g: values?.wifi5GImpression,
      //     emission: Number(wifiTotalEmissions) > 0 ? Number(wifiTotalEmissions) : '',

      //     // emission: Number(wifiTotalEmissions) > 0 ? Number(wifiTotalEmissions) : '',
      //   },
      //   {
      //     type: 'Device Emissions',
      //     mobile: values?.mobileDevice,
      //     // mobileEmission: Number(mobileDeviceEmissions) > 0 ? Number(mobileDeviceEmissions) : '',
      //     tablet: values?.tabletDevice,
      //     // tabletEmission: Number(tabletDeviceEmissions) > 0 ? Number(tabletDeviceEmissions) : '',
      //     laptop: values?.laptopDevice,
      //     // laptopEmission: Number(laptopDeviceEmissions) > 0 ? Number(laptopDeviceEmissions) : '',
      //     desktop: values?.desktopDevice,
      //     // desktopEmission: Number(desktopDeviceEmissions) > 0 ? Number(desktopDeviceEmissions) : '',
      //   },
      //   {
      //     type: 'Data Center Emissions',
      //     dataCenter: values?.dataCenter,
      //     renewable: values?.dataRenewable,
      //     emission: Number(dataEmissions),
      //   },
      //   {
      //     type: 'Content Size',
      //     aPIGreenWebUrl: values?.APIGreenWebUrl,
      //     emission: values?.pageSizeMB,
      //   },
      //   {
      //     type: 'Web Information',
      //     timeOnPageSecs: values?.TimeOnPageSecs,
      //   },
      //   // {
      //   //   type: 'Total Impression',
      //   //   totalImpression: values?.TotalImpression,
      //   // },
      // ];
      const networkData = {
        data: values.networkRows.map((row, index) => ({
          type: 'Network Emissions',
          country: row.country,
          wifi: Number(row.wifiImpression) || 0,
          wifi4g: Number(row.wifi4GImpression) || 0,
          wifi5g: Number(row.wifi5GImpression) || 0,
          emission: networkEmissions[index]?.emission || 0   // your logic here
        }))
      };

      const deviceData = {
        data: values.deviceRows.map((row, index) => ({
          type: 'Device Emissions',
          country: row.country,
          mobile: Number(row.mobileDevice) || 0,
          mobileEmission: deviceEmissions[index]?.mobileEmission || 0,
          tablet: Number(row.tabletDevice) || 0,
          tabletEmission: deviceEmissions[index]?.tabletEmission || 0,
          laptop: Number(row.laptopDevice) || 0,
          laptopEmission: deviceEmissions[index]?.laptopEmission || 0,
          desktop: Number(row.desktopDevice) || 0,
          desktopEmission: deviceEmissions[index]?.desktopEmission || 0,
          emission: deviceEmissions[index]?.total || 0
        }))
      };

      const data = [
        { ...networkData },
        // {
        //   type: 'Network Emissions',
        //   country: values.networkRows.map(row => row.country).join(', '),
        //   wifi: values.networkRows.reduce((sum, row) => sum + (Number(row.wifiImpression) || 0), 0),
        //   wifi4g: values.networkRows.reduce((sum, row) => sum + (Number(row.wifi4GImpression) || 0), 0),
        //   wifi5g: values.networkRows.reduce((sum, row) => sum + (Number(row.wifi5GImpression) || 0), 0),
        //   emission: wifiTotalEmissions,
        //   // details: networkEmissions
        // },
        // {
        //   type: 'Device Emissions',
        //   mobile: deviceRows.reduce((sum, row) => sum + (Number(row.mobileDevice) || 0), 0),
        //   // mobileEmission: mobileTotal,
        //   tablet: deviceRows.reduce((sum, row) => sum + (Number(row.tabletDevice) || 0), 0),
        //   // tabletEmission: tabletTotal,
        //   laptop: deviceRows.reduce((sum, row) => sum + (Number(row.laptopDevice) || 0), 0),
        //   // laptopEmission: laptopTotal,
        //   desktop: deviceRows.reduce((sum, row) => sum + (Number(row.desktopDevice) || 0), 0),
        //   // desktopEmission: desktopTotal,
        //   // details: deviceEmissions
        // },
        {
          ...deviceData
        },
        {
          type: 'Data Center Emissions',
          dataCenter: values?.dataCenter,
          renewable: values?.dataRenewable,
          emission: dataEmissions
        },
        {
          type: 'Content Size',
          aPIGreenWebUrl: values?.APIGreenWebUrl,
          sizeMB: pageSizeMB
        },
        {
          type: 'Web Information',
          timeOnPageSecs: values?.TimeOnPageSecs
        }
      ];

      dispatch(addPageViewData({ data }));
      const tableData = [
        {
          subType: 'Webpage Details',
          subTypeData: {
            th: ['Webpage URL', 'Webpage Size (Mb)'],
            td: [
              {
                APIGreenWebUrl: values?.APIGreenWebUrl,
                contentSize: values?.pageSizeMB,
              },
            ],
          },
        },
        // {
        //   subType: 'Network Emissions',
        //   subTypeData: {
        //     th: ['Webpage Views-Wi-Fi', 'Webpage Views-4G', 'Webpage Views-5G', 'Emissions'],
        //     td: [
        //       {
        //         // dgType: values?.wifiImpression,
        //         wifiImpression: values?.wifiImpression,
        //         wifi4g: values?.wifi4GImpression,
        //         wifi5g: values?.wifi5GImpression,
        //         // emissions: wifiTotalEmissions > 0 ? Number(wifiTotalEmissions).toFixed(5) : '',
        //       },
        //     ],
        //   },
        // },
        {
          subType: 'Network Emissions',
          subTypeData: {
            th: ['Country', 'Webpage Views-Wi-Fi', 'Webpage Views-4G', 'Webpage Views-5G', 'Emissions'],
            td: values.networkRows.map((row, index) => ({
              country: row.country || '',
              wifiImpression: Number(row.wifiImpression) || 0,
              wifi4g: Number(row.wifi4GImpression) || 0,
              wifi5g: Number(row.wifi5GImpression) || 0,
              emissions: networkEmissions[index]?.emission
                ? Number(networkEmissions[index].emission).toFixed(5)
                : '0.00000',
            })),
          },
        },
        {
          subType: 'Device Emissions',
          subTypeData: {
            th: ['Country', 'Mobile', 'Tablet', 'Laptop', 'Desktop', 'Emissions'],
            td: values.deviceRows.map((row, index) => ({
              country: row.country || '',
              wifiImpression: Number(row.mobileDevice) || 0,
              wifi4g: Number(row.tabletDevice) || 0,
              wifi5g: Number(row.laptopDevice) || 0,
              desktop: Number(row.desktopDevice) || 0,
              emissions: deviceEmissions[index]?.total ? Number(deviceEmissions[index]?.total).toFixed(5)
                : '0.00000',
            })),
          },
        },


        // {
        //   subType: 'Device Emissions',
        //   subTypeData: {
        //     th: ['Country', 'Device Type', 'No. of Devices', 'Emissions'],
        //     td: [
        //     // [values.deviceRows.map((row, index) => ([

        //     //   {
        //     //     country: row.country,
        //     //     dgType: 'Mobile',
        //     //     noOfDevice: Number(row.mobile) || 0,
        //     //     emissions: row.mobileEmission ? Number(row.mobileEmission).toFixed(5) : '0.00000',
        //     //   },
        //     //   {
        //     //     // country: row.country,
        //     //     dgType: 'Tablet',
        //     //     noOfDevice: Number(row.tablet) || 0,
        //     //     emissions: row.tabletEmission ? Number(row.tabletEmission).toFixed(5) : '0.00000',
        //     //   },
        //     //   {
        //     //     // country: row.country,
        //     //     dgType: 'Laptop',
        //     //     noOfDevice: Number(row.laptop) || 0,
        //     //     emissions: row.laptopEmission ? Number(row.laptopEmission).toFixed(5) : '0.00000',
        //     //   },
        //     //   {
        //     //     // country: row.country,
        //     //     dgType: 'Desktop',
        //     //     noOfDevice: Number(row.desktop) || 0,
        //     //     emissions: row.desktopEmission ? Number(row.desktopEmission).toFixed(5) : '0.00000',
        //     //   } 
        //     // ])),

        //       {
        //         country: row.country,
        //         dgType: 'Mobile',
        //         noOfDevice: values?.mobileDevice,
        //         // emissions: mobileDeviceEmissions > 0 ? Number(mobileDeviceEmissions).toFixed(5) : '',
        //       },
        //       {
        //         dgType: 'Tablet',
        //         noOfDevice: values?.tabletDevice,
        //         // emissions: tabletDeviceEmissions > 0 ? Number(tabletDeviceEmissions).toFixed(5) : '',
        //       },
        //       {
        //         dgType: 'Laptop',
        //         noOfDevice: values?.laptopDevice,
        //         // emissions: laptopDeviceEmissions > 0 ? Number(laptopDeviceEmissions).toFixed(5) : '',
        //       },
        //       {
        //         dgType: 'Desktop',
        //         noOfDevice: values?.desktopDevice,
        //         // emissions: desktopDev iceEmissions > 0 ? Number(desktopDeviceEmissions).toFixed(5) : '',
        //       },
        //     ],
        //   },
        // },
        {
          subType: 'Data Center Emissions',
          subTypeData: {
            th: ['Total Impressions', '% of Renewable Energy', 'Emissions'],
            td: [
              {
                // dgType: values?.dataCenter,
                dataCenter: values?.dataCenter,
                noOfData: values?.dataRenewable,
                emissions: Number(dataEmissions).toFixed(5),
              },
            ],
          },
        },
        // {
        //   subType: 'Total Emissions',
        //   subTypeData: {
        //     th: ['Total Emissions'],
        //     td: [
        //       {
        //         totalEmissions: values?.TotalImpression,
        //       },
        //     ],
        //   },
        // },
      ];

      dispatch(addResultTableData({ from: 'digitalCampaign', data: tableData, tabTitle: 'WebPage' }));
    },


  });

  const handleAddNetworkRow = () => {
    const newRows = [
      ...formik.values.networkRows,
      {
        country: '',
        wifiImpression: '',
        wifi4GImpression: '',
        wifi5GImpression: '',
        wifiTotalEmissions: ''
      }
    ];
    formik.setFieldValue('networkRows', newRows);
  };

  const handleRemoveNetworkRow = index => {
    const newRows = [...formik.values.networkRows];
    newRows.splice(index, 1);
    formik.setFieldValue('networkRows', newRows);
  };

  const handleNetworkRowChange = (index, field, value) => {
    const newRows = [...formik.values.networkRows];
    newRows[index][field] = value;

    const countryData = countries.find(c => c.code === newRows[index].country);
    const emissionFactor = countryData ? countryData.emissionFactor : 0.8552;

    const pageSize = Number(formik.values.pageSizeMB || 0);
    const wifiEF2 = Number(newRows[index].wifiImpression || 0) * 0.0000017 * pageSize;
    const wifiEF4 = Number(newRows[index].wifi4GImpression || 0) * 0.00000189 * pageSize;
    const wifiEF6 = Number(newRows[index].wifi5GImpression || 0) * 0.000000189 * pageSize;

    newRows[index].wifiTotalEmissions = ((wifiEF2 + wifiEF4 + wifiEF6) * emissionFactor).toFixed(5);

    formik.setFieldValue('networkRows', newRows);

    const wifiTotal = newRows.reduce((total, emission) => total + Number(emission.emission), 0).toFixed(5);
    formik.setFieldValue('wifiTotal', wifiTotal);

    // const totalNetworkEmissions = newRows.reduce((sum, row) => {
    //   return sum + (Number(row.wifiTotalEmissions) || 0);
    // }, 0);
    // formik.setFieldValue('wifiTotalEmissions', totalNetworkEmissions.toFixed(5));
    formik.handleSubmit();

  };


  const addDeviceRow = () => {
    const newRow = {
      country: '',
      mobileDevice: '',
      mobileDeviceEmissions: '',
      tabletDevice: '',
      tabletDeviceEmissions: '',
      laptopDevice: '',
      laptopDeviceEmissions: '',
      desktopDevice: '',
      desktopDeviceEmissions: '',
      deviceTotalEmissions: '',
    };

    const updatedRows = [...formik.values.deviceRows, newRow];
    formik.setFieldValue('deviceRows', updatedRows);
  };

  const handleDeviceRowChange = (index, field, value) => {
    const updatedRows = [...formik.values.deviceRows];
    const row = updatedRows[index];

    row[field] = value;

    const countryData = countries.find(c => c.code === row.country);
    const emissionFactor = countryData ? countryData.emissionFactor : 0.8552;
    const timeOnPageSecs = Number(formik.values.TimeOnPageSecs) || 0;

    const DeviceEmission = (rate, count) =>
      count ? (rate * timeOnPageSecs * Number(count) * emissionFactor).toFixed(5) : '';

    if (['mobileDevice', 'tabletDevice', 'laptopDevice', 'desktopDevice'].includes(field)) {
      const emissionsMap = {
        mobileDevice: 0.001111,
        tabletDevice: 0.00625,
        laptopDevice: 0.013889,
        desktopDevice: 0.097222
      };

      const emissionsField = `${field}Emissions`;
      row[emissionsField] = DeviceEmission(emissionsMap[field], value);
    }

    row.deviceTotalEmissions = (
      ['mobileDeviceEmissions', 'tabletDeviceEmissions', 'laptopDeviceEmissions', 'desktopDeviceEmissions']
        .map(key => parseFloat(row[key] || '0'))
        .reduce((sum, val) => sum + val, 0)
        .toFixed(5)
    )

    updatedRows[index] = row;

    // const mobileDeviceEmissionsTotal = formik.values.deviceRows.reduce((total, row) => total + Number(row.mobileDeviceEmissions || 0), 0).toFixed(5);
    // console.log("mobileDeviceEmissionsTotal", mobileDeviceEmissionsTotal)
    // const tabletDeviceEmissionsTotal = formik.values.deviceRows.reduce((total, row) => total + Number(row.tabletDeviceEmissions || 0), 0).toFixed(5);
    // const laptopDeviceEmissionsTotal = formik.values.deviceRows.reduce((total, row) => total + Number(row.laptopDeviceEmissions || 0), 0).toFixed(5);
    // const desktopDeviceEmissionsTotal = formik.values.deviceRows.reduce((total, row) => total + Number(row.desktopDeviceEmissions || 0), 0).toFixed(5);

    formik.setFieldValue('deviceRows', updatedRows);

    // formik.setFieldValue('mobileDeviceEmissionsTotal', mobileDeviceEmissionsTotal);
    // formik.setFieldValue('tabletDeviceEmissionsTotal', tabletDeviceEmissionsTotal);
    // formik.setFieldValue('laptopDeviceEmissionsTotal', laptopDeviceEmissionsTotal);
    // formik.setFieldValue('desktopDeviceEmissionsTotal', desktopDeviceEmissionsTotal);

    formik.handleSubmit();
  };

  const handeleDelete = () => {
    dispatch(deletePageViewData());
    // dispatch(deleteResTabPageViewData());
    dispatch(deleteResTabPageViewData());
    dispatch(deletePageSizeMb());
  };

  const handleSaveToDb = async (values) => {
    const eventData = {
      ...eventsData,
    };
    if (resultTableData.eventDataId) {
      eventData.eventDataId = resultTableData?.eventDataId;
      const resultAction = await dispatch(updateResultTableDatasToDb(eventData));
      if (updateResultTableDatasToDb?.rejected?.match(resultAction)) {
        console.error('Failed to update data:', resultAction?.payload);
      }
    } else {
      const resultAction = await dispatch(addResultTableDatasToDb(eventData));
      if (addResultTableDatasToDb?.rejected?.match(resultAction)) {
        console.error('Failed to save data:', resultAction?.payload);
      }
    }
  };

  // const totalDevice =
  //   (Number(formik?.values?.mobileDeviceEmissionsTotal) || 0) +
  //   (Number(formik?.values?.tabletDeviceEmissionsTotal) || 0) +
  //   (Number(formik?.values?.laptopDeviceEmissionsTotal) || 0) +
  //   (Number(formik?.values?.desktopDeviceEmissionsTotal) || 0);
  // const ImageTotalEmissions =
  //   (Number(formik.values.wifiTotal) || 0) +
  //   (Number(totalDevice) || 0) +
  //   (Number(formik?.values?.dataEmissions) || 0);

  const wifiTotal = formik.values.networkRows.reduce((sum, row) => {
    return sum + (Number(row.wifiTotalEmissions) || 0);
  }, 0);

  const totalDevice = (formik.values.deviceRows || []).reduce((sum, row) => {
    return sum +
      (Number(row.mobileDeviceEmissions) || 0) +
      (Number(row.tabletDeviceEmissions) || 0) +
      (Number(row.laptopDeviceEmissions) || 0) +
      (Number(row.desktopDeviceEmissions) || 0);
  }, 0);

  const dataEmissions = Number(formik.values.dataEmissions || 0);

  const ImageTotalEmissions = wifiTotal + totalDevice + dataEmissions;


  useEffect(() => {
    if (allData?.length > 0) {
      // formik.setFieldValue('networkRows', allData[0]?.data)
      if (allData[0]?.data?.length > 0) {
        formik.setFieldValue('networkRows', allData[0]?.data?.map(row => ({
          country: row.country,
          wifiImpression: row.wifi,
          wifi4GImpression: row.wifi4g,
          wifi5GImpression: row.wifi5g,
          wifiTotalEmissions: row.emission,
        })) || []);
      }
      // formik.setFieldValue('networkRows', allData);
      // setNetworkRows(allData)

      if (allData[1]?.data?.length > 0) {
        formik.setFieldValue('deviceRows', allData?.[1]?.data?.map(row => ({
          country: row.country,
          mobileDevice: row.mobile,
          mobileDeviceEmissions: row.mobileEmission,
          tabletDevice: row.tablet,
          tabletDeviceEmissions: row.tabletEmission,
          laptopDevice: row.laptop,
          laptopDeviceEmissions: row.laptopEmission,
          desktopDevice: row.desktop,
          desktopDeviceEmissions: row.desktopEmission,
          deviceTotalEmissions: row.emission
        })) || []);
      }

      // formik.setFieldValue('mobileDevice', allData?.[1]?.mobile);
      // formik.setFieldValue('mobileDeviceEmissions', allData?.[1]?.mobileEmission);
      // formik.setFieldValue('tabletDevice', allData?.[1]?.tablet);
      // formik.setFieldValue('tabletDeviceEmissions', allData?.[1]?.tabletEmission);
      // formik.setFieldValue('laptopDevice', allData?.[1]?.laptop);
      // formik.setFieldValue('laptopDeviceEmissions', allData?.[1]?.laptopEmission);
      // formik.setFieldValue('desktopDevice', allData?.[1]?.desktop);
      // formik.setFieldValue('desktopDeviceEmissions', allData?.[1]?.desktopEmission);

      formik.setFieldValue('dataCenter', allData?.[2]?.dataCenter);
      formik.setFieldValue('dataRenewable', allData?.[2]?.renewable);
      formik.setFieldValue('dataEmissions', allData?.[2]?.emission);

      formik.setFieldValue('pageSizeMB', allData?.[3]?.pageSizeMB);
      formik.setFieldValue('APIGreenWebUrl', allData?.[3]?.aPIGreenWebUrl);
      formik.setFieldValue('TimeOnPageSecs', allData?.[4]?.timeOnPageSecs);


      // formik.setFieldValue('TotalImpression', allData?.[5]?.totalImpression);
    }
  }, [value]);

  useEffect(() => {
    if (pageSizeMB) {
      formik.setFieldValue('pageSizeMB', pageSizeMB);
    }
  }, [pageSizeMB, formik.resetForm]);

  const handleCheckSize = () => {
    dispatch(fetchPageSize(formik.values.APIGreenWebUrl));
  };

  // const [networkRows, setNetworkRows] = useState([{
  //   country: '',
  //   wifiImpression: '',
  //   wifi4GImpression: '',
  //   wifi5GImpression: '',
  //   wifiTotalEmissions: ''
  // }]);

  // // Add these functions in your component
  // const handleAddNetworkRow = () => {
  //   setNetworkRows([...networkRows, {
  //     country: '',
  //     wifiImpression: '',
  //     wifi4GImpression: '',
  //     wifi5GImpression: '',
  //     wifiTotalEmissions: ''
  //   }]);
  // };

  // const handleRemoveNetworkRow = (index) => {
  //   const newRows = [...networkRows];
  //   newRows.splice(index, 1);
  //   setNetworkRows(newRows);
  // };

  // const handleNetworkRowChange = (index, field, value) => {
  //   const newRows = [...networkRows];
  //   newRows[index][field] = value;

  //   // Recalculate emissions when network values change
  //   if (['wifiImpression', 'wifi4GImpression', 'wifi5GImpression'].includes(field)) {
  //     const countryData = .find(c => c.code === newRows[index].country);
  //     const emissionFactor = countryData ? countryData.emissionFactor : 0.8552; // default factor

  //     const wifiEF2 = Number(newRows[index].wifiImpression || 0) * 0.0000017 * Number(formik.values.pageSizeMB);
  //     const wifiEF4 = Number(newRows[index].wifi4GImpression || 0) * 0.00000189 * Number(formik.values.pageSizeMB);
  //     const wifiEF6 = Number(newRows[index].wifi5GImpression || 0) * 0.000000189 * Number(formik.values.pageSizeMB);
  //     // newRows[index].wifiTotalEmissions = ((wifiEF2 + wifiEF4 + wifiEF6) * 0.8552).toFixed(5);

  //     newRows[index].wifiTotalEmissions = ((wifiEF2 + wifiEF4 + wifiEF6) * emissionFactor).toFixed(5);

  //   }

  //   setNetworkRows(newRows);

  //   // Calculate total network emissions
  //   const totalNetworkEmissions = newRows.reduce((sum, row) => {
  //     return sum + (Number(row.wifiTotalEmissions) || 0);
  //   }, 0);

  //   formik.setFieldValue('wifiTotalEmissions', totalNetworkEmissions.toFixed(5));
  //   formik.handleSubmit();
  // };

  return (
    <Container maxWidth>
      <Card className="p-3 custom-inner-bg textborder" style={{ padding: '20px' }}>
        <IconDiv>
          <img width={100} src={webpage} alt="Ads" className="tabImgWhite" />
        </IconDiv>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
            <Box>
              <div className="table-responsive">
                {/* <Typography variant="h4" className="text-center text-white mb-4 mt-4">
                                    API- Green Web Foundation
                                </Typography> */}
                <table className="table-custom-inpt-field">
                  <tr>
                    <td className="ps-3"> Enter your landing page link</td>
                    <td className="ps-3" />
                    <td className="ps-3" />
                    <td className="ps-3">Get WebPage Size (Mb)</td>
                  </tr>
                  <tr>
                    <td className="ps-3 py-1">
                      <TextField
                        size="small"
                        name="APIGreenWebUrl"
                        // label="Enter Website URL"
                        placeholder="Use https://www. "
                        fullWidth
                        onChange={(e) => {
                          formik.setFieldValue('APIGreenWebUrl', e.target.value);
                        }}
                        // onChange={formik.handleChange}
                        value={formik.values.APIGreenWebUrl}
                        inputProps={{ style: { color: 'white' } }}
                        sx={{ mt: 2, width: '400px' }}
                      />
                    </td>
                    <td className="ps-3 py-1">
                      <Button
                        variant="contained"
                        type="submit"
                        style={{
                          marginTop: '10px',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          border: 'none',
                          // backgroundColor: "#054723",
                          color: 'white',
                          cursor: 'pointer',
                        }}
                        className="custom-btn"
                        onClick={handleCheckSize}
                        disabled={loading}
                      >
                        {loading ? 'Checking...' : 'Get Page Size'}
                      </Button>
                    </td>
                    <td className="ps-3 py-1">
                      {/* <Button
                                                variant="contained"
                                                type="submit"
                                                style={{
                                                    marginTop: '10px',
                                                    padding: '8px 16px',
                                                    borderRadius: '4px',
                                                    border: 'none',
                                                    // backgroundColor: "#054723",
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                }}
                                                className="custom-btn"
                                                onClick={handleCheckSize}
                                                disabled={loading}
                                            >
                                                {loading ? 'Checking...' : 'Clear'}
                                            </Button> */}
                      <Button
                        variant="outlined"
                        onClick={() => {
                          // formik.resetForm();
                          formik.setFieldValue('APIGreenWebUrl', '');
                          handeleDelete();
                        }}
                        className="mt-2"
                        color="error"
                      >
                        Clear
                      </Button>
                    </td>
                    <td className="ps-3 py-1">
                      <TextField
                        size="small"
                        fullWidth
                        // label="Page Size (MB)"
                        value={pageSizeMB || ''}
                        InputProps={{
                          readOnly: true,
                          style: { color: 'white' },
                        }}
                        sx={{ mt: 2 }}
                      />
                    </td>
                  </tr>
                </table>
              </div>
              {/* <div className="table-responsive mt-4">
                                <table className="table-custom-inpt-field">
                                    <tr>
                                        <td className="ps-3 text-center">Total Impression</td>
                                        <td className="ps-3 py-1">
                                            <TextField
                                                size="small"
                                                name="TotalImpression"
                                                // label="Enter Website URL"
                                                fullWidth
                                                // onChange={formik.handleChange}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    formik.setFieldValue('TotalImpression', value);

                                                }}
                                                value={formik.values.TotalImpression}
                                                inputProps={{ style: { color: 'white' } }}
                                                sx={{ mt: 2 }}
                                            />
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className="table-responsive mt-4">
                                <table className="table-custom-inpt-field">
                                    <tr>
                                        <td className="ps-3">Average time on page (Secs)</td>
                                        <td className="ps-3 py-1">
                                            <TextField
                                                size="small"
                                                name="TimeOnPageSecs"
                                                // label="Enter Website URL"
                                                fullWidth
                                                // onChange={formik.handleChange}
                                                onChange={(e) => {
                                                    // const value = e.target.value;
                                                    formik.setFieldValue('TimeOnPageSecs', e.target.value);

                                                }}
                                                value={formik.values.TimeOnPageSecs}
                                                inputProps={{ style: { color: 'white' } }}
                                                sx={{ mt: 2 }}
                                            />
                                        </td>
                                    </tr>
                                </table>
                            </div> */}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} marginTop={3} ml={4}>
            <Typography color="white" className="text-start fw-bold">
              {`Note:`}
            </Typography>
            <ul style={{ color: 'white', justifyContent: 'center' }}>
              <li>
                <Typography className="fst-italic" display="inline">
                  {` Please wait while we calculate the Webpage size. This may take a few seconds to a minute depending on the data connection speed.`}
                </Typography>
              </li>
              <li>
                <Typography className="fst-italic" display="inline">
                  {`If you do not get the Webpage size, click on the CLEAR tab and add the webpage again.`}
                </Typography>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'} marginTop={3}>
            <Box>
              <div className="table-responsive">
                <table className="table-custom-inpt-field">
                  <tr>
                    <td className="ps-3 ">Total Impressions</td>
                    <td className="ps-3">Average time on page (Secs)</td>
                    {/* <td className="ps-3">Emissions</td> */}
                  </tr>
                  <tr>
                    <td className="ps-3 py-1">
                      {/* <TextField
                                                size="small"
                                                name="TotalImpression"
                                                // label="Enter Website URL"
                                                fullWidth
                                                // onChange={formik.handleChange}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    formik.setFieldValue('TotalImpression', value);

                                                }}
                                                value={formik.values.TotalImpression}
                                                inputProps={{ style: { color: 'white' } }}
                                                sx={{ mt: 2 }}
                                            /> */}
                      <TextField
                        size="small"
                        type="number"
                        name="dataCenter"
                        value={formik.values.dataCenter}
                        onChange={(e) => {
                          formik.handleChange(e);

                          const dataCenter = Number(e.target.value) || 0;
                          const dataRenewable = Number(formik.values.dataRenewable) || 0;
                          const pageSizeMB = formik.values.pageSizeMB;

                          // Calculation Logic
                          const dataEf1 = (dataCenter * pageSizeMB) / 1024;
                          const dataEF3 = dataEf1 * 0.3;
                          const dataEF4 = dataEF3 * 1.7;
                          const renewableValue = 100 - dataRenewable;
                          const dataTotalEF = (dataEF4 * renewableValue) / 100;
                          const dataEmissions = dataTotalEF * 0.4;

                          // Update field value
                          formik.setFieldValue('dataEmissions', dataEmissions.toFixed(5));
                          formik.handleSubmit();
                        }}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                    <td className="ps-3 py-1">
                      <TextField
                        size="small"
                        name="TimeOnPageSecs"
                        // label="Enter Website URL"
                        fullWidth
                        // onChange={formik.handleChange}
                        onChange={(e) => {
                          // const value = e.target.value;
                          formik.setFieldValue('TimeOnPageSecs', e.target.value);
                        }}
                        value={formik.values.TimeOnPageSecs}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </Box>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
            <Box>
              <Typography variant="h4" className="text-center text-white mb-4 mt-4">
                Network Emissions
              </Typography>
              <div className="table-responsive">
                <table className="table-custom-inpt-field">
                  <tr>
                    <td className='ps-3'>Select Country</td>
                    <td className="ps-3">WebPage Views- WiFi</td>
                    <td className="ps-3">WebPage Views- 4G</td>
                    <td className="ps-3">WebPage Views- 5G</td>
                    <td className="ps-3">
                      Emissions (kgCO<sub>2</sub>e)
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-3 py-1 w-25">
                      <Select
                        labelId="country-label"
                        id="country-select"
                        value={country}
                        label="Select Country"
                        onChange={handleChange}
                        inputProps={{ style: { color: 'white' } }}
                      >
                        {countries.map((c) => (
                          <MenuItem key={c.code} value={c.code}>
                            {c.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </td>
                    <td className="ps-3 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="wifiImpression"
                        value={formik.values.wifiImpression}
                        onChange={(e) => {
                          const value = e.target.value;
                          formik.setFieldValue('wifiImpression', value);

                          const wifiEF2 = Number(value) * 0.0000017 * formik.values.pageSizeMB;
                          const wifiEF4 =
                            Number(formik.values.wifi4GImpression || 0) * 0.00000189 * formik.values.pageSizeMB;
                          const wifiEF6 =
                            Number(formik.values.wifi5GImpression || 0) * 0.000000189 * formik.values.pageSizeMB;
                          const wifiTotalEmissions = ((wifiEF2 + wifiEF4 + wifiEF6) * 0.8552).toFixed(5);

                          formik.setFieldValue('wifiTotalEmissions', wifiTotalEmissions);
                          formik.handleSubmit();
                        }}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                    <td className="ps-3 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="wifi4GImpression"
                        value={formik.values.wifi4GImpression}
                        onChange={(e) => {
                          const value = e.target.value;
                          formik.setFieldValue('wifi4GImpression', value);

                          const wifiEF2 =
                            Number(formik.values.wifiImpression || 0) * 0.0000017 * formik.values.pageSizeMB;
                          const wifiEF4 = Number(value) * 0.00000189 * formik.values.pageSizeMB;
                          const wifiEF6 =
                            Number(formik.values.wifi5GImpression || 0) * 0.000000189 * formik.values.pageSizeMB;
                          const wifiTotalEmissions = ((wifiEF2 + wifiEF4 + wifiEF6) * 0.8552).toFixed(5);

                          formik.setFieldValue('wifiTotalEmissions', wifiTotalEmissions);
                          formik.handleSubmit();
                        }}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                    <td className="ps-3 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="wifi5GImpression"
                        value={formik.values.wifi5GImpression}
                        onChange={(e) => {
                          const value = e.target.value;
                          formik.setFieldValue('wifi5GImpression', value);

                          const wifiEF2 =
                            Number(formik.values.wifiImpression || 0) * 0.0000017 * formik.values.pageSizeMB;
                          const wifiEF4 =
                            Number(formik.values.wifi4GImpression || 0) * 0.00000189 * formik.values.pageSizeMB;
                          const wifiEF6 = Number(value) * 0.000000189 * formik.values.pageSizeMB;
                          const wifiTotalEmissions = ((wifiEF2 + wifiEF4 + wifiEF6) * 0.8552).toFixed(5);

                          formik.setFieldValue('wifiTotalEmissions', wifiTotalEmissions);
                          formik.handleSubmit();
                        }}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                    <td className="ps-3 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="wifiTotalEmissions"
                        value={formik.values.wifiTotalEmissions}
                        disabled
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                    <td className="ps-3 py-1">
                      <Button
                        variant="contained"
                        color="primary"
                      // onClick={addRow}
                      // sx={{ mt: 2 }}
                      >
                        Add Row
                      </Button>
                    </td>
                  </tr>
                </table>
              </div>
            </Box>
          </Grid> */}
          <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
            <Box>
              <Typography variant="h4" className="text-center text-white mb-4 mt-4">
                Network Emissions
              </Typography>
              <div className="table-responsive">
                <table className="table-custom-inpt-field">
                  <thead>
                    <tr>
                      <th className='ps-3'>Country</th>
                      <th className="ps-3">WebPage Views- WiFi</th>
                      <th className="ps-3">WebPage Views- 4G</th>
                      <th className="ps-3">WebPage Views- 5G</th>
                      <th className="ps-3">
                        Emissions (kgCO<sub>2</sub>e)
                      </th>
                      <th className="ps-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formik.values.networkRows?.map((row, index) => (
                      <tr key={index}>
                        <td className="ps-3 py-1" >
                          <Select
                            labelId={`country-label-${index}`}
                            id={`country-select-${index}`}
                            value={row.country}
                            onChange={(e) => handleNetworkRowChange(index, 'country', e.target.value)}
                            inputProps={{ style: { color: 'white' } }}
                            size="small"
                            sx={{
                              color: 'white',
                              width: '100%',
                              borderColor: 'white',
                              '.MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                              },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                              }
                            }}
                          >
                            {countries.map((c) => (
                              <MenuItem key={c.code} value={c.code}>
                                {c.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </td>
                        <td className="ps-3 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name={`networkRows[${index}].wifiImpression`}
                            value={formik.values.networkRows[index].wifiImpression}
                            // onChange={(e) => handleNetworkRowChange(index, 'wifiImpression', e.target.value)}
                            onChange={(e) => handleNetworkRowChange(index, `wifiImpression`, e.target.value)}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="ps-3 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name={`networkRows[${index}].wifi4GImpression`}
                            value={formik.values.networkRows[index].wifi4GImpression}
                            onChange={(e) => handleNetworkRowChange(index, 'wifi4GImpression', e.target.value)}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="ps-3 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name={`networkRows[${index}].wifi5GImpression`}
                            value={formik.values.networkRows[index].wifi5GImpression}
                            onChange={(e) => handleNetworkRowChange(index, 'wifi5GImpression', e.target.value)}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="ps-3 py-1">
                          <TextField
                            size="small"
                            type="number"
                            // name={`wifiTotalEmissions-${index}`}
                            value={formik.values.networkRows[index].wifiTotalEmissions}
                            disabled
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className='ps-3 py-1'>
                          <Button
                            variant="contained"
                            onClick={handleAddNetworkRow}
                            style={{ marginLeft: '20px' }}
                            className="custom-btn"
                          >
                            +
                          </Button>
                        </td>
                        <td className="ps-3 py-1">
                          {index > 0 && (
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleRemoveNetworkRow(index)}
                            >
                              -
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Box>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
            <Box>
              <Typography variant="h4" className="text-center text-white mb-4 mt-3">
                Device Emissions
              </Typography>
              <div className="table-responsive">
                <table className="table-custom-inpt-field">
                  <tr>
                    <th className="ps-2">Device Type </th>
                    <th className="ps-2" style={{ textAlign: 'center' }}>
                      No. of Devices
                    </th>
                    <th className="ps-2" style={{ textAlign: 'center' }}>
                      Emissions (kgCO<sub>2</sub>e)
                    </th>
                  </tr>
                  <tr>
                    <td className="ps-2 py-1">Mobile</td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="mobileDevice"
                        value={formik?.values?.mobileDevice}
                        onChange={(e) => {
                          const value = e.target.value;
                          formik.setFieldValue('mobileDevice', value);

                          const EFMobile1 = 0.00111 * Number(formik?.values?.TimeOnPageSecs);
                          const EFMobile2 = Number(formik?.values?.mobileDevice) * EFMobile1;
                          const mobileDeviceEmissions = (EFMobile2 * formik?.values?.EFMobile3).toFixed(5);

                          formik.setFieldValue('mobileDeviceEmissions', mobileDeviceEmissions);
                          formik.handleChange(e);
                          formik.handleSubmit();
                        }}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        disabled
                        name="mobileDeviceEmissions"
                        value={formik?.values?.mobileDeviceEmissions}
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-2 py-1">Tablet</td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="tabletDevice"
                        value={formik?.values?.tabletDevice}
                        onChange={(e) => {
                          const value = e.target.value;
                          formik.setFieldValue('tabletDevice', value);

                          const tabletEF1 = 0.00625 * Number(formik?.values?.TimeOnPageSecs);
                          const tabletEF2 = Number(formik?.values?.tabletDevice) * tabletEF1;
                          const tabletDeviceEmissions = (tabletEF2 * formik?.values?.tabletEF3).toFixed(5);
                          formik.setFieldValue('tabletDeviceEmissions', tabletDeviceEmissions);

                          formik.handleChange(e);
                          formik.handleSubmit();
                        }}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        disabled
                        name="tabletDeviceEmissions"
                        value={formik?.values?.tabletDeviceEmissions}
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="ps-2 py-1">Laptop</td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="laptopDevice"
                        value={formik?.values?.laptopDevice}
                        onChange={(e) => {
                          const value = e.target.value;
                          formik.setFieldValue('laptopDevice', value);

                          const laptopEF1 = 0.013889 * Number(formik?.values?.TimeOnPageSecs);
                          const laptopEF2 = Number(formik?.values?.laptopDevice) * laptopEF1;
                          const laptopDeviceEmissions = (laptopEF2 * formik?.values?.laptopEF3).toFixed(5);
                          formik.setFieldValue('laptopDeviceEmissions', laptopDeviceEmissions);
                          formik.handleChange(e);
                          formik.handleSubmit();
                        }}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        disabled
                        name="laptopDeviceEmissions"
                        value={formik?.values?.laptopDeviceEmissions}
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-2 py-1">Desktop</td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="desktopDevice"
                        value={formik?.values?.desktopDevice}
                        onChange={(e) => {
                          const value = e.target.value;
                          formik.setFieldValue('desktopDevice', value);

                          const desktopEF1 = 0.097222 * Number(formik?.values?.TimeOnPageSecs);
                          const desktopEF2 = Number(formik?.values?.desktopDevice) * desktopEF1;
                          const desktopDeviceEmissions = (desktopEF2 * formik?.values?.desktopEF3).toFixed(5);

                          formik.setFieldValue('desktopDeviceEmissions', desktopDeviceEmissions);
                          formik.handleChange(e);
                          formik.handleSubmit();
                        }}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                    <td className="ps-2 py-1">
                      <TextField
                        size="small"
                        type="number"
                        disabled
                        name="desktopDeviceEmissions"
                        value={formik?.values?.desktopDeviceEmissions}
                        onChange={formik.handleChange}
                      />
                    </td>
                  </tr>

                </table>
              </div>
            </Box>
          </Grid> */}

          <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
            <Box>
              <Typography variant="h4" className="text-center text-white mb-4 mt-3">
                Device Emissions
              </Typography>
              <div className="table-responsive">
                <table className="table-custom-inpt-field">
                  <thead>
                    <tr>
                      <th className='ps-3'>Country</th>
                      {/* <th className='ps-3' /> */}
                      <th className="ps-3">Mobile</th>
                      <th className="ps-3">Tablet</th>
                      <th className="ps-3">Laptop</th>
                      <th className="ps-3">Desktop</th>
                      <th className="ps-3">
                        Emissions (kgCO<sub>2</sub>e)
                      </th>
                      <th className="ps-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formik.values.deviceRows?.map((row, index) => (
                      <React.Fragment key={index}>
                        <tr className='mb-2' key={index}>
                          <td className="ps-3 py-1">
                            <Select
                              labelId={`country-label-${index}`}
                              id={`country-select-${index}`}
                              value={formik.values.deviceRows[index].country}
                              onChange={(e) => handleDeviceRowChange(index, 'country', e.target.value)}
                              inputProps={{ style: { color: 'white' } }}
                              size="small"
                              sx={{
                                color: 'white',
                                width: '100%',
                                borderColor: 'white',
                                '.MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'white',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'white',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: 'white',
                                }
                              }}
                            >
                              {countries.map((c) => (
                                <MenuItem key={c.code} value={c.code}>
                                  {c.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name={`deviceRows[${index}].mobileDevice`}
                              value={formik.values.deviceRows[index].mobileDevice}
                              onChange={(e) => handleDeviceRowChange(index, 'mobileDevice', e.target.value)}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              value={formik.values.deviceRows[index].tabletDevice}
                              onChange={(e) => handleDeviceRowChange(index, 'tabletDevice', e.target.value)}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              value={formik.values.deviceRows[index].laptopDevice}
                              onChange={(e) => handleDeviceRowChange(index, 'laptopDevice', e.target.value)}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              value={formik.values.deviceRows[index].desktopDevice}
                              onChange={(e) => handleDeviceRowChange(index, 'desktopDevice', e.target.value)}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              value={formik.values.deviceRows[index].deviceTotalEmissions}
                              disabled
                              // onChange={(e) => handleDeviceRowChange(index, 'deviceTotalEmissions', e.target.value)}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          {/* <td className="ps-3 py-1">
                            <TextField
                              size="small"
                              type="number"
                              // name={`wifiTotalEmissions-${index}`}
                              value={formik.values.deviceRows[index].deviceEmissions}
                              disabled
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td> */}
                          <td className="ps-2 py-1">
                            <Button
                              variant="contained"
                              onClick={addDeviceRow}
                              className="custom-btn"
                            >
                              +
                            </Button>
                            {index > 0 && (
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                  const updatedRows = [...formik.values.deviceRows];
                                  updatedRows.splice(index, 1);
                                  formik.setFieldValue('deviceRows', updatedRows);
                                }}
                                style={{ marginLeft: '8px' }}
                              >
                                -
                              </Button>
                            )}
                          </td>
                        </tr>
                        {/* <tr>
                          <th className='ps-3' />
                          <th className="ps-2" style={{ textAlign: 'center' }}>
                            Emissions (kgCO<sub>2</sub>e)
                          </th>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              disabled
                              value={row.mobileDeviceEmissions}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              disabled
                              value={row.tabletDeviceEmissions}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              disabled
                              value={row.laptopDeviceEmissions}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              disabled
                              value={row.desktopDeviceEmissions}
                            />
                          </td>
                        </tr> */}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
            <Box>
              <Typography variant="h4" className="text-center text-white mb-4 mt-3">
                Data Center Emissions
              </Typography>
              <div className="table-responsive">
                <table className="table-custom-inpt-field">
                  <tr>
                    <td className="ps-3 invisible">Device Type</td>
                    <td className="ps-3">% of Renewable Energy</td>
                    <td className="ps-3">
                      Emissions (kgCO<sub>2</sub>e)
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-3 py-1" />
                    {/* <td className="ps-3 py-1">
                                            <TextField
                                                size="small"
                                                type="number"
                                                name="dataCenter"
                                                value={formik.values.dataCenter}
                                                onChange={(e) => {
                                                    formik.handleChange(e);

                                                    const dataCenter = Number(e.target.value) || 0;
                                                    const dataRenewable = Number(formik.values.dataRenewable) || 0;
                                                    const pageSizeMB = formik.values.pageSizeMB;

                                                    // Calculation Logic
                                                    const dataEf1 = (dataCenter * pageSizeMB) / 1024;
                                                    const dataEF3 = dataEf1 * 0.3;
                                                    const dataEF4 = dataEF3 * 1.7;
                                                    const renewableValue = 100 - dataRenewable;
                                                    const dataTotalEF = (dataEF4 * renewableValue) / 100;
                                                    const dataEmissions = dataTotalEF * 0.4;

                                                    // Update field value
                                                    formik.setFieldValue('dataEmissions', dataEmissions.toFixed(5));
                                                    formik.handleSubmit();
                                                }}
                                                inputProps={{ style: { color: 'white' } }}
                                            />
                                        </td> */}
                    <td className="ps-3 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="dataRenewable"
                        value={formik.values.dataRenewable}
                        onChange={(e) => {
                          formik.handleChange(e);

                          const dataRenewable = Number(e.target.value) || 0;
                          const dataCenter = Number(formik.values.dataCenter) || 0;
                          const pageSizeMB = formik.values.pageSizeMB; // Default value to avoid NaN

                          // Calculation Logic
                          const dataEf1 = (dataCenter * pageSizeMB) / 1024;
                          const dataEF3 = dataEf1 * 0.3;
                          const dataEF4 = dataEF3 * 1.7;
                          const renewableValue = 100 - dataRenewable;
                          const dataTotalEF = (dataEF4 * renewableValue) / 100;
                          const dataEmissions = dataTotalEF * 0.4;

                          // Update field value
                          formik.setFieldValue('dataEmissions', dataEmissions.toFixed(5));
                          formik.handleSubmit();
                        }}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                    <td className="ps-3 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="dataEmissions"
                        value={formik.values.dataEmissions}
                        disabled
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
            <Box>
              <Typography variant="h4" className="text-center text-white mb-4 mt-3">
                Total Emissions
              </Typography>
              <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
                <Table sx={{ minWidth: 400 }} aria-label="total emissions table">
                  <TableHead sx={{ backgroundColor: 'transparent' }}>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                          color: 'white',
                          backgroundColor: 'transparent',
                          visibility: 'hidden',
                          borderBottom: 'none',
                        }}
                      >
                        Emissions Source
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                          color: 'white',
                          backgroundColor: 'transparent',
                          borderBottom: 'none',
                        }}
                      >
                        Emissions (kgCO<sub>2</sub>e)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ borderBottom: 'none' }}>
                    <TableRow>
                      <TableCell sx={{ color: 'white', borderBottom: 'none' }}>Network</TableCell>
                      <TableCell sx={{ color: 'white', borderBottom: 'none' }}>
                        {Number(wifiTotal || 0).toFixed(5)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: 'white', borderBottom: 'none' }}>Device</TableCell>
                      <TableCell sx={{ color: 'white', borderBottom: 'none' }}>
                        {Number(totalDevice || 0).toFixed(5)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: 'white', borderBottom: 'none' }}>Data Center</TableCell>
                      <TableCell sx={{ color: 'white', borderBottom: 'none' }}>
                        {Number(formik.values.dataEmissions || 0).toFixed(5)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white', borderBottom: 'none' }}>
                        Total Emissions
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white', borderBottom: 'none' }}>
                        {Number(ImageTotalEmissions || 0).toFixed(5)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
        <Grid>
          <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'} mt={2}>
            <Stack direction={'row'} spacing={2}>
              <Button
                variant="contained"
                endIcon={<FaAngleDoubleRight />}
                type="submit"
                onClick={() => {
                  handleSaveToDb();
                  setValue(value + 1);
                }}
                className="custom-btn"
              >
                Save and Next Page
              </Button>
              <Button
                variant="contained"
                endIcon={<FaAngleDoubleRight />}
                onClick={() => {
                  handleSaveToDb();
                  setValue(3);
                }}
                className="custom-btn"
              >
                Go To Result
              </Button>
              {/* <Button variant='contained' onClick={() => { handleSaveToDb(); }} className='custom-btn'>SaveToDB</Button> */}
              <Button
                variant="outlined"
                onClick={() => {
                  formik.resetForm();
                  handeleDelete();
                }}
                color="error"
              >
                Clear
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} marginTop={3}>
            <Typography color="white" className="text-center">
              {`Total WebPage Carbon Footprint = ${Number(totalEmission || 0).toFixed(5)} `}kgCO<sub>2</sub>e
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default PageView;
