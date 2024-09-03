import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { Box, Button, Card, CircularProgress, Container, Grid, Stack, Typography, Accordion, AccordionDetails, AccordionSummary, } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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
import { constant } from '../../constant';

const Result = ({ value }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [suggestion, setSuggestion] = useState('');
    const [suggestionForPdf, setSuggestionForPdf] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState('');
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

    const [sc1, setSc1] = useState(0);
    const [sc2, setSc2] = useState(0);
    const [sc3, setSc3] = useState(0);

    const scope1Count = 0;
    const scope2Count = 0;
    const scope3Count = 0;

    const allFieldsData = [allDigitalContentData, allFreightData, allEnergyData, allFoodData, allWasteData, allProductionData, allLocalTranspotationData, allAirTravelData, allHotelData];

    // allFieldsData?.forEach((item) => {
    //     if (item.scope === 1 || item.scope1 === 1 || item.scope2 === 1 || item.scope3 === 1) {
    //         scope1Count += 1;
    //     } else if (item.scope === 2 || item.scope1 === 2 || item.scope2 === 2 || item.scope2 === 2) {
    //         scope2Count += 1;
    //     } else {
    //         scope3Count += 1;
    //     }
    // });

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
    ];

    const validTitles = [
        "Air Travel",
        "Local Transportation",
        "Food & Beverages",
        "Logistics",
        "Event Production",
        "Energy",
        "Digital Comms",
        "Waste",
        "Hotel"
    ];

    const data = {
        "totalAirTravel": Number(allAirTravelData?.totalEmission).toFixed(2),
        "totalLocalTransportation": Number(allLocalTranspotationData?.totalEmission).toFixed(2),
        "totalHotel": Number(allHotelData?.totalEmission).toFixed(2),
        "totalFood": Number(allFoodData?.totalEmission).toFixed(2),
        "totalAirFreight": Number(allFreightData?.totalEmission).toFixed(2),
        "totlaProduction": Number(allProductionData?.totalEmission).toFixed(2),
        "totalEnergyUpdated": Number(allEnergyData?.totalEmission).toFixed(2),
        "totalDIgitalContent": Number(allDigitalContentData?.totalEmission).toFixed(2),
        "totalWaste": Number(allWasteData?.totalEmission).toFixed(2),
        "grandTotal": Number(total).toFixed(2)
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

    // const chartSeries = [scope1Count, scope2Count, scope3Count];
    const chartSeries = [sc1, sc2, sc3];

    const generatePrompt = async () => {
        let contentData = ``;
        let categoryCount = 0;

        resultData?.forEach(item => {
            if (item?.totalEmission > 0) {
                contentData += `${item.type}: ${item.totalEmission || 0} kgCO2e \n`
                categoryCount += 1;
            }
        });

        if (total && Number(total).toFixed(2) > 0) {
            contentData += `\nTotal Carbon Footprint: ${Number(total).toFixed(2)} kgCO2e`
        }
        if (toolFormData?.budget > 0) {
            contentData += `\nThe total marketing budget for this activity is ${toolFormData?.budget} dollar`
        }

        contentData += `\n\nWhat are the top three ways to reduce my face-to-face event's carbon footprint by 10-20%? Suggest one actionable point for all the ${categoryCount} categories to achieve this reduction. How do the original and reduced footprints compare? Additionally, how can adopting sustainable measures lead to an approximate 10% cost reduction, considering that the cost savings may not be directly proportional to the carbon reductions?`
        setContent(contentData);
    };

    const formatSuggestions = (suggestions) => {
        // return suggestions.split('\n').map((line, index) => (
        //     <Typography key={index} paragraph dangerouslySetInnerHTML={{ __html: line.replaceAll("kgCO2e", "kgCO<sub>2</sub>e") }} />
        // ));

        let formattedSuggestions = suggestions.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        formattedSuggestions = formattedSuggestions.replaceAll("Target Reduction:", "<strong>Target Reduction:</strong>");
        formattedSuggestions = formattedSuggestions.replaceAll("Steps:", "<strong>Steps:</strong>");
        formattedSuggestions = formattedSuggestions.replaceAll("kgCO2e", "kgCO<sub>2</sub>e");
        formattedSuggestions = formattedSuggestions.split('\n').map(line => {
            if (line.startsWith('### ') || line.startsWith('#### ')) {
                return `<strong>${line.slice(4)}</strong>`;
            }
            return line;
        }).join('\n');

        let pdfData = `<h3>Suggestions for reducing the Carbon Footprint of your ${toolFormData?.activityName} activity From F2F Event : </h3> `;

        formattedSuggestions.split('\n').forEach((line, index) => {
            pdfData += `${line}<br />`;
        });
        setSuggestionForPdf(pdfData);

        return formattedSuggestions.split('\n').map((line, index) => (
            <Typography key={index} paragraph dangerouslySetInnerHTML={{ __html: line }} />
        ));
    };

    const chat = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    // model: "gpt-3.5-turbo",
                    model: "gpt-4o",
                    messages: [{
                        "role": "user",
                        "content": content
                    }],
                    temperature: 0.7,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${constant.chatKeyOne.replace('skC-', '') + constant.chatKeyTwo.replace('dEf-', '')}`,
                    },
                }
            );

            const resJson = response.data;
            const formattedSuggestions = formatSuggestions(resJson?.choices?.[0]?.message?.content);
            setSuggestion(formattedSuggestions);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let sc1Count = 0;
        let sc2Count = 0;
        let sc3Count = 0;

        resultTableData?.data?.forEach(page => {
            page?.tabData?.forEach(flightClass => {
                const hasFilledRow = flightClass?.subTypeData?.td?.some(rowData => {

                    const rowData2 = rowData;
                    const { noOfTrips, emissions, noOfKms, noOfPax, noOfBottles, kgs, area, noOfUnits, kwh, noOfHour, noOfHours, noOfAttendees, bottle, noOfEmails, attachmentSize, fBType, gallons, dgType, hType, country, energyUtilisedKwh, hotelType, geography, roomsOccupied, meetingDuration, totalMeetingRoomArea } = rowData2;

                    if (page?.tabTitle === "Air Travel") {
                        return noOfTrips && emissions;
                    }
                    if (page?.tabTitle === "Hotel") {
                        if (hType !== "Hotel Stay") {
                            // "Meeting Room Energy Consumption"
                            if (totalMeetingRoomArea && meetingDuration) {
                                return (totalMeetingRoomArea && meetingDuration) && emissions;
                            }
                            return (energyUtilisedKwh) && emissions;
                        }
                        return (geography?.label && country?.country && hotelType?.value && roomsOccupied) && emissions;
                    }
                    if (page?.tabTitle === "Local Transportation") {
                        return noOfKms && emissions;
                    }
                    if (page?.tabTitle === "Food & Beverages") {
                        if ((fBType === "Customised Food" && rowData?.emissions) || (fBType === "Customised Beverages" && rowData?.emissions)) {
                            return true;
                        }
                        return (noOfPax || noOfBottles) && emissions;
                    }
                    if (page?.tabTitle === "Logistics") {
                        return (noOfKms || kgs) && emissions;
                    }
                    if (page?.tabTitle === "Event Production") {
                        return (kgs || area || noOfUnits || kwh || noOfHour) && emissions;
                    }
                    if (page?.tabTitle === "Energy") {
                        return (kwh || gallons) && emissions;
                    }
                    if (page?.tabTitle === "Digital Comms") {
                        if (dgType !== "Laptops used") {
                            return (noOfEmails && attachmentSize) && emissions;
                        };
                        return (noOfHours && noOfAttendees) && emissions;
                    }
                    if (page?.tabTitle === "Waste") {
                        return (kgs || bottle) && emissions;
                    }

                    return false;
                });

                if (hasFilledRow) {
                    if (flightClass?.scope === 1) {
                        sc1Count += 1;
                    } else if (flightClass?.scope === 2) {
                        sc2Count += 1;
                    } else if (flightClass?.scope === 3) {
                        sc3Count += 1;
                    }
                }
            });
        });

        generatePrompt();

        setSc1(sc1Count);
        setSc2(sc2Count);
        setSc3(sc3Count);
    }, [resultTableData, value]);

    useEffect(() => {
        if (content) {
            chat();
        }
    }, [content]);

    return (
        <div>
            <SendMail open={open} close={() => setOpen(false)} datas={data} setOpen chatSuggestion={suggestionForPdf} />

            <Container maxWidth>
                <Card className='custom-inner-bg'>
                    {/* <Box style={{ display: "flex", justifyContent: "space-around", width: "100%", color: 'white' }}> */}
                    {/* <Box style={{ width: "100%", color: 'white' }}>
                        {resultTableData?.data?.map((page, pageIndex) => (
                            validTitles.includes(page.tabTitle) && (
                                <Box key={pageIndex} style={{ margin: "20px" }}>
                                    {page?.tabData.some(flightClass =>
                                        flightClass?.subTypeData?.td?.some(rowData =>
                                            rowData.noOfTrips !== "" && rowData.emissions !== ""
                                        )
                                    ) && (
                                            <>
                                                <Typography className='fs-3 text-center mt-1'>{page.tabTitle}</Typography>
                                                <Box className="d-flex justify-content-around">
                                                    {page?.tabData?.map((flightClass, classIndex) => (
                                                        <Box key={classIndex} style={{ margin: "10px", width: "45%" }}>
                                                            {flightClass?.subTypeData?.td?.some(rowData =>
                                                                rowData.noOfTrips !== "" && rowData.emissions !== ""
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
                                                                                        rowData.noOfTrips !== "" && rowData.emissions !== "" && (
                                                                                            <tr key={rowIndex}>
                                                                                                <td>{rowData.journeyType}</td>
                                                                                                <td>{rowData.noOfTrips}</td>
                                                                                                <td>{rowData.emissions}</td>
                                                                                            </tr>
                                                                                        )
                                                                                    ))}
                                                                                {page.tabTitle === "Local Transportation" &&
                                                                                    flightClass?.subTypeData?.td?.map((rowData, rowIndex) => (
                                                                                        rowData.noOfKms !== "" && rowData.emissions !== "" && (
                                                                                            <tr key={rowIndex}>
                                                                                                <td>{rowData.journeyType}</td>
                                                                                                <td>{rowData.noOfKms}</td>
                                                                                                <td>{rowData.emissions}</td>
                                                                                            </tr>
                                                                                        )
                                                                                    ))}
                                                                                {page.tabTitle === "Food & Beverages" &&
                                                                                    flightClass?.subTypeData?.td?.map((rowData, rowIndex) => (
                                                                                        (rowData.noOfPax !== "" || rowData.noOfBottles !== "") && rowData.emissions !== "" && (
                                                                                            <tr key={rowIndex}>
                                                                                                <td>{rowData.fBType}</td>
                                                                                                <td>{rowData.noOfPax || rowData.noOfBottles}</td>
                                                                                                <td>{rowData.emissions}</td>
                                                                                            </tr>
                                                                                        )
                                                                                    ))}
                                                                                {page.tabTitle === "Logistics" &&
                                                                                    flightClass?.subTypeData?.td?.map((rowData, rowIndex) => (
                                                                                        (rowData.noOfKms !== "" || rowData.kgs !== "") && rowData.emissions !== "" && (
                                                                                            <tr key={rowIndex}>
                                                                                                <td>{rowData.frType}</td>
                                                                                                <td>{rowData.noOfKms}</td>
                                                                                                <td>{rowData.kgs}</td>
                                                                                                <td>{rowData.emissions}</td>
                                                                                            </tr>
                                                                                        )
                                                                                    ))}
                                                                                {page.tabTitle === "Event Production" &&
                                                                                    flightClass?.subTypeData?.td?.map((rowData, rowIndex) => (
                                                                                        (rowData.kgs !== "" || rowData.area !== "" || rowData.noOfUnits !== "" || rowData.kwh !== "" || rowData.noOfHour !== "") && rowData.emissions !== "" && (
                                                                                            <tr key={rowIndex}>
                                                                                                <td>{rowData.pType}</td>
                                                                                                <td>{rowData.kgs || rowData.area || rowData.noOfUnits || rowData.kwh || rowData.noOfHour}</td>
                                                                                                {rowData.noOfDevice && <td>{rowData.noOfDevice}</td>}
                                                                                                <td>{rowData.emissions}</td>
                                                                                            </tr>
                                                                                        )
                                                                                    ))}
                                                                                {page.tabTitle === "Energy" &&
                                                                                    flightClass?.subTypeData?.td?.map((rowData, rowIndex) => (
                                                                                        (rowData.kwh !== "" || rowData.gallons !== "") && rowData.emissions !== "" && (
                                                                                            <tr key={rowIndex}>
                                                                                                <td>{rowData.eType}</td>
                                                                                                <td>{rowData.kwh || rowData.gallons}</td>
                                                                                                <td>{rowData.emissions}</td>
                                                                                            </tr>
                                                                                        )
                                                                                    ))}
                                                                                {page.tabTitle === "Digital Comms" &&
                                                                                    flightClass?.subTypeData?.td?.map((rowData, rowIndex) => (
                                                                                        (rowData.noOfEmails !== "" || rowData.attachmentSize !== "" || rowData.noOfHours !== "" || rowData.noOfAttendees !== "") && rowData.emissions !== "" && (
                                                                                            <tr key={rowIndex}>
                                                                                                <td>{rowData.dgType}</td>
                                                                                                <td>{rowData.noOfEmails || rowData.noOfAttendees}</td>
                                                                                                {rowData.noOfHours || rowData.attachmentSize && <td>{rowData.noOfHours || rowData.attachmentSize}</td>}
                                                                                                <td>{rowData.emissions}</td>
                                                                                            </tr>
                                                                                        )
                                                                                    ))}
                                                                                {page.tabTitle === "Waste" &&
                                                                                    flightClass?.subTypeData?.td?.map((rowData, rowIndex) => (
                                                                                        (rowData.kgs !== "" || rowData.bottle !== "") && rowData.emissions !== "" && (
                                                                                            <tr key={rowIndex}>
                                                                                                <td>{rowData.wsType}</td>
                                                                                                <td>{rowData.kgs || rowData.bottle}</td>
                                                                                                <td>{rowData.emissions}</td>
                                                                                            </tr>
                                                                                        )
                                                                                    ))}
                                                                                {page.tabTitle === "Hotel" &&
                                                                                    flightClass?.subTypeData?.td?.map((rowData, rowIndex) => (
                                                                                        (rowData.hType !== "" || rowData.bottle !== "") && rowData.emissions !== "" && (
                                                                                            <tr key={rowIndex}>
                                                                                                <td>{rowData.hType}</td>
                                                                                                <td>{rowData.geography || rowData.totalMeetingRoomArea || rowData.energyUtilisedKwh}</td>
                                                                                                <td>{rowData.country || rowData.meetingDuration}</td>
                                                                                                {rowData.hotelType && <td>{rowData.hotelType}</td>}
                                                                                                {rowData.roomsOccupied && <td>{rowData.roomsOccupied}</td>}
                                                                                                <td>{rowData.emissions}</td>
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
                            )
                        ))}
                    </Box> */}

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
                            {(sc1 > 0 || sc2 > 0 || sc3 > 0) &&
                                <Grid item xs={12} sm={4} md={4} className='my-5' >
                                    <ReactApexChart options={chartOptions} series={chartSeries} type="donut" height={300} />
                                </Grid>}
                        </Grid>
                        <Typography className='text-center py-1 fw-bold fs-5'>Do you want to change any data? If no, please click on Submit.</Typography>
                    </Box>
                    <div className='d-flex justify-content-end p-3'>
                        <Stack direction={"row"} spacing={2}>
                            <Button variant='contained' disabled={isLoading} onClick={() => setOpen(true)} className='custom-btn'>Submit</Button>
                            {/* <Button variant='outlined' color='error' onClick={handeleDelete}>Clear</Button> */}
                        </Stack>
                    </div>

                    <Box style={{ padding: "20px", paddingTop: "20px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: 'center' }}>
                        <Accordion style={{ color: 'white', background: '#1f9e6d', width: '100%' }}>
                            <AccordionSummary
                                expandIcon={<ArrowDownwardIcon style={{ color: 'white' }} />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography className='fs-5 text-center'>Suggestions for reducing the Carbon Footprint of your {toolFormData?.activityName} activity</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {isLoading ?
                                    <Box class='text-center'>
                                        <CircularProgress size={27} style={{ color: 'white' }} />
                                    </Box>
                                    :
                                    <div>
                                        {suggestion}
                                    </div>}

                            </AccordionDetails>
                        </Accordion>
                    </Box>

                </Card>
            </Container>
        </div>
    )
}

export default Result;
