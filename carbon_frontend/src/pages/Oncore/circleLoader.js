import React from 'react';

const CircleLoader = ({ percentage, label }) => {
    const circleRadius = 45;
    const circleCircumference = 2 * Math.PI * circleRadius;
    const offset = circleCircumference - (percentage / 100) * circleCircumference;

    return (
        <div className="circular-loader">
            <svg className="progress-ring" width="100" height="100">
                <circle
                    className="progress-ring__circle"
                    stroke="lightgrey"
                    strokeWidth="10"
                    fill="transparent"
                    r={circleRadius}
                    cx="50"
                    cy="50"
                />
                <circle
                    className="progress-ring__circle"
                    stroke="deepskyblue"
                    strokeWidth="10"
                    fill="transparent"
                    r={circleRadius}
                    cx="50"
                    cy="50"
                    style={{ strokeDasharray: `${circleCircumference} ${circleCircumference}`, strokeDashoffset: offset }}
                />
            </svg>
            <div className="loader-label">
                <span>{Math.round(percentage)}%</span>
            </div>
        </div>
    );
};

export default CircleLoader;
