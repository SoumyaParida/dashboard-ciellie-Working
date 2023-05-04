import React from 'react';
import "./folderStructure.scss";
import { Link } from "react-router-dom";
import { auth, db, storage } from "../../firebase";
import imagePlaceholder from "../../assets/img/image_placeholder.jpg";
import { ref, uploadBytesResumable, getDownloadURL,getMetadata, listAll } from "firebase/storage";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import FolderStructure from '../../components/folderStructure/FolderStructure';

import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { Image } from '@mui/icons-material';

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

const Appliances = () => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const { state: { infoId, title } = {} } = useLocation();
  const [data, setData] = useState([]);
  let list = [];
 
  console.log("currentUser", currentUser.uid);
  console.log("new state.id", infoId);
  
    
  
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
                  <h2 class="info-text-folders"><b>{title}</b></h2>
                    <div className="tab-pane show active" id="info">
                      
                      <div className="fileinput-new thumbnail row">  
                          
                              
                  
                      {infoId.map((input) => (
                          <div class="column">
                              
                                        <img
                                        src={
                                          input.fullPath
                                        }
                                        alt="Appliances" height="150" width="150"
                                        />
                          </div>
                                      ))}
                  
                          
                                     
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


    
export default Appliances;