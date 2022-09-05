import React from 'react';
import '../App.css';
import ProfileLogo from '../Assets/ProfileLogo.png'
import SerachLogo from '../Assets/SearchLogo.png';

const Sidebardata = [
    {
        title: "Profile",
        icon: <img src={ProfileLogo} alt="Logo"  className='sidebar-logo'/>,
        link: "/"
    },
    {
        title: "Search",
        icon: <img src={SerachLogo} alt="Logo"  className='sidebar-logo'/>,
        link: "/Search"
    },
]

function Sidebar() {
  return (
    <div className='Sidebar'>
        <ul className='sidebar-list'>
        {Sidebardata.map((val, key)=> {
            return (
                <li key={key} 
                    className='row'
                    id={window.location.pathname === val.link ? "active" : ""}
                    onClick={()=>{window.location.pathname=val.link}}
                    >
                    <div>{val.icon}</div>
                </li>
            )
        })}
        </ul>
    </div>
  )
}

export default Sidebar