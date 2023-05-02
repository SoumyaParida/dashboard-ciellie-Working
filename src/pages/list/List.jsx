import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <div className="content">
          <div className="col-md-10 mr-auto ml-auto">
              <div className="card card-plain">
                <div className="card-header text-center">
                    <h3 className="card-title">
                      Schedule a Solar Site Survey
                    </h3>
                    <h5 className="description">This information will let us know more about the site we are surveying.</h5>
                </div>  
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List