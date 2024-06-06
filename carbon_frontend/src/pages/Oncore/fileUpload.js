import { Button, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CiFileOn } from "react-icons/ci";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoMaleSharp } from "react-icons/io5";
import { AiOutlineUpload } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import CircleLoader from './circleLoader';
import Dashboard from './dashboard'

import CustomCalendar from './coustomCalender';
import ExecutiveReport from './ExcusiveReport';
import Identity from './identity';

const dropzoneStyle = {
    border: '2px dashed #77777773',
    padding: '20px',
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    flexDirection: "column",
    height: '68vh',
    textAlign: "center"
};

function MyDropzone(props) {
    const { date, setChange } = props
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const [file, setFile] = useState(null)
    const navigate = useNavigate()

    const getFileExtension = (filename) => {
        const parts = filename.split('.');
        if (parts.length > 1) {
            return parts.pop();
        }
        return '';

    }

    const handleUpload = async (selectedFile) => {
        console.log(selectedFile[0], "selectedFile[0]")
        try {
            const formData = new FormData();
            formData.append('file', selectedFile[0]);

            const response = await axios.post('https://oncore-server-public.vercel.app/api/upload-schedule', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response, "response");
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    const onDrop = acceptedFiles => {
        setFile(acceptedFiles)
        handleUpload(acceptedFiles)
    };



    // const handleRedirect = () => {
    //     navigate('/dashboard/dailyCalender/dashboard')
    // }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleRedirect = () => {
        const duration = 1000; // 5 seconds in milliseconds
        const increment = 100; // Update progress every 100 milliseconds
        const totalIncrements = duration / increment;
        const incrementAmount = 100 / totalIncrements;

        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += incrementAmount;
            setProgress(currentProgress);
            setIsLoading(true)
            if (currentProgress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    // navigate('/dashboard/dailyCalender/calender');
                    setChange(2)
                    setIsLoading(false)
                }, 5000); // Navigating after 5 seconds
            }
        }, increment);
    };

    return (
        <>
            {
                file?.length > 0 ?
                    (
                        <>
                            <div style={dropzoneStyle}>
                                <CiFileOn className='display-1 text-primary' />
                                <Typography variant="h6">{file && file[0]?.name}</Typography>
                                <Typography variant="caption" style={{ textTransform: 'uppercase' }}>{getFileExtension(file[0]?.name)}</Typography>

                                {
                                    !isLoading &&
                                    <div className='mt-5'>
                                        <Button variant='contained' startIcon={<FaCheck />} onClick={() => handleRedirect()} style={{ backgroundColor: "#2ec67d" }}> View Result</Button>
                                    </div>
                                }
                                <div className='d-flex justify-content-center my-2'>
                                    {
                                        isLoading && <CircleLoader percentage={progress} />
                                    }
                                </div>
                                {/* <div className='mt-5'>
                                    <Button variant='contained' startIcon={<FaCheck />} onClick={() => navigate('/dashboard/executive-reports')}> View Result</Button>
                                </div> */}
                                <Typography variant="caption" onClick={() => setFile(null)} style={{ cursor: 'pointer' }}>Replace File</Typography>
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                            <div {...getRootProps()} style={dropzoneStyle}>
                                <FaCloudUploadAlt className='display-1 text-primary' />
                                <Typography variant="h6">Upload Today's Schedule</Typography>
                                <Typography variant="caption">Supported formats XLSX,CSV</Typography>
                                <div className='mt-5'>
                                    <Typography variant="h6">Drag and Drop</Typography>
                                    <Typography variant="h6" className="py-2">-- <IoMaleSharp className='fs-6' /> --</Typography>
                                    <Button variant='contained' style={{ backgroundColor: "#222e93" }}> Select File</Button>
                                </div>
                            </div>
                        </>
                    )
            }
        </>
    );
}

const Schedule = () => {
    const [change, setChange] = useState(1);
    const [date, setDate] = useState('')
    const [select, setSelect] = useState('Paoll Center');
    const handleSelectChange = (event) => {
        setSelect(event.target.value);
    };


    return (
        <div className='p-3'>
            <Typography variant="body">Step {change}/3</Typography>
            <Typography variant="h5">{change === 1 ? "Upload" : change === 2 ? "Identify" : change === 3 ? "Optimize" : ""}</Typography>
            <div className='d-flex justify-content-between align-items-center pt-3'>
                <div className='d-flex align-items-center'>
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
                    <div className=' dateFiled my-2 ps-2' style={{ width: "200px" }}>
                        <TextField type="date" style={{ height: "38px" }} onChange={(e) => setDate(e.target.value)} />
                    </div>
                </div>
                {
                    change !== 1 &&
                    <div>
                        <Button style={{ height: "38px", backgroundColor: "#eef1f6", border: "none", }} className='mx-1 text-dark px-4 d-flex align-items-center'>
                            <AiOutlineUpload className='me-1' /> Upload New
                        </Button>
                    </div>
                }
            </div>
            {
                change === 1 ?
                    <div className='py-3'>
                        <MyDropzone setChange={setChange} change={change} />
                    </div>
                    :
                    change === 2 ?
                        <Identity setChange={setChange} change={change} />
                        :
                        change === 3 ?
                            <CustomCalendar setChange={setChange} change={change} />
                            : ""
            }


        </div>
    )
}

export default Schedule
