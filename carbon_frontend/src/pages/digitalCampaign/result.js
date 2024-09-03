import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { Box, Button, Card, Container, Stack, Typography, Accordion, AccordionActions, AccordionSummary, AccordionDetails, CircularProgress, Grid } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useDispatch, useSelector } from 'react-redux';
import SendMail from './sendMail';
import { deleteCampaignData } from '../../redux/slice/totalDigitalCampaignSlice';
import { constant } from '../../constant';

const Result = ({ value }) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [suggestionForPdf, setSuggestionForPdf] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const allDigitalCampaignData = useSelector((state) => state?.totalDigitalCampaignDetails);

    const total = Number(allDigitalCampaignData?.totalEmission);
    const toolData = useSelector(state => state.toolDetails?.data);
    const toolFormData = toolData?.find((item) => item.type === 'toolForm');
    const resultTableData = useSelector(state => state.resultTableDataDetails);

    const [sc1, setSc1] = useState(0);
    const [sc2, setSc2] = useState(0);
    const [sc3, setSc3] = useState(0);

    const resultData = [
        {
            type: 'Digital Campaign',
            totalEmission: allDigitalCampaignData?.totalEmission
        }
    ];

    const data = {
        "totalDigitalCampaign": Number(allDigitalCampaignData?.totalEmission).toFixed(2),
        "grandTotal": Number(total).toFixed(2)
    };

    const handeleDelete = () => {
        dispatch(deleteCampaignData());
    };

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

    const sentenceParts = [];
    const liveBroadcastParts = [];
    const wantInResult = 'What are the top three ways to cut this by over 50%? While reducing your carbon footprint might not directly lower costs, achieving NetZero through carbon offsets can result in significant cost savings due to the reduced footprint.';

    const imgSize = allDigitalCampaignData?.data?.[0]?.data?.[0]?.imgSize || 0;
    const videoSize = allDigitalCampaignData?.data?.[0]?.data?.[1]?.videoSize || 0;
    const videoMins = allDigitalCampaignData?.data?.[0]?.data?.[1]?.videoMins || 0;
    const noOfMinsOne = allDigitalCampaignData?.data?.[0]?.data?.[2]?.noOfMins || 0;
    const emailEmission = allDigitalCampaignData?.data?.[0]?.data?.[2]?.emission || 0;

    const contentData = resultData.map(item => `${item.type}: ${item.totalEmission || 0} kgCO2e`).join('\n');
    const totalCarbonFootprint = `Total Carbon Footprint: ${Number(total).toFixed(2)} kgCO2e`;
    const totalTCO2e = `Total tCO2e = ${(total / 1000).toFixed(3)} tCO2e`;
    const carbonPerDollar = `For every $ you spend you are generating ${(total / toolFormData?.budget).toFixed(3)} kgCO2e`;

    const generatePrompt = async () => {
        if (totalCarbonFootprint) {
            sentenceParts.push(`My Digital Campaign has a carbon footprint of ${totalCarbonFootprint}`);
        }
        if (imgSize) {
            sentenceParts.push(`with a ${imgSize} MB image`);
        }
        if (videoSize && videoMins) {
            sentenceParts.push(`and a ${videoSize} MB, ${videoMins}-minute video.`);
        }
        if (emailEmission) {
            liveBroadcastParts.push(`Email generating ${emailEmission} kgCO2e`);
        }

        const liveBroadcastSentence = liveBroadcastParts.length > 0 ? `Further the live broadcasting of my virtual event of ${noOfMinsOne} mins on ${liveBroadcastParts.join(', ')}.` : '';
        const finalSentence = `${sentenceParts.join(', ')} ${liveBroadcastSentence} \n\n${wantInResult}`;
        setContent(finalSentence);
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

        let pdfData = `<h3>Suggestions for reducing the Carbon Footprint of your ${toolFormData?.activityName} activity From Digital Campaign: </h3> `;

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
                    const { impressions1, imgSize, impressions2, emissions, videoMins, videoSize, noOfEmails, attachmentSize } = rowData2;

                    if (page?.tabTitle === "Digital Campaign") {
                        return ((impressions1 && imgSize) || (impressions2 && videoMins && videoSize) || (noOfEmails && attachmentSize)) && emissions;
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

        setSc1(sc1Count);
        setSc2(sc2Count);
        setSc3(sc3Count);

        generatePrompt();

    }, [resultTableData, value, allDigitalCampaignData]);

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
                    {/* <Box style={{ width: "100%", color: 'white' }}>
                        {resultTableData?.data?.filter((item) => item.tabTitle === "Digital Campaign")?.map((page, pageIndex) => (
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
                                                                            {page.tabTitle === "Digital Campaign" &&
                                                                                flightClass?.subTypeData?.td?.map((rowData, rowIndex) => (
                                                                                    (rowData.noOfTrips !== "" || rowData.noOfEmails !== "" || rowData.attachmentSize !== "" || rowData.imgSize !== "" || rowData.videoMins !== "" || rowData.impressions1 !== "" || rowData.impressions2 !== "") && rowData.emissions !== "" && (
                                                                                        <tr key={rowIndex}>
                                                                                            <td>{rowData.dgType}</td>
                                                                                            <td>{rowData.noOfEmails || rowData.attachmentSize || rowData.imgSize}</td>
                                                                                            {(rowData.videoMins || rowData.impressions1) && <td>{rowData.videoMins || rowData.impressions1}</td>}
                                                                                            {(rowData.impressions2) && <td>{rowData.impressions2}</td>}
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
                        <Typography className='text-center py-1 fw-bold mt-3 fs-5'>Total {Number(total).toFixed(2)} kgCO<sub>2</sub>e Carbon Footprint generated from your {toolFormData?.activityName} activity</Typography>
                        <Typography className='text-center py-1 fw-bold mt-1 fs-5'>Total tCO<sub>2</sub>e = {(total / 1000).toFixed(3)} tCO<sub>2</sub>e</Typography>
                        <Typography className='text-center py-1 fw-bold mt-1 fs-5'>For every $ you spend you are generating {`${(total / toolFormData?.budget).toFixed(3)}`} kgCO<sub>2</sub>e</Typography>
                        {/* <Typography className='text-center py-1 fw-bold mt-4 fs-6'>Note: Source of the calculation will be shared to the designated company representative during the auditing.</Typography> */}

                        <Grid container my={3} className='d-flex justify-content-center'>
                            {(sc1 > 0 || sc2 > 0 || sc3 > 0) &&
                                <Grid item xs={12} sm={4} md={4}>
                                    <ReactApexChart options={chartOptions} series={chartSeries} type="donut" height={300} />
                                </Grid>}
                        </Grid>

                        <Typography className='text-center fw-bold fs-5'>Do you want to change any data? If no, please click on Submit.</Typography>
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