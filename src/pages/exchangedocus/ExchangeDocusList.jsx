import { useEffect, useState } from "react";
import {useParams,useNavigate,Link} from "react-router"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons"

import APP_CONFIG from './../../config/AppConfig.js';
import axios from "axios"

function ExchangeDocusList(){
    const navigate = useNavigate();

    const [ exchangedocus ,setExchangeDocus] = useState(null); 
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        axios.get(`${APP_CONFIG.backendURL}/api/exchangedocus`)
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
            <div className="container-fluid">
                <div className="col-md-12">
                    <div className="col-md-12 loader-container">

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
                                                <td>{exchangedocu.user_id}</td>
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