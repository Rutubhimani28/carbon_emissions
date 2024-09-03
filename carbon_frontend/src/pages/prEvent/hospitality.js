import { Box, Button, Card, Container, FormHelperText, FormLabel, Grid, MenuItem, Select, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addHospitalityData, deleteHospitalityData, scopeChange } from '../../redux/slice/totalHospitalitySlice';
import { addResultTableData, deleteResTabHospitalityData } from '../../redux/slice/resultTableDataSlice';
import hospitalityImg from '../../assets/hospitality.png';
import { IconDiv } from '../../components/IconDiv';

const Hospitality = (props) => {

    const { setValue, value } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const allData = useSelector((state) => state?.totalHospitalityDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalHospitalityDetails?.totalEmission);

    // -----------   initialValues
    const initialValues = {
        noOfPaxOne: '',
        noOfPaxTwo: '',
        noOfPaxThree: '',
        noOfPaxFour: '',
        emissionOne: '',
        emissionTwo: '',
        emissionThree: '',
        emissionFour: '',

        foodWasteNonMeatKg: '',
        foodWasteNonMeatEmission: '',
        foodWasteMeatKg: '',
        foodWasteMeatEmission: '',
        municipalSolidWasteKg: '',
        municipalSolidWasteEmission: '',

        bottleOne: '',
        bottleOneEmission: '',
        bottleTwo: '',
        bottleTwoEmission: '',
        bottleThree: '',
        bottleThreeEmission: '',
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {

            const emissionOne = Number((2 * values?.noOfPaxOne).toFixed(2));
            const emissionTwo = Number((5.76 * values?.noOfPaxTwo).toFixed(2));
            const emissionThree = Number((23.55 * values?.noOfPaxThree).toFixed(2));
            const emissionFour = Number((0.6 * values?.noOfPaxFour).toFixed(2));

            const foodWasteNonMeatEmission = Number(0.67 * Number(values?.foodWasteNonMeatKg)).toFixed(2);
            const foodWasteMeatEmission = Number(0.69 * Number(values?.foodWasteMeatKg)).toFixed(2);
            const municipalSolidWasteEmission = Number(0.902 * Number(values?.municipalSolidWasteKg)).toFixed(2);
            const bottleOneEmission = Number(Number(values?.bottleOne) * 6.42 * 0.004032).toFixed(2);
            const bottleTwoEmission = Number(Number(values?.bottleTwo) * 13 * 0.004032).toFixed(2);
            const bottleThreeEmission = Number(Number(values?.bottleThree) * 21.5 * 0.004032).toFixed(2);

            if (emissionOne > 0) formik.setFieldValue('emissionOne', emissionOne);
            if (emissionTwo > 0) formik.setFieldValue('emissionTwo', emissionTwo);
            if (emissionThree > 0) formik.setFieldValue('emissionThree', emissionThree);
            if (emissionFour > 0) formik.setFieldValue('emissionFour', emissionFour);

            if (foodWasteNonMeatEmission > 0) formik.setFieldValue('foodWasteNonMeatEmission', foodWasteNonMeatEmission);
            if (foodWasteMeatEmission > 0) formik.setFieldValue('foodWasteMeatEmission', foodWasteMeatEmission);
            if (municipalSolidWasteEmission > 0) formik.setFieldValue('municipalSolidWasteEmission', municipalSolidWasteEmission);
            if (bottleOneEmission > 0) formik.setFieldValue('bottleOneEmission', bottleOneEmission);
            if (bottleTwoEmission > 0) formik.setFieldValue('bottleTwoEmission', bottleTwoEmission);
            if (bottleThreeEmission > 0) formik.setFieldValue('bottleThreeEmission', bottleThreeEmission);

            const data = [
                {
                    type: 'Vegetarian',
                    noOfPax: values?.noOfPaxOne,
                    emission: Number((2 * values?.noOfPaxOne).toFixed(2)) || 0
                },
                {
                    type: 'Non-Veg (Poultry/ Sea Food)',
                    noOfPax: values?.noOfPaxTwo,
                    emission: Number((5.76 * values?.noOfPaxTwo).toFixed(2)) || 0
                },
                {
                    type: 'Non-Veg (Red Meat)',
                    noOfPax: values?.noOfPaxThree,
                    emission: Number((23.55 * values?.noOfPaxThree).toFixed(2)) || 0
                },
                {
                    type: 'Tea/ Coffee + Cookies',
                    noOfPax: values?.noOfPaxFour,
                    emission: Number((0.6 * values?.noOfPaxFour).toFixed(2)) || 0
                },

                {
                    type: 'FoodWasteNonMeat',
                    kgs: values?.foodWasteNonMeatKg,
                    emission: foodWasteNonMeatEmission > 0 ? foodWasteNonMeatEmission : '',
                },
                {
                    type: 'FoodWasteMeat',
                    kgs: values?.foodWasteMeatKg,
                    emission: foodWasteMeatEmission > 0 ? foodWasteMeatEmission : '',
                },
                {
                    type: 'MunicipalSolidWaste',
                    kgs: values?.municipalSolidWasteKg,
                    emission: municipalSolidWasteEmission > 0 ? municipalSolidWasteEmission : '',
                },

                {
                    type: '250ml',
                    bottle: values?.bottleOne,
                    emission: bottleOneEmission > 0 ? bottleOneEmission : '',
                },
                {
                    type: '500ml',
                    bottle: values?.bottleTwo,
                    emission: bottleTwoEmission > 0 ? bottleTwoEmission : '',
                },
                {
                    type: '1000ml',
                    bottle: values?.bottleThree,
                    emission: bottleThreeEmission > 0 ? bottleThreeEmission : '',
                }
            ];

            const tableData = [
                {
                    subType: "",
                    subTypeData: {
                        th: ["Lunch", "No of Pax", "Emissions"],
                        td: [
                            {
                                hstType: "Vegetarian",
                                noOfPax: values?.noOfPaxOne,
                                emissions: emissionOne > 0 ? emissionOne : ''
                            },
                            {
                                hstType: "Non-Veg (Poultry/ Sea Food)",
                                noOfPax: values?.noOfPaxTwo,
                                emissions: emissionTwo > 0 ? emissionTwo : ''
                            },
                            {
                                hstType: "Non-Veg (Red Meat)",
                                noOfPax: values?.noOfPaxThree,
                                emissions: emissionThree > 0 ? emissionThree : ''
                            },
                            {
                                hstType: "Tea/ Coffee + Cookies",
                                noOfPax: values?.noOfPaxFour,
                                emissions: emissionFour > 0 ? emissionFour : ''
                            }
                        ]
                    },
                    scope: 3
                },
                {
                    subType: "",
                    subTypeData: {
                        th: ["Food Wate", "kgs", "Emissions"],
                        td: [
                            {
                                hstType: "Food Waste (non-meat)",
                                kgs: values?.noOfPaxOne,
                                emissions: foodWasteNonMeatEmission > 0 ? foodWasteNonMeatEmission : ''
                            },
                            {
                                hstType: "Food Waste (meat)",
                                kgs: values?.noOfPaxTwo,
                                emissions: foodWasteMeatEmission > 0 ? foodWasteMeatEmission : ''
                            },
                            {
                                hstType: "Municipal Solid Waste",
                                kgs: values?.noOfPaxFour,
                                emissions: municipalSolidWasteEmission > 0 ? municipalSolidWasteEmission : ''
                            }
                        ]
                    },
                    scope: 3
                },
                {
                    subType: "",
                    subTypeData: {
                        th: ["Plastic Waste", "No. of PET bottles", "Emissions"],
                        td: [
                            {
                                hstType: "250ml",
                                bottle: values?.bottleOne,
                                emissions: bottleOneEmission > 0 ? bottleOneEmission : ''
                            },
                            {
                                hstType: "500ml",
                                bottle: values?.bottleTwo,
                                emissions: bottleTwoEmission > 0 ? bottleTwoEmission : ''
                            },
                            {
                                hstType: "1000ml",
                                bottle: values?.bottleThree,
                                emissions: bottleThreeEmission > 0 ? bottleThreeEmission : ''
                            }
                        ]
                    },
                    scope: 3
                }
            ];

            dispatch(addHospitalityData({ data }));
            dispatch(addResultTableData({ data: tableData, tabTitle: "Hospitality" }));
        },
    });

    const handeleDelete = () => {
        dispatch(deleteHospitalityData());
        dispatch(deleteResTabHospitalityData());
    };

    useEffect(() => {
        if (allData?.length > 0) {
            formik.setFieldValue("noOfPaxOne", allData[0]?.noOfPax);
            formik.setFieldValue("emissionOne", allData[0]?.emission);
            formik.setFieldValue("noOfPaxTwo", allData[1]?.noOfPax);
            formik.setFieldValue("emissionTwo", allData[1]?.emission);
            formik.setFieldValue("noOfPaxThree", allData[2]?.noOfPax);
            formik.setFieldValue("emissionThree", allData[2]?.emission);
            formik.setFieldValue("noOfPaxFour", allData[3]?.noOfPax);
            formik.setFieldValue("emissionFour", allData[3]?.emission);

            formik.setFieldValue("foodWasteNonMeatKg", allData[4]?.kgs);
            formik.setFieldValue("foodWasteNonMeatEmission", allData[4]?.emission);
            formik.setFieldValue("foodWasteMeatKg", allData[5]?.kgs);
            formik.setFieldValue("foodWasteMeatEmission", allData[5]?.emission);
            formik.setFieldValue("municipalSolidWasteKg", allData[6]?.kgs);
            formik.setFieldValue("municipalSolidWasteEmission", allData[6]?.emission);

            formik.setFieldValue("bottleOne", allData[7]?.bottle);
            formik.setFieldValue("bottleOneEmission", allData[7]?.emission);
            formik.setFieldValue("bottleTwo", allData[8]?.bottle);
            formik.setFieldValue("bottleTwoEmission", allData[8]?.emission);
            formik.setFieldValue("bottleThree", allData[9]?.bottle);
            formik.setFieldValue("bottleThreeEmission", allData[9]?.emission);
        }
    }, [value]);

    const { values } = formik;

    const handleChangeFoodWaste = (e, fieldName, firstValue, ef) => {
        formik.handleChange(e);
        formik.setFieldValue(fieldName, Number((ef * Number(firstValue)).toFixed(2)));
        formik.handleSubmit();
    };

    return (
        <div>
            <Container maxWidth>
                <Card className='p-4 custom-inner-bg textborder' style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Box mx={useMediaQuery(theme.breakpoints.up('lg')) && 15} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <IconDiv>
                            <img src={hospitalityImg} alt="Local Transportation" width={100} className='tabImgWhite' />
                        </IconDiv>
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                        >
                            <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                                <Box>
                                    <div className='table-responsive my-3'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2' width={220}>Lunch</th>
                                                <th className='ps-3'>No of Pax</th>
                                                <th className='ps-2'>Emissions</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2'>Vegetarian</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name='noOfPaxOne' value={formik?.values?.noOfPaxOne}
                                                        onChange={(e) => { handleChangeFoodWaste(e, "emissionOne", e.target.value, 2); }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size="small" type="number" disabled name="emissionOne" value={formik?.values?.emissionOne} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Non-Veg (Poultry/ Sea Food)</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name='noOfPaxTwo' value={formik?.values?.noOfPaxTwo}
                                                        onChange={(e) => { handleChangeFoodWaste(e, "emissionTwo", e.target.value, 5.76); }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionTwo' disabled value={values?.emissionTwo} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Non-Veg (Red Meat)</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name='noOfPaxThree' value={formik?.values?.noOfPaxThree}
                                                        onChange={(e) => { handleChangeFoodWaste(e, "emissionThree", e.target.value, 23.55); }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionThree' disabled value={values?.emissionThree} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Tea/ Coffee + Cookies</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name='noOfPaxFour' value={formik?.values?.noOfPaxFour}
                                                        onChange={(e) => { handleChangeFoodWaste(e, "emissionFour", e.target.value, 0.6); }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='emissionFour' disabled value={values?.emissionFour} onChange={formik.handleChange} /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                                <Box>
                                    <div className='table-responsive my-3'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2' width={220}>Food Waste</th>
                                                <th className='ps-2'>Kgs</th>
                                                <th className='ps-2'>Emissions</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Food Waste (non-meat)</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name="foodWasteNonMeatKg"
                                                        value={formik?.values?.foodWasteNonMeatKg}
                                                        onChange={(e) => {
                                                            formik.handleChange(e);
                                                            formik.setFieldValue('foodWasteNonMeatEmission', Number(0.67 * Number(e?.target?.value)).toFixed(2));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='foodWasteNonMeatEmission' disabled value={values?.foodWasteNonMeatEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Food Waste (meat)</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name="foodWasteMeatKg"
                                                        value={formik?.values?.foodWasteMeatKg}
                                                        onChange={(e) => {
                                                            formik.handleChange(e);
                                                            formik.setFieldValue('foodWasteMeatEmission', Number(0.69 * Number(e.target.value)).toFixed(2));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='foodWasteMeatEmission' disabled value={values?.foodWasteMeatEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Municipal Solid Waste</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name="municipalSolidWasteKg"
                                                        value={formik?.values?.municipalSolidWasteKg}
                                                        onChange={(e) => {
                                                            formik.handleChange(e);
                                                            formik.setFieldValue('municipalSolidWasteEmission', Number(0.902 * Number(e.target.value)).toFixed(2));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='municipalSolidWasteEmission' disabled value={values?.municipalSolidWasteEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'}>
                                <Box>
                                    <div className='table-responsive my-3'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2' width={220}>Plastic Waste</th>
                                                <th className='ps-2'>No. of PET bottles</th>
                                                <th className='ps-2'>Emissions</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>250ml</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name="bottleOne"
                                                        value={formik?.values?.bottleOne}
                                                        onChange={(e) => {
                                                            formik.handleChange(e);
                                                            formik.setFieldValue('bottleOneEmission', Number(Number(e.target.value) * 6.42 * 0.004032).toFixed(2));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='bottleOneEmission' disabled value={values?.bottleOneEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>500ml</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name="bottleTwo"
                                                        value={formik?.values?.bottleTwo}
                                                        onChange={(e) => {
                                                            formik.handleChange(e);
                                                            formik.setFieldValue('bottleTwoEmission', Number(Number(e.target.value) * 13 * 0.004032).toFixed(2));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='bottleTwoEmission' disabled value={values?.bottleTwoEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>1000ml</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name="bottleThree"
                                                        value={formik?.values?.bottleThree}
                                                        onChange={(e) => {
                                                            formik.handleChange(e);
                                                            formik.setFieldValue('bottleThreeEmission', Number(Number(e.target.value) * 21.5 * 0.004032).toFixed(2));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='bottleThreeEmission' disabled value={values?.bottleThreeEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>
                                <Stack direction={"row"} spacing={2}>
                                    {/* <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button> */}
                                    <Button variant='contained' startIcon={<FaAngleDoubleLeft />} onClick={() => { formik.handleSubmit(); setValue(value - 1); }} className='custom-btn'>Save and Previous Page</Button>
                                    <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { formik.handleSubmit(); setValue(value + 1); }} className='custom-btn'> Save and Next Page</Button>
                                    <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => setValue(3)} className='custom-btn'>Go To Result</Button>
                                    <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete() }} color='error'>Clear</Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginY={2}>
                                <Typography color='white'>{`Total Hospitality Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Container>
        </div>
    )
}

export default Hospitality;
