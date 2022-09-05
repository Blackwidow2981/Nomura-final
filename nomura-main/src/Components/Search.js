import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import db from "../Firebase";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { ReactSession } from 'react-client-session';
import { MultiSelect } from "react-multi-select-component";

function Search(){
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

    const options = [
        { label: "BabySitting ", value: "BabySitting" },
        { label: "Cooking", value: "Cooking" },
        { label: "HouseHelp", value: "HouseHelp"},
        { label: "PatientCare", value: "PatientCare"},
      ];
    const [TypeSelected, setTypeSelected] = useState([]);
    const [ECity, setCity] = useState([]);
    const [EGender, setGender] = useState([]);

    // const sendRequest = () => {
    //     var ref = collection(db, "Requests");
    //     addDoc(ref, {
    //         Accepted : false,
    //         UserNumber : ReactSession.get("usernumber"),
    //         MaidNumber : 
    //     }).then(console.log("sent request"));
    // };

    return(
        <div className='db'>
            <Sidebar/>
            <div className='db-box'>
                <div className='Filters'>
                    <input type="text" name="filterGender" placeholder="Gender" onChange={e => setGender(e.target.value)} required />
                    <input type="text" name="filterCity" placeholder="City" onChange={e => setCity(e.target.value)} required />
                    <MultiSelect options={options} value={TypeSelected} onChange={setTypeSelected} labelledBy="Type" />
                    
                </div>
                {Maids.map((val)=> {
                    if((!EGender || EGender.length==0 || EGender==val.Gender) && (!ECity || ECity.length==0  || ECity==val.City) ) {
                        var typematch=false;
                        TypeSelected.map((eachtype)=>{
                            if((eachtype.value=="BabySitting") && (val.Type.BabySitting==true)){
                                typematch=true;
                            }
                            if((eachtype.value=="Cooking") && (val.Type.Cooking==true)){
                                typematch=true;
                            }
                            if((eachtype.value=="HouseHelp") && (val.Type.HouseHelp==true)){
                                typematch=true;
                            }
                            if((eachtype.value=="PatientCare") && (val.Type.PatientCare==true)){
                                typematch=true;
                            }
                        })
                        var isRequested = false;
                        Requests.map((req)=>{
                            if(req.UserNumber==ReactSession.get("usernumber") && req.MaidNumber==val.MobileNumber){
                                isRequested=true;
                            }
                        })
                        if(!TypeSelected || TypeSelected.length==0 || typematch){
                            return(
                                <div className='bai-profile'>
                                    <div className='photo'>
                                    </div>
                                    <div className='description'>
                                        <div className='col1'>
                                            <div className='boldheading'>
                                                Name
                                            </div>
                                            <div className='descunderbold'>
                                                {val.Name}
                                            </div>
                                            <div className='boldheading'>
                                                Gender
                                            </div>
                                            <div className='descunderbold'>
                                                {val.Gender}
                                            </div>
                                            <div className='boldheading'>
                                                Hours of Work
                                            </div>
                                            <div className='descunderbold'>
                                                {val.Hours}
                                            </div>
                                        </div>
                                        <div className='col2'>
                                            <div className='boldheading'>
                                                City
                                            </div>
                                            <div className='descunderbold'>
                                                {val.City}
                                            </div>
                                            <div className='boldheading'>
                                                Type of Work
                                            </div>
                                            <div className='descunderbold'>
                                                {val.Type.BabySitting==true ? <div>Baby Sitting</div>: null}
                                                {val.Type.Cooking==true ? <div>Cooking</div>: null}
                                                {val.Type.HouseHelp==true ? <div>House Help</div>: null}
                                                {val.Type.PatientCare==true ? <div>Patient Care</div>: null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='ratesnhire'>
                                        <div className='Rating'>
                                            <h3>Rating : {val.Rating} </h3>
                                        </div>
                                        {isRequested? (<div className='AlreadyRequested'>Requested</div>)
                                        : (<button className='Hire' onClick={() => {
                                            var ref = collection(db, "Requests");
                                            addDoc(ref, {
                                                Accepted : false,
                                                UserNumber : ReactSession.get("usernumber"),
                                                MaidNumber : val.MobileNumber
                                            }).then(console.log("sent request")).catch(e=> console.log(e));
                                            window.location.reload();
                                        }} >
                                            Hire Me
                                        </button>)}
                                    </div>
                                </div>
                            )
                        }
                    }
                })}                
            </div>
        </div>
    )
}
export default Search