import { useEffect, useState } from "react";
import {useParams,useNavigate} from "react-router"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons"

import api from "./../../auth/api";

function AddExchangeDocu(){
    const navigate = useNavigate();
    const [ currencies ,setCurrencies] = useState(null); 
    const [loading,setLoading] = useState(true);
    const [formState,setFormState] = useState({});
	const [formErrors, setformErrors] = useState({});
    const [recordDate, setRecordDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    // console.log(recordDate);

    useEffect(()=>{
        api.get(`/currencies`)
        .then(res=>{
            console.log(res.data);

            const fetchedcurrencies = res.data.data;
            setCurrencies(res.data.data);

            // initialize formState
            const initialState = {};
            fetchedcurrencies.forEach(c => {
                initialState[c.id] = {
                    tt: { buy: "", sell: "" },
                    cash: { buy: "", sell: "" },
                    earn: { buy: "", sell: "" }
                };
            });
            setFormState(initialState);

            setLoading(false);
        }).catch(err=>{
            console.error(`Error fetching product: ${err}`);
            setLoading(false);
        })
    },[]);

    // const changeHandler = (e)=>{
    //     const {name,value} = e.target;
    //     setFormState(prev=>{
    //         return {...prev,[name]:value}
    //     });
    // }


    const changeHandler = (e, currencyId, type, side) => {
        const { value } = e.target;

        setFormState(prev => ({
        ...prev,
        [currencyId]: {
            ...prev[currencyId],
            [type]: {
                ...prev[currencyId]?.[type],
                [side]: value
            }
        }
        }));
    };

    const validate = () => {
        const formErrors = {};

        Object.entries(formState).forEach(([currencyId, currencyObj]) => {
            Object.entries(currencyObj).forEach(([type, typeObj]) => {
                Object.entries(typeObj).forEach(([side, value]) => {
                    const fieldErrors = {};
                    if (!value || value.toString().trim() === "") {
                        fieldErrors.required = "This field is required.";
                    }
                    if (Object.keys(fieldErrors).length > 0) {
                        const fieldKey = `${currencyId}_${type}_${side}`;
                        formErrors[fieldKey] = fieldErrors;
                    }
                });
            });
        });

        console.log("Validation Errors:", formErrors);
        // console.log("Validation Errors Length: ", Object.values(formErrors).length);

        setformErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };
    
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
            const res = await api.post(`/exchangedocus`,data);
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
            <div>
                <button type="button" className="btn btn-outline-secondary mb-4" onClick={()=>navigate(-1)}><FontAwesomeIcon icon={"fs fa-arrow-left"} />Back</button>
            </div>
            {/* Start Page Content Area */}
            <div className="container-fluid">
                <div className="col-md-12">
                    <div className="main-container">
                        <form action="" method="" onSubmit={submitHandler}>

                            <div className="header-section">
                                <div className="row align-items-center">
                                    <div className="col-md-8">
                                        <h1 className="mb-2"><FontAwesomeIcon icon="fa-solid fa-hand-holding-dollar" />Daily Exchange Rates Entry</h1>
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
                                                                            // name={`exchangerates[${currency.id}][tt][buy]`} 
                                                                            placeholder="0.0000"
                                                                            value={formState[currency.id]?.tt?.buy || ""} 
                                                                            onChange={(e) =>
                                                                                changeHandler(e, currency.id, "tt", "buy")
                                                                            } 
                                                                            />
                                                                            {formErrors[`${currency.id}_tt_buy`] && (
                                                                                <div className="text-danger small mb-1">
                                                                                    {Object.values(formErrors[`${currency.id}_tt_buy`]).map((msg, index) => (
                                                                                        <div key={index}>{msg}</div>
                                                                                    ))}
                                                                                </div>
                                                                            )}

                                                                        
                                                                    </div>
                                                                    <div className="mb-1">
                                                                        <label className="rate-label">Sell</label>
                                                                        <input type="number" step="0.0001" className="form-control rate-input" 
                                                                            // name={`exchangerates[${currency.id}][tt][sell]`} 
                                                                            placeholder="0.0000"
                                                                            value={formState[currency.id]?.tt?.sell || ""} 
                                                                            onChange={(e) =>
                                                                                changeHandler(e, currency.id, "tt", "sell")
                                                                            } 
                                                                            />
                                                                            {formErrors[`${currency.id}_tt_sell`] && (
                                                                                    <div className="text-danger small mb-1">
                                                                                        {Object.values(formErrors[`${currency.id}_tt_sell`]).map((msg, index) => (
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
                                                                            name={`cash_buy_${currency.id}`} placeholder="0.0000" 
                                                                            value={formState[currency.id]?.cash?.buy || ""} 
                                                                            onChange={(e) =>
                                                                                changeHandler(e, currency.id, "cash", "buy")
                                                                            } 
                                                                            />
                                                                            {formErrors[`${currency.id}_cash_buy`] && (
                                                                                    <div className="text-danger small mb-1">
                                                                                        {Object.values(formErrors[`${currency.id}_cash_buy`]).map((msg, index) => (
                                                                                            <div key={index}>{msg}</div>
                                                                                        ))}
                                                                                    </div>
                                                                            )}
                                                                    </div>
                                                                    <div className="mb-1">
                                                                        <label className="rate-label">Sell</label>
                                                                        <input type="number" step="0.0001" className="form-control rate-input" 
                                                                            name={`cash_sell_${currency.id}`} placeholder="0.0000"
                                                                            value={formState[currency.id]?.cash?.sell || ""} 
                                                                            onChange={(e) =>
                                                                                changeHandler(e, currency.id, "cash", "sell")
                                                                            } 
                                                                            />
                                                                        {formErrors[`${currency.id}_cash_sell`] && (
                                                                                    <div className="text-danger small mb-1">
                                                                                        {Object.values(formErrors[`${currency.id}_cash_sell`]).map((msg, index) => (
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
                                                                            name={`earn_buy_${currency.id}`} placeholder="0.0000"
                                                                            value={formState[currency.id]?.earn?.buy || ""} 
                                                                            onChange={(e) =>
                                                                                changeHandler(e, currency.id, "earn", "buy")
                                                                            } 
                                                                            />
                                                                            {formErrors[`${currency.id}_earn_buy`] && (
                                                                                        <div className="text-danger small mb-1">
                                                                                            {Object.values(formErrors[`${currency.id}_earn_buy`]).map((msg, index) => (
                                                                                                <div key={index}>{msg}</div>
                                                                                            ))}
                                                                                        </div>
                                                                            )}
                                                                    </div>
                                                                    <div className="mb-1">
                                                                        <label className="rate-label">Sell</label>
                                                                        <input type="number" step="0.0001" className="form-control rate-input" 
                                                                            name={`earn_sell_${currency.id}`} placeholder="0.0000" 
                                                                            value={formState[currency.id]?.earn?.sell || ""} 
                                                                            onChange={(e) =>
                                                                                changeHandler(e, currency.id, "earn", "sell")
                                                                            } 
                                                                            />

                                                                        {formErrors[`${currency.id}_earn_sell`] && (
                                                                                        <div className="text-danger small mb-1">
                                                                                            {Object.values(formErrors[`${currency.id}_earn_sell`]).map((msg, index) => (
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
                                        <button type="submit" className="btn btn-primary btn-sm rounded-0">Submit</button>
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

export default AddExchangeDocu;


// changeHandler(e, currency.id, "tt", "buy")
// formState = {
// [currencyId]: {
//     tt: { buy: "", sell: "" },
//     cash: { buy: "", sell: "" },
//     earn: { buy: "", sell: "" }
// },
// ...
// }