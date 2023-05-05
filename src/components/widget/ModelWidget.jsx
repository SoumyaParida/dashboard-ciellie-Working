import ViewInArIcon from '@mui/icons-material/ViewInAr';
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const ModelWidget = () => {
  const [projects, setProjects] = useState([]);
  const { currentUser, dispatch } = useContext(AuthContext);
  let data;

  useEffect(() => {
    var count = 0;
    const fetchData = async() =>{
      let list = [];
      //console.log("currentUser.uid" + currentUser.uid);
      const q = query(collection(db, "surveys", currentUser.uid, "survey"), where("status", "==", "completed"));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        //console.log(doc.data());
        count = count + 1;
        list.push({ id: doc.id, ...doc.data()});
      });
      
      setProjects(count);
    }
    fetchData()
  },[])

  const _title = "Coming Soon";
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
    <div className="card card-stats">
      <div className="card-body">
        <div className="row">
          <div className="col-5">
            <div className="info-icon text-center icon-warning">
              <i className="tim-icons icon-app"></i>
            </div>
          </div>
          <div className="col-7">
            <div className="numbers">
              <p className="card-category">{data.title}</p>
              <h3 className="card-title">{_title}</h3> 
              <p className="card-category">{diff}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <hr />
        <div className="stats">
        <Link to="/timeline" className="linktitle">{data.link}</Link>
        </div>
      </div>
    </div>   
  );
};

export default ModelWidget;
