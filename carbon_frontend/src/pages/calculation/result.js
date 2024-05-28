import { Box, Button, Card, Container, Stack } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SendMail from './sendMail';

const Result = () => {
    const [open, setOpen] = useState(false);
    const allData = useSelector((state) => state?.totalDigitalContentDetails)

    const total = 0 + 0 + 0 + 0 + allData?.totalEmission + 0 + 0 + 0

    return (
        <div>
            <SendMail open={open} close={() => setOpen(false)} />

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
                                    <td align='right' className='ps-4'>0 </td>
                                    <td className='ps-1'>metric tons of CO2e</td>
                                </tr>
                                <tr>
                                    <th>Food</th>
                                    <td align='right' className='ps-4'>0</td>
                                    <td className='ps-1'>metric tons of CO2e</td>
                                </tr>
                                <tr>
                                    <th>Energy Updated</th>
                                    <td align='right' className='ps-4'>0</td>
                                    <td className='ps-1'>metric tons of CO2e</td>
                                </tr>
                                <tr>
                                    <th>Travel</th>
                                    <td align='right' className='ps-4'>0</td>
                                    <td className='ps-1'>metric tons of CO2e</td>
                                </tr>
                                <tr>
                                    <th>Digital Content</th>
                                    <td align='right' className='ps-4'>{allData?.totalEmission}</td>
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
                            <h4 className='text-center py-3 fw-bold'>Total = {total} metric tons of CO2e</h4>
                        </Box>
                    </div>
                    <div className='d-flex justify-content-end p-3'>
                        <Stack direction={"row"} spacing={2}>
                            <Button variant='contained' onClick={() => setOpen(true)}>Send Mail</Button>
                            <Button variant='outlined' color='error'>Clear</Button>
                        </Stack>
                    </div>
                </Card>
            </Container>
        </div >
    )
}

export default Result
