import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addCommsData, deleteCommsData, scopeChange } from '../../redux/slice/totalCommsSlice';
import { addResultTableData, deleteResTabCommsData } from '../../redux/slice/resultTableDataSlice';
import commsImg from '../../assets/comms.png';
import { IconDiv } from '../../components/IconDiv';

const Comms = (props) => {
  const { setValue, value } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const allData = useSelector((state) => state?.totalCommsDetails?.data[0]?.data);
  const totalEmission = useSelector((state) => state?.totalCommsDetails?.totalEmission);

  // -----------   initialValues
  const initialValues = {
    // Emails
    noOfEmails: '',
    emialEfOne: 4,
    emialEfTwo: 50,
    emailEmissionOne: '', // (noOfEmails * emialEfOne) / 1000
    emailEmissionTwo: '', // (totalAttachmentSize * emialEfTwo) / 1000
    attachmentSize: '',
    totalAttachmentSize: '', // noOfEmails * attachmentSize
    emissionOne: '', // emailEmissionOne + emailEmissionTwo          // emissions

    // Video Byte
    // prFileSizeOne: '',
    finalFileSizeOne: '',
    sendingToMediaOne: '',
    efTwo: 50,
    emissionTwo: '',
    // Pictures
    // prFileSizeTwo: '',
    finalFileSizeTwo: '',
    sendingToMediaTwo: '',
    efThree: 50,
    emissionThree: '',

    // // Social Media
    // // image
    // imgSize: '',
    // deviceEnergy1: '', // 0.01(1/60)
    // somePlatformEnergy1: '', // =(0.4/1000)*imgSize
    // networkEnergy1: '', // =(0.2/1000)*imgSize
    // totalEnergy1: '', // = deviceEnergy1 + somePlatformEnergy1 + networkEnergy1
    // efFour: '', // = totalEnergy1*0.43
    // impressionsOne: '', //
    // emissionFour: '',
    // // Video
    // videoSize: '',
    // videoMins: '',
    // deviceEnergy2: '', // = 0.01*( videoMins/60)
    // somePlatformEnergy2: '', // = ( videoSize/1000)*0.4
    // networkEnergy2: '', // = (0.2/1000)* videoSize
    // totalEnergy2: '', // = deviceEnergy2 + somePlatformEnergy2 + networkEnergy2
    // efFive: '', // = totalEnergy2*0.43
    // impressionsTwo: '',
    // emissionFive: '', // videoSize * videoMins * impressionsTwo * efTwo
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const emissionOne =
        values?.emailEmissionOne === 0 || values?.emailEmissionTwo === 0
          ? 0
          : Number(Number(values?.emailEmissionOne) + Number(values?.emailEmissionTwo)).toFixed(2);
      const emissionTwo =
        // values?.prFileSizeOne === 0 ||
        values?.finalFileSizeOne === 0 || values?.sendingToMediaOne === 0
          ? 0
          : Number(
            // Number(values?.prFileSizeOne) *
            Number(values?.finalFileSizeOne) *
            Number(values?.sendingToMediaOne) *
            Number(values?.efTwo)
          ).toFixed(2);
      const emissionThree =
        // values?.prFileSizeTwo === 0 ||
        values?.finalFileSizeTwo === 0 ||
          values?.sendingToMediaTwo === 0 ||
          values?.sendingToMediaTwo === 0
          ? 0
          : Number(
            // Number(values?.prFileSizeTwo) *
            Number(values?.finalFileSizeTwo) *
            Number(values?.sendingToMediaTwo) *
            Number(values?.efThree)
          ).toFixed(2);
      const emissionFour =
        values?.imgSize === 0 || values?.impressionsOne === 0 || values?.efFour === 0
          ? 0
          : Number(Number(values?.imgSize) * Number(values?.impressionsOne) * Number(values?.efFour)).toFixed(2);
      const emissionFive =
        values?.videoSize === 0 || values?.videoMins === 0 || values?.impressionsTwo === 0 || values?.efFive === 0
          ? 0
          : Number(
            Number(values?.videoSize) *
            Number(values?.videoMins) *
            Number(values?.impressionsTwo) *
            Number(values?.efFive)
          ).toFixed(2);

      if (emissionOne > 0) formik.setFieldValue('emissionOne', emissionOne);
      if (emissionTwo > 0) formik.setFieldValue('emissionTwo', emissionTwo);
      if (emissionThree > 0) formik.setFieldValue('emissionThree', emissionThree);
      // if (emissionFour > 0) formik.setFieldValue('emissionFour', emissionFour);
      // if (emissionFive > 0) formik.setFieldValue('emissionFive', emissionFive);

      const data = [
        {
          type: 'Emails',
          noOfEmails: values?.noOfEmails,
          emialEfOne: values?.emialEfOne,
          emialEfTwo: values?.emialEfTwo,
          emailEmissionOne:
            values?.noOfEmails === 0 ? 0 : Number(((values?.noOfEmails * values?.emialEfOne) / 1000).toFixed(2)),
          emailEmissionTwo:
            values?.totalAttachmentSize === 0
              ? 0
              : Number(((values?.totalAttachmentSize * values?.emialEfTwo) / 1000).toFixed(2)),
          attachmentSize: values?.attachmentSize,
          totalAttachmentSize:
            values?.noOfEmails === 0 || values?.attachmentSize === 0
              ? 0
              : Number((values?.noOfEmails * values?.attachmentSize).toFixed(2)),
          emission: emissionOne > 0 ? emissionOne : '',
        },
        {
          type: 'Video Byte',
          // prFileSizeOne: values?.prFileSizeOne,
          finalFileSizeOne: values?.finalFileSizeOne,
          sendingToMediaOne: values?.sendingToMediaOne,
          ef: values?.efTwo,
          emission: emissionTwo > 0 ? emissionTwo : '',
        },
        {
          type: 'Pictures',
          // prFileSizeTwo: values?.prFileSizeTwo,
          finalFileSizeTwo: values?.finalFileSizeTwo,
          sendingToMediaTwo: values?.sendingToMediaTwo,
          ef: values?.efThree,
          emission: emissionThree > 0 ? emissionThree : '',
        },
        // {
        //   type: 'Image',
        //   imgSize: values?.imgSize,
        //   deviceEnergy1: values?.deviceEnergy1,
        //   somePlatformEnergy1: values?.somePlatformEnergy1,
        //   networkEnergy1: values?.networkEnergy1,
        //   totalEnergy1: values?.totalEnergy1,
        //   ef: values?.efFour,
        //   impressionsOne: values?.impressionsOne,
        //   emission: emissionFour > 0 ? emissionFour : '',
        // },
        // {
        //   type: 'Video',
        //   videoSize: values?.videoSize,
        //   videoMins: values?.videoMins,
        //   deviceEnergy2: values?.deviceEnergy2,
        //   somePlatformEnergy2: values?.somePlatformEnergy2,
        //   networkEnergy2: values?.networkEnergy2,
        //   totalEnergy2: values?.totalEnergy2,
        //   ef: values?.efFive,
        //   impressionsTwo: values?.impressionsTwo,
        //   emission: emissionFive > 0 ? emissionFive : '',
        // },
      ];

      const tableData = [
        {
          subType: 'Email Invitations',
          subTypeData: {
            th: ['', 'No of Emails', 'Attachment Size (Mb)', 'Emissions'],
            td: [
              {
                cmType: 'Emails',
                noOfEmails: values?.noOfEmails,
                attachmentSize: values?.attachmentSize,
                emissions: emissionOne > 0 ? emissionOne : '',
              },
            ],
          },
          scope: 1,
        },
        {
          subType: 'PR Assets',
          subTypeData: {
            // th: ['', 'Production File Size', 'Final File Size', 'Sending To Media(No of Emails)', 'Emissions'],
            th: ['', 'File Size (in Mb)', 'Sending to Media (No of Emails)', 'Emissions'],
            td: [
              {
                cmType: 'Video Byte',
                // prFileSize: values?.prFileSizeOne,
                finalFileSize: values?.finalFileSizeOne,
                sendingToMedia: values?.sendingToMediaOne,
                emissions: emissionTwo > 0 ? emissionTwo : '',
              },
              {
                cmType: 'Pictures',
                // prFileSize: values?.prFileSizeTwo,
                finalFileSize: values?.finalFileSizeTwo,
                sendingToMedia: values?.sendingToMediaTwo,
                emissions: emissionThree > 0 ? emissionThree : '',
              },
            ],
            scope: 3,
          },
        },
        // {
        //   subType: 'Social Media',
        //   subTypeData: {
        //     th: ['', 'Image Size (in Mb)', 'Impressions', 'Emissions'],
        //     td: [
        //       {
        //         cmType: 'Image',
        //         imgSize: values?.imgSize,
        //         impressionsOne: values?.impressionsOne,
        //         emissions: emissionFour > 0 ? emissionFour : '',
        //       },
        //     ],
        //   },
        //   scope: 3,
        // },
        // {
        //   subType: '',
        //   subTypeData: {
        //     th: ['', 'Video Size (in Mb)', 'Video (in mins)', 'Impressions', 'Emissions'],
        //     td: [
        //       {
        //         cmType: 'Video',
        //         videoSize: values?.videoSize,
        //         videoMins: values?.videoMins,
        //         impressionsTwo: values?.impressionsTwo,
        //         emissions: emissionFive > 0 ? emissionFive : '',
        //       },
        //     ],
        //   },
        //   scope: 3,
        // },
      ];

      dispatch(addCommsData({ data }));
      dispatch(addResultTableData({ data: tableData, tabTitle: 'Comms' }));
    },
  });

  const handeleDelete = () => {
    dispatch(deleteCommsData());
    dispatch(deleteResTabCommsData());
  };

  useEffect(() => {
    if (allData?.length > 0) {
      formik.setFieldValue('noOfEmails', allData[0]?.noOfEmails);
      formik.setFieldValue('emialEfOne', allData[0]?.emialEfOne);
      formik.setFieldValue('emialEfTwo', allData[0]?.emialEfTwo);
      formik.setFieldValue('emailEmissionOne', allData[0]?.emailEmissionOne);
      formik.setFieldValue('emissionOne', allData[0]?.emission);
      formik.setFieldValue('emailEmissionTwo', allData[0]?.emailEmissionTwo);
      formik.setFieldValue('attachmentSize', allData[0]?.attachmentSize);
      formik.setFieldValue('totalAttachmentSize', allData[0]?.totalAttachmentSize);
      formik.setFieldValue('efOne', allData[1]?.efOne);
      formik.setFieldValue('emissionOne', allData[0]?.emission);

      // formik.setFieldValue('prFileSizeOne', allData[1]?.prFileSizeOne);
      formik.setFieldValue('finalFileSizeOne', allData[1]?.finalFileSizeOne);
      formik.setFieldValue('sendingToMediaOne', allData[1]?.sendingToMediaOne);
      formik.setFieldValue('efTwo', allData[1]?.efTwo);
      formik.setFieldValue('emissionTwo', allData[1]?.emission);

      // formik.setFieldValue('prFileSizeTwo', allData[2]?.prFileSizeTwo);
      formik.setFieldValue('finalFileSizeTwo', allData[2]?.finalFileSizeTwo);
      formik.setFieldValue('sendingToMediaTwo', allData[2]?.sendingToMediaTwo);
      formik.setFieldValue('emissionThree', allData[2]?.emission);

      // formik.setFieldValue('imgSize', allData[3]?.imgSize);
      // formik.setFieldValue('deviceEnergy1', allData[3]?.deviceEnergy1);
      // formik.setFieldValue('somePlatformEnergy1', allData[3]?.somePlatformEnergy1);
      // formik.setFieldValue('networkEnergy1', allData[3]?.networkEnergy1);
      // formik.setFieldValue('totalEnergy1', allData[3]?.totalEnergy1);
      // formik.setFieldValue('efFour', allData[3]?.ef);
      // formik.setFieldValue('impressionsOne', allData[3]?.impressionsOne);
      // formik.setFieldValue('emissionFour', allData[3]?.emission);

      // formik.setFieldValue('videoSize', allData[4]?.videoSize);
      // formik.setFieldValue('videoMins', allData[4]?.videoMins);
      // formik.setFieldValue('deviceEnergy2', allData[4]?.deviceEnergy2);
      // formik.setFieldValue('somePlatformEnergy2', allData[4]?.somePlatformEnergy2);
      // formik.setFieldValue('networkEnergy2', allData[4]?.networkEnergy2);
      // formik.setFieldValue('totalEnergy2', allData[4]?.totalEnergy2);
      // formik.setFieldValue('efFive', allData[4]?.ef);
      // formik.setFieldValue('impressionsTwo', allData[4]?.impressionsTwo);
      // formik.setFieldValue('emissionFive', allData[4]?.emission);
    }
  }, [value]);

  const { values } = formik;

  useEffect(() => {
    formik.setFieldValue(
      'totalEnergy1',
      Number(values.deviceEnergy1) + Number(values.somePlatformEnergy1) + Number(values.networkEnergy1)
    );
  }, [values.deviceEnergy1, values.somePlatformEnergy1, values.networkEnergy1]);

  useEffect(() => {
    formik.setFieldValue(
      'totalEnergy2',
      Number(values.deviceEnergy2) + Number(values.somePlatformEnergy2) + Number(values.networkEnergy2)
    );
  }, [values.deviceEnergy2, values.somePlatformEnergy2, values.networkEnergy2]);

  useEffect(() => {
    formik.setFieldValue('efFour', Number(values.totalEnergy1) * 0.43);
  }, [values.totalEnergy1]);

  useEffect(() => {
    formik.setFieldValue('efFive', Number(values.totalEnergy2) * 0.43);
  }, [values.totalEnergy2]);

  return (
    <div>
      <Container maxWidth>
        <Card
          className="p-4 custom-inner-bg textborder"
          style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}
        >
          <Box
            mx={useMediaQuery(theme.breakpoints.up('lg')) && 15}
            display={'flex'}
            alignItems={'center'}
            flexDirection={'column'}
          >
            <IconDiv>
              <img src={commsImg} alt="Local Transportation" width={100} className="tabImgWhite" />
            </IconDiv>
            <Grid
              // container
              rowSpacing={3}
              columnSpacing={{ xs: 0, sm: 5, md: 4 }}
            >
              <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                <Box>
                  <div className="table-responsive">
                    <Typography
                      variant="h4"
                      className="text-white mb-4 d-flex justify-content-center align-items-center my-4"
                    >
                      Email Invitations
                    </Typography>
                    <table className="table-custom-inpt-field">
                      <tr>
                        <th className="ps-2" />
                        <th className="ps-2">No of Emails</th>
                        <th className="ps-2">Attachment Size (Mb)</th>
                        <th className="ps-2">Emissions</th>
                      </tr>
                      <tr>
                        <td className="ps-2" width="100">
                          Emails{' '}
                        </td>
                        <td className="ps-2 py-1 ">
                          <TextField
                            size="small"
                            type="number"
                            name="noOfEmails"
                            value={values?.noOfEmails}
                            onChange={(e) => {
                              const emailEmissionOne =
                                e.target.value === 0
                                  ? 0
                                  : Number(((e.target.value * values?.emialEfOne) / 1000).toFixed(2));
                              const totalAttachmentSize =
                                e.target.value === 0 || values?.attachmentSize === 0
                                  ? 0
                                  : Number((e.target.value * values?.attachmentSize).toFixed(2));
                              const emailEmissionTwo =
                                totalAttachmentSize === 0
                                  ? 0
                                  : Number(((totalAttachmentSize * values?.emialEfTwo) / 1000).toFixed(2));

                              formik.setFieldValue('noOfEmails', e.target.value);
                              formik.setFieldValue('emailEmissionOne', emailEmissionOne);
                              formik.setFieldValue('totalAttachmentSize', totalAttachmentSize);
                              formik.setFieldValue('emailEmissionTwo', emailEmissionTwo);
                              formik.setFieldValue(
                                'emissionOne',
                                emailEmissionOne === 0 || emailEmissionTwo === 0
                                  ? 0
                                  : Number(Number(emailEmissionOne) + Number(emailEmissionTwo)).toFixed(2)
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
                            name="attachmentSize"
                            value={values?.attachmentSize}
                            onChange={(e) => {
                              const emailEmissionOne =
                                values?.noOfEmails === 0
                                  ? 0
                                  : Number(((values?.noOfEmails * values?.emialEfOne) / 1000).toFixed(2));
                              const totalAttachmentSize =
                                e.target.value === 0 || values?.noOfEmails === 0
                                  ? 0
                                  : Number((e.target.value * values?.noOfEmails).toFixed(2));
                              const emailEmissionTwo =
                                totalAttachmentSize === 0
                                  ? 0
                                  : Number(((totalAttachmentSize * values?.emialEfTwo) / 1000).toFixed(2));

                              formik.setFieldValue('attachmentSize', e.target.value);
                              formik.setFieldValue('emailEmissionOne', emailEmissionOne);
                              formik.setFieldValue('totalAttachmentSize', totalAttachmentSize);
                              formik.setFieldValue('emailEmissionTwo', emailEmissionTwo);
                              formik.setFieldValue(
                                'emissionOne',
                                emailEmissionOne === 0 || emailEmissionTwo === 0
                                  ? 0
                                  : Number(Number(emailEmissionOne) + Number(emailEmissionTwo)).toFixed(2)
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
                            name="emissionOne"
                            value={values?.emissionOne}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <Box>
                  <div className="table-responsive my-4">
                    <table className="table-custom-inpt-field">
                      <tr>
                        <th className="ps-2" />
                        {/* <th className='ps-3'>Production File Size (in Mb)</th> */}
                        <th className="ps-2">File Size (in Mb)</th>
                        <th className="ps-2" style={{ width: "246px" }}> Sending to Media (No of Emails)</th>
                        <th className="ps-2">Emissions</th>
                      </tr>
                      <tr>
                        <td className="ps-2" width="100">
                          Video Byte
                        </td>
                        {/* <td className='ps-3 py-1'>
                          <TextField size='small' type="number" name='prFileSizeOne' value={values?.prFileSizeOne}
                            onChange={(e) => {
                              const emissionTwo = e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.finalFileSizeOne) * Number(values?.sendingToMediaOne) * Number(values?.efTwo)).toFixed(2);
                              formik.setFieldValue("prFileSizeOne", e.target.value);
                              formik.setFieldValue("emissionTwo", emissionTwo);
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }} />
                        </td> */}
                        <td className="ps-2 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="finalFileSizeOne"
                            value={values?.finalFileSizeOne}
                            onChange={(e) => {
                              const emissionTwo =
                                e.target.value === 0
                                  ? 0
                                  : Number(
                                    Number(e.target.value) *
                                    // Number(values?.prFileSizeOne) *
                                    Number(values?.sendingToMediaOne) *
                                    Number(values?.efTwo)
                                  ).toFixed(2);
                              formik.setFieldValue('finalFileSizeOne', e.target.value);
                              formik.setFieldValue('emissionTwo', emissionTwo);
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="ps-2 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="sendingToMediaOne"
                            value={values?.sendingToMediaOne}
                            onChange={(e) => {
                              const emissionTwo =
                                e.target.value === 0
                                  ? 0
                                  : Number(
                                    Number(e.target.value) *
                                    // Number(values?.prFileSizeOne) *
                                    Number(values?.finalFileSizeOne) *
                                    Number(values?.efTwo)
                                  ).toFixed(2);
                              formik.setFieldValue('sendingToMediaOne', e.target.value);
                              formik.setFieldValue('emissionTwo', emissionTwo);
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="ps-2 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="emissionTwo"
                            disabled
                            value={values?.emissionTwo}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="ps-2 py-1">Pictures</td>
                        {/* <td className='ps-3 py-1'>
                          <TextField size='small' type="number" name='prFileSizeTwo' value={values?.prFileSizeTwo}
                            onChange={(e) => {
                              const emailEmissionThree = e.target.value === 0 ? 0 : Number((Number(e.target.value) * Number(values?.finalFileSizeTwo) * Number(values?.sendingToMediaTwo) * Number(values?.efTwo))).toFixed(2);
                              formik.setFieldValue("prFileSizeTwo", e.target.value);
                              formik.setFieldValue("emissionTwo", emailEmissionThree);
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }} />
                        </td> */}
                        <td className="ps-2 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="finalFileSizeTwo"
                            value={values?.finalFileSizeTwo}
                            onChange={(e) => {
                              const emailEmissionThree =
                                e.target.value === 0
                                  ? 0
                                  : Number(
                                    (Number(e.target.value) *
                                      // Number(values?.prFileSizeTwo) *
                                      Number(values?.sendingToMediaTwo) *
                                      Number(values?.efTwo)) /
                                    1000
                                  ).toFixed(2);
                              formik.setFieldValue('finalFileSizeTwo', e.target.value);
                              formik.setFieldValue('emissionThree', Number(emailEmissionThree).toFixed(2));
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="ps-2 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="sendingToMediaTwo"
                            value={values?.sendingToMediaTwo}
                            onChange={(e) => {
                              const emailEmissionThree =
                                e.target.value === 0
                                  ? 0
                                  : Number(
                                    (Number(e.target.value) *
                                      // Number(values?.prFileSizeTwo) *
                                      Number(values?.finalFileSizeTwo) *
                                      Number(values?.efTwo)) /
                                    1000
                                  ).toFixed(2);
                              formik.setFieldValue('sendingToMediaTwo', e.target.value);
                              formik.setFieldValue('emissionThree', Number(emailEmissionThree).toFixed(2));
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="ps-2 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="emissionThree"
                            disabled
                            value={values?.emissionThree}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </Box>
              </Grid>

              {/* <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                <Box>
                  <div className="table-responsive">
                    <Typography
                      variant="h4"
                      className="text-white d-flex justify-content-center align-items-center my-4"
                    >
                      Social Media
                    </Typography>
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: '16px',
                        marginBottom: "40px"
                      }}
                    >
                      <Card
                        sx={{
                          width: 260,
                          maxWidth: '100%',
                          boxShadow: 'lg',
                          marginY: '16px',
                        }}
                      >
                        <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ marginY: 1 }}>
                            Image
                          </Typography>
                          <TextField
                            size="small"
                            type="number"
                            name="imgSize"
                            value={values?.imgSize}
                            label="Image Size (in Mb)"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                              formik.setFieldValue('imgSize', Number(e.target.value));
                              formik.setFieldValue('deviceEnergy1', 0.01 * (1 / 60));
                              formik.setFieldValue('somePlatformEnergy1', (0.4 / 1000) * Number(e.target.value));
                              formik.setFieldValue('networkEnergy1', (0.2 / 1000) * Number(e.target.value));
                              formik.setFieldValue(
                                'totalEnergy1',
                                0.01 * (Number(e.target.value) / 60) +
                                (0.4 / 1000) * Number(e.target.value) +
                                (0.2 / 1000 + Number(e.target.value))
                              );
                              formik.handleSubmit();
                            }}
                            sx={{ marginTop: 2 }}
                            inputProps={{ style: { color: 'black' } }}
                          />
                          <TextField
                            size="small"
                            type="number"
                            name={'impressionsOne'}
                            value={values?.impressionsOne}
                            label="Impressions"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                              formik.setFieldValue('impressionsOne', Number(e.target.value));
                              formik.setFieldValue(
                                'emissionFour',
                                (Number(e.target.value) * Number(values.imgSize) * Number(values.efOne)).toFixed(2)
                              );
                              formik.handleSubmit();
                            }}
                            sx={{ marginTop: 2 }}
                            inputProps={{ style: { color: 'black' } }}
                          />
                          <TextField
                            size="small"
                            type="number"
                            disabled
                            name="emissionFour"
                            label="Emissions"
                            variant="outlined"
                            fullWidth
                            value={values?.emissionFour}
                            onChange={formik.handleChange}
                            sx={{ marginTop: 2 }}
                          />
                        </CardContent>
                      </Card>
                      <Card
                        sx={{
                          width: 260,
                          maxWidth: '100%',
                          boxShadow: 'lg',
                          marginY: '16px',
                        }}
                      >
                        <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ marginY: 1 }}>
                            Video
                          </Typography>
                          <TextField
                            size="small"
                            type="number"
                            name="videoSize"
                            value={values?.videoSize}
                            label="Video Size (in Mb)"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                              formik.setFieldValue('videoSize', Number(e.target.value));
                              formik.setFieldValue(
                                'somePlatformEnergy2',
                                Number((Number(e.target.value) / 1000) * 0.4)
                              );
                              formik.setFieldValue('networkEnergy2', Number((0.2 / 1000) * Number(e.target.value)));
                              formik.setFieldValue(
                                'emissionFive',
                                (
                                  Number(e.target.value) *
                                  Number(values?.impressionsTwo) *
                                  Number(values.videoMins) *
                                  Number(values.efTwo)
                                ).toFixed(2)
                              );
                              formik.handleSubmit();
                            }}
                            sx={{ marginTop: 2 }}
                            inputProps={{ style: { color: 'black' } }}
                          />
                          <TextField
                            size="small"
                            type="number"
                            name={'videoMins'}
                            value={values?.videoMins}
                            label="Video (in mins)"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                              formik.setFieldValue('videoMins', Number(e.target.value));
                              formik.setFieldValue('deviceEnergy2', Number(0.01 * (Number(e.target.value) / 60)));
                              formik.handleSubmit();
                            }}
                            sx={{ marginTop: 2 }}
                            inputProps={{ style: { color: 'black' } }}
                          />
                          <TextField
                            size="small"
                            type="number"
                            name="impressionsTwo"
                            value={values?.impressionsTwo}
                            label="Impressions"
                            variant="outlined"
                            fullWidth
                            onChange={(e) => {
                              formik.setFieldValue('impressionsTwo', Number(e.target.value));
                              formik.setFieldValue(
                                'emissionFive',
                                (
                                  Number(e.target.value) *
                                  Number(values.videoSize) *
                                  Number(values.videoMins) *
                                  Number(values.efTwo)
                                ).toFixed(2)
                              );
                              formik.handleSubmit();
                            }}
                            sx={{ marginTop: 2 }}
                            inputProps={{ style: { color: 'black' } }}
                          />
                          <TextField
                            size="small"
                            type="number"
                            disabled
                            label="Emissions"
                            variant="outlined"
                            fullWidth
                            name={'emissionFive'}
                            value={values?.emissionFive}
                            onChange={formik.handleChange}
                            sx={{ marginTop: 2 }}
                          />
                        </CardContent>
                      </Card>
                    </Box>
                  </div>
                </Box>
              </Grid> */}

              {/* <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                <Box>
                  <div className="table-responsive my-4">
                    <table className="table-custom-inpt-field">
                      <tr>
                        <th className="ps-2" />
                        <th className="ps-3">Video Size (in Mb)</th>
                        <th className="ps-3">Video (in mins)</th>
                        <th className="ps-3">Impressions</th>
                        <th className="ps-2">Emissions</th>
                      </tr>
                      <tr>
                        <td className="ps-2 py-1" width="100">
                          Video
                        </td>
                        <td className="ps-3 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="videoSize"
                            value={values?.videoSize}
                            onChange={(e) => {
                              formik.setFieldValue('videoSize', Number(e.target.value));
                              formik.setFieldValue(
                                'somePlatformEnergy2',
                                Number((Number(e.target.value) / 1000) * 0.4)
                              );
                              formik.setFieldValue('networkEnergy2', Number((0.2 / 1000) * Number(e.target.value)));
                              formik.setFieldValue(
                                'emissionFive',
                                (
                                  Number(e.target.value) *
                                  Number(values?.impressionsTwo) *
                                  Number(values.videoMins) *
                                  Number(values.efTwo)
                                ).toFixed(2)
                              );
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="ps-3 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="videoMins"
                            value={values?.videoMins}
                            onChange={(e) => {
                              formik.setFieldValue('videoMins', Number(e.target.value));
                              formik.setFieldValue('deviceEnergy2', Number(0.01 * (Number(e.target.value) / 60)));
                              formik.handleSubmit();
                            }}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="ps-3 py-1">
                          <TextField
                            size="small"
                            type="number"
                            name="impressionsTwo"
                            value={values?.impressionsTwo}
                            onChange={(e) => {
                              formik.setFieldValue('impressionsTwo', Number(e.target.value));
                              formik.setFieldValue(
                                'emissionFive',
                                (
                                  Number(e.target.value) *
                                  Number(values.videoSize) *
                                  Number(values.videoMins) *
                                  Number(values.efTwo)
                                ).toFixed(2)
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
                            name="emissionFive"
                            disabled
                            value={values?.emissionFive}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </Box>
              </Grid> */}

              <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                <Stack direction={'row'} spacing={2}>
                  {/* <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button> */}
                  <Button
                    variant="contained"
                    startIcon={<FaAngleDoubleLeft />}
                    onClick={() => {
                      formik.handleSubmit();
                      setValue(value - 1);
                    }}
                    className="custom-btn"
                  >
                    Save and Previous Page
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<FaAngleDoubleRight />}
                    onClick={() => {
                      formik.handleSubmit();
                      setValue(value + 1);
                    }}
                    className="custom-btn"
                  >
                    {' '}
                    Save and Next Page
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<FaAngleDoubleRight />}
                    onClick={() => setValue(9)}
                    className="custom-btn"
                  >
                    Go To Result
                  </Button>
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
              <Grid item xs={12} sm={12} md={12} marginY={2}>
                <Typography color="white">
                  {`Total Comms Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    </div>
  );
};

export default Comms;
