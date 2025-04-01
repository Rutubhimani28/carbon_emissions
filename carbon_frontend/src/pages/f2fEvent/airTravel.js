import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addAirTravelData, deleteAirTravelData } from '../../redux/slice/totalAirTravelSlice';
import {
  addResultTableData,
  deleteResTabAirTravelData,
  addResultTableDatasToDb,
  updateResultTableDatasToDb,
} from '../../redux/slice/resultTableDataSlice';
import { IconDiv } from '../../components/IconDiv';
import AirTravelImg from '../../assets/Travel.png';
import { apipost } from '../../service/api';
import useEventData from '../../hooks/useEventData';

const AirTravel = (props) => {
  const { setValue, value } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const eventsData = useEventData();
  // const allData = useSelector((state) => state?.totalAirTravelDetails?.data);
  const allData = useSelector((state) => state?.totalAirTravelDetails?.data?.[0]?.data);
  const totalEmission = useSelector((state) => state?.totalAirTravelDetails?.totalEmission);
  const resultTableData = useSelector((state) => state.resultTableDataDetails);

  // -----------   initialValues
  const initialValues = {
    // Economy Class
    noOfTripsOne: '', // Short Haul
    noOfTripsTwo: '', // Medium haul
    noOfTripsThree: '', // Long haul
    noOfPassengerOne: '', // Short Haul
    noOfPassengerTwo: '', // Medium haul
    noOfPassengerThree: '', // Long haul
    emissionOne: '', // Short Haul  200
    emissionTwo: '', // Medium haul 375
    emissionThree: '', // Long haul   960
    // Business Class
    noOfTripsFour: '',
    noOfTripsFive: '',
    noOfTripsSix: '',
    noOfPassengerFour: '', // Short Haul
    noOfPassengerFive: '', // Medium haul
    noOfPassengerSix: '', // Long haul
    emissionFour: '', // 400
    emissionFive: '', // 750
    emissionSix: '', // 1920
    // First Class
    // noOfTripsSeven: '',
    // noOfTripsEight: '',
    // noOfTripsNine: '',
    // emissionSeven: '', // 600
    // emissionEight: '', // 1125
    // emissionNine: '', // 288
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      // const emissionOne = values?.noOfTripsOne === 0 ? 0 : (200 * values?.noOfTripsOne).toFixed(2);
      // const emissionTwo = values?.noOfTripsTwo === 0 ? 0 : (375 * values?.noOfTripsTwo).toFixed(2);
      // const emissionThree = values?.noOfTripsThree === 0 ? 0 : (960 * values?.noOfTripsThree).toFixed(2);
      // const emissionFour = values?.noOfTripsFour === 0 ? 0 : (400 * values?.noOfTripsFour).toFixed(2);
      // const emissionFive = values?.noOfTripsFive === 0 ? 0 : (750 * values?.noOfTripsFive).toFixed(2);
      // const emissionSix = values?.noOfTripsSix === 0 ? 0 : (1920 * values?.noOfTripsSix).toFixed(2);
      const emissionOne =
        values?.noOfTripsOne === 0 || values?.noOfPassengerOne === 0
          ? 0
          : (0.1286 * values?.noOfTripsOne * values?.noOfPassengerOne).toFixed(2);

      //   const emissionTwo = values?.noOfTripsTwo === 0 ? 0 : (375 * values?.noOfTripsTwo).toFixed(2);
      const emissionTwo =
        values?.noOfTripsTwo === 0 || values?.noOfPassengerTwo === 0
          ? 0
          : (0.082 * values?.noOfTripsTwo * values?.noOfPassengerTwo).toFixed(2);

      const emissionThree =
        values?.noOfTripsThree === 0 || values?.noOfPassengerThree === 0
          ? 0
          : (0.1013 * values?.noOfTripsThree * values?.noOfPassengerThree).toFixed(2);

      const emissionFour =
        values?.noOfTripsFour === 0 || values?.noOfPassengerFour === 0
          ? 0
          : (0.1929 * values?.noOfTripsFour * values?.noOfPassengerFour).toFixed(2);
      //   const emissionFive = values?.noOfTripsFive === 0 ? 0 : (750 * values?.noOfTripsFive).toFixed(2);
      const emissionFive =
        values?.noOfTripsFive === 0 || values?.noOfPassengerFive === 0
          ? 0
          : (0.1203 * values?.noOfTripsFive * values?.noOfPassengerFive).toFixed(2);
      //   const emissionSix = values?.noOfTripsSix === 0 ? 0 : (1920 * values?.noOfTripsSix).toFixed(2);
      const emissionSix =
        values?.noOfTripsSix === 0 || values?.noOfPassengerSix === 0
          ? 0
          : (0.15195 * values?.noOfTripsSix * values?.noOfPassengerSix).toFixed(2);

      // const emissionSeven = values?.noOfTripsSeven === 0 ? 0 : (600 * values?.noOfTripsSeven).toFixed(2);
      // const emissionEight = values?.noOfTripsEight === 0 ? 0 : (1125 * values?.noOfTripsEight).toFixed(2);
      // const emissionNine = values?.noOfTripsNine === 0 ? 0 : (2880 * values?.noOfTripsNine).toFixed(2);

      if (emissionOne > 0) formik.setFieldValue('emissionOne', emissionOne);
      if (emissionTwo > 0) formik.setFieldValue('emissionTwo', emissionTwo);
      if (emissionThree > 0) formik.setFieldValue('emissionThree', emissionThree);
      if (emissionFour > 0) formik.setFieldValue('emissionFour', emissionFour);
      if (emissionFive > 0) formik.setFieldValue('emissionFive', emissionFive);
      if (emissionSix > 0) formik.setFieldValue('emissionSix', emissionSix);
      // if (emissionSeven > 0) formik.setFieldValue('emissionSeven', emissionSeven);
      // if (emissionEight > 0) formik.setFieldValue('emissionEight', emissionEight);
      // if (emissionNine > 0) formik.setFieldValue('emissionNine', emissionNine);

      const data = [
        {
          type: 'Economy Class',
          noOfTripsOne: values?.noOfTripsOne,
          noOfTripsTwo: values?.noOfTripsTwo,
          noOfTripsThree: values?.noOfTripsThree,
          //   add new
          noOfPassengerOne: values?.noOfPassengerOne,
          noOfPassengerTwo: values?.noOfPassengerTwo,
          noOfPassengerThree: values?.noOfPassengerThree,
          emissionOne: emissionOne > 0 ? emissionOne : '',
          emissionTwo: emissionTwo > 0 ? emissionTwo : '',
          emissionThree: emissionThree > 0 ? emissionThree : '',
        },
        {
          type: 'Business Class',
          noOfTripsFour: values?.noOfTripsFour,
          noOfTripsFive: values?.noOfTripsFive,
          noOfTripsSix: values?.noOfTripsSix,
          // add new
          noOfPassengerFour: values?.noOfPassengerFour,
          noOfPassengerFive: values?.noOfPassengerFive,
          noOfPassengerSix: values?.noOfPassengerSix,
          emissionFour: emissionFour > 0 ? emissionFour : '',
          emissionFive: emissionFive > 0 ? emissionFive : '',
          emissionSix: emissionSix > 0 ? emissionSix : '',
        },
        // {
        //   type: 'First Class',
        //   noOfTripsSeven: values?.noOfTripsSeven,
        //   noOfTripsEight: values?.noOfTripsEight,
        //   noOfTripsNine: values?.noOfTripsNine,
        //   emissionSeven: emissionSeven > 0 ? emissionSeven : '',
        //   emissionEight: emissionEight > 0 ? emissionEight : '',
        //   emissionNine: emissionNine > 0 ? emissionNine : '',
        // },
      ];
      const tableData = [
        {
          subType: 'Economy / Premium Economy Class',
          subTypeData: {
            th: ['', 'No of trips', 'No of Passengers', 'Emissions'],
            td: [
              {
                journeyType: 'Short Haul Flight (<3hrs)',
                noOfTrips: values?.noOfTripsOne,
                noOfPassengers: values?.noOfPassengerOne,
                emissions: emissionOne > 0 ? emissionOne : '',
              },
              {
                journeyType: 'Medium Haul Flight (3-6hrs)',
                noOfTrips: values?.noOfTripsTwo,
                noOfPassengers: values?.noOfPassengerTwo,
                emissions: emissionTwo > 0 ? emissionTwo : '',
              },
              {
                journeyType: 'Long Haul Flight (>6hrs)',
                noOfTrips: values?.noOfTripsThree,
                noOfPassengers: values?.noOfPassengerThree,
                emissions: emissionThree > 0 ? emissionThree : '',
              },
            ],
          },
          // scope: 3
        },
        {
          subType: 'Business / First Class',
          subTypeData: {
            th: ['', 'No of trips', 'No of Passengers', 'Emissions'],
            td: [
              {
                journeyType: 'Short Haul Flight (<3hrs)',
                noOfTrips: values?.noOfTripsFour,
                noOfPassengers: values?.noOfPassengerFour,
                emissions: emissionFour > 0 ? emissionFour : '',
              },
              {
                journeyType: 'Medium Haul Flight (3-6hrs)',
                noOfTrips: values?.noOfTripsFive,
                noOfPassengers: values?.noOfPassengerFive,
                emissions: emissionFive > 0 ? emissionFive : '',
              },
              {
                journeyType: 'Long Haul Flight (>6hrs)',
                noOfTrips: values?.noOfTripsSix,
                noOfPassengers: values?.noOfPassengerSix,
                emissions: emissionSix > 0 ? emissionSix : '',
              },
            ],
          },
          // scope: 3
        },
      ];
      console.log('AirTravel tableData', tableData);
      dispatch(addAirTravelData({ data }));
      dispatch(addResultTableData({ from: 'f2fEvent', data: tableData, tabTitle: 'Air Travel' }));
    },
  });

  const handeleDelete = () => {
    dispatch(deleteAirTravelData());
    dispatch(deleteResTabAirTravelData());
  };

  const handleSaveToDb = async () => {
    const eventData = {
      ...eventsData,
    };

    if (resultTableData.eventDataId) {
      console.log('handleSaveToDb', eventData);
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
      formik.setFieldValue('noOfTripsOne', allData?.[0]?.noOfTripsOne);
      formik.setFieldValue('noOfTripsTwo', allData?.[0]?.noOfTripsTwo);
      formik.setFieldValue('noOfTripsThree', allData?.[0]?.noOfTripsThree);
      formik.setFieldValue('emissionOne', allData?.[0]?.emissionOne);
      formik.setFieldValue('emissionTwo', allData?.[0]?.emissionTwo);
      formik.setFieldValue('emissionThree', allData?.[0]?.emissionThree);
      formik.setFieldValue('noOfPassengerOne', allData?.[0]?.noOfPassengerOne);
      formik.setFieldValue('noOfPassengerTwo', allData?.[0]?.noOfPassengerTwo);
      formik.setFieldValue('noOfPassengerThree', allData?.[0]?.noOfPassengerThree);

      formik.setFieldValue('noOfPassengerFour', allData?.[1]?.noOfPassengerFour);
      formik.setFieldValue('noOfPassengerFive', allData?.[1]?.noOfPassengerFive);
      formik.setFieldValue('noOfPassengerSix', allData?.[1]?.noOfPassengerSix);
      formik.setFieldValue('noOfTripsFour', allData?.[1]?.noOfTripsFour);
      formik.setFieldValue('noOfTripsFive', allData?.[1]?.noOfTripsFive);
      formik.setFieldValue('noOfTripsSix', allData?.[1]?.noOfTripsSix);
      formik.setFieldValue('emissionFour', allData?.[1]?.emissionFour);
      formik.setFieldValue('emissionFive', allData?.[1]?.emissionFive);
      formik.setFieldValue('emissionSix', allData?.[1]?.emissionSix);

      // formik.setFieldValue('noOfTripsSeven', allData?.[2]?.noOfTripsSeven);
      // formik.setFieldValue('noOfTripsEight', allData?.[2]?.noOfTripsEight);
      // formik.setFieldValue('noOfTripsNine', allData?.[2]?.noOfTripsNine);
      // formik.setFieldValue('emissionSeven', allData?.[2]?.emissionSeven);
      // formik.setFieldValue('emissionEight', allData?.[2]?.emissionEight);
      // formik.setFieldValue('emissionNine', allData?.[2]?.emissionNine);
    }
  }, [value]);
  console.log(allData, 'allData');

  const calclulateEconomyClass = (e, emmFieldName, firstValue, ef) => {
    formik.handleChange(e);
    formik.setFieldValue(emmFieldName, firstValue === 0 ? 0 : (ef * firstValue).toFixed(2));
    formik.handleSubmit();
  };

  const calclulateBusinessClass = (e, emmFieldName, firstValue, ef) => {
    formik.handleChange(e);
    formik.setFieldValue(emmFieldName, firstValue === 0 ? 0 : (ef * firstValue).toFixed(2));
    formik.handleSubmit();
  };

  // const calclulateFirstClass = (e, emmFieldName, firstValue, ef) => {
  //   formik.handleChange(e);
  //   formik.setFieldValue(emmFieldName, firstValue === 0 ? 0 : (ef * firstValue).toFixed(2));
  //   formik.handleSubmit();
  // };

  return (
    <div>
      <Container maxWidth>
        <Card className="p-3 custom-inner-bg textborder" style={{ padding: '20px' }}>
          <Box style={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              mx={useMediaQuery(theme.breakpoints.up('lg')) && 15}
              display={'flex'}
              alignItems={'center'}
              flexDirection={'column'}
            >
              <IconDiv>
                <img src={AirTravelImg} alt="Waste" width={100} className="tabImgWhite" />
              </IconDiv>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={6}>
                  <Box>
                    <Typography variant="h4" className="text-center text-white mb-4">
                      Economy / Premium Economy Class
                    </Typography>
                    <div className="table-responsive">
                      <table className="table-custom-inpt-field">
                        <tr>
                          <th className="ps-2" />
                          <th className="ps-2">Trip (Kms)</th>
                          {/* add new  */}
                          <th className="ps-2">No. of Passengers</th>
                          <th className="ps-2">Emissions</th>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Short Haul (~500 kms)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfTripsOne"
                              value={formik?.values?.noOfTripsOne}
                              onChange={(e) => {
                                formik.setFieldValue('noOfTripsOne', e.target.value);
                                calclulateEconomyClass(
                                  e,
                                  'emissionOne',
                                  e.target.value,
                                  formik.values.noOfPassengerOne,
                                  0.1286
                                );
                              }}
                              //   onChange={(e) => {
                              //     calclulateEconomyClass(e, 'emissionOne', e.target.value, 200);
                              //   }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          {/* add new */}
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfPassengerOne"
                              value={formik?.values?.noOfPassengerOne}
                              onChange={(e) => {
                                formik.setFieldValue('noOfPassengerOne', e.target.value);
                                calclulateEconomyClass(
                                  e,
                                  'emissionOne',
                                  formik.values.noOfTripsOne,
                                  e.target.value,
                                  0.1286
                                );
                              }}
                              //   onChange={(e) => {
                              //     calclulateEconomyClass(e, 'emissionOne', e.target.value, 200);
                              //   }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              disabled
                              name="emissionOne"
                              value={formik?.values?.emissionOne}
                              onChange={formik.handleChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Medium Haul (&gt;500- &lt;3700 kms)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfTripsTwo"
                              value={formik?.values?.noOfTripsTwo}
                              onChange={(e) => {
                                formik.setFieldValue('noOfTripsTwo', e.target.value);
                                calclulateEconomyClass(
                                  e,
                                  'emissionTwo',
                                  e.target.value,
                                  formik.values.noOfPassengerTwo,
                                  0.082
                                );
                              }}
                              //   onChange={(e) => {
                              //     calclulateEconomyClass(e, 'emissionTwo', e.target.value, 375);
                              //   }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          {/* add new */}
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfPassengerTwo"
                              value={formik?.values?.noOfPassengerTwo}
                              onChange={(e) => {
                                formik.setFieldValue('noOfPassengerTwo', e.target.value);
                                calclulateEconomyClass(
                                  e,
                                  'emissionTwo',
                                  formik.values.noOfTripsTwo,
                                  e.target.value,
                                  0.082
                                );
                              }}
                              //   onChange={(e) => {
                              //     calclulateEconomyClass(e, 'emissionTwo', e.target.value, 375);
                              //   }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="emissionTwo"
                              value={formik?.values?.emissionTwo}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Long Haul (&gt;3700 miles)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfTripsThree"
                              value={formik?.values?.noOfTripsThree}
                              onChange={(e) => {
                                formik.setFieldValue('noOfTripsThree', e.target.value);
                                calclulateEconomyClass(
                                  e,
                                  'emissionThree',
                                  e.target.value,
                                  formik.values.noOfPassengerThree,
                                  0.1013
                                );
                              }}
                              //   onChange={(e) => {
                              //     calclulateEconomyClass(e, 'emissionThree', e.target.value, 960);
                              //   }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          {/* add new */}
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfPassengerThree"
                              value={formik?.values?.noOfPassengerThree}
                              onChange={(e) => {
                                formik.setFieldValue('noOfPassengerThree', e.target.value);
                                calclulateEconomyClass(
                                  e,
                                  'emissionThree',
                                  formik.values.noOfTripsThree,
                                  e.target.value,
                                  0.1013
                                );
                              }}
                              //   onChange={(e) => {
                              //     calclulateEconomyClass(e, 'emissionThree', e.target.value, 960);
                              //   }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="emissionThree"
                              value={formik?.values?.emissionThree}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                      </table>
                    </div>
                    {/* <div className="table-responsive">
                      <table className="table-custom-inpt-field">
                        <tr>
                          <th className="ps-2">Journey Type</th>
                          <th className="ps-2">No of trips</th>
                          <th className="ps-2">Emissions</th>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Short Haul Flight (&lt;3hrs)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfTripsOne"
                              value={formik?.values?.noOfTripsOne}
                              onChange={(e) => {
                                calclulateEconomyClass(e, 'emissionOne', e.target.value, 200);
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
                              value={formik?.values?.emissionOne}
                              onChange={formik.handleChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Medium Haul Flight (3-6hrs)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfTripsTwo"
                              value={formik?.values?.noOfTripsTwo}
                              onChange={(e) => {
                                calclulateEconomyClass(e, 'emissionTwo', e.target.value, 375);
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="emissionTwo"
                              value={formik?.values?.emissionTwo}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Long Haul Flight (&gt;6hrs)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfTripsThree"
                              value={formik?.values?.noOfTripsThree}
                              onChange={(e) => {
                                calclulateEconomyClass(e, 'emissionThree', e.target.value, 960);
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="emissionThree"
                              value={formik?.values?.emissionThree}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                      </table>
                    </div> */}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Box>
                    <Typography variant="h4" className="text-center text-white mb-4">
                      Business / First Class
                    </Typography>
                    <div className="table-responsive">
                      <table className="table-custom-inpt-field">
                        <tr>
                          <th className="ps-2" />
                          <th className="ps-2">Trip (Kms)</th>
                          {/* add new */}
                          <th className="ps-2">No. of Passengers</th>
                          <th className="ps-2">Emissions</th>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Short Haul (~500 kms)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfTripsFour"
                              value={formik?.values?.noOfTripsFour}
                              onChange={(e) => {
                                formik.setFieldValue('noOfTripsFour', e.target.value);
                                calclulateBusinessClass(
                                  e,
                                  'emissionFour',
                                  e.target.value,
                                  formik.values.noOfPassengerFour,
                                  0.1929
                                );
                              }}
                              //   onChange={(e) => {
                              //     calclulateBusinessClass(e, 'emissionFour', e.target.value, 400);
                              //   }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          {/* add new */}
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfPassengerFour"
                              value={formik?.values?.noOfPassengerFour}
                              onChange={(e) => {
                                formik.setFieldValue('noOfPassengerFour', e.target.value);
                                calclulateBusinessClass(
                                  e,
                                  'emissionFour',
                                  formik.values.noOfTripsFour,
                                  e.target.value,
                                  0.1929
                                );
                              }}
                              //   onChange={(e) => {
                              //     calclulateBusinessClass(e, 'emissionFour', e.target.value, 400);
                              //   }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>

                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              disabled
                              name="emissionFour"
                              value={formik?.values?.emissionFour}
                              onChange={formik.handleChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Medium Haul (&gt;500- &lt;3700 kms)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfTripsFive"
                              value={formik?.values?.noOfTripsFive}
                              onChange={(e) => {
                                formik.setFieldValue('noOfTripsFive', e.target.value);
                                calclulateBusinessClass(
                                  e,
                                  'emissionFive',
                                  e.target.value,
                                  formik.values.noOfPassengerFive,
                                  0.1203
                                );
                              }}
                              //   onChange={(e) => {
                              //     calclulateBusinessClass(e, 'emissionFive', e.target.value, 750);
                              //   }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          {/* add new */}
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfPassengerFive"
                              value={formik?.values?.noOfPassengerFive}
                              onChange={(e) => {
                                formik.setFieldValue('noOfPassengerFive', e.target.value);
                                calclulateBusinessClass(
                                  e,
                                  'emissionFive',
                                  formik.values.noOfTripsFive,
                                  e.target.value,
                                  0.1203
                                );
                              }}
                              //   onChange={(e) => {
                              //     calclulateBusinessClass(e, 'emissionFive', e.target.value, 750);
                              //   }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="emissionFive"
                              value={formik?.values?.emissionFive}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Long Haul (&gt;3700 miles)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfTripsSix"
                              value={formik?.values?.noOfTripsSix}
                              onChange={(e) => {
                                formik.setFieldValue('noOfTripsSix', e.target.value);
                                calclulateBusinessClass(
                                  e,
                                  'emissionSix',
                                  e.target.value,
                                  formik.values.noOfPassengerSix,
                                  0.15195
                                );
                              }}
                              //   onChange={(e) => {
                              //     calclulateBusinessClass(e, 'emissionSix', e.target.value, 1920);
                              //   }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          {/* add new */}
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfPassengerSix"
                              value={formik?.values?.noOfPassengerSix}
                              onChange={(e) => {
                                formik.setFieldValue('noOfPassengerSix', e.target.value);
                                calclulateBusinessClass(
                                  e,
                                  'emissionSix',
                                  formik.values.noOfTripsSix,
                                  e.target.value,
                                  0.15195
                                );
                              }}
                              //   onChange={(e) => {
                              //     calclulateBusinessClass(e, 'emissionSix', e.target.value, 1920);
                              //   }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="emissionSix"
                              value={formik?.values?.emissionSix}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                      </table>
                    </div>
                    {/* <div className="table-responsive">
                      <table className="table-custom-inpt-field">
                        <tr>
                          <th className="ps-2">Journey Type</th>
                          <th className="ps-2">No of trips</th>
                          <th className="ps-2">Emissions</th>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Short Haul Flight (&lt;3hrs)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfTripsFour"
                              value={formik?.values?.noOfTripsFour}
                              onChange={(e) => {
                                calclulateBusinessClass(e, 'emissionFour', e.target.value, 400);
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              disabled
                              name="emissionFour"
                              value={formik?.values?.emissionFour}
                              onChange={formik.handleChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Medium Haul Flight (3-6hrs)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfTripsFive"
                              value={formik?.values?.noOfTripsFive}
                              onChange={(e) => {
                                calclulateBusinessClass(e, 'emissionFive', e.target.value, 750);
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="emissionFive"
                              value={formik?.values?.emissionFive}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Long Haul Flight (&gt;6hrs)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfTripsSix"
                              value={formik?.values?.noOfTripsSix}
                              onChange={(e) => {
                                calclulateBusinessClass(e, 'emissionSix', e.target.value, 1920);
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="emissionSix"
                              value={formik?.values?.emissionSix}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                      </table>
                    </div> */}
                  </Box>
                </Grid>

                {/* <Grid item xs={12} sm={12} md={6}>
                  <Box>
                    <Typography variant="h4" className="text-center text-white mb-4">
                      First Class
                    </Typography>
                    <div className="table-responsive">
                      <table className="table-custom-inpt-field">
                        <tr>
                          <th className="ps-2">Journey Type</th>
                          <th className="ps-2">No of trips</th>
                          <th className="ps-2">Emissions</th>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Short Haul Flight (&lt;3hrs)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfTripsSeven"
                              value={formik?.values?.noOfTripsSeven}
                              onChange={(e) => {
                                calclulateFirstClass(e, 'emissionSeven', e.target.value, 600);
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              disabled
                              name="emissionSeven"
                              value={formik?.values?.emissionSeven}
                              onChange={formik.handleChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Medium Haul Flight (3-6hrs)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfTripsEight"
                              value={formik?.values?.noOfTripsEight}
                              onChange={(e) => {
                                calclulateFirstClass(e, 'emissionEight', e.target.value, 1125);
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="emissionEight"
                              value={formik?.values?.emissionEight}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Long Haul Flight (&gt;6hrs)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfTripsNine"
                              value={formik?.values?.noOfTripsNine}
                              onChange={(e) => {
                                calclulateFirstClass(e, 'emissionNine', e.target.value, 2880);
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="emissionNine"
                              value={formik?.values?.emissionNine}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                      </table>
                    </div>
                  </Box>
                </Grid> */}

                <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                  <Stack columnGap={2} rowGap={2} className="flex-xl-row flex-md-row flex-sm-column">
                    {/* <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button> */}
                    {/* <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { formik.handleSubmit(); setValue(value + 1); }} className='custom-btn'> Save and Next Page  </Button> */}
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
                      Save and Next Page{' '}
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
                <Grid item xs={12} sm={12} md={12} marginTop={2}>
                  <Typography color="white">
                    {`Total Air Travel Carbon Footprint = ${Number(totalEmission).toFixed(2)} `}kgCO<sub>2</sub>e
                  </Typography>
                </Grid>
                {/* <Grid item xs={12} sm={12} md={12} marginTop={1}>
                                    <Typography color='white'>Note: For more accurate calculations, please visit ICAO webiste.</Typography>
                                </Grid> */}
              </Grid>
            </Box>
          </Box>
        </Card>
      </Container>
    </div>
  );
};

export default AirTravel;

// import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
// import { useFormik } from 'formik';
// import { useEffect } from 'react';
// import { useTheme } from '@emotion/react';
// import { FaAngleDoubleRight } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import { addAirTravelData, deleteAirTravelData } from '../../redux/slice/totalAirTravelSlice';
// import { addResultTableData, deleteResTabAirTravelData, addResultTableDatasToDb, updateResultTableDatasToDb } from '../../redux/slice/resultTableDataSlice';
// import { IconDiv } from '../../components/IconDiv';
// import AirTravelImg from '../../assets/Travel.png';
// import { apipost } from "../../service/api";
// import useEventData from '../../hooks/useEventData';

// const AirTravel = (props) => {
//     const { setValue, value } = props;
//     const theme = useTheme();
//     const dispatch = useDispatch()
//     const eventsData = useEventData();
//     // const allData = useSelector((state) => state?.totalAirTravelDetails?.data);
//     const allData = useSelector((state) => state?.totalAirTravelDetails?.data?.[0]?.data);
//     const totalEmission = useSelector((state) => state?.totalAirTravelDetails?.totalEmission);
//     const resultTableData = useSelector(state => state.resultTableDataDetails);

//     // -----------   initialValues
//     const initialValues = {
//         // // Economy Class
//         // noOfTripsOne: 0,   // Short Haul
//         // noOfTripsTwo: 0,   // Medium haul
//         // noOfTripsThree: 0, // Long haul
//         // emissionOne: 0,    // Short Haul  200
//         // emissionTwo: 0,    // Medium haul 375
//         // emissionThree: 0,  // Long haul   960
//         // // Business Class
//         // noOfTripsFour: 0,
//         // noOfTripsFive: 0,
//         // noOfTripsSix: 0,
//         // emissionFour: 0,  // 400
//         // emissionFive: 0,  // 750
//         // emissionSix: 0,   // 1920
//         // // First Class
//         // noOfTripsSeven: 0,
//         // noOfTripsEight: 0,
//         // noOfTripsNine: 0,
//         // emissionSeven: 0,   // 600
//         // emissionEight: 0,   // 1125
//         // emissionNine: 0,    // 2880

//         // Economy Class
//         noOfTripsOne: '',   // Short Haul
//         noOfTripsTwo: '',   // Medium haul
//         noOfTripsThree: '', // Long haul
//         emissionOne: '',    // Short Haul  200
//         emissionTwo: '',    // Medium haul 375
//         emissionThree: '',  // Long haul   960
//         // Business Class
//         noOfTripsFour: '',
//         noOfTripsFive: '',
//         noOfTripsSix: '',
//         emissionFour: '',  // 400
//         emissionFive: '',  // 750
//         emissionSix: '',   // 1920
//         // First Class
//         noOfTripsSeven: '',
//         noOfTripsEight: '',
//         noOfTripsNine: '',
//         emissionSeven: '',   // 600
//         emissionEight: '',   // 1125
//         emissionNine: '',    // 288
//     };

//     const formik = useFormik({
//         initialValues,
//         onSubmit: (values) => {
//             const emissionOne = values?.noOfTripsOne === 0 ? 0 : (200 * values?.noOfTripsOne).toFixed(2)
//             const emissionTwo = values?.noOfTripsTwo === 0 ? 0 : (375 * values?.noOfTripsTwo).toFixed(2)
//             const emissionThree = values?.noOfTripsThree === 0 ? 0 : (960 * values?.noOfTripsThree).toFixed(2)
//             const emissionFour = values?.noOfTripsFour === 0 ? 0 : (400 * values?.noOfTripsFour).toFixed(2)
//             const emissionFive = values?.noOfTripsFive === 0 ? 0 : (750 * values?.noOfTripsFive).toFixed(2)
//             const emissionSix = values?.noOfTripsSix === 0 ? 0 : (1920 * values?.noOfTripsSix).toFixed(2)
//             const emissionSeven = values?.noOfTripsSeven === 0 ? 0 : (600 * values?.noOfTripsSeven).toFixed(2)
//             const emissionEight = values?.noOfTripsEight === 0 ? 0 : (1125 * values?.noOfTripsEight).toFixed(2)
//             const emissionNine = values?.noOfTripsNine === 0 ? 0 : (2880 * values?.noOfTripsNine).toFixed(2)

//             if (emissionOne > 0) formik.setFieldValue('emissionOne', emissionOne);
//             if (emissionTwo > 0) formik.setFieldValue('emissionTwo', emissionTwo);
//             if (emissionThree > 0) formik.setFieldValue('emissionThree', emissionThree);
//             if (emissionFour > 0) formik.setFieldValue('emissionFour', emissionFour);
//             if (emissionFive > 0) formik.setFieldValue('emissionFive', emissionFive);
//             if (emissionSix > 0) formik.setFieldValue('emissionSix', emissionSix);
//             if (emissionSeven > 0) formik.setFieldValue('emissionSeven', emissionSeven);
//             if (emissionEight > 0) formik.setFieldValue('emissionEight', emissionEight);
//             if (emissionNine > 0) formik.setFieldValue('emissionNine', emissionNine);

//             const data = [
//                 {
//                     type: 'Economy Class',
//                     noOfTripsOne: values?.noOfTripsOne,
//                     noOfTripsTwo: values?.noOfTripsTwo,
//                     noOfTripsThree: values?.noOfTripsThree,
//                     emissionOne: emissionOne > 0 ? emissionOne : '',
//                     emissionTwo: emissionTwo > 0 ? emissionTwo : '',
//                     emissionThree: emissionThree > 0 ? emissionThree : ''
//                 },
//                 {
//                     type: 'Business Class',
//                     noOfTripsFour: values?.noOfTripsFour,
//                     noOfTripsFive: values?.noOfTripsFive,
//                     noOfTripsSix: values?.noOfTripsSix,
//                     emissionFour: emissionFour > 0 ? emissionFour : '',
//                     emissionFive: emissionFive > 0 ? emissionFive : '',
//                     emissionSix: emissionSix > 0 ? emissionSix : ''
//                 },
//                 {
//                     type: 'First Class',
//                     noOfTripsSeven: values?.noOfTripsSeven,
//                     noOfTripsEight: values?.noOfTripsEight,
//                     noOfTripsNine: values?.noOfTripsNine,
//                     emissionSeven: emissionSeven > 0 ? emissionSeven : '',
//                     emissionEight: emissionEight > 0 ? emissionEight : '',
//                     emissionNine: emissionNine > 0 ? emissionNine : ''
//                 }
//             ];

//             const tableData = [
//                 {
//                     subType: "Economy Class",
//                     subTypeData: {
//                         th: ["Journey Type", "No of trips", "Emissions"],
//                         td: [
//                             {
//                                 journeyType: "Short Haul Flight (<3hrs)",
//                                 noOfTrips: values?.noOfTripsOne,
//                                 emissions: emissionOne > 0 ? emissionOne : ''
//                             },
//                             {
//                                 journeyType: "Medium Haul Flight (3-6hrs)",
//                                 noOfTrips: values?.noOfTripsTwo,
//                                 emissions: emissionTwo > 0 ? emissionTwo : ''
//                             },
//                             {
//                                 journeyType: "Long Haul Flight (>6hrs)",
//                                 noOfTrips: values?.noOfTripsThree,
//                                 emissions: emissionThree > 0 ? emissionThree : ''
//                             }
//                         ]
//                     },
//                     // scope: 3
//                 },
//                 {
//                     subType: "Business Class",
//                     subTypeData: {
//                         th: ["Journey Type", "No of trips", "Emissions"],
//                         td: [
//                             {
//                                 journeyType: "Short Haul Flight (<3hrs)",
//                                 noOfTrips: values?.noOfTripsFour,
//                                 emissions: emissionFour > 0 ? emissionFour : ''
//                             },
//                             {
//                                 journeyType: "Medium Haul Flight (3-6hrs)",
//                                 noOfTrips: values?.noOfTripsFive,
//                                 emissions: emissionFive > 0 ? emissionFive : ''
//                             },
//                             {
//                                 journeyType: "Long Haul Flight (>6hrs)",
//                                 noOfTrips: values?.noOfTripsSix,
//                                 emissions: emissionSix > 0 ? emissionSix : ''
//                             }
//                         ]
//                     },
//                     // scope: 3
//                 },
//                 {
//                     subType: "First Class",
//                     subTypeData: {
//                         th: ["Journey Type", "No of trips", "Emissions"],
//                         td: [
//                             {
//                                 journeyType: "Short Haul Flight (<3hrs)",
//                                 noOfTrips: values?.noOfTripsSeven,
//                                 emissions: emissionSeven > 0 ? emissionSeven : ''
//                             },
//                             {
//                                 journeyType: "Medium Haul Flight (3-6hrs)",
//                                 noOfTrips: values?.noOfTripsEight,
//                                 emissions: emissionEight > 0 ? emissionEight : ''
//                             },
//                             {
//                                 journeyType: "Long Haul Flight (>6hrs)",
//                                 noOfTrips: values?.noOfTripsNine,
//                                 emissions: emissionNine > 0 ? emissionNine : ''
//                             }
//                         ]
//                     },
//                     // scope: 3
//                 },
//             ];

//             dispatch(addAirTravelData({ data }));
//             dispatch(addResultTableData({ from: "f2fEvent", data: tableData, tabTitle: "Air Travel" }));
//         },
//     });

//     const handeleDelete = () => {
//         dispatch(deleteAirTravelData());
//         dispatch(deleteResTabAirTravelData());
//     };

//     const handleSaveToDb = async () => {
//         const eventData = {
//             ...eventsData,
//         };

//         if (resultTableData.eventDataId) {
//             eventData.eventDataId = resultTableData?.eventDataId;
//             const resultAction = await dispatch(updateResultTableDatasToDb(eventData));
//             if (updateResultTableDatasToDb?.rejected?.match(resultAction)) {
//                 console.error('Failed to update data:', resultAction?.payload);
//             }
//         } else {
//             const resultAction = await dispatch(addResultTableDatasToDb(eventData));
//             if (addResultTableDatasToDb?.rejected?.match(resultAction)) {
//                 console.error('Failed to save data:', resultAction?.payload);
//             }
//         }
//     };

//     useEffect(() => {
//         if (allData?.length > 0) {
//             formik.setFieldValue("noOfTripsOne", allData?.[0]?.noOfTripsOne);
//             formik.setFieldValue("noOfTripsTwo", allData?.[0]?.noOfTripsTwo);
//             formik.setFieldValue("noOfTripsThree", allData?.[0]?.noOfTripsThree);
//             formik.setFieldValue("emissionOne", allData?.[0]?.emissionOne);
//             formik.setFieldValue("emissionTwo", allData?.[0]?.emissionTwo);
//             formik.setFieldValue("emissionThree", allData?.[0]?.emissionThree);

//             formik.setFieldValue("noOfTripsFour", allData?.[1]?.noOfTripsFour);
//             formik.setFieldValue("noOfTripsFive", allData?.[1]?.noOfTripsFive);
//             formik.setFieldValue("noOfTripsSix", allData?.[1]?.noOfTripsSix);
//             formik.setFieldValue("emissionFour", allData?.[1]?.emissionFour);
//             formik.setFieldValue("emissionFive", allData?.[1]?.emissionFive);
//             formik.setFieldValue("emissionSix", allData?.[1]?.emissionSix);

//             formik.setFieldValue("noOfTripsSeven", allData?.[2]?.noOfTripsSeven);
//             formik.setFieldValue("noOfTripsEight", allData?.[2]?.noOfTripsEight);
//             formik.setFieldValue("noOfTripsNine", allData?.[2]?.noOfTripsNine);
//             formik.setFieldValue("emissionSeven", allData?.[2]?.emissionSeven);
//             formik.setFieldValue("emissionEight", allData?.[2]?.emissionEight);
//             formik.setFieldValue("emissionNine", allData?.[2]?.emissionNine);
//         }
//     }, [value]);

//     const calclulateEconomyClass = (e, emmFieldName, firstValue, ef) => {
//         formik.handleChange(e);
//         formik.setFieldValue(emmFieldName, firstValue === 0 ? 0 : (ef * firstValue).toFixed(2));
//         formik.handleSubmit();
//     };

//     const calclulateBusinessClass = (e, emmFieldName, firstValue, ef) => {
//         formik.handleChange(e);
//         formik.setFieldValue(emmFieldName, firstValue === 0 ? 0 : (ef * firstValue).toFixed(2));
//         formik.handleSubmit();
//     };

//     const calclulateFirstClass = (e, emmFieldName, firstValue, ef) => {
//         formik.handleChange(e);
//         formik.setFieldValue(emmFieldName, firstValue === 0 ? 0 : (ef * firstValue).toFixed(2));
//         formik.handleSubmit();
//     };

//     return (
//         <div>
//             <Container maxWidth>
//                 <Card className='p-3 custom-inner-bg textborder' style={{ padding: '20px' }}>
//                     <Box style={{ display: 'flex', justifyContent: 'center' }}>
//                         <Box mx={useMediaQuery(theme.breakpoints.up('lg')) && 15} display={'flex'} alignItems={'center'} flexDirection={'column'}>
//                             <IconDiv>
//                                 <img src={AirTravelImg} alt="Waste" width={100} className='tabImgWhite' />
//                             </IconDiv>
//                             <Grid
//                                 container
//                                 rowSpacing={3}
//                                 columnSpacing={{ xs: 0, sm: 5, md: 4 }}
//                             >
//                                 <Grid item xs={12} sm={12} md={6}>
//                                     <Box>
//                                         <Typography variant='h4' className='text-center text-white mb-4'>Economy Class</Typography>
//                                         <div className='table-responsive'>
//                                             <table className='table-custom-inpt-field'>
//                                                 <tr>
//                                                     <th className='ps-2'>Journey Type</th>
//                                                     <th className='ps-2'>No of trips</th>
//                                                     <th className='ps-2'>Emissions</th>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Short Haul Flight (&lt;3hrs)</td>
//                                                     <td className='ps-2 py-1'>
//                                                         <TextField size='small' type="number" name='noOfTripsOne' value={formik?.values?.noOfTripsOne}
//                                                             onChange={(e) => { calclulateEconomyClass(e, "emissionOne", e.target.value, 200) }}
//                                                             inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='emissionOne' value={formik?.values?.emissionOne} onChange={formik.handleChange} /></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Medium Haul Flight (3-6hrs)</td>
//                                                     <td className='ps-2 py-1'>
//                                                         <TextField size='small' type="number" name='noOfTripsTwo' value={formik?.values?.noOfTripsTwo}
//                                                             onChange={(e) => { calclulateEconomyClass(e, "emissionTwo", e.target.value, 375) }}
//                                                             inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionTwo' value={formik?.values?.emissionTwo} onChange={formik.handleChange} disabled /></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Long Haul Flight (&gt;6hrs)</td>
//                                                     <td className='ps-2 py-1'>
//                                                         <TextField size='small' type="number" name='noOfTripsThree' value={formik?.values?.noOfTripsThree}
//                                                             onChange={(e) => { calclulateEconomyClass(e, "emissionThree", e.target.value, 960) }}
//                                                             inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionThree' value={formik?.values?.emissionThree} onChange={formik.handleChange} disabled /></td>
//                                                 </tr>
//                                             </table>
//                                         </div>
//                                     </Box>
//                                 </Grid>

//                                 <Grid item xs={12} sm={12} md={6}>
//                                     <Box>
//                                         <Typography variant='h4' className='text-center text-white mb-4'>Business Class</Typography>
//                                         <div className='table-responsive'>
//                                             <table className='table-custom-inpt-field'>
//                                                 <tr>
//                                                     <th className='ps-2'>Journey Type</th>
//                                                     <th className='ps-2'>No of trips</th>
//                                                     <th className='ps-2'>Emissions</th>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Short Haul Flight (&lt;3hrs)</td>
//                                                     <td className='ps-2 py-1'>
//                                                         <TextField size='small' type="number" name='noOfTripsFour' value={formik?.values?.noOfTripsFour}
//                                                             onChange={(e) => { calclulateBusinessClass(e, "emissionFour", e.target.value, 400) }}
//                                                             inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='emissionFour' value={formik?.values?.emissionFour} onChange={formik.handleChange} /></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Medium Haul Flight (3-6hrs)</td>
//                                                     <td className='ps-2 py-1'>
//                                                         <TextField size='small' type="number" name='noOfTripsFive' value={formik?.values?.noOfTripsFive}
//                                                             onChange={(e) => { calclulateBusinessClass(e, "emissionFive", e.target.value, 750) }}
//                                                             inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionFive' value={formik?.values?.emissionFive} onChange={formik.handleChange} disabled /></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Long Haul Flight (&gt;6hrs)</td>
//                                                     <td className='ps-2 py-1'>
//                                                         <TextField size='small' type="number" name='noOfTripsSix' value={formik?.values?.noOfTripsSix}
//                                                             onChange={(e) => { calclulateBusinessClass(e, "emissionSix", e.target.value, 1920) }}
//                                                             inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionSix' value={formik?.values?.emissionSix} onChange={formik.handleChange} disabled /></td>
//                                                 </tr>
//                                             </table>
//                                         </div>
//                                     </Box>
//                                 </Grid>

//                                 <Grid item xs={12} sm={12} md={6}>
//                                     <Box>
//                                         <Typography variant='h4' className="text-center text-white mb-4">First Class</Typography>
//                                         <div className='table-responsive'>
//                                             <table className='table-custom-inpt-field'>
//                                                 <tr>
//                                                     <th className='ps-2'>Journey Type</th>
//                                                     <th className='ps-2'>No of trips</th>
//                                                     <th className='ps-2'>Emissions</th>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Short Haul Flight (&lt;3hrs)</td>
//                                                     <td className='ps-2 py-1'>
//                                                         <TextField size='small' type="number" name='noOfTripsSeven' value={formik?.values?.noOfTripsSeven}
//                                                             onChange={(e) => { calclulateFirstClass(e, "emissionSeven", e.target.value, 600) }}
//                                                             inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='emissionSeven' value={formik?.values?.emissionSeven} onChange={formik.handleChange} /></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Medium Haul Flight (3-6hrs)</td>
//                                                     <td className='ps-2 py-1'>
//                                                         <TextField size='small' type="number" name='noOfTripsEight' value={formik?.values?.noOfTripsEight}
//                                                             onChange={(e) => { calclulateFirstClass(e, "emissionEight", e.target.value, 1125) }}
//                                                             inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionEight' value={formik?.values?.emissionEight} onChange={formik.handleChange} disabled /></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Long Haul Flight (&gt;6hrs)</td>
//                                                     <td className='ps-2 py-1'>
//                                                         <TextField size='small' type="number" name='noOfTripsNine' value={formik?.values?.noOfTripsNine}
//                                                             onChange={(e) => { calclulateFirstClass(e, "emissionNine", e.target.value, 2880) }}
//                                                             inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionNine' value={formik?.values?.emissionNine} onChange={formik.handleChange} disabled /></td>
//                                                 </tr>
//                                             </table>
//                                         </div>
//                                     </Box>
//                                 </Grid>

//                                 <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>
//                                     <Stack columnGap={2} rowGap={2} className='flex-xl-row flex-md-row flex-sm-column'>
//                                         {/* <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button> */}
//                                         {/* <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { formik.handleSubmit(); setValue(value + 1); }} className='custom-btn'> Save and Next Page  </Button> */}
//                                         <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { handleSaveToDb(); setValue(value + 1); }} className='custom-btn'> Save and Next Page  </Button>
//                                         <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { handleSaveToDb(); setValue(9); }} className='custom-btn'>Go To Result</Button>
//                                         {/* <Button variant='contained' onClick={() => { handleSaveToDb(); }} className='custom-btn'>SaveToDB</Button> */}
//                                         <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete(); }} color='error'>Clear</Button>
//                                     </Stack>
//                                 </Grid>
//                                 <Grid item xs={12} sm={12} md={12} marginTop={2}>
//                                     <Typography color='white'>{`Total Air Travel Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e</Typography>
//                                 </Grid>
//                                 {/* <Grid item xs={12} sm={12} md={12} marginTop={1}>
//                                     <Typography color='white'>Note: For more accurate calculations, please visit ICAO webiste.</Typography>
//                                 </Grid> */}
//                             </Grid>
//                         </Box>
//                     </Box>
//                 </Card>
//             </Container>
//         </div>
//     )
// };

// export default AirTravel;
