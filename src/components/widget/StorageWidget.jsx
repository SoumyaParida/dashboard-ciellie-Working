import "./storageWidget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import Pricing from "../../pages/pricing/Pricing";
import { Link } from "react-router-dom";
import CloudCircleIcon from '@mui/icons-material/CloudCircle';

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { ref, uploadBytesResumable, getDownloadURL,getMetadata, listAll } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";

const StorageWidget = () => {
  const [storagevalue, setStorage] = useState([]);
  const { currentUser, dispatch } = useContext(AuthContext);
  let data;

  useEffect(() => {
    // access the db collection
    
    const fetchSurveyData = async() =>{
      let list = [];
      let storageFolders = [];
      var storageCount = 0;

      console.log("currentUser.uid" + currentUser.uid);
      const querySnapshot = await getDocs(collection(db, "surveys", currentUser.uid, "survey"));
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        console.log(doc.data().id);
        storageFolders.push("Appliances");
        storageFolders.push("Attic");
        storageFolders.push("Electrical");
        storageFolders.push("ExtraDetails");
        storageFolders.push("Roof");
        
        const listRef = ref(storage, "Appliances/"+  currentUser.uid + "/" + doc.data().id);

        listAll(listRef)
          .then((res) => {
            res.prefixes.forEach((folderRef) => {
              // All the prefixes under listRef.
              // You may call listAll() recursively on them.
              listAll(folderRef);
            });
            res.items.forEach((itemRef) => {
              getMetadata(itemRef)
              .then((metadata) => {
                // Metadata now contains the metadata for 'images/forest.jpg'
                console.log("metadat details:", metadata.size);
                storageCount = storageCount + metadata.size;
                console.log("storageCount", storageCount);
                setStorage(storageCount);
              })
              .catch((error) => {
                // Uh-oh, an error occurred!
                console.log(error);
              });
            });
          }).catch((err) => {
            // Uh-oh, an error occurred!
            console.log(err);
          });
          
      });
    }
    fetchSurveyData()
  },[])
  //const querySnapshot = storage.ref("/Appliances").child(currentUser.uid).listAll()

  console.log()

  
   var storageValueInMB =  Math.round(storagevalue / 1000000).toFixed(2); 
  //temporary
  const _title = storageValueInMB.toString() + " MB";
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
