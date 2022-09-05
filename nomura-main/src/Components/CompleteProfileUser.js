import React, { useState } from 'react'
import Select from 'react-select'
import { MultiSelect } from "react-multi-select-component";
import { ReactSession } from 'react-client-session';
import db from '../Firebase';
import {
  doc,
  collection,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";

function CompleteProfileUser() {
  const [EName, setName] = useState([]);
  const [EAdharNumber, setAdharNumber] = useState([]);
  const [ECity, setCity] = useState([]);
  const [EFamilyMembers, setFamilyMembers] = useState([]);
  const [EGender, setGender] = useState([]);
  const EMobileNumber = ReactSession.get("usernumber");
  const SubmitCompleteProfile = () => {
    console.log(EName);
    console.log(EAdharNumber);
    console.log(ECity);
    console.log(EFamilyMembers);
    console.log(EMobileNumber);
    console.log(EGender);
    if(EAdharNumber && ECity && EFamilyMembers && EGender && EMobileNumber && EName) {
      var ref = collection(db, "UserDetails")
      addDoc(ref, {
        Name: EName,
        AdharNumber : EAdharNumber,
        AdharCard : "",
        City : ECity,
        FamilyMembers : EFamilyMembers,
        Gender : EGender,
        MobileNumber : EMobileNumber,
        Photo : ""
      }).then(console.log("ProfileCompleted"));
    }
  };

  return (
    <div className='Dashboard' >
      <h2>Complete your profile as {ReactSession.get("usertype")}</h2>
      <form className="ui-form" >
       <div className="field1">
        <label>Name</label>
        <input type="text" name="enteredName" placeholder="Name" onChange={e => setName(e.target.value)} required>
        </input>
       </div>
       <div className="field2">
        <label>Gender</label>
        <input type="text" name="enteredGender" placeholder="Gender" onChange={e => setGender(e.target.value)} required>
        </input>
       </div>
       <div className="field3">
        <label>City</label>
        <input type="text" name="enteredCity" placeholder="City" onChange={e => setCity(e.target.value)} required>
        </input>
       </div>
       <div className="field4">
        <label>Upload a Photo</label>
        <input type="file" name="enteredpicture" placeholder="Photo">
        </input>
       </div>
       <div className="field5">
        <label>Upload Aadhar</label>
        <input type="file" name="enteredaadhar" placeholder="Adhar">
        </input>
       </div>
       <div className="field6">
        <label>Adhar Number</label>
        <input type="text" name="enteredaadharNumber" placeholder="Aadhar Number" onChange={e => setAdharNumber(e.target.value)} required>
        </input>
       </div>
       <div className="field7">
        <label>Family Members Count</label>
        <input type="text" name="enteredFamilyMembers" placeholder="Family Members" onChange={e => setFamilyMembers(e.target.value)} required>
        </input>
       </div>
       <button className="but1" onClick={SubmitCompleteProfile}>
        Submit
       </button>
      </form>
    </div>
  )
}

export default CompleteProfileUser