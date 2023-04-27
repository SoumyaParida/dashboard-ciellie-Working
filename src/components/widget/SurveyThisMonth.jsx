import "./surveyThisMonth.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import DoneIcon from '@mui/icons-material/Done';
import Pricing from "../../pages/pricing/Pricing";
//import Survey from 
import { Link } from "react-router-dom";
import moment from 'moment';

import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

const SurveyThisMonth = () => {
  const [projects, setProjects] = useState([]);
  const { currentUser, dispatch } = useContext(AuthContext);
  let data;

  const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
  const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD');
    
  console.log("startOfMonth", startOfMonth);
  console.log("endOfMonth", endOfMonth); 

  useEffect(() => {
    // access the db collection
    var count = 0;
    const fetchData = async() =>{
      let list = [];
      console.log("currentUser.uid" + currentUser.uid);
      const q = query(collection(db, "surveys", currentUser.uid, "survey"), where("status", "==", "scheduled"));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        if ((doc.data().date > startOfMonth) && (doc.data().date < endOfMonth)){
            count = count + 1;
            list.push({ id: doc.id, ...doc.data()});
        }
        
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
  const _title = projects;
  //const _description = "/200 GB";
  const diff = 20 ;
  data = {
    title: "Surveys This Month",
    isMoney: false,
    link: "Create a new Survey",
    icon: (
      <PersonOutlinedIcon
        className="icon"
        style={{
          backgroundColor: "rgba(0, 0, 200, 0.2)",
          color: "blue",
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
       
        <Link to="/surveys/newsurvey" className="linktitle">{data.link}</Link>
      </div>
      <div className="right">
      <div className="percentage positive">
            <span className="title"></span>
        </div>
       
        {data.icon}
      </div>
    </div>
  );
};

export default SurveyThisMonth;
