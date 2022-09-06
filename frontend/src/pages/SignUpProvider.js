import { useState }  from "react";
import { useNavigate } from "react-router-dom";

// reactstrap components
import {
  Form,
  Card,
} from "reactstrap";

import '../css/providerRegister.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import alerting from "../components/Alerting";


const SignUpProvider = () => {
  // controll show password
  const [passShow, setPassShow] = useState(false);
  const [confirmPass, setConfirmPassShow] = useState(false);


  //use for sign up states
  const [data, setData] = useState({
    name: "",
    title:"Hairdress", 
    range: "10 KM",
    address: "",
    city: "",
    state: "",
    country: "",
    email:"",
    phone: "",
    password:"", 
    confirmPassword: "",
    imageFilename:"",
    individual:"Yes",
    totalRating: 0, 
    ratingPopulation: 0, 
    isAdmin: false
  })

  const handleChange = (input, fieldName) => {
      setData({...data, [fieldName]: input});
  };

  let navigate = useNavigate();
  // trigger when clicked sign up button
  function signUpForm(e){
    e.preventDefault();
    if(data.password !== data.confirmPassword){
      alerting("passwords are not matching!", "danger");
    } else{
      //jump page
      navigate("/signupprovidertwo", {state: data}); 

      //reset fields
      e.target.reset();
    }
  }

  return (
    <div className="divCenter">
      <Card  className="Card">
          <Form onSubmit={signUpForm.bind(this)} className={"Form"}>
            <h1 className={"header"}>Create Account</h1>
            <input 
              className="In"
              type="text" 
              placeholder="Enter Name" 
              onChange={(e) => handleChange(e.target.value, "name")} 
              required
            />                            
            <input 
              className="In"
              type="email" 
              placeholder="Enter Email" 
              onChange={(e) => handleChange(e.target.value, "email")} 
              required
            />         
            <input 
              className="In"
              type="text" 
              placeholder="Enter Phone Number"
              onChange={(e) => handleChange(e.target.value, "phone")}  
              required 
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            <div>
              <input 
                type="text" 
                placeholder="Address" 
                onChange={(e) => handleChange(e.target.value, "address")} 
                required
                className={"In half-input leftside"}
              />
              <input 
                type="text" 
                placeholder="City" 
                onChange={(e) => handleChange(e.target.value, "city")} 
                required
                className={"In half-input"}
              />
            </div>
            <div>
              <input 
                type="text" 
                placeholder="State/Province" 
                onChange={(e) => handleChange(e.target.value, "state")} 
                required
                className={"In half-input leftside"}
              />
              <input 
                type="text" 
                placeholder="Country" 
                onChange={(e) => handleChange(e.target.value, "country")} 
                required
                className={"In half-input"}
              />
            </div>
            <div className="input-pass-container" >
              <input 
                type={passShow ? "text" : "password"}
                placeholder="Enter password"
                onChange={(e) => handleChange(e.target.value, "password")} 
                required
                className={"In password"}
              />
              {passShow ?
                <FontAwesomeIcon 
                  className={"toggleEye"} 
                  icon={faEyeSlash} 
                  onClick={(e) => {
                    e.preventDefault();
                    setPassShow(false);
                  }}
                />
              : 
                <FontAwesomeIcon 
                  className={"toggleEye"} 
                  icon={faEye} 
                  onClick={(e) => {
                    e.preventDefault();
                    setPassShow(true);
                  }}
                />              
              }
            </div>
            <div className="input-pass-container" >
              <input 
                type={confirmPass ? "text" : "password"}
                placeholder="Enter again password" 
                onChange={(e) => handleChange(e.target.value, "confirmPassword")} 
                required
                className={"In password"}
              />
              {confirmPass ?
                <FontAwesomeIcon 
                  className={"toggleEye"} 
                  icon={faEyeSlash} 
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmPassShow(false);
                  }}
                />
              : 
                <FontAwesomeIcon 
                  className={"toggleEye"} 
                  icon={faEye} 
                  onClick={(e) => {
                    e.preventDefault();
                    setConfirmPassShow(true);
                  }}
                />              
              }
            </div>
            <button type="submit" className={"Button"}>
                Sign Up
            </button>
          </Form>
      </Card>
    </div>
  );
}
 
export default SignUpProvider;
