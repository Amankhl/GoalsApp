import { useCallback } from "react";
import {FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// import Logout from "../pages/Logout";

const Header = () => {

  const navigate = useNavigate()
  
  const handleClick = useCallback(() => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">GoalSetter</Link>
      </div>
      <ul style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
        {
          localStorage.getItem('token') ? 
            (<li style={{ cursor: "pointer"}} onClick={() => handleClick()}>
              <FaSignOutAlt /> Logout
            </li>) : 
          (<li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>)
        }
        <li>
          <Link to="/register">
            <FaUser /> Register
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header