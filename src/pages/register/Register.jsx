import { useContext, useState } from "react"; 
import { Link } from "react-router-dom";
import "./register.scss"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import primarycard from '../../assets/img/card-primary.png';
import { auth, db }  from "../../firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

const Register = () => {
  const [error, setError] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    const citiesRef = collection(db, "users");
    
    try { 
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const docRef = await addDoc(collection(db, "users"), {
              username: username,
              email: email
          });

          const res = await setDoc(doc(db, "profiles", docRef.id),{
            name: username,
            email: email,
            phone: "",
            id: docRef.id,
            image: ""
          })

            userCredential.user.uid = docRef.id;
            const user = userCredential.user;
            dispatch({type:"REGISTER", payload:user});
            navigate('/');
        })
      } catch (e) {
        console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="register-page">
      <nav className="navbar navbar-expand-lg nav-transparent">
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
    <div className="full-page register-page">
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-5 ml-auto">
              <div className="info-area info-horizontal mt-5">
                <div className="icon icon-warning">
                  <i className="tim-icons icon-wifi"></i>
                </div>
                <div className="description">
                  <h3 className="info-title">Cloud Portal</h3>
                  <p className="description">
                    Our Cloud-based portal makes it easy for team collaboration from anywhere.
                  </p>
                </div>
              </div>
              <div className="info-area info-horizontal">
                <div className="icon icon-primary">
                  <i className="tim-icons icon-triangle-right-17"></i>
                </div>
                <div className="description">
                  <h3 className="info-title">Book and View Surveys</h3>
                  <p className="description">
                    Seamless survey booking functionality to keep your team on-time and organized.
                  </p>
                </div>
              </div>
              <div className="info-area info-horizontal">
                <div className="icon icon-info">
                  <i className="tim-icons icon-trophy"></i>
                </div>
                <div className="description">
                  <h3 className="info-title">Built Audience</h3>
                  <p className="description">
                    There is also a Fully Customizable CMS Admin Dashboard for this product.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-7 mr-auto">
              <div className="card card-register card-white">
                <div className="card-header">
                  <img className="card-img" src={primarycard} alt="Card image" />
                  <h4 className="card-title">Register</h4>
                </div>
                <div className="card-body">
                  <form className="form" onSubmit={handleRegister}>
                    <div className="input-group">
                      
                        <div className="input-group-text">
                          <i className="tim-icons icon-single-02"></i>
                        </div>
                      
                      <input type="username" className="form-control" placeholder="username" onChange={e=>setUserName(e.target.value)}/>
                    </div>
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
                    <button type="submit" className="btn btn-primary btn-round">Register</button>
                  </form>
                </div>
               </div>
             </div>
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

export default Register