import { useEffect, useState } from "react";
import {useParams,useNavigate,Link} from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons"

import api from "./../../auth/api";

import TypeTab from "../../components/TypeTab.jsx";
import { useSelector, useDispatch } from 'react-redux'
import './../../assets/css/loader.css';

function Detail(){
    const{id} = useParams();
    const navigate = useNavigate();

    const [loading,setLoading] = useState(true);
    const [loader,setLoader] = useState(true);

    const [docus, setDocu] = useState([]);
    const [latestRate, setLatestRage] = useState({});
    const type = useSelector((state) => state.type.value);
    const [page, setPage] = useState(1);

    useEffect(() => {
       fetchRateChangeHistories(page);
    }, [page]);


    useEffect(()=>{
        const showloader = ()=>{
            setPage((prev) => prev + 1);
        }

        const scrollHandler = (e)=>{
            const {scrollTop,scrollHeight,clientHeight} = document.documentElement;
            // console.log(scrollTop);
            // console.log(scrollHeight);
            // console.log(clientHeight);

            if(scrollTop + clientHeight >= scrollHeight){
                showloader();
            }
        }
        window.addEventListener("scroll",scrollHandler);


    },[]);

    const fetchRateChangeHistories = async (page = 1) => {
        setLoader(true);
        await api.get(`exchangerates/${id}/detail`,{
            params: {
                page,
            }
        })
        .then(res => {
            const newData = res.data;
            console.log(newData);

            setDocu((prev) => [...prev, ...newData]);

            console.log(docus);

            if (page === 1){
                setLatestRage(newData[0].exchangerates[0]);
            }
            
            setLoading(false);
            setLoader(false);
        })
        .catch(err => {
            console.error(`Error fetching exchange docus: ${err}`);
            setLoading(false);
            setLoader(false);
        });
    }

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
            <div>
                <button type="button" className="btn btn-outline-secondary mb-4" onClick={()=>navigate(-1)}><FontAwesomeIcon icon={"fs fa-arrow-left"} />Back</button>
            </div>
            
            <h1>{latestRate.currency.name} <FontAwesomeIcon icon={latestRate.currency.icon}/></h1>
            <TypeTab/>
            <div className="currencyex-card">
                <div className="row align-items-center">
                    <div className="col-4 currencyex-info">
                        <h5>{latestRate.currency.code} 
                            <FontAwesomeIcon icon={latestRate.currency.icon} />
                        </h5>
                    </div>
                    <div className="col-4 text-center rates">
                        <h6>{type.toUpperCase()} Buy <br/>(MMK)</h6>
                        <span className={`${latestRate.created_at == latestRate[`${type}_updated_datetime`] ? 'text-warning' : ''} value`}>
                        {Number(latestRate[`${type}_buy`]).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</span>
                        <p className="change">
                            {latestRate[`diff_${type}_buy`] !== null ? (
                                <>
                                {latestRate[`diff_${type}_buy`] > 0 && "+"}
                                <span className={latestRate[`diff_${type}_buy`] > 0 ? 'text-success' : 'text-danger'}>{parseFloat(latestRate[`diff_${type}_buy`]).toFixed(2)}</span>
                                {" "}
                                <FontAwesomeIcon
                                    icon={
                                    latestRate[`diff_${type}_buy`] > 0
                                        ? "fa-solid fa-arrow-up"
                                        : latestRate[`diff_${type}_buy`] < 0
                                        ? "fa-solid fa-arrow-down"
                                        : "fa-solid fa-minus"
                                    }
                                    className={
                                    latestRate[`diff_${type}_buy`] > 0
                                        ? "text-success"
                                        : latestRate[`diff_${type}_buy`] < 0
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
                        <h6>{type.toUpperCase()} Sell <br/>(MMK)</h6>
                        <span className={`${latestRate.created_at == latestRate[`${type}_updated_datetime`] ? 'text-warning' : ''} value`}>

                            {Number(latestRate[`${type}_sell`]).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}
                        </span>
                        <p className="change">
                            {latestRate[`diff_${type}_sell`] !== null ? (
                                <>
                                {latestRate[`diff_${type}_sell`] > 0 && "+"}
                                <span className={latestRate[`diff_${type}_sell`] > 0 ? 'text-success' : 'text-danger'}>{parseFloat(latestRate[`diff_${type}_sell`]).toFixed(2)}</span>
                                {" "}
                                <FontAwesomeIcon
                                    icon={
                                    latestRate[`diff_${type}_sell`] > 0
                                        ? "fa-solid fa-arrow-up"
                                        : latestRate[`diff_${type}_sell`] < 0
                                        ? "fa-solid fa-arrow-down"
                                        : "fa-solid fa-minus"
                                    }
                                    className={
                                    latestRate[`diff_${type}_sell`] > 0
                                        ? "text-success"
                                        : latestRate[`diff_${type}_sell`] < 0
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
                            <div className={`${latestRate.created_at == latestRate[`${type}_updated_datetime`] ? "ref" : "update"} dot`}></div>
                            <small className="ms-2">{ latestRate.created_at == latestRate[`${type}_updated_datetime`] ? 'ယခင်နေ့ဈေး' : 'နောက်ဆုံးရဈေး' }</small>
                    </div>
                </div>
            </div>


            <div className="col-md-6 loader-container">
                <h5>Rate Change History</h5>
    

                {
                    docus.map((docu,index)=>(
                        <div key={index} className="history-item">

                            <div className="col-12">
                                {/* <h6>{ docu.exchangerates.length > 0 ? docu.date : ''}</h6> */}
                                <h6>{ (index > 0 || (docu.exchangerates.length > 0 && docu.exchangerates[0].changehistories.length > 0)) ? docu.date : ''}</h6>
                            </div>

                            {
                                docu.exchangerates.map((exchangerate,idx)=>(
                                <>
                                    {
                                    index > 0 ?
                                    <div key={idx} className="currencyex-card">
                                        <div className="row align-items-center">
                                            <div className="col-4 currencyex-info">
                                                <h5>
                                                    {exchangerate[`${type}_updated_time`]} 
                                                    {/* <FontAwesomeIcon icon="fa-solid fa-euro-sign"/> */}
                                                </h5>
                                            </div>
                                            <div className="col-4 text-center rates">
                                                <h6>{type.toUpperCase()} Buy <br/>(MMK)</h6>
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
                                                <h6>{type.toUpperCase()} Sell <br/>(MMK)</h6>
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
                                        
                                        </div>
                                    </div> : ''
                                    }
                                    
                                    {exchangerate.changehistories.filter(ch => ch.type === type).length > 0 ? (
                                    exchangerate.changehistories
                                        .filter(ch => ch.type === type)
                                        .map((changehistory, i) => (
                                        <div key={i} className="currencyex-card">
                                            <div className="row align-items-center">
                                            <div className="col-4 currencyex-info">
                                                <h5>{changehistory[`updated_time`]}</h5>
                                            </div>

                                            <div className="col-4 text-center rates">
                                                <h6>{type.toUpperCase()} Buy <br/>(MMK)</h6>
                                                <span className="value">
                                                {Number(changehistory.buy).toLocaleString("en-US", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                                </span>
                                                <p className="change">
                                                {changehistory[`diff_${type}_buy`] !== null ? (
                                                    <>
                                                    {changehistory[`diff_${type}_buy`] > 0 && "+"}
                                                    <span
                                                        className={
                                                        changehistory[`diff_${type}_buy`] > 0
                                                            ? "text-success"
                                                            : "text-danger"
                                                        }
                                                    >
                                                        {parseFloat(changehistory[`diff_${type}_buy`]).toFixed(2)}
                                                    </span>{" "}
                                                    <FontAwesomeIcon
                                                        icon={
                                                        changehistory[`diff_${type}_buy`] > 0
                                                            ? "fa-solid fa-arrow-up"
                                                            : changehistory[`diff_${type}_buy`] < 0
                                                            ? "fa-solid fa-arrow-down"
                                                            : "fa-solid fa-minus"
                                                        }
                                                        className={
                                                        changehistory[`diff_${type}_buy`] > 0
                                                            ? "text-success"
                                                            : changehistory[`diff_${type}_buy`] < 0
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
                                                <h6>{type.toUpperCase()} Sell <br/>(MMK)</h6>
                                                <span className="value">
                                                {Number(changehistory.sell).toLocaleString("en-US", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                                </span>
                                                <p className="change">
                                                {changehistory[`diff_${type}_sell`] !== null ? (
                                                    <>
                                                    {changehistory[`diff_${type}_sell`] > 0 && "+"}
                                                    <span
                                                        className={
                                                        changehistory[`diff_${type}_sell`] > 0
                                                            ? "text-success"
                                                            : "text-danger"
                                                        }
                                                    >
                                                        {parseFloat(changehistory[`diff_${type}_sell`]).toFixed(2)}
                                                    </span>{" "}
                                                    <FontAwesomeIcon
                                                        icon={
                                                        changehistory[`diff_${type}_sell`] > 0
                                                            ? "fa-solid fa-arrow-up"
                                                            : changehistory[`diff_${type}_sell`] < 0
                                                            ? "fa-solid fa-arrow-down"
                                                            : "fa-solid fa-minus"
                                                        }
                                                        className={
                                                        changehistory[`diff_${type}_sell`] > 0
                                                            ? "text-success"
                                                            : changehistory[`diff_${type}_sell`] < 0
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
                                    ) : (
                                    <></>
                                    )}


                                </>

                                ))

                            }
                            
                            
                        </div>
                    ))
                }


                <div className={`loader ${loader ? 'show' : ''}`}>
                    <div className="loader-item"></div>
                    <div className="loader-item"></div>
                    <div className="loader-item"></div>
               </div>
            </div>

        </>
    )
}

export default Detail;