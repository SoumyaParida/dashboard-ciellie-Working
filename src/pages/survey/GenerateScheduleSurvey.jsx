import "./scheduleSurvey.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const GenerateScheduleSurvey = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
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

  useEffect(() => {
    const uploadFile = () => {
      
      const name = "profile_" + file.name;
      const storageRef = ref(storage, "ExtraDetails" + "/" + currentUser.uid + "/" + surveyDataUpdated.id + "/" + name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          //setPer(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            //setData((prev)=>({...prev, image:downloadURL}));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const redirectToProjects = async (e) => {    
    {Object.keys(surveyDataUpdated).map((key) => {
      data["name"] = surveyDataUpdated["name"];
      data["email"] = surveyDataUpdated["email"];
      data["phone"] = surveyDataUpdated["phone"];
      data["status"] = surveyDataUpdated["status"];
      data["id"] = surveyDataUpdated["id"];
    })};

    setFile(surveyDataUpdated.image);    
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
