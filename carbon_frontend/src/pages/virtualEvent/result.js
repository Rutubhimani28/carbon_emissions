import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Card, Container, Grid, Stack, Typography, Accordion, AccordionDetails, AccordionSummary, CircularProgress } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Result = ({ value }) => {

    return (
        <div>
            Virtual Event Result
        </div>
    )
}

export default Result
