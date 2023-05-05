import "./sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logout } from "../../context/ApiCalls";

const Sidebar = () => {
  const { authdispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlelogout = async (e) => {
    e.preventDefault();
    navigate("/login");
    logout(authdispatch);
  }

  return (
    <div className="sidebar-mini">
      <div className="navbar-minimize-fixed">
      <button className="minimize-sidebar btn btn-link btn-just-icon">
        <i className="tim-icons icon-align-center visible-on-sidebar-regular text-muted" ></i>
        <i className="tim-icons icon-bullet-list-67 visible-on-sidebar-mini text-muted"></i>
      </button>
    </div>
    <div className="sidebar">

      <div className="sidebar-wrapper" data-color="blue">
        <div className="logo" >
          <Link to="/" className="simple-text logo-mini" data-color="blue" style={{ textDecoration: "none" }}>
            C
          </Link>
          <Link to="/" className="simple-text logo-normal">
            Ciellie Portal
          </Link>
        </div>
        <ul className="nav">
        <li>
          <Link to="/surveys" style={{ textDecoration: "none" }}>
          
            <i className="tim-icons icon-settings"></i>
            <p>Projects</p>
          
          </Link>
          </li>
          <li>
            <Link to="/profile" style={{ textDecoration: "none" }}>
            
            <i className="tim-icons icon-single-02"></i>
            <p>Profile</p>
        
            </Link>
          </li>

          <li>
            
          <Link style={{ textDecoration: "none" }}>
            <i className="tim-icons icon-button-power"></i>
            <p onClick={handlelogout}>Logout</p>
            </Link>
            
          </li>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Sidebar;
