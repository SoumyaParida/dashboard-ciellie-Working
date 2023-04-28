import "./surveySingle.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";


import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import CompletedSurveyDatatable from "../../components/datatable/CompletedSurveyDatatable";
import { useLocation } from 'react-router-dom';


const SurveySingle = () => {
  const [id, setId] = useState([]);
  const [profileName, setProfileName] = useState([]);
  const [email, setEmail] = useState([]);
  const [phone, setPhone] = useState([]);
  const [address, setAddress] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [status, setStatus] = useState([]);
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);
  const [message, setMessage] = useState([]);


  const { currentUser, dispatch } = useContext(AuthContext);

  const { state } = useLocation();

  console.log("state: ", state);

  useEffect(() => {
    const fetchData = async() =>{
      let list = [];
      console.log("currentUser.uid" + currentUser.uid);
      console.log("state.id" + state.id);
      const querySnapshot = await getDocs(collection(db, "surveys", currentUser.uid, "survey"));
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        if (doc.data().id == state.id){
          setId(doc.data().id);
          setProfileName(doc.data().name);
          setEmail(doc.data().email);
          setPhone(doc.data().phone);
          setAddress(doc.data().address);
          setPropertyType(doc.data().propertyType)
          setStatus(doc.data().status);
          setDate(doc.data().date);
          setTime(doc.data().time);
          setMessage(doc.data().message);
        }
        
      });
    }
    fetchData()
  },[])

  return (
    <div className="surveySingle">
      <Sidebar />
      <div className="surveySingleContainer">
        <Navbar />
        <div className="top">
        
          <div className="left">
          <h1 className="itemTitle">Profile</h1>
            <div className="item">
              <div className="details">
              <div className="detailItem">
                  <span className="itemKey">Id: </span>
                  <span className="itemValue">{id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Name: </span>
                  <span className="itemValue">{profileName}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email: </span>
                  <span className="itemValue">{email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone: </span>
                  <span className="itemValue">{phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address: </span>
                  <span className="itemValue">{address}</span>
                </div>
              </div> 
              </div>
            </div>
            <div className="right">
            <h1 className="itemTitle">Details</h1>
            <div className="item">
              <div className="details">
              <div className="detailItem">
                  <span className="itemKey">PropertyTypte: </span>
                  <span className="itemValue">{propertyType}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Scheduled Date: </span>
                  <span className="itemValue">{date}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Scheduled Time:: </span>
                  <span className="itemValue">{time}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Extra Message: </span>
                  <span className="itemValue">{message}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status: </span>
                  <span className="itemValue">{status}</span>
                </div>
              </div> 
              </div>
            </div>

            
        </div>
      </div>
    </div>
  );
};

export default SurveySingle;