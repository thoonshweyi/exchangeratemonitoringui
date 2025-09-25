import { useEffect, useState } from "react";
import {useParams,useNavigate,Link} from "react-router"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons"

import api from "./../../auth/api";

function ExchangeDocusList(){
    const navigate = useNavigate();

    const [ exchangedocus ,setExchangeDocus] = useState(null); 
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        api.get(`exchangedocus`)
        .then(res=>{
            console.log(res.data);

            const fetchedexchangedocus = res.data.data;
            setExchangeDocus(res.data.data);

            setLoading(false);
        }).catch(err=>{
            console.error(`Error fetching product: ${err}`);
            setLoading(false);
        })
    },[]);



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

                        <Link to="/exchangedocus/create" className="btn btn-primary mb-4 me-2">Create</Link>
                        <button type="button" className="btn btn-outline-secondary mb-4" onClick={()=>navigate(-1)}><FontAwesomeIcon icon={'fas fa-arrow-left'} />Back</button>
                        <hr/>

                        <div className="table-container">
                                <table id="mytable"  className="table table-md table-hover border">

                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Action</th>
                                            <th>Date</th>
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
                                                <td>{exchangedocu.date}</td>
                                                <td>{exchangedocu.user.name}</td>
                                                {/* <td>${data.created_at}</td>
                                                <td>${data.updated_at}</td> */}
                                                
                                            </tr>
                                         ))}
                                    </tbody>

                                </table>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ExchangeDocusList;