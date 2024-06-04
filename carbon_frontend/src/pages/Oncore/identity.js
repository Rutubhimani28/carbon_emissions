import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import BarChart from './chart/barchart';
import DonutChart from './chart/dounetChart';

const Identity = (props) => {
    const { setChange } = props
    const navigate = useNavigate();
    const cardData = [
        {
            number: "27",
            caption: "overall Score"
        },
        {
            number: "30",
            caption: "Allocates Appts"
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

    const [select, setSelect] = useState('Paoll Center');

    const handleSelectChange = (event) => {
        setSelect(event.target.value);
    };
    return (
        <div>
            <Card className="p-3 d-flex  align-items-start justify-content-between flex-wrap">
                {
                    cardData.map((item) => (

                        <div className='d-flex  align-items-center py-4'>
                            <div className={item.caption === "Acuity mix" ? "text-end" : "text-center"}>
                                <Typography variant="h5">{item.number}</Typography>
                                <Typography variant="caption" className='text-secondary'>{item.caption}</Typography>
                            </div>

                        </div>
                    ))
                }
            </Card>
            <div className='d-flex justify-content-between align-align-items-center '>

                {/* <div className='d-flex flex-wrap align-items-center pt-5'>
                    <FormControl style={{ width: "200px" }} className='ps-2'>
                        <Select
                            style={{ height: "38px", backgroundColor: "#e0ebff", border: "none" }}
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
                        <TextField type="date" style={{ height: "38px" }} />
                    </div>
                </div> */}
                {/* <div className='d-flex flex-wrap align-items-center pt-5'>
                    <Button style={{ height: "38px", backgroundColor: "#e0ebff", border: "none", }} className='mx-1 text-dark px-4 d-flex align-items-center'>
                        <AiOutlineUpload className='me-1' /> Upload New
                    </Button>
                    <Button style={{ height: "38px", backgroundColor: "#e0ebff", border: "none" }} className='mx-1 text-dark px-4 d-flex align-items-center'>
                        <CiUser className='me-1' />Add Nurse
                    </Button>

                </div> */}
            </div>
            <Card className='my-5 p-4'>
                <BarChart />
            </Card>

            <div className='d-flex justify-content-center' >
                <Button className='text-white py-2 px-5 ' style={{ backgroundColor: "#2ec67d" }}
                    onClick={() => setChange(3)}
                >View Result <ArrowForwardIcon className='ms-3 fs-6' /> </Button>
                {/* <Button className='text-white py-2 px-5  bg-primary'
                //  onClick={() => navigate('/dashboard/fileUpload')}
                >Ready to Optimize? </Button> */}

            </div>
            <div className=' py-5 my-5'>
                <DonutChart />

            </div>

        </div>
    )
}

export default Identity
