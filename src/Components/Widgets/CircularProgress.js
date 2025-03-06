import React, { useEffect, useState } from "react";

const CircularProgress = ({ value =0, total = 0, size = 120, strokeWidth = 10 }) => {
  const [progress, setProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    // Animate progress fill
    const timer = setTimeout(() => {
      setProgress(Math.min((value / total) * 100, 100)); 
    }, 500);

    return () => clearTimeout(timer);
  }, [value, total]);

  return (
    <svg width={size} height={size} className="circular-progress">
      {/* Background Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#fff"
        strokeWidth={strokeWidth}
        fill="none"
      />
      
      {/* Progress Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#28a745"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
      />

      {/* Progress Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="16"
        fontWeight="bold"
        fill="#fff"
      >
        {Math.round(progress)}%
      </text>
    </svg>
  );
};

export default CircularProgress;
