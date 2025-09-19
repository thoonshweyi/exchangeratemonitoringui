import { useEffect, useState } from "react";
import {useParams,useNavigate} from "react-router"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons"

import APP_CONFIG from './../../config/AppConfig.js';
import axios from "axios"

function AddExchangeDocu(){
     const navigate = useNavigate();
     const [ currencies ,setCurrencies] = useState(null); 
     const [loading,setLoading] = useState(true);
     const [formState,setFormState] = useState({});

     useEffect(()=>{
          axios.get(`${APP_CONFIG.backendURL}/api/currencies`)
          .then(res=>{
               console.log(res.data);
               setCurrencies(res.data.data);
               setLoading(false);
            
          }).catch(err=>{
               console.error(`Error fetching product: ${err}`);
               setLoading(false);
          })
     },[]);

    const changeHandler = (e)=>{
        const {name,value} = e.target;
        setFormState(prev=>{
            return {...prev,[name]:value}
        });
    }

    
     const submitHandler = (e)=>{
          e.preventDefault();

          console.log(formState);
        //   settasks(prev=>{
        //        return [...prev,formState]
        //   });

        //   setFormState({
        //        name:"",
        //        quantity:1,
        //        tags:[],
        //        package:""
        //   });
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
            {/* Start Page Content Area */}
            <div className="container-fluid">
                <div className="col-md-12">
                    <div className="main-container">
                        <div className="header-section">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h1 className="mb-2"><FontAwesomeIcon icon="fa-solid fa-hand-holding-dollar" />Daily Exchange Rates Entry</h1>
                                    <p className="mb-0 opacity-90">Record TT, Cash, and Earn rates for all currencies</p>
                                </div>
                                <div className="col-md-4 text-md-end">
                                    <div className="d-flex flex-column align-items-md-end">
                                        <small className="opacity-75">Record Date</small>
                                        <input type="date" id="recordDate" className="form-control mt-1" style={{maxWidth: "200px"}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <form action="" method="" onSubmit={submitHandler}>
                        <div id="rate-container" className="p-3">
                            {
                                currencies.map((currency,idx)=>(
                                    <div key={currency.id} className="rate-card">
                                        <div className="rate-card-header">
                                            <div className="currency-info">
                                                <span className="currency-icon">$</span>
                                                <div>
                                                    <div className="currency-name">{currency.code} - {currency.name}</div>
                                                    {/* <div className="rate-time">${rate.time}</div> */}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <div className="row">
                                                {/* TT Rates */}
                                                <div className="col-md-4 mb-3">
                                                    <h6 className="text-primary mb-3"><FontAwesomeIcon icon="fas fa-university" className="me-2"/>TT Rates</h6>
                                                    <div className="d-flex gap-4">
                                                        <div className="mb-1">
                                                            <label className="rate-label">Buy</label>
                                                            <input type="number" step="0.0001" className="form-control rate-input" 
                                                                name={`tt_buy_${currency.id}`} placeholder="0.0000" onChange={changeHandler}/>
                                                        </div>
                                                        <div className="mb-1">
                                                            <label className="rate-label">Sell</label>
                                                            <input type="number" step="0.0001" className="form-control rate-input" 
                                                                name={`tt_sell_${currency.id}`} placeholder="0.0000" onChange={changeHandler}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Cash Rates */}
                                                <div className="col-md-4 mb-3">
                                                    <h6 className="text-success mb-3"><FontAwesomeIcon icon="fa-solid fa-money-bill-1-wave" className="me-2" />Cash Rates</h6>
                                                    <div className="d-flex gap-4">
                                                        <div className="mb-1">
                                                            <label className="rate-label">Buy</label>
                                                            <input type="number" step="0.0001" className="form-control rate-input" 
                                                                name={`cash_buy_${currency.id}`} placeholder="0.0000" onChange={changeHandler}/>
                                                        </div>
                                                        <div className="mb-1">
                                                            <label className="rate-label">Sell</label>
                                                            <input type="number" step="0.0001" className="form-control rate-input" 
                                                                name={`cash_sell_${currency.id}`} placeholder="0.0000" onChange={changeHandler}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Earn Rates */}
                                                <div className="col-md-4 mb-3">
                                                    <h6 className="text-warning mb-3"><FontAwesomeIcon icon="fa-solid fa-chart-line" className="me-2" />Earn Rates</h6>
                                                    <div className="d-flex gap-4">
                                                        <div className="mb-1">
                                                            <label className="rate-label">Buy</label>
                                                            <input type="number" step="0.0001" className="form-control rate-input" 
                                                                name={`earn_buy_${currency.id}`} placeholder="0.0000" onChange={changeHandler}/>
                                                        </div>
                                                        <div className="mb-1">
                                                            <label className="rate-label">Sell</label>
                                                            <input type="number" step="0.0001" className="form-control rate-input" 
                                                                name={`earn_sell_${currency.id}`} placeholder="0.0000" onChange={changeHandler}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                         <div className="d-grid mb-3">
                              <button type="submit" className="btn btn-primary btn-sm rounded-0">Submit</button>
                         </div>
                        </form>

                    </div>
                </div>
            </div>
            {/* End Page Content Area */}
        </>
    )
}

export default AddExchangeDocu;