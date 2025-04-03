import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Card, CardContent, Container, Grid, Icon, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { FaAngleDoubleRight, FaImage, FaFileVideo } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { useTheme } from '@mui/material/styles';
import { addCampaignData, deleteCampaignData } from '../../redux/slice/totalDigitalCampaignSlice';
import { addResultTableData, deleteResTabDgCampaignData, addResultTableDatasToDb, updateResultTableDatasToDb } from '../../redux/slice/resultTableDataSlice';
import Phone from '../../assets/phone2.png';
import podcastIcon from '../../assets/podcastIcon.png';
import { IconDiv } from '../../components/IconDiv';
import useEventData from '../../hooks/useEventData';

const DigitalCampaign = (props) => {
    const { setValue, value } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const allData = useSelector((state) => state?.totalDigitalCampaignDetails?.data?.[0]?.data);
    const totalEmission = useSelector((state) => state?.totalDigitalCampaignDetails?.totalEmission);
    const resultTableData = useSelector(state => state?.resultTableDataDetails);
    const eventsData = useEventData();

    const initialValues = {
        imgSize: '',         // No of Mb   
        uploadEnergy: '',    // 22.8 * imgSize  //  22.8(static)
        impressionsOne: '',
        downloadEnergy: '',  // 20 * impressionsOne * imgSize
        totalEnergy: '',     // Total Energy (C5 + E5)    // upload energy + download energy     
        totalEnergyKwh: '',  // Total Energy (kwh)       // (totalEnergy/3600000)
        emissionOne: '',     // totalEnergyKwh * 0.716   // 0.716(static)                     

        // videoSize: '',
        videoMins: '',
        efTwo: 0.897,
        videoEnergy: '',         // = (videoMins * efTwo / 60)
        impressionsTwo: '',
        emissionTwo: '',         // = (videoEnergy * impressionsTwo * 0.716)  // 0.716(static)

        noOfEmails: '',
        emialEfOne: 4,
        emialEfTwo: 50,
        emailEmissionOne: '',         // (noOfEmails * emialEfOne) / 1000
        emailEmissionTwo: '',         // (totalAttachmentSize * emialEfTwo) / 1000
        attachmentSize: '',
        totalAttachmentSize: '',      // noOfEmails * attachmentSize
        emissionThree: '',           // emailEmissionOne + emailEmissionTwo          // emissions

        podcastSize: '',    // Podcast Size (in Mb)
        noOfListeners: '',
        podcastKwh: 0.00004296,
        podcastTotal: '',        // podcastSize * podcastKwh
        emissionNineteen: '',    // podcastTotal * noOfListeners

    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            const emissionOne = values?.totalEnergyKwh === 0 ? 0 : Number(values?.totalEnergyKwh * 0.716).toFixed(2);
            const emissionTwo = values?.videoEnergy === 0 || values?.impressionsTwo === 0 ? 0 : Number((Number(values?.videoEnergy) * Number(values?.impressionsTwo) * 0.716)).toFixed(2)
            const emissionThree = values?.emailEmissionOne === 0 || values?.emailEmissionTwo === 0 ? 0 : Number(Number(values?.emailEmissionOne) + Number(values?.emailEmissionTwo)).toFixed(2)
            const emissionNineteen = values?.podcastTotal === 0 || values?.noOfListeners === 0 ? 0 : Number(Number(values?.podcastTotal) * Number(values?.noOfListeners)).toFixed(2);

            if (emissionOne > 0) formik.setFieldValue('emissionOne', emissionOne);
            if (emissionTwo > 0) formik.setFieldValue('emissionTwo', emissionTwo);
            if (emissionThree > 0) formik.setFieldValue('emissionThree', emissionThree);
            if (emissionNineteen > 0) formik.setFieldValue('emissionNineteen', emissionNineteen);
            const data = [
                {
                    type: 'Image',
                    imgSize: values?.imgSize,
                    uploadEnergy: values?.uploadEnergy,
                    impressionsOne: values?.impressionsOne,
                    downloadEnergy: values?.downloadEnergy,
                    totalEnergy: values?.totalEnergy,
                    totalEnergyKwh: values?.totalEnergyKwh,
                    emission: emissionOne > 0 ? emissionOne : ''
                },
                {
                    type: 'Video',
                    videoMins: values?.videoMins,
                    videoEnergy: values?.videoEnergy,
                    efTwo: values?.efTwo,
                    impressionsTwo: values?.impressionsTwo,
                    emission: emissionTwo > 0 ? emissionTwo : ''
                },
                {
                    name: 'Emails',
                    noOfEmails: values?.noOfEmails,
                    emialEfOne: values?.emialEfOne,
                    emialEfTwo: values?.emialEfTwo,
                    emailEmissionOne: values?.noOfEmails === 0 ? 0 : Number(((values?.noOfEmails * values?.emialEfOne) / 1000).toFixed(2)),
                    emailEmissionTwo: values?.totalAttachmentSize === 0 ? 0 : Number(((values?.totalAttachmentSize * values?.emialEfTwo) / 1000).toFixed(2)),
                    attachmentSize: values?.attachmentSize,
                    totalAttachmentSize: values?.noOfEmails === 0 || values?.attachmentSize === 0 ? 0 : Number((values?.noOfEmails * values?.attachmentSize).toFixed(2)),
                    emission: emissionThree > 0 ? emissionThree : '',
                },
                {
                    name: 'Podcast',
                    podcastSize: values?.podcastSize,
                    noOfListeners: values?.noOfListeners,
                    podcastKwh: values?.podcastKwh,
                    podcastTotal: values?.podcastTotal,
                    emission: emissionNineteen > 0 ? emissionNineteen : '',
                },
            ];

            const tableData = [
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
                    },
                    // scope: 3
                },
                {
                    subType: "",
                    subTypeData: {
                        th: ["", "Video (in mins)", "Impressions", "Emissions"],
                        td: [
                            {
                                dgType: "Video",
                                videoMins: values?.videoMins,
                                impressions2: values?.impressionsTwo,
                                emissions: emissionTwo > 0 ? emissionTwo : '',
                            },
                        ]
                    },
                    // scope: 3
                },
                {
                    subType: "Email / Newsletter",
                    subTypeData: {
                        // th: ["Email", "No of Emails", "Attachment Size (in Mb)", "Emissions"],
                        th: ["", "No of Emails", "Attachment Size (in Mb)", "Emissions"],
                        td: [
                            {
                                dgType: "Emails",
                                noOfDevice: values?.noOfEmails,
                                attachmentSize: values?.attachmentSize,
                                emissions: emissionThree > 0 ? emissionThree : ''
                            },
                        ]
                    },
                    // scope: 1
                },
                {
                    subType: "Podcast",
                    subTypeData: {
                        th: ["", "Podcast Size (in Mb)", "No of Listeners", "Emissions"],
                        td: [
                            {
                                dgType: "Podcast",
                                podcastSize: values?.podcastSize,
                                noOfListeners: values?.noOfListeners,
                                emissions: emissionNineteen > 0 ? emissionNineteen : '',
                            }
                        ]
                    },
                    // scope: 3
                },
            ];

            // dispatch(addCampaignData({ data }));
            // dispatch(addResultTableData({ from: "digitalCampaign", data: tableData, tabTitle: "Digital Campaign" }));
        },
    });

    const { values } = formik;

    const handeleDelete = () => {
        // dispatch(deleteCampaignData());
        // dispatch(deleteResTabDgCampaignData());
    };

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

    // useEffect(() => {
    //     if (allData?.length > 0) {
    //         formik.setFieldValue('imgSize', allData?.[0]?.imgSize);
    //         formik.setFieldValue('uploadEnergy', allData?.[0]?.uploadEnergy);
    //         formik.setFieldValue('totalEnergy', allData?.[0]?.totalEnergy);
    //         formik.setFieldValue('totalEnergyKwh', allData?.[0]?.totalEnergyKwh);
    //         formik.setFieldValue('downloadEnergy', allData?.[0]?.downloadEnergy);
    //         formik.setFieldValue('impressionsOne', allData?.[0]?.impressionsOne);
    //         formik.setFieldValue('emissionOne', allData?.[0]?.emission);

    //         formik.setFieldValue('videoMins', allData?.[1]?.videoMins);
    //         formik.setFieldValue('videoEnergy', allData?.[1]?.videoEnergy);
    //         formik.setFieldValue('efTwo', allData?.[1]?.efTwo);
    //         formik.setFieldValue('impressionsTwo', allData?.[1]?.impressionsTwo);
    //         formik.setFieldValue('emissionTwo', allData?.[1]?.emission);

    //         formik.setFieldValue('noOfEmails', allData?.[2]?.noOfEmails);
    //         formik.setFieldValue('emialEfOne', allData?.[2]?.emialEfOne);
    //         formik.setFieldValue('emialEfTwo', allData?.[2]?.emialEfTwo);
    //         formik.setFieldValue('emailEmissionOne', allData?.[2]?.emailEmissionOne);
    //         formik.setFieldValue('emailEmissionTwo', allData?.[2]?.emailEmissionTwo);
    //         formik.setFieldValue('attachmentSize', allData?.[2]?.attachmentSize);
    //         formik.setFieldValue('totalAttachmentSize', allData?.[2]?.totalAttachmentSize);
    //         formik.setFieldValue('emissionThree', allData?.[2]?.emission);

    //         formik.setFieldValue('podcastSize', allData?.[3]?.podcastSize);
    //         formik.setFieldValue('noOfListeners', allData?.[3]?.noOfListeners);
    //         formik.setFieldValue('podcastKwh', allData?.[3]?.podcastKwh);
    //         formik.setFieldValue('podcastTotal', allData?.[3]?.podcastTotal);
    //         formik.setFieldValue('emissionNineteen', allData?.[3]?.emission);
    //     }
    // }, [value]);

    return (
        <div>
            <Container maxWidth>
                <Card className='p-3 custom-inner-bg'>
                    <Box mx={useMediaQuery(theme.breakpoints.up('lg')) && 15} display={'flex'} alignItems={'center'} justifyContent={"center"} flexDirection={'row'} flexWrap="wrap">
                        <Box display={'flex'} alignItems={'center'} flexDirection={'row'} flexWrap="wrap">
                            <IconDiv><img width={100} src={Phone} alt="Digital Campaign " className="tabImgWhite" /></IconDiv>
                        </Box>
                        <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>

                            <Typography variant="h4" className="text-center text-white mt-4">Social Media</Typography>
                            <Box style={{ padding: '20px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                                <Card
                                    sx={{
                                        width: 260,
                                        maxWidth: '100%',
                                        boxShadow: 'lg',
                                        marginY: '16px'
                                    }}
                                >
                                    <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                        <Icon component={FaImage} sx={{ fontSize: 60, color: 'black' }} />
                                        <Typography variant="h6" sx={{ marginY: 1 }}>Image</Typography>
                                        <TextField size='small' type="number" name={'imgSize'} value={values?.imgSize}
                                            label="Image Size (in Mb)"
                                            variant="outlined"
                                            fullWidth
                                            onChange={(e) => {
                                                const downloadEnergy = Number(Number(e.target.value) * Number(values.impressionsOne) * 20);
                                                const uploadEnergy = Number(Number(e.target.value) * 22.8);
                                                const totalEnergy = Number(values.impressionsOne) > 0 ? Number(uploadEnergy) + downloadEnergy : 0;
                                                const totalEnergyKwh = Number(totalEnergy / 3600000);

                                                formik.setFieldValue("imgSize", Number(e.target.value));
                                                formik.setFieldValue("downloadEnergy", downloadEnergy);
                                                formik.setFieldValue("totalEnergy", totalEnergy);
                                                formik.setFieldValue("totalEnergyKwh", totalEnergyKwh);
                                                formik.setFieldValue("emissionOne", Number(totalEnergyKwh * 0.716).toFixed(2));
                                                formik.handleSubmit();
                                            }}
                                            sx={{ marginTop: 2 }}
                                            inputProps={{ style: { color: 'black' } }}
                                        />
                                        <TextField size='small' type="number" name={'impressionsOne'} value={values?.impressionsOne}
                                            label="Impressions"
                                            variant="outlined"
                                            fullWidth
                                            onChange={(e) => {
                                                const downloadEnergy = Number(Number(e.target.value) * Number(values.imgSize) * 20);
                                                const uploadEnergy = Number(Number(values.imgSize) * 22.8);
                                                const totalEnergy = Number(e.target.value) > 0 ? Number(uploadEnergy) + downloadEnergy : 0;
                                                const totalEnergyKwh = Number(totalEnergy / 3600000);


                                                formik.setFieldValue("impressionsOne", Number(e.target.value));
                                                formik.setFieldValue("totalEnergy", totalEnergy);
                                                formik.setFieldValue("downloadEnergy", downloadEnergy);
                                                formik.setFieldValue("totalEnergyKwh", totalEnergyKwh);
                                                formik.setFieldValue("emissionOne", Number(totalEnergyKwh * 0.716).toFixed(2));
                                                formik.handleSubmit();
                                            }}
                                            sx={{ marginTop: 2 }}
                                            inputProps={{ style: { color: 'black' } }}
                                        />
                                        <TextField size='small' type="number" disabled name={'emissionOne'}
                                            label="Emissions"
                                            variant="outlined"
                                            fullWidth
                                            value={values?.emissionOne}
                                            onChange={formik.handleChange}
                                            sx={{ marginTop: 2 }}
                                        />
                                    </CardContent>
                                </Card>
                                <Card
                                    sx={{
                                        width: 260,
                                        maxWidth: '100%',
                                        boxShadow: 'lg',
                                        marginY: '16px'
                                    }}
                                >
                                    <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                        <Icon component={FaFileVideo} sx={{ fontSize: 60, color: 'black' }} />
                                        <Typography variant="h6" sx={{ marginY: 1 }}>Video</Typography>
                                        <TextField size='small' type="number" name={'videoMins'} value={values?.videoMins}
                                            label="Video (in mins)"
                                            variant="outlined"
                                            fullWidth
                                            onChange={(e) => {
                                                formik.setFieldValue("videoMins", Number(e.target.value));
                                                formik.setFieldValue("videoEnergy", Number(Number(values.efTwo) * (Number(e.target.value) / 60)));
                                                formik.handleSubmit();
                                            }}
                                            sx={{ marginTop: 2 }}
                                            inputProps={{ style: { color: 'black' } }}
                                        />
                                        <TextField size='small' type="number" name={'impressionsTwo'} value={values?.impressionsTwo}
                                            label="Impressions"
                                            variant="outlined"
                                            fullWidth
                                            onChange={(e) => {
                                                formik.setFieldValue("impressionsTwo", Number(e.target.value));
                                                formik.setFieldValue("emissionTwo", (Number(e.target.value) * Number(values.videoEnergy) * 0.716).toFixed(2));
                                                formik.handleSubmit();
                                            }}
                                            sx={{ marginTop: 2 }}
                                            inputProps={{ style: { color: 'black' } }}
                                        />
                                        <TextField size='small' type="number" disabled
                                            label="Emissions"
                                            variant="outlined"
                                            fullWidth
                                            name={'emissionTwo'}
                                            value={values?.emissionTwo}
                                            onChange={formik.handleChange}
                                            sx={{ marginTop: 2 }}
                                        />
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>

                        <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
                            {/* <Typography variant="h4" className="text-center text-white mt-4">Email / Newsletter</Typography> */}
                            <Box style={{ padding: '20px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                                <Box>
                                    <Typography variant="h4" className="text-center text-white mt-4">Email / Newsletter</Typography>
                                    <Card
                                        sx={{
                                            width: 260,
                                            // height: 382,
                                            maxWidth: '100%',
                                            boxShadow: 'lg',
                                            marginY: '16px'
                                        }}
                                    >
                                        <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                            <Icon component={MdEmail} sx={{ fontSize: 60, color: 'black' }} />
                                            <Typography variant="h6" sx={{ marginY: 1 }}>Email</Typography>
                                            <TextField size='small' type="number" name={'noOfEmails'} value={values?.noOfEmails}
                                                label="No of Emails"
                                                variant="outlined"
                                                fullWidth
                                                onChange={(e) => {
                                                    const emailEmissionOne = e.target.value === 0 ? 0 : Number(((e.target.value * values?.emialEfOne) / 1000).toFixed(2));
                                                    const totalAttachmentSize = e.target.value === 0 || values?.attachmentSize === 0 ? 0 : Number((e.target.value * values?.attachmentSize).toFixed(2));
                                                    const emailEmissionTwo = totalAttachmentSize === 0 ? 0 : Number(((totalAttachmentSize * values?.emialEfTwo) / 1000).toFixed(2));

                                                    formik.setFieldValue("noOfEmails", e.target.value);
                                                    formik.setFieldValue("emailEmissionOne", emailEmissionOne);
                                                    formik.setFieldValue("totalAttachmentSize", totalAttachmentSize);
                                                    formik.setFieldValue("emailEmissionTwo", emailEmissionTwo);
                                                    formik.setFieldValue("emissionThree", emailEmissionOne === 0 || emailEmissionTwo === 0 ? 0 : Number(Number(emailEmissionOne) + Number(emailEmissionTwo)).toFixed(2));
                                                    formik.handleSubmit();
                                                }}
                                                sx={{ marginTop: 2 }}
                                                inputProps={{ style: { color: 'black' } }}
                                            />
                                            <TextField size='small' type="number" name={'attachmentSize'} value={values?.attachmentSize}
                                                label="Attachment Size (Mb)"
                                                variant="outlined"
                                                fullWidth
                                                onChange={(e) => {
                                                    const emailEmissionOne = values?.noOfEmails === 0 ? 0 : Number(((values?.noOfEmails * values?.emialEfOne) / 1000).toFixed(2));
                                                    const totalAttachmentSize = e.target.value === 0 || values?.noOfEmails === 0 ? 0 : Number((e.target.value * values?.noOfEmails).toFixed(2));
                                                    const emailEmissionTwo = totalAttachmentSize === 0 ? 0 : Number(((totalAttachmentSize * values?.emialEfTwo) / 1000).toFixed(2));

                                                    formik.setFieldValue("attachmentSize", e.target.value);
                                                    formik.setFieldValue("emailEmissionOne", emailEmissionOne);
                                                    formik.setFieldValue("totalAttachmentSize", totalAttachmentSize);
                                                    formik.setFieldValue("emailEmissionTwo", emailEmissionTwo);
                                                    formik.setFieldValue("emissionThree", emailEmissionOne === 0 || emailEmissionTwo === 0 ? 0 : Number(Number(emailEmissionOne) + Number(emailEmissionTwo)).toFixed(2));
                                                    formik.handleSubmit();
                                                }}
                                                sx={{ marginTop: 2 }}
                                                inputProps={{ style: { color: 'black' } }}
                                            />
                                            <TextField size='small' type="number" disabled name={`emissionThree`}
                                                label="Emissions"
                                                variant="outlined"
                                                fullWidth
                                                value={values?.emissionThree}
                                                onChange={formik.handleChange}
                                                sx={{ marginTop: 2 }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Box>
                                <Box>
                                    <Typography variant="h4" className="text-center text-white mt-4">Podcast</Typography>
                                    <Card
                                        sx={{
                                            width: 260,
                                            maxWidth: '100%',
                                            boxShadow: 'lg',
                                            marginY: '16px'
                                        }}
                                    >
                                        <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                            <img src={podcastIcon} alt="tv" style={{ width: "55px", height: '55px', margin: "auto" }} />
                                            <Typography variant="h6" sx={{ marginY: 1 }}>Podcast</Typography>
                                            <TextField size='small' type="number" name='podcastSize' value={values?.podcastSize}
                                                label="Podcast Size (in Mb)"
                                                variant="outlined"
                                                fullWidth
                                                onChange={(e) => {
                                                    const podcastTotal = e.target.value * 0.00004296
                                                    const emissionNineteen = Number(Number(podcastTotal) * Number(values?.noOfListeners)).toFixed(2);
                                                    formik.setFieldValue("podcastSize", Number(e.target.value));
                                                    formik.setFieldValue("podcastTotal", podcastTotal);
                                                    formik.setFieldValue("emissionNineteen", emissionNineteen);
                                                    formik.handleSubmit();
                                                }}
                                                sx={{ marginTop: 2 }}
                                                inputProps={{ style: { color: 'black' } }}
                                            />
                                            <TextField size='small' type="number" name={'noOfListeners'} value={values?.noOfListeners}
                                                label="No of Listeners"
                                                variant="outlined"
                                                fullWidth
                                                onChange={(e) => {
                                                    const emissionNineteen = Number(Number(values?.podcastTotal) * Number(e.target.value)).toFixed(2);
                                                    formik.setFieldValue("noOfListeners", Number(e.target.value));
                                                    formik.setFieldValue("emissionNineteen", emissionNineteen);
                                                    formik.handleSubmit();
                                                }}
                                                sx={{ marginTop: 2 }}
                                                inputProps={{ style: { color: 'black' } }}
                                            />
                                            <TextField size='small' type="number" disabled
                                                label="Emissions"
                                                variant="outlined"
                                                fullWidth
                                                name={'emissionNineteen'}
                                                value={values?.emissionNineteen}
                                                onChange={formik.handleChange}
                                                sx={{ marginTop: 2 }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Grid>
                        <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>
                            <Stack direction={"row"} spacing={2}><Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { handleSaveToDb(); setValue(value + 1); }} className='custom-btn'>Save and Next Page</Button>
                                {/* <Button variant='contained' onClick={() => { handleSaveToDb(); }} className='custom-btn'>SaveToDB</Button> */}
                                <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete(); }} color='error'>Clear</Button></Stack>
                        </Grid>
                        {/* <Grid item xs={12} sm={12} md={12} marginTop={3}><Typography color='white' className='text-center'>{`Total Digital Campaign Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e</Typography></Grid> */}
                    </Grid>
                </Card>
            </Container>
        </div >
    );
};
export default DigitalCampaign;

/*
                    <Card className='p-3 custom-inner-bg textborder' style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Box mx={useMediaQuery(theme.breakpoints.up('lg')) && 15} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <IconDiv>
                            <img width={100} src={Phone} alt="Digital Campaign " className="tabImgWhite" />
                        </IconDiv>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={12} >
                                <Typography variant='h6' className='text-center text-white'>Email / Newsletter</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} className='mt-3'>
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
                                <Box>
                                    <div className='table-responsive'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th />
                                                <th className='ps-2'>No of Emails</th>
                                                <th className='ps-2'>Attachment Size (Mb)</th>
                                                <th className='ps-2'>Emissions</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Emails</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name={'noOfEmails'} value={values?.noOfEmails}
                                                    onChange={(e) => {
                                                        const emailEmissionOne = e.target.value === 0 ? 0 : Number(((e.target.value * values?.emialEfOne) / 1000).toFixed(2));
                                                        const totalAttachmentSize = e.target.value === 0 || values?.attachmentSize === 0 ? 0 : Number((e.target.value * values?.attachmentSize).toFixed(2));
                                                        const emailEmissionTwo = totalAttachmentSize === 0 ? 0 : Number(((totalAttachmentSize * values?.emialEfTwo) / 1000).toFixed(2));

                                                        formik.setFieldValue("noOfEmails", e.target.value);
                                                        formik.setFieldValue("emailEmissionOne", emailEmissionOne);
                                                        formik.setFieldValue("totalAttachmentSize", totalAttachmentSize);
                                                        formik.setFieldValue("emailEmissionTwo", emailEmissionTwo);
                                                        formik.setFieldValue("emissionThree", emailEmissionOne === 0 || emailEmissionTwo === 0 ? 0 : Number(Number(emailEmissionOne) + Number(emailEmissionTwo)).toFixed(2));
                                                        formik.handleSubmit();
                                                    }}
                                                    inputProps={{ style: { color: 'white' } }} />
                                                </td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name={'attachmentSize'} value={values?.attachmentSize}
                                                    onChange={(e) => {
                                                        const emailEmissionOne = values?.noOfEmails === 0 ? 0 : Number(((values?.noOfEmails * values?.emialEfOne) / 1000).toFixed(2));
                                                        const totalAttachmentSize = e.target.value === 0 || values?.noOfEmails === 0 ? 0 : Number((e.target.value * values?.noOfEmails).toFixed(2));
                                                        const emailEmissionTwo = totalAttachmentSize === 0 ? 0 : Number(((totalAttachmentSize * values?.emialEfTwo) / 1000).toFixed(2));

                                                        formik.setFieldValue("attachmentSize", e.target.value);
                                                        formik.setFieldValue("emailEmissionOne", emailEmissionOne);
                                                        formik.setFieldValue("totalAttachmentSize", totalAttachmentSize);
                                                        formik.setFieldValue("emailEmissionTwo", emailEmissionTwo);
                                                        formik.setFieldValue("emissionThree", emailEmissionOne === 0 || emailEmissionTwo === 0 ? 0 : Number(Number(emailEmissionOne) + Number(emailEmissionTwo)).toFixed(2));
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
                                                 <th className='ps-2'>Device Energy</th> 
                                                 <th className='ps-2'>SoMe Platform Energy</th> 
                                                 <th className='ps-2'>Network Energy</th> 
                                                 <th className='ps-2'>Total Energy</th> 
                                                 <th className='ps-2'>Emissions</th> 
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
                                                 <td className='ps-2 py-1'>
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
                                                </td> 
                                                 <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={'efOne'} value={values?.efOne}
                                                    onChange={(e) => {
                                                        formik.setFieldValue("efOne", Number(e.target.value));
                                                        formik.setFieldValue("emissionOne", Number(e.target.value) * Number(values.imgSize) * Number(values.impressionsOne));
                                                    }}
                                                    inputProps={{ style: { color: 'white' } }}
                                                />
                                                </td> 
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
                                                 <th className='ps-2'>Device Energy</th> 
                                                 <th className='ps-2'>SoMe Platform Energy</th> 
                                                 <th className='ps-2'>Network Energy</th> 
                                                 <th className='ps-2'>Total Energy</th> 
                                                 <th className='ps-2'>Emissions</th> 
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
                                                 <td className='ps-2 py-1'>
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
                                                </td> 
                                                 <td className='ps-2 py-1'>
                                                    <TextField size='small' type="number" disabled name={'efTwo'} value={values?.efTwo}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("efTwo", Number(e.target.value));
                                                            formik.setFieldValue("emissionTwo", Number(e.target.value) * Number(values.videoSize) * Number(values.videoMins) * Number(values.impressionsTwo));
                                                        }}
                                                        inputProps={{ style: { color: 'white' } }}
                                                    />
                                                </td> 
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
*/