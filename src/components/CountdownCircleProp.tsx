import React, { useEffect, useRef } from "react";

type CountdownCircleProps = {
  durationMs: number;
  onComplete?: () => void;
};

export const CountdownCircle: React.FC<CountdownCircleProps> = ({
  durationMs,
  onComplete,
}) => {
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = "0";

    // Trigger reflow before starting animation
    circle.getBoundingClientRect();

    // Animate strokeDashoffset from 0 to circumference
    circle.style.transition = `stroke-dashoffset ${durationMs}ms linear`;
    circle.style.strokeDashoffset = `${circumference}`;

    const timeout = setTimeout(() => {
      onComplete && onComplete();
    }, durationMs);

    return () => {
      clearTimeout(timeout);
      circle.style.transition = "";
      circle.style.strokeDashoffset = "0";
    };
  }, [durationMs, onComplete]);

  return (
    <svg
      width="80vh"
      height="80vh"
      viewBox="0 0 200 200"
      style={{ display: "block", margin: "20px auto" }}
    >
      <circle
        ref={circleRef}
        cx="100"
        cy="100"
        r="90"
        stroke="cyan"
        strokeWidth="10"
        fill="none"
        style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
      />
    </svg>
  );
};
