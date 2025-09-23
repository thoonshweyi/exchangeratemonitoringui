import { useEffect, useState } from "react";
import {useParams,useNavigate,Link} from "react-router"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons"


import APP_CONFIG from '../../config/AppConfig.js';
import axios from "axios"

function FirstPage(){
    const [loading,setLoading] = useState(true);
    const [docu,setDocu] = useState({});

    useEffect(() => {

        axios.get(`${APP_CONFIG.backendURL}/api/exchangedocustodaydashboard`)
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
            <h4>Currency Exchange</h4>
            
            <div className="col-md-6">
                <div class="tabs">
                    <div id="" className="tab active">TT</div>
                    <div id="" className="tab">Cash</div>
                    <div id="" className="tab">Earn</div>
                </div>
                
                <small className="d-block text-end">{docu.date}</small>
                {
                    docu.exchangerates.map((exchangerate,idx)=>(
                    <div key={idx} className="currencyex-card">
                        <div className="row align-items-center">
                            <div className="col-4 currencyex-info">
                                <h5>{exchangerate.currency.code} <FontAwesomeIcon icon="fa-solid fa-euro-sign"/></h5>
                            </div>
                            <div className="col-4 text-center rates">
                                <h6>TT Buy (MMK)</h6>
                                <span className="value">
                                {Number(exchangerate.tt_buy).toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}</span>
                                <p className="change">
                                    {exchangerate.diff_tt_buy !== null ? (
                                        <>
                                        {exchangerate.diff_tt_buy > 0 && "+"}
                                        <span className={exchangerate.diff_tt_buy > 0 ? 'text-success' : 'text-danger'}>{parseFloat(exchangerate.diff_tt_buy).toFixed(2)}</span>
                                        {" "}
                                        <FontAwesomeIcon
                                            icon={
                                            exchangerate.diff_tt_buy > 0
                                                ? "fa-solid fa-arrow-up"
                                                : exchangerate.diff_tt_buy < 0
                                                ? "fa-solid fa-arrow-down"
                                                : "fa-solid fa-minus"
                                            }
                                            className={
                                            exchangerate.diff_tt_buy > 0
                                                ? "text-success"
                                                : exchangerate.diff_tt_buy < 0
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
                                <h6>TT Sell (MMK)</h6>
                                <span className="value">

                                    {Number(exchangerate.tt_sell).toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </span>
                                <p className="change">
                                    {exchangerate.diff_tt_sell !== null ? (
                                        <>
                                        {exchangerate.diff_tt_sell > 0 && "+"}
                                        <span className={exchangerate.diff_tt_sell > 0 ? 'text-success' : 'text-danger'}>{parseFloat(exchangerate.diff_tt_sell).toFixed(2)}</span>
                                        {" "}
                                        <FontAwesomeIcon
                                            icon={
                                            exchangerate.diff_tt_sell > 0
                                                ? "fa-solid fa-arrow-up"
                                                : exchangerate.diff_tt_sell < 0
                                                ? "fa-solid fa-arrow-down"
                                                : "fa-solid fa-minus"
                                            }
                                            className={
                                            exchangerate.diff_tt_sell > 0
                                                ? "text-success"
                                                : exchangerate.diff_tt_sell < 0
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
                        </div>
                    </div>

                    ))
                }


            </div>
        </>
        
    )
}

export default FirstPage;