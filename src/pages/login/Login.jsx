import { useContext, useState } from "react"; 
import { Link } from "react-router-dom";

import "../../assets/css/nucleo-icons.css"

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import primarycard from '../../assets/img/card-primary.png';

import { collection, getDocs } from "firebase/firestore"; 

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
          const querySnapshot = await getDocs(collection(db, "profiles"));
          querySnapshot.forEach((doc) => {
            if (doc.data().email === email){
              userCredential.user.uid = doc.data().id;
            }
          });
          const user = userCredential.user;
          dispatch({type:"LOGIN", payload:user});
          navigate('/');
      })
      .catch((error) => {
        setError(true);
      }
    );
  };

  return (
    <div className="login-page">
     <nav className="navbar navbar-expand-lg nav-transparent ">
    <div className="container-fluid">
      <div className="navbar-wrapper">
        <div className="navbar-toggle d-inline">
          <button type="button" className="navbar-toggler">
            <span className="navbar-toggler-bar bar1"></span>
            <span className="navbar-toggler-bar bar2"></span>
            <span className="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <Link className="navbar-brand textdecor">Login to Ciellie Portal</Link>
      </div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-bar navbar-kebab"></span>
        <span className="navbar-toggler-bar navbar-kebab"></span>
        <span className="navbar-toggler-bar navbar-kebab"></span>
      </button>
      <div className="collapse navbar-collapse" id="navigation">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link text-primary textdecor">
              <i className="tim-icons icon-minimal-left"></i> Back to Dashboard
            </Link>
          </li>
          <li className="nav-item ">
          <Link to="/register" className="nav-link textdecor">
              <i className="tim-icons icon-laptop"></i> Register
            </Link>
          </li>

          
          <li className="nav-item ">
          <Link  to="/login" className="nav-link textdecor">
              <i className="tim-icons icon-single-02"></i> Login
            </Link>
          </li>
          <li className="nav-item  active ">
          <Link to="/pricing" className="nav-link textdecor">
              <i className="tim-icons icon-coins"></i> Pricing
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

      <div className="wrapper wrapper-full-page ">
        <div className="full-page login-page ">
          <div className="content">
            <div className="container">
              <div className="col-lg-4 col-md-6 ml-auto mr-auto">
                <form onSubmit={handleLogin}>
                  <div className="card card-login card-white">
                    <div className="card-header">
                      <img src={primarycard} alt="" />
                      <h1 className="card-title">Log in</h1>
                    </div>
                    <div className="card-body">
                    
                        <div className="input-group">
                          
                            <div className="input-group-text">
                              <i className="tim-icons icon-email-85"></i>
                            </div>
                          
                          <input type="email" className="form-control" placeholder="email" onChange={e=>setEmail(e.target.value)}/>
                        </div>
                        <div className="input-group">
                          
                            <div className="input-group-text">
                              <i className="tim-icons icon-lock-circle"></i>
                            </div>
                            
                          <input type="password" className="form-control" placeholder="password" onChange={e=>setPassword(e.target.value)} />
                        </div>
                        <div className="card-footer">
                          <button className="btn btn-primary btn-lg btn-block mb-3" type="submit">Get Started</button>
                          {error && <span>Wrong email or password !</span>}
                        </div>

                        <div className="pull-left">
                          <h6>
                            <Link to="/register" className="link footer-link">Create Account</Link>
                          </h6>
                        </div>
                        <div className="pull-right">
                          <h6>
                            <Link to="/pricing" className="link footer-link">Need Help?</Link>
                          </h6>
                        </div>

                    
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
        <div className="container-fluid">
          <div className="copyright">
            © 2023 All rights Reserved. ciellie.com
          </div>
        </div>
      </footer>
        
    </div>
    
    
  </div>
  )
}

export default Login