import { useTheme } from '@emotion/react';
import { Box, Button, Card, Container, FormLabel, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import EnergyImg from '../../assets/Energy.png';
import { IconDiv } from '../../components/IconDiv';
import { addEnergyData, deleteEnergyData } from '../../redux/slice/totalEnergyUpdatedSlice';
import { addResultTableData, deleteResTabEnergyData, addResultTableDatasToDb, updateResultTableDatasToDb } from '../../redux/slice/resultTableDataSlice';
import useEventData from '../../hooks/useEventData';

const EnergyUpdated = (props) => {
    const { setValue, value } = props;
    const theme = useTheme();
    const dispatch = useDispatch();

    const allData = useSelector((state) => state?.totalEnergyUpdatedDetails?.data?.[0]?.data)
    const totalEmission = useSelector((state) => state?.totalEnergyUpdatedDetails?.totalEmission)
    // const scope = useSelector((state) => state?.totalEnergyUpdatedDetails?.scope);
    const resultTableData = useSelector(state => state?.resultTableDataDetails);
    const eventsData = useEventData();

    // -----------  validationSchema
    const validationSchema = yup.object({
        type: yup.string().required("Type is required"),
    });

    // -----------   initialValues
    const initialValues = {
        // kwh: 0,
        // emissionOne: 0,
        // gallonsOne: 0,
        // emissionTwo: 0,
        // gallonsTwo: 0,
        // emissionThree: 0,
        kwh: '',
        emissionOne: '',
        gallonsOne: '',
        emissionTwo: '',
        gallonsTwo: '',
        emissionThree: '',
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            const emissionOne = Number((values?.kwh * 0.716).toFixed(2))
            const emissionTwo = Number((values?.gallonsOne * 2.288).toFixed(2))
            const emissionThree = Number((values?.gallonsTwo * 2.91).toFixed(2))
            if (emissionOne > 0) formik.setFieldValue('emissionOne', emissionOne);
            if (emissionTwo > 0) formik.setFieldValue('emissionTwo', emissionTwo);
            if (emissionThree > 0) formik.setFieldValue('emissionThree', emissionThree);

            const data = [
                {
                    type: 'Electricity',
                    kwh: values?.kwh,
                    emission: emissionOne > 0 ? Number((values?.kwh * 0.716).toFixed(2)) : ''
                },
                {
                    type: 'Petrol (Generator)',
                    gallonsOne: values?.gallonsOne,
                    emission: emissionTwo > 0 ? Number((values?.gallonsOne * 2.288).toFixed(2)) : ''
                },
                {
                    type: 'Diesel (Generator)',
                    gallonsTwo: values?.gallonsTwo,
                    emission: emissionThree > 0 ? Number((values?.gallonsTwo * 2.91).toFixed(2)) : ''
                }
            ];

            const tableData = [
                {
                    subType: "",
                    subTypeData: {
                        th: ["", "In Kgs", "Emissions"],
                        td: [
                            {
                                eType: "Electricity",
                                kwh: values?.kwh,
                                emissions: emissionOne > 0 ? emissionOne : ''
                            },
                        ]
                    },
                    // scope: 3
                },
                {
                    subType: "",
                    subTypeData: {
                        th: ["", "Gallons", "Emissions"],
                        td: [
                            {
                                eType: "Petrol (Generator)",
                                gallons: values?.gallonsOne,
                                emissions: emissionTwo > 0 ? emissionTwo : ''
                            },
                            {
                                eType: "Diesel (Generator)",
                                gallons: values?.gallonsTwo,
                                emissions: emissionThree > 0 ? emissionThree : ''
                            },
                        ]
                    },
                    // scope: 2
                },
            ];

            dispatch(addEnergyData({ data }))
            dispatch(addResultTableData({ from: "f2fEvent", data: tableData, tabTitle: "Energy" }));
        },
    });

    const handleSaveToDb = async () => {
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
            formik.setFieldValue("kwh", allData?.[0]?.kwh)
            formik.setFieldValue("emissionOne", allData?.[0]?.emission)
            formik.setFieldValue("gallonsOne", allData?.[1]?.gallonsOne)
            formik.setFieldValue("emissionTwo", allData?.[1]?.emission)
            formik.setFieldValue("gallonsTwo", allData?.[2]?.gallonsTwo)
            formik.setFieldValue("emissionThree", allData?.[2]?.emission)
        }
    }, [value])

    const handeleDelete = () => {
        dispatch(deleteEnergyData())
        dispatch(deleteResTabEnergyData())
    }

    return (
        <div>
            <Container maxWidth>
                <Card className='p-4 custom-inner-bg textborder'>
                    <Box className='table-custom-inpt-field' mx={useMediaQuery(theme.breakpoints.up('lg')) && 15} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <IconDiv>
                            <img src={EnergyImg} alt="Energy" width={100} className='tabImgWhite' />
                        </IconDiv>
                        <Grid
                            container
                            rowSpacing={3}
                            columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                            style={{ display: 'flex', justifyContent: 'center' }}
                        >

                            <Grid item xs={12} sm={4} md={4}>
                                <Typography variant='h4'>
                                    Electricity
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Kwh</FormLabel>
                                    <TextField
                                        id="kwh"
                                        name="kwh"
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values.kwh}
                                        type="number"
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            formik.setFieldValue('emissionOne', Number((e.target.value * 0.716).toFixed(2)));
                                            formik.handleSubmit();
                                        }}
                                        error={
                                            formik.touched.kwh &&
                                            Boolean(formik.errors.kwh)
                                        }
                                        helperText={
                                            formik.touched.kwh && formik.errors.kwh
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
                                <Typography variant='h4'>
                                    Petrol (Generator)
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Gallons</FormLabel>
                                    <TextField
                                        id="gallonsOne"
                                        name="gallonsOne"
                                        label=""
                                        fullWidth
                                        size="small"
                                        value={formik.values.gallonsOne}
                                        type="number"
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            formik.setFieldValue('emissionTwo', Number((e.target.value * 2.288).toFixed(2)));
                                            formik.handleSubmit();
                                        }}
                                        error={
                                            formik.touched.gallonsOne &&
                                            Boolean(formik.errors.gallonsOne)
                                        }
                                        helperText={
                                            formik.touched.gallonsOne && formik.errors.gallonsOne
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
                            </Grid>
                            <Grid item xs={12} sm={4} md={4}>
                                <Typography variant='h4'>
                                    Diesel (Generator)
                                </Typography>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Gallons</FormLabel>
                                    <TextField
                                        id="gallonsTwo"
                                        name="gallonsTwo"
                                        label=""
                                        fullWidth
                                        type="number"
                                        size="small"
                                        value={formik.values.gallonsTwo}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            formik.setFieldValue('emissionThree', Number((e.target.value * 2.91).toFixed(2)));
                                            formik.handleSubmit();
                                        }}
                                        error={
                                            formik.touched.gallonsTwo &&
                                            Boolean(formik.errors.gallonsTwo)
                                        }
                                        helperText={
                                            formik.touched.gallonsTwo && formik.errors.gallonsTwo
                                        }
                                        inputProps={{ style: { color: 'white' } }}
                                    />
                                </Grid>
                                <Grid mt={2}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" className='label-white'>Emissions</FormLabel>
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
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>
                                <Stack columnGap={2} rowGap={2} className='flex-xl-row flex-md-row flex-sm-column'>
                                    {/* <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button> */}
                                    <Button variant='contained' startIcon={<FaAngleDoubleLeft />} onClick={() => { handleSaveToDb(); setValue(value - 1); }} className='custom-btn'>Save and Previous Page</Button>
                                    <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { handleSaveToDb(); setValue(value + 1); }} className='custom-btn'> Save and Next Page</Button>
                                    <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { handleSaveToDb(); setValue(9) }} className='custom-btn'>Go To Result</Button>
                                    {/* <Button variant='contained' onClick={() => { handleSaveToDb(); }} className='custom-btn'>SaveToDB</Button> */}
                                    <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete() }} color='error'>Clear</Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginTop={3} marginLeft={1}>
                                <Typography>{`Total Energy Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e</Typography>
                            </Grid>
                            {/* <Grid item xs={12} sm={12} md={12} marginLeft={3}>
                                <ul>
                                    {
                                        allData?.length > 0 && allData?.map((item) => (

                                            <li style={{ color: 'white' }}>
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
    )
}

export default EnergyUpdated;   