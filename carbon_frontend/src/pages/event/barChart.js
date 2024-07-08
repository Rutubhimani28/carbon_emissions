// import { useEffect, useState } from 'react';
// import ReactApexChart from 'react-apexcharts';

// const CustomBarChart = ({ chartData }) => {

//     const [data, setData] = useState([])
//     console.log(data, "data")
//     const series = [
//         {
//             name: 'Total Emission',
//             data: [0, 10111.5, 0, 10, 0, 0, 0, 6.36, 0],
//         }
//     ]

//     const options = {
//         chart: {
//             type: 'bar',
//             height: 350,
//         },
//         plotOptions: {
//             bar: {
//                 horizontal: false,
//                 columnWidth: '55%',
//                 endingShape: 'rounded',
//             },
//         },
//         dataLabels: {
//             enabled: false,
//         },
//         stroke: {
//             show: true,
//             width: 2,
//             colors: ['transparent'],
//         },
//         xaxis: {
//             categories: ['Air Travel', 'Local Transportation', 'Hotel', 'Food', 'Logistics', 'Event Production', 'Energy', 'Digital', 'Waste'],
//         },

//         fill: {
//             opacity: 1,
//         },
//         tooltip: {
//             y: {
//                 function(val) {
//                     return console.log(val);
//                 },
//             },
//         },
//     };

//     useEffect(() => {
//         setData(chartData)
//     }, [chartData])

//     return (
//         <div>
//             <div id="chart">
//                 <ReactApexChart options={options} series={series} type="bar" height={350} />
//             </div>
//             <div id="html-dist" />
//         </div>
//     );
// };


// export default CustomBarChart

import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const CustomBarChart = ({ chartData }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(chartData);
    }, [chartData]);

    const series = [
        {
            name: 'Total Emission',
            data: data || [], // Use data from state if available
        }
    ];

    const options = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: ['Air Travel', 'Local Transportation', 'Hotel', 'Food & Beverages', 'Logistics', 'Event Production', 'Energy', 'Digital Comms', 'Waste'],
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            y: {
                formatter(val) {
                    return val?.toFixed(2); // Format the value to 2 decimal places
                },
            },
        },
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
            <div id="html-dist" />
        </div>
    );
};

export default CustomBarChart;
