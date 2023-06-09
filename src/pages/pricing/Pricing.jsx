import React from 'react'
import "./pricing.scss";
import priceimg from "../../assets/img/card-primary.png";
import cardsuccess from "../../assets/img/card-success.png";
import cardwarning from "../../assets/img/card-warning.png";
import carddanger from "../../assets/img/card-danger.png";

const Pricing = () =>{
  return (
    <div>
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
            <a href="register.html" class="nav-link">
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
    
    <div class="full-page pricing-page">
      <div class="content">
    <div class="container"> 
      <div class="col-md-6 ml-auto mr-auto text-center">
        <h1 class="title">Pick the best plan for you</h1>
        <h4 class="description">You have Free Unlimited Updates and Premium Support on each package.</h4>
      </div>

      <div class="row">
            <div class="col-lg-3 col-md-6">
              <div class="card card-pricing card-primary">
                <div class="card-body">
                  <h1 class="card-title">pro</h1>
                  <img class="card-img" src={priceimg} alt="Image" />
                  <ul class="list-group">
                    <li class="list-group-item">300 messages</li>
                    <li class="list-group-item">150 emails</li>
                    <li class="list-group-item">24/7 Support</li>
                  </ul>
                  <div class="card-prices">
                    <h3 class="text-on-front">
                      <span>$</span>95</h3>
                    <h5 class="text-on-back">95</h5>
                    &nbsp;&nbsp;
                    <p class="plan">Professional plan</p>
                  </div>
                </div>
                <div class="card-footer text-center mb-3 mt-3">
                  <button class="btn btn-round btn-just-icon btn-primary">Get started</button>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-6">
              <div class="card card-pricing card-success card-white">
                <div class="card-body">
                  <h1 class="card-title">basic</h1>
                  <img class="card-img" src={cardsuccess} alt="Image" />
                  <ul class="list-group">
                    <li class="list-group-item">50 messages</li>
                    <li class="list-group-item">100 emails</li>
                    <li class="list-group-item">24/7 Support</li>
                  </ul>
                  <div class="card-prices">
                    <h3 class="text-on-front">
                      <span>$</span>57</h3>
                    <h5 class="text-on-back">57</h5>
                    &nbsp;&nbsp;
                    <p class="plan">Basic plan</p>
                  </div>
                </div>
                <div class="card-footer text-center mb-3 mt-3">
                  <button class="btn btn-round btn-just-icon btn-success">Get started</button>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-6">
              <div class="card card-pricing card-warning card-raised card-white">
                <div class="card-body">
                  <h1 class="card-title">mid</h1>
                  <img class="card-img" src={cardwarning} alt="Image" />
                  <ul class="list-group">
                    <li class="list-group-item">200 messages</li>
                    <li class="list-group-item">130 emails</li>
                    <li class="list-group-item">24/7 Support</li>
                  </ul>
                  <div class="card-prices">
                    <h3 class="text-on-front">
                      <span>$</span>72</h3>
                    <h5 class="text-on-back">72</h5>
                    &nbsp;&nbsp;
                    <p class="plan">Medium plan</p>
                  </div>
                </div>
                <div class="card-footer text-center mb-3 mt-3">
                  <button class="btn btn-round btn-just-icon btn-warning">Get started</button>
                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-6">
              <div class="card card-pricing card-danger card-white">
                <div class="card-body">
                  <h1 class="card-title">trial</h1>
                  <img class="card-img" src={carddanger} alt="Image"/>
                  <ul class="list-group">
                    <li class="list-group-item">50 messages</li>
                    <li class="list-group-item">50 emails</li>
                    <li class="list-group-item">No Support</li>
                  </ul>
                  <div class="card-prices">
                    <h3 class="text-on-front">
                      <span>$</span>9</h3>
                    <h5 class="text-on-back">9</h5>
                    &nbsp;&nbsp;
                    <p class="plan">Trial plan</p>
                  </div>
                </div>
                <div class="card-footer text-center mb-3 mt-3">
                  <button class="btn btn-round btn-just-icon btn-danger">Get started</button>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>    
  </div>   
  );
}

export default Pricing;
