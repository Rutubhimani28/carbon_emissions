import { Card, Grid, Typography } from "@mui/material";
import React, { Component } from "react";
import Chart from "react-apexcharts";

class RadialBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [75],
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
            series1: [82],
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
            series2: [68],
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
            series3: [86],
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
            }
        };
    }

    render() {
        return (
            <div className="donut">
                <Card className="p-4">
                    <Typography variant="h4">Areas for Improvement</Typography>
                    <Grid container >
                        <Grid item xs={12} md={3}  >
                            {/* <div className="p-1 rounded-circle shadow" style={{height:"200px",width:"200px"}}> */}
                            <Chart
                                options={this.state.options}
                                series={this.state.series}
                                type="radialBar"
                            // width="400"
                            />
                            {/* </div> */}
                        </Grid>
                        <Grid item xs={12} md={3}  >
                            <Chart
                                options={this.state.options1}
                                series={this.state.series1}
                                type="radialBar"
                            // width="400"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}  >
                            <Chart
                                options={this.state.options2}
                                series={this.state.series2}
                                type="radialBar"
                            // width="400"
                            />
                        </Grid>
                        <Grid item xs={12} md={3}  >
                            <Chart
                                options={this.state.options3}
                                series={this.state.series3}
                                type="radialBar"
                            // width="400"
                            />
                        </Grid>
                    </Grid>
                </Card>
            </div>
        );
    }
}

export default RadialBar;