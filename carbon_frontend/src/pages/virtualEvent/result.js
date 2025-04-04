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
    const totalResultTableData = useSelector((state) => state?.resultTableDataDetails);

    const chartData = [
        Number(allVirtualEventData?.totalEmission) || 0,
    ];

    const resultData = [
        // {
        //     // type: 'Virtual Event',
        //     type: 'Outbound Marketing',
        //     totalEmission: allVirtualEventData?.totalEmission
        // },
        {
            type: 'TV Ad',
            totalEmission: allVirtualEventData?.data?.[0]?.data?.[16]?.emission
        },
        {
            type: 'Newspaper- Full page Ad',
            totalEmission: allVirtualEventData?.data?.[0]?.data?.[13]?.emission
        },
        {
            type: 'Newspaper- Half page Ad',
            totalEmission: allVirtualEventData?.data?.[0]?.data?.[19]?.emission
        },
        // {
        //     type: 'Magazine',
        //     totalEmission: allVirtualEventData?.data?.[0]?.data?.[14]?.emission
        // },
        // {
        //     type: 'Podcast',
        //     totalEmission: allVirtualEventData?.data?.[0]?.data?.[17]?.emission
        // },
        {
            type : 'Colour Print Ad',
            totalEmission : allVirtualEventData?.data?.[0]?.data?.[20]?.emission
            
        },
        {
            type : 'Black & White',
            totalEmission : allVirtualEventData?.data?.[0]?.data?.[21]?.emission
        },
        {
            type: 'Polyethylene Banner',
            totalEmission: allVirtualEventData?.data?.[0]?.data?.[14]?.emission
        },
        {
            type: 'PVC Banner',
            totalEmission: allVirtualEventData?.data?.[0]?.data?.[15]?.emission
        },
        {
            type : 'Energy',
            totalEmission : allVirtualEventData?.data?.[0]?.data?.[18]?.emission
        }
    ];


    const data = {
        // "totalVirtualEvent": Number(allVirtualEventData?.totalEmission).toFixed(2),
        "totalTvAd": Number(allVirtualEventData?.data?.[0]?.data?.[16]?.emission).toFixed(5),
        "totalNewspaper": Number(allVirtualEventData?.data?.[0]?.data?.[13]?.emission).toFixed(5),
        "totalHafepaper" : Number(allVirtualEventData?.data?.[0]?.data?.[19]?.emission).toFixed(5),
        "colorPrint" : Number(allVirtualEventData?.data?.[0]?.data?.[20]?.emission).toFixed(5),
        "blackAndWhite" : Number(allVirtualEventData?.data?.[0]?.data?.[21]?.emission).toFixed(5),
        // "totalMagazine": Number(allVirtualEventData?.data?.[0]?.data?.[14]?.emission).toFixed(2),
        // "totalPodcast": Number(allVirtualEventData?.data?.[0]?.data?.[17]?.emission).toFixed(2),
        "totalPolyethylene": Number(allVirtualEventData?.data?.[0]?.data?.[14]?.emission).toFixed(5),
        "totalPVC": Number(allVirtualEventData?.data?.[0]?.data?.[15]?.emission).toFixed(5),
        "Energy": Number(allVirtualEventData?.data?.[0]?.data?.[18]?.emission).toFixed(5),
        "grandTotal": Number(total).toFixed(5)
    };

    const outdoorBilboardEmission = Number(data.totalPolyethylene) + Number(data?.totalPVC) + Number(allVirtualEventData?.data?.[0]?.data?.[19]?.emission) || 0;

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
        // // for virtual Event
        // if (totalCarbonFootprint) {
        //     // sentenceParts.push(`My Virtual Event has a carbon footprint of ${totalCarbonFootprint}`);
        //     sentenceParts.push(`My Outbound Marketing has a carbon footprint of ${totalCarbonFootprint}`);
        // }
        // if (imgSize) {
        //     sentenceParts.push(`with a ${imgSize} MB image`);
        // }
        // if (videoSize && videoMins) {
        //     sentenceParts.push(`and a ${videoSize} MB, ${videoMins}-minute video.`);
        // }
        // if (noOfMinsOne && emissionThree) {
        //     liveBroadcastParts.push(`TikTok generating ${emissionThree} kgCO2e`);
        // }
        // if (emissionFour) {
        //     liveBroadcastParts.push(`Reddit generating ${emissionFour} kgCO2e`);
        // }
        // if (emissionFive) {
        //     liveBroadcastParts.push(`Pinterest generating ${emissionFive} kgCO2e`);
        // }
        // if (emissionSix) {
        //     liveBroadcastParts.push(`Instagram Live generating ${emissionSix} kgCO2e`);
        // }
        // if (emissionSeven) {
        //     liveBroadcastParts.push(`Snapchat generating ${emissionSeven} kgCO2e`);
        // }
        // if (emissionEight) {
        //     liveBroadcastParts.push(`Facebook Live generating ${emissionEight} kgCO2e`);
        // }
        // if (emissionNine) {
        //     liveBroadcastParts.push(`LinkedIn Live generating ${emissionNine} kgCO2e`);
        // }
        // if (emissionTen) {
        //     liveBroadcastParts.push(`Twitter Live generating ${emissionTen} kgCO2e`);
        // }
        // if (emissionEleven) {
        //     liveBroadcastParts.push(`Twitch generating ${emissionEleven} kgCO2e`);
        // }
        // if (emissionTwelve) {
        //     liveBroadcastParts.push(`YouTube generating ${emissionTwelve} kgCO2e`);
        // }

        // // const liveBroadcastSentence = liveBroadcastParts.length > 0 ? `Further the live broadcasting of my virtual event of ${noOfMinsOne} mins on ${liveBroadcastParts.join(', ')}.` : '';
        // const liveBroadcastSentence = liveBroadcastParts.length > 0 ? `Further the live broadcasting of my outbound marketing of ${noOfMinsOne} mins on ${liveBroadcastParts.join(', ')}.` : '';
        // const finalSentence = `${sentenceParts.join(', ')} ${liveBroadcastSentence} ${carbonPerDollar} \n\n${wantInResult}`;
        // setContent(finalSentence);

        // // for Outbound Marketing
        if (allVirtualEventData?.data?.[0]?.data?.[16]?.emission) {
            // sentenceParts.push(`TV Ad ${allVirtualEventData?.data?.[0]?.data?.[17]?.emission} kgCO2e.`);
            sentenceParts.push(`TV Ad with ${allVirtualEventData?.data?.[0]?.data?.[16]?.adDuration} secs duration with ${allVirtualEventData?.data?.[0]?.data?.[16]?.noOfSlots} slots generated ${allVirtualEventData?.data?.[0]?.data?.[16]?.emission} kgco2e, `);
        }
        if (allVirtualEventData?.data?.[0]?.data?.[13]?.emission) {
            // sentenceParts.push(`Newspaper- Full page Ad ${allVirtualEventData?.data?.[0]?.data?.[13]?.emission} kgCO2e.`);
            sentenceParts.push(`Newspaper ad with ${allVirtualEventData?.data?.[0]?.data?.[13]?.noOfCopiesOne} copies generated ${allVirtualEventData?.data?.[0]?.data?.[13]?.emission} kgco2e, `);
        }
        // if (allVirtualEventData?.data?.[0]?.data?.[14]?.emission) {
        //     // sentenceParts.push(`Magazine ${allVirtualEventData?.data?.[0]?.data?.[14]?.emission} kgCO2e.`);
        //     sentenceParts.push(`magazine with ${allVirtualEventData?.data?.[0]?.data?.[14]?.noOfPages} pages and ${allVirtualEventData?.data?.[0]?.data?.[14]?.noOfCopiesTwo} copies generated ${allVirtualEventData?.data?.[0]?.data?.[14]?.emission} kgco2e, `);
        // }
        // if (allVirtualEventData?.data?.[0]?.data?.[18]?.emission) {
        //     // sentenceParts.push(`Podcast ${allVirtualEventData?.data?.[0]?.data?.[18]?.emission} kgCO2e.`);
        //     sentenceParts.push(`podcast of ${allVirtualEventData?.data?.[0]?.data?.[18]?.podcastSize}mb with ${allVirtualEventData?.data?.[0]?.data?.[18]?.noOfListeners} listeners generated ${allVirtualEventData?.data?.[0]?.data?.[18]?.emission} kgco2e. `);
        // }
        // if (allVirtualEventData?.data?.[0]?.data?.[15]?.emission) {
        //     sentenceParts.push(`Polyethylene ${allVirtualEventData?.data?.[0]?.data?.[15]?.emission} kgCO2e.`);
        // }
        // if (allVirtualEventData?.data?.[0]?.data?.[16]?.emission) {
        //     // sentenceParts.push(`PVC banner ${allVirtualEventData?.data?.[0]?.data?.[16]?.emission} kgCO2e.`);
        //     sentenceParts.push(`and PVC banner generated ${allVirtualEventData?.data?.[0]?.data?.[16]?.emission} kgco2e,`);
        // }
        if (outdoorBilboardEmission) {
            sentenceParts.push(`and outdoor billboard generated ${outdoorBilboardEmission} kgco2e. `);
        }
        if (totalCarbonFootprint) {
            // sentenceParts.push(`Total ${totalCarbonFootprint} Carbon Footprint generated from your Product activity.`);
            sentenceParts.push(`Total emissions were ${Number(total).toFixed(2)} kgCO2e.`);
        }
        // sentenceParts.push(`\n\nHow to reduce the carbon footprint by 20-25%? Show the calculation for comparing the original and reduced carbon footprints. Suggest using Polyethylene Banners as they are 100% recyclable. In end say, by following these measures you can reduce cost by more than 10%.`);
        sentenceParts.push(`\n\nHow can I reduce the emissions max? Show the original and reduced emissions by suggesting one action item, along with alternative methods, also show the calculation for each category. For PVC banners suggest to use polyethylene as it is 100% recyclable with lesser emissions as compared to PVC.`);

        const finalSentence = `${sentenceParts.join('\n')}`;
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

        // let pdfData = `<h3>Recommendations for reducing the Carbon Footprint of your ${toolFormData?.activityName} activity From Virtual Event : </h3> `;
        let pdfData = `<h3>Recommendations for reducing the Carbon Footprint of your ${toolFormData?.activityName} activity From Outdoor Marketing : </h3> `;

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
        console.log("content:: vi", content)
        try {
            await generatePrompt();

            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    // model: "gpt-3.5-turbo",
                    // model: "gpt-4o",
                    model: "o1-mini",
                    messages: [{
                        "role": "user",
                        "content": content
                    }],
                    // temperature: 0.7,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${constant?.chatKeyOne?.replace('skC-', '') + constant?.chatKeyTwo?.replace('dEf-', '')}`,
                    },
                }
            );

            const resJson = response?.data;
            const formattedSuggestions = formatSuggestions(resJson?.choices?.[0]?.message?.content);
            setSuggestion(formattedSuggestions);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // let sc1Count = 0;
        // let sc2Count = 0;
        // let sc3Count = 0;

        // resultTableData?.data?.forEach(page => {
        //     page?.tabData?.forEach(flightClass => {
        //         const hasFilledRow = flightClass?.subTypeData?.td?.some(rowData => {

        //             const rowData2 = rowData;
        //             const { impressions1, imgSize, impressions2, emissions, videoMins, videoSize, noOfEmails, attachmentSize } = rowData2;

        //             if (page?.tabTitle === "Digital Campaign") {
        //                 return ((impressions1 && imgSize) || (impressions2 && videoMins && videoSize) || (noOfEmails && attachmentSize)) && emissions;
        //             }

        //             return false;
        //         });

        //         if (hasFilledRow) {
        //             if (flightClass?.scope === 1) {
        //                 sc1Count += 1;
        //             } else if (flightClass?.scope === 2) {
        //                 sc2Count += 1;
        //             } else if (flightClass?.scope === 3) {
        //                 sc3Count += 1;
        //             }
        //         }
        //     });
        // });

        // setSc1(sc1Count);
        // setSc2(sc2Count);
        // setSc3(sc3Count);

        generatePrompt();
    }, [resultTableData, value, allVirtualEventData]);

    useEffect(() => {
        if (content) {
            chat();
        }
    }, [content]);

    return (
        <div>
            <SendMail open={open} close={() => setOpen(false)} datas={{ ...data, totalVirtualEvent: Number(allVirtualEventData?.totalEmission).toFixed(2) }} setOpen chatSuggestion={suggestionForPdf} />
            <Container maxWidth>
                <Card className='custom-inner-bg'>
                    {/* {resultTableData?.data?.filter((item) => item.tabTitle === "Virtual Event")?.map((page, pageIndex) => ( */}
                    {/* <Box style={{ width: "100%", color: 'white' }}>
                        {resultTableData?.data?.find((item) => item?.from === "virtualEvent")?.allDataOfTab?.map((page, pageIndex) => (
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

                                                                            {
                                                                                page.tabTitle === "Outbound Marketing" &&
                                                                                flightClass?.subTypeData?.td?.map((rowData, rowIndex) => (
                                                                                    (rowData.imgSize !== "" || rowData.impressionsOne !== "" || rowData.impressionsTwo !== "" || rowData.videoSize !== "" || rowData.videoMins !== "" || rowData.noOfPeople !== "" || rowData.noOfMins !== "") && rowData.emissions !== "" && (
                                                                                        <tr key={rowIndex}>
                                                                                            <td>{rowData.vtType}</td>
                                                                                            <td>{rowData.imgSize || rowData.videoSize || rowData.noOfMins || rowData.noOfCopiesOne || rowData.kgs || rowData.adDuration || rowData.podcastSize || rowData.noOfPages}</td>
                                                                                            <td>{rowData.videoMins || rowData.impressionsOne || rowData.noOfPeople || rowData.noOfSlots || rowData.noOfListeners || rowData.noOfCopiesTwo}</td>
                                                                                            {(rowData.impressionsTwo || rowData.viewers) && <td>{rowData.impressionsTwo || rowData.viewers}</td>}
                                                                                            <td>{rowData.emissions}</td>
                                                                                        </tr>
                                                                                    )
                                                                                ))
                                                                            }
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
                        <Typography className='text-center py-1 fw-bold mt-3 fs-5'>Total {Number(total).toFixed(5)} kgCO<sub>2</sub>e Carbon Footprint generated from your {toolFormData?.activityName} activity</Typography>
                        <Typography className='text-center py-1 fw-bold mt-1 fs-5'>Total tCO<sub>2</sub>e = {(total / 1000).toFixed(5)} tCO<sub>2</sub>e</Typography>
                        <Typography className='text-center py-1 fw-bold mt-1 fs-5'>For every $ you spend you are generating {`${(total / toolFormData?.budget).toFixed(5)}`} kgCO<sub>2</sub>e</Typography>
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
