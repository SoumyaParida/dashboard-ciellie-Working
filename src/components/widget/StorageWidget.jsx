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
  const [appliances, setAppliances] = useState([]);
  const [attic, setAttic] = useState([]);
  const [electrical, setElectrical] = useState([]);
  const [extraDetails, setExtraDetails] = useState([]);
  const [roof, setRoof] = useState([]);

  const { currentUser, dispatch } = useContext(AuthContext);
  let data;

  useEffect(() => {
    // access the db collection
    
    const fetchSurveyData = async() =>{
      let list = [];
      let storageFolders = [];
      var storageCount = 0;
      var storageAppliancesCount = 0;
      var storageAtticCount = 0;
      var storageElectricalCount = 0;
      var storageExtraDetailsCount = 0;
      var storageRoofCount = 0;

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

        //for (let i = 0; i < storageFolders.length; i++) {
          //const listRef = ref(storage, storageFolders[i] + "/" +  currentUser.uid + "/" + doc.data().id);
          const listRef = ref(storage, "Appliances/" +  currentUser.uid + "/" + doc.data().id);
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
                  storageAppliancesCount = storageAppliancesCount + metadata.size;
                  console.log("storageAppliancesCount", storageAppliancesCount);
                  setAppliances(storageAppliancesCount);
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

            const listAtticRef = ref(storage, "Attic/" +  currentUser.uid + "/" + doc.data().id);
            listAll(listAtticRef)
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
                  storageAtticCount = storageAtticCount + metadata.size;
                  console.log("storageAtticCount", storageAtticCount);
                  setAttic(storageAtticCount);
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

            const listElectricalRef = ref(storage, "Electrical/" +  currentUser.uid + "/" + doc.data().id);
            listAll(listElectricalRef)
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
                  storageElectricalCount = storageElectricalCount + metadata.size;
                  console.log("storageElectricalCount", storageElectricalCount);
                  setElectrical(storageElectricalCount);
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

            const listExtraDetailsRef = ref(storage, "ExtraDetails/" +  currentUser.uid + "/" + doc.data().id);
            listAll(listExtraDetailsRef)
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
                  storageExtraDetailsCount = storageExtraDetailsCount + metadata.size;
                  console.log("storageExtraDetailsCount", storageExtraDetailsCount);
                  setExtraDetails(storageExtraDetailsCount);
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

            const listRoofRef = ref(storage, "Roof/" +  currentUser.uid + "/" + doc.data().id);
            listAll(listRoofRef)
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
                  storageRoofCount = storageRoofCount + metadata.size;
                  console.log("storageRoofCount", storageRoofCount);
                  setRoof(storageRoofCount);
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
            //storageCount = storageAppliancesCount + storageAtticCount + storageElectricalCount + storageExtraDetailsCount + storageRoofCount;
            //setStorage(storageCount);
            //      }  
      });
      
    }
    fetchSurveyData()
  },[])
  //const querySnapshot = storage.ref("/Appliances").child(currentUser.uid).listAll()

  console.log()

  
   var storageValueInMB =  Math.round((appliances +  attic + electrical + extraDetails + roof) / 1000000).toFixed(2); 
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
    <div class="card card-stats">
              <div class="card-body">
                <div class="row">
                  <div class="col-5">
                    <div class="info-icon text-center icon-danger">
                      <i class="tim-icons icon-coins"></i>
                    </div>
                  </div>
                  <div class="col-7">
                    <div class="numbers">
                      <p class="card-category">{data.title}</p>
                      <h3 class="card-title">{_title}</h3> 
                      <p class="card-category">{diff}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <hr />
                <div class="stats">
                <Link to="/pricing" className="linktitle">{data.link}</Link>
                </div>
              </div>
            </div>
    
  );
};

export default StorageWidget;
