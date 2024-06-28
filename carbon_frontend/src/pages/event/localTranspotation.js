import { Box, Button, Card, Container, FormHelperText, FormLabel, Grid, MenuItem, Select, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addLocalTranspotationData, deleteLocalTranspotationData, scopeChange } from '../../redux/slice/totalLocalTranspotationSlice';
import LocalTransportImg from '../../assets/Transportation.png';
import { IconDiv } from '../../components/IconDiv';

const LocalTranspotation = (props) => {
    const { setValue, value } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const allData = useSelector((state) => state?.totalLocalTranspotationDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalLocalTranspotationDetails?.totalEmission);
    const scope1 = useSelector((state) => state?.totalLocalTranspotationDetails?.scope1);
    const scope2 = useSelector((state) => state?.totalLocalTranspotationDetails?.scope2);

    console.log("---- scope1 ", scope1);

    // -----------   initialValues
    const initialValues = {
        petrolCarKms: 0,
        petrolCarNoPasse: 1,
        petrolCarEmission: 0,
        dieselCarKms: 0,
        dieselCarNoPasse: 1,
        dieselCarEmission: 0,
        // suvDieselKms: 0,
        // suvDieselNoPasse: 1,
        // suvDieselEmission: 0,
        // suvPetrolKms: 0,
        // suvPetrolNoPasse: 1,
        // suvPetrolEmission: 0,
        // camperPetrolKms: 0,
        // camperPetrolNoPasse: 1,
        // camperPetrolEmission: 0,
        // caperDieselKms: 0,
        // caperDieselNoPasse: 1,
        // caperDieselEmission: 0,
        electricCarKms: 0,
        electricCarNoPasse: 1,
        electricCarEmission: 0,
        busDieselKms: 0,
        busDieselEmission: 0,
        metroKms: 0,
        metroEmission: 0,
        hybridCarKms: 0,
        hybridCarNoPasse: 1,
        hybridCarEmission: 0,
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {

            formik.setFieldValue('petrolCarEmission', values?.petrolCarKms === 0 ? 0 : Number((0.171 * values?.petrolCarKms) / values?.petrolCarNoPasse).toFixed(2));
            formik.setFieldValue('dieselCarEmission', values?.dieselCarKms === 0 ? 0 : Number((0.172 * values?.dieselCarKms) / values?.dieselCarNoPasse).toFixed(2));
            // formik.setFieldValue('suvDieselEmission', values?.suvDieselKms === 0 ? 0 : Number((220 * values?.suvDieselKms) / values?.suvDieselNoPasse).toFixed(2));
            // formik.setFieldValue('suvPetrolEmission', values?.suvPetrolKms === 0 ? 0 : Number((181 * values?.suvPetrolKms) / values?.suvPetrolNoPasse).toFixed(2));
            // formik.setFieldValue('camperPetrolEmission', values?.camperPetrolKms === 0 ? 0 : Number((327 * values?.camperPetrolKms) / values?.camperPetrolNoPasse).toFixed(2));
            // formik.setFieldValue('caperDieselEmission', values?.caperDieselKms === 0 ? 0 : Number((267 * values?.caperDieselKms) / values?.caperDieselNoPasse).toFixed(2));
            formik.setFieldValue('hybridCarEmission', values?.hybridCarKms === 0 ? 0 : Number((0.068 * values?.hybridCarKms) / values?.hybridCarNoPasse).toFixed(2));
            formik.setFieldValue('electricCarEmission', values?.electricCarKms === 0 ? 0 : Number(0.047 * values?.electricCarKms).toFixed(2));
            formik.setFieldValue('busDieselEmission', values?.busDieselKms === 0 ? 0 : Number((0.096 * values?.busDieselKms / 1000)).toFixed(2));
            formik.setFieldValue('metroEmission', values?.metroKms === 0 ? 0 : Number((0.029 * values?.metroKms / 1000)).toFixed(2));

            const data = [
                {
                    type: 'Petrol Car',
                    petrolCarKms: values?.petrolCarKms,
                    petrolCarNoPasse: values?.petrolCarNoPasse,
                    emission: (values?.petrolCarKms === 0 || values?.petrolCarNoPasse === 0) ? 0 : Number(((0.171 * values?.petrolCarKms) / values?.petrolCarNoPasse).toFixed(2)) || 0
                },
                {
                    type: 'Diesel Car',
                    dieselCarKms: values?.dieselCarKms,
                    dieselCarNoPasse: values?.dieselCarNoPasse,
                    emission: (values?.dieselCarNoPasse === 0 || values?.dieselCarKms === 0) ? 0 : Number(((0.172 * values?.dieselCarKms) / values?.dieselCarNoPasse).toFixed(2)) || 0
                },
                // {
                //     type: 'SUV Diesel',
                //     suvDieselKms: values?.suvDieselKms,
                //     suvDieselNoPasse: values?.suvDieselNoPasse,
                //     emission: (values?.suvDieselKms === 0 || values?.suvDieselNoPasse === 0) ? 0 : Number(((220 * values?.suvDieselKms) / values?.suvDieselNoPasse).toFixed(2)) || 0
                // },
                // {
                //     type: 'SUV Petrol',
                //     suvPetrolKms: values?.suvPetrolKms,
                //     suvPetrolNoPasse: values?.suvPetrolNoPasse,
                //     emission: (values?.suvPetrolKms === 0 || values?.suvPetrolNoPasse === 0) ? 0 : Number(((181 * values?.suvPetrolKms) / values?.suvPetrolNoPasse).toFixed(2)) || 0
                // },
                // {
                //     type: 'Camper Petrol',
                //     camperPetrolKms: values?.camperPetrolKms,
                //     camperPetrolNoPasse: values?.camperPetrolNoPasse,
                //     emission: (values?.camperPetrolKms === 0 || values?.camperPetrolNoPasse === 0) ? 0 : Number(((327 * values?.camperPetrolKms) / values?.camperPetrolNoPasse).toFixed(2)) || 0
                // },
                // {
                //     type: 'Caper Diesel',
                //     caperDieselKms: values?.caperDieselKms,
                //     caperDieselNoPasse: values?.caperDieselNoPasse,
                //     emission: (values?.caperDieselKms === 0 || values?.caperDieselNoPasse === 0) ? 0 : Number(((267 * values?.caperDieselKms) / values?.caperDieselNoPasse).toFixed(2)) || 0
                // },
                {
                    type: 'Hybrid Car',
                    hybridCarKms: values?.hybridCarKms,
                    hybridCarNoPasse: values?.hybridCarNoPasse,
                    emission: (values?.hybridCarKms === 0 || values?.hybridCarNoPasse === 0) ? 0 : Number(((0.068 * values?.hybridCarKms) / values?.hybridCarNoPasse).toFixed(2)) || 0
                },
                {
                    type: 'Electric Car',
                    electricCarKms: values?.electricCarKms,
                    electricCarNoPasse: values?.electricCarNoPasse,
                    emission: (values?.electricCarKms === 0 || values?.electricCarNoPasse === 0) ? 0 : Number(((0.047 * values?.electricCarKms) / values?.electricCarNoPasse).toFixed(2)) || 0
                },
                {
                    type: 'Bus-Diesel',
                    busDieselKms: values?.busDieselKms,
                    emission: (values?.busDieselKms === 0) ? 0 : Number((0.096 * values?.busDieselKms / 1000).toFixed(2)) || 0
                },
                {
                    type: 'Metro',
                    metroKms: values?.metroKms,
                    emission: (values?.metroKms === 0) ? 0 : Number((0.029 * values?.metroKms / 1000).toFixed(2)) || 0
                },
            ];
            dispatch(addLocalTranspotationData({ data }))
        },
    });

    const handeleDelete = () => {
        dispatch(deleteLocalTranspotationData());
    };

    useEffect(() => {
        if (allData?.length > 0) {
            formik.setFieldValue("petrolCarKms", allData[0]?.petrolCarKms)
            formik.setFieldValue("petrolCarNoPasse", allData[0]?.petrolCarNoPasse)
            formik.setFieldValue("petrolCarEmission", allData[0]?.emission)

            formik.setFieldValue("dieselCarKms", allData[1]?.dieselCarKms)
            formik.setFieldValue("dieselCarNoPasse", allData[1]?.dieselCarNoPasse)
            formik.setFieldValue("dieselCarEmission", allData[1]?.emission)

            // formik.setFieldValue("suvDieselKms", allData[2]?.suvDieselKms)
            // formik.setFieldValue("suvDieselNoPasse", allData[2]?.suvDieselNoPasse)
            // formik.setFieldValue("suvDieselEmission", allData[2]?.emission)

            // formik.setFieldValue("suvPetrolKms", allData[3]?.suvPetrolKms)
            // formik.setFieldValue("suvPetrolNoPasse", allData[3]?.suvPetrolNoPasse)
            // formik.setFieldValue("suvPetrolEmission", allData[3]?.emission)

            // formik.setFieldValue("camperPetrolKms", allData[4]?.camperPetrolKms)
            // formik.setFieldValue("camperPetrolNoPasse", allData[4]?.camperPetrolNoPasse)
            // formik.setFieldValue("camperPetrolEmission", allData[4]?.emission)

            // formik.setFieldValue("caperDieselKms", allData[5]?.caperDieselKms)
            // formik.setFieldValue("caperDieselNoPasse", allData[5]?.caperDieselNoPasse)
            // formik.setFieldValue("caperDieselEmission", allData[5]?.emission)

            // formik.setFieldValue("electricCarKms", allData[6]?.electricCarKms)
            // formik.setFieldValue("electricCarNoPasse", allData[5]?.electricCarNoPasse)
            // formik.setFieldValue("electricCarEmission", allData[6]?.emission)

            // formik.setFieldValue("busDieselKms", allData[7]?.busDieselKms)
            // formik.setFieldValue("busDieselEmission", allData[7]?.emission)

            // formik.setFieldValue("metroKms", allData[8]?.metroKms)
            // formik.setFieldValue("metroEmission", allData[8]?.emission)

            formik.setFieldValue("hybridCarKms", allData[2]?.hybridCarKms)
            formik.setFieldValue("hybridCarNoPasse", allData[2]?.hybridCarNoPasse)
            formik.setFieldValue("hybridCarEmission", allData[2]?.emission)

            formik.setFieldValue("electricCarKms", allData[3]?.electricCarKms)
            formik.setFieldValue("electricCarNoPasse", allData[3]?.electricCarNoPasse)
            formik.setFieldValue("electricCarEmission", allData[3]?.emission)

            formik.setFieldValue("busDieselKms", allData[4]?.busDieselKms)
            formik.setFieldValue("busDieselEmission", allData[4]?.emission)

            formik.setFieldValue("metroKms", allData[5]?.metroKms)
            formik.setFieldValue("metroEmission", allData[5]?.emission)
        }
    }, [value]);

    const calclulateModeTransport1 = (e, emmFieldName, firstValue, secondValue, ef) => {
        formik.handleChange(e);
        formik.setFieldValue(emmFieldName, (firstValue === 0 || secondValue === 0) ? 0 : Number(((ef * Number(firstValue)) / Number(secondValue)).toFixed(2)));
    };

    const calclulateModeTransport2 = (e, emmFieldName, firstValue, ef) => {
        formik.handleChange(e);
        formik.setFieldValue(emmFieldName, Number(((ef * Number(firstValue)) / 1000).toFixed(2)));
    };

    const { values } = formik;

    return (
        <div>
            <Container maxWidth>
                <Card className='p-4 custom-inner-bg' style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Box mx={useMediaQuery(theme.breakpoints.up('lg')) && 15} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <IconDiv>
                            <img src={LocalTransportImg} alt="Local Transportation" width={100} />
                        </IconDiv>
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                        >
                            <Grid item xs={12} sm={6} md={6}>
                                {/* <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}> */}
                                {/* <FormLabel className='fontFamily fw-bold text-dark mt-1' id="demo-row-radio-buttons-group-label">Scope<span style={{ color: "red" }}>*</span></FormLabel> */}

                                <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center'>
                                    <Select
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        labelId="demo-simple-select-helper-label"
                                        size="small"
                                        name="scope1"
                                        className='me-2 text-light'
                                        id="demo-simple-select-helper"
                                        value={scope1}
                                        onChange={(e) => {
                                            dispatch(scopeChange({ scope1: Number(e.target.value), scope2 }));
                                        }}
                                        onBlur={formik.handleBlur}
                                    >
                                        <MenuItem value={1}>Scope.1</MenuItem>
                                        <MenuItem value={2}>Scope.2</MenuItem>
                                        <MenuItem value={3}>Scope.3</MenuItem>
                                    </Select>
                                    <FormHelperText error={formik.touched.allocatedBudgetForYourActivity && Boolean(formik.errors.allocatedBudgetForYourActivity)}>
                                        {formik.touched.allocatedBudgetForYourActivity && formik.errors.allocatedBudgetForYourActivity}
                                    </FormHelperText>
                                    Emissions
                                </Typography>
                                {/* </Box> */}
                                <Box>
                                    <div className='table-responsive'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2'>Mode of Transport</th>
                                                <th className='ps-2'>No of Kms</th>
                                                <th className='ps-2'>No of Passengers</th>
                                                <th className='ps-2'>Emissions</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Petrol Car</td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='petrolCarKms' value={values?.petrolCarKms}
                                                        onChange={(e) => {
                                                            calclulateModeTransport1(e, "petrolCarEmission", e.target.value, values?.petrolCarNoPasse, 0.171)
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='petrolCarNoPasse' value={values?.petrolCarNoPasse}
                                                        onChange={(e) => {
                                                            calclulateModeTransport1(e, "petrolCarEmission", values?.petrolCarKms, e.target.value, 0.171)
                                                        }}
                                                        inputProps={{ min: 1, max: 4, style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" disabled name='petrolCarEmission' value={values?.petrolCarEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Diesel Car</td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='dieselCarKms' value={values?.dieselCarKms}
                                                        onChange={(e) => {
                                                            calclulateModeTransport1(e, "dieselCarEmission", e.target.value, values?.dieselCarNoPasse, 0.172)
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='dieselCarNoPasse' value={values?.dieselCarNoPasse}
                                                        onChange={(e) => {
                                                            calclulateModeTransport1(e, "dieselCarEmission", values?.dieselCarKms, e.target.value, 0.172)
                                                        }}
                                                        inputProps={{ min: 1, max: 4, style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='dieselCarEmission' value={values?.dieselCarEmission} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            {/* <tr>
                                                <td className='ps-2 py-1'>SUV Diesel</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='suvDieselKms' value={values?.suvDieselKms} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='suvDieselNoPasse' value={values?.suvDieselNoPasse} onChange={formik.handleChange} inputProps={{ inputProps: { min: 1 }, style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='suvDieselEmission' value={values?.suvDieselEmission} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>SUV Petrol</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='suvPetrolKms' value={values?.suvPetrolKms} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='suvPetrolNoPasse' value={values?.suvPetrolNoPasse} onChange={formik.handleChange} inputProps={{ inputProps: { min: 1 }, style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='suvPetrolEmission' value={values?.suvPetrolEmission} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Camper Petrol</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='camperPetrolKms' value={values?.camperPetrolKms} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='camperPetrolNoPasse' value={values?.camperPetrolNoPasse} onChange={formik.handleChange} inputProps={{ inputProps: { min: 1 }, style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='camperPetrolEmission' value={values?.camperPetrolEmission} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Caper Diesel</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='caperDieselKms' value={values?.caperDieselKms} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='caperDieselNoPasse' value={values?.caperDieselNoPasse} onChange={formik.handleChange} inputProps={{ inputProps: { min: 1 }, style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='caperDieselEmission' value={values?.caperDieselEmission} onChange={formik.handleChange} disabled /></td>
                                            </tr> */}
                                            <tr>
                                                <td className='ps-2 py-1'>Hybrid Car</td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='hybridCarKms' value={values?.hybridCarKms}
                                                        onChange={(e) => {
                                                            calclulateModeTransport1(e, "hybridCarEmission", e.target.value, values?.hybridCarNoPasse, 0.068)
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='hybridCarNoPasse' value={values?.hybridCarNoPasse}
                                                        onChange={(e) => {
                                                            calclulateModeTransport1(e, "hybridCarEmission", values?.hybridCarKms, e.target.value, 0.068)
                                                        }}
                                                        inputProps={{ min: 1, max: 4, style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='hybridCarEmission' value={values?.hybridCarEmission} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Electric Car </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='electricCarKms' value={values?.electricCarKms}
                                                        onChange={(e) => {
                                                            calclulateModeTransport1(e, "electricCarEmission", e.target.value, values?.electricCarNoPasse, 0.047)
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='electricCarNoPasse' value={values?.electricCarNoPasse}
                                                        onChange={(e) => {
                                                            calclulateModeTransport1(e, "electricCarEmission", values?.electricCarKms, e.target.value, 0.047)
                                                        }}
                                                        inputProps={{ min: 1, max: 4, style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name='electricCarEmission' value={values?.electricCarEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Typography variant='h4' className='text-center text-white mb-4'>{`Scope.${scope2} Emissions`}</Typography>
                                <Box>
                                    <div className='table-responsive'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2'>Mode of Transport</th>
                                                <th className='ps-3'>No of Kms</th>
                                                <th className='ps-2'>Emissions per person </th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Bus- Diesel</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name='busDieselKms' value={values?.busDieselKms}
                                                        onChange={(e) => {
                                                            calclulateModeTransport2(e, "busDieselEmission", e.target.value, 0.096)
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='busDieselEmission' disabled value={values?.busDieselEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Metro (Electric)</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name='metroKms' value={values?.metroKms}
                                                        onChange={(e) => {
                                                            calclulateModeTransport2(e, "metroEmission", e.target.value, 0.029)
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='metroEmission' value={values?.metroEmission} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                        </table>
                                    </div>

                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginY={2}>
                                <Typography color='white'>Note: No. of passengers limit to max 4. (including driver)</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>
                                <Stack direction={"row"} spacing={2}>
                                    {/* <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button> */}
                                    <Button variant='contained' onClick={() => { formik.handleSubmit(); setValue(value - 1); }} className='custom-btn'>&lt;&lt;Save and Previous Page</Button>
                                    <Button variant='contained' onClick={() => { formik.handleSubmit(); setValue(value + 1); }} className='custom-btn'> Save and Next Page&gt;&gt;</Button>
                                    <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => setValue(9)} className='custom-btn'>Go To Result</Button>
                                    <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete() }} color='error'>Clear</Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginY={2}>
                                <Typography color='white'>{`Total Local Transportation Footprint = ${totalEmission} `}kgCO<sub>2</sub>e</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Container>
        </div>
    )
}

export default LocalTranspotation
