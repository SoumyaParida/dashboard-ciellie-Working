import "./storageWidget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import Pricing from "../../pages/pricing/Pricing";
import { Link } from "react-router-dom";
import CloudCircleIcon from '@mui/icons-material/CloudCircle';

const StorageWidget = () => {
  let data;

  //temporary
  const _title = "150 GB";
  //const _description = "/200 GB";
  const diff = "/200 GB";
      data = {
        title: "Storage Used",
        isMoney: true,
        link: "Get more Storage",
        icon: (
          <CloudCircleIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
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
       
        <Link to="/pricing" className="linktitle">{data.link}</Link>
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

export default StorageWidget;
