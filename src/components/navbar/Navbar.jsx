import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
  const { dispatch } = useContext(DarkModeContext);
  const { currentUser, userdispatch } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async() =>{
      let list = [];
      console.log("currentUser.uid" + currentUser.uid);
      const docRef = doc(db, "profiles", currentUser.uid);
      console.log(docRef);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        //const docRef_profile = doc(db, "users", currentUser.uid);
        //const docSnap_profile = await getDoc(docRef_profile);
        //console.log("Document data:", docSnap.data());
        //list.push({ id: docSnap.id, ...docSnap.data()});
        console.log("Document data:", docSnap.data());
        //console.log("Document data:", docSnap.data()['image']);
        setData(docSnap.data().image);
        setName(docSnap.data().name)
        //setData
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      
    }
    fetchData()
  },[])

  return (
    <div class="navbar navbar-expand-lg navbar-absolute navbar-transparent">
        <div class="container-fluid">
          <div class="navbar-wrapper">
            <div class="navbar-minimize d-inline">
              <button class="minimize-sidebar btn btn-link btn-just-icon" rel="tooltip" data-original-title="Sidebar toggle" data-placement="right">
                <i class="tim-icons icon-align-center visible-on-sidebar-regular"></i>
                <i class="tim-icons icon-bullet-list-67 visible-on-sidebar-mini"></i>
              </button>
            </div>
            <div class="navbar-toggle d-inline">
              <button type="button" class="navbar-toggler">
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <span className="navbar-brand">Welcome back {name} !!</span>
           
          </div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-bar navbar-kebab"></span>
            <span class="navbar-toggler-bar navbar-kebab"></span>
            <span class="navbar-toggler-bar navbar-kebab"></span>
          </button>
          <div class="collapse navbar-collapse" id="navigation">
            <ul class="navbar-nav ml-auto">
             
              <li class="dropdown nav-item">
                
                  <div class="photo">
                            <img
                        src={data}
                        alt=""
                        className="avatar"
                      />
                  </div>
                  <b class="caret d-none d-lg-block d-xl-block"></b>
                  <p class="d-lg-none">
                    Log out
                  </p>
                
                <ul class="dropdown-menu dropdown-navbar">
                  <li class="nav-link">
                    Profile
                  </li>
                  <li class="nav-link">
                   Settings
                  </li>
                  <li class="dropdown-divider"></li>
                  <li class="nav-link">
                   Log out
                  </li>
                </ul>
              </li>
              <li class="separator d-lg-none"></li>
            </ul>
          </div>
        </div>
      </div>
  );
};

export default Navbar;
