import { Link } from "react-router-dom";
import "../css/index.css";
import "../css/Footer.css";

const Footer = () => {
  return (
    // <nav className="footer">
    //   <Link to="/">About Us</Link>
    //   <Link to="/">Contact Us</Link>
    // </nav>

    <div className="footer-container">
      <footer>
        <div className="footer-content">
          <div className="footer-content-container">
            <div className="footer-content-column">
              <span className="footer-content-title">Discover</span>
              <div className="footer-links">
                <Link to="/findjob">Become a Service Provider</Link>
                
                <br />
                <Link to="/searchpage">All Services</Link>
                <br />
                <Link to="/contactus">Help (contact us!)</Link>
              </div>
            </div>
            <div className="footer-content-column">
              <span className="footer-content-title">Company</span>
              <div className="footer-links">
                <a>About Us</a>
                <br />
                <a>Careers</a>
                <br />
                <a>Press</a>
                <br />
                <a>Blog</a>
                <br />
                <a>Terms & Privacy</a>
              </div>
            </div>
            <div className="footer-content-column">
              <span className="footer-content-title">Follow Us</span>
              <div className="footer-links">
                <a>Instagram</a>                
                <br />
                <a>Facebook</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
