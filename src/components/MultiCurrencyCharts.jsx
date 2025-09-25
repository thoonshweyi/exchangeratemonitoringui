import React from "react";
import { Chart } from "react-google-charts";

const chartData = {
  USD: [
    ["Date", "USD"],
    ["2025-09-17", 2100],
    ["2025-09-18", 2120],
    ["2025-09-19", 2110],
    ["2025-09-20", 2130],
    ["2025-09-21", 2140],
    ["2025-09-22", 2135],
    ["2025-09-23", 2125],
  ],
  THB: [
    ["Date", "THB"],
    ["2025-09-17", 60],
    ["2025-09-18", 59.5],
    ["2025-09-19", 59.8],
    ["2025-09-20", 60.2],
    ["2025-09-21", 61],
    ["2025-09-22", 60.7],
    ["2025-09-23", 60.4],
  ],
  CNY: [
    ["Date", "CNY"],
    ["2025-09-17", 290],
    ["2025-09-18", 291],
    ["2025-09-19", 292],
    ["2025-09-20", 293],
    ["2025-09-21", 294],
    ["2025-09-22", 293.5],
    ["2025-09-23", 292.8],
  ],
  INR: [
    ["Date", "INR"],
    ["2025-09-17", 25],
    ["2025-09-18", 25.2],
    ["2025-09-19", 25.1],
    ["2025-09-20", 25.3],
    ["2025-09-21", 25.5],
    ["2025-09-22", 25.4],
    ["2025-09-23", 25.45],
  ],
};

const options = (currency) => ({
  title: `${currency} Exchange Rate`,
  legend: { position: "bottom" },
  hAxis: {
    title: "Date",
    slantedText: true,          
    slantedTextAngle: 60,       
    showTextEvery: 1,          
    textStyle: {
      fontSize: 10,            
    }
  },
  vAxis: {
    title: "Rate",
  },
  
  chartArea: { 
    left: 60,                 
    top: 30, 
    right: 20, 
    bottom: 90                
  },
  explorer: { axis: 'horizontal', keepInBounds: true }
});
export default function MultiCurrencyCharts() {
  return (
    <div className="row">
      {Object.entries(chartData).map(([currency, data]) => (
        <div key={currency} className="col-12 col-md-3 mb-4">
          <div style={{ width: "100%", height: "300px" }}>
            <Chart
              chartType="LineChart"
              width="100%"
              height="100%"
              data={data}
              options={options(currency)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

