import "./modelWidget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import Pricing from "../../pages/pricing/Pricing";
//import Survey from 
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

const ModelWidget = () => {
  const [projects, setProjects] = useState([]);
  const { currentUser, dispatch } = useContext(AuthContext);
  let data;

  useEffect(() => {
    // access the db collection
    var count = 0;
    const fetchData = async() =>{
      let list = [];
      console.log("currentUser.uid" + currentUser.uid);
      const q = query(collection(db, "surveys", currentUser.uid, "survey"), where("status", "==", "completed"));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        count = count + 1;
        list.push({ id: doc.id, ...doc.data()});
      });
      //const docSnap = doc(docRef,"survey", currentUser.uid);
      //collection("surveys").doc(profileId).collection("survey")
      //const querySnapshot = await getDocs(collection(db, "surveys"));
      //querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
      //  console.log(doc.id, " => ", doc.data());
      //});
      setProjects(count);
    }
    fetchData()
  },[])

  //temporary
  const _title = "Coming Soon";
  //const _description = "/200 GB";
  const diff = "/TBD" ;
  data = {
    title: "3D Model Generator",
    isMoney: false,
    link: "View our Timeline",
    icon: (
      <ViewInArIcon
        className="icon"
        style={{
          backgroundColor: "rgba(218, 165, 32, 0.2)",
          color: "goldenrod",
        }}
      />
    ),
  };
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
            {_title}
        </span>
       
        <Link to="/widget" className="linktitle">{data.link}</Link>
      </div>
      <div className="right">
      <div className="percentage positive">
            <span className="title">{diff}</span>
        </div>
       
        {data.icon}
      </div>
    </div>
  );
};

export default ModelWidget;
