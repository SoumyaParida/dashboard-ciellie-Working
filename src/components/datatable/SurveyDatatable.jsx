import "./surveyDatatable.scss";
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

const SurveyDatatable = () => {
  const [data, setSurveyData] = useState([]);
  const { currentUser, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    // access the db collection

    const fetchSurveyData = async() =>{
      let list = [];
      console.log("currentUser.uid" + currentUser.uid);
      const querySnapshot = await getDocs(collection(db, "surveys", currentUser.uid, "survey"));
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        list.push({ id: doc.id, ...doc.data()});
      });
      //const docSnap = doc(docRef,"survey", currentUser.uid);
      //collection("surveys").doc(profileId).collection("survey")
      //const querySnapshot = await getDocs(collection(db, "surveys"));
      //querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
      //  console.log(doc.id, " => ", doc.data());
      //});
      setSurveyData(list);
    }
    fetchSurveyData()
  },[])
 

  const handleView = (id) => {
    navigate('/surveys/test', { state: { id: id} });
  };

  const actionSurveyColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <button onClick={() => handleView(params.row.id)}>View</button>
          
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Surveys
        <Link to="/surveys/newsurvey" className="link">
          Schedule a Survey
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={surveyColumns.concat(actionSurveyColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default SurveyDatatable;
