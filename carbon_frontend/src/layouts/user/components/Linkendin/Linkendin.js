import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import Chart from 'react-apexcharts';

const LinkedInStats = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  // Replace with your actual LinkedIn Access Token (NOT recommended for production)
  const LINKEDIN_ACCESS_TOKEN =
    'AQVofqtTLTD6Kp8SIX2aaUlMN5fMaozsAnXHqZq7yQ2AaNPLdEgb3rgx0PYH8HJXuG8iUWyPUy2B_qg72swkZIx-k1LAPB5SAPLKdXBDyR20k7wIN-g4wZF803fyKWwe4Fu1A_PkfAvemveRwy24sLw2uS--WybT2q53v3TPjmVlrG058iJPDtq4wnvPTPijU4hgWh6b6ilwGx_lq7niHeijxIX2GPWfSwu-0dBKrbqtfARZpxeJTyLUIVotZkKJaA88U5HZSk_dk3AcrfepKmTRsFWan9ArKb6LufTWqPyNtNpTdymZXxW-PRZo08HpCt34_Gc5TH2gfLoiY9rxRSgvoxDr7g';
  const ORGANIZATION_ID = '106264553';

  const fetchLinkedInStats = async () => {
    try {
      //   const response = await axios.get(
      //     `https://api.linkedin.com/v2/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=urn:li:organization:${ORGANIZATION_ID}`,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
      //       },
      //     }
      //   );
      const response = await axios.get(`http://127.0.0.1:8000/linkedin-stats`);
      console.log(response, 'responseresponse');
      setStats(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchLinkedInStats();
  }, []);

  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!stats) return <p>Loading...</p>;
  const elements = stats.elements || [];
  // Safety check in case 'elements' is empty
  const totalShareStats = elements.length > 0 ? elements[0].totalShareStatistics : {};

  // Deconstruct your relevant metrics
  const {
    impressionCount = 0,
    clickCount = 0,
    likeCount = 0,
    commentCount = 0,
    uniqueImpressionsCount = 0,
    engagement = 0,
  } = totalShareStats;
  const chartOptions = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        distributed: true, // This ensures different colors for each bar
      },
    },
    xaxis: {
      categories: ['Impressions', 'Clicks', 'Likes', 'Comments', 'Unique Impressions', 'Engagement'],
    },
    colors: ['#ff6384', '#36a2eb', '#ffce56', '#9966ff', '#c9cbcf', '#ff5733'],
  };
  const chartSeries = [
    {
      name: 'LinkedIn Metrics',
      data: [impressionCount, clickCount, likeCount, commentCount, uniqueImpressionsCount, engagement],
    },
  ];
  return (
    <>
      <div style={{ padding: '20px' }}>
        <h2 style={{ textAlign: 'center' }}>LinkedIn Stats</h2>

        {/* Single Card with a 2-column layout for each metric */}
        <Card style={{ maxWidth: 400, margin: '0 auto' }}>
          <CardContent>
            <Grid container direction="column" spacing={2}>
              {/* Row for Impressions */}
              <Grid item container>
                <Grid item xs={8}>
                  <Typography variant="subtitle1">Impressions</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h5">{impressionCount}</Typography>
                </Grid>
              </Grid>

              {/* Row for Clicks */}
              <Grid item container>
                <Grid item xs={8}>
                  <Typography variant="subtitle1">Clicks</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h5">{clickCount}</Typography>
                </Grid>
              </Grid>

              {/* Row for Likes */}
              <Grid item container>
                <Grid item xs={8}>
                  <Typography variant="subtitle1">Likes</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h5">{likeCount}</Typography>
                </Grid>
              </Grid>

              {/* Row for Shares */}
              <Grid item container>
                <Grid item xs={8}>
                  <Typography variant="subtitle1">engagement</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h5">{engagement.toFixed(2)}</Typography>
                </Grid>
              </Grid>

              {/* Row for Comments */}
              <Grid item container>
                <Grid item xs={8}>
                  <Typography variant="subtitle1">Comments</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h5">{commentCount}</Typography>
                </Grid>
              </Grid>

              {/* Row for Unique Impressions */}
              <Grid item container>
                <Grid item xs={8}>
                  <Typography variant="subtitle1">Unique Impressions</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h5">{uniqueImpressionsCount}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
      <div style={{ padding: '20px' }}>
        <h2 style={{ textAlign: 'center' }}>LinkedIn Stats</h2>
        <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
      </div>
    </>
  );
};

export default LinkedInStats;
