import React, { useState } from "react";
import Select from "react-select";
import { ReactSession } from 'react-client-session';

const options = [
  { label: "Admin", value: "Admin" },
  { label: "Maid", value: "Maid" },
  { label: "Employer", value: "Employer"},
  { label: "Agency", value: "Agency"},
];

function Login(){
    const [selectedType, setSelectedType] = useState([]);
    const [UserNumber, setUserNumber] = useState([]);
    const LoginSubmit = () => {
        ReactSession.set("usernumber", UserNumber);
        ReactSession.set("usertype", selectedType.value);
        console.log("session started");
        window.location.reload();
      };
    return (
        <div className='Login'>
            <h2>Login</h2>
            <div className='Phone-Number'>
                <h3>Phone Number/ फ़ोन नंबर</h3>
               <input className="Phone-Number" type="number" name="phone" onChange={e => setUserNumber(e.target.value)} placeholder="Phone" required/>
            </div>
            <div className='choose-dashboard'>
                <h3>Dashboard/डैशबोर्ड</h3>
                <Select
                    options={options}
                    value={selectedType}
                    onChange={setSelectedType}
                    labelledBy="Select"
                    required
                />
            </div>
            <button className='login-submit' onClick={LoginSubmit}>
                Submit
            </button>
        </div>
    )
}
export default Login