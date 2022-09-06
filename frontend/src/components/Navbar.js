import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../css/index.css';
import '../css/Navbar.css';

const Navbar = () => {
  let navigate = useNavigate();

  function handleClick() {
    navigate('/');
  }

  return (
    <nav className="navbar">
      <h1 onClick={handleClick}>Amorr</h1>
      <div className="links">
        <Link to="/searchpage">Search</Link>
        <Link to="/contactus">Contact Us</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
        <Link to="/findjob" className={'toprightbotton'}>  
          Become a Provider
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
