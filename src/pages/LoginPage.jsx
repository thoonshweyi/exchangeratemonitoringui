import pro1globallogo from "./../assets/icons/pro1globallogo.png"



function LoginPage(){
    return (
        <>
            <section className="loginsection">
                <div id="background" className="background"></div>
                <div className="login-container">
                    <img src={pro1globallogo} alt="pro1globallogo" className="d-block mx-auto mb-4" style={{width: "180px"}} />
                    <h1>Exchange Rate Monitoring</h1>
                    {/* <p>Change the password to see the effect</p> */}
                
                
                    <form action="" method="">

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" className="form-control" placeholder="Enter Email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" className="form-control" placeholder="Enter Password"/>
                            <i id="eye" className="fas fa-eye"></i>
                        </div>
                        
                        <div className="d-grid mt-2">
                            <button type="button" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default LoginPage;