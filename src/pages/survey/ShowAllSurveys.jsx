import "./showAllSurveys.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "./Datatable";

const ShowAllSurveys = () => {
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
                    
                </div>  
              </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <Datatable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowAllSurveys