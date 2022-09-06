import React from 'react';
import "../css/index.css";
import { useState } from 'react';

const Button = () => {

  const [address, setAddress] = useState("")
  
  const onClick = async (e) => {
    e.preventDefault()
    const msg1 = document.querySelector('#m1')
    const addr = {address};
    if (address == ''){
      msg1.innerHTML ='Please enter field'
      msg1.className='error-message'
      setTimeout (()=>msg1.className='feedback-message', 1000)
    }else{
      await fetch("/api/customers/updateDefaultAddress/", {
        method: "PATCH",
        body: JSON.stringify(addr),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (!res) {
          setAddress("")
          msg1.innerHTML ='Please log in'
          msg1.className='error-message'
          setTimeout (()=>msg1.className='feedback-message', 1000)
        }
        else{
          setAddress("")
          msg1.innerHTML = 'address added successfully!'
          msg1.className='success-message'
          setTimeout (()=>msg1.className='feedback-message', 1000)
        }
      })
    }
  }

  return (
    <div className='address-form' >
      <h1 style={{color:'#333'}}> Add a New Address </h1>
      <div className='form-container'>
        <div className='feedback-message' id='m1'>reserved line</div>
        <input 
          className="address-text" 
          id='address'
          type="text"
          placeholder='Enter Address Here'
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          value={address}
        />
        <button onClick={onClick} className='btn' id='address-btn'>Enter</button>
      </div>
    </div>
    
  )
}
Button.defaultProps = {
  color: '#e27b7b'
}
export default Button