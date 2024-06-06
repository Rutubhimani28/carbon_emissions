import React from 'react';
import ApexCharts from 'react-apexcharts';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Typography } from '@mui/material';


const Forecast = () => {
    const options = {
        series: [
            {
                type: 'column',
                data: [30, 35, 41, 47, 42, 43, 53, 52, 42, 40, 35, 30],
            },
            {
                type: 'line',
                data: [30, 35, 41, 47, 42, 43, 53, 52, 42, 40, 35, 30],
            },
        ],
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                show: false,
                tools: {
                    download: false, // Disable download icon
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true,
                }
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                columnWidth: '30%',
                dataLabels: {
                    show: false,
                },
                // colors: {
                //     ranges: [
                //         { from: 0.00, to: 10.00, color: '#cd1f1e' }, // Red
                //         { from: 10.00, to: 14.00, color: '#f2da02' }, // Yellow
                //         { from: 14.00, to: 16.00, color: '#f28900' }, // Orange
                //         { from: 16.00, to: 20.00, color: '#c7c7c7' }, // Gray
                //     ],
                // },
            },
        },
        stroke: {
            width: [0, 4],
            curve: 'smooth', // Make the line chart display curves
            dashArray: [0, 5],// Dash the second series
            colors: ['#ff6564']
        },
        // dataLabels: {
        //     enabled: true,
        //     enabledOnSeries: [1],
        // },
        dataLabels: {
            enabled: false,
            style: {
                fontSize: '12px',
                colors: ['#304758'],
            },
        },
        labels: [
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
        ],
        position: 'bottom',
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        // xaxis: {
        //     type: 'category',
        // },
        yaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
            },
        },
        annotations: {
            yaxis: [
                {
                    y: '100%', // Corrected value to a number
                    borderColor: '#000',
                    label: {
                        borderColor: '#000',
                        style: {
                            color: '#fff',
                            background: '#000',
                        },
                        text: 'Max-Capacity',
                    },
                },
            ],
        },
        colors: ['#91b1ff'],
        legend: {
            show: false, // Hide the legend
        }
    };

    return (
        <>
            <div className='text-center'>

                <Typography variant='h6'>Today's Forecast <span className='text-secondary'>(5/30/2024)</span></Typography>
            </div>

            <ApexCharts options={options} series={options.series} type="line" height={350} />
            <div className='d-flex flex-wrap align-items-center justify-content-center pt-5'>

                <div className='m-2 fw-bold'><FiberManualRecordIcon style={{ marginRight: "8px", color: "#9db9ff" }} />Under by 2+ Patients</div>
                <div className='m-2 fw-bold'><FiberManualRecordIcon style={{ marginRight: "8px", color: "#4c76ff" }} />At Max Capacity</div>
                <div className='m-2 fw-bold'><FiberManualRecordIcon style={{ marginRight: "8px", color: "#324178" }} />Over by 1-2 Patients</div>
                <div className='m-2 fw-bold'><FiberManualRecordIcon style={{ marginRight: "8px", color: "#4c76ff" }} />Well Over Max Capacity</div>
            </div>
        </>
    )

};

export default Forecast;
