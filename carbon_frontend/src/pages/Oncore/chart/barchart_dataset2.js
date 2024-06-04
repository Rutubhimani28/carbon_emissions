

import { Typography } from '@mui/material';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = ({ analyzeData }) => {
    const [series, setSeries] = useState([
        {
            name: 'Cashflow',
            type: 'column',
            data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5, 9.5, 7.8, 6.4, 5]
        },
        {
            name: 'Revenue',
            type: 'line',
            data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5, 9.5, 7.8, 6.4, 5]
        }
    ]);

    const [options, setOptions] = useState({
        chart: {
            height: 350,
            type: 'line',
            stacked: false,
            toolbar: {
                show: true,
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
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [1, 1, 4]
        },
        title: {

            align: 'left',
            offsetX: 110
        },
        xaxis: {
            categories: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
        },
        yaxis: [

            {
                show: false,
                min: 0,
                seriesName: 'Cashflow',
                opposite: true,
                // axisTicks: {
                //     show: true
                // },
                axisBorder: {
                    show: true,
                    color: '#00E396'
                },
                labels: {
                    style: {
                        colors: '#00E396'
                    }
                },

            },
            {
                show: false,
                seriesName: 'Revenue',
                opposite: true,
                // axisTicks: {
                //     show: true
                // },
                axisBorder: {
                    show: true,
                    color: '#FEB019'
                },
                labels: {
                    style: {
                        colors: '#FEB019'
                    }
                },

            }
        ],
        tooltip: {
            fixed: {
                enabled: true,
                position: 'bottom', // topRight, topLeft, bottomRight, bottomLeft
                horizontalAlign: "center",
                offsetY: 30,
                offsetX: 60
            }
        },
        legend: {
            horizontalAlign: 'left',
            offsetX: 40
        },
        plotOptions: {
            bar: {
                borderRadius: 10, // Add this line to round the corners of the bars
                columnWidth: '30%' // Optional: adjust the width of the columns
            },
            colors: {
                ranges: analyzeData && analyzeData?.hourlyColors.map(({ time, color }) => ({
                    from: parseInt(time.split(":")[0], 10) === 8 ? 0.00 : parseFloat(time),
                    to: parseFloat(time) + 1,
                    color
                }))
            },
            grid: {
                show: false
            }
        }
    });


    return (
        <>
            <div><Typography variant='h5'>Chair Utilazation</Typography></div>
            <ReactApexChart options={options} series={series} type="line" height={350} />

        </>
    );
}

export default BarChart;
