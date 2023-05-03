import React from 'react';
import "./surveySingle.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";

import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';


import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import CompletedSurveyDatatable from "../../components/datatable/CompletedSurveyDatatable";
import { useLocation } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL,getMetadata, listAll } from "firebase/storage";

import FolderStructure from '../../components/folderStructure/FolderStructure';

import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
}));

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
  const [data, setData] = useState([]);
  const [tabData, setTabData]  = useState([]);


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

          const listRef = ref(storage, "Appliances/" +  currentUser.uid + "/" + doc.data().id);
          listAll(listRef)
            .then((res) => {
              res.prefixes.forEach((folderRef) => {
                listAll(folderRef);
              });
              res.items.forEach((itemRef) => {
                getDownloadURL(itemRef).then((url) => {
                  list.push({"id": uuidv4(), "fullPath": url});
                  //list.push(url)
                  
                  //setList(list);
                  setData(list);
                });
                
              });      
            });
            
        }
      });
    }
    fetchData()
  },[])

  console.log("datalist", data)

  const accountDetails = async (e) => {
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
          list.push({"id": doc.data().id, "ProfileName": doc.data().name, "Email": doc.data().email});
          setTabData(list)  
        }
      });
    }

    const surveyDetails = async (e) => {
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
          list.push({"Address": doc.data().address, "PropertyType": doc.data().propertyType});
          setTabData(list)  
        }
      });
    }

  


  return (
    <div className="surveySingle">
      <Sidebar />
        <div className="surveySingleContainer">
          <Navbar />
            <div className="content">
              <div className="col-md-10 mr-auto ml-auto">
                <div className="card card-plain">
                  <div className="card-header text-center">
                    <h3 className="card-title">
                      Solar Site Survey Full Information
                    </h3>
                    <h5 className="description">This information will let us know more about the site we are surveying.</h5>

                    
                   
                    

                    <div className="card-body">
                  <div className="tab-content">
                    <div className="tab-pane show active" id="info">
                      
                      <div className="row justify-content-center mt-5">
                      
                      <FolderStructure inputs={data}></FolderStructure>
                     
                     
                          
                        </div>
                      
                      </div>
                    </div>

                    

                    

             
             
             
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
