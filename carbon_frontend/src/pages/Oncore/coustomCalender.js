// src/CustomCalendar.js
import { Button, Card, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import { CiUser } from "react-icons/ci";
// import './CustomCalendar.css';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BsPrinter } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import ListView from './ListView';
import BarChartDataSet from './chart/barchart_dataset2';
import DoubleChart from './chart/forcastChart'

const CustomCalendar = () => {
    const [value, setValue] = useState('1');
    const [btnSelect, setBtnSelect] = useState('');
    const [optimizeData, setoptimizeData] = useState({})
    const [select, setSelect] = useState('Paoll Center');

    const handleSelectChange = (event) => {
        setSelect(event.target.value);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const schedule = [
        { name: 'Joseph Gregory', tasks: [{ title: 'John McCosmosophy', start: '08:00', end: '11:00', color: "#5A80F6" }, { title: 'Jane McCosmosophy', start: '11:00', end: '14:00', color: "#405AB3" }] },
        { name: 'Alison Brown', tasks: [{ title: 'John McCosmosophy', start: '09:00', end: '12:00', color: "#7E9CF9" }] },
        { name: 'Emily Rogers', tasks: [{ title: 'John McCosmosophy', start: '10:00', end: '13:00', color: "#405AB3" }] },
        { name: 'Kelly Fisher', tasks: [{ title: 'John McCosmosophy', start: '11:00', end: '14:00', color: "#7E9CF9" }] },
    ];
    const chairSchedule = [
        { name: 'Chair 1', tasks: [{ title: 'John McCosmosophy', start: '09:00', end: '11:00', color: "#5A80F6" }, { title: 'Jane McCosmosophy', start: '11:00', end: '14:00', color: "#405AB3" }] },
        { name: 'Chair 2', tasks: [{ title: 'John McCosmosophy', start: '011:00', end: '13:00', color: "#7E9CF9" }] },
        { name: 'Chair 3', tasks: [{ title: 'John McCosmosophy', start: '10:00', end: '14:00', color: "#405AB3" }] },
        { name: 'Chair 4', tasks: [{ title: 'John McCosmosophy', start: '12:00', end: '15:00', color: "#7E9CF9" }] },
    ];

    const hours = Array.from({ length: 13 }, (_, i) => `${8 + i}:00`);

    const getTimeInHours = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours + minutes / 60;
    };

    useEffect(() => {
        axios.get('https://oncore-server-public.vercel.app/api/optimize-schedule')
            .then((response) => {
                setoptimizeData(response?.data?.payload);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    console.log("optimizeData", optimizeData)

    const cardData = [
        {
            number: '15%',
            caption: "Throughput Increase"
        },
        {
            number: '30%',
            caption: "Reducation inPaitient walt Times"
        },
        {
            number: "15%",
            caption: "Reducation in Nursing Overtime"
        },


    ]
    const cardBottomData = [
        {
            number: "27",
            caption: "Overall Score"
        },
        {
            number: "30",
            caption: "Allocated Appts"
        },
        {
            number: "7",
            caption: "Total Nurses"
        },
        {
            number: "14",
            caption: "Total Chairs"
        },
        {
            number: "1.24 PM",
            caption: "Last Run"
        },
        {
            number: "Acuity mix",
            caption: "(0-0.5):7 (0.5-1):8 (3-5):6 (5+3):7"
        },
    ]
    return (
        <>

            <Grid container>
                {
                    cardData.map((item) => (
                        <Grid xs={12} md={4} p={3} className='position-relative'>
                            <div style={{ position: "absolute", top: "15px", left: "9px", zIndex: "9" }}><CheckCircleIcon style={{ color: "green", fontSize: "35px" }} /></div>
                            <Card className='p-4 d-flex justify-content-center ' style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                <div className='d-flex  align-items-center py-4'>
                                    <div className='text-center'>
                                        <Typography variant="h4">{item.number}</Typography>
                                        <Typography variant="body" className='text-secondary'>{item.caption}</Typography>
                                    </div>

                                </div>
                            </Card>
                        </Grid>
                    ))
                }


            </Grid>
            <div className='d-flex justify-content-between align-align-items-center mb-5'>

                <div className='d-flex flex-wrap align-items-center pt-5'>

                    <Button style={{ height: "38px", color: btnSelect === "Nurse Schedule" ? "#fff" : "#000", backgroundColor: btnSelect === "Nurse Schedule" ? "#222E93" : "#eef1f6", border: "none", }} className='m-1  px-4 d-flex align-items-center' onClick={() => { setBtnSelect("Nurse Schedule") }}>
                        Nurse Schedule
                    </Button>
                    <Button style={{ height: "38px", color: btnSelect === "Chair Schedule" ? "#fff" : "#000", backgroundColor: btnSelect === "Chair Schedule" ? "#222E93" : "#eef1f6", border: "none" }} className='m-1  px-4 d-flex align-items-center' onClick={() => setBtnSelect("Chair Schedule")}>
                        Chair Schedule
                    </Button>
                    <Button style={{ height: "38px", color: btnSelect === "Capacity Utilization" ? "#fff" : "#000", backgroundColor: btnSelect === "Capacity Utilization" ? "#222E93" : "#eef1f6", border: "none" }} className='m-1  px-4 d-flex align-items-center' onClick={() => setBtnSelect("Capacity Utilization")}>
                        Capacity Utilization
                    </Button>
                </div>
                <div className='d-flex flex-wrap align-items-center pt-5'>
                    <Button style={{ height: "38px", backgroundColor: "#222E93", border: "none", }} className='m-1 text-light px-4 d-flex align-items-center'>
                        <HiDownload className='me-1' /> Download
                    </Button>
                    <Button style={{ height: "38px", backgroundColor: "#222E93", border: "none" }} className='m-1 text-light px-4 d-flex align-items-center'>
                        <BsPrinter className='me-1' />Print
                    </Button>

                </div>
            </div>
            <Box sx={{ width: '100%', typography: 'body1' }} >
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="d-flex justify-content-between">
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Gantt Chart" value="1" />
                            <Tab label="List View" value="2" />
                        </TabList>
                        <FormControl style={{ width: "200px" }} className='ps-2'>
                            <Select
                                style={{ height: "38px", backgroundColor: "#eef1f6", border: "none" }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={select || "Paoll Center"}
                                onChange={handleSelectChange}
                            >
                                <MenuItem value={"Paoll Center"}>Paoll Center</MenuItem>
                                <MenuItem value={"Twenty"}>Twenty</MenuItem>
                                <MenuItem value={"Thirty"}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <TabPanel value="1">
                        {btnSelect === "Capacity Utilization" ?

                            <BarChartDataSet />
                            :
                            btnSelect === "Chair Schedule" ?
                                <div className="custom-calendar ">
                                    <header className="header" />
                                    <div className="content">
                                        <div className="timeline">
                                            <div className="timeline-header">
                                                <div className="empty-cell" />
                                                {hours.map(hour => <div key={hour} className="timeline-hour">{hour}</div>)}
                                            </div>
                                            {chairSchedule.map((nurse, index) => (
                                                <div key={index} className="timeline-row">
                                                    <div className="nurse-name">{nurse.name}</div>
                                                    <div className="tasks" style={{ width: '1300%' }}>
                                                        {nurse.tasks.map((task, idx) => {
                                                            const start = getTimeInHours(task.start);
                                                            const end = getTimeInHours(task.end);
                                                            const startColumn = start - 8 + 1; // Adjusted to match the starting hour (8 AM)
                                                            const endColumn = end - 8 + 1;   // Adjusted to match the ending hour (8 AM)

                                                            return (
                                                                <div
                                                                    key={idx}
                                                                    className="task"
                                                                    style={{
                                                                        gridColumn: `${startColumn} / ${endColumn}`,
                                                                        backgroundColor: task.color,
                                                                        // height:"43px"
                                                                    }}
                                                                >
                                                                    <span style={{ backgroundColor: "#fff", borderRadius: "50%", padding: "5px", color: "#5A80F6", marginRight: "8px" }}>JM</span>{task.title}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                :
                                btnSelect === "Nurse Schedule" ?
                                    <div className="custom-calendar ">
                                        <header className="header" />
                                        <div className="content">
                                            <div className="timeline">
                                                <div className="timeline-header">
                                                    <div className="empty-cell" />
                                                    {hours.map(hour => <div key={hour} className="timeline-hour">{hour}</div>)}
                                                </div>
                                                {schedule.map((nurse, index) => (
                                                    <div key={index} className="timeline-row">
                                                        <div className="nurse-name">{nurse.name}</div>
                                                        <div className="tasks" style={{ width: '1300%' }}>
                                                            {nurse.tasks.map((task, idx) => {
                                                                const start = getTimeInHours(task.start);
                                                                const end = getTimeInHours(task.end);
                                                                const startColumn = start - 8 + 1; // Adjusted to match the starting hour (8 AM)
                                                                const endColumn = end - 8 + 1;   // Adjusted to match the ending hour (8 AM)

                                                                return (
                                                                    <div
                                                                        key={idx}
                                                                        className="task"
                                                                        style={{
                                                                            gridColumn: `${startColumn} / ${endColumn}`,
                                                                            backgroundColor: task.color,
                                                                            // height:"43px"
                                                                        }}
                                                                    >
                                                                        <span style={{ backgroundColor: "#fff", borderRadius: "50%", padding: "5px", color: "#5A80F6", marginRight: "8px" }}>JM</span>{task.title}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    : <div className="custom-calendar ">
                                        <header className="header" />
                                        <div className="content">
                                            <div className="timeline">
                                                <div className="timeline-header">
                                                    <div className="empty-cell" />
                                                    {hours.map(hour => <div key={hour} className="timeline-hour">{hour}</div>)}
                                                </div>
                                                {schedule.map((nurse, index) => (
                                                    <div key={index} className="timeline-row">
                                                        <div className="nurse-name">{nurse.name}</div>
                                                        <div className="tasks" style={{ width: '1300%' }}>
                                                            {nurse.tasks.map((task, idx) => {
                                                                const start = getTimeInHours(task.start);
                                                                const end = getTimeInHours(task.end);
                                                                const startColumn = start - 8 + 1; // Adjusted to match the starting hour (8 AM)
                                                                const endColumn = end - 8 + 1;   // Adjusted to match the ending hour (8 AM)

                                                                return (
                                                                    <div
                                                                        key={idx}
                                                                        className="task"
                                                                        style={{
                                                                            gridColumn: `${startColumn} / ${endColumn}`,
                                                                            backgroundColor: task.color,
                                                                            // height:"43px"
                                                                        }}
                                                                    >
                                                                        <span style={{ backgroundColor: "#fff", borderRadius: "50%", padding: "5px", color: "#5A80F6", marginRight: "8px" }}>JM</span>{task.title}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='my-5'>
                                            <DoubleChart />

                                        </div>
                                    </div>
                        }
                    </TabPanel>
                    <TabPanel value="2"><ListView /></TabPanel>
                </TabContext>

            </Box>

            <div className='d-flex justify-content-between align-align-items-center '>
                {btnSelect !== "Capacity Utilization" &&
                    <div className='d-flex flex-wrap align-items-center pt-5'>

                        <div className='m-2 fw-bold'><FiberManualRecordIcon style={{ marginRight: "8px", color: "#749CFC" }} />0-1</div>
                        <div className='m-2 fw-bold'><FiberManualRecordIcon style={{ marginRight: "8px", color: "#749CFC" }} />1-3</div>
                        <div className='m-2 fw-bold'><FiberManualRecordIcon style={{ marginRight: "8px", color: "#1C4ADE" }} />3-5</div>
                        <div className='m-2 fw-bold'><FiberManualRecordIcon style={{ marginRight: "8px", color: "#081B5F" }} />Over by 5+</div>
                    </div>}
                <div className='d-flex flex-wrap align-items-center pt-5 float-end'>
                    <Button style={{ height: "38px", backgroundColor: "#eef1f6", border: "none" }} className='m-1 text-dark px-4 d-flex align-items-center'>
                        <AddRoundedIcon className='me-1 fs-6' />
                        Add Nurse
                    </Button>
                    <Button style={{ height: "38px", backgroundColor: "#eef1f6", border: "none" }} className='m-1 text-dark px-4 d-flex align-items-center'>
                        <CiUser className='me-1' />
                        Add Patient
                    </Button>
                    <Button style={{ height: "38px", backgroundColor: "#eef1f6", border: "none" }} className='m-1 text-dark px-4 d-flex align-items-center'>
                        <DeleteOutlineRoundedIcon className='me-1 fs-6' />Remove Patient
                    </Button>

                </div>
            </div>
            <Card className="p-3 d-flex  align-items-start justify-content-between flex-wrap my-3 mt-5">
                {
                    cardBottomData.map((item) => (

                        <div className='d-flex  align-items-center py-4'>
                            <div className={item.caption === "Acuity mix" ? "text-end" : "text-center"}>
                                <Typography variant="h5">{item.number}</Typography>
                                <Typography variant="caption" className='text-secondary'>{item.caption}</Typography>
                            </div>

                        </div>
                    ))
                }
            </Card>
        </>
    );
};

export default CustomCalendar;
