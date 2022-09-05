import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import Header from './Components/Header';
import CompleteProfileMaid from './Components/CompleteProfileMaid';
import CompleteProfileUser from './Components/CompleteProfileUser';
import ProfileUser from './Components/ProfileUser';
import ProfileMaid from './Components/ProfileMaid';
import Search from './Components/Search';
import Login from './Components/Login';
import LoginConfirm from './Components/LoginConfirm';
import db from './Firebase';
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";


function App() {
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

  ReactSession.setStoreType("localStorage");
  // ReactSession.remove("usernumber");
  console.log(ReactSession.get("usernumber"));
  var isprofilecomplete = false;

  console.log(ReactSession.get("usertype"));
  if(ReactSession.get("usertype")){
    if(ReactSession.get("usertype")=="Employer"){
      Users.map((val)=>{
        if(val.MobileNumber==ReactSession.get("usernumber")){
          isprofilecomplete=true;
          
        }
      })
    }
    else if(ReactSession.get("usertype")=="Maid"){
      Maids.map((val)=>{
        if(val.MobileNumber==ReactSession.get("usernumber")){
          isprofilecomplete=true;
        }
      })
    }
  }

  return (
    <div className="App">
      <Header/>
      <div className='main-container'>
          <Router>
            <Routes>
              <Route path="/" element={ReactSession.get("usernumber")? 
                                        (ReactSession.get("isloggedin")?
                                          (isprofilecomplete? 
                                            (ReactSession.get("usertype")=="Employer"? <ProfileUser/> 
                                              : (ReactSession.get("usertype")=="Maid") ? <ProfileMaid/> : null) 
                                          :(<CompleteProfileUser/>))
                                        : (<LoginConfirm/>))
                                      : (<Login/>)}></Route>
              <Route path="/Search" element={ReactSession.get("usernumber")? 
                                                (ReactSession.get("isloggedin")?
                                                (isprofilecomplete? 
                                                  (ReactSession.get("usertype")=="Employer"? <Search/> : null) 
                                                :(<CompleteProfileUser/>))
                                              : (<LoginConfirm/>))
                                            : (<Login/>)}></Route>
            </Routes>
          </Router>   
      </div>
    </div>
  );
}

export default App;
