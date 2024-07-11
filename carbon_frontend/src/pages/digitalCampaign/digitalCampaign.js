import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { addCampaignData, deleteCampaignData } from '../../redux/slice/totalDigitalCampaignSlice';
import { addResultTableData, deleteResTabDgCampaignData } from '../../redux/slice/resultTableDataSlice';
import CampaignImg from '../../assets/Travel.png';
import Phone from '../../assets/phone2.png';
import { IconDiv } from '../../components/IconDiv';

const DigitalCampaign = (props) => {
    const { setValue, value } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const allData = useSelector((state) => state?.totalDigitalCampaignDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalDigitalCampaignDetails?.totalEmission);

    const initialValues = {
        imgSize: '',
        deviceEnergy1: '',   // 0.01(1/60)
        somePlatformEnergy1: '', // =(0.4/1000)*imgSize
        networkEnergy1: '',      // =(0.2/1000)*imgSize
        totalEnergy1: '',        // = deviceEnergy1 + somePlatformEnergy1 + networkEnergy1
        efOne: '',               // = totalEnergy1*0.43
        impressionsOne: '',      // 
        emissionOne: '',
        videoSize: '',
        videoMins: '',
        deviceEnergy2: '',       // = 0.01*( videoMins/60)
        somePlatformEnergy2: '', // = ( videoSize/1000)*0.4
        networkEnergy2: '',      // = (0.2/1000)* videoSize
        totalEnergy2: '',        // = deviceEnergy2 + somePlatformEnergy2 + networkEnergy2
        efTwo: '',               // = totalEnergy2*0.43
        impressionsTwo: '',
        emissionTwo: '',         // videoSize * videoMins * impressionsTwo * efTwo
        noOfEmails: '',
        // efThree: '',
        emissionThree: '',
        attachmentSize: '',
        // efFour: '',
        emissionFour: '',
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            const emissionOne = values?.imgSize === 0 || values?.impressionsOne === 0 || values?.efOne === 0 ? 0 : Number(Number(Number(values?.imgSize) * Number(values?.impressionsOne) * Number(values?.efOne))).toFixed(2)
            const emissionTwo = values?.videoSize === 0 || values?.videoMins === 0 || values?.impressionsTwo === 0 || values?.efTwo === 0 ? 0 : Number((Number(values?.videoSize) * Number(values?.videoMins) * Number(values?.impressionsTwo) * Number(values?.efTwo))).toFixed(2)
            const emissionThree = values?.noOfEmails === 0 ? 0 : Number(((values?.noOfEmails * 4) / 1000)).toFixed(2)
            const emissionFour = values?.attachmentSize === 0 ? 0 : Number(((Number(values?.attachmentSize) * 50) / 1000)).toFixed(2)

            // formik.setFieldValue('emissionOne', values?.imgSize === 0 || values?.impressionsOne === 0 || values?.efOne === 0 ? 0 : Number(Number(Number(values?.imgSize) * Number(values?.impressionsOne) * Number(values?.efOne)).toFixed(2)));
            if (emissionOne > 0) formik.setFieldValue('emissionOne', emissionOne);
            // formik.setFieldValue('emissionTwo', values?.videoSize === 0 || values?.videoMins === 0 || values?.impressionsTwo === 0 || values?.efTwo === 0 ? 0 : Number((Number(values?.videoSize) * Number(values?.videoMins) * Number(values?.impressionsTwo) * Number(values?.efTwo)).toFixed(2)));
            if (emissionTwo > 0) formik.setFieldValue('emissionTwo', emissionTwo);
            // formik.setFieldValue('emissionThree', values?.noOfEmails === 0 ? 0 : Number(((values?.noOfEmails * 4) / 1000).toFixed(2)));
            if (emissionThree > 0) formik.setFieldValue('emissionThree', emissionThree);
            // formik.setFieldValue('emissionFour', values?.attachmentSize === 0 ? 0 : Number(((Number(values?.attachmentSize) * 50) / 1000).toFixed(2)));
            if (emissionFour > 0) formik.setFieldValue('emissionFour', emissionFour);

            const data = [
                {
                    type: 'Image',
                    imgSize: values?.imgSize,
                    deviceEnergy1: values?.deviceEnergy1,
                    somePlatformEnergy1: values?.somePlatformEnergy1,
                    networkEnergy1: values?.networkEnergy1,
                    totalEnergy1: values?.totalEnergy1,
                    efOne: values?.efOne,
                    impressionsOne: values?.impressionsOne,
                    // emission: values?.imgSize === 0 || values?.impressionsOne === 0 || values?.efOne === 0 ? 0 : Number(Number(Number(values?.imgSize) * Number(values?.impressionsOne) * Number(values?.efOne)).toFixed(2))
                    emission: emissionOne > 0 ? emissionOne : ''
                },
                {
                    type: 'Video',
                    videoSize: values?.videoSize,
                    videoMins: values?.videoMins,
                    deviceEnergy2: values?.deviceEnergy2,
                    somePlatformEnergy2: values?.somePlatformEnergy2,
                    networkEnergy2: values?.networkEnergy2,
                    totalEnergy2: values?.totalEnergy2,
                    efTwo: values?.efTwo,
                    impressionsTwo: values?.impressionsTwo,
                    // emission: values?.videoSize === 0 || values?.videoMins === 0 || values?.impressionsTwo === 0 || values?.efTwo === 0 ? 0 : Number((Number(values?.videoSize) * Number(values?.videoMins) * Number(values?.impressionsTwo) * Number(values?.efTwo)).toFixed(2))
                    emission: emissionTwo > 0 ? emissionTwo : ''
                },
                {
                    name: 'Emails',
                    noOfEmails: values?.noOfEmails,
                    // emission: values?.noOfEmails === 0 ? 0 : Number(((values?.noOfEmails * 4) / 1000).toFixed(2))
                    emission: emissionThree > 0 ? emissionThree : ''
                },
                {
                    name: 'Email Attachment',
                    attachmentSize: values?.attachmentSize,
                    // emission: values?.attachmentSize === 0 ? 0 : Number(((Number(values?.attachmentSize) * 50) / 1000).toFixed(2))
                    emission: emissionFour > 0 ? emissionFour : ''
                }
            ];

            const tableData = [
                {
                    subType: "Email / Newsletter",
                    subTypeData: {
                        th: ["", "No of Emails", "Emissions"],
                        td: [
                            {
                                dgType: "Emails",
                                noOfEmails: values?.noOfEmails,
                                emissions: emissionThree > 0 ? emissionThree : ''
                            },
                        ]
                    }
                },
                {
                    subType: "Email / Newsletter",
                    subTypeData: {
                        th: ["", "Size (in Mb)", "Emissions"],
                        td: [
                            {
                                dgType: "Email Attachment",
                                attachmentSize: values?.attachmentSize,
                                emissions: emissionFour > 0 ? emissionFour : '',
                            },
                        ]
                    }
                },
                {
                    subType: "Social Media",
                    subTypeData: {
                        th: ["", "Image Size (in Mb)", "Impressions", "Emissions"],
                        td: [
                            {
                                dgType: "Image",
                                imgSize: values?.imgSize,
                                impressions1: values?.impressionsOne,
                                emissions: emissionOne > 0 ? emissionOne : '',
                            },
                        ]
                    }
                },
                {
                    subType: "Social Media",
                    subTypeData: {
                        th: ["", "Video Size (in Mb)", "Video (in mins)", "Impressions", "Emissions"],
                        td: [
                            {
                                dgType: "Video",
                                videoSize: values?.videoSize,
                                videoMins: values?.videoMins,
                                impressions2: values?.impressionsTwo,
                                emissions: emissionTwo > 0 ? emissionTwo : '',
                            },
                        ]
                    }
                },
            ];

            dispatch(addCampaignData({ data }));
            dispatch(addResultTableData({ data: tableData, tabTitle: "Digital Campaign" }));
        },
    });

    const { values } = formik;

    const handeleDelete = () => {
        dispatch(deleteCampaignData());
        dispatch(deleteResTabDgCampaignData());
    };

    useEffect(() => {
        if (allData?.length > 0) {
            formik.setFieldValue('imgSize', allData[0]?.imgSize);
            formik.setFieldValue('deviceEnergy1', allData[0]?.deviceEnergy1);
            formik.setFieldValue('somePlatformEnergy1', allData[0]?.somePlatformEnergy1);
            formik.setFieldValue('networkEnergy1', allData[0]?.networkEnergy1);
            formik.setFieldValue('totalEnergy1', allData[0]?.totalEnergy1);
            formik.setFieldValue('efOne', allData[0]?.efOne);
            formik.setFieldValue('impressionsOne', allData[0]?.impressionsOne);
            formik.setFieldValue('emissionOne', allData[0]?.emission);
            formik.setFieldValue('videoSize', allData[1]?.videoSize);
            formik.setFieldValue('videoMins', allData[1]?.videoMins);
            formik.setFieldValue('deviceEnergy2', allData[1]?.deviceEnergy2);
            formik.setFieldValue('somePlatformEnergy2', allData[1]?.somePlatformEnergy2);
            formik.setFieldValue('networkEnergy2', allData[1]?.networkEnergy2);
            formik.setFieldValue('totalEnergy2', allData[1]?.totalEnergy2);
            formik.setFieldValue('efTwo', allData[1]?.efTwo);
            formik.setFieldValue('impressionsTwo', allData[1]?.impressionsTwo);
            formik.setFieldValue('emissionTwo', allData[1]?.emission);
            formik.setFieldValue('noOfEmails', allData[2]?.noOfEmails);
            formik.setFieldValue('emissionThree', allData[2]?.emission);
            formik.setFieldValue('attachmentSize', allData[3]?.attachmentSize);
            formik.setFieldValue('emissionFour', allData[3]?.emission);
        }
    }, [value]);

    console.log("----- allData ", allData)

    useEffect(() => {
        formik.setFieldValue("totalEnergy1", Number(values.deviceEnergy1) + Number(values.somePlatformEnergy1) + Number(values.networkEnergy1));
    }, [values.deviceEnergy1, values.somePlatformEnergy1, values.networkEnergy1])

    useEffect(() => {
        formik.setFieldValue("totalEnergy2", Number(values.deviceEnergy2) + Number(values.somePlatformEnergy2) + Number(values.networkEnergy2));
    }, [values.deviceEnergy2, values.somePlatformEnergy2, values.networkEnergy2]);

    useEffect(() => {
        formik.setFieldValue("efOne", Number(values.totalEnergy1) * 0.43);
    }, [values.totalEnergy1]);

    useEffect(() => {
        formik.setFieldValue("efTwo", Number(values.totalEnergy2) * 0.43);
    }, [values.totalEnergy2]);

    return (
        <div>
            <Container maxWidth>
                <Card className='p-3 custom-inner-bg textborder' style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Box mx={useMediaQuery(theme.breakpoints.up('lg')) && 15} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <IconDiv>
                            <img width={100} src={Phone} alt="Digital Campaign " className="tabImgWhite" />
                        </IconDiv>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} >
                                <Typography variant='h6' className='text-center text-white'>Email / Newsletter</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Box>
                                    <div className='table-responsive'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th />
                                                <th className='ps-2'>No of Emails</th>
                                                <th className='ps-2'>Emissions</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Emails</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name={'noOfEmails'} value={values?.noOfEmails}
                                                    onChange={(e) => {
                                                        formik.setFieldValue("noOfEmails", e.target.value);
                                                        formik.setFieldValue("emissionThree", e.target.value === 0 ? 0 : Number((Number(e.target.value * 4) / 1000)).toFixed(2));
                                                        formik.handleSubmit();
                                                    }}
                                                    inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={`emissionThree`} value={values?.emissionThree} onChange={formik.handleChange} /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Box>
                                    <div className='table-responsive'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th />
                                                <th className='ps-2'>Size (in Mb)</th>
                                                <th className='ps-2'>Emissions</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Email Attachment</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name={'attachmentSize'} value={values?.attachmentSize}
                                                    onChange={(e) => {
                                                        formik.setFieldValue("attachmentSize", e.target.value);
                                                        formik.setFieldValue("emissionFour", e.target.value === 0 ? 0 : Number(((Number(e.target.value) * 50) / 1000)).toFixed(2));
                                                        formik.handleSubmit();
                                                    }}
                                                    inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={`emissionFour`} value={values?.emissionFour} onChange={formik.handleChange} /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} >
                                <Typography variant='h6' className='text-center text-white'>Social Media</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className='mt-3'>
                                <Box>
                                    <div className='table-responsive'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th />
                                                <th className='ps-2'>Image Size (in Mb)</th>
                                                {/* <th className='ps-2'>Device Energy</th> */}
                                                {/* <th className='ps-2'>SoMe Platform Energy</th> */}
                                                {/* <th className='ps-2'>Network Energy</th> */}
                                                {/* <th className='ps-2'>Total Energy</th> */}
                                                {/* <th className='ps-2'>Emissions</th> */}
                                                <th className='ps-2'>Impressions</th>
                                                <th className='ps-2'>Total Emissions</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Image</td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name={'imgSize'} value={values?.imgSize}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("imgSize", Number(e.target.value));
                                                            formik.setFieldValue("deviceEnergy1", 0.01 * (1 / 60));     // maybe
                                                            formik.setFieldValue("somePlatformEnergy1", (0.4 / 1000) * Number(e.target.value));
                                                            formik.setFieldValue("networkEnergy1", (0.2 / 1000) * Number(e.target.value));
                                                            formik.setFieldValue("totalEnergy1", (0.01 * (Number(e.target.value) / 60)) + ((0.4 / 1000) * Number(e.target.value)) + ((0.2 / 1000) + Number(e.target.value)));     // maybe
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }}
                                                    />
                                                </td>
                                                {/* <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" disabled name={'deviceEnergy1'} value={values?.deviceEnergy1}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("deviceEnergy1", e.target.value);
                                                            formik.setFieldValue("somePlatformEnergy1", Number(e.target.value) + Number(values.somePlatformEnergy1) + Number(values.networkEnergy1));
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }}
                                                    />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" disabled name={'somePlatformEnergy1'} value={values?.somePlatformEnergy1}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("somePlatformEnergy1", e.target.value);
                                                            formik.setFieldValue("totalEnergy1", Number(values.deviceEnergy1) + Number(e.target.value) + Number(values.networkEnergy1));
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }}
                                                    />

                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" disabled name={'networkEnergy1'} value={values?.networkEnergy1}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("networkEnergy1", e.target.value);

                                                            formik.setFieldValue("totalEnergy1", Number(values.deviceEnergy1) + Number(values.somePlatformEnergy1) + Number(e.target.value));
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }}
                                                    />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" disabled name={'totalEnergy1'} value={values?.totalEnergy1}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("totalEnergy1", Number(e.target.value));
                                                            formik.setFieldValue("efOne", Number(e.target.value) * 0.43);
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }}
                                                    />
                                                </td> */}
                                                {/* <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={'efOne'} value={values?.efOne}
                                                    onChange={(e) => {
                                                        formik.setFieldValue("efOne", Number(e.target.value));
                                                        formik.setFieldValue("emissionOne", Number(e.target.value) * Number(values.imgSize) * Number(values.impressionsOne));
                                                    }}
                                                    inputProps={{ style: { color: 'white' } }}
                                                />
                                                </td> */}
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name={'impressionsOne'} value={values?.impressionsOne}
                                                    onChange={(e) => {
                                                        formik.setFieldValue("impressionsOne", Number(e.target.value));
                                                        formik.setFieldValue("emissionOne", (Number(e.target.value) * Number(values.imgSize) * Number(values.efOne)).toFixed(2));
                                                        formik.handleSubmit();
                                                    }}
                                                    inputProps={{ style: { color: 'white' } }}
                                                />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={'emissionOne'} value={values?.emissionOne} onChange={formik.handleChange} /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className='mt-3'>
                                <Box>
                                    <div className='table-responsive'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th />
                                                <th className='ps-2'>Video Size (in Mb)</th>
                                                <th className='ps-2'>Video (in mins)</th>
                                                {/* <th className='ps-2'>Device Energy</th> */}
                                                {/* <th className='ps-2'>SoMe Platform Energy</th> */}
                                                {/* <th className='ps-2'>Network Energy</th> */}
                                                {/* <th className='ps-2'>Total Energy</th> */}
                                                {/* <th className='ps-2'>Emissions</th> */}
                                                <th className='ps-2'>Impressions</th>
                                                <th className='ps-2'>Total Emissions</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Video</td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name={'videoSize'} value={values?.videoSize}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("videoSize", Number(e.target.value));
                                                            formik.setFieldValue("somePlatformEnergy2", Number((Number(e.target.value) / 1000) * 0.4));
                                                            formik.setFieldValue("networkEnergy2", Number((0.2 / 1000) * Number(e.target.value)));
                                                            formik.setFieldValue("emissionTwo", (Number(e.target.value) * Number(values?.impressionsTwo) * Number(values.videoMins) * Number(values.efTwo)).toFixed(2));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }}
                                                    />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name={'videoMins'} value={values?.videoMins}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("videoMins", Number(e.target.value));
                                                            formik.setFieldValue("deviceEnergy2", Number(0.01 * (Number(e.target.value) / 60)));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }}
                                                    />
                                                </td>
                                                {/* <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" disabled name={'deviceEnergy2'} value={values?.deviceEnergy2}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("deviceEnergy2", Number(e.target.value));
                                                            formik.setFieldValue("totalEnergy2", Number(e.target.value) + Number(values.somePlatformEnergy2) + Number(values.networkEnergy2));
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }}
                                                    />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" disabled name={'somePlatformEnergy2'} value={values?.somePlatformEnergy2}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("somePlatformEnergy2", Number(e.target.value));
                                                            formik.setFieldValue("totalEnergy2", Number(values.deviceEnergy2) + Number(e.target.value) + Number(values.networkEnergy2));
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" disabled name={'networkEnergy2'} value={values?.networkEnergy2}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("networkEnergy2", Number(e.target.value));
                                                            formik.setFieldValue("totalEnergy2", Number(values.deviceEnergy2) + Number(values.somePlatformEnergy2) + Number(e.target.value));
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }}
                                                    />
                                                </td>
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" disabled name={'totalEnergy2'} value={values?.totalEnergy2}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("totalEnergy2", Number(e.target.value));
                                                            formik.setFieldValue("efTwo", Number(values.totalEnergy2) * 0.43);
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }}
                                                    />
                                                </td> */}
                                                {/* <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" disabled name={'efTwo'} value={values?.efTwo}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("efTwo", Number(e.target.value));
                                                            formik.setFieldValue("emissionTwo", Number(e.target.value) * Number(values.videoSize) * Number(values.videoMins) * Number(values.impressionsTwo));
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }}
                                                    />
                                                </td> */}
                                                <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" name={'impressionsTwo'} value={values?.impressionsTwo}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("impressionsTwo", Number(e.target.value));
                                                            formik.setFieldValue("emissionTwo", (Number(e.target.value) * Number(values.videoSize) * Number(values.videoMins) * Number(values.efTwo)).toFixed(2));
                                                            formik.handleSubmit();
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }}
                                                    />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={'emissionTwo'} value={values?.emissionTwo} onChange={formik.handleChange} /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>
                                <Stack direction={"row"} spacing={2}>
                                    <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { formik.handleSubmit(); setValue(value + 1); }} className='custom-btn'>Save and Next Page</Button>
                                    <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete(); }} color='error'>Clear</Button>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginTop={3}>
                                <Typography color='white'>{`Total Digital Campaign Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Container>
        </div>
    );
};
export default DigitalCampaign;