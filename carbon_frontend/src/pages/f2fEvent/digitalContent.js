import {
  Box,
  Button,
  Card,
  Container,
  FormLabel,
  Grid,
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
import * as yup from 'yup';
import { addData, deleteData } from '../../redux/slice/totalDigitalContSlice';
import {
  addResultTableData,
  deleteResTableDigitalContData,
  addResultTableDatasToDb,
  updateResultTableDatasToDb,
} from '../../redux/slice/resultTableDataSlice';
import DigitalImg from '../../assets/Digital.png';
import { IconDiv } from '../../components/IconDiv';
import useEventData from '../../hooks/useEventData';

const DigitalContent = (props) => {
  const { setValue, value } = props;
  const theme = useTheme();
  const dispatch = useDispatch();

  const allData = useSelector((state) => state?.totalDigitalContentDetails?.data?.[0]?.data);
  const totalEmission = useSelector((state) => state?.totalDigitalContentDetails?.totalEmission);
  const resultTableData = useSelector((state) => state?.resultTableDataDetails);
  const eventsData = useEventData();

  // -----------  validationSchema
  const validationSchema = yup.object({
    type: yup.string().required('Type is required'),
  });

  // -----------   initialValues
  const initialValues = {
    // count: 0,
    // MB: 0''
    // Colours: 0,
    // noOfHours: 0,
    // serviceLifeOfLaptop: 0,
    // emissionOne: 0,
    // emissionTwo: 0,
    // emissionThree: 0,

    noOfEmails: '',
    emialEfOne: 4,
    emialEfTwo: 50,
    emailEmissionOne: '', // (noOfEmails * emialEfOne) / 1000
    emailEmissionTwo: '', // (totalAttachmentSize * emialEfTwo) / 1000
    // attachmentSize: '',
    totalAttachmentSize: '', // noOfEmails * attachmentSize
    emissionOne: '', // emailEmissionOne + emailEmissionTwo          // emissions
    Colours: '',
    noOfHours: '',
    serviceLifeOfLaptop: '',
    emissionTwo: '',
    blackAndWhite: '',
    emissionThree: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      // const emissionOne = Number(values?.count) * 4 / 1000;
      // const emissionTwo = Number(values?.MB) * 50 / 1000;
      // const emissionThree = Number((values?.Colours * 340 * (values?.noOfHours / 5840)).toFixed(5)) || 0;
      const emissionOne =
        values?.noOfEmails === 0 ? 0 : Number((Number(values?.noOfEmails) * 4 * 50) / 1000).toFixed(5);
      console.log(emissionOne, 'emissionOne');
      // const emissionOne = values?.emailEmissionOne === 0 || values?.emailEmissionTwo === 0 ? 0 : Number(Number(values?.emailEmissionOne) + Number(values?.emailEmissionTwo)).toFixed(5);
      const emissionTwo = Number((values?.Colours * 0.976).toFixed(5)) || 0;
      const emissionThree = Number((values?.blackAndWhite * 0.946).toFixed(5)) || 0;
      if (emissionOne > 0) formik.setFieldValue('emissionOne', emissionOne);
      if (emissionTwo > 0) formik.setFieldValue('emissionTwo', emissionTwo);
      if (emissionThree > 0) formik.setFieldValue('emissionThree', emissionThree);
      // if (emissionThree > 0) formik.setFieldValue('emissionThree', emissionThree);

      const data = [
        // {
        //     type: 'Emails',
        //     count: values?.count,
        //     emission: (emissionOne > 0) ? emissionOne : ''
        // },
        // {
        //     type: 'Attachments',
        //     mb: values?.MB,
        //     emission: (emissionTwo > 0) ? emissionTwo : ''
        // },
        {
          name: 'Emails',
          noOfEmails: values?.noOfEmails,
          // emialEfOne: values?.emialEfOne,
          // emialEfTwo: values?.emialEfTwo,
          // emailEmissionOne: values?.noOfEmails === 0 ? 0 : Number(((values?.noOfEmails * values?.emialEfOne) / 1000).toFixed(5)),
          // emailEmissionTwo: values?.totalAttachmentSize === 0 ? 0 : Number(((values?.totalAttachmentSize * values?.emialEfTwo) / 1000).toFixed(5)),
          // attachmentSize: values?.attachmentSize,
          // totalAttachmentSize: values?.noOfEmails === 0 || values?.attachmentSize === 0 ? 0 : Number((values?.noOfEmails * values?.attachmentSize).toFixed(5)),
          emission: emissionOne > 0 ? emissionOne : '',
        },
        {
          type: 'Colour',
          Colours: values?.Colours,
          //   noOfHours: values?.noOfHours,
          //   serviceLifeOfLaptop: values?.serviceLifeOfLaptop,
          emission: emissionTwo > 0 ? emissionTwo : '',
        },
        {
          type: 'Black & White',
          blackAndWhite: values?.blackAndWhite,
          //   noOfHours: values?.noOfHours,
          //   serviceLifeOfLaptop: values?.serviceLifeOfLaptop,
          emission: emissionThree > 0 ? emissionThree : '',
        },
      ];
      dispatch(addData({ data }));

      const tableData = [
        {
          subType: 'Email',
          subTypeData: {
            th: ['', 'No of Emails', 'Emissions'],
            td: [
              {
                dgType: 'Emails',
                noOfEmails: values?.noOfEmails,
                emissions: emissionOne > 0 ? emissionOne : '',
              },
            ],
          },
        },
        {
          subType: 'Printing',
          subTypeData: {
            th: ['', 'No. of Pages', 'Emissions'],
            td: [
              {
                dgType: 'Colour',
                noOfAttendees: values?.Colours,
                emissions: emissionTwo > 0 ? emissionTwo : '',
              },
              {
                dgType: 'Black & White',
                noOfAttendees: values?.blackAndWhite,
                emissions: emissionThree > 0 ? emissionThree : '',
              },
            ],
          },
          // scope: 1
        },
      ];

      dispatch(addResultTableData({ from: 'f2fEvent', data: tableData, tabTitle: 'Communications ' }));
    },
  });

  const { values } = formik;

  const handeleDelete = () => {
    dispatch(deleteData());
    dispatch(deleteResTableDigitalContData());
  };

  const handleSaveToDb = async () => {
    const eventData = {
      ...eventsData,
    };

    if (resultTableData.eventDataId) {
      eventData.eventDataId = resultTableData?.eventDataId;
      const resultAction = await dispatch(updateResultTableDatasToDb(eventData));
      if (updateResultTableDatasToDb?.rejected?.match(resultAction)) {
        console.error('Failed to update data:', resultAction.payload);
      }
    } else {
      const resultAction = await dispatch(addResultTableDatasToDb(eventData));
      if (addResultTableDatasToDb?.rejected?.match(resultAction)) {
        console.error('Failed to save data:', resultAction.payload);
      }
    }
  };
  console.log(allData, 'allData');
  useEffect(() => {
    if (allData?.length > 0) {
      // formik.setFieldValue("count", allData?.[0]?.count)
      // formik.setFieldValue("emissionOne", allData?.[0]?.emission)
      // formik.setFieldValue("MB", allData?.[1]?.mb)
      // formik.setFieldValue("emissionTwo", allData?.[1]?.emission)
      // formik.setFieldValue("Colours", allData?.[2]?.Colours)
      // formik.setFieldValue("noOfHours", allData?.[2]?.noOfHours)
      // formik.setFieldValue("serviceLifeOfLaptop", allData?.[2]?.serviceLifeOfLaptop)
      // formik.setFieldValue("emissionThree", allData?.[2]?.emission)
      formik.setFieldValue('noOfEmails', allData?.[0]?.noOfEmails);
      // formik.setFieldValue('emialEfOne', allData?.[0]?.emialEfOne);
      // formik.setFieldValue('emialEfTwo', allData?.[0]?.emialEfTwo);
      // formik.setFieldValue('emailEmissionOne', allData?.[0]?.emailEmissionOne);
      formik.setFieldValue('emissionOne', allData?.[0]?.emission);

      //   formik.setFieldValue('emailEmissionTwo', allData?.[0]?.emailEmissionTwo);
      // formik.setFieldValue('attachmentSize', allData?.[0]?.attachmentSize);
      // formik.setFieldValue('totalAttachmentSize', allData?.[0]?.totalAttachmentSize);
      formik.setFieldValue('Colours', allData?.[1]?.Colours);
      formik.setFieldValue('emissionTwo', allData?.[1]?.emission);
      formik.setFieldValue('blackAndWhite', allData?.[2]?.blackAndWhite);
      formik.setFieldValue('emissionThree', allData?.[2]?.emission);
    }
  }, [value]);

  return (
    <div>
      <Container maxWidth>
        <Card className="p-4 custom-inner-bg textborder">
          <Box
            mx={useMediaQuery(theme.breakpoints.up('lg')) && 15}
            display={'flex'}
            alignItems={'center'}
            flexDirection={'column'}
          >
            <IconDiv>
              <img src={DigitalImg} alt="Digital" width={100} className="tabImgWhite" />
            </IconDiv>
            <Grid
              container
              rowSpacing={3}
              columnSpacing={{ xs: 0, sm: 5, md: 4 }}
              className="table-custom-inpt-field"
              justifyContent={'center'}
            >
              {/* <Grid item xs={12} sm={4} md={4}>
                                <Typography variant='h4' color='white'>
                                    Emails
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Count</FormLabel>
                                    <TextField
                                        id="count"
                                        name="count"
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values.count}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            formik.setFieldValue('emissionOne', Number((e.target.value * 4 / 1000).toFixed(5)));
                                            formik.handleSubmit();
                                        }}
                                        error={
                                            formik.touched.count &&
                                            Boolean(formik.errors.count)
                                        }
                                        helperText={
                                            formik.touched.count && formik.errors.count
                                        }
                                        inputProps={{ style: { color: 'white' } }}
                                    />
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Emissions</FormLabel>
                                    <TextField
                                        id="emissionOne"
                                        name="emissionOne"
                                        label=""
                                        fullWidth
                                        size="small"
                                        disabled
                                        value={formik.values.emissionOne}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.emissionOne &&
                                            Boolean(formik.errors.emissionOne)
                                        }
                                        helperText={
                                            formik.touched.emissionOne && formik.errors.emissionOne
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <Typography variant='h4' color='white'>
                                    Attachments
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>In Mb</FormLabel>
                                    <TextField
                                        id="MB"
                                        name="MB"
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values.MB}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            formik.setFieldValue('emissionTwo', Number((e.target.value * 50 / 1000).toFixed(5)));
                                            formik.handleSubmit();
                                        }}
                                        error={
                                            formik.touched.MB &&
                                            Boolean(formik.errors.MB)
                                        }
                                        helperText={
                                            formik.touched.MB && formik.errors.MB
                                        }
                                        inputProps={{ style: { color: 'white' } }}
                                    />

                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Emissions</FormLabel>
                                    <TextField
                                        id="emissionTwo"
                                        name="emissionTwo"
                                        label=""
                                        fullWidth
                                        size="small"
                                        disabled
                                        value={formik.values.emissionTwo}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.emissionTwo &&
                                            Boolean(formik.errors.emissionTwo)
                                        }
                                        helperText={
                                            formik.touched.emissionTwo && formik.errors.emissionTwo
                                        }
                                    />
                                </Grid>
                            </Grid> */}
              <Grid item xs={12} sm={4} md={4}>
                <Typography variant="h4" color="white">
                  Emails
                </Typography>
                <Grid mt={2}>
                  <FormLabel id="demo-row-radio-buttons-group-label" className="label-white">
                    No of Emails
                  </FormLabel>
                  <TextField
                    id="noOfEmails"
                    name="noOfEmails"
                    label=""
                    fullWidth
                    size="small"
                    value={formik.values.noOfEmails}
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.handleSubmit();
                    }}
                    error={formik.touched.noOfEmails && Boolean(formik.errors.noOfEmails)}
                    helperText={formik.touched.noOfEmails && formik.errors.noOfEmails}
                    inputProps={{ style: { color: 'white' } }}
                  />
                </Grid>
                <Grid mt={2}>
                  <FormLabel id="demo-row-radio-buttons-group-label" className="label-white">
                    Emissions
                  </FormLabel>
                  <TextField
                    id="emissionOne"
                    name="emissionOne"
                    label=""
                    fullWidth
                    size="small"
                    disabled
                    value={formik.values.emissionOne}
                    onChange={formik.handleChange}
                    error={formik.touched.emissionOne && Boolean(formik.errors.emissionOne)}
                    helperText={formik.touched.emissionOne && formik.errors.emissionOne}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4} md={7}>
                <Typography variant="h4" className="text-start text-white mb-4">
                  Printing
                </Typography>
                <Box>
                  <div className="table-responsive">
                    <table className="table-custom-inpt-field">
                      <tr>
                        <th width="30%" />
                        <th className="ps-2" width="30%">
                          No. of Pages
                        </th>
                        <th className="ps-2" width="30%">
                          Emissions
                        </th>
                      </tr>
                      <tr>
                        <td className="py-1">Colour</td>
                        <td className="ps-2 py-1">
                          <TextField
                            id="Colours"
                            name="Colours"
                            label=""
                            fullWidth
                            size="small"
                            value={formik.values.Colours}
                            onChange={(e) => {
                              formik.handleChange(e);
                              // formik.setFieldValue('emissionThree', Number((e.target.value * 340 * (formik?.values?.noOfHours / 5840)).toFixed(5)));
                              formik.setFieldValue('emissionTwo', Number((e.target.value * 0.976).toFixed(5)));
                              formik.handleSubmit();
                            }}
                            error={formik.touched.Colours && Boolean(formik.errors.Colours)}
                            helperText={formik.touched.Colours && formik.errors.Colours}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="ps-2 py-1">
                          <TextField
                            id="emissionTwo"
                            name="emissionTwo"
                            label=""
                            fullWidth
                            size="small"
                            disabled
                            value={formik.values.emissionTwo}
                            onChange={formik.handleChange}
                            error={formik.touched.emissionTwo && Boolean(formik.errors.emissionTwo)}
                            helperText={formik.touched.emissionTwo && formik.errors.emissionTwo}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1">Black & White</td>
                        <td className="ps-2 py-1">
                          <TextField
                            id="noOfHours"
                            name="blackAndWhite"
                            label=""
                            fullWidth
                            size="small"
                            value={formik.values.blackAndWhite}
                            onChange={(e) => {
                              formik.handleChange(e);
                              formik.setFieldValue('emissionThree', Number((e.target.value * 0.946).toFixed(5)));
                              formik.handleSubmit();
                            }}
                            error={formik.touched.blackAndWhite && Boolean(formik.errors.blackAndWhite)}
                            helperText={formik.touched.blackAndWhite && formik.errors.blackAndWhite}
                            inputProps={{ style: { color: 'white' } }}
                          />
                        </td>
                        <td className="ps-2 py-1">
                          <TextField
                            id="emissionThree"
                            name="emissionThree"
                            label=""
                            fullWidth
                            size="small"
                            disabled
                            value={formik.values.emissionThree}
                            onChange={formik.handleChange}
                            error={formik.touched.emissionThree && Boolean(formik.errors.emissionThree)}
                            helperText={formik.touched.emissionThree && formik.errors.emissionThree}
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </Box>
                {/* <Typography variant="h4" color="white">
                  Printing
                </Typography> */}
                {/* <Grid mt={2}>
                  <FormLabel id="demo-row-radio-buttons-group-label" className="label-white">
                  No. of Pages
                  </FormLabel>
                  <TextField
                    id="Colours"
                    name="Colours"
                    label=""
                    fullWidth
                    size="small"
                    value={formik.values.Colours}
                    onChange={(e) => {
                      formik.handleChange(e);
                      // formik.setFieldValue('emissionThree', Number((e.target.value * 340 * (formik?.values?.noOfHours / 5840)).toFixed(5)));
                      formik.setFieldValue(
                        'emissionTwo',
                        Number((e.target.value * 340 * (formik?.values?.noOfHours / 5840)).toFixed(5))
                      );
                      formik.handleSubmit();
                    }}
                    error={formik.touched.Colours && Boolean(formik.errors.Colours)}
                    helperText={formik.touched.Colours && formik.errors.Colours}
                    inputProps={{ style: { color: 'white' } }}
                  />
                </Grid>
                <Grid mt={2}>
                  <FormLabel id="demo-row-radio-buttons-group-label" className="label-white">
                    No of Hours
                  </FormLabel>
                  <TextField
                    id="noOfHours"
                    name="noOfHours"
                    label=""
                    fullWidth
                    size="small"
                    value={formik.values.noOfHours}
                    onChange={(e) => {
                      formik.handleChange(e);
                      // formik.setFieldValue('emissionThree', Number((formik?.values?.Colours * 340 * (e.target.value / 5840)).toFixed(5)));
                      formik.setFieldValue(
                        'emissionTwo',
                        Number((formik?.values?.Colours * 340 * (e.target.value / 5840)).toFixed(5))
                      );
                      formik.handleSubmit();
                    }}
                    error={formik.touched.noOfHours && Boolean(formik.errors.noOfHours)}
                    helperText={formik.touched.noOfHours && formik.errors.noOfHours}
                    inputProps={{ style: { color: 'white' } }}
                  />
                </Grid>
                <Grid mt={2}>
                  <FormLabel id="demo-row-radio-buttons-group-label" className="label-white">
                    Emissions
                  </FormLabel>
                  <TextField
                                        id="emissionThree"
                                        name="emissionThree"
                                        label=""
                                        fullWidth
                                        size="small"
                                        disabled
                                        value={formik.values.emissionThree}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.emissionThree &&
                                            Boolean(formik.errors.emissionThree)
                                        }
                                        helperText={
                                            formik.touched.emissionThree && formik.errors.emissionThree
                                        }
                                    />

                  <TextField
                    id="emissionTwo"
                    name="emissionTwo"
                    label=""
                    fullWidth
                    size="small"
                    disabled
                    value={formik.values.emissionTwo}
                    onChange={formik.handleChange}
                    error={formik.touched.emissionTwo && Boolean(formik.errors.emissionTwo)}
                    helperText={formik.touched.emissionTwo && formik.errors.emissionTwo}
                  />
                </Grid> */}
              </Grid>

              <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                <Stack columnGap={2} rowGap={2} className="flex-xl-row flex-md-row flex-sm-column">
                  {/* <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button> */}
                  <Button
                    variant="contained"
                    startIcon={<FaAngleDoubleLeft />}
                    onClick={() => {
                      handleSaveToDb();
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
                      handleSaveToDb();
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
                    onClick={() => {
                      handleSaveToDb();
                      setValue(9);
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
              <Grid item xs={12} sm={12} md={12} marginTop={3} marginLeft={1}>
                <Typography color="white">
                  {`Total Communications  Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e
                </Typography>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={12} marginLeft={3}>
                                <ul>
                                    {
                                        allData?.length > 0 && allData?.map((item) => (

                                            <li>
                                                {`${item?.type} : ${item?.emission} `}kgCO<sub>2</sub>e
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Grid> */}
            </Grid>
          </Box>
        </Card>
      </Container>
    </div>
  );
};

export default DigitalContent;

// import { Box, Button, Card, Container, FormLabel, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
// import { useFormik } from 'formik';
// import { useEffect } from 'react';
// import { useTheme } from '@emotion/react';
// import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import * as yup from "yup";
// import { addData, deleteData } from '../../redux/slice/totalDigitalContSlice';
// import { addResultTableData, deleteResTableDigitalContData, addResultTableDatasToDb, updateResultTableDatasToDb } from '../../redux/slice/resultTableDataSlice';
// import DigitalImg from '../../assets/Digital.png';
// import { IconDiv } from '../../components/IconDiv';
// import useEventData from '../../hooks/useEventData';

// const DigitalContent = (props) => {
//     const { setValue, value } = props;
//     const theme = useTheme();
//     const dispatch = useDispatch();

//     const allData = useSelector((state) => state?.totalDigitalContentDetails?.data?.[0]?.data)
//     const totalEmission = useSelector((state) => state?.totalDigitalContentDetails?.totalEmission)
//     const resultTableData = useSelector(state => state?.resultTableDataDetails);
//     const eventsData = useEventData();

//     // -----------  validationSchema
//     const validationSchema = yup.object({
//         type: yup.string().required("Type is required"),
//     });

//     // -----------   initialValues
//     const initialValues = {
//         // count: 0,
//         // MB: 0''
//         // noOfAttendees: 0,
//         // noOfHours: 0,
//         // serviceLifeOfLaptop: 0,
//         // emissionOne: 0,
//         // emissionTwo: 0,
//         // emissionThree: 0,

//         noOfEmails: '',
//         emialEfOne: 4,
//         emialEfTwo: 50,
//         emailEmissionOne: '',         // (noOfEmails * emialEfOne) / 1000
//         emailEmissionTwo: '',         // (totalAttachmentSize * emialEfTwo) / 1000
//         attachmentSize: '',
//         totalAttachmentSize: '',      // noOfEmails * attachmentSize
//         emissionOne: '',             // emailEmissionOne + emailEmissionTwo          // emissions
//         noOfAttendees: '',
//         noOfHours: '',
//         serviceLifeOfLaptop: '',
//         emissionTwo: ''
//     };

//     const formik = useFormik({
//         initialValues,
//         onSubmit: async (values) => {
//             // const emissionOne = Number(values?.count) * 4 / 1000;
//             // const emissionTwo = Number(values?.MB) * 50 / 1000;
//             // const emissionThree = Number((values?.noOfAttendees * 340 * (values?.noOfHours / 5840)).toFixed(5)) || 0;
//             const emissionOne = values?.emailEmissionOne === 0 || values?.emailEmissionTwo === 0 ? 0 : Number(Number(values?.emailEmissionOne) + Number(values?.emailEmissionTwo)).toFixed(5);
//             const emissionTwo = Number((values?.noOfAttendees * 340 * (values?.noOfHours / 5840)).toFixed(5)) || 0;

//             if (emissionOne > 0) formik.setFieldValue('emissionOne', emissionOne);
//             if (emissionTwo > 0) formik.setFieldValue('emissionTwo', emissionTwo);
//             // if (emissionThree > 0) formik.setFieldValue('emissionThree', emissionThree);

//             const data = [
//                 // {
//                 //     type: 'Emails',
//                 //     count: values?.count,
//                 //     emission: (emissionOne > 0) ? emissionOne : ''
//                 // },
//                 // {
//                 //     type: 'Attachments',
//                 //     mb: values?.MB,
//                 //     emission: (emissionTwo > 0) ? emissionTwo : ''
//                 // },
//                 {
//                     name: 'Emails',
//                     noOfEmails: values?.noOfEmails,
//                     emialEfOne: values?.emialEfOne,
//                     emialEfTwo: values?.emialEfTwo,
//                     emailEmissionOne: values?.noOfEmails === 0 ? 0 : Number(((values?.noOfEmails * values?.emialEfOne) / 1000).toFixed(5)),
//                     emailEmissionTwo: values?.totalAttachmentSize === 0 ? 0 : Number(((values?.totalAttachmentSize * values?.emialEfTwo) / 1000).toFixed(5)),
//                     attachmentSize: values?.attachmentSize,
//                     totalAttachmentSize: values?.noOfEmails === 0 || values?.attachmentSize === 0 ? 0 : Number((values?.noOfEmails * values?.attachmentSize).toFixed(5)),
//                     emission: emissionOne > 0 ? emissionOne : '',
//                 },
//                 {
//                     type: 'Laptops used',
//                     noOfAttendees: values?.noOfAttendees,
//                     noOfHours: values?.noOfHours,
//                     serviceLifeOfLaptop: values?.serviceLifeOfLaptop,
//                     emission: (emissionTwo > 0) ? emissionTwo : ''
//                 }
//             ];
//             dispatch(addData({ data }));

//             const tableData = [
//                 {
//                     subType: "",
//                     subTypeData: {
//                         th: ["", "No of Emails", "Attachment Size (Mb)", "Emissions"],
//                         td: [
//                             {
//                                 dgType: "Emails",
//                                 noOfEmails: values?.noOfEmails,
//                                 // emialEfOne: values?.emialEfOne,
//                                 // emialEfTwo: values?.emialEfTwo,
//                                 // emailEmissionOne: values?.noOfEmails === 0 ? 0 : Number(((values?.noOfEmails * values?.emialEfOne) / 1000).toFixed(5)),
//                                 // emailEmissionTwo: values?.totalAttachmentSize === 0 ? 0 : Number(((values?.totalAttachmentSize * values?.emialEfTwo) / 1000).toFixed(5)),
//                                 attachmentSize: values?.attachmentSize,
//                                 // totalAttachmentSize: values?.noOfEmails === 0 || values?.attachmentSize === 0 ? 0 : Number((values?.noOfEmails * values?.attachmentSize).toFixed(5)),
//                                 emissions: emissionOne > 0 ? emissionOne : '',
//                             },
//                         ]
//                     },
//                     // scope: 1
//                 },
//                 {
//                     subType: "",
//                     subTypeData: {
//                         th: ["", "No. of Attendees", "No. of Hours", "Emissions"],
//                         td: [
//                             {
//                                 dgType: "Laptops used",
//                                 noOfHours: values?.noOfHours,
//                                 noOfAttendees: values?.noOfAttendees,
//                                 emissions: emissionTwo > 0 ? emissionTwo : ''
//                             },
//                         ]
//                     },
//                     // scope: 1
//                 },
//             ];

//             dispatch(addResultTableData({ from: "f2fEvent", data: tableData, tabTitle: "Communications " }));
//         },
//     });

//     const { values } = formik;

//     const handeleDelete = () => {
//         dispatch(deleteData());
//         dispatch(deleteResTableDigitalContData());
//     };

//     const handleSaveToDb = async () => {
//         const eventData = {
//             ...eventsData,
//         };

//         if (resultTableData.eventDataId) {
//             eventData.eventDataId = resultTableData?.eventDataId;
//             const resultAction = await dispatch(updateResultTableDatasToDb(eventData));
//             if (updateResultTableDatasToDb?.rejected?.match(resultAction)) {
//                 console.error('Failed to update data:', resultAction.payload);
//             }
//         } else {
//             const resultAction = await dispatch(addResultTableDatasToDb(eventData));
//             if (addResultTableDatasToDb?.rejected?.match(resultAction)) {
//                 console.error('Failed to save data:', resultAction.payload);
//             }
//         }
//     };

//     useEffect(() => {
//         if (allData?.length > 0) {
//             // formik.setFieldValue("count", allData?.[0]?.count)
//             // formik.setFieldValue("emissionOne", allData?.[0]?.emission)
//             // formik.setFieldValue("MB", allData?.[1]?.mb)
//             // formik.setFieldValue("emissionTwo", allData?.[1]?.emission)
//             // formik.setFieldValue("noOfAttendees", allData?.[2]?.noOfAttendees)
//             // formik.setFieldValue("noOfHours", allData?.[2]?.noOfHours)
//             // formik.setFieldValue("serviceLifeOfLaptop", allData?.[2]?.serviceLifeOfLaptop)
//             // formik.setFieldValue("emissionThree", allData?.[2]?.emission)
//             formik.setFieldValue('noOfEmails', allData?.[0]?.noOfEmails);
//             formik.setFieldValue('emialEfOne', allData?.[0]?.emialEfOne);
//             formik.setFieldValue('emialEfTwo', allData?.[0]?.emialEfTwo);
//             formik.setFieldValue('emailEmissionOne', allData?.[0]?.emailEmissionOne);
//             formik.setFieldValue("emissionOne", allData?.[0]?.emission);

//             formik.setFieldValue('emailEmissionTwo', allData?.[0]?.emailEmissionTwo);
//             formik.setFieldValue('attachmentSize', allData?.[0]?.attachmentSize);
//             formik.setFieldValue('totalAttachmentSize', allData?.[0]?.totalAttachmentSize);
//             formik.setFieldValue('emissionOne', allData?.[0]?.emission);
//             formik.setFieldValue("noOfAttendees", allData?.[1]?.noOfAttendees)
//             formik.setFieldValue("noOfHours", allData?.[1]?.noOfHours)
//             formik.setFieldValue("serviceLifeOfLaptop", allData?.[1]?.serviceLifeOfLaptop)
//             formik.setFieldValue("emissionTwo", allData?.[1]?.emission)
//         }
//     }, [value]);

//     return (
//         <div>
//             <Container maxWidth>
//                 <Card className='p-4 custom-inner-bg textborder'>
//                     <Box mx={useMediaQuery(theme.breakpoints.up('lg')) && 15} display={'flex'} alignItems={'center'} flexDirection={'column'}>
//                         <IconDiv>
//                             <img src={DigitalImg} alt="Digital" width={100} className='tabImgWhite' />
//                         </IconDiv>
//                         <Grid
//                             container
//                             rowSpacing={3}
//                             columnSpacing={{ xs: 0, sm: 5, md: 4 }}
//                             className='table-custom-inpt-field'
//                             justifyContent={'center'}
//                         >

//                             {/* <Grid item xs={12} sm={4} md={4}>
//                                 <Typography variant='h4' color='white'>
//                                     Emails
//                                 </Typography>
//                                 <Grid mt={2}>
//                                     <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Count</FormLabel>
//                                     <TextField
//                                         id="count"
//                                         name="count"
//                                         label=""
//                                         fullWidth
//                                         size="small"
//                                         value={formik.values.count}
//                                         onChange={(e) => {
//                                             formik.handleChange(e);
//                                             formik.setFieldValue('emissionOne', Number((e.target.value * 4 / 1000).toFixed(5)));
//                                             formik.handleSubmit();
//                                         }}
//                                         error={
//                                             formik.touched.count &&
//                                             Boolean(formik.errors.count)
//                                         }
//                                         helperText={
//                                             formik.touched.count && formik.errors.count
//                                         }
//                                         inputProps={{ style: { color: 'white' } }}
//                                     />
//                                 </Grid>
//                                 <Grid mt={2}>
//                                     <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Emissions</FormLabel>
//                                     <TextField
//                                         id="emissionOne"
//                                         name="emissionOne"
//                                         label=""
//                                         fullWidth
//                                         size="small"
//                                         disabled
//                                         value={formik.values.emissionOne}
//                                         onChange={formik.handleChange}
//                                         error={
//                                             formik.touched.emissionOne &&
//                                             Boolean(formik.errors.emissionOne)
//                                         }
//                                         helperText={
//                                             formik.touched.emissionOne && formik.errors.emissionOne
//                                         }
//                                     />
//                                 </Grid>
//                             </Grid>
//                             <Grid item xs={12} sm={4} md={4}>
//                                 <Typography variant='h4' color='white'>
//                                     Attachments
//                                 </Typography>
//                                 <Grid mt={2}>
//                                     <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>In Mb</FormLabel>
//                                     <TextField
//                                         id="MB"
//                                         name="MB"
//                                         label=""
//                                         fullWidth
//                                         size="small"
//                                         value={formik.values.MB}
//                                         onChange={(e) => {
//                                             formik.handleChange(e);
//                                             formik.setFieldValue('emissionTwo', Number((e.target.value * 50 / 1000).toFixed(5)));
//                                             formik.handleSubmit();
//                                         }}
//                                         error={
//                                             formik.touched.MB &&
//                                             Boolean(formik.errors.MB)
//                                         }
//                                         helperText={
//                                             formik.touched.MB && formik.errors.MB
//                                         }
//                                         inputProps={{ style: { color: 'white' } }}
//                                     />

//                                 </Grid>
//                                 <Grid mt={2}>
//                                     <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Emissions</FormLabel>
//                                     <TextField
//                                         id="emissionTwo"
//                                         name="emissionTwo"
//                                         label=""
//                                         fullWidth
//                                         size="small"
//                                         disabled
//                                         value={formik.values.emissionTwo}
//                                         onChange={formik.handleChange}
//                                         error={
//                                             formik.touched.emissionTwo &&
//                                             Boolean(formik.errors.emissionTwo)
//                                         }
//                                         helperText={
//                                             formik.touched.emissionTwo && formik.errors.emissionTwo
//                                         }
//                                     />
//                                 </Grid>
//                             </Grid> */}
//                             <Grid item xs={12} sm={4} md={4}>
//                                 <Typography variant='h4' color='white'>
//                                     Emails
//                                 </Typography>
//                                 <Grid mt={2}>
//                                     <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>No of Emails</FormLabel>
//                                     <TextField
//                                         id="noOfEmails"
//                                         name="noOfEmails"
//                                         label=""
//                                         fullWidth
//                                         size="small"
//                                         value={formik.values.noOfEmails}
//                                         onChange={(e) => {
//                                             const emailEmissionOne = e.target.value === 0 ? 0 : Number(((e.target.value * values?.emialEfOne) / 1000).toFixed(5));
//                                             const totalAttachmentSize = e.target.value === 0 || values?.attachmentSize === 0 ? 0 : Number((e.target.value * values?.attachmentSize).toFixed(5));
//                                             const emailEmissionTwo = totalAttachmentSize === 0 ? 0 : Number(((totalAttachmentSize * values?.emialEfTwo) / 1000).toFixed(5));

//                                             formik.setFieldValue("noOfEmails", e.target.value);
//                                             formik.setFieldValue("emailEmissionOne", emailEmissionOne);
//                                             formik.setFieldValue("totalAttachmentSize", totalAttachmentSize);
//                                             formik.setFieldValue("emailEmissionTwo", emailEmissionTwo);
//                                             formik.setFieldValue("emissionOne", emailEmissionOne === 0 || emailEmissionTwo === 0 ? 0 : Number(Number(emailEmissionOne) + Number(emailEmissionTwo)).toFixed(5));
//                                             formik.handleSubmit();
//                                         }}
//                                         error={
//                                             formik.touched.noOfEmails &&
//                                             Boolean(formik.errors.noOfEmails)
//                                         }
//                                         helperText={
//                                             formik.touched.noOfEmails && formik.errors.noOfEmails
//                                         }
//                                         inputProps={{ style: { color: 'white' } }}
//                                     />
//                                 </Grid>
//                                 <Grid mt={2}>
//                                     <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Attachment Size (Mb)</FormLabel>
//                                     <TextField
//                                         id="attachmentSize"
//                                         name="attachmentSize"
//                                         label=""
//                                         fullWidth
//                                         size="small"
//                                         value={values?.attachmentSize}
//                                         onChange={(e) => {
//                                             const emailEmissionOne = values?.noOfEmails === 0 ? 0 : Number(((values?.noOfEmails * values?.emialEfOne) / 1000).toFixed(5));
//                                             const totalAttachmentSize = e.target.value === 0 || values?.noOfEmails === 0 ? 0 : Number((e.target.value * values?.noOfEmails).toFixed(5));
//                                             const emailEmissionTwo = totalAttachmentSize === 0 ? 0 : Number(((totalAttachmentSize * values?.emialEfTwo) / 1000).toFixed(5));

//                                             formik.setFieldValue("attachmentSize", e.target.value);
//                                             formik.setFieldValue("emailEmissionOne", emailEmissionOne);
//                                             formik.setFieldValue("totalAttachmentSize", totalAttachmentSize);
//                                             formik.setFieldValue("emailEmissionTwo", emailEmissionTwo);
//                                             // formik.setFieldValue("emissionThree", emailEmissionOne === 0 || emailEmissionTwo === 0 ? 0 : Number(Number(emailEmissionOne) + Number(emailEmissionTwo)).toFixed(5));
//                                             formik.setFieldValue("emissionOne", emailEmissionOne === 0 || emailEmissionTwo === 0 ? 0 : Number(Number(emailEmissionOne) + Number(emailEmissionTwo)).toFixed(5));
//                                             formik.handleSubmit();
//                                         }}
//                                         error={
//                                             formik.touched.attachmentSize &&
//                                             Boolean(formik.errors.attachmentSize)
//                                         }
//                                         helperText={
//                                             formik.touched.attachmentSize && formik.errors.attachmentSize
//                                         }
//                                         inputProps={{ style: { color: 'white' } }}
//                                     />
//                                 </Grid>
//                                 <Grid mt={2}>
//                                     <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Emissions</FormLabel>
//                                     <TextField
//                                         id="emissionOne"
//                                         name="emissionOne"
//                                         label=""
//                                         fullWidth
//                                         size="small"
//                                         disabled
//                                         value={formik.values.emissionOne}
//                                         onChange={formik.handleChange}
//                                         error={
//                                             formik.touched.emissionOne &&
//                                             Boolean(formik.errors.emissionOne)
//                                         }
//                                         helperText={
//                                             formik.touched.emissionOne && formik.errors.emissionOne
//                                         }
//                                     />
//                                 </Grid>
//                             </Grid>
//                             <Grid item xs={12} sm={4} md={4}>
//                                 <Typography variant='h4' color='white'>
//                                     Laptops used
//                                 </Typography>
//                                 <Grid mt={2}>
//                                     <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>No.of Attendees</FormLabel>
//                                     <TextField
//                                         id="noOfAttendees"
//                                         name="noOfAttendees"
//                                         label=""
//                                         fullWidth
//                                         size="small"
//                                         value={formik.values.noOfAttendees}
//                                         onChange={(e) => {
//                                             formik.handleChange(e);
//                                             // formik.setFieldValue('emissionThree', Number((e.target.value * 340 * (formik?.values?.noOfHours / 5840)).toFixed(5)));
//                                             formik.setFieldValue('emissionTwo', Number((e.target.value * 340 * (formik?.values?.noOfHours / 5840)).toFixed(5)));
//                                             formik.handleSubmit();
//                                         }}
//                                         error={
//                                             formik.touched.noOfAttendees &&
//                                             Boolean(formik.errors.noOfAttendees)
//                                         }
//                                         helperText={
//                                             formik.touched.noOfAttendees && formik.errors.noOfAttendees
//                                         }
//                                         inputProps={{ style: { color: 'white' } }}
//                                     />
//                                 </Grid>
//                                 <Grid mt={2}>
//                                     <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>No of Hours</FormLabel>
//                                     <TextField
//                                         id="noOfHours"
//                                         name="noOfHours"
//                                         label=""
//                                         fullWidth
//                                         size="small"
//                                         value={formik.values.noOfHours}
//                                         onChange={(e) => {
//                                             formik.handleChange(e);
//                                             // formik.setFieldValue('emissionThree', Number((formik?.values?.noOfAttendees * 340 * (e.target.value / 5840)).toFixed(5)));
//                                             formik.setFieldValue('emissionTwo', Number((formik?.values?.noOfAttendees * 340 * (e.target.value / 5840)).toFixed(5)));
//                                             formik.handleSubmit();
//                                         }}
//                                         error={
//                                             formik.touched.noOfHours &&
//                                             Boolean(formik.errors.noOfHours)
//                                         }
//                                         helperText={
//                                             formik.touched.noOfHours && formik.errors.noOfHours
//                                         }
//                                         inputProps={{ style: { color: 'white' } }}
//                                     />
//                                 </Grid>
//                                 <Grid mt={2}>
//                                     <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Emissions</FormLabel>
//                                     {/* <TextField
//                                         id="emissionThree"
//                                         name="emissionThree"
//                                         label=""
//                                         fullWidth
//                                         size="small"
//                                         disabled
//                                         value={formik.values.emissionThree}
//                                         onChange={formik.handleChange}
//                                         error={
//                                             formik.touched.emissionThree &&
//                                             Boolean(formik.errors.emissionThree)
//                                         }
//                                         helperText={
//                                             formik.touched.emissionThree && formik.errors.emissionThree
//                                         }
//                                     /> */}
//                                     <TextField
//                                         id="emissionTwo"
//                                         name="emissionTwo"
//                                         label=""
//                                         fullWidth
//                                         size="small"
//                                         disabled
//                                         value={formik.values.emissionTwo}
//                                         onChange={formik.handleChange}
//                                         error={
//                                             formik.touched.emissionTwo &&
//                                             Boolean(formik.errors.emissionTwo)
//                                         }
//                                         helperText={
//                                             formik.touched.emissionTwo && formik.errors.emissionTwo
//                                         }
//                                     />
//                                 </Grid>
//                             </Grid>

//                             <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>
//                                 <Stack columnGap={2} rowGap={2} className='flex-xl-row flex-md-row flex-sm-column'>
//                                     {/* <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button> */}
//                                     <Button variant='contained' startIcon={<FaAngleDoubleLeft />} onClick={() => { handleSaveToDb(); setValue(value - 1); }} className='custom-btn'>Save and Previous Page</Button>
//                                     <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { handleSaveToDb(); setValue(value + 1); }} className='custom-btn'> Save and Next Page</Button>
//                                     <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { handleSaveToDb(); setValue(9)}} className='custom-btn'>Go To Result</Button>
//                                     {/* <Button variant='contained' onClick={() => { handleSaveToDb(); }} className='custom-btn'>SaveToDB</Button> */}
//                                     <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete() }} color='error'>Clear</Button>
//                                 </Stack>

//                             </Grid>
//                             <Grid item xs={12} sm={12} md={12} marginTop={3} marginLeft={1}>
//                                 <Typography color='white'>{`Total Communications  Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e</Typography>
//                             </Grid>
//                             {/* <Grid item xs={12} sm={12} md={12} marginLeft={3}>
//                                 <ul>
//                                     {
//                                         allData?.length > 0 && allData?.map((item) => (

//                                             <li>
//                                                 {`${item?.type} : ${item?.emission} `}kgCO<sub>2</sub>e
//                                             </li>
//                                         ))
//                                     }
//                                 </ul>
//                             </Grid> */}
//                         </Grid>
//                     </Box>
//                 </Card>
//             </Container>
//         </div>
//     )
// };

// export default DigitalContent;
