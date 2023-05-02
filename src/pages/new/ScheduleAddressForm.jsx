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
import { useLocation } from 'react-router-dom';

const ScheduleAddressForm = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);
  const { currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()
  const { state: { surveyDataUpdated } = {} } = useLocation();

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value, "id": uuidv4()});
    //console.log("...data", ...data);
  }

  console.log(data);

  const handleUpdate = async (e) => {
    e.preventDefault();
    navigate("./files");
    /*try{
      console.log("currentUser.uid" + currentUser.uid);
      const querySnapshot = await addDoc(collection(db, "surveys", currentUser.uid, "survey"),{
        ...data
      });
      navigate(-1)
      console.log("Survey Document written with ID: ", querySnapshot.id);
    } catch (err) {
      console.log(err);
    }*/
  };

  const redirectToProjects = (e) => {
    console.log("data", data)
    console.log("surveyData", surveyDataUpdated);
    
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
             
            
            <form>
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
                    <div class="stepper-item active">
                    <Link to="/#address" data-toggle="tab"></Link>
                    <div class="step-counter"> <i class="tim-icons icon-delivery-fast"></i></div>
                      <div class="step-name">ADDRESS</div>
                    </div>
                    <div class="stepper-item completed"></div>
                  
                </div>
                </div>


                  <div className="card-body">
                  <div className="tab-content">
                    <div className="tab-pane show active" id="info">
                      <h5 className="info-text">Site Address</h5>
                      <div className="row justify-content-center mt-5">
                      
                      
                     
                      <div className="col-sm-5">
                      {inputs.map((input) => (
                          <div class="input-group" key={input.id}>
                            <div class="input-group-prepend">
                              <div class="input-group-text">
                                <i class={input.timIcon}></i>
                              </div>
                            </div>
                            <input id={input.id} type={input.type} placeholder={input.placeholder} class="form-control" onChange={handleInput}/>
                          </div>
                        ))}
                          
                          
                        </div>
                      
                      </div>
                    </div>

                    

                    

             
             
             
              </div>
              <div class="card-footer">
                  <div class="pull-right">
                  <input type="button" class="btn btn-finish btn-fill btn-primary btn-wd" name="create" value="create" onClick={redirectToProjects} id="create-button" />
                    
                      
                  </div>

                  <div class="pull-left">
                    <input type='button' class='btn btn-previous btn-fill btn-default btn-wd' name='previous' value='Previous' onClick={prePart}/>
                    </div>
                  
                  <div class="clearfix"></div>
                </div>
              </div>   
               
            </div>
          
          
          
                
          </form>
          </div>
      </div>
      </div>
      </div>
      </div>

  );
};

export default ScheduleAddressForm;
