import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import List from "./pages/list/List";
import SurveyList from "./pages/list/SurveyList";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Profile from "./pages/profile/Profile";
import Pricing from "./pages/pricing/Pricing";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";

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
            <Route path="/profile" element = {<Profile />} />
            
            <Route path="users">
              <Route index element={<RequireAuth><List /></RequireAuth>} />
              <Route path=":userId" element={<RequireAuth><Single /></RequireAuth>} />
              <Route
                path="new"
                element={<RequireAuth><New inputs={userInputs} title="Add New User" /></RequireAuth>}
              />
            </Route>
            
            <Route path="surveys">
              <Route index element={<RequireAuth><SurveyList /></RequireAuth>} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
