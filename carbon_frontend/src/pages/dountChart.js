
// import React from 'react';
// import ReactApexChart from 'react-apexcharts';

// const DonutChart = () => {
//     const commonOptions = {
//         chart: {
//             type: 'radialBar',
//         },
//         plotOptions: {
//             pie: {
//                 dataLabels: {
//                     offset: 0, // Adjust to center the labels
//                     minAngleToShowLabel: 0,
//                 },
//                 donut: {
//                     labels: {
//                         show: true,
//                         name: {
//                             show: false, // Hide the name to show only the value
//                         },
//                         value: {
//                             show: true,
//                             fontSize: '20px',
//                             fontFamily: 'Helvetica, Arial, sans-serif',
//                             fontWeight: 600,
//                             color: '#373d3f',
//                             offsetY: 0,
//                         },
//                         total: {
//                             show: false
//                         }
//                     }
//                 }
//             }
//         },
//         responsive: [{
//             breakpoint: 480,
//             options: {
//                 chart: {
//                     width: 200
//                 },
//                 legend: {
//                     show: false
//                 }
//             }
//         }],
//     };

//     const options1 = {
//         ...commonOptions,
//         series: [75],
//         colors: ['#ff9000'] // Set color for first donut chart
//     };
//     const options2 = {
//         ...commonOptions,
//         series: [82],
//         colors: ['#20ab40'] // Set color for second donut chart
//     };
//     const options3 = {
//         ...commonOptions,
//         series: [68],
//         colors: ['#cd1f1e'] // Set color for third donut chart
//     };
//     const options4 = {
//         ...commonOptions,
//         series: [86],
//         colors: ['#20ab40'] // Set color for fourth donut chart
//     };


//     return (
//         <div id="chart" className='d-flex justify-content-around'>
//             <ReactApexChart options={options1} series={options1.series} type="donut" width={300} />
//             <ReactApexChart options={options2} series={options2.series} type="donut" width={300} />
//             <ReactApexChart options={options3} series={options3.series} type="donut" width={300} />
//             <ReactApexChart options={options4} series={options4.series} type="donut" width={300} />
//         </div>
//     );
// }

// export default DonutChart;


import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
    const commonChartOptions = {
        height: 350,
        type: 'radialBar',
    };

    const [chartData, setChartData] = useState({
        series: [75],
        options: {
            chart: commonChartOptions,
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '50%',
                    },
                    track: {
                        strokeWidth: '50%',
                    },
                },
            },
            labels: ['Cricket'],
        },
    });

    const [chartData2, setChartData2] = useState({
        series: [82],
        options: {
            chart: commonChartOptions,
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '50%',
                    },
                    track: {
                        strokeWidth: '50%',
                    },
                },
            },
            labels: ['Cricket'],
        },
    });

    const [chartData3, setChartData3] = useState({
        series: [68],
        options: {
            chart: commonChartOptions,
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '50%',
                    },
                    track: {
                        strokeWidth: '50%',
                    },

                },
            },
            labels: ['Cricket'],
        },
    });

    const [chartData4, setChartData4] = useState({
        series: [86],
        options: {
            chart: commonChartOptions,
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '50%',
                    },
                    track: {
                        strokeWidth: '50%',
                    },
                },
            },
            labels: ['Cricket'],
        },
    });

    return (
        <div>
            <div id="chart" className='d-flex flex-wrap'>
                <ReactApexChart options={chartData.options} series={chartData.series} type="radialBar" height={250} />
                <ReactApexChart options={chartData2.options} series={chartData2.series} type="radialBar" height={250} />
                <ReactApexChart options={chartData3.options} series={chartData3.series} type="radialBar" height={250} />
                <ReactApexChart options={chartData4.options} series={chartData4.series} type="radialBar" height={250} />
            </div>
        </div>
    );
};

export default ApexChart;
