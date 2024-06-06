// import React from 'react';

// const CircleLoader = ({ percentage, label }) => {
//     const circleRadius = 45;
//     const circleCircumference = 2 * Math.PI * circleRadius;
//     const offset = circleCircumference - (percentage / 100) * circleCircumference;

//     return (
//         <div className="circular-loader">
//             <svg className="progress-ring" width="100" height="100">
//                 <circle
//                     className="progress-ring__circle"
//                     stroke="lightgrey"
//                     strokeWidth="10"
//                     fill="transparent"
//                     r={circleRadius}
//                     cx="50"
//                     cy="50"
//                 />
//                 <circle
//                     className="progress-ring__circle"
//                     stroke="deepskyblue"
//                     strokeWidth="10"
//                     fill="transparent"
//                     r={circleRadius}
//                     cx="50"
//                     cy="50"
//                     style={{ strokeDasharray: `${circleCircumference} ${circleCircumference}`, strokeDashoffset: offset }}
//                 />
//             </svg>
//             <div className="loader-label">
//                 <span>{Math.round(percentage)}%</span>
//             </div>
//         </div>
//     );
// };

// export default CircleLoader;


import React from 'react';

const CircleLoader = ({ percentage }) => {
    const circleRadius = 45;
    const circleCircumference = 2 * Math.PI * circleRadius;
    const offset = circleCircumference - (percentage / 100) * circleCircumference;

    return (
        <div className="circular-loader">
            <svg className="progress-ring" width="100" height="100">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="50%" style={{ stopColor: '#22D1EE', stopOpacity: 1 }} />
                        <stop offset="80%" style={{ stopColor: '#3D5AF1', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
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
                    stroke="url(#gradient)"
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
