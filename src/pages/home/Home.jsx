import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import StorageWidget from "../../components/widget/StorageWidget";
import ProjectWidget from "../../components/widget/ProjectWidget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        
        <div className="charts">
          
          <Chart title="Total Sites Surveyed" aspect={3 / 1} />
        </div>
        <div className="widgets">
          <Widget type="surveys" />
          <Widget type="model" />
          <ProjectWidget />
          <StorageWidget/>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
