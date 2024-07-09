import { Box, Button, Card, Container, Grid, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLogisticsData } from '../../redux/slice/totalAirFreightSlice';
import { deleteAirTravelData } from '../../redux/slice/totalAirTravelSlice';
import { deleteData } from '../../redux/slice/totalDigitalContSlice';
import { deleteEnergyData } from '../../redux/slice/totalEnergyUpdatedSlice';
import { deleteFoodData } from '../../redux/slice/totalFoodSlice';
import { deleteHotelData } from '../../redux/slice/totalHotelSlice';
import { deleteLocalTranspotationData } from '../../redux/slice/totalLocalTranspotationSlice';
import { deleteProductionData } from '../../redux/slice/totalProductionSlice';
import { deleteWasteData } from '../../redux/slice/totalWasteSlice';
import CustomBarChart from './barChart';
import SendMail from './sendMail';

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

    const toolData = useSelector(state => state.toolDetails?.data);
    const toolFormData = toolData?.find((item) => item.type === 'toolForm');

    const resultTableData = useSelector(state => state.resultTableDataDetails);

    let scope1Count = 0;
    let scope2Count = 0;
    let scope3Count = 0;

    const allFieldsData = [allDigitalContentData, allFreightData, allEnergyData, allFoodData, allWasteData, allProductionData, allLocalTranspotationData, allAirTravelData, allHotelData];

    allFieldsData?.forEach((item) => {
        if (item.scope === 1 || item.scope1 === 1 || item.scope2 === 1 || item.scope3 === 1) {
            scope1Count += 1;
        } else if (item.scope === 2 || item.scope1 === 2 || item.scope2 === 2 || item.scope2 === 2) {
            scope2Count += 1;
        } else {
            scope3Count += 1;
        }
    });

    const total = Number(allProductionData?.totalEmission) + Number(allFreightData?.totalEmission) + Number(allFoodData?.totalEmission) + Number(allEnergyData?.totalEmission) + Number(allAirTravelData?.totalEmission) + Number(allDigitalContentData?.totalEmission) + Number(allLocalTranspotationData?.totalEmission) + Number(allHotelData?.totalEmission) + Number(allWasteData?.totalEmission)

    const chartData = [
        Number(allAirTravelData?.totalEmission) || 0,
        Number(allLocalTranspotationData?.totalEmission) || 0,
        Number(allHotelData?.totalEmission) || 0,
        Number(allFoodData?.totalEmission) || 0,
        Number(allFreightData?.totalEmission) || 0,
        Number(allProductionData?.totalEmission) || 0,
        Number(allEnergyData?.totalEmission) || 0,
        Number(allDigitalContentData?.totalEmission) || 0,
        Number(allWasteData?.totalEmission) || 0,
    ];

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
            type: 'Food & Beverages',
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
            type: 'Digital Comms',
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

    const chartOptions = {
        // labels: resultData.map(item => item.type),
        labels: ['Scope.1', 'Scope.2', 'Scope.3'],
        colors: ['#008FFB', '#00E396', '#FEB019'],
        chart: { type: "donut" },
        legend: {
            position: 'bottom'
        },
        dataLabels: { enabled: true },
        tooltip: { enabled: true },
        plotOptions: {
            pie: {
                expandOnClick: false,
                donut: {
                    size: "75%",
                    labels: {
                        show: false,
                        name: { show: false },
                        // total: {
                        //     show: true,
                        //     showAlways: true,
                        //     formatter: (w) => {
                        //         const totals = w.globals.seriesTotals;

                        //         const result = totals.reduce((a, b) => a + b, 0);

                        //         return (result / 1000).toFixed(3);
                        //     }
                        // }
                    }
                }
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const chartSeries = [
        // {
        //     label: 'Scope.1',
        //     data: [scope1Count || 0]
        // },
        // {
        //     label: 'Scope.2',
        //     data: [scope2Count || 0]
        // },
        // {
        //     label: 'Scope.3',
        //     data: [scope3Count || 0]
        // }
        scope1Count, scope2Count, scope3Count
    ];

    return (
        <div>
            <SendMail open={open} close={() => setOpen(false)} datas={data} setOpen />

            <Container maxWidth>
                <Card className='custom-inner-bg'>
                    {/* 1 in row */}
                    {/* <Box color='white' style={{ padding: "20px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: 'center' }}>
                        {resultTableData?.data?.map((page, pageIndex) => (
                            <div key={pageIndex}>
                                <h3>{page?.tabTitle}</h3>
                                {page?.tabData?.map((flightClass, classIndex) => (
                                    <div key={classIndex}>
                                        <h4>{flightClass?.subType}</h4>
                                        <table>
                                            <thead>
                                                <tr>
                                                    {flightClass?.subTypeData?.th?.map((header, headerIndex) => (
                                                        <th key={headerIndex}>{header}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {flightClass?.subTypeData?.td?.map((rowData, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        <td>{rowData?.journeyType}</td>
                                                        <td>{rowData?.noOfTrips}</td>
                                                        <td>{rowData?.emmissions}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </Box> */}

                    {/* more in 1 row */}
                    {/* <Box color='white' style={{ padding: "20px", display: "flex", justifyContent: "center", alignItems: 'center' }}>
                        <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                            {resultTableData?.data?.map((page, pageIndex) => (
                                <div key={pageIndex} style={{ margin: "20px" }}>
                                    <h3>{page.tabTitle}</h3>
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        {page.tabData.map((flightClass, classIndex) => (
                                            <div key={classIndex} style={{ margin: "10px", width: "45%" }}>
                                                <h4>{flightClass.subType}</h4>
                                                <table style={{ width: "100%" }}>
                                                    <thead>
                                                        <tr>
                                                            {flightClass.subTypeData.th.map((header, headerIndex) => (
                                                                <th key={headerIndex}>{header}</th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {flightClass.subTypeData.td.map((rowData, rowIndex) => (
                                                            <tr key={rowIndex}>
                                                                <td>{rowData.journeyType}</td>
                                                                <td>{rowData.noOfTrips}</td>
                                                                <td>{rowData.emmissions}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Box> */}

                    {/* more in 1 row, html */}
                    {/* <Box color='white' style={{ padding: "20px", display: "flex", justifyContent: "space-around", alignItems: 'center' }}>
                        <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                            {resultTableData?.data?.map((page, pageIndex) => (
                                <div key={pageIndex} style={{ margin: "20px" }}>
                                    {page?.tabData.some(flightClass =>
                                        flightClass?.subTypeData?.td?.some(rowData =>
                                            rowData.noOfTrips !== "" && rowData.emmissions !== ""
                                        )
                                    ) && (
                                            <>
                                                <h3>{page.tabTitle}</h3>
                                                <div style={{ display: "flex", justifyContent: "space-around" }}>
                                                    {page?.tabData?.map((flightClass, classIndex) => (
                                                        <div key={classIndex} style={{ margin: "10px", width: "45%" }}>
                                                            {flightClass?.subTypeData?.td?.some(rowData =>
                                                                rowData.noOfTrips !== "" && rowData.emmissions !== ""
                                                            ) && (
                                                                    <>
                                                                        <h4>{flightClass.subType}</h4>
                                                                        <table style={{ width: "100%" }}>
                                                                            <thead>
                                                                                <tr>
                                                                                    {flightClass?.subTypeData?.th?.map((header, headerIndex) => (
                                                                                        <th key={headerIndex}>{header}</th>
                                                                                    ))}
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {flightClass?.subTypeData?.td?.map((rowData, rowIndex) => (
                                                                                    rowData.noOfTrips !== "" && rowData.emmissions !== "" && (
                                                                                        <tr key={rowIndex}>
                                                                                            <td>{rowData.journeyType}</td>
                                                                                            <td>{rowData.noOfTrips}</td>
                                                                                            <td>{rowData.emmissions}</td>
                                                                                        </tr>
                                                                                    )
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </>
                                                                )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                </div>
                            ))}
                        </div>
                    </Box> */}

                    {/* <Box style={{ display: "flex", justifyContent: "space-around", width: "100%", color: 'white' }}> */}
                    <Box style={{ width: "100%", color: 'white' }}>
                        {resultTableData?.data?.map((page, pageIndex) => (
                            <Box key={pageIndex} style={{ margin: "20px" }}>
                                {page?.tabData.some(flightClass =>
                                    flightClass?.subTypeData?.td?.some(rowData =>
                                        rowData.noOfTrips !== "" && rowData.emmissions !== ""
                                    )
                                ) && (
                                        <>
                                            <Typography className='fs-3 text-center mt-1'>{page.tabTitle}</Typography>
                                            <Box className="d-flex justify-content-around">
                                                {page?.tabData?.map((flightClass, classIndex) => (
                                                    <Box key={classIndex} style={{ margin: "10px", width: "45%" }}>
                                                        {flightClass?.subTypeData?.td?.some(rowData =>
                                                            rowData.noOfTrips !== "" && rowData.emmissions !== ""
                                                        ) && (
                                                                <>
                                                                    <Typography className='fs-5 mb-1'>{flightClass.subType}</Typography>
                                                                    <table style={{ width: "100%", border: '1px solid white' }}>
                                                                        <thead>
                                                                            <tr>
                                                                                {flightClass?.subTypeData?.th?.map((header, headerIndex) => (
                                                                                    <th key={headerIndex}>{header}</th>
                                                                                ))}
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {page.tabTitle === "Air Travel" &&
                                                                                flightClass?.subTypeData?.td?.map((rowData, rowIndex) => (
                                                                                    rowData.noOfTrips !== "" && rowData.emmissions !== "" && (
                                                                                        <tr key={rowIndex}>
                                                                                            <td>{rowData.journeyType}</td>
                                                                                            <td>{rowData.noOfTrips}</td>
                                                                                            <td>{rowData.emmissions}</td>
                                                                                        </tr>
                                                                                    )
                                                                                ))}
                                                                        {page.tabTitle === "Local Transportation" &&
                                                                            flightClass?.subTypeData?.td?.map((rowData, rowIndex) => (
                                                                                rowData.noOfTrips !== "" && rowData.emmissions !== "" && (
                                                                                    <tr key={rowIndex}>
                                                                                        <td>{rowData.journeyType}</td>
                                                                                        <td>{rowData.noOfKms}</td>
                                                                                        <td>{rowData.emmissions}</td>
                                                                                    </tr>
                                                                                )
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </>
                                                            )}
                                                    </Box>
                                                ))}
                                            </Box>
                                        </>
                                    )}
                            </Box>
                        ))}
                    </Box>


                    <Box color='white' style={{ padding: "20px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: 'center' }}>
                        <h3 className='text-center py-3 fw-bold text-white'>Total Carbon Footprint :</h3>
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
                        {/* <Typography className='text-center py-1 fw-bold mt-3 fs-5'>Total To Offset = {total} kgCO<sub>2</sub>e</Typography> */}
                        <Typography className='text-center py-1 fw-bold mt-3 fs-5'>Total {Number(total).toFixed(2)} kgCO<sub>2</sub>e Carbon Footprint generated from your {toolFormData?.activityName} activity</Typography>
                        <Typography className='text-center py-1 fw-bold mt-1 fs-5'>Total tCO<sub>2</sub>e = {(total / 1000).toFixed(3)} tCO<sub>2</sub>e</Typography>
                        <Typography className='text-center py-1 fw-bold mt-1 fs-5'>For every $ you spend you are generating {`${(total / toolFormData?.budget).toFixed(3)}`} kgCO<sub>2</sub>e</Typography>
                        <Grid container pt={8} className='d-flex justify-content-center'>
                            <Grid item xs={12} sm={10} md={10}>
                                <CustomBarChart chartData={chartData} />
                            </Grid>
                            {/* <Grid item xs={12} sm={4} md={4} >
                                <ReactApexChart options={chartOptions} series={chartSeries} type="donut" height={300} />
                            </Grid> */}
                        </Grid>
                        <Typography className='text-center py-1 fw-bold mt-2 fs-5'>Do you want to change any data? If no, please click on Submit.</Typography>
                    </Box>
                    <div className='d-flex justify-content-end p-3'>
                        <Stack direction={"row"} spacing={2}>
                            <Button variant='contained' onClick={() => setOpen(true)} className='custom-btn'>Submit</Button>
                            {/* <Button variant='outlined' color='error' onClick={handeleDelete}>Clear</Button> */}
                        </Stack>
                    </div>
                </Card>
            </Container>
        </div>
    )
}

export default Result
