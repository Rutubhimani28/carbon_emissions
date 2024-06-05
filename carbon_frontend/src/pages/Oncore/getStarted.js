import { Button, Card, Typography } from '@mui/material'
import React from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import LoopIcon from '@mui/icons-material/Loop';
import { IoMaleSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
// import logo from '../assets/logo1.png'


const GetStarted = () => {

    const navigate = useNavigate()
    return (
        <div className='d-flex justify-content-center align-items-center startedBg'>
            <Card className='p-4' style={{ zIndex: "999" }}>
                <div className='pt-2 pb-4 text-center'>
                    {/* <Typography variant='h3'>Oncore AI</Typography>
                    <Typography variant='body'>for Iinfusion Centers</Typography> */}
                </div>

                <div className='shadow p-3'>
                    <p className='border-bottom pt-3'><strong>3 Simple Steps:</strong></p>
                    <ul>
                        <li className='list-unstyled py-3 d-flex align-items-center' >
                            <span style={{ backgroundColor: "#a8a9e85e", borderRadius: "50%", padding: "0px 9px", textAlign: "center", marginRight: "7px" }}>1</span>
                            <UploadIcon />
                            <span className='fs-6 ps-2 '><strong>Upload</strong> Today's Iinfusion Schedule</span>
                        </li>
                        <li className='list-unstyled py-3 d-flex align-items-center' >
                            <span style={{ backgroundColor: "#a8a9e85e", borderRadius: "50%", padding: "0px 9px", textAlign: "center", marginRight: "7px" }}>2</span>
                            <IoMaleSharp style={{ transform: "rotate(105deg)" }} />
                            <span className='fs-6 ps-2 '><strong>Identify</strong> Areas for Improvment</span>
                        </li>
                        <li className='list-unstyled py-3 d-flex align-items-center' >
                            <span style={{ backgroundColor: "#a8a9e85e", borderRadius: "50%", padding: "0px 9px", textAlign: "center", marginRight: "7px" }}>3</span>
                            <LoopIcon />
                            <span className='fs-6 ps-2 '><strong>Optimize</strong> Schedule & View Results</span>
                        </li>
                    </ul>
                </div>
                <div className='text-center p-4 '>
                    <Button className='text-white py-2 px-5 rounded-pill bg-primary' onClick={() => navigate('/dashboard/dailyCalender/fileUpload')}>Get Started <FaArrowRight className='ps-2' /></Button>
                </div>
            </Card>
        </div>
    )
}

export default GetStarted
