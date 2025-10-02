import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from "react-router";
import user1 from "./../../assets/img/users/user1.jpg"

import {useParams,useNavigate} from "react-router"

import api from "./../../auth/api";

import { useAuth } from "./../../context/AuthContext";
import { NavLink } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
function Navbar(){
    const navigate = useNavigate();
    // const user = JSON.parse(localStorage.getItem("user"));
    const {user} = useAuth();
    console.log(user);
    const logoutHandler = (e) => {
        api
        .post(`/logout`)
        .then((res) => {
            console.log("Logout success:", res.data);
        })
        .catch((error) => {
            console.error("Logout failed:", error.response?.data || error.message);
        })
        .finally(() => {
            // Clear local storage regardless
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
        });
    };



    const location = useLocation();

    useEffect(() => {
        // close collapse by removing `show` class manually
        const navbar = document.getElementById("nav");
        if (navbar && navbar.classList.contains("show")) {
        navbar.classList.remove("show");
        }
    }, [location]); 

    return (

        <>
        {/* Start Left Navbar */}
        <div className="wrappers">
            <nav className="navbar navbar-expand-md navbar-light">
                <button type="button" className="navbar-toggler bg-white ms-auto mb-2" data-bs-toggle="collapse" data-bs-target="#nav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="nav" className="navbar-collapse collapse">
                    <div className="container-fluid">

                        <div className="row">
                          
                            {/* Start Top Sidebar */}
                            <div className="col-lg-10 col-md-9 fixed-top ms-auto topnavbars position-md-relatives">
                                <div className="row">
                                    <nav className="navbar navbar-expand navbar-light bg-white shadow">
                                        {/* search */}
                                        <form className="me-auto" action="" method="">
                                            <div className="input-group">
                                                <input type="text" name="search" id="search" className="form-control border-0 shadow-none" placeholder="Search Something..."/>
                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-primary "><FontAwesomeIcon icon="fas fa-search"/></button>
                                                </div>
                                            </div>
                                        </form>
                                        {/* search */}

                                        {/* notify & userlogout*/}
                                        <ul className="navbar-nav me-5 pe-5">
                                            {/* notify */}
                                            <li className="nav-item dropdowns">
                                                <Link to="/" className="nav-link dropbtn" >
                                                    <FontAwesomeIcon icon="fas fa-bell"/>
                                                    <span className="badge bg-danger">5+</span>
                                                </Link>
                                                <div className="dropdown-contents mydropdowns">
                                                    <h6>Alert Center</h6>
                                                    <Link href="javascript:void(0);" className="d-flex">
                                                        <div>
                                                            <FontAwesomeIcon icon="fas fa-file-alt"/>
                                                        </div>
                                                        <div>
                                                            <p className="small text-muted">3 May 2023</p>
                                                            <i>A new members created.</i>
                                                        </div>
                                                    </Link>
                                                    <Link href="javascript:void(0);" className="d-flex">
                                                        <div>
                                                            <FontAwesomeIcon icon="fas fa-database text-warnning"/>
                                                        </div>
                                                        <div>
                                                            <p className="small text-muted">3 May 2023</p>
                                                            <i>Some of your data are missing.</i>
                                                        </div>
                                                    </Link>
                                                    <Link href="javascript:void(0);" className="d-flex">
                                                        <div>
                                                            <FontAwesomeIcon icon="fas fa-user text-info"/>
                                                        </div>
                                                        <div>
                                                            <p className="small text-muted">3 May 2023</p>
                                                            <i>A new user are invited you</i>
                                                        </div>
                                                    </Link>

                                                    <Link href="javascript:void(0);" className="small text-muted">Show All Notification</Link>
                                                </div>
                                            </li>
                                            {/* notify */}

                                            {/* message */}
                                            <li className="nav-item dropdowns mx-3">
                                                <Link href="javascript:void(0);" className="nav-link dropbtn">
                                                    <FontAwesomeIcon icon="fas fa-envelope"/>
                                                </Link>
                                                <div className="dropdown-contents mydropdowns">
                                                    <h6>Message Center</h6>
                                                    <Link href="javascript:void(0);" className="d-flex">
                                                        <div className="me-3">
                                                            <img src={user1} className="rounded-circle" width="30" alt="user1"/>
                                                        </div>
                                                        <div>
                                                            <p className="small text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                                            <i>Ms.July - 25m ago</i>
                                                        </div>
                                                    </Link>
                                                    <Link href="javascript:void(0);" className="d-flex">
                                                        <div className="me-3">
                                                            <img src="./assets/img/users/user2.jpg" className="rounded-circle" width="30" alt="user1"/>
                                                            
                                                        </div>
                                                        <div>
                                                            <p className="small text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                                            <i>Ms.July - 25m ago</i>
                                                        </div>
                                                    </Link>
                                                    <Link href="javascript:void(0);" className="d-flex">
                                                        <div className="me-3">
                                                            <img src="./assets/img/users/user3.jpg" className="rounded-circle" width="30" alt="user3"/>

                                                        </div>
                                                        <div>
                                                            <p className="small text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                                            <i>Ms.PaPa - 55m ago</i>
                                                        </div>
                                                    </Link>

                                                    <Link href="javascript:void(0);" className="small text-muted text-center">Read More Message</Link>
                                                </div>
                                            </li>
                                            {/* message */}

                                            {/* user logout */}
                                            <li className="nav-item dropdown">
                                                <Link href="javascript:void(0);" className="dropdown-toggle" data-bs-toggle="dropdown">
                                                    <span className="text-muted small me-2">{user?.name}</span>
                                                    <img src={user1} className="rounded-circle" width="25" alt="" />
                                                </Link>
                                                <div className="dropdown-menu">
                                                    <Link href="jascript:void(0);" className="dropdown-item"><FontAwesomeIcon icon="fas fa-user fa-sm text-muted me-2"/>Profile</Link>
                                                    <Link href="jascript:void(0);" className="dropdown-item"><FontAwesomeIcon icon="fas fa-cogs fa-sm text-muted me-2"/>Settings</Link>
                                                    <Link href="jascript:void(0);" className="dropdown-item"><FontAwesomeIcon icon="fas fa-list fa-sm text-muted me-2"/>Activity Log</Link>
                                                    <div className="dropdown-divider"></div>
                                                    <button onClick={logoutHandler} className="dropdown-item"><FontAwesomeIcon icon="fas fa-sign-out fa-sm text-muted me-2"/>Logout</button>

                                                </div>
                                            </li>
                                            {/* user logout */}
                                        </ul>
                                        {/* notify & userlogout */}
                                    </nav>
                                </div>

                            </div>
                            {/* End Top Sidebar */}

                            {/* Start Left Sidebar */}
                            <div className="col-lg-2 col-md-3 fixed-top vh-100 overflow-auto sidebars position-md-relatives">
                                <ul className="navbar-nav flex-column mt-4">
                                    <li className="nav-item nav-categories">Main</li>
                                    <li className="nav-item">
                                        <NavLink to="/" 
                                        className={({ isActive }) =>
                                            `nav-link text-white sidebarlinks ${isActive ? "currents" : ""}`
                                        }><FontAwesomeIcon icon="fas fa-tachometer-alt fa-lg me-3"/> Dashboard</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="javascript:void(0)" 
                                        className={({ isActive }) =>
                                            `nav-link text-white sidebarlinks ${isActive ? "currents" : ""}`
                                        }
                                        data-bs-toggle="collapse" data-bs-target="#pagelayout"><FontAwesomeIcon icon="fas fa-sack-dollar fa-lg me-3" /> Exchange Rate <FontAwesomeIcon icon="fas fa-angle-left" className="mores"/>
                                        </NavLink>
                                        <ul id="pagelayout" className="collapse ps-2">
                                            <li><NavLink to="/exchangedocus/create" 
                                                className={({ isActive }) =>
                                                    `nav-link text-white sidebarlinks ${isActive ? "currents" : ""}`
                                                }
                                                ><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Entry Exchange Rate </NavLink>
                                            </li>
                                            
                                            <li>
                                                <NavLink to="/exchangedocus/" 
                                                end
                                                className={({ isActive }) =>
                                                    `nav-link text-white sidebarlinks ${isActive ? "currents" : ""}`
                                                }
                                                ><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Exchange Rate List</NavLink>
                                            </li>
                                            
                                        </ul>
                                    </li>
                                    {/* <li className="nav-item"><Link href="javascript:void(0);" className="nav-link text-white p-3 mb-2 sidebarlinks" data-bs-toggle="collapse" data-bs-target="#sidebarlayout"><FontAwesomeIcon icon="fas fa-file-alt fa-lg me-3"/> Sidebar Layouts <FontAwesomeIcon icon="fas fa-angle-left" className="mores"/></Link>
                                        <ul id="sidebarlayout" className="collapse ps-2">
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Compact menu </Link></li>
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Icon menu </Link></li>
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Sidebar Hidden </Link></li>
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Sidebar Overlay </Link></li>
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Sidebar Fixed </Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item"><Link href="javascript:void(0);" className="nav-link text-white p-3 mb-2 sidebarlinks"><FontAwesomeIcon icon="fas fa-file-alt fa-lg me-3"/> Widgets</Link></li>

                                    <li className="nav-item nav-categories">UI Features</li>
                                    <li className="nav-item"><Link href="javascript:void(0);" className="nav-link text-white p-3 mb-2 sidebarlinks" data-bs-toggle="collapse" data-bs-target="#basicui"><FontAwesomeIcon icon="fas fa-file-alt fa-lg me-3"/> Basis UI Element <FontAwesomeIcon icon="fas fa-angle-left" className="mores"/></Link>
                                        <ul id="basicui" className="collapse ps-2">
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right"/> Accordions </Link></li>
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right"/> Buttons </Link></li>
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right"/> Badges </Link></li>
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right"/> Breadcrumbs </Link></li>
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right"/> Dropdowns </Link></li>
                                        </ul>
                                        <li className="nav-item"><Link href="javascript:void(0);" className="nav-link text-white p-3 mb-2 sidebarlinks" data-bs-toggle="collapse" data-bs-target="#advanceui"><FontAwesomeIcon icon="fas fa-file-alt fa-lg me-3"/> Advanced UI <FontAwesomeIcon icon="fas fa-angle-left" className="mores"/></Link>
                                            <ul id="advanceui" className="collapse ps-2">
                                                <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Clipboard </Link></li>
                                                <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Slider </Link></li>
                                                <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Carousel </Link></li>
                                                <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Loaders </Link></li>
                                                <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Tree View </Link></li>
                                            </ul>
                                        </li>
                                    </li>
                                    <li className="nav-item"><Link href="javascript:void(0);" className="nav-lin text-white p-3 mb-2 sidebarlinks"><FontAwesomeIcon icon="fas fa-file-alt fa-lg me-3"/> Popups</Link></li>

                                    <li className="nav-item"><Link href="javascript:void(0);" className="nav-link text-white p-3 mb-2 sidebarlinks" data-bs-toggle="collapse" data-bs-target="#icons"><FontAwesomeIcon icon="fas fa-file-alt fa-lg me-3" data-bs-toggle="collapse" data-bs-target="#advanceui"/> Icons <FontAwesomeIcon icon="fas fa-angle-left" className="mores"/></Link>
                                        <ul id="icons" className="collapse ps-2">
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Material </Link></li>
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Flag icons </Link></li>
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Font Awesome </Link></li>
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Sample line icons </Link></li>
                                        </ul>
                                    </li>

                                    <li className="nav-item nav-categories">Editors</li>
                                    <li className="nav-item"><Link href="javascript:void(0);" className="nav-link text-white p-3 mb-2 sidebarlinks"><FontAwesomeIcon icon="fas fa-file-alt fa-lg me-3"/> Text editors</Link></li>
                                    <li className="nav-item"><Link href="javascript:void(0);" className="nav-link text-white p-3 mb-2 sidebarlinks"><FontAwesomeIcon icon="fas fa-file-alt fa-lg me-3"/> Code editors</Link></li>

                                    <li className="nav-item nav-categories">Data Representation</li>
                                    <li className="nav-item"><Link href="javascript:void(0);" className="nav-link text-white p-3 mb-2 sidebarlinks" data-bs-toggle="collapse" data-bs-target="#chartelement"><FontAwesomeIcon icon="fas fa-file-alt fa-lg me-3"/> Charts <FontAwesomeIcon icon="fas fa-angle-left" className="mores"/></Link>
                                        <ul id="chartelement" className="collapse ps-2">
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right"/> Pie Chart</Link></li>
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right"/> Google Chart </Link></li>
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right"/> Line Chart </Link></li>
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right"/> ChartJs </Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item"><Link href="javascript:void(0);" className="nav-link text-white p-3 mb-2 sidebarlinks" data-bs-toggle="collapse" data-bs-target="#table"><FontAwesomeIcon icon="fas fa-file-alt fa-lg me-3"/> Tables <FontAwesomeIcon icon="fas fa-angle-left" className="mores"/></Link>
                                        <ul id="table" className="collapse ps-2">
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Basis table</Link></li>
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Data table </Link></li>
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Sortable table </Link></li>
                                        </ul>
                                    </li>

                                    <li className="nav-item"><Link href="javascript:void(0);" className="nav-link text-white p-3 mb-2 sidebarlinks" data-bs-toggle="collapse" data-bs-target="#maps"><FontAwesomeIcon icon="fas fa-file-alt fa-lg me-3"/> Maps <FontAwesomeIcon icon="fas fa-angle-left" className="mores"/></Link>
                                        <ul id="maps" className="collapse ps-2">
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Google Map</Link></li>
                                            <li><Link href="javascript:void(0);" className="nav-link text-white sidebarlinks"><FontAwesomeIcon icon="fas fa-long-arrow-alt-right" className="me-4"/> Vector Map </Link></li>
                                        </ul>
                                    </li> */}
                                </ul>
                            </div>
                            {/* End Left Sidebar */}

                        </div>
                    </div>
                </div>
            </nav>
        </div>
        {/* End Left Navbar */}
        </>
    )
}
export default Navbar;