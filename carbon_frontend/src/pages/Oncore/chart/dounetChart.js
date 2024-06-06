import { Card, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const Schedule = ({ analyze }) => {
    // const analyze = useSelector((state) => state?.analyzeDetails?.data)

    // const [chartState, setChartState] = useState({
    const series = [analyze?.overallScore || 0]
    const options = {
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
                    name: {
                        show: true,
                        fontSize: "10px",
                        formatter(val, opts) {
                            return ['Overall', 'Score'];
                        }
                    },
                }
            }
        },
        labels: ['Overall Score']
    }
    const series1 = [analyze?.nursingOverTimeScore || 0]
    const options1 = {
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
                    name: {
                        show: true,
                        fontSize: "10px",
                        formatter(val, opts) {
                            return ['Nursing', 'OverTime Score'];
                        }
                    },
                }
            }
        },
        labels: ['Nursing OverTime Score']
    }
    const series2 = [analyze?.middayOverloadScore || 0]
    const options2 = {
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
                    name: {
                        show: true,
                        fontSize: "10px",
                        formatter(val, opts) {
                            return ['Mid Day', 'Overload Score'];
                        }
                    },
                }
            }
        },
        labels: ['Mid Day Overload Score'],
    }
    const series3 = [analyze?.patientWaitTimeScore || 0]
    const options3 = {
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
                            return ['Wait', 'Time Score'];
                        }
                    },
                }
            }
        },
        labels: ['Wait Time Score'],
    }
    // })
    return (
        <div>
            <div className="donut">
                <Card className="p-4">
                    <Typography variant="h4">Areas for Improvement</Typography>
                    <Grid container >
                        <Grid item xs={12} md={3}  >
                            <Chart
                                options={options}
                                series={series}
                                type="radialBar"
                            // width="400"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}  >
                            <Chart
                                options={options1}
                                series={series1}
                                type="radialBar"
                            // width="400"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}  >
                            <Chart
                                options={options2}
                                series={series2}
                                type="radialBar"
                            // width="400"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}  >
                            <Chart
                                options={options3}
                                series={series3}
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
