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
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { IconDiv } from '../../components/IconDiv';
import { addLogisticsData, deleteLogisticsData } from '../../redux/slice/totalAirFreightSlice';
import { addResultTableData, deleteResTabLogisticsData } from '../../redux/slice/resultTableDataSlice';
import LogisticsImg from '../../assets/Logistics.png';

const AirFreight = (props) => {
    const { setValue, value } = props;
    const theme = useTheme();

    const dispatch = useDispatch();
    const allData = useSelector((state) => state?.totalAirFreightDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalAirFreightDetails?.totalEmission);
    const scope = useSelector((state) => state?.totalAirFreightDetails?.scope);

    // -----------   initialValues
    const initialValues = {
        // noOfKmsOne: 0,
        // noOfKmsTwo: 0,
        // kgsOne: 0,
        // kgsTwo: 0,
        // efOne: 0.005,
        // efTwo: 0.18,
        // emissionOne: 0,
        // emissionTwo: 0,

        noOfKmsOne: '',
        noOfKmsTwo: '',
        kgsOne: '',
        kgsTwo: '',
        efOne: 0.005,
        efTwo: 0.18,
        emissionOne: '',
        emissionTwo: ''
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            const emissionOne = values?.noOfKmsOne === 0 || values?.kgsOne === 0 ? 0 : Number((values?.noOfKmsOne * values?.kgsOne * values?.efOne).toFixed(2));
            const emissionTwo = values?.noOfKmsTwo === 0 || values?.kgsTwo === 0 ? 0 : Number((values?.noOfKmsTwo * values?.kgsTwo * values?.efTwo).toFixed(2));

            if (emissionOne > 0) formik.setFieldValue('emissionOne', emissionOne);
            if (emissionTwo > 0) formik.setFieldValue('emissionTwo', emissionTwo);

            const data = [
                {
                    type: 'By Air',
                    noOfKmsOne: values?.noOfKmsOne,
                    kgsOne: values?.kgsOne,
                    efOne: values?.efOne,
                    emission: (emissionOne > 0) ? emissionOne : '',
                },
                {
                    type: 'By Road',
                    noOfKmsTwo: values?.noOfKmsTwo,
                    kgsTwo: values?.kgsTwo,
                    efTwo: values?.efTwo,
                    emission: (emissionTwo > 0) ? emissionTwo : '',
                },
            ];

            const tableData = [
                {
                    subType: "Mode of Freight",
                    subTypeData: {
                        th: ["", "No of Kms", "Weight in Kgs", "Emissions"],
                        td: [
                            {
                                frType: "By Air",
                                noOfKms: values?.noOfKmsOne,
                                kgs: values?.kgsOne,
                                emissions: emissionOne > 0 ? emissionOne : ''
                            },
                            {
                                frType: "By Road",
                                noOfKms: values?.noOfKmsTwo,
                                kgs: values?.kgsTwo,
                                emissions: emissionTwo > 0 ? emissionTwo : ''
                            },
                        ]
                    },
                    scope: 3
                }
            ];

            dispatch(addLogisticsData({ data }));
            dispatch(addResultTableData({ data: tableData, tabTitle: "Logistics" }));
        },
    });

    const handeleDelete = () => {
        dispatch(deleteLogisticsData());
        dispatch(deleteResTabLogisticsData());
    };

    useEffect(() => {
        if (allData?.length > 0) {
            formik.setFieldValue('noOfKmsOne', allData[0]?.noOfKmsOne);
            formik.setFieldValue('efOne', allData[0]?.efOne);
            formik.setFieldValue('emissionOne', allData[0]?.emission);
            formik.setFieldValue('kgsOne', allData[0]?.kgsOne);

            formik.setFieldValue('emissionTwo', allData[1]?.emission);
            formik.setFieldValue('noOfKmsTwo', allData[1]?.noOfKmsTwo);
            formik.setFieldValue('kgsTwo', allData[1]?.kgsTwo);
            formik.setFieldValue('efTwo', allData[1]?.efTwo);
        }
    }, [value]);

    return (
        <div>
            <Container maxWidth style={{ maxWidth: 'auto' }}>
                <Card
                    className="p-4 custom-inner-bg textborder"
                    style={{
                        padding: '20px',

                        flexDirection: useMediaQuery(theme.breakpoints.up('lg')) ? 'row' : 'column',
                    }}
                >
                    {/* <Typography variant='h4' className='text-center text-white mb-4'>{`Scope.${scope} Emissions`}</Typography> */}

                    <Box style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                        <IconDiv>
                            <img width={100} src={LogisticsImg} alt="Food" className='tabImgWhite' style={{position:'relative', bottom:'263px'}}/>
                        </IconDiv>
                        <Box>
                            <div className="table-responsive">
                                <Typography variant="h4" className="text-center text-white mb-4">Mode of Freight</Typography>
                                <table className="table-custom-inpt-field">
                                    <tr>
                                        <th />
                                        <th className="ps-2">No of Kms</th>
                                        <th className="ps-2">Weight in Kgs</th>
                                        <th className="ps-2">Emissions</th>
                                    </tr>
                                    <tr>
                                        <td className="ps-2 py-1">By Air</td>
                                        <td className="ps-2 py-1">
                                            <TextField
                                                size="small"
                                                type="number"
                                                name="noOfKmsOne"
                                                value={formik?.values?.noOfKmsOne}
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                    formik.setFieldValue('emissionOne', Number((e.target.value * formik?.values?.kgsOne * formik?.values?.efOne).toFixed(2)));
                                                    formik.handleSubmit();
                                                }}
                                                inputProps={{ style: { color: 'white' } }}
                                            />
                                        </td>
                                        <td className="ps-2 py-1">
                                            <TextField
                                                size="small"
                                                type="number"
                                                name="kgsOne"
                                                value={formik?.values?.kgsOne}
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                    formik.setFieldValue('emissionOne', Number((formik?.values?.noOfKmsOne * e.target.value * formik?.values?.efOne).toFixed(2)));
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
                                                value={formik?.values?.emissionOne}
                                                onChange={formik.handleChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="ps-2 py-1">By Road</td>
                                        <td className="ps-2 py-1">
                                            <TextField
                                                size="small"
                                                type="number"
                                                name="noOfKmsTwo"
                                                value={formik?.values?.noOfKmsTwo}
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                    formik.setFieldValue('emissionTwo', Number((e.target.value * formik?.values?.kgsTwo * formik?.values?.efTwo).toFixed(2)));
                                                    formik.handleSubmit();
                                                }}
                                                inputProps={{ style: { color: 'white' } }}
                                            />
                                        </td>
                                        <td className="ps-2 py-1">
                                            <TextField
                                                size="small"
                                                type="number"
                                                name="kgsTwo"
                                                value={formik?.values?.kgsTwo}
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                    formik.setFieldValue('emissionTwo', Number((formik?.values?.noOfKmsTwo * e.target.value * formik?.values?.efTwo).toFixed(2)));
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
                                                value={formik?.values?.emissionTwo}
                                                onChange={formik.handleChange}
                                                disabled
                                            />
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <Grid item xs={12} sm={12} md={12} display={'flex'} justifyContent={'center'} mt={3} style={{ maxWidth: 'auto' }} >
                                <Stack columnGap={2} rowGap={2} className='flex-xl-row flex-md-row flex-sm-column'>
                                    {/* <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button> */}
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            formik.handleSubmit();
                                            setValue(value - 1);
                                        }}
                                        className="custom-btn"
                                        startIcon={<FaAngleDoubleLeft />}
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
                            <Grid item xs={12} sm={12} md={12} marginTop={3} marginLeft={1}>
                                <Typography className="mt-3 text-white">Total Logistics Carbon Footprint = {totalEmission} kgCO<sub>2</sub>e</Typography>
                            </Grid>

                            {/* <Grid item xs={12} sm={12} md={12} marginLeft={3} mt={3}>
                                <ul>
                                    {allData?.length > 0 &&
                                        allData?.map((item) => (
                                            <li style={{ color: 'white' }}>{`${item?.type} : ${item?.emission} `}kgCO<sub>2</sub>e</li>
                                        ))}
                                </ul>
                            </Grid> */}
                        </Box>
                    </Box>
                </Card>
            </Container>
        </div>
    );
};

export default AirFreight;
