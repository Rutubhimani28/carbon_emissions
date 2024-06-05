

// import { Typography } from '@mui/material';
// import React, { useState } from 'react';
// import ReactApexChart from 'react-apexcharts';

// const BarChart = ({ analyzeData }) => {
//     const [series, setSeries] = useState([
//         {
//             name: 'Cashflow',
//             type: 'column',
//             data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5, 9.5, 7.8, 6.4, 5]
//         },
//         {
//             name: 'Revenue',
//             type: 'line',
//             data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5, 9.5, 7.8, 6.4, 5]
//         }
//     ]);

//     const [options, setOptions] = useState({
//         chart: {
//             height: 350,
//             type: 'line',
//             stacked: false,
//             toolbar: {
//                 show: true,
//                 tools: {
//                     download: false, // Disable download icon
//                     selection: true,
//                     zoom: true,
//                     zoomin: true,
//                     zoomout: true,
//                     pan: true,
//                     reset: true,
//                 }
//             }
//         },
//         dataLabels: {
//             enabled: false
//         },
//         stroke: {
//             width: [1, 1, 4]
//         },
//         title: {

//             align: 'left',
//             offsetX: 110
//         },
//         xaxis: {
//             categories: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
//         },
//         yaxis: [

//             {
//                 show: false,
//                 min: 0,
//                 seriesName: 'Cashflow',
//                 opposite: true,
//                 // axisTicks: {
//                 //     show: true
//                 // },
//                 axisBorder: {
//                     show: true,
//                     color: '#00E396'
//                 },
//                 labels: {
//                     style: {
//                         colors: '#00E396'
//                     }
//                 },

//             },
//             {
//                 show: false,
//                 seriesName: 'Revenue',
//                 opposite: true,
//                 // axisTicks: {
//                 //     show: true
//                 // },
//                 axisBorder: {
//                     show: true,
//                     color: '#FEB019'
//                 },
//                 labels: {
//                     style: {
//                         colors: '#FEB019'
//                     }
//                 },

//             }
//         ],
//         tooltip: {
//             fixed: {
//                 enabled: true,
//                 position: 'bottom', // topRight, topLeft, bottomRight, bottomLeft
//                 horizontalAlign: "center",
//                 offsetY: 30,
//                 offsetX: 60
//             }
//         },
//         legend: {
//             horizontalAlign: 'left',
//             offsetX: 40
//         },
//         plotOptions: {
//             bar: {
//                 borderRadius: 10, // Add this line to round the corners of the bars
//                 columnWidth: '30%' // Optional: adjust the width of the columns
//             },
//             colors: {
//                 ranges: analyzeData && analyzeData?.hourlyColors.map(({ time, color }) => ({
//                     from: parseInt(time.split(":")[0], 10) === 8 ? 0.00 : parseFloat(time),
//                     to: parseFloat(time) + 1,
//                     color
//                 }))
//             },
//             grid: {
//                 show: false
//             }
//         }
//     });


//     return (
//         <>
//             <div><Typography variant='h5'>Chair Utilazation</Typography></div>
//             <ReactApexChart options={options} series={series} type="line" height={350} />

//         </>
//     );
// }

// export default BarChart;

import { Typography } from '@mui/material';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Barchart = () => {
    const [series] = useState([
        {
            data: [12.3, 15.1, 9.0, 19.1, 14.0, 3.6, 13.2, 12.3, 15.4, 8, 10.5, 18.2],
        },
    ]);

    const [options] = useState({
        chart: {
            height: 350,
            type: 'bar',
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
        dataLabels: {
            enabled: false,
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ['#304758'],
            },
        },
        xaxis: {
            categories: [
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
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    },
                },
            },
            tooltip: {
                enabled: true,
            },
        },
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
        title: {
            floating: true,
            offsetY: 330,
            align: 'center',
            style: {
                color: '#444',
            },
        },
        annotations: {
            position: 'front',
            yaxis: [
                {
                    y: 20,
                    borderColor: '#000',
                    label: {
                        borderColor: '#000',
                        style: {
                            color: '#fff',
                            background: '#000'
                        },
                        text: 'Max-Capacity'
                    }
                }
            ]
        },
        colors: ['#91b1ff']
    });

    return (
        <>
            <div><Typography variant='h5'>Chair Utilization</Typography></div>
            <ReactApexChart options={options} series={series} type="bar" height={350} />
            <div className='d-flex flex-wrap align-items-center justify-content-center pt-5'>

                <div className='m-2 fw-bold'><FiberManualRecordIcon style={{ marginRight: "8px", color: "#9db9ff" }} />Under by 2+ Patients</div>
                <div className='m-2 fw-bold'><FiberManualRecordIcon style={{ marginRight: "8px", color: "#4c76ff" }} />At Max Capacity</div>
                <div className='m-2 fw-bold'><FiberManualRecordIcon style={{ marginRight: "8px", color: "#324178" }} />Over by 1-2 Patients</div>
                <div className='m-2 fw-bold'><FiberManualRecordIcon style={{ marginRight: "8px", color: "#4c76ff" }} />Well Over Max Capacity</div>
            </div>
        </>
    );
}

export default Barchart;
