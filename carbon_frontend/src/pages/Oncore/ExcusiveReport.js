import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Card, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Time from './chart/time';
import Utilization from './chart/utilize';
import Volume from './chart/volume';

const ExecutiveReport = () => {
    const [select1, setSelect1] = useState('Penn Center');
    const [select2, setSelect2] = useState('Calendar YTD (Jan 2024 - Present)');
    const [select3, setSelect3] = useState('Paoll All Days (Mon - Sun)');
    const navigate = useNavigate()
    const handleSelect1Change = (e) => {
        setSelect1(e.target.value);
    };
    const handleSelect2Change = (e) => {
        setSelect2(e.target.value);
    };
    const handleSelect3Change = (e) => {
        setSelect3(e.target.value);
    };


    const cardData = [
        {
            name: "Nursing NPS",
            caption1: "Today",
            caption2: "Goal",
            caption3: "Last yr.",
            count1: "90",
            count2: "85",
            count3: "50"
        },
        {
            name: "Avg. Nursing Overtime / Week",
            caption1: "Today",
            caption2: "Goal",
            caption3: "Last yr.",
            count1: "1 hrs",
            count2: "2 hrs",
            count3: "3 hrs"
        },
        {
            name: "Avg. Daily Appts. / Nurse",
            caption1: "Today",
            caption2: "Goal",
            caption3: "Last yr.",
            count1: "90",
            count2: "85",
            count3: "60"
        },
        {
            name: "Avg. Daily Appts. / Chair",
            caption1: "Today",
            caption2: "Goal",
            caption3: "Last yr.",
            count1: "90",
            count2: "85",
            count3: "60"
        },
        {
            name: "Lunch Break Adherance",
            caption1: "Today",
            caption2: "Goal",
            caption3: "Last yr.",
            count1: "99%",
            count2: "95%",
            count3: "60%"
        },
        {
            name: "Late Closings / Month",
            caption1: "Today",
            caption2: "Goal",
            caption3: "Last yr.",
            count1: "3",
            count2: "3",
            count3: "5"
        },
        {
            name: "Forecast Accuracy",
            caption1: "Today",
            caption2: "Goal",
            count1: "90%",
            count2: "85%",

        },
        {
            name: "No Show Rate",
            caption1: "Today",
            caption2: "Goal",
            caption3: "Last yr.",
            count1: "3%",
            count2: "4%",
            count3: "4.5%    "
        },
    ]
    return (
        <div className="p-3">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} className='mb-5'>
                    <Typography variant='h4'> Executive Reports</Typography>
                    <div className='d-flex flex-wrap align-items-center pt-5'>
                        <FormControl style={{ width: "200px" }} className='ps-2 py-1'>
                            <Select
                                style={{ height: "38px", backgroundColor: "#e0ebff", border: "none" }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={select1 || "Penn Center"}
                                onChange={handleSelect1Change}
                            >
                                <MenuItem value={"Penn Center"}>Penn Center</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl style={{ width: "320px" }} className='ps-2 py-1'>
                            <Select
                                style={{ height: "38px", backgroundColor: "#e0ebff", border: "none" }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={select2 || "Calendar YTD (Jan 2024 - Present)"}
                                onChange={handleSelect2Change}
                            >
                                <MenuItem value={"Calendar YTD (Jan 2024 - Present)"}>Calendar YTD (Jan 2024 - Present)</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl style={{ width: "260px" }} className='ps-2 py-1'>
                            <Select
                                style={{ height: "38px", backgroundColor: "#e0ebff", border: "none" }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={select3 || "Paoll All Days (Mon - Sun)"}
                                onChange={handleSelect3Change}
                            >
                                <MenuItem value={"Paoll All Days (Mon - Sun)"}>Paoll All Days (Mon - Sun)</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div><Utilization /></div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div><Volume /></div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div><Time /></div>
                </Grid>
            </Grid>
            <div className='d-flex justify-content-center align-items-center my-4'>
                <div className='mx-2 fw-bold'><FiberManualRecordIcon style={{ marginRight: "8px", color: "#081B5F" }} />Exceeding Target</div>

                <div className='mx-2 fw-bold'><FiberManualRecordIcon style={{ marginRight: "8px", color: "#1C4ADE" }} />Meeting Target</div>
                <div className='mx-2 fw-bold'><FiberManualRecordIcon style={{ marginRight: "8px", color: "#749CFC" }} />Not Meeting Target</div>
            </div>

            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6} className='my-4'>
                    <Typography variant="h4">Provider Experience</Typography>
                </Grid>
                <Grid item xs={6} className='my-4'>
                    <Typography variant="h4">Patient Access</Typography>
                </Grid>

                {cardData && cardData.length > 0 && cardData.map((item) => {
                    return (
                        <Grid item xs={12} sm={6} md={3} key={item.name} className='py-3' >
                            <Card className='p-4' style={{ zIndex: "999" }}>
                                <div className='border-bottom py-2 pb-3'>
                                    <div className='d-flex align-items-center'>
                                        <span style={{ backgroundColor: "#a8a9e85e", borderRadius: "50%", height: "40px", width: "40px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "7px" }}>$</span>
                                        <Typography variant="h6">{item.name}</Typography>
                                    </div>
                                </div>
                                {item.name === "Forecast Accuracy" ?
                                    <div className='d-flex justify-content-around align-items-center py-4'>
                                        <div className='text-center'>
                                            <Typography variant="h5">{item.count1}</Typography>
                                            <Typography variant="caption">{item.caption1}</Typography>
                                        </div>
                                        <div className='text-center'>
                                            <Typography variant="h5">{item.count2}</Typography>
                                            <Typography variant="caption">{item.caption2}</Typography>
                                        </div>
                                    </div> :
                                    <div className='d-flex justify-content-around align-items-center py-4'>
                                        <div className='text-center'>
                                            <Typography variant="h5">{item.count1}</Typography>
                                            <Typography variant="caption">{item.caption1}</Typography>
                                        </div>
                                        <div className='text-center'>
                                            <Typography variant="h5">{item.count2}</Typography>
                                            <Typography variant="caption">{item.caption2}</Typography>
                                        </div>
                                        <div className='text-center'>
                                            <Typography variant="h5">{item.count3}</Typography>
                                            <Typography variant="caption">{item.caption3}</Typography>
                                        </div>
                                    </div>
                                }
                            </Card>
                        </Grid>
                    );
                })}


            </Grid>
        </div>
    )
}

export default ExecutiveReport
