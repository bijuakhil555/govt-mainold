import React, { useEffect, useState } from 'react'
// import firebase from 'firebase/app';
import firebase from './Firebase'

import {isAuthenticated,authenticate,signOut} from './Auth'
import {Link,Redirect} from 'react-router-dom'
// import { browserHistory } from 'react-router'

import Nav from '../nav'





export default function Login(props) {


    return (
        <>
            <div className="container">
                <div>
                    <RenderForm />
                </div>
            </div>
        </>
    )
}


const RenderForm = () => {


    // declare variables to store form data
    const [values, setValues] = useState({
        otp: '',
        mobile: '',
        confirmationResult: '',
        c_error:'',
        redirectToReffer:false,
    })


    // hande form data change and set variable
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
        console.log(values)
    }

    const redirectUser = ()=>{
        if(values.redirectToReffer){
            return <Redirect to='/'/>
            
        }
        if(isAuthenticated().phoneNumber){
            return <Redirect to='/'/>
        }
    }
    


    const getOtp = () => {
        let phoneNumber = "+91" + values.mobile
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container')
        
        firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha)
        .then(function (e) {
            
            setValues({ ...values, confirmationResult: e })
            console.log("OTP is sent");
            
        })
        .catch(function (error) {
            console.log(error);
            alert(error)
            
        });
    }


    const submitOTP = ()=>{

        let code = values.otp
        values.confirmationResult.confirm(code).then((result)=>{
            console.log(result.user,"User")
            authenticate({
                phoneNumber : "+91" + values.mobile
            },()=>{
                setValues({
                    ...values,
                    redirectToReffer:true,
                })
            })

            
        }).catch(err=>{
            console.log("error")
            alert("error or wrong otp")

        })

    }



    return (
        <>
      
            <Nav/>
            {
                values.confirmationResult.length === 0 &&


                

                

                <div className="row">



<div class="container-fluid m-4 d-flex justify-content-center">
		<div class="row main-content bg-success text-center">
			<div class="col-md-4 text-center company__info">
				
			</div>
			<div class="col-md-8 col-xs-12 col-sm-12 login_form ">
				<div class="container-fluid">
					<div class="row">
						<h2 className="font1">Log In</h2>
					</div>
                    <div id="recaptcha-container"></div>
					<div class="row">
						<form control="" class="form-group">
							<div class="row ">
                            <input className="form__input"
                                    type="text" name="mobile"
                                    placeholder="Mobile Number"
                                    onChange={handleChange('mobile')}
                                    value={values.mobile}
                                    required />
                                    <Link
                                className='btn btn-success line'
                                onClick={()=>{getOtp()}}
                                >Submit</Link>
                           
                    
								
							</div>
						</form>
					</div>
				
				</div>
			</div>
		</div>
	</div>




                    {/* <div className="col-12 col-md-6 col-lg-5">
                        <h2 className="mb-3">Login</h2>
                        <div className="form" >
                            <div id="recaptcha-container"></div>
                            <div className="small">
                                Just type any phone and login
                            </div>
                            <div>
                                <input
                                    type="text" name="mobile"
                                    placeholder="Mobile Number"
                                    onChange={handleChange('mobile')}
                                    value={values.mobile}
                                    required />
                            </div>
                            <label></label>
                            <Link
                                className='btn btn-success'
                                onClick={()=>{getOtp()}}
                                >Submit</Link>
                        </div>
                    </div> */}
                </div> 

            }
            


            {
                values.confirmationResult.length !== 0 &&
                <div className="row">



<div class="container-fluid m-4 d-flex justify-content-center">
		<div class="row main-content bg-success text-center">
			<div class="col-md-4 text-center company__info">
				
			</div>
			<div class="col-md-8 col-xs-12 col-sm-12 login_form ">
				<div class="container-fluid">
					<div class="row">
						<h2>Log In</h2>
					</div>
                    <div id="recaptcha-container"></div>
					<div class="row">
						<form control="" class="form-group">
							<div class="row ">
                            <input className="form__input"
                                id="otp"
                                type="text"
                                name="otp"
                                placeholder="otp"
                                onChange={handleChange('otp')}
                                value={values.otp}
                                required />
                            
                            <div 
                            onClick={()=>{submitOTP()}}
                            className="btn btn-success mr-2" 
                            >
                                Submit
                        </div>
                        <div 
                            onClick={()=>{setValues({...values,confirmationResult:''})}}
                            className="btn btn-danger" 
                            >
                                Retry
                        </div>
                           
                    
								
							</div>
						</form>
					</div>
				
				</div>
			</div>
		</div>
	</div>











                {/* <div className="col-12 col-md-6 col-lg-5">
                    <h2 className="mb-3">Enter OTP</h2>
                    <div className="form" >
                        <div id="recaptcha-container"></div>
                        <div>
                            <input
                                id="otp"
                                type="text"
                                name="otp"
                                placeholder="otp"
                                onChange={handleChange('otp')}
                                value={values.otp}
                                required />
                        </div>
                        <div 
                            onClick={()=>{submitOTP()}}
                            className="btn btn-success" 
                            >
                                Submit
                        </div>
                        <div 
                            onClick={()=>{setValues({...values,confirmationResult:''})}}
                            className="btn btn-danger" 
                            >
                                Retry
                        </div>

                    </div>
                </div> */}
            </div>

            }
            <br /><br />
            <div className="alert alert-warning">
                Fake Auth button -- for testing only &nbsp;
                <br /> Use when phone auth not work &nbsp;
            {
                
                !isAuthenticated().phoneNumber &&
                <div
                    onClick={()=>{
                        authenticate({
                            phoneNumber : "+91989898989"
                        },()=>{
                            setValues({
                                ...values,
                                redirectToReffer:true,
                            })
                        })
                    }}
                    className="btn btn-danger">
                    Login
                </div>
            }
            </div>

            {redirectUser()}

        </>
    )
}






