import { useContext } from "react";
import { useNavigate,Link } from 'react-router-dom';
import AuthContext from "../Authentication/AuthProvider";
import alerting from "../components/Alerting";
import '../css/index.css';
import '../css/Navbar.css';

const CustomerNavbar = () => {
  const { setAuth } = useContext(AuthContext);

  let navigate = useNavigate();

  function handleClick() {
    navigate('/');
  }
  const logout = async () => {
    setAuth({});
    await fetch("/api/customers/logout-customer/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then(res => {
      alerting(res?.msg);
    })

    // note: the address in searchpage would not rerender without this jumping. 
    navigate('/');
  }

  return (
    <nav className="navbar">
      <h1 onClick={handleClick}>Amorr</h1>
      <div className="links">
        <Link to="/searchpage">Search</Link>
        <Link to="/contactus">Contact Us</Link>
        <Link to="/customerorderhistory" style={{marginRight:"10pt"}}>Order History</Link>
        <button onClick={logout} className={'btn-toprightbutton'} style={{cursor:"pointer"}}>
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default CustomerNavbar;
