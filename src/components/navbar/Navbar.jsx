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
        //setData
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      
    }
    fetchData()
  },[])

  return (
    <div className="navbar1">
      <div className="wrapper">
        <div>
         
        </div>
        <div className="items">
          
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          
          <div className="item">
            <img
              src={data}
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
