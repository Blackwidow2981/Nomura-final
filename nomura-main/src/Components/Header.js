import React from 'react';
import { ReactSession } from 'react-client-session';

function Header() {
  const Logout = () => {
    ReactSession.remove("usernumber");
    ReactSession.remove("isloggedin");
    console.log("session destoyed");
    window.location.reload();
  };
  return (
    <div className='Header'>
        <div className='page-title'>BookMyBai</div>
        {ReactSession.get("isloggedin")? (<button type="button" className='AnswerCall' onClick={Logout} >
          <b>Logout</b>
        </button>) : null}
    </div>
  )
}

export default Header