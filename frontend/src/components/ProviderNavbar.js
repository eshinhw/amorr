import { useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from "../Authentication/AuthProvider";
import alerting from "../components/Alerting";
import '../css/index.css';
import '../css/Navbar.css';

const ProviderNavbar = () => {
  const { setAuth } = useContext(AuthContext);

  let navigate = useNavigate();

  function handleClick() {
    navigate('/');
  }

  const logout = async () => {
    alerting("logged out successfully");
    setAuth({});
  }

  return (
    <nav className="navbar">
      <h1 onClick={handleClick}>Amorr</h1>
      <div className="links">
        <Link to="/providerorderhistory">Order History</Link>
        <Link to="/providerservice">Your Services</Link>
        <Link to="/providerschedule">Schedules</Link>
        <Link to="/profileprovider" style={{marginRight:"10pt"}}>My Profile</Link>
        <button onClick={logout} className={'btn-toprightbutton'} style={{cursor:"pointer"}}>
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default ProviderNavbar;
