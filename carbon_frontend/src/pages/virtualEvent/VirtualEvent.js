import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, ButtonGroup, Card, CardActions, CardContent, Container, Grid, Stack, TextField, Typography, useMediaQuery, Icon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// Twitch as TwitchIcon,
// Snapchat as SnapchatIcon,
import {
    Facebook as FacebookIcon,
    Instagram as InstagramIcon,
    Twitter as TwitterIcon,
    YouTube as YouTubeIcon,
    Pinterest as PinterestIcon,
    LinkedIn as LinkedInIcon,
    Reddit as RedditIcon,
} from '@mui/icons-material';
import { FaSnapchat, FaTwitch, FaTiktok, FaAngleDoubleRight, FaImage, FaFileVideo } from 'react-icons/fa';
import { GiVideoConference } from "react-icons/gi";
import { addVirtualEventData, deleteVirtualEventData } from '../../redux/slice/totalVirtualEventSlice';
import VirtualEventImg from '../../layouts/user/assets/images/virtualEvent.png';
import { IconDiv } from '../../components/IconDiv';

const VirtualEvent = (props) => {
    const { setValue, value } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const allData = useSelector((state) => state?.totalVirtualEventDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalVirtualEventDetails?.totalEmission);

    const initialValues = {
        imgSize: '',
        deviceEnergy1: '',       // 0.01(1/60)
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

        // Socail Media Platforms
        // Tiktok
        noOfMinsOne: '',
        noOfPeopleOne: '',
        efThree: 2.63,
        emissionThree: '',
        // Reditt
        noOfMinsTwo: '',
        noOfPeopleTwo: '',
        efFour: 2.48,
        emissionFour: '',
        // Pinterest
        noOfMinsThree: '',
        noOfPeopleThree: '',
        efFive: 1.3,
        emissionFive: '',
        // Instagram Live
        noOfMinsFour: '',
        noOfPeopleFour: '',
        efSix: 1.05,
        emissionSix: '',
        // Snapchat
        noOfMinsFive: '',
        noOfPeopleFive: '',
        efSeven: 0.87,
        emissionSeven: '',
        // Facebook Live
        noOfMinsSix: '',
        noOfPeopleSix: '',
        efEight: 0.79,
        emissionEight: '',
        // LinkedIn Live
        noOfMinsSeven: '',
        noOfPeopleSeven: '',
        efNine: 0.71,
        emissionNine: '',
        // Twitter Live
        noOfMinsEight: '',
        noOfPeopleEight: '',
        efTen: 0.6,
        emissionTen: '',
        // Twitch
        noOfMinsNine: '',
        noOfPeopleNine: '',
        efEleven: 0.55,
        emissionEleven: '',
        // Youtube
        noOfMinsTen: '',
        noOfPeopleTen: '',
        efTwelve: 0.46,
        emissionTwelve: '',

        // Video Conferencing
        noOfMinsEleven: '',
        noOfPeopleEleven: '',
        efThirteen: 2.25,
        emissionThirteen: '',
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            // Image
            const emissionOne = values?.imgSize === 0 || values?.impressionsOne === 0 || values?.efOne === 0 ? 0 : Number(Number(Number(values?.imgSize) * Number(values?.impressionsOne) * Number(values?.efOne))).toFixed(2)
            // Video
            const emissionTwo = values?.videoSize === 0 || values?.videoMins === 0 || values?.impressionsTwo === 0 || values?.efTwo === 0 ? 0 : Number((Number(values?.videoSize) * Number(values?.videoMins) * Number(values?.impressionsTwo) * Number(values?.efTwo))).toFixed(2)

            // Socail Media Platforms
            const emissionThree = values?.noOfMinsOne === 0 || values?.noOfPeopleOne === 0 ? 0 : Number((Number(values?.noOfMinsOne) * Number(values?.noOfPeopleOne) * Number(values?.efThree)) / 1000);
            const emissionFour = values?.noOfMinsTwo === 0 || values?.noOfPeopleTwo === 0 ? 0 : Number((Number(values?.noOfMinsTwo) * Number(values?.noOfPeopleTwo) * Number(values?.efFour)) / 1000);
            const emissionFive = values?.noOfMinsThree === 0 || values?.noOfPeopleThree === 0 ? 0 : Number((Number(values?.noOfMinsThree) * Number(values?.noOfPeopleThree) * Number(values?.efFive)) / 1000);
            const emissionSix = values?.noOfMinsFour === 0 || values?.noOfPeopleFour === 0 ? 0 : Number((Number(values?.noOfMinsFour) * Number(values?.noOfPeopleFour) * Number(values?.efSix)) / 1000);
            const emissionSeven = values?.noOfMinsFive === 0 || values?.noOfPeopleFive === 0 ? 0 : Number((Number(values?.noOfMinsFive) * Number(values?.noOfPeopleFive) * Number(values?.efSeven)) / 1000);
            const emissionEight = values?.noOfMinsSix === 0 || values?.noOfPeopleSix === 0 ? 0 : Number((Number(values?.noOfMinsSix) * Number(values?.noOfPeopleSix) * Number(values?.efEight)) / 1000);
            const emissionNine = values?.noOfMinsSeven === 0 || values?.noOfPeopleSeven === 0 ? 0 : Number((Number(values?.noOfMinsSeven) * Number(values?.noOfPeopleSeven) * Number(values?.efNine)) / 1000);
            const emissionTen = values?.noOfMinsEight === 0 || values?.noOfPeopleEight === 0 ? 0 : Number((Number(values?.noOfMinsEight) * Number(values?.noOfPeopleEight) * Number(values?.efTen)) / 1000);
            const emissionEleven = values?.noOfMinsNine === 0 || values?.noOfPeopleNine === 0 ? 0 : Number(((Number(values?.noOfMinsNine) * Number(values?.noOfPeopleNine) * Number(values?.efEleven)) / 1000)).toFixed(2);
            const emissionTwelve = values?.noOfMinsTen === 0 || values?.noOfPeopleTen === 0 ? 0 : Number(((Number(values?.noOfMinsTen) * Number(values?.noOfPeopleTen) * Number(values?.efTwelve)) / 1000)).toFixed(2);
            // Video Conferencing
            const emissionThirteen = values?.noOfMinsEleven === 0 || values?.noOfPeopleEleven === 0 ? 0 : Number(((Number(values?.noOfMinsEleven) * Number(values?.noOfPeopleEleven) * Number(values?.efThirteen)) / 1000)).toFixed(2);


            if (emissionOne > 0) formik.setFieldValue('emissionOne', emissionOne);

            if (emissionTwo > 0) formik.setFieldValue('emissionTwo', emissionTwo);

            if (emissionThree > 0) formik.setFieldValue('emissionThree', emissionThree);
            if (emissionFour > 0) formik.setFieldValue('emissionFour', emissionFour);
            if (emissionFive > 0) formik.setFieldValue('emissionFive', emissionFive);
            if (emissionSix > 0) formik.setFieldValue('emissionSix', emissionSix);
            if (emissionSeven > 0) formik.setFieldValue('emissionSeven', emissionSeven);
            if (emissionEight > 0) formik.setFieldValue('emissionEight', emissionEight);
            if (emissionNine > 0) formik.setFieldValue('emissionNine', emissionNine);
            if (emissionTen > 0) formik.setFieldValue('emissionTen', emissionTen);
            if (emissionEleven > 0) formik.setFieldValue('emissionEleven', emissionEleven);
            if (emissionTwelve > 0) formik.setFieldValue('emissionTwelve', emissionTwelve);

            if (emissionThirteen > 0) formik.setFieldValue('emissionThirteen', emissionThirteen);

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
                    emission: emissionTwo > 0 ? emissionTwo : ''
                },

                {
                    name: 'Tiktok',
                    noOfMins: values?.noOfMinsOne,
                    noOfPeople: values?.noOfPeopleOne,
                    ef: values?.efThree,
                    emission: emissionThree > 0 ? emissionThree : '',
                },
                {
                    name: 'Reditt',
                    noOfMins: values?.noOfMinsTwo,
                    noOfPeople: values?.noOfPeopleTwo,
                    ef: values?.efFour,
                    emission: emissionFour > 0 ? emissionFour : '',
                },
                {
                    name: 'Pinterest',
                    noOfMins: values?.noOfMinsThree,
                    noOfPeople: values?.noOfPeopleThree,
                    ef: values?.efFive,
                    emission: emissionFive > 0 ? emissionFive : '',
                },
                {
                    name: 'Instagram Live',
                    noOfMins: values?.noOfMinsFour,
                    noOfPeople: values?.noOfPeopleFour,
                    ef: values?.efSix,
                    emission: emissionSix > 0 ? emissionSix : '',
                },
                {
                    name: 'Snapchat',
                    noOfMins: values?.noOfMinsFive,
                    noOfPeople: values?.noOfPeopleFive,
                    ef: values?.efSeven,
                    emission: emissionSeven > 0 ? emissionSeven : '',
                },
                {
                    name: 'Facebook Live',
                    noOfMins: values?.noOfMinsSix,
                    noOfPeople: values?.noOfPeopleSix,
                    ef: values?.efEight,
                    emission: emissionEight > 0 ? emissionEight : '',
                },
                {
                    name: 'LinkedIn Live',
                    noOfMins: values?.noOfMinsSeven,
                    noOfPeople: values?.noOfPeopleSeven,
                    ef: values?.efNine,
                    emission: emissionNine > 0 ? emissionNine : '',
                },
                {
                    name: 'Twitter Live',
                    noOfMins: values?.noOfMinsEight,
                    noOfPeople: values?.noOfPeopleEight,
                    ef: values?.efTen,
                    emission: emissionTen > 0 ? emissionTen : '',
                },
                {
                    name: 'Twitch',
                    noOfMins: values?.noOfMinsNine,
                    noOfPeople: values?.noOfPeopleNine,
                    ef: values?.efEleven,
                    emission: emissionEleven > 0 ? emissionEleven : '',
                },
                {
                    name: 'Youtube',
                    noOfMins: values?.noOfMinsTen,
                    noOfPeople: values?.noOfPeopleTen,
                    ef: values?.efTwelve,
                    emission: emissionTwelve > 0 ? emissionTwelve : '',
                },

                {
                    name: 'Video Conferencing',
                    noOfMins: values?.noOfMinsEleven,
                    noOfPeople: values?.noOfPeopleEleven,
                    ef: values?.efThirteen,
                    emission: emissionThirteen > 0 ? emissionThirteen : '',
                }
            ];
            dispatch(addVirtualEventData({ data }));
        },
    });

    const { values } = formik;

    const handeleDelete = () => {
        dispatch(deleteVirtualEventData());
    };

    console.log("----- formik.values ", formik.values.noOfMinsOne);

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

            formik.setFieldValue('noOfMinsOne', allData[2]?.noOfMins);
            formik.setFieldValue('noOfPeopleOne', allData[2]?.noOfPeople);
            formik.setFieldValue('efThree', allData[2]?.ef);
            formik.setFieldValue('emissionThree', allData[2]?.emission);

            formik.setFieldValue('noOfMinsTwo', allData[3]?.noOfMins);
            formik.setFieldValue('noOfPeopleTwo', allData[3]?.noOfPeople);
            formik.setFieldValue('efFour', allData[3]?.ef);
            formik.setFieldValue('emissionFour', allData[3]?.emission);

            formik.setFieldValue('noOfMinsThree', allData[4]?.noOfMins);
            formik.setFieldValue('noOfPeopleThree', allData[4]?.noOfPeople);
            formik.setFieldValue('efFive', allData[4]?.ef);
            formik.setFieldValue('emissionFive', allData[4]?.emission);

            formik.setFieldValue('noOfMinsFour', allData[5]?.noOfMins);
            formik.setFieldValue('noOfPeopleFour', allData[5]?.noOfPeople);
            formik.setFieldValue('efSix', allData[5]?.ef);
            formik.setFieldValue('emissionSix', allData[5]?.emission);

            formik.setFieldValue('noOfMinsFive', allData[6]?.noOfMins);
            formik.setFieldValue('noOfPeopleFive', allData[6]?.noOfPeople);
            formik.setFieldValue('efSeven', allData[6]?.ef);
            formik.setFieldValue('emissionSeven', allData[6]?.emission);

            formik.setFieldValue('noOfMinsSix', allData[7]?.noOfMins);
            formik.setFieldValue('noOfPeopleSix', allData[7]?.noOfPeople);
            formik.setFieldValue('efEight', allData[7]?.ef);
            formik.setFieldValue('emissionEight', allData[7]?.emission);

            formik.setFieldValue('noOfMinsSeven', allData[8]?.noOfMins);
            formik.setFieldValue('noOfPeopleSeven', allData[8]?.noOfPeople);
            formik.setFieldValue('efNine', allData[8]?.ef);
            formik.setFieldValue('emissionNine', allData[8]?.emission);

            formik.setFieldValue('noOfMinsEight', allData[9]?.noOfMins);
            formik.setFieldValue('noOfPeopleEight', allData[9]?.noOfPeople);
            formik.setFieldValue('efTen', allData[9]?.ef);
            formik.setFieldValue('emissionTen', allData[9]?.emission);

            formik.setFieldValue('noOfPeopleNine', allData[10]?.noOfMins);
            formik.setFieldValue('noOfPeopleNine', allData[10]?.noOfPeople);
            formik.setFieldValue('efEleven', allData[10]?.ef);
            formik.setFieldValue('emissionEleven', allData[10]?.emission);

            formik.setFieldValue('noOfMinsTen', allData[11]?.noOfMins);
            formik.setFieldValue('noOfPeopleTen', allData[11]?.noOfPeople);
            formik.setFieldValue('efTwelve', allData[11]?.ef);
            formik.setFieldValue('emissionTwelve', allData[11]?.emission);

            formik.setFieldValue('noOfMinsEleven', allData[12]?.noOfMins);
            formik.setFieldValue('noOfPeopleEleven', allData[12]?.noOfPeople);
            formik.setFieldValue('efThirteen', allData[12]?.ef);
            formik.setFieldValue('emissionThirteen', allData[12]?.emission);
        }
    }, [value]);

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
                <Card className='p-3 custom-inner-bg'>
                    <Box mx={useMediaQuery(theme.breakpoints.up('lg')) && 15} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <IconDiv><img width={100} src={VirtualEventImg} alt="Virtual Event " className="tabImgWhite" /></IconDiv>

                        <Typography variant="h4" className="text-center text-white mt-4">Event Promotion on Social Media</Typography>
                        <Box style={{ padding: '20px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                            <Card
                                sx={{
                                    width: 330,
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
                                            formik.setFieldValue("imgSize", Number(e.target.value));
                                            formik.setFieldValue("deviceEnergy1", 0.01 * (1 / 60));
                                            formik.setFieldValue("somePlatformEnergy1", (0.4 / 1000) * Number(e.target.value));
                                            formik.setFieldValue("networkEnergy1", (0.2 / 1000) * Number(e.target.value));
                                            formik.setFieldValue("totalEnergy1", (0.01 * (Number(e.target.value) / 60)) + ((0.4 / 1000) * Number(e.target.value)) + ((0.2 / 1000) + Number(e.target.value)));     // maybe
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
                                            formik.setFieldValue("impressionsOne", Number(e.target.value));
                                            formik.setFieldValue("emissionOne", (Number(e.target.value) * Number(values.imgSize) * Number(values.efOne)).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        sx={{ marginTop: 2 }}
                                        inputProps={{ style: { color: 'black' } }}
                                    />
                                    <TextField size='small' type="number" disabled name={'emissionOne'}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        value={values?.emissionOne} onChange={formik.handleChange} sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 330,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={FaFileVideo} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Video</Typography>
                                    <TextField size='small' type="number" name={'videoSize'} value={values?.videoSize}
                                        label="Video Size (in Mb)"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("videoSize", Number(e.target.value));
                                            formik.setFieldValue("somePlatformEnergy2", Number((Number(e.target.value) / 1000) * 0.4));
                                            formik.setFieldValue("networkEnergy2", Number((0.2 / 1000) * Number(e.target.value)));
                                            formik.setFieldValue("emissionTwo", (Number(e.target.value) * Number(values?.impressionsTwo) * Number(values.videoMins) * Number(values.efTwo)).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        sx={{ marginTop: 2 }}
                                        inputProps={{ style: { color: 'black' } }}
                                    />
                                    <TextField size='small' type="number" name={'videoMins'} value={values?.videoMins}
                                        label="Video (in mins)"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("videoMins", Number(e.target.value));
                                            formik.setFieldValue("deviceEnergy2", Number(0.01 * (Number(e.target.value) / 60)));
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
                                            formik.setFieldValue("emissionTwo", (Number(e.target.value) * Number(values.videoSize) * Number(values.videoMins) * Number(values.efTwo)).toFixed(2));
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
                                        value={values?.emissionTwo} onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                        </Box>

                        <Typography variant="h4" className="text-center text-white mt-4">Live Broadcasting</Typography>
                        <Box style={{ padding: '20px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
                            <Card
                                sx={{
                                    width: 330,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={FaTiktok} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Tiktok</Typography>
                                    <TextField
                                        size="small"
                                        type="number"
                                        name="noOfMinsOne"
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        value={values?.noOfMinsOne}
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsOne", e.target.value);
                                            formik.setFieldValue("emissionThree", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfPeopleOne) * 0.46).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField
                                        size="small"
                                        type="number"
                                        name="noOfPeopleOne"
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        value={values?.noOfPeopleOne}
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleOne", e.target.value);
                                            formik.setFieldValue("emissionTwelve", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsOne) * 0.46).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField
                                        size="small"
                                        type="number"
                                        name={`emissionThree`}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        disabled
                                        value={values?.emissionThree}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 330,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={RedditIcon} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Reddit</Typography>
                                    <TextField size='small' type="number" name={'noOfMinsTwo'} value={values?.noOfMinsTwo}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsTwo", e.target.value);
                                            formik.setFieldValue("emissionFour", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfPeopleTwo) * 2.48).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleTwo'} value={values?.noOfPeopleTwo}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleTwo", e.target.value);
                                            formik.setFieldValue("emissionFour", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsTwo) * 2.48).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionFour`}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth value={values?.emissionFour} onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 330,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={PinterestIcon} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Pinterest</Typography><TextField size='small' type="number" name={'noOfMinsThree'} value={values?.noOfMinsThree}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsThree", e.target.value);
                                            formik.setFieldValue("emissionFive", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfPeopleThree) * 1.3).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleThree'} value={values?.noOfPeopleThree}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleThree", e.target.value);
                                            formik.setFieldValue("emissionFive", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsThree) * 1.3).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionFive`}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        value={values?.emissionFive} onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 330,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={InstagramIcon} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Instagram Live</Typography>
                                    <TextField size='small' type="number" name={'noOfMinsFour'} value={values?.noOfMinsFour}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsFour", e.target.value);
                                            formik.setFieldValue("emissionSix", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfPeopleFour) * 1.05).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleFour'} value={values?.noOfPeopleFour}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleFour", e.target.value);
                                            formik.setFieldValue("emissionSix", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsFour) * 1.05).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionSix`} value={values?.emissionSix}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />

                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 330,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={FaSnapchat} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Snapchat</Typography>
                                    <TextField size='small' type="number" name={'noOfMinsFive'} value={values?.noOfMinsFive}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsFive", e.target.value);
                                            formik.setFieldValue("emissionSeven", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfPeopleFive) * 0.87).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleFive'} value={values?.noOfPeopleFive}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleFive", e.target.value);
                                            formik.setFieldValue("emissionSeven", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsFive) * 0.87).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionSeven`} value={values?.emissionSeven}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 330,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={FacebookIcon} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Facebook Live</Typography>
                                    <TextField size='small' type="number" name={'noOfMinsSix'} value={values?.noOfMinsSix}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsSix", e.target.value);
                                            formik.setFieldValue("emissionEight", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfPeopleSix) * 0.79).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleSix'} value={values?.noOfPeopleSix}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleSix", e.target.value);
                                            formik.setFieldValue("emissionEight", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsSix) * 0.79).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionEight`} value={values?.emissionEight}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}

                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 330,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={LinkedInIcon} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>LinkedIn Live</Typography>
                                    <TextField size='small' type="number" name={'noOfMinsSeven'} value={values?.noOfMinsSeven}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsSeven", e.target.value);
                                            formik.setFieldValue("emissionNine", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.emissionNine) * 0.71).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleSeven'} value={values?.noOfPeopleSeven}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleSeven", e.target.value);
                                            formik.setFieldValue("emissionNine", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsSeven) * 0.71).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionNine`} value={values?.emissionNine}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 330,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={TwitterIcon} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Twitter Live</Typography>
                                    <TextField size='small' type="number" name={'noOfMinsEight'} value={values?.noOfMinsEight}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsEight", e.target.value);
                                            formik.setFieldValue("emissionTen", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfPeopleEight) * 0.6).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleEight'} value={values?.noOfPeopleEight}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleEight", e.target.value);
                                            formik.setFieldValue("emissionTen", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsSix) * 0.6).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionTen`} value={values?.emissionTen}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 330,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={FaTwitch} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Twitch</Typography>
                                    <TextField size='small' type="number" name={'noOfMinsNine'} value={values?.noOfMinsNine}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsNine", e.target.value);
                                            formik.setFieldValue("emissionEleven", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfPeopleNine) * 0.55).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleNine'} value={values?.noOfPeopleNine}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleNine", e.target.value);
                                            formik.setFieldValue("emissionEleven", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsNine) * 0.55).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionEleven`} value={values?.emissionEleven}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 330,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={YouTubeIcon} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Youtube</Typography>
                                    <TextField size='small' type="number" name={'noOfMinsTen'} value={values?.noOfMinsTen}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsTen", e.target.value);
                                            formik.setFieldValue("emissionTwelve", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfPeopleFive) * 0.46).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleTen'} value={values?.noOfPeopleTen}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleTen", e.target.value);
                                            formik.setFieldValue("emissionTwelve", e.target.value === 0 ? 0 : Number(Number(e.target.value) * Number(values?.noOfMinsTen) * 0.46).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionTwelve`} value={values?.emissionTwelve}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    width: 330,
                                    maxWidth: '100%',
                                    boxShadow: 'lg',
                                    marginY: '16px'
                                }}
                            >
                                <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                                    <Icon component={GiVideoConference} sx={{ fontSize: 60, color: 'black' }} />
                                    <Typography variant="h6" sx={{ marginY: 1 }}>Video Conferencing</Typography>
                                    <TextField size='small' type="number" name={'noOfMinsEleven'} value={values?.noOfMinsEleven}
                                        label="No of Minutes"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfMinsEleven", e.target.value);
                                            formik.setFieldValue("emissionThirteen", e.target.value === 0 ? 0 : Number((Number(e.target.value) * Number(values?.noOfPeopleEleven) * 2.7) / 1000).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" name={'noOfPeopleEleven'} value={values?.noOfPeopleEleven}
                                        label="No of People"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(e) => {
                                            formik.setFieldValue("noOfPeopleEleven", e.target.value);
                                            formik.setFieldValue("emissionThirteen", e.target.value === 0 ? 0 : Number((Number(e.target.value) * Number(values?.noOfPeopleEleven) * 2.7) / 1000).toFixed(2));
                                            formik.handleSubmit();
                                        }}
                                        inputProps={{ style: { color: 'black' } }}
                                        sx={{ marginTop: 2 }}
                                    />
                                    <TextField size='small' type="number" disabled name={`emissionThirteen`} value={values?.emissionThirteen}
                                        label="Emissions"
                                        variant="outlined"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        sx={{ marginTop: 2 }}
                                    />
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                    <Grid>
                        <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>
                            <Stack direction={"row"} spacing={2}><Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => { formik.handleSubmit(); setValue(value + 1); }} className='custom-btn'>Save and Next Page</Button><Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete(); }} color='error'>Clear</Button></Stack>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} marginTop={3}><Typography color='white' className='text-center'>{`Total Virtual Event Carbon Footprint = ${totalEmission} `}kgCO<sub>2</sub>e</Typography></Grid>
                    </Grid>
                </Card>
            </Container>
        </div>
    );
};
export default VirtualEvent;