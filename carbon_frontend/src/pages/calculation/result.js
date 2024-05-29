import { Box, Button, Card, Container, Stack } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SendMail from './sendMail';
import { deleteData } from '../../redux/slice/totalDigitalContSlice';
import { deleteAirFreightData } from '../../redux/slice/totalAirFreightSlice';
import { deleteEnergyData } from '../../redux/slice/totalEnergyUpdatedSlice';

const Result = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const allDigitalContentData = useSelector((state) => state?.totalDigitalContentDetails)
    const allFreightData = useSelector((state) => state?.totalAirFreightDetails)
    const allEnergyData = useSelector((state) => state?.totalEnergyUpdatedDetails)

    const total = 0 + allFreightData?.totalEmission + 0 + allEnergyData?.totalEmission + allDigitalContentData?.totalEmission + 0 + 0 + 0

    const data = {
        "totalWaste": "0",
        "totalAccomodation": "0",
        "totalLocalTransportation": "0",
        "totalDIgitalContent": allDigitalContentData?.totalEmission,
        "totlaTravel": "0",
        "totalEnergyUpdated": allEnergyData?.totalEmission,
        "totalFood": "0",
        "totalAirFreight": allFreightData?.totalEmission,
        "totlaProduction": "0",
        "grandTotal": total
    }

    const handeleDelete = () => {
        dispatch(deleteData())
        dispatch(deleteAirFreightData())
        dispatch(deleteEnergyData())
    }
    return (
        <div>
            <SendMail open={open} close={() => setOpen(false)} datas={data} />

            <Container maxWidth>
                <Card>
                    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>

                        <Box >
                            <h4 className='text-center py-3 fw-bold green'>Your Carbon Footprint :</h4>
                            <table>
                                <tr>
                                    <th>Production</th>
                                    <td align='right' className='ps-4'>0</td>
                                    <td className='ps-1'>metric tons of CO2e</td>
                                </tr>
                                <tr>
                                    <th>Air Freight</th>
                                    <td align='right' className='ps-4'>{allFreightData?.totalEmission}</td>
                                    <td className='ps-1'>metric tons of CO2e</td>
                                </tr>
                                <tr>
                                    <th>Food</th>
                                    <td align='right' className='ps-4'>0</td>
                                    <td className='ps-1'>metric tons of CO2e</td>
                                </tr>
                                <tr>
                                    <th>Energy Updated</th>
                                    <td align='right' className='ps-4'>{allEnergyData?.totalEmission}</td>
                                    <td className='ps-1'>metric tons of CO2e</td>
                                </tr>
                                <tr>
                                    <th>Travel</th>
                                    <td align='right' className='ps-4'>0</td>
                                    <td className='ps-1'>metric tons of CO2e</td>
                                </tr>
                                <tr>
                                    <th>Digital Content</th>
                                    <td align='right' className='ps-4'>{allDigitalContentData?.totalEmission}</td>
                                    <td className='ps-1'> metric tons of CO2e</td>
                                </tr>
                                <tr>
                                    <th>Local Transportation</th>
                                    <td align='right' className='ps-4'>0</td>
                                    <td className='ps-1'>metric tons of CO2e</td>
                                </tr>
                                <tr>
                                    <th>Accomodation</th>
                                    <td align='right' className='ps-4'>0</td>
                                    <td className='ps-1'>metric tons of CO2e</td>
                                </tr>
                                <tr>
                                    <th>Waste</th>
                                    <td align='right' className='ps-4'>0</td>
                                    <td className='ps-1'>metric tons of CO2e</td>
                                </tr>
                            </table>
                            <h4 className='text-center py-3 fw-bold'>Total To Offset = {total} metric tons of CO2e</h4>
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
        </div >
    )
}

export default Result
