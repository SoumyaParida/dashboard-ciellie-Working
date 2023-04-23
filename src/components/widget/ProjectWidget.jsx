import "./projectWidget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import Pricing from "../../pages/pricing/Pricing";
//import Survey from 
import { Link } from "react-router-dom";

const ProjectWidget = () => {
  let data;

  //temporary
  const _title = 100;
  //const _description = "/200 GB";
  const diff = 20;
  data = {
    title: "Projects Complete",
    isMoney: false,
    link: "Projects",
    icon: (
      <ShoppingCartOutlinedIcon
        className="icon"
        style={{
          backgroundColor: "rgba(218, 165, 32, 0.2)",
          color: "goldenrod",
        }}
      />
    ),
  };
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
            {_title}
        </span>
       
        <Link to="/surveys" className="linktitle">{data.link}</Link>
      </div>
      <div className="right">
        <div className="percentage positive">
            <span className="title">{diff}</span>
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default ProjectWidget;
