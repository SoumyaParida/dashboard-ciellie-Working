import React from 'react'
import { Link } from 'react-router-dom';
//import "./pricing.scss";
import priceimg from "../../assets/img/card-primary.png";
import cardsuccess from "../../assets/img/card-success.png";
import cardwarning from "../../assets/img/card-warning.png";
import carddanger from "../../assets/img/card-danger.png";

const Pricing = () =>{
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-absolute navbar-transparent fixed-top">
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

    <div className="full-page pricing-page">
      <div className="content">
    <div className="container"> 
      <div className="col-md-6 ml-auto mr-auto text-center">
        <h1 className="title">Pick the best plan for you</h1>
        <h4 className="description">You have Free Unlimited Updates and Premium Support on each package.</h4>
      </div>

      <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="card card-pricing card-primary">
                <div className="card-body">
                  <h1 className="card-title">pro</h1>
                  <img className="card-img" src={priceimg} alt="Image" />
                  <ul className="list-group">
                    <li className="list-group-item">300 messages</li>
                    <li className="list-group-item">150 emails</li>
                    <li className="list-group-item">24/7 Support</li>
                  </ul>
                  <div className="card-prices">
                    <h3 className="text-on-front">
                      <span>$</span>95</h3>
                    <h5 className="text-on-back">95</h5>
                    &nbsp;&nbsp;
                    <p className="plan">Professional plan</p>
                  </div>
                </div>
                <div className="card-footer text-center mb-3 mt-3">
                  <button className="btn btn-round btn-just-icon btn-primary">Get started</button>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card card-pricing card-success">
                <div className="card-body">
                  <h1 className="card-title">basic</h1>
                  <img className="card-img" src={cardsuccess} alt="Image" />
                  <ul className="list-group">
                    <li className="list-group-item">50 messages</li>
                    <li className="list-group-item">100 emails</li>
                    <li className="list-group-item">24/7 Support</li>
                  </ul>
                  <div className="card-prices">
                    <h3 className="text-on-front">
                      <span>$</span>57</h3>
                    <h5 className="text-on-back">57</h5>
                    &nbsp;&nbsp;
                    <p className="plan">Basic plan</p>
                  </div>
                </div>
                <div className="card-footer text-center mb-3 mt-3">
                  <button className="btn btn-round btn-just-icon btn-success">Get started</button>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card card-pricing card-warning card-raised">
                <div className="card-body">
                  <h1 className="card-title">mid</h1>
                  <img className="card-img" src={cardwarning} alt="Image" />
                  <ul className="list-group">
                    <li className="list-group-item">200 messages</li>
                    <li className="list-group-item">130 emails</li>
                    <li className="list-group-item">24/7 Support</li>
                  </ul>
                  <div className="card-prices">
                    <h3 className="text-on-front">
                      <span>$</span>72</h3>
                    <h5 className="text-on-back">72</h5>
                    &nbsp;&nbsp;
                    <p className="plan">Medium plan</p>
                  </div>
                </div>
                <div className="card-footer text-center mb-3 mt-3">
                  <button className="btn btn-round btn-just-icon btn-warning">Get started</button>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card card-pricing card-danger">
                <div className="card-body">
                  <h1 className="card-title">trial</h1>
                  <img className="card-img" src={carddanger} alt="Image"/>
                  <ul className="list-group">
                    <li className="list-group-item">50 messages</li>
                    <li className="list-group-item">50 emails</li>
                    <li className="list-group-item">No Support</li>
                  </ul>
                  <div className="card-prices">
                    <h3 className="text-on-front">
                      <span>$</span>9</h3>
                    <h5 className="text-on-back">9</h5>
                    &nbsp;&nbsp;
                    <p className="plan">Trial plan</p>
                  </div>
                </div>
                <div className="card-footer text-center mb-3 mt-3">
                  <button className="btn btn-round btn-just-icon btn-danger">Get started</button>
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
  );
}

export default Pricing;
