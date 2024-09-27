import { Box, Button, Card, Container, FormHelperText, FormLabel, Grid, MenuItem, Select, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addLocalTranspotationData, deleteLocalTranspotationData, scopeChange } from '../../redux/slice/totalLocalTranspotationSlice';
import { addResultTableData, deleteResTabLocalTransData } from '../../redux/slice/resultTableDataSlice';
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
    const scope3 = useSelector((state) => state?.totalLocalTranspotationDetails?.scope3);

    // -----------   initialValues
    const initialValues = {
        petrolCarKms: '',
        petrolCarEmission: '',
        efOne: 0.163,
        dieselCarKms: '',
        dieselCarEmission: '',
        efTwo: 0.168,
        hybridCarKms: '',
        hybridCarEmission: '',
        efThree: 0.118,

        petrolCarKms2: '',
        petrolCarEmission2: '',
        efFour: 0.163,
        dieselCarKms2: '',
        dieselCarEmission2: '',
        efFive: 0.168,
        hybridCarKms2: '',
        hybridCarEmission2: '',
        efSix: 0.118,

        busDieselKms: '',
        busDieselEmission: '',
        efSeven: 0.101,
        subwayTramKms: '',
        subwayTramEmission: '',
        efEight: 0.028,
        ferryKms: '',
        ferryEmission: '',
        efNine: 0.111,
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {

            const petrolCarEmission = values?.petrolCarKms === 0 ? 0 : Number(Number(values?.efOne) * Number(values?.petrolCarKms)).toFixed(2);
            const dieselCarEmission = values?.dieselCarKms === 0 ? 0 : Number(Number(values?.efTwo) * Number(values?.dieselCarKms)).toFixed(2);
            const hybridCarEmission = values?.hybridCarKms === 0 ? 0 : Number(Number(values?.efThree) * Number(values?.hybridCarKms)).toFixed(2);

            const petrolCarEmission2 = values?.petrolCarKms2 === 0 ? 0 : Number(Number(values?.efFour) * Number(values?.petrolCarKms2)).toFixed(2);
            const dieselCarEmission2 = values?.dieselCarKms2 === 0 ? 0 : Number(Number(values?.efFive) * Number(values?.dieselCarKms2)).toFixed(2);
            const hybridCarEmission2 = values?.hybridCarKms2 === 0 ? 0 : Number(Number(values?.efSix) * Number(values?.hybridCarKms2)).toFixed(2);

            const busDieselEmission = values?.busDieselKms === 0 ? 0 : Number(Number(values?.efSeven) * Number(values?.busDieselKms)).toFixed(2);
            const subwayTramEmission = values?.subwayTramKms === 0 ? 0 : Number(Number(values?.efEight) * Number(values?.subwayTramKms)).toFixed(2);
            const ferryEmission = values?.ferryKms === 0 ? 0 : Number(Number(values?.efNine) * Number(values?.ferryKms)).toFixed(2);

            if (petrolCarEmission > 0) formik.setFieldValue('petrolCarEmission', petrolCarEmission);
            if (dieselCarEmission > 0) formik.setFieldValue('dieselCarEmission', dieselCarEmission);
            if (hybridCarEmission > 0) formik.setFieldValue('hybridCarEmission', hybridCarEmission);

            if (petrolCarEmission2 > 0) formik.setFieldValue('petrolCarEmission2', petrolCarEmission2);
            if (dieselCarEmission2 > 0) formik.setFieldValue('dieselCarEmission2', dieselCarEmission2);
            if (hybridCarEmission2 > 0) formik.setFieldValue('hybridCarEmission2', hybridCarEmission2);

            if (busDieselEmission > 0) formik.setFieldValue('busDieselEmission', busDieselEmission);
            if (subwayTramEmission > 0) formik.setFieldValue('subwayTramEmission', subwayTramEmission);
            if (ferryEmission > 0) formik.setFieldValue('ferryEmission', ferryEmission);

            const data = [
                {
                    type: 'Petrol Car',
                    petrolCarKms: values?.petrolCarKms,
                    emission: petrolCarEmission > 0 ? petrolCarEmission : ''
                },
                {
                    type: 'Diesel Car',
                    dieselCarKms: values?.dieselCarKms,
                    emission: dieselCarEmission > 0 ? dieselCarEmission : ''
                },
                {
                    type: 'Hybrid Car',
                    hybridCarKms: values?.hybridCarKms,
                    hybridCarNoPasse: values?.hybridCarNoPasse,
                    emission: hybridCarEmission > 0 ? hybridCarEmission : ''
                },
                {
                    type: 'Petrol Car2',
                    petrolCarKms2: values?.petrolCarKms2,
                    emission: petrolCarEmission2 > 0 ? petrolCarEmission2 : ''
                },
                {
                    type: 'Diesel Car2',
                    dieselCarKms2: values?.dieselCarKms2,
                    emission: dieselCarEmission2 > 0 ? dieselCarEmission2 : ''
                },
                {
                    type: 'Hybrid Car2',
                    hybridCarKms2: values?.hybridCarKms2,
                    emission: hybridCarEmission2 > 0 ? hybridCarEmission2 : ''
                },
                {
                    type: 'Bus-Diesel',
                    busDieselKms: values?.busDieselKms,
                    emission: busDieselEmission > 0 ? busDieselEmission : ''
                },
                {
                    type: 'Subway/ Tram',
                    subwayTramKms: values?.subwayTramKms,
                    emission: subwayTramEmission > 0 ? subwayTramEmission : ''
                },
                {
                    type: 'Ferry',
                    ferryKms: values?.ferryKms,
                    emission: ferryEmission > 0 ? ferryEmission : ''
                },
            ];

            const tableData = [
                {
                    subType: "Company Car",
                    subTypeData: {
                        th: ["Car Type", "No of Kms", "Emissions"],
                        td: [
                            {
                                journeyType: "Petrol",
                                noOfKms: values?.petrolCarKms,
                                emissions: petrolCarEmission > 0 ? petrolCarEmission : ''
                            },
                            {
                                journeyType: "Diesel",
                                noOfKms: values?.dieselCarKms,
                                emissions: dieselCarEmission > 0 ? dieselCarEmission : ''
                            },
                            {
                                journeyType: "Hybrid",
                                noOfKms: values?.hybridCarKms,
                                emissions: hybridCarEmission > 0 ? hybridCarEmission : ''
                            },
                        ]
                    },
                    scope: 1
                },
                {
                    subType: "Taxi",
                    subTypeData: {
                        th: ["Car Type", "No of Kms", "Emissions"],
                        td: [
                            {
                                journeyType: "Petrol",
                                noOfKms: values?.petrolCarKms2,
                                emissions: petrolCarEmission2 > 0 ? petrolCarEmission2 : ''
                            },
                            {
                                journeyType: "Diesel",
                                noOfKms: values?.dieselCarKms2,
                                emissions: dieselCarEmission2 > 0 ? dieselCarEmission2 : ''
                            },
                            {
                                journeyType: "Hybrid",
                                noOfKms: values?.hybridCarKms2,
                                emissions: hybridCarEmission2 > 0 ? hybridCarEmission2 : ''
                            },
                        ]
                    },
                    scope: 3
                },
                {
                    subType: "Public Transport",
                    subTypeData: {
                        th: ["Transport Via", "No of Kms", "Emissions per person"],
                        td: [
                            {
                                journeyType: "Bus-Diesel",
                                noOfKms: values?.busDieselKms,
                                emissions: busDieselEmission > 0 ? busDieselEmission : ''
                            },
                            {
                                journeyType: "Subway/ Tram",
                                noOfKms: values?.subwayTramKms,
                                emissions: subwayTramEmission > 0 ? subwayTramEmission : ''
                            },
                            {
                                journeyType: "Ferry",
                                noOfKms: values?.ferryKms,
                                emissions: ferryEmission > 0 ? ferryEmission : ''
                            }
                        ]
                    },
                    scope: 3
                },
            ];

            dispatch(addLocalTranspotationData({ data }))
            dispatch(addResultTableData({ data: tableData, tabTitle: "Local Transportation" }));
        },
    });

    const handeleDelete = () => {
        dispatch(deleteLocalTranspotationData());
        dispatch(deleteResTabLocalTransData());
    };

    useEffect(() => {
        if (allData?.length > 0) {

            formik.setFieldValue("petrolCarKms", allData[0]?.petrolCarKms);
            formik.setFieldValue("petrolCarEmission", allData[0]?.emission);

            formik.setFieldValue("dieselCarKms", allData[1]?.dieselCarKms);
            formik.setFieldValue("dieselCarEmission", allData[1]?.emission);

            formik.setFieldValue("hybridCarKms", allData[2]?.hybridCarKms);
            formik.setFieldValue("hybridCarEmission", allData[2]?.emission);

            formik.setFieldValue("petrolCarKms2", allData[3]?.petrolCarKms2);
            formik.setFieldValue("petrolCarEmission2", allData[3]?.emission);

            formik.setFieldValue("dieselCarKms2", allData[4]?.dieselCarKms2);
            formik.setFieldValue("dieselCarEmission2", allData[4]?.emission);

            formik.setFieldValue("hybridCarKms2", allData[5]?.hybridCarKms2);
            formik.setFieldValue("hybridCarEmission2", allData[5]?.emission);

            formik.setFieldValue("busDieselKms", allData[6]?.busDieselKms);
            formik.setFieldValue("busDieselEmission", allData[6]?.emission);

            formik.setFieldValue("subwayTramKms", allData[7]?.subwayTramKms);
            formik.setFieldValue("subwayTramEmission", allData[7]?.emission);

            formik.setFieldValue("ferryKms", allData[8]?.ferryKms);
            formik.setFieldValue("ferryEmission", allData[8]?.emission);
        }
    }, [value]);

    const { values, handleChange, setFieldValue, handleSubmit } = formik;

    return (
        <div>
            <Container maxWidth>
                <Card className='p-4 custom-inner-bg textborder' style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Box mx={useMediaQuery(theme.breakpoints.up('lg')) && 15} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <IconDiv>
                            <img src={LocalTransportImg} alt="Local Transportation" width={100} className='tabImgWhite' />
                        </IconDiv>
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                        >
                            <Grid item xs={12} sm={12} md={6}>
                                <Box>
                                    <div className='table-responsive'>
                                        <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center'>Company Car</Typography>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2' width="100">Car Type</th>
                                                <th className='ps-2'>No of Kms</th>
                                                <th className='ps-2'>Emissions</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Petrol</td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='petrolCarKms' value={values?.petrolCarKms}
                                                        onChange={(e) => {
                                                            formik.handleChange(e);
                                                            setFieldValue("petrolCarEmission", Number(Number(values?.efOne) * Number(e.target.value)).toFixed(2));
                                                            handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" disabled name='petrolCarEmission' value={values?.petrolCarEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Diesel</td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='dieselCarKms' value={values?.dieselCarKms}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            setFieldValue("dieselCarEmission", Number(Number(values?.efTwo) * Number(e.target.value)).toFixed(2));
                                                            handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='dieselCarEmission' value={values?.dieselCarEmission} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Hybrid</td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='hybridCarKms' value={values?.hybridCarKms}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            setFieldValue("hybridCarEmission", Number(Number(values?.efThree) * Number(e.target.value)).toFixed(2));
                                                            handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='hybridCarEmission' value={values?.hybridCarEmission} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6}>
                                <Box>
                                    <div className='table-responsive'>
                                        <Typography variant='h4' className='text-white mb-4 d-flex justify-content-center align-items-center'>Taxi</Typography>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2' width="100">Car Type</th>
                                                <th className='ps-2'>No of Kms</th>
                                                <th className='ps-2'>Emissions</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Petrol</td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='petrolCarKms2' value={values?.petrolCarKms2}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            setFieldValue("petrolCarEmission2", Number(Number(values?.efFour) * Number(e.target.value)).toFixed(2));
                                                            handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" disabled name='petrolCarEmission2' value={values?.petrolCarEmission2} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Diesel</td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='dieselCarKms2' value={values?.dieselCarKms2}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            setFieldValue("dieselCarEmission2", Number(Number(values?.efFive) * Number(e.target.value)).toFixed(2));
                                                            handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='dieselCarEmission2' value={values?.dieselCarEmission2} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Hybrid</td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='hybridCarKms2' value={values?.hybridCarKms2}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            setFieldValue("hybridCarEmission2", Number(Number(values?.efSix) * Number(e.target.value)).toFixed(2));
                                                            handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name='hybridCarEmission2' value={values?.hybridCarEmission2} onChange={formik.handleChange} disabled /></td>
                                            </tr>

                                        </table>
                                    </div>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6}>
                                <Box>
                                    <div className='table-responsive'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th className='ps-2' width="100">Public Transport</th>
                                                <th className='ps-3'>No of Kms</th>
                                                <th className='ps-2'>Emissions per person </th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Bus-Diesel</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name='busDieselKms' value={values?.busDieselKms}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            setFieldValue("busDieselEmission", Number(Number(values?.efSeven) * Number(e.target.value)).toFixed(2));
                                                            handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='busDieselEmission' disabled value={values?.busDieselEmission} onChange={formik.handleChange} /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Subway/ Tram</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name='subwayTramKms' value={values?.subwayTramKms}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            setFieldValue("subwayTramEmission", Number(Number(values?.efEight) * Number(e.target.value)).toFixed(2));
                                                            handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='subwayTramEmission' value={values?.subwayTramEmission} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Ferry</td>
                                                <td className='ps-3 py-1'>
                                                    <TextField size='small' type="number" name='ferryKms' value={values?.ferryKms}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            setFieldValue("ferryEmission", Number(Number(values?.efNine) * Number(e.target.value)).toFixed(2));
                                                            handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name='ferryEmission' value={values?.ferryEmission} onChange={formik.handleChange} disabled /></td>
                                            </tr>
                                        </table>
                                    </div>

                                </Box>
                            </Grid>

                            {/* <Grid item xs={12} sm={12} md={12} marginY={2}>
                                <Typography color='white'>Note: No. of passengers limit to max 4. (including driver)</Typography>
                            </Grid> */}
                            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>
                                <Stack columnGap={2} rowGap={2} className='flex-xl-row flex-md-row flex-sm-column'>
                                    {/* <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button> */}
                                    <Button variant='contained' startIcon={<FaAngleDoubleLeft />} onClick={() => { formik.handleSubmit(); setValue(value - 1); }} className='custom-btn'>Save and Previous Page</Button>
                                    <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { formik.handleSubmit(); setValue(value + 1); }} className='custom-btn'> Save and Next Page</Button>
                                    <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => setValue(9)} className='custom-btn'>Go To Result</Button>
                                    <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete() }} color='error'>Clear</Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginY={2}>
                                <Typography color='white'>{`Total Local Transportation Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Container>
        </div>
    )
}

export default LocalTranspotation
