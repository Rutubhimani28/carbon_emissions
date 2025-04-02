import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addFoodData, deleteFoodData } from '../../redux/slice/totalFoodSlice';
import {
  addResultTableData,
  deleteResTabFBData,
  addResultTableDatasToDb,
  updateResultTableDatasToDb,
} from '../../redux/slice/resultTableDataSlice';
import { IconDiv } from '../../components/IconDiv';
import FoodImg from '../../assets/Food & Beverage.png';
import useEventData from '../../hooks/useEventData';

const Food = (props) => {
  const { setValue, value } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const allData = useSelector((state) => state?.totalFoodDetails?.data?.[0]?.data);
  const totalEmission = useSelector((state) => state?.totalFoodDetails?.totalEmission);
  const resultTableData = useSelector((state) => state?.resultTableDataDetails);
  const eventsData = useEventData();

  // -----------   initialValues
  const initialValues = {
    // noOfPaxOne: 0,
    // noOfPaxTwo: 0,
    // noOfPaxThree: 0,
    // noOfPaxFour: 0,
    // noOfPaxFive: 0,
    // emissionOne: 0,
    // emissionTwo: 0,
    // emissionThree: 0,
    // emissionFour: 0,
    // emissionFive: 0,

    // noOfBottlesOne: 0,
    // noOfBottlesTwo: 0,
    // noOfBottlesThree: 0,
    // noOfBottlesFour: 0,
    // noOfBottlesFive: 0,
    // noOfBottlesSix: 0,
    // noOfBottlesSeven: 0,
    // noOfBottlesEight: 0,
    // noOfBottlesNine: 0,
    // emissionSix: 0,
    // emissionSeven: 0,
    // emissionEight: 0,
    // emissionNine: 0,
    // emissionTen: 0,
    // emissionEleven: 0,
    // emissionTwelve: 0,
    // emissionThirteen: 0,
    // emissionFourteen: 0,

    // custBeveragesEmission: 0,
    // custFoodMenuEmission: 0,

    noOfPaxOne: '',
    noOfPaxTwo: '',
    noOfPaxThree: '',
    noOfPaxFour: '',
    // noOfPaxFive: '',
    emissionOne: '',
    emissionTwo: '',
    emissionThree: '',
    emissionFour: '',
    emissionFive: '',

    noOfBottlesOne: '',
    noOfBottlesTwo: '',
    noOfBottlesThree: '',
    noOfBottlesFour: '',
    noOfBottlesFive: '',
    noOfBottlesSix: '',
    noOfBottlesSeven: '',
    noOfBottlesEight: '',
    noOfBottlesNine: '',
    emissionSix: '',
    emissionSeven: '',
    emissionEight: '',
    emissionNine: '',
    emissionTen: '',
    emissionEleven: '',
    emissionTwelve: '',
    emissionThirteen: '',
    emissionFourteen: '',

    custBeveragesEmission: '',
    custFoodMenuEmission: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const emissionOne = Number((0.7237 * values?.noOfPaxOne).toFixed(5));
      const emissionTwo = Number((1.08555 * values?.noOfPaxTwo).toFixed(5));
      const emissionThree = Number((1.30266 * values?.noOfPaxThree).toFixed(5));
      const emissionFour = Number((1.01318 * values?.noOfPaxFour).toFixed(5));
      const emissionSix = Number((1.1 * values?.noOfBottlesOne).toFixed(5));
      const emissionSeven = Number((0.57 * values?.noOfBottlesTwo).toFixed(5));
      const emissionEight = Number((0.67 * values?.noOfBottlesThree).toFixed(5));
      const emissionNine = Number((2.971 * values?.noOfBottlesFour).toFixed(5));
      const emissionTen = Number((0.74 * values?.noOfBottlesFive).toFixed(5));
      const emissionEleven = Number((0.25 * values?.noOfBottlesSix).toFixed(5));
      const emissionTwelve = Number((2.19 * values?.noOfBottlesSeven).toFixed(5));
      // const emissionThirteen = Number((1.09 * values?.noOfBottlesEight).toFixed(5));
      // const emissionFourteen = Number((1.06 * values?.noOfBottlesNine).toFixed(5));

      if (emissionOne > 0) formik.setFieldValue('emissionOne', emissionOne); // Veg Plate Lunch/ Dinner
      if (emissionTwo > 0) formik.setFieldValue('emissionTwo', emissionTwo); // Non Veg plate Lunch/ Dinner
      if (emissionThree > 0) formik.setFieldValue('emissionThree', emissionThree); // Veg Starter
      if (emissionFour > 0) formik.setFieldValue('emissionFour', emissionFour); // Non Veg starter
      if (emissionSix > 0) formik.setFieldValue('emissionSix', emissionSix); // Soft Drinks
      if (emissionSeven > 0) formik.setFieldValue('emissionSeven', emissionSeven); // Red Wine
      if (emissionEight > 0) formik.setFieldValue('emissionEight', emissionEight); // White Wine
      if (emissionNine > 0) formik.setFieldValue('emissionNine', emissionNine); // Whisky
      if (emissionTen > 0) formik.setFieldValue('emissionTen', emissionTen); // Gin
      if (emissionEleven > 0) formik.setFieldValue('emissionEleven', emissionEleven); // Rum
      if (emissionTwelve > 0) formik.setFieldValue('emissionTwelve', emissionTwelve); // Vodka
      // if (emissionThirteen > 0) formik.setFieldValue('emissionThirteen', emissionThirteen); // Fruit Juices
      // if (emissionFourteen > 0) formik.setFieldValue('emissionFourteen', emissionFourteen); // Beer

      const data = [
        {
          type: 'Vegetarian',
          noOfPax: values?.noOfPaxOne,
          emission: Number((0.7237 * values?.noOfPaxOne).toFixed(5)) || 0,
        },
        {
          type: 'Non-Veg (Poultry/ Sea Food)',
          noOfPax: values?.noOfPaxTwo,
          emission: Number((1.08555 * values?.noOfPaxTwo).toFixed(5)) || 0,
        },
        {
          type: 'Non-Veg (Red Meat)',
          noOfPax: values?.noOfPaxThree,
          emission: Number((1.30266 * values?.noOfPaxThree).toFixed(5)) || 0,
        },
        {
          type: 'Lacto-vegetarian meal',
          noOfPax: values?.noOfPaxFour,
          emission: Number((0.01318 * values?.noOfPaxFour).toFixed(5)) || 0,
        },
        {
          type: 'Branded Wine (750ml)',
          noOfBottles: values?.noOfBottlesOne,
          emission: Number((1.1 * values?.noOfBottlesOne).toFixed(5)) || 0,
        },
        {
          type: 'Whisky (750ml)',
          noOfBottles: values?.noOfBottlesFour,
          emission: Number((2.971 * values?.noOfBottlesFour).toFixed(5)) || 0,
        },
        {
          type: 'Vodka (1l)',
          noOfBottles: values?.noOfBottlesSeven,
          emission: Number((2.19 * values?.noOfBottlesSeven).toFixed(5)) || 0,
        },
        {
          type: 'Beer (66-cL Glass Bottle- 1l)',
          noOfBottles: values?.noOfBottlesTwo,
          emission: Number((0.57 * values?.noOfBottlesTwo).toFixed(5)) || 0,
        },
        {
          type: 'Beer (33-cL Glass Bottle- 1l)',
          noOfBottles: values?.noOfBottlesThree,
          emission: Number((0.67 * values?.noOfBottlesThree).toFixed(5)) || 0,
        },
        {
          type: '33-cL aluminum cans- 1l',
          noOfBottles: values?.noOfBottlesFive,
          emission: Number((0.74 * values?.noOfBottlesFive).toFixed(5)) || 0,
        },
        {
          type: '30-L steel kegs- 1l',
          noOfBottles: values?.noOfBottlesSix,
          emission: Number((0.25 * values?.noOfBottlesSix).toFixed(5)) || 0,
        },

        // {
        //   type: 'Fruit Juices',
        //   noOfBottles: values?.noOfBottlesEight,
        //   emission: Number((1.09 * values?.noOfBottlesEight).toFixed(5)) || 0,
        // },
        // {
        //   type: 'Beer',
        //   noOfBottles: values?.noOfBottlesNine,
        //   emission: Number((1.06 * values?.noOfBottlesNine).toFixed(5)) || 0,
        // },
        // {
        //   type: 'Customised Food Menu',
        //   emission: values?.custFoodMenuEmission || 0,
        // },
        // {
        //   type: 'Customised Beverages',
        //   emission: values?.custBeveragesEmission || 0,
        // },
      ];

      const tableData = [
        {
          subType: 'Meal Type',
          subTypeData: {
            th: ['', 'No. of persons', 'Emissions'],
            td: [
              {
                fBType: 'Vegetarian',
                noOfPax: values?.noOfPaxOne,
                emissions: emissionOne > 0 ? emissionOne : '',
              },
              {
                fBType: 'Lacto-vegetarian meal',
                noOfPax: values?.noOfPaxFour,
                emissions: emissionFour > 0 ? emissionFour : '',
              },
              {
                fBType: 'Non-Veg (Poultry Ovo)',
                noOfPax: values?.noOfPaxTwo,
                emissions: emissionTwo > 0 ? emissionTwo : '',
              },
              {
                fBType: 'Non-Veg (Red Meat)',
                noOfPax: values?.noOfPaxThree,
                emissions: emissionThree > 0 ? emissionThree : '',
              },
            ],
          },
        },
        {
          subType: 'Beverages',
          subTypeData: {
            th: ['', 'No. of Bottles', 'Emissions'],
            td: [
              {
                fBType: 'Branded Wine (750ml)',
                noOfBottles: values?.noOfBottlesOne,
                emissions: emissionSix > 0 ? emissionSix : '',
              },
              {
                fBType: 'Whisky (750ml)',
                noOfBottles: values?.noOfBottlesFour,
                emissions: emissionNine > 0 ? emissionNine : '',
              },
              {
                fBType: 'Vodka (1l)',
                noOfBottles: values?.noOfBottlesSeven,
                emissions: emissionTwelve > 0 ? emissionTwelve : '',
              },
              {
                fBType: 'Beer (66-cL Glass Bottle- 1l)',
                noOfBottles: values?.noOfBottlesTwo,
                emissions: emissionSeven > 0 ? emissionSeven : '',
              },
              {
                fBType: 'Beer (33-cL Glass Bottle- 1l)',
                noOfBottles: values?.noOfBottlesThree,
                emissions: emissionEight > 0 ? emissionEight : '',
              },

              {
                fBType: '33-cL aluminum cans- 1l',
                noOfBottles: values?.noOfBottlesFive,
                emissions: emissionTen > 0 ? emissionTen : '',
              },
              {
                fBType: '30-L steel kegs- 1l',
                noOfBottles: values?.noOfBottlesSix,
                emissions: emissionEleven > 0 ? emissionEleven : '',
              },
              // {
              //     fBType: "Customised Beverages",
              //     noOfBottles: '',
              //     emissions: values?.custBeveragesEmission > 0 ? values?.custBeveragesEmission : ''
              // },
            ],
          },
        },
      ];
      dispatch(addFoodData({ data }));
      dispatch(addResultTableData({ from: 'f2fEvent', data: tableData, tabTitle: 'Food' }));
    },
  });

  const handeleDelete = () => {
    dispatch(deleteFoodData());
    dispatch(deleteResTabFBData());
  };

  const handleSaveToDb = async () => {
    const eventData = {
      ...eventsData,
    };
    if (resultTableData.eventDataId) {
      eventData.eventDataId = resultTableData?.eventDataId;
      const resultAction = await dispatch(updateResultTableDatasToDb(eventData));
      if (updateResultTableDatasToDb.rejected.match(resultAction)) {
        console.error('Failed to update data:', resultAction.payload);
      }
    } else {
      const resultAction = await dispatch(addResultTableDatasToDb(eventData));
      if (addResultTableDatasToDb.rejected.match(resultAction)) {
        console.error('Failed to save data:', resultAction.payload);
      }
    }
  };
  console.log(allData, 'allData');
  useEffect(() => {
    if (allData?.length > 0) {
      formik.setFieldValue('noOfPaxOne', allData?.[0]?.noOfPax);
      formik.setFieldValue('emissionOne', allData?.[0]?.emission);
      formik.setFieldValue('noOfPaxTwo', allData?.[1]?.noOfPax);
      formik.setFieldValue('emissionTwo', allData?.[1]?.emission);
      formik.setFieldValue('noOfPaxThree', allData?.[2]?.noOfPax);
      formik.setFieldValue('emissionThree', allData?.[2]?.emission);
      formik.setFieldValue('noOfPaxFour', allData?.[3]?.noOfPax);
      formik.setFieldValue('emissionFour', allData?.[3]?.emission);

      formik.setFieldValue('noOfBottlesOne', allData?.[4]?.noOfBottles);
      formik.setFieldValue('emissionSix', allData?.[4]?.emission);
      formik.setFieldValue('noOfBottlesFour', allData?.[5]?.noOfBottles);
      formik.setFieldValue('emissionNine', allData?.[5]?.emission);
      formik.setFieldValue('noOfBottlesSeven', allData?.[6]?.noOfBottles);
      formik.setFieldValue('emissionTwelve', allData?.[6]?.emission);
      formik.setFieldValue('noOfBottlesTwo', allData?.[7]?.noOfBottles);
      formik.setFieldValue('emissionSeven', allData?.[7]?.emission);
      formik.setFieldValue('noOfBottlesThree', allData?.[8]?.noOfBottles);
      formik.setFieldValue('emissionEight', allData?.[8]?.emission);
      formik.setFieldValue('noOfBottlesFive', allData?.[9]?.noOfBottles);
      formik.setFieldValue('emissionTen', allData?.[9]?.emission);
      formik.setFieldValue('noOfBottlesSix', allData?.[10]?.noOfBottles);
      formik.setFieldValue('emissionEleven', allData?.[10]?.emission);

      // formik.setFieldValue('noOfBottlesOne', allData?.[4]?.noOfBottles);
      // formik.setFieldValue('emissionSix', allData?.[4]?.emission);
      // formik.setFieldValue('noOfBottlesTwo', allData?.[5]?.noOfBottles);
      // formik.setFieldValue('emissionSeven', allData?.[5]?.emission);
      // formik.setFieldValue('noOfBottlesThree', allData?.[6]?.noOfBottles);
      // formik.setFieldValue('emissionEight', allData?.[6]?.emission);
      // formik.setFieldValue('noOfBottlesFour', allData?.[7]?.noOfBottles);
      // formik.setFieldValue('emissionNine', allData?.[7]?.emission);
      // formik.setFieldValue('noOfBottlesFive', allData?.[8]?.noOfBottles);
      // formik.setFieldValue('emissionTen', allData?.[8]?.emission);
      // formik.setFieldValue('noOfBottlesSix', allData?.[9]?.noOfBottles);
      // formik.setFieldValue('emissionEleven', allData?.[9]?.emission);
      // formik.setFieldValue('noOfBottlesSeven', allData?.[10]?.noOfBottles);
      // formik.setFieldValue('emissionTwelve', allData?.[10]?.emission);

      // formik.setFieldValue('noOfBottlesEight', allData?.[11]?.noOfBottles);
      // formik.setFieldValue('emissionThirteen', allData?.[11]?.emission);
      // formik.setFieldValue('noOfBottlesNine', allData?.[12]?.noOfBottles);
      // formik.setFieldValue('emissionFourteen', allData?.[12]?.emission);

      // formik.setFieldValue('custFoodMenuEmission', allData?.[13]?.emission);
      // formik.setFieldValue('custBeveragesEmission', allData?.[14]?.emission);
    }
  }, [value]);

  const { values } = formik;

  const handleChangeFoodWaste = (e, fieldName, firstValue, ef) => {
    formik.handleChange(e);
    formik.setFieldValue(fieldName, Number((ef * Number(firstValue)).toFixed(5)));
    formik.handleSubmit();
  };

  const handleChangeBeveragesWaste = (e, fieldName, firstValue, ef) => {
    formik.handleChange(e);
    formik.setFieldValue(fieldName, Number((ef * Number(firstValue)).toFixed(5)));
    formik.handleSubmit();
  };

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
                <img width={100} src={FoodImg} alt="Food" className="tabImgWhite" />
              </IconDiv>

              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={6}>
                  <Box>
                    <Typography variant="h4" className="text-center text-white mb-4">
                      Meal Type
                    </Typography>
                    <div className="table-responsive">
                      <table className="table-custom-inpt-field">
                        <tr>
                          <th className="ps-2" width="150" />

                          <th className="ps-2">No. of persons</th>
                          <th className="ps-2">Emissions</th>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Vegetarian</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfPaxOne"
                              value={formik?.values?.noOfPaxOne}
                              onChange={(e) => {
                                handleChangeFoodWaste(e, 'emissionOne', e.target.value, 2);
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
                          <td className="ps-2 py-1">Lacto-vegetarian meal</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfPaxFour"
                              value={formik?.values?.noOfPaxFour}
                              onChange={(e) => {
                                handleChangeFoodWaste(e, 'emissionFour', e.target.value, 1.01318);
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="emissionFour"
                              value={formik?.values?.emissionFour}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Non-Veg (Poultry Ovo)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfPaxTwo"
                              value={formik?.values?.noOfPaxTwo}
                              onChange={(e) => {
                                handleChangeFoodWaste(e, 'emissionTwo', e.target.value, 1.08555);
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
                          <td className="ps-2 py-1">Non-Veg (Red Meat)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfPaxThree"
                              value={formik?.values?.noOfPaxThree}
                              onChange={(e) => {
                                handleChangeFoodWaste(e, 'emissionThree', e.target.value, 1.30266);
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
                    </div>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Box>
                    <Typography variant="h4" className="text-center text-white mb-4">
                      Beverages
                    </Typography>
                    <div className="table-responsive">
                      <table className="table-custom-inpt-field">
                        <tr>
                          <th className="ps-2" />
                          {/* <th className="ps-2">Beverages (1000ml)</th> */}
                          <th className="ps-2">No. of Bottles </th>
                          <th className="ps-2">Emissions</th>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Branded Wine (750ml)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfBottlesOne"
                              value={formik?.values?.noOfBottlesOne}
                              onChange={(e) => {
                                handleChangeBeveragesWaste(e, 'emissionSix', e.target.value, 1.1);
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              disabled
                              name="emissionSix"
                              value={formik?.values?.emissionSix}
                              onChange={formik.handleChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Whisky (750ml)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfBottlesFour"
                              value={formik?.values?.noOfBottlesFour}
                              onChange={(e) => {
                                handleChangeBeveragesWaste(e, 'emissionNine', e.target.value, 2.971);
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              disabled
                              name="emissionNine"
                              value={formik?.values?.emissionNine}
                              onChange={formik.handleChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Vodka (1l)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfBottlesSeven"
                              value={formik?.values?.noOfBottlesSeven}
                              onChange={(e) => {
                                handleChangeBeveragesWaste(e, 'emissionTwelve', e.target.value, 2.19);
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="emissionTwelve"
                              value={formik?.values?.emissionTwelve}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Beer (66-cL Glass Bottle- 1l)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfBottlesTwo"
                              value={formik?.values?.noOfBottlesTwo}
                              onChange={(e) => {
                                handleChangeBeveragesWaste(e, 'emissionSeven', e.target.value, 0.57);
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="emissionSeven"
                              value={formik?.values?.emissionSeven}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Beer (33-cL Glass Bottle- 1l)</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfBottlesThree"
                              value={formik?.values?.noOfBottlesThree}
                              onChange={(e) => {
                                handleChangeBeveragesWaste(e, 'emissionEight', e.target.value, 0.67);
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
                          <td className="ps-2 py-1">33-cL aluminum cans- 1l</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfBottlesFive"
                              value={formik?.values?.noOfBottlesFive}
                              onChange={(e) => {
                                handleChangeBeveragesWaste(e, 'emissionTen', e.target.value, 0.74);
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="emissionTen"
                              value={formik?.values?.emissionTen}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">30-L steel kegs- 1l</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfBottlesSix"
                              value={formik?.values?.noOfBottlesSix}
                              onChange={(e) => {
                                handleChangeBeveragesWaste(e, 'emissionEleven', e.target.value, 0.25);
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="emissionEleven"
                              value={formik?.values?.emissionEleven}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>

                        {/* <tr>
                          <td className="ps-2 py-1">Fruit Juices</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfBottlesEight"
                              value={formik?.values?.noOfBottlesEight}
                              onChange={(e) => {
                                handleChangeBeveragesWaste(e, 'emissionThirteen', e.target.value, 1.09);
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="emissionThirteen"
                              value={formik?.values?.emissionThirteen}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Beer</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="noOfBottlesNine"
                              value={formik?.values?.noOfBottlesNine}
                              onChange={(e) => {
                                handleChangeBeveragesWaste(e, 'emissionFourteen', e.target.value, 1.06);
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="emissionFourteen"
                              value={formik?.values?.emissionFourteen}
                              onChange={formik.handleChange}
                              disabled
                            />
                          </td>
                        </tr> */}
                      </table>
                    </div>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Box>
                    <Typography variant="h4" className="text-center text-white mb-4" sx={{ opacity: 0 }}>
                      temp
                    </Typography>
                    {/* <div className="table-responsive">
                      <table className="table-custom-inpt-field">
                        <tr>
                          <th />
                          <th className="ps-2">Emissions</th>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1" width="182">
                            Customised Food
                          </td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="custFoodMenuEmission"
                              value={formik?.values?.custFoodMenuEmission}
                              // onChange={formik.handleChange}
                              onChange={(e) => {
                                formik.setFieldValue('custFoodMenuEmission', e.target.value);
                                formik.handleSubmit();
                              }}
                              inputProps={{ style: { color: 'white' } }}
                            />
                          </td>
                        </tr>
                      </table>
                    </div> */}
                  </Box>
                </Grid>

                {/* <Grid item xs={12} sm={12} md={6}>
                  <Box>
                    <Typography variant="h4" className="text-center text-white mb-4" sx={{ opacity: 0 }}>
                      temp
                    </Typography>
                    <div className="table-responsive">
                      <table className="table-custom-inpt-field">
                        <tr>
                          <th />
                          <th className="ps-2">Emissions</th>
                        </tr>
                        <tr>
                          <td className="ps-2 py-1">Customised Beverages</td>
                          <td className="ps-2 py-1">
                            <TextField
                              size="small"
                              type="number"
                              name="custBeveragesEmission"
                              value={formik?.values?.custBeveragesEmission}
                              // onChange={formik.handleChange}
                              onChange={(e) => {
                                formik.setFieldValue('custBeveragesEmission', e.target.value);
                                formik.handleSubmit();
                              }}
                              inputProps={{ style: { color: 'white' } }}
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
                <Grid item xs={12} sm={12} md={12} marginTop={3}>
                  <Typography color="white">
                    {`Total Food Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Card>
      </Container>
    </div>
  );
};

export default Food;

// import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
// import { useFormik } from 'formik';
// import { useEffect } from 'react';
// import { useTheme } from '@mui/material/styles';
// import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';
// import { addFoodData, deleteFoodData } from '../../redux/slice/totalFoodSlice';
// import { addResultTableData, deleteResTabFBData, addResultTableDatasToDb, updateResultTableDatasToDb } from '../../redux/slice/resultTableDataSlice';
// import { IconDiv } from '../../components/IconDiv';
// import FoodImg from '../../assets/Food & Beverage.png';
// import useEventData from '../../hooks/useEventData';

// const Food = (props) => {
//     const { setValue, value } = props;
//     const dispatch = useDispatch()
//     const theme = useTheme();
//     const allData = useSelector((state) => state?.totalFoodDetails?.data?.[0]?.data);
//     const totalEmission = useSelector((state) => state?.totalFoodDetails?.totalEmission);
//     const resultTableData = useSelector(state => state?.resultTableDataDetails);
//     const eventsData = useEventData();

//     // -----------   initialValues
//     const initialValues = {
//         // noOfPaxOne: 0,
//         // noOfPaxTwo: 0,
//         // noOfPaxThree: 0,
//         // noOfPaxFour: 0,
//         // noOfPaxFive: 0,
//         // emissionOne: 0,
//         // emissionTwo: 0,
//         // emissionThree: 0,
//         // emissionFour: 0,
//         // emissionFive: 0,

//         // noOfBottlesOne: 0,
//         // noOfBottlesTwo: 0,
//         // noOfBottlesThree: 0,
//         // noOfBottlesFour: 0,
//         // noOfBottlesFive: 0,
//         // noOfBottlesSix: 0,
//         // noOfBottlesSeven: 0,
//         // noOfBottlesEight: 0,
//         // noOfBottlesNine: 0,
//         // emissionSix: 0,
//         // emissionSeven: 0,
//         // emissionEight: 0,
//         // emissionNine: 0,
//         // emissionTen: 0,
//         // emissionEleven: 0,
//         // emissionTwelve: 0,
//         // emissionThirteen: 0,
//         // emissionFourteen: 0,

//         // custBeveragesEmission: 0,
//         // custFoodMenuEmission: 0,

//         noOfPaxOne: '',
//         noOfPaxTwo: '',
//         noOfPaxThree: '',
//         noOfPaxFour: '',
//         // noOfPaxFive: '',
//         emissionOne: '',
//         emissionTwo: '',
//         emissionThree: '',
//         emissionFour: '',
//         emissionFive: '',

//         noOfBottlesOne: '',
//         noOfBottlesTwo: '',
//         noOfBottlesThree: '',
//         noOfBottlesFour: '',
//         noOfBottlesFive: '',
//         noOfBottlesSix: '',
//         noOfBottlesSeven: '',
//         noOfBottlesEight: '',
//         noOfBottlesNine: '',
//         emissionSix: '',
//         emissionSeven: '',
//         emissionEight: '',
//         emissionNine: '',
//         emissionTen: '',
//         emissionEleven: '',
//         emissionTwelve: '',
//         emissionThirteen: '',
//         emissionFourteen: '',

//         custBeveragesEmission: '',
//         custFoodMenuEmission: '',
//     };

//     const formik = useFormik({
//         initialValues,
//         onSubmit: async (values) => {

//             const emissionOne = Number((2 * values?.noOfPaxOne).toFixed(5))
//             const emissionTwo = Number((5.76 * values?.noOfPaxTwo).toFixed(5))
//             const emissionThree = Number((23.55 * values?.noOfPaxThree).toFixed(5))
//             const emissionFour = Number((0.6 * values?.noOfPaxFour).toFixed(5))
//             const emissionSix = Number((1.33 * values?.noOfBottlesOne).toFixed(5))
//             const emissionSeven = Number((3.04 * values?.noOfBottlesTwo).toFixed(5))
//             const emissionEight = Number((1.33 * values?.noOfBottlesThree).toFixed(5))
//             const emissionNine = Number((4.29 * values?.noOfBottlesFour).toFixed(5))
//             const emissionTen = Number((4.29 * values?.noOfBottlesFive).toFixed(5))
//             const emissionEleven = Number((2.73 * values?.noOfBottlesSix).toFixed(5))
//             const emissionTwelve = Number((4.29 * values?.noOfBottlesSeven).toFixed(5))
//             const emissionThirteen = Number((1.09 * values?.noOfBottlesEight).toFixed(5))
//             const emissionFourteen = Number((1.06 * values?.noOfBottlesNine).toFixed(5))

//             if (emissionOne > 0) formik.setFieldValue('emissionOne', emissionOne);    // Veg Plate Lunch/ Dinner
//             if (emissionTwo > 0) formik.setFieldValue('emissionTwo', emissionTwo);     // Non Veg plate Lunch/ Dinner
//             if (emissionThree > 0) formik.setFieldValue('emissionThree', emissionThree); // Veg Starter
//             if (emissionFour > 0) formik.setFieldValue('emissionFour', emissionFour);     // Non Veg starter
//             if (emissionSix > 0) formik.setFieldValue('emissionSix', emissionSix);        // Soft Drinks
//             if (emissionSeven > 0) formik.setFieldValue('emissionSeven', emissionSeven);       // Red Wine
//             if (emissionEight > 0) formik.setFieldValue('emissionEight', emissionEight);     // White Wine
//             if (emissionNine > 0) formik.setFieldValue('emissionNine', emissionNine);       // Whisky
//             if (emissionTen > 0) formik.setFieldValue('emissionTen', emissionTen);        // Gin
//             if (emissionEleven > 0) formik.setFieldValue('emissionEleven', emissionEleven);      // Rum
//             if (emissionTwelve > 0) formik.setFieldValue('emissionTwelve', emissionTwelve);    // Vodka
//             if (emissionThirteen > 0) formik.setFieldValue('emissionThirteen', emissionThirteen);  // Fruit Juices
//             if (emissionFourteen > 0) formik.setFieldValue('emissionFourteen', emissionFourteen);   // Beer

//             const data = [
//                 {
//                     type: 'Vegetarian',
//                     noOfPax: values?.noOfPaxOne,
//                     emission: Number((2 * values?.noOfPaxOne).toFixed(5)) || 0
//                 },
//                 {
//                     type: 'Non-Veg (Poultry/ Sea Food)',
//                     noOfPax: values?.noOfPaxTwo,
//                     emission: Number((5.76 * values?.noOfPaxTwo).toFixed(5)) || 0
//                 },
//                 {
//                     type: 'Non-Veg (Red Meat)',
//                     noOfPax: values?.noOfPaxThree,
//                     emission: Number((23.55 * values?.noOfPaxThree).toFixed(5)) || 0
//                 },
//                 {
//                     type: 'Tea/ Coffee + Cookies',
//                     noOfPax: values?.noOfPaxFour,
//                     emission: Number((0.6 * values?.noOfPaxFour).toFixed(5)) || 0
//                 },
//                 {
//                     type: 'Soft Drinks',
//                     noOfBottles: values?.noOfBottlesOne,
//                     emission: Number((1.33 * values?.noOfBottlesOne).toFixed(5)) || 0
//                 },
//                 {
//                     type: 'Red Wine',
//                     noOfBottles: values?.noOfBottlesTwo,
//                     emission: Number((3.04 * values?.noOfBottlesTwo).toFixed(5)) || 0
//                 },
//                 {
//                     type: 'White Wine',
//                     noOfBottles: values?.noOfBottlesThree,
//                     emission: Number((1.33 * values?.noOfBottlesThree).toFixed(5)) || 0
//                 },
//                 {
//                     type: 'Whisky',
//                     noOfBottles: values?.noOfBottlesFour,
//                     emission: Number((4.29 * values?.noOfBottlesFour).toFixed(5)) || 0
//                 },
//                 {
//                     type: 'Gin',
//                     noOfBottles: values?.noOfBottlesFive,
//                     emission: Number((4.29 * values?.noOfBottlesFive).toFixed(5)) || 0
//                 },
//                 {
//                     type: 'Rum',
//                     noOfBottles: values?.noOfBottlesSix,
//                     emission: Number((2.73 * values?.noOfBottlesSix).toFixed(5)) || 0
//                 },
//                 {
//                     type: 'Vodka',
//                     noOfBottles: values?.noOfBottlesSeven,
//                     emission: Number((4.29 * values?.noOfBottlesSeven).toFixed(5)) || 0
//                 },
//                 {
//                     type: 'Fruit Juices',
//                     noOfBottles: values?.noOfBottlesEight,
//                     emission: Number((1.09 * values?.noOfBottlesEight).toFixed(5)) || 0
//                 },
//                 {
//                     type: 'Beer',
//                     noOfBottles: values?.noOfBottlesNine,
//                     emission: Number((1.06 * values?.noOfBottlesNine).toFixed(5)) || 0
//                 },
//                 {
//                     type: 'Customised Food Menu',
//                     emission: values?.custFoodMenuEmission || 0
//                 },
//                 {
//                     type: 'Customised Beverages',
//                     emission: values?.custBeveragesEmission || 0
//                 },
//             ];

//             const tableData = [
//                 {
//                     subType: "Food",
//                     subTypeData: {
//                         th: ["Food", "No of Pax", "Emissions"],
//                         td: [
//                             {
//                                 fBType: "Vegetarian",
//                                 noOfPax: values?.noOfPaxOne,
//                                 emissions: emissionOne > 0 ? emissionOne : ''
//                             },
//                             {
//                                 fBType: "Non-Veg (Poultry/ Sea Food)",
//                                 noOfPax: values?.noOfPaxTwo,
//                                 emissions: emissionTwo > 0 ? emissionTwo : ''
//                             },
//                             {
//                                 fBType: "Non-Veg (Red Meat)",
//                                 noOfPax: values?.noOfPaxThree,
//                                 emissions: emissionThree > 0 ? emissionThree : ''
//                             },
//                             {
//                                 fBType: "Tea/ Coffee + Cookies",
//                                 noOfPax: values?.noOfPaxFour,
//                                 emissions: emissionFour > 0 ? emissionFour : ''
//                             },
//                             // {
//                             //     fBType: "Customised Food",
//                             //     noOfPax: '',
//                             //     emissions: values?.custFoodMenuEmission > 0 ? values?.custFoodMenuEmission : ''
//                             // }
//                         ]
//                     },
//                     // scope: 3
//                 },
//                 {
//                     subType: "Food",
//                     subTypeData: {
//                         th: ["", "Emissions"],
//                         td: [
//                             {
//                                 fBType: "Customised Food",
//                                 emissions: values?.custFoodMenuEmission > 0 ? values?.custFoodMenuEmission : ''
//                             },
//                         ]
//                     },
//                     // scope: 3
//                 },
//                 {
//                     subType: "Beverages",
//                     subTypeData: {
//                         th: ["Beverages (1000ml)", "No of Bottles", "Emissions"],
//                         td: [
//                             {
//                                 fBType: "Soft Drinks",
//                                 noOfBottles: values?.noOfBottlesOne,
//                                 emissions: emissionSix > 0 ? emissionSix : ''
//                             },
//                             {
//                                 fBType: "Red Wine",
//                                 noOfBottles: values?.noOfBottlesTwo,
//                                 emissions: emissionSeven > 0 ? emissionSeven : ''
//                             },
//                             {
//                                 fBType: "White Wine",
//                                 noOfBottles: values?.noOfBottlesThree,
//                                 emissions: emissionEight > 0 ? emissionEight : ''
//                             },
//                             {
//                                 fBType: "Whisky",
//                                 noOfBottles: values?.noOfBottlesFour,
//                                 emissions: emissionNine > 0 ? emissionNine : ''
//                             },
//                             {
//                                 fBType: "Gin",
//                                 noOfBottles: values?.noOfBottlesFive,
//                                 emissions: emissionTen > 0 ? emissionTen : ''
//                             },
//                             {
//                                 fBType: "Rum",
//                                 noOfBottles: values?.noOfBottlesSix,
//                                 emissions: emissionEleven > 0 ? emissionEleven : ''
//                             },
//                             {
//                                 fBType: "Vodka",
//                                 noOfBottles: values?.noOfBottlesSeven,
//                                 emissions: emissionTwelve > 0 ? emissionTwelve : ''
//                             },
//                             {
//                                 fBType: "Fruit Juices",
//                                 noOfBottles: values?.noOfBottlesEight,
//                                 emissions: emissionThirteen > 0 ? emissionThirteen : ''
//                             },
//                             {
//                                 fBType: "Beer",
//                                 noOfBottles: values?.noOfBottlesNine,
//                                 emissions: emissionFourteen > 0 ? emissionFourteen : ''
//                             },
//                             // {
//                             //     fBType: "Customised Beverages",
//                             //     noOfBottles: '',
//                             //     emissions: values?.custBeveragesEmission > 0 ? values?.custBeveragesEmission : ''
//                             // },
//                         ]
//                     },
//                     // scope: 3
//                 },
//                 {
//                     subType: "Beverages",
//                     subTypeData: {
//                         th: ["", "Emissions"],
//                         td: [
//                             {
//                                 fBType: "Customised Beverages",
//                                 emissions: values?.custBeveragesEmission > 0 ? values?.custBeveragesEmission : ''
//                             },
//                         ]
//                     },
//                     // scope: 3
//                 },
//             ];

//             dispatch(addFoodData({ data }))
//             dispatch(addResultTableData({ from: "f2fEvent", data: tableData, tabTitle: "Food" }));
//         },
//     });

//     const handeleDelete = () => {
//         dispatch(deleteFoodData());
//         dispatch(deleteResTabFBData());
//     };

//     const handleSaveToDb = async () => {
//         const eventData = {
//             ...eventsData,
//         };

//         if (resultTableData.eventDataId) {
//             eventData.eventDataId = resultTableData?.eventDataId;
//             const resultAction = await dispatch(updateResultTableDatasToDb(eventData));
//             if (updateResultTableDatasToDb.rejected.match(resultAction)) {
//                 console.error('Failed to update data:', resultAction.payload);
//             }
//         } else {
//             const resultAction = await dispatch(addResultTableDatasToDb(eventData));
//             if (addResultTableDatasToDb.rejected.match(resultAction)) {
//                 console.error('Failed to save data:', resultAction.payload);
//             }
//         }
//     };

//     useEffect(() => {
//         if (allData?.length > 0) {
//             formik.setFieldValue("noOfPaxOne", allData?.[0]?.noOfPax)
//             formik.setFieldValue("emissionOne", allData?.[0]?.emission)
//             formik.setFieldValue("noOfPaxTwo", allData?.[1]?.noOfPax)
//             formik.setFieldValue("emissionTwo", allData?.[1]?.emission)
//             formik.setFieldValue("noOfPaxThree", allData?.[2]?.noOfPax)
//             formik.setFieldValue("emissionThree", allData?.[2]?.emission)
//             formik.setFieldValue("noOfPaxFour", allData?.[3]?.noOfPax)
//             formik.setFieldValue("emissionFour", allData?.[3]?.emission)

//             formik.setFieldValue("noOfBottlesOne", allData?.[4]?.noOfBottles)
//             formik.setFieldValue("emissionSix", allData?.[4]?.emission)
//             formik.setFieldValue("noOfBottlesTwo", allData?.[5]?.noOfBottles)
//             formik.setFieldValue("emissionSeven", allData?.[5]?.emission)
//             formik.setFieldValue("noOfBottlesThree", allData?.[6]?.noOfBottles)
//             formik.setFieldValue("emissionEight", allData?.[6]?.emission)
//             formik.setFieldValue("noOfBottlesFour", allData?.[7]?.noOfBottles)
//             formik.setFieldValue("emissionNine", allData?.[7]?.emission)
//             formik.setFieldValue("noOfBottlesFive", allData?.[8]?.noOfBottles)
//             formik.setFieldValue("emissionTen", allData?.[8]?.emission)
//             formik.setFieldValue("noOfBottlesSix", allData?.[9]?.noOfBottles)
//             formik.setFieldValue("emissionEleven", allData?.[9]?.emission)
//             formik.setFieldValue("noOfBottlesSeven", allData?.[10]?.noOfBottles)
//             formik.setFieldValue("emissionTwelve", allData?.[10]?.emission)
//             formik.setFieldValue("noOfBottlesEight", allData?.[11]?.noOfBottles)
//             formik.setFieldValue("emissionThirteen", allData?.[11]?.emission)
//             formik.setFieldValue("noOfBottlesNine", allData?.[12]?.noOfBottles)
//             formik.setFieldValue("emissionFourteen", allData?.[12]?.emission)

//             formik.setFieldValue("custFoodMenuEmission", allData?.[13]?.emission)
//             formik.setFieldValue("custBeveragesEmission", allData?.[14]?.emission)
//         }
//     }, [value]);

//     const { values } = formik;

//     const handleChangeFoodWaste = (e, fieldName, firstValue, ef) => {
//         formik.handleChange(e);
//         formik.setFieldValue(fieldName, Number((ef * Number(firstValue)).toFixed(5)));
//         formik.handleSubmit();
//     };

//     const handleChangeBeveragesWaste = (e, fieldName, firstValue, ef) => {
//         formik.handleChange(e);
//         formik.setFieldValue(fieldName, Number((ef * Number(firstValue)).toFixed(5)));
//         formik.handleSubmit();
//     };

//     return (
//         <div>
//             <Container maxWidth>
//                 <Card className='p-3 custom-inner-bg textborder' style={{ padding: '20px' }}>
//                     <Box style={{ display: 'flex', justifyContent: 'center' }}>
//                         <Box mx={useMediaQuery(theme.breakpoints.up('lg')) && 15} display={'flex'} alignItems={'center'} flexDirection={'column'}>
//                             <IconDiv>
//                                 <img width={100} src={FoodImg} alt="Food" className='tabImgWhite' />
//                             </IconDiv>

//                             <Grid
//                                 container
//                                 rowSpacing={3}
//                                 columnSpacing={{ xs: 0, sm: 5, md: 4 }}
//                             >
//                                 <Grid item xs={12} sm={12} md={6}>
//                                     <Box>
//                                         <Typography variant='h4' className='text-center text-white mb-4'>Food</Typography>
//                                         <div className='table-responsive'>
//                                             <table className='table-custom-inpt-field'>
//                                                 <tr>
//                                                     <th className='ps-2' width="150">Food</th>
//                                                     <th className='ps-2'>No of Pax</th>
//                                                     <th className='ps-2'>Emissions</th>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Vegetarian</td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfPaxOne' value={formik?.values?.noOfPaxOne}
//                                                         onChange={(e) => { handleChangeFoodWaste(e, "emissionOne", e.target.value, 2); }}
//                                                         inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='emissionOne' value={formik?.values?.emissionOne} onChange={formik.handleChange} /></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Non-Veg (Poultry/ Sea Food)</td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfPaxTwo' value={formik?.values?.noOfPaxTwo}
//                                                         onChange={(e) => { handleChangeFoodWaste(e, "emissionTwo", e.target.value, 5.76); }}
//                                                         inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionTwo' value={formik?.values?.emissionTwo} onChange={formik.handleChange} disabled /></td>
//                                                 </tr>

//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Non-Veg (Red Meat)</td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfPaxThree' value={formik?.values?.noOfPaxThree}
//                                                         onChange={(e) => { handleChangeFoodWaste(e, "emissionThree", e.target.value, 23.55); }}
//                                                         inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionThree' value={formik?.values?.emissionThree} onChange={formik.handleChange} disabled /></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Tea/ Coffee + Cookies</td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfPaxFour' value={formik?.values?.noOfPaxFour}
//                                                         onChange={(e) => { handleChangeFoodWaste(e, "emissionFour", e.target.value, 0.6); }}
//                                                         inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionFour' value={formik?.values?.emissionFour} onChange={formik.handleChange} disabled /></td>
//                                                 </tr>

//                                             </table>
//                                         </div>
//                                     </Box>
//                                 </Grid>
//                                 <Grid item xs={12} sm={12} md={6}>
//                                     <Box>
//                                         <Typography variant='h4' className='text-center text-white mb-4' sx={{ opacity: 0 }}>temp</Typography>
//                                         <div className='table-responsive'>
//                                             <table className='table-custom-inpt-field'>
//                                                 <tr>
//                                                     <th />
//                                                     <th className='ps-2'>Emissions</th>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1' width="182">Customised Food</td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='custFoodMenuEmission' value={formik?.values?.custFoodMenuEmission}
//                                                         // onChange={formik.handleChange}
//                                                         onChange={(e) => { formik.setFieldValue("custFoodMenuEmission", e.target.value); formik.handleSubmit(); }}
//                                                         inputProps={{ style: { color: 'white' } }} /></td>
//                                                 </tr>
//                                             </table>
//                                         </div>
//                                     </Box>
//                                 </Grid>
//                                 <Grid item xs={12} sm={12} md={6}>
//                                     <Box>
//                                         <Typography variant='h4' className='text-center text-white mb-4'>Beverages</Typography>
//                                         <div className='table-responsive'>
//                                             <table className='table-custom-inpt-field'>
//                                                 <tr>
//                                                     <th className='ps-2'>Beverages (1000ml)</th>
//                                                     <th className='ps-2'>No of Bottles </th>
//                                                     <th className='ps-2'>Emissions</th>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Soft Drinks</td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfBottlesOne' value={formik?.values?.noOfBottlesOne}
//                                                         onChange={(e) => { handleChangeBeveragesWaste(e, "emissionSix", e.target.value, 1.33); }}
//                                                         inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='emissionSix' value={formik?.values?.emissionSix} onChange={formik.handleChange} /></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Red Wine</td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfBottlesTwo' value={formik?.values?.noOfBottlesTwo}
//                                                         onChange={(e) => { handleChangeBeveragesWaste(e, "emissionSeven", e.target.value, 3.04); }}
//                                                         inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionSeven' value={formik?.values?.emissionSeven} onChange={formik.handleChange} disabled /></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>White Wine</td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfBottlesThree' value={formik?.values?.noOfBottlesThree}
//                                                         onChange={(e) => { handleChangeBeveragesWaste(e, "emissionEight", e.target.value, 1.33); }}
//                                                         inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionEight' value={formik?.values?.emissionEight} onChange={formik.handleChange} disabled /></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Whisky</td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfBottlesFour' value={formik?.values?.noOfBottlesFour}
//                                                         onChange={(e) => { handleChangeBeveragesWaste(e, "emissionNine", e.target.value, 4.29); }}
//                                                         inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='emissionNine' value={formik?.values?.emissionNine} onChange={formik.handleChange} /></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Gin</td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfBottlesFive' value={formik?.values?.noOfBottlesFive}
//                                                         onChange={(e) => { handleChangeBeveragesWaste(e, "emissionTen", e.target.value, 4.29); }}
//                                                         inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionTen' value={formik?.values?.emissionTen} onChange={formik.handleChange} disabled /></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Rum</td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfBottlesSix' value={formik?.values?.noOfBottlesSix}
//                                                         onChange={(e) => { handleChangeBeveragesWaste(e, "emissionEleven", e.target.value, 2.73); }}
//                                                         inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionEleven' value={formik?.values?.emissionEleven} onChange={formik.handleChange} disabled /></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Vodka</td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfBottlesSeven' value={formik?.values?.noOfBottlesSeven}
//                                                         onChange={(e) => { handleChangeBeveragesWaste(e, "emissionTwelve", e.target.value, 4.29); }}
//                                                         inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionTwelve' value={formik?.values?.emissionTwelve} onChange={formik.handleChange} disabled /></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Fruit Juices</td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfBottlesEight' value={formik?.values?.noOfBottlesEight}
//                                                         onChange={(e) => { handleChangeBeveragesWaste(e, "emissionThirteen", e.target.value, 1.09); }}
//                                                         inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionThirteen' value={formik?.values?.emissionThirteen} onChange={formik.handleChange} disabled /></td>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Beer</td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfBottlesNine' value={formik?.values?.noOfBottlesNine}
//                                                         onChange={(e) => { handleChangeBeveragesWaste(e, "emissionFourteen", e.target.value, 1.06); }}
//                                                         inputProps={{ style: { color: 'white' } }} />
//                                                     </td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionFourteen' value={formik?.values?.emissionFourteen} onChange={formik.handleChange} disabled /></td>
//                                                 </tr>
//                                             </table>
//                                         </div>
//                                     </Box>
//                                 </Grid>
//                                 <Grid item xs={12} sm={12} md={6}>
//                                     <Box>
//                                         <Typography variant='h4' className='text-center text-white mb-4' sx={{ opacity: 0 }}>temp</Typography>
//                                         <div className='table-responsive'>
//                                             <table className='table-custom-inpt-field'>
//                                                 <tr>
//                                                     <th />
//                                                     <th className='ps-2'>Emissions</th>
//                                                 </tr>
//                                                 <tr>
//                                                     <td className='ps-2 py-1'>Customised Beverages</td>
//                                                     <td className='ps-2 py-1'><TextField size='small' type="number" name='custBeveragesEmission' value={formik?.values?.custBeveragesEmission}
//                                                         // onChange={formik.handleChange}
//                                                         onChange={(e) => { formik.setFieldValue("custBeveragesEmission", e.target.value); formik.handleSubmit(); }}
//                                                         inputProps={{ style: { color: 'white' } }} /></td>
//                                                 </tr>
//                                             </table>
//                                         </div>
//                                     </Box>
//                                 </Grid>
//                                 <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>
//                                     <Stack columnGap={2} rowGap={2} className='flex-xl-row flex-md-row flex-sm-column'>
//                                         {/* <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button> */}
//                                         <Button variant='contained' startIcon={<FaAngleDoubleLeft />} onClick={() => { handleSaveToDb(); setValue(value - 1); }} className='custom-btn'>Save and Previous Page</Button>
//                                         <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { handleSaveToDb(); setValue(value + 1); }} className='custom-btn'> Save and Next Page</Button>
//                                         <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { handleSaveToDb(); setValue(9); }} className='custom-btn'>Go To Result</Button>
//                                         {/* <Button variant='contained' onClick={() => { handleSaveToDb(); }} className='custom-btn'>SaveToDB</Button> */}
//                                         <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete() }} color='error'>Clear</Button>
//                                     </Stack>
//                                 </Grid>
//                                 <Grid item xs={12} sm={12} md={12} marginTop={3}>
//                                     <Typography color='white'>{`Total Food Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e</Typography>
//                                 </Grid>
//                             </Grid>
//                         </Box>
//                     </Box>
//                 </Card>
//             </Container>
//         </div>
//     )
// }

// export default Food
