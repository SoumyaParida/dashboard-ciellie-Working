import "./scheduleSurvey.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { addDoc, arrayRemove, collection } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const GenerateScheduleSurvey = ({ inputs, title }) => {
  const [appliancesImages, setAppliancesImages] = useState([]);
  const [attaicImages, setAttaicImages] = useState([]);
  const [electricalImages, setElectricalImages] = useState([]);
  const [roofImages, setRoofImages] = useState([]);
  const [extraDetailsImages, setExtraDetailsImages] = useState([]);

  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState({});

  const [data, setData] = useState({});
  const [type, setType] = useState({});
  //const [per, setPer] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate()
  const { state: { surveyDataUpdated } = {} } = useLocation();

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value});
    //console.log("...data", ...data);
  }

  const handleUpload = (images, type) => {
    const promises = [];
    images.map((image) => {
      const storageRef = ref(storage, currentUser.uid + "/" + surveyDataUpdated.id + "/" + type + "/" + image.name);
      const uploadTask = uploadBytesResumable(storageRef, image);
      //const uploadTask = storage.ref(`${currentUser.uid}/${surveyDataUpdated.id}/${type}/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          //setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setStatus("complete");
            //setData((prev)=>({...prev, image:downloadURL}));
          });
        }
      );
    });

    Promise.all(promises)
      .then(() => console.log(`All ${type} uploaded`))
      .catch((err) => console.log(err));
  };

  const redirectToProjects = async (e) => {    
    {Object.keys(surveyDataUpdated).map((key) => {
      data["name"] = surveyDataUpdated["name"];
      data["email"] = surveyDataUpdated["email"];
      data["phone"] = surveyDataUpdated["phone"];
      data["status"] = surveyDataUpdated["status"];
      data["id"] = surveyDataUpdated["id"];
    })};

    handleUpload(surveyDataUpdated.appliancesImages, "Appliances")
    handleUpload(surveyDataUpdated.attaicImages, "Attic")
    handleUpload(surveyDataUpdated.electricalImages, "Electrical")
    handleUpload(surveyDataUpdated.roofImages, "Roof")
    handleUpload(surveyDataUpdated.extraDetailsImages, "ExtraDetails")
    
    try{
      const querySnapshot = await addDoc(collection(db, "surveys", currentUser.uid, "survey"),{
        ...data
      });
      navigate("/surveys");
    } catch (err) {
      console.log(err);
    }
  };

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
                    
                      <div className="stepper-item active">
                      <Link to="/#address" data-toggle="tab"></Link>
                      <div className="step-counter"> <i className="tim-icons icon-delivery-fast"></i></div>
                      <div className="step-name">ADDRESS</div>
                      </div>
                      <div className="stepper-item completed"></div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="tab-content">
                      <div className="tab-pane show active" id="info">
                        <h5 className="info-text">Site Address</h5>
                        <div className="row justify-content-center mt-5">
                          <div className="col-sm-5">
                          {inputs.map((input) => (
                              <div className="input-group" key={input.id}>
                                <div className="input-group-prepend">
                                  <div className="input-group-text">
                                    <i className={input.timIcon}></i>
                                  </div>
                                </div>
                                <input id={input.id} type={input.type} placeholder={input.placeholder} className="form-control" onChange={handleInput}/>
                              </div>
                            ))}  
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="pull-right">
                        <input type="button" className="btn btn-finish btn-fill btn-primary btn-wd" name="create" value="create" onClick={redirectToProjects} id="create-button" />
                      </div>

                      <div className="pull-left">
                        <input type='button' className='btn btn-previous btn-fill btn-default btn-wd' name='previous' value='Previous' onClick={prePart}/>
                      </div>
                  
                      <div className="clearfix"></div>
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

export default GenerateScheduleSurvey;
