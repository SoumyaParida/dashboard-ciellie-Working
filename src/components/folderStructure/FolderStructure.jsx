import "./folderStructure.scss";
import { Link } from "react-router-dom";

import imagePlaceholder from "../../assets/img/images.png";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const FolderStructure = ({inputs}) => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()
  //console.log("folder startcure", inputs)
  var list = []

  const handleAppliances = (item) => async (e) =>{
    console.log("value of item", item);
    e.preventDefault();
    if (item == "appliances"){
      navigate("/folderimages", { state: { infoId: inputs[0], title: "Appliances" } });
    }
    else if (item == "attic"){
      navigate("/folderimages", { state: { infoId: inputs[1], title: "Attic" } });
    }
    else if (item == "electrical"){
      navigate("/folderimages", { state: { infoId: inputs[2], title: "Electrical" } });
    }
    else if (item == "roof"){
      navigate("/folderimages", { state: { infoId: inputs[3],  title: "Roof" } });
    }
    else if (item == "extraDetails"){
      navigate("/folderimages", { state: { infoId: inputs[4],  title: "ExtraDetails" } });
    }
    
  }
  
  return (
    <div className="fileinput-new thumbnail row">
        <Link className="column" onClick={handleAppliances("appliances")}>
        <figure>
            <img
              src={
                imagePlaceholder
              }
              alt="Appliances" height="150" width="150"
              />
            <figcaption><p><b>Appliances</b></p></figcaption>
        </figure></Link>

        <Link className="column" onClick={handleAppliances("attic")}>
        <figure>
            <img
              src={
                  imagePlaceholder
              }
              alt="Attic" height="150" width="150"
              />
            <figcaption><p><b>Attic</b></p></figcaption>
        </figure></Link>

        <Link className="column" onClick={handleAppliances("electrical")}>
        <figure>
            <img
              src={
                  imagePlaceholder
              }
              alt="Electrical" height="150" width="150"
              />
            <figcaption><p><b>Electrical</b></p></figcaption>
        </figure></Link>

        <Link className="column" onClick={handleAppliances("roof")}>
        <figure>
            <img
              src={
                  imagePlaceholder
              }
              alt="Roof" height="150" width="150"
              />
            <figcaption><p><b>Roof</b></p></figcaption>
        </figure></Link>

        <Link className="column" onClick={handleAppliances("extraDetails")}>
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
