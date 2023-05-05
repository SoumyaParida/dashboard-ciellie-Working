import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";

import StorageWidget from "../../components/widget/StorageWidget";
import ProjectWidget from "../../components/widget/ProjectWidget";
import ModelWidget from "../../components/widget/ModelWidget";
import SurveyThisMonth from "../../components/widget/SurveyThisMonth";
import Chart from "../../components/chart/Chart";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      
      <div className="homeContainer">
      
      <Navbar />

      <div className="content">

        <div className="charts">
          
          <Chart title="Total Sites Surveyed" aspect={3 / 1} />
        </div>
        <div className="widgets">
          <SurveyThisMonth />
          <ModelWidget />
          <ProjectWidget />
          <StorageWidget/>
        </div>

        
      </div>
    </div>
    </div>
  );
};

export default Home;
