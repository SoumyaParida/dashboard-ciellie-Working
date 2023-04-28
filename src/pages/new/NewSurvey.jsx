import "./newsurvey.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { addDoc, doc, getDoc, setDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const NewSurvey = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);
  const { currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value, "id": uuidv4(), "status": "scheduled"});
    //console.log("...data", ...data);
  }

  console.log(data);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try{
      console.log("currentUser.uid" + currentUser.uid);
      const querySnapshot = await addDoc(collection(db, "surveys", currentUser.uid, "survey"),{
        ...data
      });
      navigate(-1)
      console.log("Survey Document written with ID: ", querySnapshot.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          
          <div className="right">
            <form>
              

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleInput}/>
                </div>
              ))}
              <button disabled={per!=null && per<1} onClick={handleUpdate}>Send</button>
            </form>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default NewSurvey;
