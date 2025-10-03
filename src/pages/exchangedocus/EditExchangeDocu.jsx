import { useEffect, useState } from "react";
import {useParams,useNavigate} from "react-router"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons"

import api from "./../../auth/api";

import EditRateModal from "./EditRateModal";
import Swal from 'sweetalert2'


import {Link} from "react-router";
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

    const [selectedRate, setSelectedRate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedType,setSelectedType] = useState(null);
    const [newChange,setNewChange] = useState(null);
    useEffect(() => {
        if (!id) return;

        api.get(`/exchangedocus/${id}`)
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
                yes_tt_buy: rate.yes_tt_buy || "",
                yes_tt_sell: rate.yes_tt_sell || "",
                yes_cash_buy: rate.yes_cash_buy || "",
                yes_cash_sell: rate.yes_cash_sell || "",
                yes_earn_buy: rate.yes_earn_buy || "",
                yes_earn_sell: rate.yes_earn_sell || "",
                currency: rate.currency,
                changehistories: rate.changehistories,
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
		    // exchangerates: formState 
        };
        console.log(data);

        try{
            const res = await api.put(`/exchangedocus/${id}`,data);
            console.log(res.data);

            setformErrors({});
		    setFormState({})
            navigate(`/exchangedocus`);

        }catch(err){
            console.log('Add Exchange Rate failed',err);
        }

        console.log("Form Submitted")
    }


    const handleEditClick = (rate,type) => {
        setSelectedRate(rate);
        setSelectedType(type);
        setShowModal(true);
        setNewChange(false);
    };

    const handleSaveRate = async (rateId, updatedFields) => {
        try {
            console.log(newChange);
            const res = await api.put(`/exchangerates/${rateId}`, {...updatedFields,newChange,selectedType});
            // update local state with new data
            console.log(res.data);

            const newHistory = res.data.changehistory;

            Swal.fire({
                title: 'Rate Updated',
                text: 'Updated Successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            })
            setFormState((prev) =>
                prev.map((r) => (r.id === rateId ? { 
                    ...r,
                    ...res.data.data,
                    changehistories: newHistory
                        ? [newHistory,...(r.changehistories || [])]
                        : r.changehistories
                } : r))
            );
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

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
                                                            <span className="currency-icon">
                                                                <FontAwesomeIcon icon={rate.currency.icon} />
                                                            </span>
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
                                                                <div className="d-flex w-100 justify-content-between">
                                                                    <h6 className="text-primary mb-3">
                                                                        <FontAwesomeIcon icon="fas fa-university" className="me-2"/>TT Rates
                                                                        {/* <FontAwesomeIcon icon="fas fa-edit" />     */}
                                                                    </h6>
                                                                    <Link type="button" onClick={() => handleEditClick(rate,"tt")}>Edit </Link>
                                                                    <button type="button" className="btn btn-outline-secondary rounded-sm ms-2"   onClick={() => {handleEditClick(rate,"tt");setNewChange(true);}}><FontAwesomeIcon icon="fas fa-plus" /> </button>
                                                                </div>

                                                                <div className="d-flex gap-4">
                                                                    <div className="flex-fill mb-1">
                                                                        <label className="rate-label">Buy</label>
                                                                        {/* <input type="number" step="0.01" className="form-control rate-input" 
                                                                            // name={`exchangerates[${rate.id}][tt][buy]`} 
                                                                            placeholder="0.00"
                                                                            value={rate.tt_buy}
                                                                            onChange={e => changeHandler(e, index, "tt_buy")}
                                                                            /> */}
                                                                            <h6 className="rate-value">{rate.tt_buy}</h6>
                                                                            <small className="rate-placeholder">{rate.yes_tt_buy}</small>
                                                                            {formErrors[`${rate.id}_tt_buy`] && (
                                                                                <div className="text-danger small mb-1">
                                                                                    {Object.values(formErrors[`${rate.id}_tt_buy`]).map((msg, index) => (
                                                                                        <div key={index}>{msg}</div>
                                                                                    ))}
                                                                                </div>
                                                                            )}

                                                                        
                                                                    </div>
                                                                    <div className="flex-fill mb-1">
                                                                        <label className="rate-label">Sell</label>
                                                                        {/* <input type="number" step="0.01" className="form-control rate-input" 
                                                                            // name={`exchangerates[${rate.id}][tt][sell]`} 
                                                                            placeholder="0.00"
                                                                            value={rate.tt_sell}
                                                                            onChange={e => changeHandler(e, index, "tt_sell")}
                                                                            /> */}
                                                                            <h6 className="rate-value">{rate.tt_sell}</h6>
                                                                            <small className="rate-placeholder">{rate.yes_tt_sell}</small>
                                                                            {formErrors[`${rate.id}_tt_sell`] && (
                                                                                    <div className="text-danger small mb-1">
                                                                                        {Object.values(formErrors[`${rate.id}_tt_sell`]).map((msg, index) => (
                                                                                            <div key={index}>{msg}</div>
                                                                                        ))}
                                                                                    </div>
                                                                            )}

                                                                    </div>
                                                                </div>
                                                                
                                                                {/* Change History */}
                                                                <div className="mt-3">
                                                                    <button
                                                                        className="btn btn-link p-0 text-decoration-none"
                                                                        type="button"
                                                                        data-bs-toggle="collapse"
                                                                        data-bs-target={`#history-${rate.id}-tt`}
                                                                    >
                                                                        <FontAwesomeIcon icon="fas fa-history" className="me-1" /> View Change History
                                                                    </button>

                                                                    <div className="collapse mt-2" id={`history-${rate.id}-tt`}>
                                                                        <div className="card card-body p-2 history-card">
                                                                            <h6 className="fw-bold mb-3">Change History</h6>

                                                                            <div className="history-timeline">
                                                                                {rate.changehistories && rate.changehistories.length > 0 ? (
                                                                                    rate.changehistories
                                                                                    .filter(ch => ch.type === "tt")
                                                                                    .map((changehistory, idx) => (
                                                                                        <div className="history-entry mb-3">
                                                                                            <div className="d-flex justify-content-between">
                                                                                                <span className="fw-bold text-success">Buy: {changehistory.buy}</span>
                                                                                                <span className="fw-bold text-danger">Sell: {changehistory.sell}</span>
                                                                                            </div>
                                                                                            <div className="d-flex justify-content-between small text-muted">
                                                                                                <span>{changehistory.record_at}</span>
                                                                                                <span>{changehistory.user.name}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))
                                                                                ) : 
                                                                                (
                                                                                    <div className="text-muted small">No history available</div>
                                                                                )}

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            {/* Cash Rates */}
                                                            <div className="col-md-4 mb-3">
                                                                <div className="d-flex w-100 justify-content-between">
                                                                    <h6 className="text-success mb-3">
                                                                        <FontAwesomeIcon icon="fa-solid fa-money-bill-1-wave" className="me-2" />Cash Rates
                                                                    </h6>

                                                                    <Link type="button" onClick={() => handleEditClick(rate,"cash")}>Edit </Link>
                                                                    <button type="button" className="btn btn-outline-secondary rounded-sm ms-2"   onClick={() =>{ handleEditClick(rate,"cash");setNewChange(true);}}><FontAwesomeIcon icon="fas fa-plus" /> </button>
                                                                </div>
                                                                <div className="d-flex gap-4">
                                                                    <div className="flex-fill mb-1">
                                                                        <label className="rate-label">Buy</label>
                                                                        {/* <input type="number" step="0.01" className="form-control rate-input" 
                                                                            name={`cash_buy_${rate.id}`} placeholder="0.00" 
                                                                            value={rate.cash_buy}
                                                                            onChange={e => changeHandler(e, index, "cash_buy")}
                                                                            /> */}
                                                                            <h6 className="rate-value">{rate.cash_buy}</h6>
                                                                            <small className="rate-placeholder">{rate.yes_cash_buy}</small>
                                                                            {formErrors[`${rate.id}_cash_buy`] && (
                                                                                    <div className="text-danger small mb-1">
                                                                                        {Object.values(formErrors[`${rate.id}_cash_buy`]).map((msg, index) => (
                                                                                            <div key={index}>{msg}</div>
                                                                                        ))}
                                                                                    </div>
                                                                            )}
                                                                    </div>
                                                                    <div className="flex-fill mb-1">
                                                                        <label className="rate-label">Sell</label>
                                                                        {/* <input type="number" step="0.01" className="form-control rate-input" 
                                                                            name={`cash_sell_${rate.id}`} placeholder="0.00"
                                                                            value={rate.cash_sell}
                                                                            onChange={e => changeHandler(e, index, "cash_sell")}
                                                                            /> */}
                                                                        <h6 className="rate-value">{rate.cash_sell}</h6>
                                                                            <small className="rate-placeholder">{rate.yes_cash_sell}</small>
                                                                        {formErrors[`${rate.id}_cash_sell`] && (
                                                                            <div className="text-danger small mb-1">
                                                                                {Object.values(formErrors[`${rate.id}_cash_sell`]).map((msg, index) => (
                                                                                    <div key={index}>{msg}</div>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                {/* Change History */}
                                                                <div className="mt-3">
                                                                    <button
                                                                        className="btn btn-link p-0 text-decoration-none"
                                                                        type="button"
                                                                        data-bs-toggle="collapse"
                                                                        data-bs-target={`#history-${rate.id}-cash`}
                                                                    >
                                                                        <FontAwesomeIcon icon="fas fa-history" className="me-1" /> View Change History
                                                                    </button>

                                                                    <div className="collapse mt-2" id={`history-${rate.id}-cash`}>
                                                                        <div className="card card-body p-2 history-card">
                                                                            <h6 className="fw-bold mb-3">Change History</h6>

                                                                            <div className="history-timeline">
                                                                                {rate.changehistories && rate.changehistories.length > 0 ? (
                                                                                    rate.changehistories
                                                                                    .filter(ch => ch.type === "cash")
                                                                                    .map((changehistory, idx) => (
                                                                                        <div className="history-entry mb-3">
                                                                                            <div className="d-flex justify-content-between">
                                                                                                <span className="fw-bold text-success">Buy: {changehistory.buy}</span>
                                                                                                <span className="fw-bold text-danger">Sell: {changehistory.sell}</span>
                                                                                            </div>
                                                                                            <div className="d-flex justify-content-between small text-muted">
                                                                                                <span>{changehistory.record_at}</span>
                                                                                                <span>{changehistory.user.name}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))
                                                                                ) : 
                                                                                (
                                                                                    <div className="text-muted small">No history available</div>
                                                                                )}

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            {/* Earn Rates */}
                                                            <div className="col-md-4 mb-3">
                                                                <div className="d-flex w-100 justify-content-between">
                                                                    <h6 className="text-warning mb-3">
                                                                        <FontAwesomeIcon icon="fa-solid fa-chart-line" className="me-2" />Earn Rates
                                                                    </h6>
                                                                    <Link type="button" onClick={() => handleEditClick(rate,"earn")}>Edit </Link>
                                                                    <button type="button" className="btn btn-outline-primary rounded-sm ms-2"   onClick={() =>{ handleEditClick(rate,'earn');setNewChange(true);}}><FontAwesomeIcon icon="fas fa-plus" /> </button>
                                                                </div>
                                           
                                                                <div className="d-flex gap-4">
                                                                    <div className="flex-fill mb-1">
                                                                        <label className="rate-label">Buy</label>
                                                                        {/* <input type="number" step="0.01" className="form-control rate-input" 
                                                                            name={`earn_buy_${rate.id}`} placeholder="0.00"
                                                                            value={rate.earn_buy}
                                                                            onChange={e => changeHandler(e, index, "earn_buy")}
                                                                            /> */}
                                                                            <h6 className="rate-value">{rate.earn_buy}</h6>
                                                                            <small className="rate-placeholder">{rate.yes_earn_buy}</small>
                                                                            {formErrors[`${rate.id}_earn_buy`] && (
                                                                                        <div className="text-danger small mb-1">
                                                                                            {Object.values(formErrors[`${rate.id}_earn_buy`]).map((msg, index) => (
                                                                                                <div key={index}>{msg}</div>
                                                                                            ))}
                                                                                        </div>
                                                                            )}
                                                                    </div>
                                                                    <div className="flex-fill mb-1">
                                                                        <label className="rate-label">Sell</label>
                                                                        {/* <input type="number" step="0.01" className="form-control rate-input" 
                                                                            name={`earn_sell_${rate.id}`} placeholder="0.00" 
                                                                            value={rate.earn_sell} 
                                                                            onChange={e => changeHandler(e, index, "earn_sell")}
                                                                            /> */}
                                                                        <h6 className="rate-value">{rate.earn_sell}</h6>
                                                                        <small className="rate-placeholder">{rate.yes_earn_sell}</small>
                                                                        

                                                                        {formErrors[`${rate.id}_earn_sell`] && (
                                                                                        <div className="text-danger small mb-1">
                                                                                            {Object.values(formErrors[`${rate.id}_earn_sell`]).map((msg, index) => (
                                                                                                <div key={index}>{msg}</div>
                                                                                            ))}
                                                                                        </div>
                                                                            )}
                                                                    </div>
                                                                </div>
                                                                {/* Change History */}
                                                                <div className="mt-3">
                                                                    <button
                                                                        className="btn btn-link p-0 text-decoration-none"
                                                                        type="button"
                                                                        data-bs-toggle="collapse"
                                                                        data-bs-target={`#history-${rate.id}-earn`}
                                                                    >
                                                                        <FontAwesomeIcon icon="fas fa-history" className="me-1" /> View Change History
                                                                    </button>

                                                                    <div className="collapse mt-2" id={`history-${rate.id}-earn`}>
                                                                        <div className="card card-body p-2 history-card">
                                                                            <h6 className="fw-bold mb-3">Change History</h6>

                                                                            <div className="history-timeline">
                                                                                {rate.changehistories && rate.changehistories.length > 0 ? (
                                                                                    rate.changehistories
                                                                                    .filter(ch => ch.type === "earn")
                                                                                    .map((changehistory, idx) => (
                                                                                        <div className="history-entry mb-3">
                                                                                            <div className="d-flex justify-content-between">
                                                                                                <span className="fw-bold text-success">Buy: {changehistory.buy}</span>
                                                                                                <span className="fw-bold text-danger">Sell: {changehistory.sell}</span>
                                                                                            </div>
                                                                                            <div className="d-flex justify-content-between small text-muted">
                                                                                                <span>{changehistory.record_at}</span>
                                                                                                <span>{changehistory.user.name}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))
                                                                                ) : 
                                                                                (
                                                                                    <div className="text-muted small">No history available</div>
                                                                                )}

                                                                            </div>
                                                                        </div>
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


            {selectedRate && (
                <EditRateModal
                show={showModal}
                onClose={() => setShowModal(false)}
                rate={selectedRate}
                type={selectedType}
                onSave={handleSaveRate}
                />
            )}
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