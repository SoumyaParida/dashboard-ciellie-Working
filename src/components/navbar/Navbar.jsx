import "./navbar.scss";
import { useContext } from "react";
import { useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async() =>{
      //console.log("currentUser.uid" + currentUser.uid);
      const docRef = doc(db, "profiles", currentUser.uid);
      //console.log(docRef);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        //const docRef_profile = doc(db, "users", currentUser.uid);
        //const docSnap_profile = await getDoc(docRef_profile);
        //console.log("Document data:", docSnap.data());
        //list.push({ id: docSnap.id, ...docSnap.data()});
        //console.log("Document data:", docSnap.data());
        //console.log("Document data:", docSnap.data()['image']);
        setData(docSnap.data().image);
        setName(docSnap.data().name)
        //setData
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      
    }
    fetchData()
  })

  return (
    <div className="navbar navbar-expand-lg navbar-absolute navbar-transparent">
        <div className="container-fluid">
          <div className="navbar-wrapper">
            <div className="navbar-minimize d-inline">
              <button className="minimize-sidebar btn btn-link btn-just-icon" rel="tooltip" data-original-title="Sidebar toggle" data-placement="right">
                <i className="tim-icons icon-align-center visible-on-sidebar-regular"></i>
                <i className="tim-icons icon-bullet-list-67 visible-on-sidebar-mini"></i>
              </button>
            </div>
            <div className="navbar-toggle d-inline">
              <button type="button" className="navbar-toggler">
                <span className="navbar-toggler-bar bar1"></span>
                <span className="navbar-toggler-bar bar2"></span>
                <span className="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <span className="navbar-brand">Welcome back {name} !!</span>
           
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-bar navbar-kebab"></span>
            <span className="navbar-toggler-bar navbar-kebab"></span>
            <span className="navbar-toggler-bar navbar-kebab"></span>
          </button>
          <div className="collapse navbar-collapse" id="navigation">
            <ul className="navbar-nav ml-auto">
             
              <li className="dropdown nav-item">
                
                 
                            <img
                        src={data}
                        alt=""
                        className="imgNavbar"
                      />
                  
                  
                  
                
                
              </li>
              
            </ul>
          </div>
        </div>
      </div>
  );
};

export default Navbar;
