import "./projectWidget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import DoneIcon from '@mui/icons-material/Done';
import Pricing from "../../pages/pricing/Pricing";
//import Survey from 
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import { auth, db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";

import moment from 'moment';

const ProjectWidget = () => {
  const [projects, setProjects] = useState([]);
  const { currentUser, dispatch } = useContext(AuthContext);

  const [jan, setJan] = useState([]);
  const [feb, setFeb] = useState([]);
  const [mar, setMar] = useState([]);
  const [apr, setApr] = useState([]);
  const [may, setMay] = useState([]);
  const [jun, setJun] = useState([]);
  const [jul, setJul] = useState([]);
  const [aug, setAug] = useState([]);
  const [sep, setSep] = useState([]);
  const [oct, setOct] = useState([]);
  const [nov, setNov] = useState([]);
  const [dec, setDec] = useState([]);

  let data;

  useEffect(() => {
    // access the db collection
    var count = 0;

    var counterJan = 0;
    var counterFeb = 0;
    var counterMar = 0;
    var counterApr = 0;
    var counterMay = 0;
    var counterJun = 0;
    var counterJul = 0;
    var counterAug = 0;
    var counterSep = 0;
    var counterOct = 0;
    var counterNov = 0;
    var counterDec = 0;

    const fetchData = async() =>{
      let list = [];
      console.log("currentUser.uid" + currentUser.uid);
      const q = query(collection(db, "surveys", currentUser.uid, "survey"), where("status", "==", "completed"));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        if ((doc.data().date > "2023-01-01") && (doc.data().date < "2023-01-31")){
          counterJan = counterJan + 1;
        } else if ((doc.data().date > "2023-02-01") && (doc.data().date < "2023-02-28")){
          counterFeb = counterFeb + 1 ;
        } else if ((doc.data().date > "2023-03-01") && (doc.data().date < "2023-03-31")){
          counterMar = counterMar + 1 ;
        } else if ((doc.data().date > "2023-04-01") && (doc.data().date < "2023-04-30")){
          counterApr = counterApr + 1 ;
        } else if ((doc.data().date > "2023-05-01") && (doc.data().date < "2023-05-31")){
          counterMay = counterMay + 1 ;
        } else if ((doc.data().date > "2023-06-01") && (doc.data().date < "2023-06-30")){
          counterJun = counterJun + 1 ;
        } else if ((doc.data().date > "2023-07-01") && (doc.data().date < "2023-07-31")){
          counterJul = counterJul + 1 ;
        } else if ((doc.data().date > "2023-08-01") && (doc.data().date < "2023-08-31")){
          counterAug = counterAug + 1 ;
        } else if ((doc.data().date > "2023-09-01") && (doc.data().date < "2023-09-30")){
          counterSep = counterSep + 1 ;
        } else if ((doc.data().date > "2023-10-01") && (doc.data().date < "2023-10-31")){
          counterOct = counterOct + 1 ;
        } else if ((doc.data().date > "2023-11-01") && (doc.data().date < "2023-11-30")){
          counterNov = counterNov + 1 ;
        } else if ((doc.data().date > "2023-12-01") && (doc.data().date < "2023-12-31")){
          counterDec = counterDec + 1 ;
        }
      });
      setJan(counterJan);
      setFeb(counterFeb);
      setMar(counterMar);
      setApr(counterApr);
      setMay(counterMay);
      setJun(counterJun);
      setJul(counterJul);
      setAug(counterAug);
      setSep(counterSep);
      setOct(counterOct);
      setNov(counterNov);
      setDec(counterDec);
      count  =  counterJan + counterFeb + counterMar + counterApr + counterMay + counterJun + counterJul + counterAug + counterSep + counterOct + counterNov + counterDec
      setProjects(count);
    }
    fetchData()
  },[])

  //temporary
  const _title = projects;
  //const _description = "/200 GB";
  const diff = 20 ;
  data = {
    title: "Projects Completed",
    isMoney: false,
    link: "Projects",
    icon: (
      <DoneIcon
        className="icon"
        style={{
          backgroundColor: "rgba(140, 0, 32, 0.2)",
          color: "goldenrod",
        }}
      />
    ),
  };
  return (
    <div class="card card-stats">
              <div class="card-body">
                <div class="row">
                  <div class="col-5">
                    <div class="info-icon text-center icon-success">
                      <i class="tim-icons icon-check-2"></i>
                    </div>
                  </div>
                  <div class="col-7">
                    <div class="numbers">
                      <p class="card-category">{data.title}</p>
                      <h3 class="card-title">{_title}</h3>
                      <p class="card-category">Sites</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <hr />
                <div class="stats">
                <Link to="/users/test" className="linktitle">{data.link}</Link>
                </div>
              </div>
            </div>
   
  );
};

export default ProjectWidget;
