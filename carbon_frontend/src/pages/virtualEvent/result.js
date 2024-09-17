import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Card, Container, Grid, Stack, Typography, Accordion, AccordionDetails, AccordionSummary, CircularProgress } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { deleteVirtualEventData } from '../../redux/slice/totalVirtualEventSlice';
import SendMail from './sendMail';
import { constant } from '../../constant';

const Result = ({ value }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [suggestionForPdf, setSuggestionForPdf] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [sc1, setSc1] = useState(0);
    const [sc2, setSc2] = useState(0);
    const [sc3, setSc3] = useState(0);

    const allVirtualEventData = useSelector((state) => state?.totalVirtualEventDetails)
    const total = Number(allVirtualEventData?.totalEmission);

    const chartData = [
        Number(allVirtualEventData?.totalEmission) || 0,
    ];

    const resultData = [
        {
            type: 'Virtual Event',
            totalEmission: allVirtualEventData?.totalEmission
        },
    ];

    const data = {
        "totalVirtualEvent": Number(allVirtualEventData?.totalEmission).toFixed(2),
        "grandTotal": Number(total).toFixed(2)
    };

    const toolData = useSelector(state => state.toolDetails?.data);
    const toolFormData = toolData?.find((item) => item.type === 'toolForm');
    const resultTableData = useSelector(state => state.resultTableDataDetails);

    const contentData = resultData?.map(item => `${item.type}: ${item.totalEmission || 0} kgCO2e`).join('\n');
    const totalCarbonFootprint = `Total Carbon Footprint: ${Number(total).toFixed(2)} kgCO2e`;
    const totalTCO2e = `Total tCO2e = ${(total / 1000).toFixed(3)} tCO2e`;
    const carbonPerDollar = `For every $ you spend you are generating ${(total / toolFormData?.budget).toFixed(3)} kgCO2e`;

    const sentenceParts = [];
    const liveBroadcastParts = [];
    const wantInResult = `What are the top three ways to cut this by over 50 %? While reducing your carbon footprint might not directly lower costs, achieving NetZero through carbon offsets can result in significant cost savings due to the reduced footprint.`;

    const imgSize = allVirtualEventData?.data?.[0]?.data?.[0]?.imgSize || 0;
    const videoSize = allVirtualEventData?.data?.[0]?.data?.[1]?.videoSize || 0;
    const videoMins = allVirtualEventData?.data?.[0]?.data?.[1]?.videoMins || 0;
    const noOfMinsOne = allVirtualEventData?.data?.[0]?.data?.[2]?.noOfMins || 0;
    const emissionThree = allVirtualEventData?.data?.[0]?.data?.[2]?.emission || 0;
    const emissionFour = allVirtualEventData?.data?.[0]?.data?.[3]?.emission || 0;
    const emissionFive = allVirtualEventData?.data?.[0]?.data?.[4]?.emission || 0;
    const emissionSix = allVirtualEventData?.data?.[0]?.data?.[5]?.emission || 0;
    const emissionSeven = allVirtualEventData?.data?.[0]?.data?.[6]?.emission || 0;
    const emissionEight = allVirtualEventData?.data?.[0]?.data?.[7]?.emission || 0;
    const emissionNine = allVirtualEventData?.data?.[0]?.data?.[8]?.emission || 0;
    const emissionTen = allVirtualEventData?.data?.[0]?.data?.[9]?.emission || 0;
    const emissionEleven = allVirtualEventData?.data?.[0]?.data?.[10]?.emission || 0;
    const emissionTwelve = allVirtualEventData?.data?.[0]?.data?.[11]?.emission || 0;

    const handeleDelete = () => {
        dispatch(deleteVirtualEventData());
    };

    const generatePrompt = async () => {
        if (totalCarbonFootprint) {
            sentenceParts.push(`My Virtual Event has a carbon footprint of ${totalCarbonFootprint}`);
        }
        if (imgSize) {
            sentenceParts.push(`with a ${imgSize} MB image`);
        }
        if (videoSize && videoMins) {
            sentenceParts.push(`and a ${videoSize} MB, ${videoMins}-minute video.`);
        }
        if (noOfMinsOne && emissionThree) {
            liveBroadcastParts.push(`TikTok generating ${emissionThree} kgCO2e`);
        }
        if (emissionFour) {
            liveBroadcastParts.push(`Reddit generating ${emissionFour} kgCO2e`);
        }
        if (emissionFive) {
            liveBroadcastParts.push(`Pinterest generating ${emissionFive} kgCO2e`);
        }
        if (emissionSix) {
            liveBroadcastParts.push(`Instagram Live generating ${emissionSix} kgCO2e`);
        }
        if (emissionSeven) {
            liveBroadcastParts.push(`Snapchat generating ${emissionSeven} kgCO2e`);
        }
        if (emissionEight) {
            liveBroadcastParts.push(`Facebook Live generating ${emissionEight} kgCO2e`);
        }
        if (emissionNine) {
            liveBroadcastParts.push(`LinkedIn Live generating ${emissionNine} kgCO2e`);
        }
        if (emissionTen) {
            liveBroadcastParts.push(`Twitter Live generating ${emissionTen} kgCO2e`);
        }
        if (emissionEleven) {
            liveBroadcastParts.push(`Twitch generating ${emissionEleven} kgCO2e`);
        }
        if (emissionTwelve) {
            liveBroadcastParts.push(`YouTube generating ${emissionTwelve} kgCO2e`);
        }

        const liveBroadcastSentence = liveBroadcastParts.length > 0 ? `Further the live broadcasting of my virtual event of ${noOfMinsOne} mins on ${liveBroadcastParts.join(', ')}.` : '';
        const finalSentence = `${sentenceParts.join(', ')} ${liveBroadcastSentence} ${carbonPerDollar} \n\n${wantInResult}`;
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

        let pdfData = `<h3>Suggestions for reducing the Carbon Footprint of your ${toolFormData?.activityName} activity From Virtual Event : </h3> `;

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
            await generatePrompt();

            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    // model: "gpt-3.5-turbo",
                    model: "gpt-4o",
                    messages: [
                        {
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
    }, [resultTableData, value, allVirtualEventData]);

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
                        {resultTableData?.data?.filter((item) => item.tabTitle === "Virtual Event")?.map((page, pageIndex) => (
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
                                                                            {page.tabTitle === "Virtual Event" &&
                                                                                flightClass?.subTypeData?.td?.map((rowData, rowIndex) => (
                                                                                    (rowData.imgSize !== "" || rowData.impressionsOne !== "" || rowData.impressionsTwo !== "" || rowData.videoSize !== "" || rowData.videoMins !== "" || rowData.noOfPeople !== "" || rowData.noOfMins !== "") && rowData.emissions !== "" && (
                                                                                        <tr key={rowIndex}>
                                                                                            <td>{rowData.vtType}</td>
                                                                                            <td>{rowData.imgSize || rowData.videoSize || rowData.noOfMins || rowData.noOfCopies || rowData.kgs || rowData.adDuration}</td>
                                                                                            <td>{rowData.videoMins || rowData.impressionsOne || rowData.noOfPeople || rowData.noOfSlots}</td>
                                                                                            {(rowData.impressionsTwo || rowData.viewers) && <td>{rowData.impressionsTwo || rowData.viewers}</td>}
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
                                        <td className='ps-4'>{`${item?.totalEmission || 0}  `}kgCO<sub>2</sub>e</td>
                                    </tr>
                                ))
                            }
                        </table>
                        <Typography className='text-center py-1 fw-bold mt-3 fs-5'>Total {Number(total).toFixed(2)} kgCO<sub>2</sub>e Carbon Footprint generated from your {toolFormData?.activityName} activity</Typography>
                        <Typography className='text-center py-1 fw-bold mt-1 fs-5'>Total tCO<sub>2</sub>e = {(total / 1000).toFixed(3)} tCO<sub>2</sub>e</Typography>
                        <Typography className='text-center py-1 fw-bold mt-1 fs-5'>For every $ you spend you are generating {`${(total / toolFormData?.budget).toFixed(3)}`} kgCO<sub>2</sub>e</Typography>
                        <Typography className='text-center py-1 fw-bold mt-2 fs-5'>Do you want to change any data? If no, please click on Submit.</Typography>
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

export default Result
