// src/CustomCalendar.js
import { Button, Card, FormControl, MenuItem, Select, Table, TextField, Typography } from '@mui/material';
import { AiOutlineUpload } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import './CustomCalendar.css';
import react, { useState } from 'react';
import { HiDownload } from "react-icons/hi";
import { BsPrinter } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { GiRockingChair } from "react-icons/gi";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const CustomCalendar = () => {

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const schedule = [
        { name: 'Joseph Gregory', tasks: [{ title: 'John McCosmosophy', start: '08:00', end: '10:00' }, { title: 'Jane McCosmosophy', start: '11:00', end: '13:00' }] },
        { name: 'Alison Brown', tasks: [{ title: 'John McCosmosophy', start: '09:00', end: '11:00' }] },
        { name: 'Emily Rogers', tasks: [{ title: 'John McCosmosophy', start: '10:00', end: '12:00' }] },
        { name: 'Kelly Fisher', tasks: [{ title: 'John McCosmosophy', start: '11:00', end: '14:00' }] },
    ];

    const hours = Array.from({ length: 13 }, (_, i) => `${8 + i}:00`);

    const getTimeInHours = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours + minutes / 60;
    };
    const cardData = [
        {
            number: "95",
            caption: "overall Score"
        },
        {
            number: "30",
            caption: "Allocates Appts"
        },
        {
            number: "0",
            caption: "Overloaded Appts"
        },
        {
            number: "14",
            caption: "Total Chairs"
        },
        {
            number: "7",
            caption: "Total Nurses"
        },
        {
            number: "5/19",
            caption: "date"
        },
        {
            number: "1.24 PM",
            caption: "Last Run"
        },

    ]
    return (
        <>

            <Card className="p-3 d-flex  align-items-center justify-content-between flex-wrap">
                {
                    cardData.map((item) => (

                        <div className='d-flex  align-items-center py-4'>
                            <div className='text-center'>
                                <Typography variant="h4">{item.number}</Typography>
                                <Typography variant="body" className='text-secondary'>{item.caption}</Typography>
                            </div>

                        </div>
                    ))
                }
            </Card>
            <div className='d-flex justify-content-between align-align-items-center '>

                <div className='d-flex flex-wrap align-items-center pt-5'>

                    <Button style={{ height: "38px", backgroundColor: "#10253f", border: "none", }} className='mx-1 text-light px-4 d-flex align-items-center'>
                        Nurse Schedule
                    </Button>
                    <Button style={{ height: "38px", backgroundColor: "#eef1f6", border: "none" }} className='mx-1 text-dark px-4 d-flex align-items-center'>
                        Chair Schedule
                    </Button>
                </div>
                <div className='d-flex flex-wrap align-items-center pt-5'>
                    <Button style={{ height: "38px", backgroundColor: "#10253f", border: "none", }} className='mx-1 text-light px-4 d-flex align-items-center'>
                        <HiDownload className='me-1' /> Download
                    </Button>
                    <Button style={{ height: "38px", backgroundColor: "#10253f", border: "none" }} className='mx-1 text-light px-4 d-flex align-items-center'>
                        <BsPrinter className='me-1' />Print
                    </Button>

                </div>
            </div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Item One" value="1" />
                            <Tab label="Item Two" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"> <div className="custom-calendar my-4">
                        <header className="header">
                            <h1>Optimize</h1>
                            <div className="summary">
                                <span>Overall Score: 27</span>
                                <span>Allocated Appts: 30</span>
                                <span>Total Nurses: 7</span>
                                <span>Total Chairs: 14</span>
                                <span>Last Run: 1:24 PM</span>
                            </div>
                        </header>
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
                                                            gridColumn: `${startColumn} / ${endColumn}`
                                                        }}
                                                    >
                                                        {task.title}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                        <div className='d-flex justify-content-between align-align-items-center '>

                            <div className='d-flex flex-wrap align-items-center pt-5'>

                                <div className='mx-2 fw-bold'><FiberManualRecordIcon style={{ marginRight: "8px", color: "#749CFC" }} />0-1</div>
                                <div className='mx-2 fw-bold'><FiberManualRecordIcon style={{ marginRight: "8px", color: "#749CFC" }} />1-3</div>
                                <div className='mx-2 fw-bold'><FiberManualRecordIcon style={{ marginRight: "8px", color: "#1C4ADE" }} />3-5</div>
                                <div className='mx-2 fw-bold'><FiberManualRecordIcon style={{ marginRight: "8px", color: "#081B5F" }} />Over by 5+</div>
                            </div>
                            <div className='d-flex flex-wrap align-items-center pt-5'>
                                <Button style={{ height: "38px", backgroundColor: "#eef1f6", border: "none" }} className='mx-1 text-dark px-4 d-flex align-items-center'>
                                    <CiUser className='me-1' />Add Nurse
                                </Button>
                                <Button style={{ height: "38px", backgroundColor: "#eef1f6", border: "none" }} className='mx-1 text-dark px-4 d-flex align-items-center'>
                                    <GiRockingChair className='me-1' />Add Chair
                                </Button>
                                <Button style={{ height: "38px", backgroundColor: "#eef1f6", border: "none" }} className='mx-1 text-dark px-4 d-flex align-items-center'>
                                    <IoMdTime className='me-1' />Change Hours
                                </Button>

                            </div>
                        </div></TabPanel>
                    <TabPanel value="2">
                        <div>
                            <Table />
                        </div>
                    </TabPanel>
                </TabContext>
            </Box>

        </>
    );
};

export default CustomCalendar;
