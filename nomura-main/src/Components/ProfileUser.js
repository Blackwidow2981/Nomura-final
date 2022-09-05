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
} from "firebase/firestore";
import { ReactSession } from 'react-client-session';

function ProfileUser(){
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
        const data = await query(getDocs(ref));
        data.forEach((doc) => {
            info.push(doc.data());
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
    var FamilyMembers = 0;
    var Gender = "";
    var MobileNumber = ReactSession.get("usernumber");

    Users.map((val) => {
        if(val.MobileNumber==ReactSession.get("usernumber")){
            AdharNumber = val.AdharNumber;
            Name = val.Name;
            City = val.City;
            FamilyMembers = val.FamilyMembers;
            Gender = val.Gender;
            MobileNumber = val.MobileNumber;
        }
    });

    return(
        <div className='profile'>
            <Sidebar/>
            <div className='profile-box'>
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
                <h3>Family Members</h3>
                    {FamilyMembers}
                </div>
                <div className='City'>
                <h3>City</h3>
                    {City}
                </div>
                <div className='Requests'>
                    <h3>Requests</h3>
                    {Requests.map((val)=> {
                        if(val.UserNumber==ReactSession.get("usernumber")){
                            return(
                                <div className='Request'>
                                    <div className='MaidName'> 
                                        {Maids.map((maidval)=>{
                                            if(maidval.MobileNumber==val.MaidNumber){
                                                return(<div>{maidval.Name}</div>)
                                            }
                                        })}
                                    </div>
                                    <div className='MaidGender'> 
                                        {Maids.map((maidval)=>{
                                            if(maidval.MobileNumber==val.MaidNumber){
                                                return(<div>{maidval.Gender}</div>)
                                            }
                                        })}
                                    </div>
                                    <div className='Number'>
                                        {val.Accepted? val.MaidNumber: null}
                                    </div>
                                    <div className='Status'>
                                        {val.Accepted ? <div>Accepted</div> : <div>Pending</div>}  
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
                            if(val.UserNumber==ReactSession.get("usernumber")){
                                return(
                                    <div className='YourHirings'>
                                        <div className='MaidName'>{Maids.map((maidval)=>{
                                            if(maidval.MobileNumber==val.MaidNumber){
                                                return(<div>{maidval.Name}</div>)
                                            }
                                        })} 
                                        </div>
                                        <div className='MaidNumber'>
                                            {val.MaidNumber}
                                        </div>
                                        <div className='StartDate'>From - {val.StartDate.toDate().toDateString()}</div>
                                        <div className='EndDate'>{val.EndDate ? <div>Till - {val.EndDate.toDate().toDateString()} </div> 
                                            : <div>Ongoing</div>}
                                        </div>
                                        <div className='RatingOrEnd'>
                                            {val.Rating? (<div>Rating - {val.Rating}</div>) 
                                                            : <button className='EndContract'>
                                                                End Contract
                                                            </button>}
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
export default ProfileUser