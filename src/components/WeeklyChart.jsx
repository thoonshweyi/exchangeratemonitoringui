import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Date", "USD", "THB", "CNY", "INR"],
  ["2025-09-17", 2100, 60, 290, 25],
  ["2025-09-18", 2120, 59.5, 291, 25.2],
  ["2025-09-19", 2110, 59.8, 292, 25.1],
  ["2025-09-20", 2130, 60.2, 293, 25.3],
  ["2025-09-21", 2140, 61, 294, 25.5],
  ["2025-09-22", 2135, 60.7, 293.5, 25.4],
  ["2025-09-23", 2500, 60.4, 292.8, 25.45],
];

const options = {
  title: "Weekly Exchange Rate Report",
  curveType: "function",
  legend: { position: "bottom" },
  hAxis: { title: "Date" },
  vAxes: {
    0: { title: "USD (MMK)" },
    1: { title: "Other Currencies (MMK)" },
  },
  series: {
    0: { targetAxisIndex: 0 }, // USD -> left axis
    1: { targetAxisIndex: 1 }, // THB -> right axis
    2: { targetAxisIndex: 1 }, // CNY -> right axis
    3: { targetAxisIndex: 1 }, // INR -> right axis
  },
};

export default function WeeklyChart() {
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}