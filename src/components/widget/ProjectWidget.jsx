import DoneIcon from '@mui/icons-material/Done';
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import moment from 'moment';

const ProjectWidget = () => {
  const [projects, setProjects] = useState([]);
  const { currentUser } = useContext(AuthContext);



  let data;

  useEffect(() => {
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
      const q = query(collection(db, "surveys", currentUser.uid, "survey"), where("status", "==", "completed"));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        //console.log(doc.data());
        if ((doc.data().date >= moment().month("January").startOf('month').format('YYYY-MM-DD')) && (doc.data().date <= moment().month("January").endOf('month').format('YYYY-MM-DD'))){
          counterJan = counterJan + 1;
        } else if ((doc.data().date >= moment().month("February").startOf('month').format('YYYY-MM-DD')) && (doc.data().date <= moment().month("February").endOf('month').format('YYYY-MM-DD'))){
          counterFeb = counterFeb + 1 ;
        } else if ((doc.data().date >= moment().month("March").startOf('month').format('YYYY-MM-DD')) && (doc.data().date <= moment().month("March").endOf('month').format('YYYY-MM-DD'))){
          counterMar = counterMar + 1 ;
        } else if ((doc.data().date >= moment().month("April").startOf('month').format('YYYY-MM-DD')) && (doc.data().date <= moment().month("April").endOf('month').format('YYYY-MM-DD'))){
          counterApr = counterApr + 1 ;
        } else if ((doc.data().date >= moment().month("May").startOf('month').format('YYYY-MM-DD')) && (doc.data().date <= moment().month("May").endOf('month').format('YYYY-MM-DD'))){
          counterMay = counterMay + 1 ;
        } else if ((doc.data().date >= moment().month("June").startOf('month').format('YYYY-MM-DD')) && (doc.data().date <= moment().month("June").endOf('month').format('YYYY-MM-DD'))){
          counterJun = counterJun + 1 ;
        } else if ((doc.data().date >= moment().month("July").startOf('month').format('YYYY-MM-DD')) && (doc.data().date <= moment().month("July").endOf('month').format('YYYY-MM-DD'))){
          counterJul = counterJul + 1 ;
        } else if ((doc.data().date >= moment().month("August").startOf('month').format('YYYY-MM-DD')) && (doc.data().date <= moment().month("August").endOf('month').format('YYYY-MM-DD'))){
          counterAug = counterAug + 1 ;
        } else if ((doc.data().date >= moment().month("September").startOf('month').format('YYYY-MM-DD')) && (doc.data().date <= moment().month("September").endOf('month').format('YYYY-MM-DD'))){
          counterSep = counterSep + 1 ;
        } else if ((doc.data().date >= moment().month("October").startOf('month').format('YYYY-MM-DD')) && (doc.data().date <= moment().month("October").endOf('month').format('YYYY-MM-DD'))){
          counterOct = counterOct + 1 ;
        } else if ((doc.data().date >= moment().month("November").startOf('month').format('YYYY-MM-DD')) && (doc.data().date <= moment().month("November").endOf('month').format('YYYY-MM-DD'))){
          counterNov = counterNov + 1 ;
        } else if ((doc.data().date >= moment().month("December").startOf('month').format('YYYY-MM-DD')) && (doc.data().date <= moment().month("December").endOf('month').format('YYYY-MM-DD'))){
          counterDec = counterDec + 1 ;
        }
      });
      
      count  =  counterJan + counterFeb + counterMar + counterApr + counterMay + counterJun + counterJul + counterAug + counterSep + counterOct + counterNov + counterDec
      setProjects(count);
    }
    fetchData()
  });

  //temporary
  const _title = projects;
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
    <div className="card card-stats">
      <div className="card-body">
        <div className="row">
          <div className="col-5">
            <div className="info-icon text-center icon-success">
              <i className="tim-icons icon-check-2"></i>
            </div>
          </div>
          <div className="col-7">
            <div className="numbers">
              <p className="card-category">{data.title}</p>
              <h3 className="card-title">{_title}</h3>
              <p className="card-category">Sites</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <hr />
        <div className="stats">
        <Link to="/surveys" className="linktitle">{data.link}</Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectWidget;
