
import { Box, Card, CardHeader, TextField } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';

const BarChart = () => {

  const dispatch = useDispatch()
  const chartData = useSelector((state) => state?.dashboardDetails?.chartData)
  const today = new Date()
  const [startDate, setStartDate] = useState(today)
  const date = chartData?.map((item) => item?.date)

  const leadCount = chartData?.map((i) => i?.leadCount) || 0
  const contactCount = chartData?.map((i) => i?.contactCount) || 0
  const policyCount = chartData?.map((i) => i?.policyCount) || 0
  const taskCount = chartData?.map((i) => i?.taskCount) || 0

  const chartOptions = {
    colors: ["#2065d1", "#ffc107", "#ff0000", "#1890ff"],
    series: [
      {
        name: 'Lead',
        data: leadCount,
      },
      {
        name: 'Contact',
        data: contactCount,
      },
      {
        name: 'Policy',
        data: policyCount,
      },
      {
        name: 'Task',
        data: taskCount,
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: true,
        tools: {
          download: false,
        },
      },
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
      categories: date,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}`,
      },
    },
  };

  const handleDateChange = (e) => {
    //   setStartDate(e.target.value);
    //   dispatch(fetchChartData({ startDate: e.target.value }));
  };
  // useEffect(() => {
  //   dispatch(fetchChartData({ startDate }));
  // }, []);



  return (
    <Card style={{ padding: "0px 15px" }}>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <CardHeader title={"Week Statastics :"} />
        <TextField id="outlined-basic" type="date" variant="outlined" size='small' onChange={(e) => handleDateChange(e)} value={moment(startDate).format("YYYY-MM-DD")} defaultValue={startDate} style={{ marginTop: "24px" }} className='chartDate' />
      </Box>
      <div id="chart">

        <ReactApexChart options={chartOptions} series={chartOptions.series} type="bar" height={400} />
      </div>
    </Card>

  );
};

export default BarChart;
