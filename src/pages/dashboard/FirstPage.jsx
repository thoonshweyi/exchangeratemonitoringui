import { useEffect, useState } from "react";
import {useParams,useNavigate,Link} from "react-router"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons"


import APP_CONFIG from '../../config/AppConfig.js';

import api from "./../../auth/api";

import TypeTab from "../../components/TypeTab.jsx";
import { useSelector, useDispatch } from 'react-redux'
import MultiCurrencyCharts from "../../components/MultiCurrencyCharts.jsx";
import WeeklyChart from "../../components/MultiCurrencyCharts.jsx";


function FirstPage(){
    const [loading,setLoading] = useState(true);
    const [docu,setDocu] = useState({});
    const type = useSelector((state) => state.type.value);
    useEffect(() => {

        api.get(`exchangedocustodaydashboard`)
            .then(res => {
            const docu = res.data;
            console.log(docu);

            setDocu(docu);
          
            setLoading(false);
        })
        .catch(err => {
            console.error(`Error fetching exchange docu: ${err}`);
            setLoading(false);
        });
    }, []);


     // Not yet finish fetching
     if(loading){
          return (
            <div className="text-center py-5">
                <FontAwesomeIcon icon={faSpinner} spin className="text-warning"/>
                <p className="mt-2">Loading Page....</p>
            </div>
          )
     }

    return (
        <>
            <TypeTab/>
            
            <div className="col-md-6">
                <h4>Currency Exchange</h4>

                <small className="d-block text-end">{docu.date}</small>
                {
                    docu.exchangerates.map((exchangerate,idx)=>(
                    <div key={idx} className="currencyex-card">
                        <div className="row align-items-center">
                            <div className="col-4 currencyex-info">
                                <h5>{exchangerate.currency.code} 
                                    <FontAwesomeIcon icon={exchangerate.currency.icon}/>
                                </h5>
                            </div>
                            <div className="col-4 text-center rates">
                                <h6>{type.toUpperCase()} Buy (MMK)</h6>
                                <span className="value">
                                {Number(exchangerate[`${type}_buy`]).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}</span>
                                <p className="change">
                                    {exchangerate[`diff_${type}_buy`] !== null ? (
                                        <>
                                        {exchangerate[`diff_${type}_buy`] > 0 && "+"}
                                        <span className={exchangerate[`diff_${type}_buy`] > 0 ? 'text-success' : 'text-danger'}>{parseFloat(exchangerate[`diff_${type}_buy`]).toFixed(2)}</span>
                                        {" "}
                                        <FontAwesomeIcon
                                            icon={
                                            exchangerate[`diff_${type}_buy`] > 0
                                                ? "fa-solid fa-arrow-up"
                                                : exchangerate[`diff_${type}_buy`] < 0
                                                ? "fa-solid fa-arrow-down"
                                                : "fa-solid fa-minus"
                                            }
                                            className={
                                            exchangerate[`diff_${type}_buy`] > 0
                                                ? "text-success"
                                                : exchangerate[`diff_${type}_buy`] < 0
                                                ? "text-danger"
                                                : "text-muted"
                                            }
                                        />
                                        </>
                                    ) : (
                                        "0.00"
                                    )}
                                </p>
                                

                            </div>
                            <div className="col-4 text-center rates">
                                <h6>{type.toUpperCase()} Sell (MMK)</h6>
                                <span className="value">

                                    {Number(exchangerate[`${type}_sell`]).toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </span>
                                <p className="change">
                                    {exchangerate[`diff_${type}_sell`] !== null ? (
                                        <>
                                        {exchangerate[`diff_${type}_sell`] > 0 && "+"}
                                        <span className={exchangerate[`diff_${type}_sell`] > 0 ? 'text-success' : 'text-danger'}>{parseFloat(exchangerate[`diff_${type}_sell`]).toFixed(2)}</span>
                                        {" "}
                                        <FontAwesomeIcon
                                            icon={
                                            exchangerate[`diff_${type}_sell`] > 0
                                                ? "fa-solid fa-arrow-up"
                                                : exchangerate[`diff_${type}_sell`] < 0
                                                ? "fa-solid fa-arrow-down"
                                                : "fa-solid fa-minus"
                                            }
                                            className={
                                            exchangerate[`diff_${type}_sell`] > 0
                                                ? "text-success"
                                                : exchangerate[`diff_${type}_sell`] < 0
                                                ? "text-danger"
                                                : "text-muted"
                                            }
                                        />
                                        </>
                                    ) : (
                                        "0.00"
                                    )}
                                </p>
                                
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <small>{exchangerate.currency.name}</small>
                                <div className="details mt-1">
                                    <Link to={`/exchangerates/${exchangerate.id}`}>Details<FontAwesomeIcon icon="fa-solid fa-chevron-right ms-1"/></Link>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center align-items-center mt-2">
                                    <div className={`${exchangerate.created_at == exchangerate.record_at ? "ref" : "latest"} dot`}></div>
                                    <small className="ms-2">{ exchangerate.created_at == exchangerate.record_at ? 'Reference Price' : 'Latest Price' }</small>
                            </div>
                        </div>
                    </div>

                    ))
                }


            </div>

            <div className="col-md-12">
                <MultiCurrencyCharts/>
            </div>
        </>
        
    )
}

export default FirstPage;