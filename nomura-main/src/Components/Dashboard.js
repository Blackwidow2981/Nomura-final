import React from 'react'
import Select from 'react-select'
import Example from './Example'


function Dashboard() {
  return (
    <div className='Dashboard' >
      <h2>Questionnare</h2>
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
       <div className="field6">
        <label>Upload Pan</label>
        <input type="file" name="pan" placeholder="Address">
        </input>
       </div>
       <div className="field7">
       <label>Type of Work</label>
        <Example/>
       </div>
       <button className="but1">
        Submit
       </button>
  </form>
    </div>
  )
}

export default Dashboard