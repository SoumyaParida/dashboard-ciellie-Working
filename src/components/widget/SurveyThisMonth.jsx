import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link } from "react-router-dom";
import moment from 'moment';

import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import {  db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const SurveyThisMonth = () => {
  const [projects, setProjects] = useState([]);
  const { currentUser } = useContext(AuthContext);
  let data;

  const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
  const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD');

  useEffect(() => {
    var count = 0;
    const fetchData = async() =>{
      let list = [];

      const q = query(collection(db, "surveys", currentUser.uid, "survey"), where("status", "==", "scheduled"));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        //console.log(doc.data());
        if ((doc.data().date > startOfMonth) && (doc.data().date < endOfMonth)){
            count = count + 1;
            list.push({ id: doc.id, ...doc.data()});
        }
        
      });

      setProjects(count);
    }
    fetchData()
  });

  //temporary
  const _title = projects;
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
    <div className="card card-stats">
      <div className="card-body">
        <div className="row">
          <div className="col-5">
            <div className="info-icon text-center icon-primary">
              <i className="tim-icons icon-calendar-60"></i>
            </div>
          </div>
          <div className="col-7">
            <div className="numbers">
              <p className="card-category">{data.title}</p>
              <h3 className="card-title">{_title}</h3>
              <p className="card-category">/ Unlimited</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <hr />
        <div className="stats">
        <Link to="/surveys/newsurvey" className="linktitle">{data.link}</Link>
        </div>
      </div>
    </div>
   
  );
};

export default SurveyThisMonth;
