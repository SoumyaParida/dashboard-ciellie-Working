import "./folderStructure.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import imagePlaceholder from "../../assets/img/images.png";
import { useNavigate } from "react-router-dom";

import { ref, uploadBytesResumable, getDownloadURL,getMetadata, listAll } from "firebase/storage";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const FolderStructure = ({inputs}) => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()
  console.log("folder startcure", inputs.id)
  var list = []

  const handleCLick = async (e) =>{
    e.preventDefault();
    console.log("list", list);
    navigate("/appliance", { state: { infoId: inputs } });
  }

  
  return (
    <div class="fileinput-new thumbnail row">
        <Link class="column" onClick={handleCLick}>
        <figure>
            <img
              src={
                imagePlaceholder
              }
              alt="Appliances" height="150" width="150"
              />
            <figcaption><p><b>Appliances</b></p></figcaption>
        </figure></Link>

        <Link class="column">
        <figure>
            <img
              src={
                  imagePlaceholder
              }
              alt="Attic" height="150" width="150"
              />
            <figcaption><p><b>Attic</b></p></figcaption>
        </figure></Link>

        <Link class="column">
        <figure>
            <img
              src={
                  imagePlaceholder
              }
              alt="Electrical" height="150" width="150"
              />
            <figcaption><p><b>Electrical</b></p></figcaption>
        </figure></Link>

        <Link class="column">
        <figure>
            <img
              src={
                  imagePlaceholder
              }
              alt="Roof" height="150" width="150"
              />
            <figcaption><p><b>Roof</b></p></figcaption>
        </figure></Link>

        <Link class="column">
        <figure>
            <img
              src={
                  imagePlaceholder
              }
              alt="ExtraDetails" height="150" width="150"
              />
            <figcaption><p><b>ExtraDetails</b></p></figcaption>
        </figure></Link>
    </div>
  );
};

export default FolderStructure;
