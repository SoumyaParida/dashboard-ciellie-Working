import "./surveylist.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import SurveyDatatable from "../../components/datatable/SurveyDatatable"

const SurveyList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <div className="content">
          <div className="col-md-10 mr-auto ml-auto">
              <div className="card card-plain">
                <div className="card-header text-center">
                    <h2 className="card-title">
                      Projects
                    </h2>
                    <h5 className="description">After the survey is created...the site information should show up here. See below this paragraph for documentation.</h5>
                    <p><h5>A beautiful plugin, highly flexible tool build upon the foundations of progressive enhancement, that adds all of these advanced features to any HTML table. Handcrafted by our friends. Please check out the full documentation.</h5></p>
                </div>  
              </div>
          </div>
          <div class="row mt-5">
            <div class="col-md-12">
              <div class="card">
                <div class="card-body">
                  <SurveyDatatable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SurveyList