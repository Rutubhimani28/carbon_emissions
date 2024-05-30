import { Box, Button, Card, Container, Stack } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SendMail from './sendMail';
import { deleteData } from '../../redux/slice/totalDigitalContSlice';
import { deleteAirFreightData } from '../../redux/slice/totalAirFreightSlice';
import { deleteEnergyData } from '../../redux/slice/totalEnergyUpdatedSlice';
import { deleteFoodData } from '../../redux/slice/totalFoodSlice';

const Result = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const allDigitalContentData = useSelector((state) => state?.totalDigitalContentDetails)
    const allFreightData = useSelector((state) => state?.totalAirFreightDetails)
    const allEnergyData = useSelector((state) => state?.totalEnergyUpdatedDetails)
    const allFoodData = useSelector((state) => state?.totalFoodDetails);
    const allWasteData = useSelector((state) => state?.totalWasteDetails);

    const total = 0 + parseFloat(allFreightData?.totalEmission) + parseFloat(allFoodData?.totalEmission) + parseFloat(allEnergyData?.totalEmission) + parseFloat(allDigitalContentData?.totalEmission) + 0 + 0 + parseFloat(allWasteData?.totalEmission)

    const resultData = [
        {
            type: 'Production',
            totalEmission: 0
        },
        {
            type: 'Logistics',
            totalEmission: allFreightData?.totalEmission
        },
        {
            type: 'Food',
            totalEmission: allFoodData?.totalEmission
        },
        {
            type: 'Energy',
            totalEmission: allEnergyData?.totalEmission
        },
        {
            type: 'Travel',
            totalEmission: 0
        },
        {
            type: 'Digital',
            totalEmission: allDigitalContentData?.totalEmission
        },
        {
            type: 'Local Transportation',
            totalEmission: 0
        },
        {
            type: 'Accomodation',
            totalEmission: 0
        },
        {
            type: 'Waste',
            totalEmission: allWasteData?.totalEmission
        },
    ]

    const data = {
        "totalWaste": allWasteData?.totalEmission,
        "totalAccomodation": "0",
        "totalLocalTransportation": "0",
        "totalDIgitalContent": allDigitalContentData?.totalEmission,
        "totlaTravel": "0",
        "totalEnergyUpdated": allEnergyData?.totalEmission,
        "totalFood": allFoodData?.totalEmission,
        "totalAirFreight": allFreightData?.totalEmission,
        "totlaProduction": "0",
        "grandTotal": total
    }

    const handeleDelete = () => {
        dispatch(deleteData())
        dispatch(deleteAirFreightData())
        dispatch(deleteEnergyData())
        dispatch(deleteFoodData())
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
                            <h4 className='text-center py-3 fw-bold'>Total To Offset = {total}  tons of kgCO2e</h4>
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
