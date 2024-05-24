import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

AppCurrentVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartColors: PropTypes.arrayOf(PropTypes.string),
  chartData: PropTypes.array,
};

export default function AppCurrentVisits({ title, subheader, allData, chartColors, chartData, ...other }) {
  const theme = useTheme();

  const chartLabels = chartData?.map((i) => i?.label);

  const chartSeries = chartData?.map((i) => i?.value);


  const chartOptions = useChart({
    colors: chartColors,
    labels: chartLabels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: {
      enabled: true,
      formatter(val, opts) { // Shorthand method syntax
        const seriesIndex = opts.seriesIndex;
        const value = opts.w.config.series[seriesIndex];
        return fNumber(value); // Assuming fNumber is a function to format numbers
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
  });

  return (
    <Card {...other}>
      <Box display={"flex"} justifyContent={"space-between"} >
        <CardHeader title={title} fontSize={"14px"} />
        <CardHeader title={subheader} fontSize={"14px"} />

      </Box>
      <StyledChartWrapper dir="ltr" >
        {(allData?.todayCount?.totalContact > 0 || allData?.todayCount?.totalLead > 0 || allData?.todayCount?.totalPolicy > 0 || allData?.todayCount?.totalTask > 0) ?
          <ReactApexChart type="pie" series={chartSeries} options={chartOptions} height={280} /> : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No data available</div>}
      </StyledChartWrapper>
    </Card>
  );
}
