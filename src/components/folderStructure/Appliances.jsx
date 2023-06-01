import React from 'react';
import "./folderStructure.scss";
import { useLocation } from 'react-router-dom';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link } from 'react-router-dom';
import axios from 'axios'
import fileDownload from 'js-file-download'

const Appliances = () => {
  const { state: { infoId, title } = {} } = useLocation();
  const downloadUrl = (input) =>{
    console.log("input = " + input.name);
    axios.get(input.fullPath, {
      responseType: 'blob',
    })
    .then((res) => {
      fileDownload(res.data, Date.now().toString()+".png")
    })

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
                      <h2 className="info-text-folders"><b>{title}</b></h2>
                        <div className="tab-pane show active" id="info">         
                          <div className="fileinput-new thumbnail row">  
                            {infoId.map((input) => (
                                <div className="column" key={input.id}>
                                  <img
                                      src={
                                            input.fullPath
                                          }
                                      alt="Appliances" 
                                      height="150" 
                                      width="150"
                                  />
                                  <p>
                                  <input type="button" className="btn btn-finish btn-fill btn-primary btn-wd" name="Download" value="Download" onClick={() => downloadUrl(input)} id="create-button" />
                                   
                                   </p>
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