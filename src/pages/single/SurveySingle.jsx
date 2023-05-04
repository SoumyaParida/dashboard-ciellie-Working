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
import Appliances from '../../components/folderStructure/Appliances';

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
  const [appliances, setAppliances] = useState([]);
  const [attaic, setAttaic] = useState([]);
  const [electrical, setElectrical] = useState([]);
  const [roof, setRoof] = useState([]);
  const [extraDetails, setextraDetails] = useState([]);



  const { currentUser, dispatch } = useContext(AuthContext);

  const { state } = useLocation();

  console.log("state: ", state);

  useEffect(() => {
    const fetchData = async() =>{
      let listAppliancs = [];
      let listAttic = [];
      let listElectrical = [];
      let listRoof = [];
      let listExtraDetails = [];

      console.log("currentUser.uid" + currentUser.uid);
      console.log("state.id" + state.id);
      const querySnapshot = await getDocs(collection(db, "surveys", currentUser.uid, "survey"));
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        if (doc.data().id == state.id){
          const folderlist = ["Appliances", "Attic", "Electrical", "Roof", "ExtraDetails"]

          folderlist.map((folder) => {

          const listRef = ref(storage, folder +"/" +  currentUser.uid + "/" + doc.data().id);
          listAll(listRef)
            .then((res) => {
              res.prefixes.forEach((folderRef) => {
                listAll(folderRef);
              });
              res.items.forEach((itemRef) => {
                getDownloadURL(itemRef).then((url) => {
                  
                  //list.push(url)
                  
                  if (folder == "Appliances"){
                    listAppliancs.push({"id": uuidv4(), "fullPath": url});
                    setAppliances(listAppliancs);
                  }
                  else if (folder == "Attic"){
                    listAttic.push({"id": uuidv4(), "fullPath": url});
                    setAttaic(listAttic);
                  }
                  else if(folder == "Electrical"){
                    listElectrical.push({"id": uuidv4(), "fullPath": url});
                    setElectrical(listElectrical)
                  }
                  else if (folder == "Roof"){
                    listRoof.push({"id": uuidv4(), "fullPath": url});
                    setRoof(listRoof)
                  }
                  
                  else if (folder == "ExtraDetails"){
                  listExtraDetails.push({"id": uuidv4(), "fullPath": url});
                   setextraDetails(listExtraDetails)
                  }
                  
                });
                
              });      
            });
          });
           
            
        }
      });

   
    }
    fetchData()
  },[])

  console.log("appliances", appliances)
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
                      
                        <FolderStructure inputs={[appliances, attaic, electrical, roof, extraDetails]}></FolderStructure>
                     
                     
                          
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
