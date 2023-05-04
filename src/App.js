import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import List from "./pages/list/List";
import SurveyList from "./pages/list/SurveyList";
import Single from "./pages/single/Single";
import SurveySingle from "./pages/single/SurveySingle";
import New from "./pages/new/New";
import NewSurvey from "./pages/new/NewSurvey";
import NewSurveyFiles from "./pages/new/NewSurveyFiles";
import ScheduleAddressForm from "./pages/new/ScheduleAddressForm";
import Profile from "./pages/profile/Profile";
import Pricing from "./pages/pricing/Pricing";
import Widget from "./pages/widget/Widget";
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
            
            <Route path="users">
              <Route index element={<RequireAuth><List /></RequireAuth>} />
              <Route path=":userId" element={<RequireAuth><Single /></RequireAuth>} />
              <Route
                path="new"
                element={<RequireAuth><New inputs={userInputs} title="Edit Profile" /></RequireAuth>}
              />
            </Route>
            
            <Route path="surveys">
              <Route index element={<RequireAuth><SurveyList /></RequireAuth>} />
              <Route path=":surveyId" element={<RequireAuth><SurveySingle /></RequireAuth>} />
              
              
              <Route
                path="newsurvey"
                element={<RequireAuth><NewSurvey inputs={surveyInputs} title="Schedule a new Survey" /></RequireAuth>}
              />

                <Route
                path="newsurvey/files"
                element={<RequireAuth><NewSurveyFiles title="Schedule a new Survey" /></RequireAuth>}
              />

                <Route
                path="newsurvey/files/address"
                element={<RequireAuth><ScheduleAddressForm inputs={surveyAddressInputs} title="Schedule a new Survey" /></RequireAuth>}
              />
            </Route>
            
            
            <Route path="products">
              <Route index element={<RequireAuth><List /></RequireAuth>} />
              <Route path=":productId" element={<RequireAuth><Single /></RequireAuth>} />
              <Route
                path="new"
                element={<RequireAuth><New inputs={productInputs} title="Add New Product" /></RequireAuth>}
              />
            </Route>
          </Route>
          <Route path="pricing" element = {<Pricing />} />
          <Route path="widget" element = {<Widget />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
