import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import db from "../Firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { ReactSession } from 'react-client-session';

function ProfileMaid(){
    const [Users, setUsers] = useState([]);
    useEffect(() => {
        async function fetchInfo() {
        const ref = collection(db, "UserDetails");
        const info = [];
        const data = await query(getDocs(ref));
        data.forEach((doc) => {
            info.push(doc.data());
        });
        setUsers(info);
        }
        fetchInfo();
    }, []);

    const [Hirings, setHirings] = useState([]);
    useEffect(() => {
        async function fetchInfo() {
        const ref = collection(db, "Hirings");
        const info = [];
        const data = await query(getDocs(ref));
        data.forEach((doc) => {
            info.push(doc.data());
        });
        setHirings(info);
        }
        fetchInfo();
    }, []);

    const [Requests, setRequests] = useState([]);
    useEffect(() => {
        async function fetchInfo() {
        const ref = collection(db, "Requests");
        const info = [];
        const docdata = await query(getDocs(ref));
        docdata.forEach((doc) => {
            console.log(doc);
            info.push({id: doc.id , data : doc.data()});
        });
        setRequests(info);
        }
        fetchInfo();
    }, []);

    const [Maids, setMaids] = useState([]);
    useEffect(() => {
        async function fetchInfo() {
        const ref = collection(db, "MaidDetails");
        const info = [];
        const data = await query(getDocs(ref));
        data.forEach((doc) => {
            info.push(doc.data());
        });
        setMaids(info);
        }
        fetchInfo();
    }, []);

    var AdharNumber = 0;
    var Name = "Unknown";
    var City = "Unknown";
    var Hours = 0;
    var Gender = "";
    var MobileNumber = ReactSession.get("usernumber");
    var Rating = 0;
    var BabySitting = false;
    var Cooking = false;
    var HouseHelp = false;
    var PatientCare = false;

    Maids.map((val) => {
        if(val.MobileNumber==ReactSession.get("usernumber")){
            AdharNumber = val.AdharNumber;
            Name = val.Name;
            City = val.City;
            Hours = val.Hours;
            Gender = val.Gender;
            MobileNumber = val.MobileNumber;
            Rating = val.Rating;
            BabySitting = val.Type.BabySitting;
            Cooking = val.Type.Cooking;
            HouseHelp = val.Type.HouseHelp;
            PatientCare = val.Type.PatientCare;
        }
    });

    return(
        <div className='profile-maid'>
            <div className='profile-box-maid'>
                <h1>Hi {Name},</h1>
                <div className='Name'>
                    <h3>Name</h3>
                    {Name}
                </div>
                <div className='Phone'>
                <h3>Phone</h3>
                    {MobileNumber}
                </div>
                <div className='Address'>
                <h3>Adhar Number</h3>
                    {AdharNumber}
                </div>
                <div className='Fam'>
                <h3>Hours</h3>
                    {Hours}
                </div>
                <div className='City'>
                <h3>City</h3>
                    {City}
                </div>
                <div className='Rating'>
                <h3>Rating</h3>
                    {Rating}
                </div>
                <div className='Type'>
                <h3>Type</h3>
                    {BabySitting ? <div>Baby Sitting</div>: null}
                    {Cooking ? <div>Cooking</div>: null}
                    {HouseHelp ? <div>House Help</div>: null}
                    {PatientCare ? <div>Patient Care</div>: null}
                </div>
                <div className='Requests'>
                    <h3>Requests</h3>
                    {Requests.map((val)=> {
                        console.log(val.data.MaidNumber);
                        if(val.data.MaidNumber==ReactSession.get("usernumber")){
                            return(
                                <div className='Request'>
                                    <div className='UserName'> 
                                        {Users.map((userval)=>{
                                            if(userval.MobileNumber==val.data.UserNumber){
                                                return(<div>{userval.Name}</div>)
                                            }
                                        })}
                                    </div>
                                    <div className='MaidGender'> 
                                        {Users.map((userval)=>{
                                            if(userval.MobileNumber==val.data.UserNumber){
                                                return(<div>{userval.Gender}</div>)
                                            }
                                        })}
                                    </div>
                                    <div>
                                        {val.data.Accepted ? <div className='Status'>Accepted</div> 
                                        : <button className='Status' onClick={()=>{
                                            console.log(val.id)
                                            const thisreq = doc(db, "Requests", val.id);
                                            updateDoc(thisreq, {
                                                Accepted: true,
                                               }).then(console.log("done"));
                                            }
                                        }>Accept</button>}  
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <div className='PastHirings'>
                    <h3 style={{margin:0}}>Past Hirings</h3>
                    <div >
                        {Hirings.map((val)=> {
                            if(val.MaidNumber==ReactSession.get("usernumber")){
                                return(
                                    <div className='YourHirings'>
                                        <div className='UserName'>{Users.map((userval)=>{
                                            if(userval.MobileNumber==val.UserNumber){
                                                return(<div>{userval.Name}</div>)
                                            }
                                        })} 
                                        </div>
                                        <div className='UserNumber'>
                                            {val.UserNumber}
                                        </div>
                                        <div className='StartDate'>From - {val.StartDate.toDate().toDateString()}</div>
                                        <div className='EndDate'>{val.EndDate ? <div>Till - {val.EndDate.toDate().toDateString()} </div> 
                                            : <div>Ongoing</div>}
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
        )
}
export default ProfileMaid