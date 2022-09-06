import React from 'react'
import { BrowserRouter as Router,useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Map from '../components/MapContainer'
import Form from '../components/AddressForm'

function AddressPage() {
  let navigate = useNavigate();

  function redirect () {
    navigate("/searchpage")
  }

  return (
      <div className="App">
        <Form />
        <Map />
        <div className='address-form'>
          <button onClick={redirect} className='complete-btn' id='complete-btn'>Complete</button>
        </div>
        <Footer />
      </div>
  );
}

export default AddressPage;
