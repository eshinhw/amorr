import { useState } from 'react';
import { Link } from "react-router-dom";
import '../css/SignUp.css'
import alerting from "../components/Alerting";

const SignUp = () => {
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [data, setData] = useState({
  //     firstName: "",
  //     lastName:"",
  //     email:"",
  //     password:""
  // })

  // const handleChange = ({currentTarget: input}) => {
  //     setData({...data, [input.name]: input.value});
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customer = { firstName, lastName, email, password };

    await fetch("/api/customers/register-customer/", {
      method: "POST",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (!res.ok) {
        setError(null);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        alerting(`SIGNUP FAILED.`, "danger");
      } else {
        setError(null);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        alerting(`WELCOME ${firstName} ${lastName} !!! SIGNUP SUCCESS with ${email}`);
      }
    })
  }

  return (
      <div className={"signup_container"} >
          <div className={"signup_form_container"}>
              <div className={"leftsignup"}>
                  <h1>Welcome Back</h1>
                  <a href = "/login">
                      <button type='button' className={"white_btnsignup"}>
                          Sign In
                      </button>
                  </a>
              </div>
              <div className={"rightsignup"}>
                  <form className={"form_containersignup"} id="signup-form">
                      <h1 className={"form_containersignup h1"}>Create Account</h1>
                      <input 
                          type="text"
                          placeholder="First Name"
                          name="firstName"
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                          value={firstName}
                          className={"form_containersignup input"}
                      />
                      <input 
                          type="text"
                          placeholder="Last Name"
                          name="lastName"
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}
                          value={lastName}
                          className={"form_containersignup input"}
                      />
                      <input 
                          type="email"
                          placeholder="Email"
                          name="email"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          value={email}
                          className={"form_containersignup input"}
                      />
                      <input 
                          type="password"
                          placeholder="Password"
                          name="password"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          value={password}
                          className={"form_containersignup input"}
                      />
                      <Link to="/findjob" className='toFindjob'>want to sign up as provider?</Link>
                      <button type="submit" className={"green_btnsignup"} onClick={handleSubmit}>
                          Sign Up
                      </button>
                  </form>
              </div>
          </div>
      </div>
  );
}
 
export default SignUp;