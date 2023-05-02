import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./widget.scss";
import priceimg from "../../assets/img/card-primary.png";
import cardsuccess from "../../assets/img/card-success.png";
import cardwarning from "../../assets/img/card-warning.png";
import carddanger from "../../assets/img/card-danger.png";

const Widget = () =>{
  return (
    <div className="widgetnew">
      <Sidebar />
      
      <div className="widgetContainernew">
      
      <Navbar />
      <div className="content">
      <div class="center col-lg-6 col-sm-6">
            <div class="card card-timeline card-plain">
              <div class="card-body">
                <ul class="timeline timeline-simple">
                  <li class="timeline-inverted">
                    <div class="timeline-badge danger">
                      <i class="tim-icons icon-minimal-down"></i>
                    </div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <span class="badge badge-danger">Currently</span>
                      </div>
                      <div class="timeline-body">
                        <p>Current description</p>
                      </div>
                      <h6>
                        <i class="ti-time"></i> Last Updated: April 5th, 2023
                      </h6>
                    </div>
                  </li>
                  <li class="timeline-inverted">
                    <div class="timeline-badge success">
                      <i class="tim-icons icon-minimal-down"></i>
                    </div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <span class="badge badge-success">Next Update</span>
                      </div>
                      <div class="timeline-body">
                        <p>Description of next update</p>
                      </div>
                      <h6>
                        <i class="ti-time"></i> Release Date: TBD
                      </h6>  
                    </div>
                  </li>
                  <li class="timeline-inverted">
                    <div class="timeline-badge info">
                      <i class="tim-icons icon-minimal-down"></i>
                    </div>
                    <div class="timeline-panel">
                      <div class="timeline-heading">
                        <span class="badge badge-info">Future Features</span>
                      </div>
                      <div class="timeline-body">
                        <p>Description of future plans</p>
                        <h6>
                          <i class="ti-time"></i> Release Date: TBD
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

export default Widget;
