import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Pricing from "./pages/pricing/Pricing";
import ShowAllSurveys from "./pages/survey/ShowAllSurveys";
import ViewSingleSurvey from "./pages/survey/ViewSingleSurvey";
import ScheduleSurvey from "./pages/survey/ScheduleSurvey";
import UploadFile from "./pages/survey/UploadFile";
import GenerateScheduleSurvey from "./pages/survey/GenerateScheduleSurvey";
import Timeline from "./pages/3Dmodel/Timeline";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs, surveyInputs, surveyAddressInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Appliances from "./components/folderStructure/Appliances";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext);
  
  //const currentUser = false;

  const RequireAuth = ({children}) => {
    return currentUser ? children : <Navigate to = "/login" />;
  }


  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path = "login" element = {<Login />} />
            <Route path = "register" element = {<Register />} />
            <Route index element= {<RequireAuth><Home /></RequireAuth>} />
            <Route path="/folderimages" element = {<Appliances />} />
            <Route path="profile" element={<RequireAuth><Profile inputs={userInputs} title="Edit Profile" /></RequireAuth>}/>
            <Route path="surveys">
              <Route index element={<RequireAuth><ShowAllSurveys /></RequireAuth>} />
              <Route path="view" element={<RequireAuth><ViewSingleSurvey /></RequireAuth>} />
              <Route
                path="newsurvey"
                element={<RequireAuth><ScheduleSurvey inputs={surveyInputs} title="Schedule a new Survey" /></RequireAuth>}
              />
                <Route
                path="newsurvey/files"
                element={<RequireAuth><UploadFile title="Schedule a new Survey" /></RequireAuth>}
              />
                <Route
                path="newsurvey/files/address"
                element={<RequireAuth><GenerateScheduleSurvey inputs={surveyAddressInputs} title="Schedule a new Survey" /></RequireAuth>}
              />
            </Route>
            <Route path="pricing" element = {<Pricing />} />
            <Route path="timeline" element = {<Timeline />} />
          </Route>  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
