import "./completedSurveyList.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import SurveyDatatable from "../../components/datatable/SurveyDatatable"

const CompletedSurveyList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <SurveyDatatable/>
      </div>
    </div>
  )
}

export default CompletedSurveyList