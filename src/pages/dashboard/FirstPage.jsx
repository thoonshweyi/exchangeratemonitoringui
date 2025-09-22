import { useEffect, useState } from "react";

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
        <div className="dashboard-wrap">
            <div className="board-card">
            {/* Header */}
            <div className="board-header">
                <div className="brand">
                <span className="dot" aria-hidden="true"></span>
                <div>
                    <div className="h6 m-0">Exchange Rate Board</div>
                    <div className="subline">Live-style display • Today</div>
                </div>
                </div>
                <div className="controls">
                {/* <button id="btnSim" className="btn-board" type="button"><FontAwesomeIcon icon="bi bi-activity"/> Live updates</button> */}
                {/* <button id="btnRefresh" className="btn-board" type="button"><FontAwesomeIcon icon="bi bi-arrow-clockwise"/> Refresh once</button> */}
                <button id="btnExport" className="btn-board" type="button"><FontAwesomeIcon icon="bi bi-printer"/> Export</button>
                </div>
            </div>

            {/* Today / Meta */}
            <div className="today-bar">
                <div className="date-badge"><FontAwesomeIcon icon="fas fa-calendar"/> <span id="todayText">{docu.date}</span></div>
                <div className="subline">Last update: <span id="lastUpdate">{docu.updated_at}</span></div>
            </div>

            {/* Board Table */}
            <div className="table-wrap">
                <table className="board">
                <thead>
                    <tr>
                    <th>Currency</th>
                    <th>TT Buy</th>
                    <th>TT Sell</th>
                    <th>Cash Buy</th>
                    <th>Cash Sell</th>
                    <th>Earn Buy</th>
                    <th>Earn Sell</th>
                    </tr>
                </thead>
                <tbody id="boardBody">
                    {/* rows injected */}
                    {/* <tr>
                        <td className="cell">
                        <div className="currency">
                            <span className="flag">${cur.flag}</span>
                            <span>USD</span>
                            <span className="muted">US Dollar</span>
                        </div>
                        </td>
                        <td className="cell" data-field="tt.buy">-</td>
                        <td className="cell" data-field="tt.sell">-</td>
                        <td className="cell" data-field="cash.buy">-</td>
                        <td className="cell" data-field="cash.sell">-</td>
                        <td className="cell" data-field="earn.buy">-</td>
                        <td className="cell" data-field="earn.sell">-</td>
                    </tr> */}

                    {
                        docu.exchangerates.map((exchangerate,idx)=>(
                            <tr>
                                <td className="cell">
                                <div className="currency">
                                    {/* <span className="flag">${cur.flag}</span> */}
                                    <span>{exchangerate.currency.code}</span>
                                    <span className="muted">{exchangerate.currency.name}</span>
                                </div>
                                </td>
                                <td className="cell" data-field="tt.buy">{exchangerate.tt_buy}</td>
                                <td className="cell" data-field="tt.sell">{exchangerate.tt_sell}</td>
                                <td className="cell" data-field="cash.buy">{exchangerate.cash_buy}</td>
                                <td className="cell" data-field="cash.sell">{exchangerate.cash_sell}</td>
                                <td className="cell" data-field="earn.buy">{exchangerate.earn_buy}</td>
                                <td className="cell" data-field="earn.sell">{exchangerate.earn_sell}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="footer">
                <div>Showing TT, Cash, Earn — Buy and Sell for USD, THB, CNY, INR</div>
                {/* <button id="btnBigText" className="btn-board" type="button"><FontAwesomeIcon icon="bi bi-zoom-in"/> Big text</button> */}
            </div>
            </div>
        </div>


    )
}

export default FirstPage;