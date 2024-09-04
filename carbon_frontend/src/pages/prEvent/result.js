import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import { Box, Button, Card, CircularProgress, Container, Grid, Stack, Typography, Accordion, AccordionDetails, AccordionSummary, } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommsData } from '../../redux/slice/totalCommsSlice';
import { deleteHospitalityData } from '../../redux/slice/totalHospitalitySlice';
import { deletePrAgencyData } from '../../redux/slice/totalPrAgencySlice';
import { deleteprEventEmissionCatogorywise } from '../../redux/slice/resultTableDataSlice';
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
    const allCommsData = useSelector((state) => state?.totalCommsDetails);
    const allPrAgencyData = useSelector((state) => state?.totalPrAgencyDetails);
    const allHospitalityData = useSelector((state) => state?.totalHospitalityDetails);

    const toolData = useSelector(state => state.toolDetails?.data);
    const toolFormData = toolData?.find((item) => item.type === 'toolForm');
    const resultTableData = useSelector(state => state.resultTableDataDetails);
    const prEventEmissionDataCategorywise = useSelector(state => state.resultTableDataDetails.prEventEmissionDataCategorywise);

    const emailInvitationsEmission = prEventEmissionDataCategorywise?.find((category) => category.catgName === "Email Invitations");
    const prAssetsEmission = prEventEmissionDataCategorywise?.find((category) => category.catgName === "PR Assets");
    const prAgencyEmission = prEventEmissionDataCategorywise?.find((category) => category.catgName === "PR Agency");
    const foodEmission = prEventEmissionDataCategorywise?.find((category) => category.catgName === "Food/Lunch");
    const redMeatEmission = prEventEmissionDataCategorywise?.find((category) => category.catgName === "Red Meat");
    const foodAndPETbottleEmission = prEventEmissionDataCategorywise?.find((category) => category.catgName === "Food-Plastic Waste");

    const [sc1, setSc1] = useState(0);
    const [sc2, setSc2] = useState(0);
    const [sc3, setSc3] = useState(0);

    const total = Number(allPrAgencyData?.totalEmission) + Number(allHospitalityData?.totalEmission) + Number(allCommsData?.totalEmission);

    const chartData = [
        Number(allCommsData?.totalEmission) || 0,
        Number(allPrAgencyData?.totalEmission) || 0,
        Number(allHospitalityData?.totalEmission) || 0,
    ];

    const resultData = [
        {
            type: 'Comms',
            totalEmission: allCommsData?.totalEmission
        },
        {
            type: 'PR Agency',
            totalEmission: allPrAgencyData?.totalEmission
        },
        {
            type: 'Hospitality',
            totalEmission: allHospitalityData?.totalEmission
        }
    ];

    const validTitles = [
        "Comms",
        "PR Agency",
        "Hospitality"
    ];

    const data = {
        "totalComms": Number(allCommsData?.totalEmission).toFixed(2),
        "totalPrAgency": Number(allPrAgencyData?.totalEmission).toFixed(2),
        "totalHospitality": Number(allHospitalityData?.totalEmission).toFixed(2),
        "grandTotal": Number(total).toFixed(2)
    }

    const handeleDelete = () => {
        dispatch(deleteCommsData())
        dispatch(deletePrAgencyData())
        dispatch(deleteHospitalityData())
        dispatch(deleteprEventEmissionCatogorywise())
    }

    const chartOptions = {
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

    const chartSeries = [sc1, sc2, sc3];

    const generatePrompt = async () => {
        let contentData = ``;
        // let categoryCount = 0;

        // resultData?.forEach(item => {
        //     if (item?.totalEmission > 0) {
        //         contentData += `${item.type}: ${item.totalEmission || 0} kgCO2e \n`
        //         categoryCount += 1;
        //     }
        // });

        // if (total && Number(total).toFixed(2) > 0) {
        //     contentData += `\nTotal Carbon Footprint: ${Number(total).toFixed(2)} kgCO2e`
        // }
        // if (total && (total / toolFormData?.budget) > 0) {
        //     contentData += `For every $ you spend you are generating ${(total / toolFormData?.budget).toFixed(3)} kgCO2e`
        // }

        // contentData += `\n\nHow do I reduce my total carbon footprint up to 20%? Provide simple steps for each category with percentage targets, prioritizing higher emission categories for greater reduction. Also, indicate the most important category and the overall reduction achieved.`
        // setContent(contentData);

        if (emailInvitationsEmission && emailInvitationsEmission.emission > 0) {
            contentData += `The email carbon footprint is ${emailInvitationsEmission.emission} kgCO2e, `
        }
        if (prAssetsEmission && prAssetsEmission.emission > 0) {
            contentData += `while PR assets generate ${prAssetsEmission.emission} kgCO2e`
        }
        if (prAgencyEmission && prAgencyEmission.emission > 0) {
            contentData += `The meeting room, projector, and branding add ${prAgencyEmission.emission} kgCO2e, `
        }
        if (foodEmission && foodEmission.emission > 0) {
            contentData += `and food accounts for ${foodEmission.emission} kgCO2e, `
        }
        if (redMeatEmission && redMeatEmission.emission > 0) {
            contentData += `with ${redMeatEmission.emission} kgCO2e from red meat. `
        }
        if (foodAndPETbottleEmission && foodAndPETbottleEmission.emission > 0) {
            contentData += `Food and PET bottle waste generate ${foodAndPETbottleEmission.emission} kgCO2e.`
        }
        contentData += `\n\nSuggest three steps for each category to reduce the overall footprint by 10 - 20 % and email emissions by over 50 %. \nHow do the original and reduced footprints compare ? Also, explain how sustainable measures could cut costs by 10 %, considering cost savings may not directly match carbon reductions.`
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

        let pdfData = `<h3>Suggestions for reducing the Carbon Footprint of your ${toolFormData?.activityName} activity From PR Event: </h3> `;

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
                    const { noOfEmails, attachmentSize, prFileSize, finalFileSize, sendingToMedia, imgSize, impressionsOne, videoSize, videoMins, impressionsTwo, meetingRoomArea, meetingDuration, kgs, noOfPages, noOfKms, emissions, kwh, noOfPax, bottle } = rowData2;

                    if (page?.tabTitle === "Comms") {
                        if (noOfEmails && attachmentSize && emissions) {
                            return true;
                        }
                        if (prFileSize && finalFileSize && sendingToMedia && emissions) {
                            return true;
                        }
                        if (videoSize && videoMins && impressionsTwo && emissions) {
                            return true;
                        }
                        if (noOfPages && emissions) {
                            return true;
                        }
                        return (imgSize && impressionsOne) && emissions;
                    }
                    if (page?.tabTitle === "PR Agency") {
                        if (meetingRoomArea && meetingDuration && emissions) {
                            return true;
                        }
                        if (kgs && emissions) {
                            return true;
                        }
                        // if (noOfPages && emissions) {
                        //     return true;
                        // }
                        if (noOfKms && emissions) {
                            return true;
                        }
                        return kwh && emissions;
                    }
                    if (page?.tabTitle === "Hospitality") {
                        if (kgs && emissions) {
                            return true;
                        }
                        if (noOfPax && emissions) {
                            return true;
                        }
                        return bottle && emissions;
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
                                                                                {page.tabTitle === "Comms" &&
                                                                                    flightClass?.subTypeData?.td?.map((rowData, rowIndex) => (
                                                                                        rowData.noOfEmails !== "" && rowData.attachmentSize !== "" && rowData.sendingToMedia !== "" && rowData.emissions !== "" && (
                                                                                            <tr key={rowIndex}>
                                                                                                <td>{rowData.cmType}</td>
                                                                                                <td>{rowData.noOfEmails || rowData.prFileSize || rowData.videoSize || rowData.imgSize || rowData.noOfPages}</td>
                                                                                                {rowData.attachmentSize || rowData.finalFileSize || rowData.videoMins || rowData.impressionsOne && <td>{rowData.attachmentSize || rowData.finalFileSize || rowData.videoMins || rowData.impressionsOne}</td>}
                                                                                                {rowData.sendingToMedia || rowData.impressionsTwo && <td>{rowData.attachmentSize || rowData.finalFileSize || rowData.videoMins || rowData.impressionsOne}</td>}
                                                                                                <td>{rowData.emissions}</td>
                                                                                            </tr>
                                                                                        )
                                                                                    ))}
                                                                                {page.tabTitle === "PR Agency" &&
                                                                                    flightClass?.subTypeData?.td?.map((rowData, rowIndex) => (
                                                                                        rowData.meetingRoomArea !== "" && rowData.meetingDuration !== "" && rowData.emissions !== "" && (
                                                                                            <tr key={rowIndex}>
                                                                                                <td>{rowData.prType}</td>
                                                                                                <td>{rowData.meetingRoomArea || rowData.kgs || rowData.kwh || rowData.noOfKms}</td>
                                                                                                {rowData.meetingDuration || rowData.noOfDevice && <td>{rowData.meetingDuration || rowData.noOfDevice}</td>}
                                                                                                <td>{rowData.emissions}</td>
                                                                                            </tr>
                                                                                        )
                                                                                    ))}
                                                                                {page.tabTitle === "Hospitality" &&
                                                                                    flightClass?.subTypeData?.td?.map((rowData, rowIndex) => (
                                                                                        (rowData.kgs !== "" || rowData.noOfPax !== "" || rowData.bottle !== "") && rowData.emissions !== "" && (
                                                                                            <tr key={rowIndex}>
                                                                                                <td>{rowData.hstType}</td>
                                                                                                <td>{rowData.kgs || rowData.noOfPax || rowData.bottle}</td>
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
