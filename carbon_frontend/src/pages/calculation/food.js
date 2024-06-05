import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addFoodData, deleteFoodData } from '../../redux/slice/totalFoodSlice';

const Food = (props) => {
    const { setValue, value } = props;
    const dispatch = useDispatch()
    const allData = useSelector((state) => state?.totalFoodDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalFoodDetails?.totalEmission);

    // -----------   initialValues
    const initialValues = {
        noOfPaxOne: '',
        noOfPaxTwo: '',
        noOfPaxThree: '',
        noOfPaxFour: '',
        noOfPaxFive: '',
        emissionOne: 0,
        emissionTwo: 0,
        emissionThree: 0,
        emissionFour: 0,
        emissionFive: 0,
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            formik.setFieldValue('emissionOne', (1924.06 * values?.noOfPaxOne));    // Veg Plate Lunch/ Dinner
            formik.setFieldValue('emissionTwo', (3825.5 * values?.noOfPaxTwo));     // Non Veg plate Lunch/ Dinner
            formik.setFieldValue('emissionThree', (1984.1 * values?.noOfPaxThree)); // Veg Starter
            formik.setFieldValue('emissionFour', (2638 * values?.noOfPaxFour));     // Non Veg starter
            formik.setFieldValue('emissionFive', (642.2 * values?.noOfPaxFive));    // High Tea

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
        }
    }, [value])

    return (
        <div>
            <Container maxWidth>
                <Card className='p-4' style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Box >
                        <div className='table-responsive'>
                            <table className=''>
                                <tr>
                                    <th />
                                    <th className='ps-2'>No of Pax</th>
                                    <th className='ps-2'>Emission (kgCO2e)</th>
                                </tr>
                                <tr>
                                    <td className='ps-2 py-1'>Veg Plate Lunch/ Dinner</td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfPaxOne' value={formik?.values?.noOfPaxOne} onChange={formik.handleChange} /></td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='emissionOne' value={formik?.values?.emissionOne} onChange={formik.handleChange} /></td>
                                </tr>
                                <tr>
                                    <td className='ps-2 py-1'>Non Veg plate Lunch/ Dinner</td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfPaxTwo' value={formik?.values?.noOfPaxTwo} onChange={formik.handleChange} /></td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionTwo' value={formik?.values?.emissionTwo} onChange={formik.handleChange} disabled /></td>
                                </tr>
                                <tr>
                                    <td className='ps-2 py-1'>Veg Starter</td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfPaxThree' value={formik?.values?.noOfPaxThree} onChange={formik.handleChange} /></td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionThree' value={formik?.values?.emissionThree} onChange={formik.handleChange} disabled /></td>
                                </tr>
                                <tr>
                                    <td className='ps-2 py-1'>Non Veg starter</td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfPaxFour' value={formik?.values?.noOfPaxFour} onChange={formik.handleChange} /></td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionFour' value={formik?.values?.emissionFour} onChange={formik.handleChange} disabled /></td>
                                </tr>
                                <tr>
                                    <td className='ps-2 py-1'>High Tea</td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='noOfPaxFive' value={formik?.values?.noOfPaxFive} onChange={formik.handleChange} /></td>
                                    <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionFive' value={formik?.values?.emissionFive} onChange={formik.handleChange} disabled /></td>
                                </tr>
                            </table>
                        </div>
                        <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"end"} mt={3}>
                            <Stack direction={"row"} spacing={2}>
                                <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button>
                                <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete() }} color='error'>Clear</Button>
                                <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => setValue(9)} className='custom-btn'>Go To Result</Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} marginTop={3} marginLeft={1}>
                            <Typography variant='h6' className='mt-3'>Lunch, Dinner, High Tea for one day per person = {totalEmission}</Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} marginLeft={3} mt={3}>
                            <ul>
                                {
                                    allData?.length > 0 && allData?.map((item) => (

                                        <li>
                                            {`${item?.type} : ${item?.emission} tons of kgCO2e`}
                                        </li>
                                    ))
                                }
                            </ul>
                        </Grid>
                    </Box>
                </Card>
            </Container>
        </div>
    )
}

export default Food
