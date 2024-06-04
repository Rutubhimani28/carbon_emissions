import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Card, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import react, { useState } from 'react';

const ScheduleTemplates = () => {

    const [select1, setSelect1] = useState('Penn Center');
    const [select2, setSelect2] = useState('Calendar YTD (Jan 2024 - Present)');
    const [select3, setSelect3] = useState('Paoll All Days (Mon - Sun)');
    const handleSelect1Change = (e) => {
        setSelect1(e.target.value);
    };
    const handleSelect2Change = (e) => {
        setSelect2(e.target.value);
    };
    const handleSelect3Change = (e) => {
        setSelect3(e.target.value);
    };
    const data = [
        {
            ageGroup: "0-1",
            apptStars: 10,
            apptFinishes: 8,
            expectedPatients: 15,
            totalStartsPerHour: 5,
        },
        {
            ageGroup: "2-4",
            apptStars: 12,
            apptFinishes: 9,
            expectedPatients: 20,
            totalStartsPerHour: 6,
        },
        // Add more data objects as needed
    ];
    return (
        <div className='p-3'>
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
            </Grid>
            <div>
                <table className='border table-bordered' >
                    <thead>
                        <tr>
                            <th align='center'>(0-1)</th>
                            <th align='center'>(1-3)</th>
                            <th align='center'>(3-5)</th>
                            <th align='center'>5+</th>
                            <th align='center'>Appt Stars</th>
                            <th align='center'>Appt Finishes</th>
                            <th align='center'>Expected Patients</th>
                            <th align='center'>Total Starts/hr</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td />
                            <td>1</td>
                            <td />
                            <td>1</td>
                            <td>2</td>
                            <td>0</td>
                            <td>2</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td />
                            <td>1</td>
                            <td />
                            <td />
                            <td>1</td>
                            <td>0</td>
                            <td>1</td>
                            <td>5</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ScheduleTemplates
