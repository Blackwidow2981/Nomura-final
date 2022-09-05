import React, { useState } from 'react'
import Select from 'react-select'
import { MultiSelect } from "react-multi-select-component";
import { ReactSession } from 'react-client-session';

function CompleteProfileMaid() {
  const options = [
    { label: "BabySitting ", value: "BabySitting" },
    { label: "Cooking", value: "Cooking" },
    { label: "HouseHelp", value: "HouseHelp"},
    { label: "PatientCare", value: "PatientCare"},
  ];
  const [TypeSelected, setTypeSelected] = useState([]);

  const SubmitCompleteProfile = () => {
    console.log("ProfileCompleted");
  };

  return (
    <div className='Dashboard' >
      <h2>Complete your profile as {ReactSession.get("usertype")}</h2>
      <form className="ui-form" >
       <div className="field1">
        <label>Name</label>
        <input type="text" name="name" placeholder="Name">
        </input>
       </div>
       <div className="field2">
        <label>Phone</label>
        <input type="number" name="phone" placeholder="Phone">
        </input>
       </div>
       <div className="field3">
        <label>Address</label>
        <input type="text" name="address" placeholder="Address">
        </input>
       </div>
       <div className="field4">
        <label>Upload a Photo</label>
        <input type="file" name="picture" placeholder="Address">
        </input>
       </div>
       <div className="field5">
        <label>Upload Aadhar</label>
        <input type="file" name="aadhar" placeholder="Address">
        </input>
       </div>
       {/* <div className="field6">
        <label>Upload Pan</label>
        <input type="file" name="pan" placeholder="Address">
        </input>
       </div> */}
       <div className="field7">
        <label>Type of Work</label>
        <MultiSelect
          options={options}
          value={TypeSelected}
          onChange={setTypeSelected}
          labelledBy="Select"
        />
       </div>
       <button className="but1" onClick={SubmitCompleteProfile}>
        Submit
       </button>
      </form>
    </div>
  )
}

export default CompleteProfileMaid