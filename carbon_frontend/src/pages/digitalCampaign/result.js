import { Box, Button, Card, Container, Stack } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SendMail from './sendMail';
import { deleteCampaignData } from '../../redux/slice/totalDigitalCampaignSlice';

const Result = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const allDigitalCampaignData = useSelector((state) => state?.totalDigitalCampaignDetails);

    const total = Number(allDigitalCampaignData?.totalEmission);

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

            <Container maxWidth>
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
                                            <td className='ps-1'>tons of kgCO2e</td>
                                        </tr>
                                    ))
                                }
                            </table>
                            <h4 className='text-center py-3 fw-bold mt-1'>Total To Offset = {total}  tons of kgCO2e</h4>
                        </Box>
                    </div>
                    <div className='d-flex justify-content-end p-3'>
                        <Stack direction={"row"} spacing={2}>
                            <Button variant='contained' onClick={() => setOpen(true)} className='custom-btn'>Send Mail</Button>
                            <Button variant='outlined' color='error' onClick={handeleDelete}>Clear</Button>
                        </Stack>
                    </div>
                </Card>
            </Container>
        </div>
    )
}

export default Result;