import { useContext, useState } from "react"; 

import "./login.scss"
//import "../../assets/css/black-dashboard.css"
import "../../assets/css/nucleo-icons.css"

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
//import db from "../../firebase";

import { Password } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import primarycard from '../../assets/img/card-primary.png';

import Register from "../register/Register";
import { collection, getDocs } from "firebase/firestore"; 

const Login = () => {

  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext);

  const navigateRegister = () =>{  
    navigate("/register");
    //navigate("/");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(auth);
    console.log(email);
    console.log(password);

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
          //Signed in
          const user = userCredential.user;

          /*const querySnapshot = await getDocs(collection(db, "users"));
          querySnapshot.forEach((doc) => {
            console.log('${doc.id} => ${doc.data()}');
          });*/
          
          dispatch({type:"LOGIN", payload:user});
          console.log(user);
          navigate('/');
      })
      .catch((error) => {
        setError(true);
      }
    );

    /*const querySnapshot = await getDocs(collection(db, "users"));
          querySnapshot.forEach((doc) => {
            console.log(doc.id);
          });*/
  };

  return (
    <div className="login-page">
     <nav class="navbar navbar-expand-lg navbar-absolute navbar-transparent fixed-top">
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div class="navbar-toggle d-inline">
          <button type="button" class="navbar-toggler">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand" href="javascript:void(0)">Pricing Page</a>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>
      <div class="collapse navbar-collapse" id="navigation">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="../dashboard.html" class="nav-link text-primary">
              <i class="tim-icons icon-minimal-left"></i> Back to Dashboard
            </a>
          </li>
          <li class="nav-item ">
          <a href='javascript:void(0)' onClick={ navigateRegister } class="nav-link">
              <i class="tim-icons icon-laptop"></i> Register
            </a>
          </li>
          <li class="nav-item ">
            <a href="login.html" class="nav-link">
              <i class="tim-icons icon-single-02"></i> Login
            </a>
          </li>
          <li class="nav-item  active ">
            <a href="pricing.html" class="nav-link">
              <i class="tim-icons icon-coins"></i> Pricing
            </a>
          </li>
          <li class="nav-item ">
            <a href="lock.html" class="nav-link">
              <i class="tim-icons icon-lock-circle"></i> Lock
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
      <div class="modal modal-search fade" id="searchModal" tabindex="-1" role="dialog" aria-labelledby="searchModal" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="SEARCH" />
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <i class="tim-icons icon-simple-remove"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper wrapper-full-page ">
        <div class="full-page login-page ">
          <div class="content">
            <div class="container">
              <div class="col-lg-4 col-md-6 ml-auto mr-auto">
                <form onSubmit={handleLogin}>
                  <div class="card card-login card-white">
                    <div class="card-header">
                      <img src={primarycard} alt="" />
                      <h1 class="card-title">Log in</h1>
                    </div>
                    <div class="card-body">
                        <div class="input-group">
                         
                            <div class="input-group-text">
                              <i class="tim-icons icon-email-85"></i>
                            </div>
                          
                          <input type="email" class="form-control" placeholder="email" onChange={e=>setEmail(e.target.value)}/>
                        </div>
                        <div class="input-group">
                          
                            <div class="input-group-text">
                              <i class="tim-icons icon-lock-circle"></i>
                            </div>
                          
                          <input type="password" class="form-control" placeholder="password" onChange={e=>setPassword(e.target.value)} />
                        </div>
                        <div class="card-footer">
                          <button class="btn btn-primary btn-lg btn-block mb-3" type="submit">Get Started</button>
                          {error && <span>Wrong email or password !</span>}
                        </div>

                        <div class="pull-left">
                          <h6>
                            <a href="..\..\examples\pages\register.html" class="link footer-link">Create Account</a>
                          </h6>
                        </div>
                        <div class="pull-right">
                          <h6>
                            <a href="../../examples/pages/pricing.html" class="link footer-link">Need Help?</a>
                          </h6>
                        </div>

                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>

    
  </div>
  )
}

export default Login