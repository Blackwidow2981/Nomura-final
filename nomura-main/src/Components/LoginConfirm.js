
import React, { useState } from "react";
import Select from "react-select";
import { ReactSession } from 'react-client-session';

function LoginConfirm(){
    const LoginConfirmSubmit = () => {
        ReactSession.set("isloggedin", true);
        window.location.reload();
      };
    return (
        <div className='Login'>
            <h2>Login to Dashboard</h2>
            <p style={{color: 'black'}}>Enter OTP sent to {ReactSession.get("usernumber")}</p>
            <div className='otp'>
                <h3>OTP/ओटीपी</h3>
               <input type="text" name="otp" placeholder="OTP"/>
            </div>
            <button className='login-submit' onClick={LoginConfirmSubmit}>
                Submit
            </button>
        </div>
    )
}
export default LoginConfirm