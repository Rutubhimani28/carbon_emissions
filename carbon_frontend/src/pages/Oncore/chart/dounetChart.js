import { Card, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import label from "../../../components/label";

const Schedule = ({ analyze }) => {
    console.log(analyze?.overallScore, 'analyze?.overallScore')
    const [chartState, setChartState] = useState({
        series: [analyze?.overallScore || 0],
        options: {
            colors: ["#ff9000"],
            plotOptions: {
                radialBar: {
                    size: undefined,
                    inverseOrder: false,
                    startAngle: 0,
                    endAngle: 360,
                    offsetX: 0,
                    offsetY: 0,
                    hollow: {
                        margin: 5,
                        size: "50%",
                        background: "transparent",
                        image: undefined,
                        imageWidth: 150,
                        imageHeight: 150,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        imageClipped: true,
                        position: "front",
                        dropShadow: {
                            enabled: false,
                            top: 0,
                            left: 0,
                            blur: 3,
                            opacity: 0.5
                        }
                    },
                    track: {
                        show: true,
                        startAngle: undefined,
                        endAngle: undefined,
                        background: "#D8D8D8",
                        strokeWidth: "97%",
                        opacity: 1,
                        margin: 5,
                        dropShadow: {
                            enabled: false,
                            top: 0,
                            left: 0,
                            blur: 3,
                            opacity: 0.5
                        }
                    },
                    dataLabels: {
                        show: true,
                        name: {
                            show: false,
                            fontSize: "22px",
                            fontFamily: undefined,
                            color: undefined,
                            offsetY: -10
                        },
                        value: {
                            show: true,
                            fontSize: "16px",
                            fontFamily: undefined,
                            color: undefined,
                            offsetY: 16,
                            // formatter: function (val) {
                            //   return val + "%";
                            // }
                        }
                    }
                }
            }
        },
        series1: [analyze?.nursingOverTimeScore || 0],
        options1: {
            colors: ["#20ab40"],
            plotOptions: {
                radialBar: {
                    size: undefined,
                    inverseOrder: false,
                    startAngle: 0,
                    endAngle: 360,
                    offsetX: 0,
                    offsetY: 0,
                    hollow: {
                        margin: 5,
                        size: "50%",
                        background: "transparent",
                        image: undefined,
                        imageWidth: 150,
                        imageHeight: 150,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        imageClipped: true,
                        position: "front",
                        dropShadow: {
                            enabled: false,
                            top: 0,
                            left: 0,
                            blur: 3,
                            opacity: 0.5
                        }
                    },
                    track: {
                        show: true,
                        startAngle: undefined,
                        endAngle: undefined,
                        background: "#D8D8D8",
                        strokeWidth: "97%",
                        opacity: 1,
                        margin: 5,
                        dropShadow: {
                            enabled: false,
                            top: 0,
                            left: 0,
                            blur: 3,
                            opacity: 0.5
                        }
                    },
                    dataLabels: {
                        show: true,
                        name: {
                            show: false,
                            fontSize: "22px",
                            fontFamily: undefined,
                            color: undefined,
                            offsetY: -10
                        },
                        value: {
                            show: true,
                            fontSize: "16px",
                            fontFamily: undefined,
                            color: undefined,
                            offsetY: 16,
                            // formatter: function (val) {
                            //   return val + "%";
                            // }
                        }
                    }
                }
            }
        },
        series2: [analyze?.nursingOverTimeScore || 0],
        options2: {
            colors: ["#cd1f1e"],
            plotOptions: {
                radialBar: {
                    size: undefined,
                    inverseOrder: false,
                    startAngle: 0,
                    endAngle: 360,
                    offsetX: 0,
                    offsetY: 0,
                    hollow: {
                        margin: 5,
                        size: "50%",
                        background: "transparent",
                        image: undefined,
                        imageWidth: 150,
                        imageHeight: 150,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        imageClipped: true,
                        position: "front",
                        dropShadow: {
                            enabled: false,
                            top: 0,
                            left: 0,
                            blur: 3,
                            opacity: 0.5
                        }
                    },
                    track: {
                        show: true,
                        startAngle: undefined,
                        endAngle: undefined,
                        background: "#D8D8D8",
                        strokeWidth: "97%",
                        opacity: 1,
                        margin: 5,
                        dropShadow: {
                            enabled: false,
                            top: 0,
                            left: 0,
                            blur: 3,
                            opacity: 0.5
                        }
                    },
                    dataLabels: {
                        show: true,
                        name: {
                            show: false,
                            fontSize: "22px",
                            fontFamily: undefined,
                            color: undefined,
                            offsetY: -10
                        },
                        value: {
                            show: true,
                            fontSize: "16px",
                            fontFamily: undefined,
                            color: undefined,
                            offsetY: 16,
                            // formatter: function (val) {
                            //   return val + "%";
                            // }
                        }
                    }
                }
            }
        },
        series3: [analyze?.patientWaitTimeScore || 0],
        options3: {
            colors: ["#20ab40"],
            plotOptions: {
                radialBar: {
                    size: undefined,
                    inverseOrder: false,
                    startAngle: 0,
                    endAngle: 360,
                    offsetX: 0,
                    offsetY: 0,
                    hollow: {
                        margin: 5,
                        size: "50%",
                        background: "transparent",
                        image: undefined,
                        imageWidth: 150,
                        imageHeight: 150,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        imageClipped: true,
                        position: "front",
                        dropShadow: {
                            enabled: false,
                            top: 0,
                            left: 0,
                            blur: 3,
                            opacity: 0.5
                        }
                    },
                    track: {
                        show: true,
                        startAngle: undefined,
                        endAngle: undefined,
                        background: "#D8D8D8",
                        strokeWidth: "97%",
                        opacity: 1,
                        margin: 5,
                        dropShadow: {
                            enabled: false,
                            top: 0,
                            left: 0,
                            blur: 3,
                            opacity: 0.5
                        }
                    },
                    // dataLabels: {
                    //     show: true,
                    //     name: {
                    //         show: true,
                    //         fontSize: "10px",
                    //         fontFamily: undefined,
                    //         color: undefined,
                    //         offsetY: -10
                    //     },
                    //     value: {
                    //         show: true,
                    //         fontSize: "16px",
                    //         fontFamily: undefined,
                    //         color: undefined,
                    //         offsetY: 16,
                    //         // formatter: function (val) {
                    //         //   return val + "%";
                    //         // }
                    //     }
                    // }
                    dataLabels: {
                        name: {
                            show: true,
                            fontSize: "10px",
                            formatter(val, opts) {
                                return ['Wait Time Score'];
                            }
                        },
                    }
                }
            },
            labels: ['Wait Time Score'],
        }
    })
    console.log(chartState?.series, "chartState?.series")
    return (
        <div>
            <div className="donut">
                <Card className="p-4">
                    <Typography variant="h4">Areas for Improvement</Typography>
                    <Grid container >
                        <Grid item xs={12} md={3}  >
                            <Chart
                                options={chartState?.options}
                                series={chartState?.series}
                                type="radialBar"
                            // width="400"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}  >
                            <Chart
                                options={chartState.options1}
                                series={chartState.series1}
                                type="radialBar"
                            // width="400"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}  >
                            <Chart
                                options={chartState.options2}
                                series={chartState.series2}
                                type="radialBar"
                            // width="400"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}  >
                            <Chart
                                options={chartState.options3}
                                series={chartState.series3}
                                type="radialBar"
                            // width="400"
                            />
                        </Grid>
                    </Grid>
                </Card>
            </div>

        </div>
    )
}

export default Schedule
