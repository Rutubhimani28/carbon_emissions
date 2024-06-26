import { Box, Button, Card, Container, Stack } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SendMail from './sendMail';
import { deleteData } from '../../redux/slice/totalDigitalContSlice';
import { deleteLogisticsData } from '../../redux/slice/totalAirFreightSlice';
import { deleteEnergyData } from '../../redux/slice/totalEnergyUpdatedSlice';
import { deleteFoodData } from '../../redux/slice/totalFoodSlice';
import { deleteWasteData } from '../../redux/slice/totalWasteSlice';
import { deleteLocalTranspotationData } from '../../redux/slice/totalLocalTranspotationSlice';
import { deleteProductionData } from '../../redux/slice/totalProductionSlice';
import { deleteAirTravelData } from '../../redux/slice/totalAirTravelSlice';
import { deleteHotelData } from '../../redux/slice/totalHotelSlice';

const Result = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const allDigitalContentData = useSelector((state) => state?.totalDigitalContentDetails)
    const allFreightData = useSelector((state) => state?.totalAirFreightDetails)
    const allEnergyData = useSelector((state) => state?.totalEnergyUpdatedDetails)
    const allFoodData = useSelector((state) => state?.totalFoodDetails);
    const allWasteData = useSelector((state) => state?.totalWasteDetails);
    const allProductionData = useSelector((state) => state?.totalProductionDetails);
    const allLocalTranspotationData = useSelector((state) => state?.totalLocalTranspotationDetails);
    const allAirTravelData = useSelector((state) => state?.totalAirTravelDetails);
    const allHotelData = useSelector((state) => state?.totalHotelDetails);

    const total = Number(allProductionData?.totalEmission) + Number(allFreightData?.totalEmission) + Number(allFoodData?.totalEmission) + Number(allEnergyData?.totalEmission) + Number(allAirTravelData?.totalEmission) + Number(allDigitalContentData?.totalEmission) + Number(allLocalTranspotationData?.totalEmission) + Number(allHotelData?.totalEmission) + Number(allWasteData?.totalEmission)

    const resultData = [
        {
            type: 'Air Travel',
            totalEmission: allAirTravelData?.totalEmission
        },
        {
            type: 'Local Transportation',
            totalEmission: allLocalTranspotationData?.totalEmission
        },
        {
            type: 'Hotel',
            totalEmission: allHotelData?.totalEmission
        },
        {
            type: 'Food',
            totalEmission: allFoodData?.totalEmission
        },
        {
            type: 'Logistics',
            totalEmission: allFreightData?.totalEmission
        },
        {
            type: 'Event Production',
            totalEmission: allProductionData?.totalEmission
        },
        {
            type: 'Energy',
            totalEmission: allEnergyData?.totalEmission
        },
        {
            type: 'Digital',
            totalEmission: allDigitalContentData?.totalEmission
        },
        {
            type: 'Waste',
            totalEmission: allWasteData?.totalEmission
        },
    ]

    const data = {
        "totalAirTravel": allAirTravelData?.totalEmission,
        "totalLocalTransportation": allLocalTranspotationData?.totalEmission,
        "totalHotel": allHotelData?.totalEmission,
        "totalFood": allFoodData?.totalEmission,
        "totalAirFreight": allFreightData?.totalEmission,
        "totlaProduction": allProductionData?.totalEmission,
        "totalEnergyUpdated": allEnergyData?.totalEmission,
        "totalDIgitalContent": allDigitalContentData?.totalEmission,
        "totalWaste": allWasteData?.totalEmission,
        "grandTotal": total
    }

    const handeleDelete = () => {
        dispatch(deleteAirTravelData())
        dispatch(deleteLocalTranspotationData())
        dispatch(deleteHotelData())
        dispatch(deleteFoodData())
        dispatch(deleteLogisticsData())
        dispatch(deleteProductionData())
        dispatch(deleteEnergyData())
        dispatch(deleteData())
        dispatch(deleteWasteData())
    }
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

export default Result
