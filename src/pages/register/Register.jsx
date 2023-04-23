import { useContext, useState } from "react"; 
import "./register.scss"
import { createUserWithEmailAndPassword } from "firebase/auth";
//import { auth } from "../../firebase";
//import auth from "../../firebase";
//import { Password } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import primarycard from '../../assets/img/card-primary.png';
import { auth, db }  from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const Register = () => {

  const [error, setError] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext);

  const navigateLogin = () =>{  
    navigate("/login");
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(auth);
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(db);
    const citiesRef = collection(db, "users");
    console.log(citiesRef);
    
    try { 
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            //const colRef = collection(db, 'users')
            //console.log(colRef)
          
            const docRef = await addDoc(collection(db, "users"), {
              username: username,
              email: email
          });
          
            const user = userCredential.user;
            dispatch({type:"LOGIN", payload:user});
            console.log(user);
            navigate('/');
            console.log("Document written with ID: ", docRef.id);
        })
      } catch (e) {
        console.log("soumya")
        console.error("Error adding document: ", e);
    }

  };

  return (
    <div className="register-page">
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
            <a class="navbar-brand" href="javascript:void(0)">Login to Ciellie Portal</a>
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
              <a href="/" class="nav-link">
                  <i class="tim-icons icon-laptop"></i> Register
                </a>
               
              </li>
              <li class="nav-item ">
              <a href='javascript:void(0)' onClick={ navigateLogin } class="nav-link">
                  <i class="tim-icons icon-laptop"></i> Login
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
    <div class="full-page register-page">
      <div class="content">
        <div class="container">
          <div class="row">
            <div class="col-md-5 ml-auto">
              <div class="info-area info-horizontal mt-5">
                <div class="icon icon-warning">
                  <i class="tim-icons icon-wifi"></i>
                </div>
                <div class="description">
                  <h3 class="info-title">Cloud Portal</h3>
                  <p class="description">
                    Our Cloud-based portal makes it easy for team collaboration from anywhere.
                  </p>
                </div>
              </div>
              <div class="info-area info-horizontal">
                <div class="icon icon-primary">
                  <i class="tim-icons icon-triangle-right-17"></i>
                </div>
                <div class="description">
                  <h3 class="info-title">Book and View Surveys</h3>
                  <p class="description">
                    Seamless survey booking functionality to keep your team on-time and organized.
                  </p>
                </div>
              </div>
              <div class="info-area info-horizontal">
                <div class="icon icon-info">
                  <i class="tim-icons icon-trophy"></i>
                </div>
                <div class="description">
                  <h3 class="info-title">Built Audience</h3>
                  <p class="description">
                    There is also a Fully Customizable CMS Admin Dashboard for this product.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-7 mr-auto">
              <div class="card card-register card-white">
                <div class="card-header">
                  <img class="card-img" src={primarycard} alt="Card image" />
                  <h4 class="card-title">Register</h4>
                </div>
                <div class="card-body">
                  <form class="form" onSubmit={handleRegister}>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <i class="tim-icons icon-single-02"></i>
                        </div>
                      </div>
                      <input type="username" class="form-control" placeholder="username" onChange={e=>setUserName(e.target.value)}/>
                    </div>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <i class="tim-icons icon-email-85"></i>
                        </div>
                      </div>
                      <input type="email" class="form-control" placeholder="email" onChange={e=>setEmail(e.target.value)}/>
                    </div>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <i class="tim-icons icon-lock-circle"></i>
                        </div>
                      </div>
                      <input type="password" class="form-control" placeholder="password" onChange={e=>setPassword(e.target.value)} />
                    </div>
                    <button type="submit" class="btn btn-primary btn-round">Register</button>
                  </form>
                </div>
               </div>
             </div>
           </div>
          </div>
       </div>
      </div>
   </div>

  </div>
  )
}

export default Register