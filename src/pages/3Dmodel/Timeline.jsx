import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./timeline.scss";

const Timeline = () =>{
  return (
    <div className="widgetnew">
      <Sidebar />
      <div className="widgetContainernew">
      <Navbar />

      <div className="content">
      <div className="center col-lg-6 col-sm-6">
            <div className="card card-timeline card-plain">
              <div className="card-body">
                <ul className="timeline timeline-simple">
                  <li className="timeline-inverted">
                    <div className="timeline-badge danger">
                      <i className="tim-icons icon-minimal-down"></i>
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <span className="badge badge-danger">Currently</span>
                      </div>
                      <div className="timeline-body">
                        <p>Current description</p>
                      </div>
                      <h6>
                        <i className="ti-time"></i> Last Updated: April 5th, 2023
                      </h6>
                    </div>
                  </li>
                  <li className="timeline-inverted">
                    <div className="timeline-badge success">
                      <i className="tim-icons icon-minimal-down"></i>
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <span className="badge badge-success">Next Update</span>
                      </div>
                      <div className="timeline-body">
                        <p>Description of next update</p>
                      </div>
                      <h6>
                        <i className="ti-time"></i> Release Date: TBD
                      </h6>  
                    </div>
                  </li>
                  <li className="timeline-inverted">
                    <div className="timeline-badge info">
                      <i className="tim-icons icon-minimal-down"></i>
                    </div>
                    <div className="timeline-panel">
                      <div className="timeline-heading">
                        <span className="badge badge-info">Future Features</span>
                      </div>
                      <div className="timeline-body">
                        <p>Description of future plans</p>
                        <h6>
                          <i className="ti-time"></i> Release Date: TBD
                        </h6>         
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          </div>
      
      </div>
    </div> 
  );
}

export default Timeline;
