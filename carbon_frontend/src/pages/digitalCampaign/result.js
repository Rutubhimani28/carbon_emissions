import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SendMail from './sendMail';
import { deleteCampaignData } from '../../redux/slice/totalDigitalCampaignSlice';

const Result = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const allDigitalCampaignData = useSelector((state) => state?.totalDigitalCampaignDetails);

    const total = Number(allDigitalCampaignData?.totalEmission);
    const toolData = useSelector(state => state.toolDetails?.data);
    const toolFormData = toolData?.find((item) => item.type === 'toolForm');

    const resultData = [
        {
            type: 'Digital Campaign',
            totalEmission: allDigitalCampaignData?.totalEmission
        }
    ];

    const data = {
        "totalDigitalCampaign": allDigitalCampaignData?.totalEmission,
        "grandTotal": total
    };

    const handeleDelete = () => {
        dispatch(deleteCampaignData());
    };

    return (
        <div>
            <SendMail open={open} close={() => setOpen(false)} datas={data} />

            {/* <Container maxWidth>
                <Card className='custom-inner-bg'>
                    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>

                        <Box color='white'>
                            <h3 className='text-center py-3 fw-bold green'>Your Carbon Footprint :</h3>
                            <table>
                                {
                                    resultData?.length > 0 && resultData?.map((item) => (
                                        <tr>
                                            <th>{item?.type}</th>
                                            <td align='right' className='ps-4'>{item?.totalEmission}</td>
                                            <td className='ps-1'>kkgCO<sub>2</sub>e</td>
                                        </tr>
                                    ))
                                }
                            </table>
                            <h4 className='text-center py-3 fw-bold mt-1'>Total To Offset = {total} kgCO<sub>2</sub>e</h4>
                        </Box>
                    </div>
                    <div className='d-flex justify-content-end p-3'>
                        <Stack direction={"row"} spacing={2}>
                            <Button variant='contained' onClick={() => setOpen(true)} className='custom-btn'>Send Mail</Button>
                            <Button variant='outlined' color='error' onClick={handeleDelete}>Clear</Button>
                        </Stack>
                    </div>
                </Card>
            </Container> */}
            <Container maxWidth>
                <Card className='custom-inner-bg'>
                    <Box color='white' style={{ padding: "20px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: 'center' }}>
                        <h3 className='text-center py-3 fw-bold green'>Your Carbon Footprint :</h3>
                        <table>
                            <tr className='fs-4'>
                                <th>Category</th>
                                <th className='ps-4'>Emissions (kgCO<sub>2</sub>e)</th>
                            </tr>
                            {
                                resultData?.length > 0 && resultData?.map((item) => (
                                    <tr>
                                        <th>{item?.type}</th>
                                        {/* <td align='right' className='ps-4'>{item?.totalEmission}</td> */}
                                        <td className='ps-4'>{`${item?.totalEmission || 0}  `}kgCO<sub>2</sub>e</td>
                                    </tr>
                                ))
                            }
                        </table>
                        <Typography className='text-center py-1 fw-bold mt-3 fs-5'>Total {total} kgCO<sub>2</sub>e Carbon Footprint generated from your {toolFormData?.activityName} </Typography>
                        <Typography className='text-center py-1 fw-bold mt-1 fs-5'>Total tCO<sub>2</sub>e = {(total / 1000).toFixed(2)} tCO<sub>2</sub>e</Typography>
                        <Typography className='text-center py-1 fw-bold mt-1 fs-5'>For every 1 kgCO<sub>2</sub>e generated you are spending {`${toolFormData.budget}`}$</Typography>
                        <Typography className='text-center py-1 fw-bold mt-4 fs-6'>Note: Source of the calculation will be shared to the designated company representative during the auditing.</Typography>
                        <Typography className='text-center py-1 fw-bold mt-2 fs-5'>Do you want to change any data? If no, please click on Submit and enter your email id to get the data on your business email.</Typography>
                    </Box>
                    <div className='d-flex justify-content-end p-3'>
                        <Stack direction={"row"} spacing={2}>
                            <Button variant='contained' onClick={() => setOpen(true)} className='custom-btn'>Submit</Button>
                            <Button variant='outlined' color='error' onClick={handeleDelete}>Clear</Button>
                        </Stack>
                    </div>
                </Card>
            </Container>
        </div>
    )
}

export default Result;