import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addFoodData, deleteFoodData } from '../../redux/slice/totalFoodSlice';
import { IconDiv } from '../../components/IconDiv';
import FoodImg from '../../assets/Food & Beverage.png';

const Food = (props) => {
    const { setValue, value } = props;
    const dispatch = useDispatch()
    const theme = useTheme();
    const allData = useSelector((state) => state?.totalFoodDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalFoodDetails?.totalEmission);

    // -----------   initialValues
    const initialValues = {
        noOfPaxOne: 0,
        noOfPaxTwo: 0,
        noOfPaxThree: 0,
        noOfPaxFour: 0,
        noOfPaxFive: 0,
        emissionOne: 0,
        emissionTwo: 0,
        emissionThree: 0,
        emissionFour: 0,
        emissionFive: 0,

        noOfBottlesOne: 0,
        noOfBottlesTwo: 0,
        noOfBottlesThree: 0,
        noOfBottlesFour: 0,
        noOfBottlesFive: 0,
        noOfBottlesSix: 0,
        noOfBottlesSeven: 0,
        noOfBottlesEight: 0,
        noOfBottlesNine: 0,
        emissionSix: 0,
        emissionSeven: 0,
        emissionEight: 0,
        emissionNine: 0,
        emissionTen: 0,
        emissionEleven: 0,
        emissionTwelve: 0,
        emissionThirteen: 0,
        emissionFourteen: 0,

        custBeveragesEmission: 0,
        custFoodMenuEmission: 0,
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            formik.setFieldValue('emissionOne', Number((1924.06 * values?.noOfPaxOne).toFixed(2)));    // Veg Plate Lunch/ Dinner
            formik.setFieldValue('emissionTwo', Number((3825.5 * values?.noOfPaxTwo).toFixed(2)));     // Non Veg plate Lunch/ Dinner
            formik.setFieldValue('emissionThree', Number((1984.1 * values?.noOfPaxThree).toFixed(2))); // Veg Starter
            formik.setFieldValue('emissionFour', Number((2638 * values?.noOfPaxFour).toFixed(2)));     // Non Veg starter
            formik.setFieldValue('emissionFive', Number((642.2 * values?.noOfPaxFive).toFixed(2)));    // High Tea

            formik.setFieldValue('emissionSix', Number((1.33 * values?.noOfBottlesOne).toFixed(2)));        // Soft Drinks
            formik.setFieldValue('emissionSeven', Number((3.04 * values?.noOfBottlesTwo).toFixed(2)));       // Red Wine
            formik.setFieldValue('emissionEight', Number((1.33 * values?.noOfBottlesThree).toFixed(2)));     // White Wine
            formik.setFieldValue('emissionNine', Number((4.29 * values?.noOfBottlesFour).toFixed(2)));       // Whisky
            formik.setFieldValue('emissionTen', Number((4.29 * values?.noOfBottlesFive).toFixed(2)));        // Gin
            formik.setFieldValue('emissionEleven', Number((2.73 * values?.noOfBottlesSix).toFixed(2)));      // Rum
            formik.setFieldValue('emissionTwelve', Number((4.29 * values?.noOfBottlesSeven).toFixed(2)));    // Vodka
            formik.setFieldValue('emissionThirteen', Number((1.09 * values?.noOfBottlesEight).toFixed(2)));  // Fruit Juices
            formik.setFieldValue('emissionFourteen', Number((1.06 * values?.noOfBottlesNine).toFixed(2)));   // Beer

            const data = [
                {
                    type: 'Veg Plate Lunch/ Dinner',
                    noOfPax: values?.noOfPaxOne,
                    emission: Number((1924.06 * values?.noOfPaxOne).toFixed(2)) || 0
                },
                {
                    type: 'Non Veg plate Lunch/ Dinner',
                    noOfPax: values?.noOfPaxTwo,
                    emission: Number((3825.5 * values?.noOfPaxTwo).toFixed(2)) || 0
                },
                {
                    type: 'Veg starter',
                    noOfPax: values?.noOfPaxThree,
                    emission: Number((1984.1 * values?.noOfPaxThree).toFixed(2)) || 0
                },
                {
                    type: 'Non Veg starter',
                    noOfPax: values?.noOfPaxFour,
                    emission: Number((2638 * values?.noOfPaxFour).toFixed(2)) || 0
                },
                {
                    type: 'High Tea',
                    noOfPax: values?.noOfPaxFive,
                    emission: Number((642.2 * values?.noOfPaxFive).toFixed(2)) || 0
                },
                {
                    type: 'Soft Drinks',
                    noOfBottles: values?.noOfBottlesOne,
                    emission: Number((1924.06 * values?.noOfBottlesOne).toFixed(2)) || 0
                },
                {
                    type: 'Red Wine',
                    noOfBottles: values?.noOfBottlesTwo,
                    emission: Number((3825.5 * values?.noOfBottlesTwo).toFixed(2)) || 0
                },
                {
                    type: 'White Wine',
                    noOfBottles: values?.noOfBottlesThree,
                    emission: Number((1984.1 * values?.noOfBottlesThree).toFixed(2)) || 0
                },
                {
                    type: 'Whisky',
                    noOfBottles: values?.noOfBottlesFour,
                    emission: Number((2638 * values?.noOfBottlesFour).toFixed(2)) || 0
                },
                {
                    type: 'Gin',
                    noOfBottles: values?.noOfBottlesFive,
                    emission: Number((642.2 * values?.noOfBottlesFive).toFixed(2)) || 0
                },
                {
                    type: 'Rum',
                    noOfBottles: values?.noOfBottlesSix,
                    emission: Number((642.2 * values?.noOfBottlesSix).toFixed(2)) || 0
                },
                {
                    type: 'Vodka',
                    noOfBottles: values?.noOfBottlesSeven,
                    emission: Number((642.2 * values?.noOfBottlesSeven).toFixed(2)) || 0
                },
                {
                    type: 'Fruit Juices',
                    noOfBottles: values?.noOfBottlesEight,
                    emission: Number((642.2 * values?.noOfBottlesEight).toFixed(2)) || 0
                },
                {
                    type: 'Beer',
                    noOfBottles: values?.noOfBottlesNine,
                    emission: Number((642.2 * values?.noOfBottlesNine).toFixed(2)) || 0
                },
                {
                    type: 'Customised Food Menu',
                    dynEmission: values?.custFoodMenuEmission
                },
                {
                    type: 'Customised Beverages',
                    dynEmission: values?.custBeveragesEmission
                },
            ];
            dispatch(addFoodData({ data }))
        },
    });

    const handeleDelete = () => {
        dispatch(deleteFoodData());
    };

    useEffect(() => {
        if (allData?.length > 0) {
            formik.setFieldValue("noOfPaxOne", allData[0]?.noOfPax)
            formik.setFieldValue("emissionOne", allData[0]?.emission)
            formik.setFieldValue("noOfPaxTwo", allData[1]?.noOfPax)
            formik.setFieldValue("emissionTwo", allData[1]?.emission)
            formik.setFieldValue("noOfPaxThree", allData[2]?.noOfPax)
            formik.setFieldValue("emissionThree", allData[2]?.emission)
            formik.setFieldValue("noOfPaxFour", allData[3]?.noOfPax)
            formik.setFieldValue("emissionFour", allData[3]?.emission)
            formik.setFieldValue("noOfPaxFive", allData[4]?.noOfPax)
            formik.setFieldValue("emissionFive", allData[4]?.emission)

            formik.setFieldValue("noOfBottlesOne", allData[5]?.noOfBottles)
            formik.setFieldValue("emissionSix", allData[5]?.emission)
            formik.setFieldValue("noOfBottlesTwo", allData[6]?.noOfBottles)
            formik.setFieldValue("emissionSeven", allData[6]?.emission)
            formik.setFieldValue("noOfBottlesThree", allData[7]?.noOfBottles)
            formik.setFieldValue("emissionEight", allData[7]?.emission)
            formik.setFieldValue("noOfBottlesFour", allData[8]?.noOfBottles)
            formik.setFieldValue("emissionNine", allData[8]?.emission)
            formik.setFieldValue("noOfBottlesFive", allData[9]?.noOfBottles)
            formik.setFieldValue("emissionTen", allData[9]?.emission)
            formik.setFieldValue("noOfBottlesSix", allData[10]?.noOfBottles)
            formik.setFieldValue("emissionEleven", allData[10]?.emission)
            formik.setFieldValue("noOfBottlesSeven", allData[11]?.noOfBottles)
            formik.setFieldValue("emissionTwelve", allData[11]?.emission)
            formik.setFieldValue("noOfBottlesEight", allData[12]?.noOfBottles)
            formik.setFieldValue("emissionThirteen", allData[12]?.emission)
            formik.setFieldValue("noOfBottlesNine", allData[13]?.noOfBottles)
            formik.setFieldValue("emissionFourteen", allData[13]?.emission)

            formik.setFieldValue("custFoodMenuEmission", allData[14]?.dynEmission)
            formik.setFieldValue("custBeveragesEmission", allData[15]?.dynEmission)
        }
    }, [value]);

    return (
        <div>
            <Container maxWidth>
                <Card className='p-3 custom-inner-bg' style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Box mx={useMediaQuery(theme.breakpoints.up('lg')) && 15} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <IconDiv>
                            <img width={100} src={FoodImg} alt="Food" />
                        </IconDiv>

                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                        >
                            <Grid item xs={12} sm={6} md={6}>
                                <Box>
                                    <Typography variant='h4' className='text-center text-white mb-4'>Food Waste</Typography>
                                    <div className='table-responsive'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2'>Food</th>
                                                <th className='ps-2'>No of Pax</th>
                                                <th className='ps-2'>Emission (kgCO2e)</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Vegetarian (Lunch/ Dinner)</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfPaxOne' value={formik?.values?.noOfPaxOne} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='emissionOne' value={formik?.values?.emissionOne} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Non-Vegetarian (Lunch/ Dinner)</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfPaxTwo' value={formik?.values?.noOfPaxTwo} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionTwo' value={formik?.values?.emissionTwo} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Vegetarian Starter</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfPaxThree' value={formik?.values?.noOfPaxThree} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionThree' value={formik?.values?.emissionThree} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Non-Vegetarian Starter</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfPaxFour' value={formik?.values?.noOfPaxFour} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionFour' value={formik?.values?.emissionFour} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>High Tea</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfPaxFive' value={formik?.values?.noOfPaxFive} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionFive' value={formik?.values?.emissionFive} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Box>
                                    <Typography variant='h4' className='text-center text-white mb-4' sx={{ opacity: 0 }}>temp</Typography>
                                    <div className='table-responsive'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2'>Menu</th>
                                                <th className='ps-2'>Emission (kgCO2e)</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Customised Food Menu</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='custFoodMenuEmission' value={formik?.values?.custFoodMenuEmission} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Box>
                                    <Typography variant='h4' className='text-center text-white mb-4'>Breverage Waste</Typography>
                                    <div className='table-responsive'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2'>Beverages (1000ml)</th>
                                                <th className='ps-2'>No of Bottles </th>
                                                <th className='ps-2'>Emission (kgCO2e)</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Soft Drinks</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfBottlesOne' value={formik?.values?.noOfBottlesOne} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='emissionSix' value={formik?.values?.emissionSix} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Red Wine</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfBottlesTwo' value={formik?.values?.noOfBottlesTwo} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionSeven' value={formik?.values?.emissionSeven} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>White Wine</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfBottlesThree' value={formik?.values?.noOfBottlesThree} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionEight' value={formik?.values?.emissionEight} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Whisky</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfBottlesFour' value={formik?.values?.noOfBottlesFour} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='emissionNine' value={formik?.values?.emissionNine} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Gin</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfBottlesFive' value={formik?.values?.noOfBottlesFive} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionTen' value={formik?.values?.emissionTen} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Rum</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfBottlesSix' value={formik?.values?.noOfBottlesSix} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionEleven' value={formik?.values?.emissionEleven} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Vodka</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfBottlesSeven' value={formik?.values?.noOfBottlesSeven} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionTwelve' value={formik?.values?.emissionTwelve} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Fruit Juices</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfBottlesEight' value={formik?.values?.noOfBottlesEight} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionThirteen' value={formik?.values?.emissionThirteen} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Beer</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfBottlesNine' value={formik?.values?.noOfBottlesNine} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionFourteen' value={formik?.values?.emissionFourteen} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Box>
                                    <Typography variant='h4' className='text-center text-white mb-4' sx={{ opacity: 0 }}>temp</Typography>
                                    <div className='table-responsive'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2'>Menu</th>
                                                <th className='ps-2'>Emission (kgCO2e)</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Customised Beverages</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='custBeveragesEmission' value={formik?.values?.custBeveragesEmission} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>
                                <Stack direction={"row"} spacing={2}>
                                    <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button>
                                    <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete(); }} color='error'>Clear</Button>
                                    <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => setValue(9)} className='custom-btn'>Go To Result</Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginTop={3}>
                                <Typography color='white'>{`Total Food and BeveragePs Footprint = ${totalEmission}  tons of kgCO2e`}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Container>
        </div>
    )
}

export default Food
