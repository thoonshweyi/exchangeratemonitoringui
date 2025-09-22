import { useEffect, useState } from "react";
import {useParams,useNavigate} from "react-router"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons"

import APP_CONFIG from '../../config/AppConfig.js';
import axios from "axios"

function EditExchangeDocu(){
    const{id} = useParams();
    const navigate = useNavigate();
    const [ currencies ,setCurrencies] = useState(null); 
    const [loading,setLoading] = useState(true);
    const [formState,setFormState] = useState({});
	const [formErrors, setformErrors] = useState({});
    const [recordDate, setRecordDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    // console.log(recordDate);

    useEffect(() => {
        if (!id) return;

        axios.get(`${APP_CONFIG.backendURL}/api/exchangedocus/${id}`)
            .then(res => {
            const docu = res.data;
            console.log(docu);

            setCurrencies(docu.exchangerates.map(r => ({ ...r.currency })));

            // map exchangerates into array of objects
            const initialState = docu.exchangerates.map(rate => ({
                id: rate.id, // exchangerate.id
                currency_id: rate.currency_id,
                tt_buy: rate.tt_buy || "",
                tt_sell: rate.tt_sell || "",
                cash_buy: rate.cash_buy || "",
                cash_sell: rate.cash_sell || "",
                earn_buy: rate.earn_buy || "",
                earn_sell: rate.earn_sell || "",
                currency: rate.currency,
            }));

            setFormState(initialState);

            setRecordDate(docu.date);
            setLoading(false);
        })
        .catch(err => {
            console.error(`Error fetching exchange docu: ${err}`);
            setLoading(false);
        });
    }, [id]);



    const changeHandler = (e, index, field) => {
        const value = e.target.value;
        setFormState(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    // const validate = () => {
    //     const formErrors = {};

    //     Object.entries(formState).forEach(([currencyId, currencyObj]) => {
    //         Object.entries(currencyObj).forEach(([type, typeObj]) => {
    //             Object.entries(typeObj).forEach(([side, value]) => {
    //                 const fieldErrors = {};
    //                 if (!value || value.toString().trim() === "") {
    //                     fieldErrors.required = "This field is required.";
    //                 }
    //                 if (Object.keys(fieldErrors).length > 0) {
    //                     const fieldKey = `${currencyId}_${type}_${side}`;
    //                     formErrors[fieldKey] = fieldErrors;
    //                 }
    //             });
    //         });
    //     });

    //     console.log("Validation Errors:", formErrors);
    //     // console.log("Validation Errors Length: ", Object.values(formErrors).length);

    //     setformErrors(formErrors);
    //     return Object.keys(formErrors).length === 0;
    // };

    const types = ['tt','cash','earn'];
    const sides = ['buy','sell'];

    const validate = () => {
        const formErrors = {};

     
        formState.forEach((rate, index) => {
            types.forEach((type)=>{
                sides.forEach((side)=>{
                    const fieldErrors = {};
                    let value = rate[`${type}_${side}`];
                    if (!value || value.toString().trim() === "") {
                        fieldErrors.required = "This field is required.";
                    }
                    if (Object.keys(fieldErrors).length > 0) {
                        const fieldKey = `${rate.id}_${type}_${side}`;
                        formErrors[fieldKey] = fieldErrors;
                    }
                })
            })
        });

        console.log("Validation Errors:", formErrors);
        // console.log("Validation Errors Length: ", Object.values(formErrors).length);

        setformErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    }


    
    const submitHandler = async (e)=>{
        e.preventDefault();
        // console.log(formState);

        if (!validate()) {
            return false;
        }

        const data = { 
            date: recordDate,
		    exchangerates: formState 
        };
        console.log(data);

        try{
            const res = await axios.put(`${APP_CONFIG.backendURL}/api/exchangedocus/${id}`,data);
            console.log(res.data);

            setformErrors({});
		    setFormState({})
            navigate(`/exchangedocus`);

        }catch(err){
            console.log('Add Exchange Rate failed',err);
        }

        console.log("Form Submitted")
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
                        <form action="" method="" onSubmit={submitHandler}>

                            <div className="header-section">
                                <div className="row align-items-center">
                                    <div className="col-md-8">
                                        <h1 className="mb-2"><FontAwesomeIcon icon="fa-solid fa-hand-holding-dollar" />Daily Exchange Rates Edit</h1>
                                        <p className="mb-0 opacity-90">Record TT, Cash, and Earn rates for all currencies</p>
                                    </div>
                                    <div className="col-md-4 text-md-end">
                                        <div className="d-flex flex-column align-items-md-end">
                                            <small className="opacity-75">Record Date</small>
                                            <input type="date" id="recordDate" className="form-control mt-1" style={{maxWidth: "200px"}} 
                                            value={recordDate}
                                            onChange={(e) => setRecordDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-3">

                                    <div id="rate-container">
                                        {
                                            formState.map((rate, index) => (
                                                <div key={rate.currency.id} className="rate-card">
                                                    <div className="rate-card-header">
                                                        <div className="currency-info">
                                                            <span className="currency-icon">$</span>
                                                            <div>
                                                                <div className="currency-name">{rate.currency.code} - {rate.currency.name}</div>
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
                                                                            // name={`exchangerates[${rate.id}][tt][buy]`} 
                                                                            placeholder="0.0000"
                                                                            value={rate.tt_buy}
                                                                            onChange={e => changeHandler(e, index, "tt_buy")}
                                                                            />
                                                                            {formErrors[`${rate.id}_tt_buy`] && (
                                                                                <div className="text-danger small mb-1">
                                                                                    {Object.values(formErrors[`${rate.id}_tt_buy`]).map((msg, index) => (
                                                                                        <div key={index}>{msg}</div>
                                                                                    ))}
                                                                                </div>
                                                                            )}

                                                                        
                                                                    </div>
                                                                    <div className="mb-1">
                                                                        <label className="rate-label">Sell</label>
                                                                        <input type="number" step="0.0001" className="form-control rate-input" 
                                                                            // name={`exchangerates[${rate.id}][tt][sell]`} 
                                                                            placeholder="0.0000"
                                                                            value={rate.tt_sell}
                                                                            onChange={e => changeHandler(e, index, "tt_sell")}
                                                                            />
                                                                            {formErrors[`${rate.id}_tt_sell`] && (
                                                                                    <div className="text-danger small mb-1">
                                                                                        {Object.values(formErrors[`${rate.id}_tt_sell`]).map((msg, index) => (
                                                                                            <div key={index}>{msg}</div>
                                                                                        ))}
                                                                                    </div>
                                                                            )}

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
                                                                            name={`cash_buy_${rate.id}`} placeholder="0.0000" 
                                                                            value={rate.cash_buy}
                                                                            onChange={e => changeHandler(e, index, "cash_buy")}
                                                                            />
                                                                            {formErrors[`${rate.id}_cash_buy`] && (
                                                                                    <div className="text-danger small mb-1">
                                                                                        {Object.values(formErrors[`${rate.id}_cash_buy`]).map((msg, index) => (
                                                                                            <div key={index}>{msg}</div>
                                                                                        ))}
                                                                                    </div>
                                                                            )}
                                                                    </div>
                                                                    <div className="mb-1">
                                                                        <label className="rate-label">Sell</label>
                                                                        <input type="number" step="0.0001" className="form-control rate-input" 
                                                                            name={`cash_sell_${rate.id}`} placeholder="0.0000"
                                                                            value={rate.cash_sell}
                                                                            onChange={e => changeHandler(e, index, "cash_sell")}
                                                                            />
                                                                        {formErrors[`${rate.id}_cash_sell`] && (
                                                                                    <div className="text-danger small mb-1">
                                                                                        {Object.values(formErrors[`${rate.id}_cash_sell`]).map((msg, index) => (
                                                                                            <div key={index}>{msg}</div>
                                                                                        ))}
                                                                                    </div>
                                                                        )}
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
                                                                            name={`earn_buy_${rate.id}`} placeholder="0.0000"
                                                                            value={rate.earn_buy}
                                                                            onChange={e => changeHandler(e, index, "earn_buy")}
                                                                            />
                                                                            {formErrors[`${rate.id}_earn_buy`] && (
                                                                                        <div className="text-danger small mb-1">
                                                                                            {Object.values(formErrors[`${rate.id}_earn_buy`]).map((msg, index) => (
                                                                                                <div key={index}>{msg}</div>
                                                                                            ))}
                                                                                        </div>
                                                                            )}
                                                                    </div>
                                                                    <div className="mb-1">
                                                                        <label className="rate-label">Sell</label>
                                                                        <input type="number" step="0.0001" className="form-control rate-input" 
                                                                            name={`earn_sell_${rate.id}`} placeholder="0.0000" 
                                                                            value={rate.earn_sell} 
                                                                            onChange={e => changeHandler(e, index, "earn_sell")}
                                                                            />

                                                                        {formErrors[`${rate.id}_earn_sell`] && (
                                                                                        <div className="text-danger small mb-1">
                                                                                            {Object.values(formErrors[`${rate.id}_earn_sell`]).map((msg, index) => (
                                                                                                <div key={index}>{msg}</div>
                                                                                            ))}
                                                                                        </div>
                                                                            )}
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
                                        <button type="submit" className="btn btn-primary btn-sm rounded-0">Update</button>
                                    </div>
                            </div>
                        </form>



                    </div>
                </div>
            </div>
            {/* End Page Content Area */}
        </>
    )
}

export default EditExchangeDocu;


// changeHandler(e, currency.id, "tt", "buy")
// formState = {
// [currencyId]: {
//     tt: { buy: "", sell: "" },
//     cash: { buy: "", sell: "" },
//     earn: { buy: "", sell: "" }
// },
// ...
// }