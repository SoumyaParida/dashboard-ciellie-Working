import React from 'react';
import "./viewSingleSurvey.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { useEffect, useState } from "react";
import {  getDocs, collection } from "firebase/firestore";
import {  db, storage } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useLocation } from 'react-router-dom';
import { ref,  getDownloadURL, listAll, getStorage, getMetadata, getBlob } from "firebase/storage";

import FolderStructure from '../../components/folderStructure/FolderStructure';

import { v4 as uuidv4 } from 'uuid';

import JSZip from 'jszip';
import { saveAs } from 'file-saver';



const ViewSingleSurvey = () => {
  const [appliances, setAppliances] = useState([]);
  const [attaic, setAttaic] = useState([]);
  const [electrical, setElectrical] = useState([]);
  const [roof, setRoof] = useState([]);
  const [extraDetails, setextraDetails] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const { state } = useLocation();

  const addFilesFromDirectoryToZip = async (directoryPath = "", zip) => {
    const storage = getStorage();
   
    const directoryContentsRef = ref(
      storage,
      directoryPath
    );
    const directoryContents = await listAll(directoryContentsRef);
  
    for (const file of directoryContents.items) {
      const fileRef = ref(storage, file.fullPath);
      const fileBlob = await getBlob(fileRef)
      zip.file(file.fullPath, fileBlob);
    }
  
    for (const folder of directoryContents.prefixes) {
      await addFilesFromDirectoryToZip(folder.fullPath, zip);
    };
  };
  
  const downloadFolderAsZip = async () => {
    const zip = new JSZip();
    const directoryPath = currentUser.uid + "/" + state.id;
    await addFilesFromDirectoryToZip(directoryPath, zip);
  
    const blob = await zip.generateAsync({ type: "blob" });
    const name = directoryPath.split('/').pop();
    saveAs(blob, name);
  };

  //console.log("state: ", state);

  useEffect(() => {
    const fetchData = async() =>{
      let listAppliancs = [];
      let listAttic = [];
      let listElectrical = [];
      let listRoof = [];
      let listExtraDetails = [];

      //console.log("currentUser.uid" + currentUser.uid);
      //console.log("state.id" + state.id);
      const querySnapshot = await getDocs(collection(db, "surveys", currentUser.uid, "survey"));
      querySnapshot.forEach((doc) => {
        //console.log(doc.data());
        if (doc.data().id === state.id){
          const folderlist = ["Appliances", "Attic", "Electrical", "Roof", "ExtraDetails"]

          folderlist.map((folder) => {
          const listRef = ref(storage, currentUser.uid + "/" + doc.data().id + "/" + folder);
          //const listRef = ref(storage, folder +"/" +  currentUser.uid + "/" + doc.data().id);
          listAll(listRef)
            .then((res) => {
              res.prefixes.forEach((folderRef) => {
                listAll(folderRef);
              });
              res.items.forEach((itemRef) => {
                getDownloadURL(itemRef).then((url) => {
                  
                  //list.push(url)
                  
                  if (folder === "Appliances"){
                    listAppliancs.push({"id": uuidv4(), "fullPath": url});
                    setAppliances(listAppliancs);
                  }
                  else if (folder === "Attic"){
                    listAttic.push({"id": uuidv4(), "fullPath": url});
                    setAttaic(listAttic);
                  }
                  else if(folder === "Electrical"){
                    listElectrical.push({"id": uuidv4(), "fullPath": url});
                    setElectrical(listElectrical)
                  }
                  else if (folder === "Roof"){
                    listRoof.push({"id": uuidv4(), "fullPath": url});
                    setRoof(listRoof)
                  }
                  
                  else if (folder === "ExtraDetails"){
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

  

  //console.log("appliances", appliances)
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

                    
                    <div className="pull-right">
                      <input type="button" className="btn btn-finish btn-fill btn-primary btn-wd" name="Download" value="Download Zip" onClick={downloadFolderAsZip} id="create-button" />
                      </div>
                    

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

export default ViewSingleSurvey;
