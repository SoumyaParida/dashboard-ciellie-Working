import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";


import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import CompletedSurveyDatatable from "../../components/datatable/CompletedSurveyDatatable";


const Single = () => {
  
  const [profileName, setProfileName] = useState([]);
  const [email, setEmail] = useState([]);
  const [phone, setPhone] = useState([]);
  const [image, setImage] = useState([]);

  const { currentUser, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async() =>{
      let list = [];
      console.log("currentUser.uid" + currentUser.uid);
      const docRef = doc(db, "profiles", currentUser.uid);
      console.log(docRef);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setProfileName(docSnap.data().name);
        setEmail(docSnap.data().email);
        setPhone(docSnap.data().phone);
        setImage(docSnap.data().image);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      //setData(list);
    }
    fetchData()
  },[])

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={image}
                //src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{profileName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{phone}</span>
                </div>
                
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Completed Surveys</h1>
          <CompletedSurveyDatatable />
        </div>
      </div>
    </div>
  );
};

export default Single;
