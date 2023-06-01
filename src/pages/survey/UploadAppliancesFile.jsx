import "./scheduleSurvey.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import imagePlaceholder from "../../assets/img/image_placeholder.jpg";
import attaicimagePlaceholder from "../../assets/img/image_placeholder.jpg";
import electricalimagePlaceholder from "../../assets/img/image_placeholder.jpg";
import roofimagePlaceholder from "../../assets/img/image_placeholder.jpg";
import extraDetailsimagePlaceholder from "../../assets/img/image_placeholder.jpg";

import { useLocation } from 'react-router-dom';


const UploadAppliancesFile = () => {
  const [appliancesfiles, setAppliancesFiles] = useState([]);
  
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  const { state: { surveyData } = {} } = useLocation();

  console.log("data = " + data);
  console.log("appliancesfiles = " + appliancesfiles);

  const handleAppliancesChange = (e) => {
    for (let i=0; i< e.target.files.length;i++){
      const newImage = e.target.files[i];
      newImage["id"] = "appliances" + Math.random().toString();
      newImage["category_name"] = "appliances";
      setAppliancesFiles((prevState) => [...prevState, newImage]);
      //setData(newImage)
    }
  }

  const nextpart = (e) => {
    //setData({"img": appliancesfiles})
    
    surveyData["appliancesImages"] = appliancesfiles;
    //surveyData["category_name"] = "appliances";
    
    console.log("new surveyData .data", surveyData);
    navigate("./attaic", { state: { surveyData: surveyData } });
  }
  const prePart = (e) => {
    navigate(-1);
  }
  
  return (
    <div className="widgetnew">
    <Sidebar />
      <div className="wizard-container">
        <Navbar />
          <div className="content">
          <div className="col-md-10 mr-auto ml-auto">
          <div className="card card-plain">
             
            
            
                <div className="card-header text-center">
                    <h3 className="card-title">
                      Schedule a Solar Site Survey
                    </h3>
                    <h5 className="description">This information will let us know more about the site we are surveying.</h5>
                    <div className="wizard-navigation">
                    
                    <div className="stepper-wrapper active">
                      <div className="stepper-item"></div>
                    <div className="stepper-item active">
                      <Link to="#about" data-toggle="tab"></Link>
                      <div className="step-counter"> <i className="tim-icons icon-single-02"></i></div>
                      <div className="step-name">INFO</div>
                      
                      
                      </div>
                      <div className="stepper-item active">
                      <Link to="#account" data-toggle="tab"></Link>
                      <div className="step-counter"> <i className="tim-icons icon-settings-gear-63"></i></div>
                      <div className="step-name">FILES</div>
                     
                    </div>
                    <div className="stepper-item completed">
                    <Link to="/#address" data-toggle="tab"></Link>
                    <div className="step-counter"> <i className="tim-icons icon-delivery-fast"></i></div>
                      <div className="step-name">ADDRESS</div>
                    </div>
                    <div className="stepper-item completed"></div>
                  
                </div>
                </div>


                  <div className="card-body">
                  <div className="tab-pane" id="account">
                  <h5 className="info-text">Upload Images of appliances that are essential to the project</h5>
                      <div className="row justify-content-center">
                        <div className="col-lg-10 text-center">
                        <form id ="appliances">
                       
                        
                        <div className="row justify-content-center" data-provides="fileinput">
                              {appliancesfiles.map((file, i) => (
                               <div className="row fileinput fileinput-new thumbnail" style={{ padding:20, marginTop: "0px" }}> 
                                <img
                                key={i}
                                style={ {width: "200px"} }
                                src={
                                    file
                                    ? URL.createObjectURL(file)
                                    : imagePlaceholder
                                }
                                alt=""
                                
                                />
                              
                                
                              </div>

                              ))}
                              </div>
                              
                             
                              
                                <div>
                                    <span className="btn btn-primary btn-simple btn-file">
                                        <label htmlFor="file">Appliancs</label>
                                        
                                        <input
                                            type="file"
                                            id="file"
                                            multiple
                                            onChange={handleAppliancesChange}
                                            style={{ display: "none" }}
                                            />
                                        </span>
                                       
                                    </div>
                                    
                                    
                                    </form>
                                        
                        </div>
                      </div>
                    </div>
              <div className="card-footer">
                  <div className="pull-right">
                    <input type='button' className='btn btn-next btn-fill btn-green btn-wd' name='next' value='Next' onClick={nextpart} />  
                  </div>
                    <div className="pull-left">
                    <input type='button' className='btn btn-previous btn-fill btn-default btn-wd' name='previous' value='Previous' onClick={prePart}/>
                    </div>
                  <div>

                  </div>
                  <div className="clearfix"></div>
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

export default UploadAppliancesFile;
