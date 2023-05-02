import "./newsurvey.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { addDoc, doc, getDoc, setDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import imagePlaceholder from "../../assets/img/image_placeholder.jpg";
import { useLocation } from 'react-router-dom';


const NewSurveyFiles = () => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);
  const { currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()
  const { state: { surveyData } = {} } = useLocation();

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    
    //setData({ ...data, [id]: value, "id": uuidv4(), "status": "scheduled"});
    //console.log("...data", ...data);
    setData({"img": file.name})
    console.log("...data", data);
  }

  console.log(data);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try{
      console.log("currentUser.uid" + currentUser.uid);
      const querySnapshot = await addDoc(collection(db, "surveys", currentUser.uid, "survey"),{
        ...data
      });
      navigate(-1)
      console.log("Survey Document written with ID: ", querySnapshot.id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = (e) => {

  }

  const nextpart = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    console.log("file.name", file);
    setData({"img": file.name})
    console.log("surveyData .data", surveyData);
    surveyData["image"] = file;
    console.log("...data", data);
    navigate("./address", { state: { surveyDataUpdated: surveyData } });
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
                      <div class="stepper-item"></div>
                    <div class="stepper-item active">
                      <Link to="#about" data-toggle="tab"></Link>
                      <div class="step-counter"> <i class="tim-icons icon-single-02"></i></div>
                      <div class="step-name">INFO</div>
                      
                      
                      </div>
                      <div class="stepper-item active">
                      <Link to="#account" data-toggle="tab"></Link>
                      <div class="step-counter"> <i class="tim-icons icon-settings-gear-63"></i></div>
                      <div class="step-name">FILES</div>
                     
                    </div>
                    <div class="stepper-item completed">
                    <Link to="/#address" data-toggle="tab"></Link>
                    <div class="step-counter"> <i class="tim-icons icon-delivery-fast"></i></div>
                      <div class="step-name">ADDRESS</div>
                    </div>
                    <div class="stepper-item completed"></div>
                  
                </div>
                </div>


                  <div className="card-body">
                  <div class="tab-pane" id="account">
                      <h5 class="info-text">Upload any additional files that are essential to the project</h5>
                      <div class="row justify-content-center">
                        <div class="col-lg-10 text-center">
                        <form id="image-upload-form">
                            <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                              <div class="fileinput-new thumbnail">
                              <img
                                        src={
                                            file
                                            ? URL.createObjectURL(file)
                                            : imagePlaceholder
                                        }
                                        alt=""
                                        />
                              </div>

                              <div class="fileinput-preview fileinput-exists thumbnail"></div>
                                <div>
                                    <span class="btn btn-primary btn-simple btn-file">
                                        <label htmlFor="file">Select image</label>
                                        <label class="fileinput-exists">Change</label>
                                        <input
                                            type="file"
                                            id="file"
                                            onChange={(e) => setFile(e.target.files[0])}
                                            style={{ display: "none" }}
                                            />
                                        </span>
                                       
                                    </div>
                            </div>
                        </form>
                        </div>
                      </div>
                    </div>
              <div class="card-footer">
                  <div class="pull-right">
                    <input type='button' class='btn btn-next btn-fill btn-green btn-wd' name='next' value='Next' onClick={nextpart} />  
                  </div>
                    <div class="pull-left">
                    <input type='button' class='btn btn-previous btn-fill btn-default btn-wd' name='previous' value='Previous' onClick={prePart}/>
                    </div>
                  <div>

                  </div>
                  <div class="clearfix"></div>
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

export default NewSurveyFiles;
