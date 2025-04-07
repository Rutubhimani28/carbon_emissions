import React, { useEffect } from 'react';
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
  Stack,
  Button,
} from '@mui/material';
import { FaAngleDoubleRight, FaImage, FaFileVideo, FaAngleDoubleLeft } from 'react-icons/fa';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import useEventData from '../../hooks/useEventData';
import { addVideoData, deleteVideoData } from '../../redux/slice/videoSlice';
// import { addCampaignData, deleteCampaignData } from '../../redux/slice/totalDigitalCampaignSlice';
import {
  deleteResTabVideoData,
  addResultTableData,
  addResultTableDatasToDb,
  updateResultTableDatasToDb,
} from '../../redux/slice/resultTableDataSlice';

const Video = (props) => {
  const { setValue, value } = props;
  const allData = useSelector((state) => state?.totalVideoDetails?.data?.[0]?.data);
  const totalEmission = useSelector((state) => state?.totalVideoDetails?.totalEmission);
  const resultTableData = useSelector((state) => state?.resultTableDataDetails);
  const eventsData = useEventData();
  const dispatch = useDispatch();
  const initialValues = {
    totalImpression: '',

    wifiImpression: '',
    wifi4GImpression: '',
    wifi5GImpression: '',
    wifiTotalEmissions: '',
    videoLength: '',
    videoSize: '',
    mobileDevice: '',
    mobileDeviceEmissions: '',
    EFMobile1: 0.001111,
    EFMobile3: 0.727,
    tabletDevice: '',
    tabletDeviceEmissions: '',
    tabletEF1: 0.00625,
    tabletEF3: 0.727,
    laptopDevice: '',
    laptopDeviceEmissions: '',
    laptopEF1: 0.013889,
    laptopEF3: 0.727,
    desktopDevice: '',
    desktopDeviceEmissions: '',
    desktopEF1: 0.097222,
    desktopEF3: 0.727,

    dataCenter: '',
    dataRenewable: '',
    dataEmissions: '',
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const wifiEF1 = values?.videoSize / 1024;
      const wifiEF3 = Number(values?.wifiImpression) * wifiEF1 * 0.05;
      const wifiEF5 = Number(values?.wifi4GImpression) * wifiEF1 * 0.12;
      const wifiEF7 = Number(values?.wifi5GImpression) * wifiEF1 * 0.012;
      const wifiTotalEF = wifiEF3 + wifiEF5 + wifiEF7;
      const wifiTotalEmissions = wifiTotalEF * 0.727;

      const EFMobile2 = Number(values?.mobileDevice) * values?.videoLength * values?.EFMobile1;
      const mobileDeviceEmissions = EFMobile2 * values?.EFMobile3;
      const tabletEF2 = Number(values?.tabletDevice) * values?.videoLength * values?.tabletEF1;
      const tabletDeviceEmissions = tabletEF2 * values?.tabletEF3;
      const laptopEF2 = Number(values?.laptopDevice) * values?.videoLength * values?.laptopEF1;
      const laptopDeviceEmissions = laptopEF2 * values?.laptopEF3;
      const desktopEF2 = Number(values?.desktopDevice) * values?.videoLength * values?.desktopEF1;
      const desktopDeviceEmissions = desktopEF2 * values?.desktopEF3;

      const dataEf1 = (Number(values.dataCenter) * values.videoSize) / 1024;
      const dataEF3 = dataEf1 * 0.3;
      const dataEF4 = dataEF3 * 1.7;
      const dataEF5 = 100 - Number(values.dataRenewable);
      const dataTotalEF = (dataEF4 * dataEF5) / 100;
      const dataEmissions = dataTotalEF * 0.4;

      if (wifiTotalEmissions > 0) formik.setFieldValue('wifiTotalEmissions', wifiTotalEmissions.toFixed(5));

      if (dataEmissions > 0) {
        formik.setFieldValue('dataEmissions', dataEmissions.toFixed(5) || 0);
      } else {
        formik.setFieldValue('dataEmissions', dataEmissions.toFixed(5));
      }

      if (mobileDeviceEmissions > 0) formik.setFieldValue('mobileDeviceEmissions', mobileDeviceEmissions.toFixed(5));
      if (tabletDeviceEmissions > 0) formik.setFieldValue('tabletDeviceEmissions', tabletDeviceEmissions.toFixed(5));
      if (laptopDeviceEmissions > 0) formik.setFieldValue('laptopDeviceEmissions', laptopDeviceEmissions.toFixed(5));
      if (desktopDeviceEmissions > 0) formik.setFieldValue('desktopDeviceEmissions', desktopDeviceEmissions.toFixed(5));

      const data = [
        {
          type: 'Network Emissions',
          wifi: values?.wifiImpression,
          wifi4g: values?.wifi4GImpression,
          wifi5g: values?.wifi5GImpression,
          emission: Number(wifiTotalEmissions).toFixed(5) > 0 ? Number(wifiTotalEmissions).toFixed(5) : '',
        },
        {
          type: 'Device Emissions',
          mobile: values?.mobileDevice,
          mobileEmission: mobileDeviceEmissions > 0 ? mobileDeviceEmissions : '',
          tablet: values?.tabletDevice,
          tabletEmission: tabletDeviceEmissions > 0 ? tabletDeviceEmissions : '',
          laptop: values?.laptopDevice,
          laptopEmission: laptopDeviceEmissions > 0 ? laptopDeviceEmissions : '',
          desktop: values?.desktopDevice,
          desktopEmission: desktopDeviceEmissions > 0 ? desktopDeviceEmissions : '',
        },
        {
          type: 'Data Center Emissions',
          dataCenter: values?.dataCenter,
          renewable: values?.dataRenewable,
          emission: dataEmissions > 0 ? dataEmissions : '',
        },
        {
          type: 'video',
          videoLength: values?.videoLength,
          videoSize: values?.videoSize,
          totalImpression: values?.totalImpression,
        },
      ];
      const tableData = [
        {
          subType: 'video',
          subTypeData: {
            th: ['videoLength', 'videoSize', 'videoSize'],
            td: [
              {
                videoLength: values?.videoLength,
                videoSize: values?.videoSize,
                totalImpression: values?.totalImpression,
              },
            ],
          },
        },
        {
          subType: 'Network Emissions',
          subTypeData: {
            th: ['Wi-Fi Impressions', '4G Impressions', '5G Impressions', 'Emissions'],
            td: [
              {
                wifiImpression: values?.wifiImpression,
                wifi4g: values?.wifi4GImpression,
                wifi5g: values?.wifi5GImpression,
                emissions: wifiTotalEmissions > 0 ? wifiTotalEmissions : '',
              },
            ],
          },
        },
        {
          subType: 'Device Emissions',
          subTypeData: {
            th: ['Device Type', 'No. of Devices', 'Emissions'],
            td: [
              {
                dgType: 'Mobile',
                noOfDevice: values?.mobileDevice,
                emissions: mobileDeviceEmissions > 0 ? mobileDeviceEmissions : '',
              },
              {
                dgType: 'Tablet',
                noOfDevice: values?.tabletDevice,
                emissions: tabletDeviceEmissions > 0 ? tabletDeviceEmissions : '',
              },
              {
                dgType: 'Laptop',
                noOfDevice: values?.laptopDevice,
                emissions: laptopDeviceEmissions > 0 ? laptopDeviceEmissions : '',
              },
              {
                dgType: 'Desktop',
                noOfDevice: values?.desktopDevice,
                emissions: desktopDeviceEmissions > 0 ? desktopDeviceEmissions : '',
              },
            ],
          },
        },
        {
          subType: 'Data Center Emissions',
          subTypeData: {
            th: ['Total Impressions', '% of Renewable Energy', 'Emissions'],
            td: [
              {
                dgType: values?.dataCenter,
                noOfDevice: values?.dataRenewable,
                emissions: dataEmissions > 0 ? dataEmissions : '',
              },
            ],
          },
        },
      ];

      dispatch(addVideoData({ data }));
      dispatch(addResultTableData({ from: 'digitalCampaign', data: tableData, tabTitle: 'Video' }));
    },
  });
  const handeleDelete = () => {
    dispatch(deleteVideoData());
    dispatch(deleteResTabVideoData());
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

  useEffect(() => {
    if (allData?.length > 0) {
      formik.setFieldValue('wifiImpression', allData?.[0]?.wifi);
      formik.setFieldValue('wifi4GImpression', allData?.[0]?.wifi4g);
      formik.setFieldValue('wifi5GImpression', allData?.[0]?.wifi5g);
      formik.setFieldValue('wifiTotalEmissions', allData?.[0]?.emission);

      formik.setFieldValue('mobileDevice', allData?.[1]?.mobile);
      formik.setFieldValue('mobileDeviceEmissions', allData?.[1]?.mobileEmission);
      formik.setFieldValue('tabletDevice', allData?.[1]?.tablet);
      formik.setFieldValue('tabletDeviceEmissions', allData?.[1]?.tabletEmission);
      formik.setFieldValue('laptopDevice', allData?.[1]?.laptop);
      formik.setFieldValue('laptopDeviceEmissions', allData?.[1]?.laptopEmission);
      formik.setFieldValue('desktopDevice', allData?.[1]?.desktop);
      formik.setFieldValue('desktopDeviceEmissions', allData?.[1]?.desktopEmission);

      formik.setFieldValue('dataCenter', allData?.[2]?.dataCenter);
      formik.setFieldValue('dataRenewable', allData?.[2]?.renewable);
      formik.setFieldValue('dataEmissions', allData?.[2]?.emission);

      formik.setFieldValue('videoLength', allData?.[3]?.videoLength);
      formik.setFieldValue('videoSize', allData?.[3]?.videoSize);
      formik.setFieldValue('totalImpression', allData?.[3]?.totalImpression);
    }
  }, [value]);

  const totalDevice =
    (Number(formik?.values?.mobileDeviceEmissions) || 0) +
    (Number(formik?.values?.tabletDeviceEmissions) || 0) +
    (Number(formik?.values?.laptopDeviceEmissions) || 0) +
    (Number(formik?.values?.desktopDeviceEmissions) || 0);

  const videoTotalEmissions =
    (Number(formik.values.wifiTotalEmissions) || 0) +
    (Number(totalDevice) || 0) +
    (Number(formik?.values?.dataEmissions) || 0);

  return (
    <Container maxWidth>
      <Card className="p-3 custom-inner-bg textborder" style={{ padding: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
            <Box>
              <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                <div className="table-responsive">
                  <table className="table-custom-inpt-field">
                    <tr>
                      <td className="ps-2 py-1">Video Length (Secs)</td>
                      <td className="ps-2 py-1">
                        <TextField
                          size="small"
                          type="number"
                          name="videoLength"
                          value={formik?.values?.videoLength}
                          onChange={formik.handleChange}
                          inputProps={{ style: { color: 'white' } }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-2 py-1">Video Size (Mb)</td>
                      <td className="ps-2 py-1">
                        <TextField
                          size="small"
                          type="number"
                          name="videoSize"
                          value={formik?.values?.videoSize}
                          onChange={formik.handleChange}
                          inputProps={{ style: { color: 'white' } }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="ps-2 py-1">Total Impressions</td>
                      <td className="ps-2 py-1">
                        <TextField
                          size="small"
                          type="number"
                          name="totalImpression"
                          value={formik?.values?.totalImpression}
                          onChange={formik.handleChange}
                          inputProps={{ style: { color: 'white' } }}
                        />
                      </td>
                    </tr>
                  </table>
                </div>
              </Grid>
              <Typography variant="h4" className="text-center text-white mb-4 mt-4">
                Network Emissions
              </Typography>
              <div className="table-responsive">
                <table className="table-custom-inpt-field">
                  <tr>
                    <td className="ps-3">Wi-Fi Impressions</td>
                    <td className="ps-3">4G Impressions</td>
                    <td className="ps-3">5G Impressions</td>
                    <td className="ps-3">Emissions</td>
                  </tr>
                  <tr>
                    <td className="ps-3 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="wifiImpression"
                        value={formik.values.wifiImpression}
                        onChange={(e) => {
                          const value = e.target.value;
                          formik.setFieldValue('wifiImpression', value);
                          const wifiEF1 = formik.values.videoSize / 1024;
                          const wifiEF3 = (Number(value) || 0) * wifiEF1 * 0.05;
                          const wifiEF5 = (Number(formik.values.wifi4GImpression) || 0) * wifiEF1 * 0.12;
                          const wifiEF7 = (Number(formik.values.wifi5GImpression) || 0) * wifiEF1 * 0.012;
                          const wifiTotalEF = wifiEF3 + wifiEF5 + wifiEF7;
                          const wifiTotalEmissions = (wifiTotalEF * 0.727).toFixed(5);
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
                          const wifiEF1 = formik.values.videoSize / 1024;
                          const wifiEF3 = (Number(formik.values.wifiImpression) || 0) * wifiEF1 * 0.05;
                          const wifiEF5 = (Number(value) || 0) * wifiEF1 * 0.12;
                          const wifiEF7 = (Number(formik.values.wifi5GImpression) || 0) * wifiEF1 * 0.012;
                          const wifiTotalEF = wifiEF3 + wifiEF5 + wifiEF7;
                          const wifiTotalEmissions = (wifiTotalEF * 0.727).toFixed(5);
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
                          const wifiEF1 = formik.values.videoSize / 1024;
                          const wifiEF3 = (Number(formik.values.wifiImpression) || 0) * wifiEF1 * 0.05;
                          const wifiEF5 = (Number(formik.values.wifi4GImpression) || 0) * wifiEF1 * 0.12;
                          const wifiEF7 = (Number(value) || 0) * wifiEF1 * 0.012;
                          const wifiTotalEF = wifiEF3 + wifiEF5 + wifiEF7;
                          const wifiTotalEmissions = (wifiTotalEF * 0.727).toFixed(5);
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
                  </tr>
                </table>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
            <Box>
              <Typography variant="h4" className="text-center text-white mb-4">
                Device Emissions
              </Typography>
              <div className="table-responsive">
                <table className="table-custom-inpt-field">
                  <tr>
                    <th className="ps-2">Device Type </th>
                    <th className="ps-2">No. of Devices</th>
                    <th className="ps-2">Emissions</th>
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
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'mobileDeviceEmissions',
                            (
                              Number(e?.target?.value) *
                              formik?.values?.EFMobile1 *
                              formik.values?.videoLength *
                              formik?.values?.EFMobile3
                            ).toFixed(5)
                          );
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
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'tabletDeviceEmissions',
                            (
                              Number(e?.target?.value) *
                              formik?.values?.tabletEF1 *
                              formik?.values?.videoLength *
                              formik?.values?.tabletEF3
                            ).toFixed(5)
                          );
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
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'laptopDeviceEmissions',
                            (
                              Number(e?.target?.value) *
                              formik?.values?.laptopEF1 *
                              formik.values?.videoLength *
                              formik?.values?.laptopEF3
                            ).toFixed(5)
                          );
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
                          formik.handleChange(e);
                          formik.setFieldValue(
                            'desktopDeviceEmissions',
                            (
                              Number(e?.target?.value) *
                              formik?.values?.desktopEF1 *
                              formik?.values?.videoLength *
                              formik?.values?.desktopEF3
                            ).toFixed(5)
                          );
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
                  <tr>
                    <td className="ps-2">Total</td>
                    <td />
                    <td style={{ textAlign: 'right' }}>{Number(totalDevice).toFixed(5)}</td>
                  </tr>
                </table>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
            <Box>
              <Typography variant="h4" className="text-center text-white mb-4">
                Data Center Emissions
              </Typography>
              <div className="table-responsive">
                <table className="table-custom-inpt-field">
                  <tr>
                    <td className="ps-3">Total Impressions</td>
                    <td className="ps-3">% of Renewable Energy</td>
                    <td className="ps-3">Emissions</td>
                  </tr>
                  <tr>
                    <td className="ps-3 py-1">
                      <TextField
                        size="small"
                        type="number"
                        name="dataCenter"
                        value={formik.values.dataCenter}
                        onChange={(e) => {
                          formik.handleChange(e);

                          const dataCenter = Number(e.target.value) || 0;
                          const dataRenewable = Number(formik.values.dataRenewable) || 0;
                          const videoSize = formik.values.videoSize || 1; // Default value to avoid NaN

                          // Calculation Logic
                          const dataEf1 = (dataCenter * videoSize) / 1024;
                          const dataEF3 = dataEf1 * 0.3;
                          const dataEF4 = dataEF3 * 1.7;
                          const dataEF5 = 100 - dataRenewable;
                          const dataTotalEF = (dataEF4 * dataEF5) / 100;
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
                        name="dataRenewable"
                        value={formik.values.dataRenewable}
                        onChange={(e) => {
                          formik.handleChange(e);

                          const dataRenewable = Number(e.target.value) || 0;
                          const dataCenter = Number(formik.values.dataCenter) || 0;
                          const videoSize = formik.values.videoSize || 1; // Default value to avoid NaN

                          // Calculation Logic
                          const dataEf1 = (dataCenter * videoSize) / 1024;
                          const dataEF3 = dataEf1 * 0.3;
                          const dataEF4 = dataEF3 * 1.7;
                          const dataEF5 = 100 - dataRenewable;
                          const dataTotalEF = (dataEF4 * dataEF5) / 100;
                          const dataEmissions = dataTotalEF * 0.4;

                          // Update field value
                          formik.setFieldValue('dataEmissions', dataEmissions.toFixed(5));
                          formik?.handleSubmit();
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
              <Typography variant="h4" className="text-center text-white mb-4">
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
                        Emissions (Kg CO2e)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ borderBottom: 'none' }}>
                    <TableRow>
                      <TableCell sx={{ color: 'white', borderBottom: 'none' }}>Network</TableCell>
                      <TableCell sx={{ color: 'white', borderBottom: 'none' }}>
                        {Number(formik.values.wifiTotalEmissions || 0)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: 'white', borderBottom: 'none' }}>Device</TableCell>
                      <TableCell sx={{ color: 'white', borderBottom: 'none' }}>{Number(totalDevice || 0)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ color: 'white', borderBottom: 'none' }}>Data Center</TableCell>
                      <TableCell sx={{ color: 'white', borderBottom: 'none' }}>
                        {Number(formik.values.dataEmissions || 0)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white', borderBottom: 'none' }}>
                        Total Emissions
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white', borderBottom: 'none' }}>
                        {Number(videoTotalEmissions || 0).toFixed(5)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
        <Grid>
          <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
            <Stack direction={'row'} spacing={2}>
              <Button
                variant="contained"
                startIcon={<FaAngleDoubleLeft />}
                onClick={() => {
                  handleSaveToDb(formik?.values);
                  // formik.handleSubmit();
                  setValue(value - 1);
                }}
                className="custom-btn"
              >
                Save and Previous Page
              </Button>
              <Button
                variant="contained"
                endIcon={<FaAngleDoubleRight />}
                type="submit"
                onClick={() => {
                  handleSaveToDb(formik?.values);
                  setValue(value + 1);
                }}
                className="custom-btn"
              >
                Save and Next Page
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
              {`Total Video Carbon Footprint = ${Number(totalEmission || 0).toFixed(5)} `}kgCO<sub>2</sub>e
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default Video;
