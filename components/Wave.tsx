
// C:\Users\mpereira\Downloads\van-mageski\components\Wave.tsx
"use client";
import React from "react";

type Props = {
  className?: string;
  color?: string;
};

export default function Wave({ className, color = "#BFE9FF" }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill={color}
        d="M0,64L60,58.7C120,53,240,43,360,42.7C480,43,600,53,720,64C840,75,960,85,1080,85.3C1200,85,1320,75,1380,69.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
      />
    </svg>
  );
}
