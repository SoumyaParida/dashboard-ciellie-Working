import "./datatable.scss"
import { DataGrid } from "@mui/x-data-grid";
import { surveyColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
//import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import Pagination from "../../components/pagination/Pagination";
import Records from "./Records";
 

const Datatable = () => {
  const [data, setSurveyData] = useState([]);
  const { currentUser, dispatch } = useContext(AuthContext);
  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // No of Records to be displayed on each page   
  const [recordsPerPage] = useState(4);

  const navigate = useNavigate();
  

  useEffect(() => {
    // access the db collection

    const fetchSurveyData = async() =>{
      let list = [];
      //console.log("currentUser.uid" + currentUser.uid);
      const querySnapshot = await getDocs(collection(db, "surveys", currentUser.uid, "survey"));
      querySnapshot.forEach((doc) => {
        //console.log(doc.data());
        list.push({ id: doc.id, ...doc.data()});
      });
     
      setSurveyData(list);
    }
    fetchSurveyData()
  },[])

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage)

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Surveys
        <Link to="/surveys/newsurvey" className="link">
          Schedule a Survey
        </Link>
      </div>
      
      <Records data={currentRecords}/>
            <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
      
    </div>
  );
};

export default Datatable;
