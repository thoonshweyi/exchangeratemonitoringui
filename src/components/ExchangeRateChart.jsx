import React from "react";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons"


import api from "./../auth/api";

import { useSelector, useDispatch } from 'react-redux'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const convertApiData = (currency, type,dataset)=> {
    const rows = dataset.slice(1); 
    const labels =  rows.map(r => r[0]);
    const values =  rows.map(r => r[1]);

    const data = {
        labels,
        datasets: [
        {
            label: `${currency} (${type})`,
            data: values,
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 3,
            borderColor: "#007bff",  
            backgroundColor: "#AEDEFC", 
            pointBackgroundColor: "#007bff",
            pointBorderColor: "#007bff",
        },
        ],
    };
    return data;
}

const currencySteps = {
    "USD" : 20,
    "THB" : 5,
    "CNY" : 5
}


const options = (currency, type, dataset) => {
    const rows = dataset.slice(1); 
    const values =  rows.map(r => r[1]);
    
    return{
        responsive: true,
        maintainAspectRatio: false,

        scales: {
        y: {
            min: Math.floor(Math.min(...values) - 10),
            max: Math.ceil(Math.max(...values) + 10),
            ticks: {
                // stepSize: 5,
                stepSize: currencySteps[currency],
                color: "#000",
            },
            grid: { color: "#ccc" }
        },
        x: {
            ticks: {
            maxRotation: 60,
            minRotation: 60,
            },
        },
        },

    }
};


export default function ExchangeRateChart() {

    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState({});
    const type = useSelector((state) => state.type.value);
    console.log(type);
    useEffect(() => {

        api.get(`exchangedocusweeklydashboard`)
            .then(res => {
                const data = res.data;
                console.log(data);

                setChartData(data);


                setLoading(false);
            })
            .catch(err => {
                console.error(`Error fetching exchange docus: ${err}`);
                setLoading(false);
            });
    }, []);

    // Not yet finish fetching
    if (loading) {
        return (
            <div className="text-center py-5">
                <FontAwesomeIcon icon={faSpinner} spin className="text-warning" />
                <p className="mt-2">Loading Page....</p>
            </div>
        )
    }

    return (
        <div key={type} className="row">
            {Object.entries(chartData).map(([currency, data]) => (
                <div key={currency} className="col-12 col-md-3 mb-4">
                    <div style={{ width: "100%", height: "300px" }}>
                    
                        <div style={{ height: 300, width: "100%", backgroundColor: "#fff" }}>
                        <Line data={convertApiData(currency,type.toUpperCase(),[...data[`${type}`]])} options={options(currency, type.toUpperCase(), [...data[`${type}`]])} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}


// npm install chart.js react-chartjs-2