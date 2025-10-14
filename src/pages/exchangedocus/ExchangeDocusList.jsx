import { useEffect, useState } from "react";
import {useParams,useNavigate,Link} from "react-router"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons"

import api from "./../../auth/api";
import ExcelImport from "./ExcelImport";

function ExchangeDocusList(){
    const navigate = useNavigate();

    const [ exchangedocus ,setExchangeDocus] = useState(null); 
    const [loading,setLoading] = useState(true);
    const [pagination, setPagination] = useState({});
    const [formState, setFormState] = useState({
        "from_date": '',
        "to_date": ''
    });
    const fetchRates = async (page = 1) => {
        api.get(`exchangedocus`,{
            params: {
                page,
                ...formState   // merge your filters
            }
        })
        .then(res=>{
            console.log(res.data);

            const fetchedexchangedocus = res.data.data;
            setExchangeDocus(res.data.data);
            setPagination({
                current_page: res.data.meta.current_page,
                last_page: res.data.meta.last_page,
                per_page: res.data.meta.per_page,
                total: res.data.meta.total,
            });
            setLoading(false);
        }).catch(err=>{
            console.error(`Error fetching product: ${err}`);
            setLoading(false);
        })
    }

    useEffect(()=>{
        fetchRates();
    },[formState]);

    const handlePageChange = (page) => {
        if (page !== pagination.current_page) {
        fetchRates(page);
        }
    };

    const changeHandler = (e)=>{
          // const name = e.target.name;
          // const value = e.target.value;
          // console.log(name,value);

          // setFormState({
          //      ...formState,
          //      [e.target.name]: e.target.value
          // });

          const {name,value} = e.target;
          setFormState(prev=>{
             return {...prev,[name]:value}
          });
     } 

    const submitHandler = (e)=>{
        e.preventDefault();

        console.log(formState);
        fetchRates(1);
        // settasks(prev=>{
        //     return [...prev,formState]
        // });

        // setFormState({
        //     name:"",
        //     quantity:1,
        //     tags:[],
        //     package:""
        // });
    }

    const refreshHandler = ()=>{
        setFormState({
            "from_date": '',
            "to_date": ''
        });
        fetchRates(1);
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
            
            <h4>Daily Exchange Documents</h4>
            <div className="container-fluid">
                <div className="col-md-12">
                    <div className="col-md-12 loader-container">

                      
                        <form action="" method="" >
                            <div className="row mb-2 align-items-end">
                                <div className="col">
                                    <button type="button" className="btn btn-outline-secondary mb-2" onClick={()=>navigate(-1)}><FontAwesomeIcon icon={'fas fa-arrow-left'} />Back</button>
                                    <Link to="/exchangedocus/create" className="btn btn-primary mb-2 mx-2">Create</Link>
                                </div>

                                <ExcelImport />
                            </div>
                        </form>
       
                        <hr/>
                        
                 
                        <form action="" method=""  onSubmit={submitHandler}>
                            <div className="row mb-2 align-items-end">
                                <div className="col-md-3 mb-2">
                                    <label htmlFor="from_date">From Date</label>
                                    <input type="date" name="from_date" id="from_date" className="form-control" placeholder="" onChange={changeHandler} value={formState.from_date}/>
                                </div>

                                <div className="col-md-3 mb-2">
                                    <label htmlFor="to_date">To Date</label>
                                    <input type="date" name="to_date" id="to_date" className="form-control" placeholder="" onChange={changeHandler} value={formState.to_date}/>
                                </div>
                                
                                <div className="col mb-2">
                                    {/* <button type="submit" className="btn btn-success mb-2 me-2">Search</button> */}
                                    <button type="button" className="btn btn-secondary mb-2 me-2" onClick={refreshHandler}>Refresh</button>
                                </div>

                            </div>

                        </form>
                  

                        <div className="table-container">
                                <table id="mytable"  className="table table-md table-hover border">

                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Action</th>
                                            <th>Exchange Date</th>
                                            <th>Updated At</th>
                                            <th>By</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {exchangedocus.map((exchangedocu,idx)=>(
                                            <tr key={exchangedocu.id} id="row_${exchangedocu.id}">
                                                <td>{ ++idx}</td>
                                                <td>
                                                    <Link to={`/exchangedocus/${exchangedocu.id}/edit`} className="text-info edit-btns" data-id="${data.id}" ><FontAwesomeIcon icon="fas fa-pen" /></Link>
                                                </td>
                                                <td>{exchangedocu.dateFormat}</td>
                                                <td>{exchangedocu.updated_at}</td>
                                                <td>{exchangedocu.user.name}</td>
                                                {/* <td>${data.created_at}</td>
                                                <td>${data.updated_at}</td> */}
                                                
                                            </tr>
                                         ))}
                                    </tbody>

                                </table>
                                
                                {/* Pagination */}
                                <nav>
                                    <ul className="pagination">
                                    {Array.from({ length: pagination.last_page || 0 }, (_, i) => (
                                        <li
                                        key={i + 1}
                                        className={`page-item ${
                                            pagination.current_page === i + 1 ? "active" : ""
                                        }`}
                                        >
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                        </li>
                                    ))}
                                    </ul>
                                </nav>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ExchangeDocusList;