import { useEffect, useState } from "react";
import {useParams,useNavigate,Link} from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons"

import APP_CONFIG from '../../config/AppConfig.js';
import axios from "axios"

function Detail(){
    const{id} = useParams();

    const [loading,setLoading] = useState(true);
    const [docus,setDocu] = useState({});
    const [latestRate, setLatestRage] = useState({});

    useEffect(() => {

        axios.get(`${APP_CONFIG.backendURL}/api/exchangerates/${id}/detail`)
            .then(res => {
            const docus = res.data;
            console.log(docus);

            setDocu(docus);
            setLatestRage(docus[0].exchangerates[0]);
            
            setLoading(false);
        })
        .catch(err => {
            console.error(`Error fetching exchange docus: ${err}`);
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

            <h1>{latestRate.currency.name}</h1>
            <div className="currencyex-card">
                <div className="row align-items-center">
                    <div className="col-4 currencyex-info">
                        <h5>{latestRate.currency.code} <FontAwesomeIcon icon="fa-solid fa-euro-sign"/></h5>
                    </div>
                    <div className="col-4 text-center rates">
                        <h6>TT Buy (MMK)</h6>
                        <span className="value">
                        {Number(latestRate.tt_buy).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</span>
                        <p className="change">
                            {latestRate.diff_tt_buy !== null ? (
                                <>
                                {latestRate.diff_tt_buy > 0 && "+"}
                                <span className={latestRate.diff_tt_buy > 0 ? 'text-success' : 'text-danger'}>{parseFloat(latestRate.diff_tt_buy).toFixed(2)}</span>
                                {" "}
                                <FontAwesomeIcon
                                    icon={
                                    latestRate.diff_tt_buy > 0
                                        ? "fa-solid fa-arrow-up"
                                        : latestRate.diff_tt_buy < 0
                                        ? "fa-solid fa-arrow-down"
                                        : "fa-solid fa-minus"
                                    }
                                    className={
                                    latestRate.diff_tt_buy > 0
                                        ? "text-success"
                                        : latestRate.diff_tt_buy < 0
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

                            {Number(latestRate.tt_sell).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}
                        </span>
                        <p className="change">
                            {latestRate.diff_tt_sell !== null ? (
                                <>
                                {latestRate.diff_tt_sell > 0 && "+"}
                                <span className={latestRate.diff_tt_sell > 0 ? 'text-success' : 'text-danger'}>{parseFloat(latestRate.diff_tt_sell).toFixed(2)}</span>
                                {" "}
                                <FontAwesomeIcon
                                    icon={
                                    latestRate.diff_tt_sell > 0
                                        ? "fa-solid fa-arrow-up"
                                        : latestRate.diff_tt_sell < 0
                                        ? "fa-solid fa-arrow-down"
                                        : "fa-solid fa-minus"
                                    }
                                    className={
                                    latestRate.diff_tt_sell > 0
                                        ? "text-success"
                                        : latestRate.diff_tt_sell < 0
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
                    <div className="d-flex justify-content-center align-items-center mt-2">
                            <div className="latest dot"></div>
                            <small className="ms-2">Latest Price</small>
                    </div>
                </div>
            </div>


            <div className="col-md-6">
                <h5>Change History</h5>
    

                {
                    docus.map((docu,index)=>(
                        <div key={index} className="history-item">

                            <div className="col-12">
                                <h6>{docu.date}</h6>
                            </div>

                            {
                                docu.exchangerates.map((exchangerate,idx)=>(
                                <div key={idx} className="currencyex-card">
                                    <div className="row align-items-center">
                                        <div className="col-4 currencyex-info">
                                            <h5>{`09:15 AM`} 
                                                {/* <FontAwesomeIcon icon="fa-solid fa-euro-sign"/> */}
                                            </h5>
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
                                      
                                    </div>
                                </div>

                                ))
                            }
                            
                        </div>
                    ))
                }

            </div>

        </>
    )
}

export default Detail;