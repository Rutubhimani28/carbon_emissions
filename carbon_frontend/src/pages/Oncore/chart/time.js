import { Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';


const ChartComponents = () => {
    const seriesData = {
        dates: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'],
        prices: [150, 10, 170, 80, 100]
    };
    const options = {
        chart: {
            type: 'area',
            height: 250,
            zoom: {
                enabled: false
            },
            toolbar: {
                show: true,
                tools: {
                    download: false, // Disable download icon
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth' // Make the chart line curve
        },
        labels: seriesData?.dates,
        xaxis: {
            type: 'datetime',
            labels: {
                show: false // Remove x-axis labels
            },
            axisBorder: {
                show: false // Remove x-axis border
            },
            axisTicks: {
                show: false // Remove x-axis ticks
            }
        },
        yaxis: {
            opposite: true,
            labels: {
                show: false // Remove y-axis labels
            },
            axisBorder: {
                show: false // Remove y-axis border
            },
            axisTicks: {
                show: false // Remove y-axis ticks
            }
        },
        grid: {
            show: false // Remove grid lines
        },
        legend: {
            horizontalAlign: 'left'
        }
    };

    const series = [{
        name: "STOCK ABC",
        data: seriesData?.prices
    }];
    return (
        <div >
            <Card className='p-4'>
                <div>
                    <Typography variant='h5'>Patient Wait Time</Typography>
                    <div className='d-flex justify-content-start align-items-center py-4'>
                        <div className='text-center me-3'>
                            <Typography variant="h5"> 15 min</Typography>
                            <Typography variant="caption">Today</Typography>
                        </div>
                        <div className='text-center mx-3'>
                            <Typography variant="h5">10%↓</Typography>
                            <Typography variant="caption">Trend</Typography>
                        </div>
                        <div className='text-center mx-3'>
                            <Typography variant="h5">20 min</Typography>
                            <Typography variant="caption">Goal</Typography>
                        </div>
                        <div className='text-center mx-3'>
                            <Typography variant="h5">25 min</Typography>
                            <Typography variant="caption">Baseline</Typography>
                        </div>

                    </div>
                </div>
                <Chart options={options} series={series} type="area" height={250} />
            </Card>
        </div>
    )
}

export default ChartComponents