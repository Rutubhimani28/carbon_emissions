import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Card, Container, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { addCampaignData, deleteCampaignData } from '../../redux/slice/totalCampaignSlice';
import CampaignImg from '../../assets/production.png';
import { IconDiv } from '../../components/IconDiv';

const Campaign = (props) => {
    const { setValue, value } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const allData = useSelector((state) => state?.totalCampaignDetails?.data[0]?.data);
    const totalEmission = useSelector((state) => state?.totalCampaignDetails?.totalEmission);

    const initialValues = {
        imgSize: 0,
        deviceEnergy1: 0,       // 0.01(imgSize/60)        
        somePlatformEnergy1: 0, // =(0.4/1000)*imgSize        
        networkEnergy1: 0,      // =(0.2/1000)*imgSize        
        totalEnergy1: 0,        // = deviceEnergy1 + somePlatformEnergy1 + networkEnergy1        
        efOne: 0,               // = totalEnergy1*0.43        
        impressionsOne: 0,
        emissionOne: 0,         // imgSize * impressionsOne * efOne
        videoSize: 0,
        videoMins: 0, deviceEnergy2: 0,  // = 0.01*( videoMins/60)        
        somePlatformEnergy2: 0,          // = ( videoSize/1000)*0.4           
        networkEnergy2: 0,              // = (0.2/1000)* videoSize        
        totalEnergy2: 0,                // =  deviceEnergy2 + somePlatformEnergy2 + networkEnergy2        
        efTwo: 0,                       // = totalEnergy2*0.43        
        impressionsTwo: 0,
        emissionTwo: 0,                 // videoSize * videoMins * impressionsTwo * efTwo
        noOfEmails: 0,                  // efThree: 0,        emissionThree: 0,
        attachmentSize: 0,              // efFour: 0,        emissionFour: 0,    
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            formik.setFieldValue('emissionOne', values?.imgSize === 0 || values?.impressionsOne === 0 || values?.efOne === 0 ? 0 : Number((values?.imgSize * values?.impressionsOne * values?.efOne).toFixed(2)));
            formik.setFieldValue('emissionTwo', values?.videoSize === 0 || values?.videoMins === 0 || values?.impressionsTwo === 0 || values?.efTwo === 0 ? 0 : Number((values?.videoSize * values?.videoMins * values?.impressionsTwo * values?.efTwo).toFixed(2)));
            formik.setFieldValue('emissionThree', values?.noOfEmails === 0 ? 0 : Number(((values?.noOfEmails * 4) / 1000).toFixed(2)));
            formik.setFieldValue('emissionFour', values?.attachmentSize === 0 ? 0 : Number(((values?.attachmentSize * 50) / 1000).toFixed(2)));

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
                    emission: values?.imgSize === 0 || values?.impressionsOne === 0 || values?.efOne === 0 ? 0 : Number((values?.imgSize * values?.impressionsOne * values?.efOne).toFixed(2))
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
                    emission: values?.videoSize === 0 || values?.videoMins === 0 || values?.impressionsTwo === 0 || values?.efTwo === 0 ? 0 : Number((values?.videoSize * values?.videoMins * values?.impressionsTwo * values?.efTwo).toFixed(2))
                },
                {
                    name: 'Emails',
                    noOfEmails: values?.noOfEmails,
                    emission: values?.noOfEmails === 0 ? 0 : Number(((values?.noOfEmails * 4) / 1000).toFixed(2))
                },
                {
                    name: 'Email Attachment',
                    attachmentSize: values?.attachmentSize,
                    emission: values?.attachmentSize === 0 ? 0 : Number(((values?.attachmentSize * 50) / 1000).toFixed(2))
                }
            ];
            dispatch(addCampaignData({ data }));
        },
    });

    const handeleDelete = () => {
        dispatch(deleteCampaignData());
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

    return (
        <div>
            <Container maxWidth>
                <Card className='p-3 custom-inner-bg' style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                    <Box mx={useMediaQuery(theme.breakpoints.up('lg')) && 15} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                        <IconDiv>
                            <img width={100} src={CampaignImg} alt="Food" />
                        </IconDiv>
                        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                            <Grid item xs={12} sm={6} md={6}>
                                <Box>
                                    <Typography variant='h6' className='text-center text-white'>Emails Campaign</Typography>
                                    <div className='table-responsive'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th />
                                                <th className='ps-2'>No of Emails</th>
                                                <th className='ps-2'>Emission (kgCO2e)</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Emails</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name={'noOfEmails'} value={formik.values?.noOfEmails} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={`emissionThree`} value={formik.values?.emissionThree} onChange={formik.handleChange} /></td>
                                            </tr>
                                        </table>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Box>
                                    <Typography variant='h6' className='text-center text-white'>Emails Campaign</Typography>
                                    <div className='table-responsive'>
                                        <table className='table-custom-inpt-field'>
                                            <tr>
                                                <th />
                                                <th className='ps-2'>Attachment Size</th>
                                                <th className='ps-2'>Emission (kgCO2e)</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Email Attachment</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name={'attachmentSize'} value={formik.values?.attachmentSize} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={`emissionFour`} value={formik.values?.emissionFour} onChange={formik.handleChange} /></td>
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
                                                <th className='ps-2'>Image Size (in Mb)</th>
                                                <th className='ps-2'>Device Energy</th>
                                                <th className='ps-2'>SoMe Platform Energy</th>
                                                <th className='ps-2'>Network Energy</th>
                                                <th className='ps-2'>Total Energy</th>
                                                <th className='ps-2'>Emissions</th>
                                                <th className='ps-2'>Impressions</th>
                                                <th className='ps-2'>Total Emissions (kgCO2e)</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Image</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name={'imgSize'} value={formik.values?.imgSize} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={'deviceEnergy1'} value={formik.values?.deviceEnergy1} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={'somePlatformEnergy1'} value={formik.values?.somePlatformEnergy1} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={'networkEnergy1'} value={formik.values?.networkEnergy1} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={'totalEnergy1'} value={formik.values?.totalEnergy1} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={'efOne'} value={formik.values?.efOne} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name={'impressionsOne'} value={formik.values?.impressionsOne} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={'emissionOne'} value={formik.values?.emissionOne} onChange={formik.handleChange} /></td>
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
                                                <th className='ps-2'>Total Emissions (kgCO2e)</th>
                                            </tr>
                                            <tr>
                                                <td className='ps-2 py-1'>Video</td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name={'videoSize'} value={formik.values?.videoSize} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>                                                <td className='ps-2 py-1'><TextField size='small' type="number" name={'videoMins'} value={formik.values?.videoMins} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={'deviceEnergy2'} value={formik.values?.deviceEnergy2} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={'somePlatformEnergy2'} value={formik.values?.somePlatformEnergy2} onChange={(e) => { formik.setFieldValue(); formik.setFieldValue(); }} inputProps={{ style: { color: 'white' } }} /></td>                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={'networkEnergy2'} value={formik.values?.networkEnergy2} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={'totalEnergy2'} value={formik.values?.totalEnergy2} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={'efTwo'} value={formik.values?.efTwo} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>
                                                <td className='ps-2 py-1'><TextField size='small' type="number" name={'impressionsTwo'} value={formik.values?.impressionsTwo} onChange={formik.handleChange} inputProps={{ style: { color: 'white' } }} /></td>                                                <td className='ps-2 py-1'><TextField size='small' type="number" disabled name={'emissionTwo'} value={formik.values?.emissionTwo} onChange={formik.handleChange} /></td>                                            </tr>                                        </table>                                    </div>                                </Box>                            </Grid>                            <Grid item xs={12} sm={12} md={12} display={"flex"} justifyContent={"center"}>                                <Stack direction={"row"} spacing={2}>                                    <Button variant='contained' onClick={() => { formik.handleSubmit(); }} className='custom-btn'>Calculate and Add To Footprint</Button>
                                                    <Button variant='outlined' onClick={() => { formik.resetForm(); handeleDelete(); }} color='error'>Clear</Button>
                                                    <Button variant='contained' endIcon={<FaAngleDoubleRight />} onClick={() => setValue(9)} className='custom-btn'>Go To Result</Button>
                                                </Stack>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} marginTop={3}>
                                <Typography color='white'>{`Total Food and Beverages Footprint = ${totalEmission}  tons of kgCO2e`}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Container>
        </div>);
};
export default Campaign;