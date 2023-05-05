import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { logout } from "../../context/ApiCalls";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
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
