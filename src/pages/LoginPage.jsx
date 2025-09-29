import pro1globallogo from "./../assets/icons/pro1globallogo.png"
import { useEffect, useState } from "react";
import {useParams,useNavigate} from "react-router"
import APP_CONFIG from './../config/AppConfig.js';
import axios from "axios"

import Swal from 'sweetalert2'
function LoginPage(){
    const navigate = useNavigate();
    const [formState,setFormState] = useState({
        email: "",
        password: ""
     });

    const changeHandler = (e)=>{

        const {name,value} = e.target;
        setFormState(prev=>{
            return {...prev,[name]:value}
        });
    }

    const submitHandler = (e)=>{
        e.preventDefault();

        console.log(formState);

        const data = formState;
        axios.post(`${APP_CONFIG.backendURL}/api/login`,data)
        // axios.post(`/api/login`,data)
        .then(res=>{
            const { token, user } = res.data;

            console.log(user);
         
            
            if(user){
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user))

                navigate(`/`);
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Login Failed.The provided credentials do not match our records.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
          
         ;

        }).catch(err=>{
            console.error(`Error Logging In: ${err}`);
            Swal.fire({
                title: 'Error!',
                text: 'Login Failed.The provided credentials do not match our records.',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        })


    }

    return (
        <>
            <section className="loginsection">
                <div id="background" className="background"></div>
                <div className="login-container text-black">
                    {/* <img src={pro1globallogo} alt="pro1globallogo" className="d-block mx-auto mb-4" style={{width: "180px"}} /> */}
                    <h1>Exchange Rate Monitoring</h1>
                    {/* <p>Change the password to see the effect</p> */}
                
                
                    <form action="" method="" onSubmit={submitHandler}>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" className="form-control" placeholder="Enter Email" onChange={changeHandler}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" className="form-control" placeholder="Enter Password" onChange={changeHandler}/>
                            <i id="eye" className="fas fa-eye"></i>
                        </div>
                        
                        <div className="d-grid mt-2">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default LoginPage;