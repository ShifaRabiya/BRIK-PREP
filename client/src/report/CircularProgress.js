import React, { useEffect, useState } from "react";
import styled from "styled-components";

const getColor = (percentage) => {
  if (percentage < 40) return "#ef4444";   // red
  if (percentage < 70) return "#f59e0b";   // yellow
  return "#22c55e";                        // green
};

const CircularProgress = ({
  percentage,
  size = 180,
  strokeWidth = 20
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [dashOffset, setDashOffset] = useState(circumference);
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const targetOffset = circumference * (1 - percentage / 100);

    // trigger circle animation
    setDashOffset(targetOffset);

    // number animation
    let start = 0;
    const duration = 1000;
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setAnimatedValue(Math.round(progress * percentage));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [percentage, circumference]);

  return (
    <CircleWrapper style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />

        {/* Animated progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor(percentage)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: "stroke-dashoffset 1s ease-out"
          }}
        />
      </svg>

      <Number>{animatedValue}</Number>
    </CircleWrapper>
  );
};

const CircleWrapper = styled.div`
  position: relative;
`;

const Number = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  font-weight: 700;
  color: #1a1a1a;
`;

export default CircularProgress;
