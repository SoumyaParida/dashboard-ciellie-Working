import "./scheduleSurvey.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { Link } from "react-router-dom";
import {  useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const ScheduleSurvey = ({ inputs, title }) => {
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);
  const navigate = useNavigate()

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value, "id": uuidv4(), "status": "scheduled"});
    //console.log("...data", ...data);
  }

  //console.log(data);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value, "id": uuidv4(), "status": "scheduled"});
    //console.log("...data", data);

    navigate("./files", { state: { surveyData: data } });
  };

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
                      <div className="stepper-item completed">
                      <Link to="#account" data-toggle="tab"></Link>
                      <div className="step-counter"> <i className="tim-icons icon-settings-gear-63"></i></div>
                      <div className="step-name">FILES</div>
                     
                    </div>
                    <div className="stepper-item completed">
                    <Link to="/#address" data-toggle="tab"></Link>
                    <div className="step-counter"> <i className="tim-icons icon-delivery-fast"></i></div>
                      <div className="step-name">ADDRESS</div>
                    </div>
                    <div className="stepper-item completed">

                  </div>
                  
            </div>
          </div>


                  <div className="card-body">
                  <div className="tab-content">
                    <div className="tab-pane show active" id="info">
                      <h5 className="info-text"> Basic Site Information</h5>
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
                    <input type='button' className='btn btn-next btn-fill btn-green btn-wd' name='next' value='Next' disabled={per!=null && per<1} onClick={handleUpdate} />
                    
                      
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

export default ScheduleSurvey;
