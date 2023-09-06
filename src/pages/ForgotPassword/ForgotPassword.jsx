import React from "react";
import Logo from "../../assets/images/logo.png";

import "./ForgotPassword.scss";
const ForgotPassword = () => {
  return (
    <div class="vh-100">
      <nav class="navbar navbar-light px-5 mb-5 pt-4">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <img src={Logo} style={{ height: 30 }} alt="" />
          </a>
        </div>
      </nav>
      <div class="container pt-5">
        <div class="row">
          <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card border-0 shadow-lg rounded-3 my-5">
              <div class="card-body p-4 p-sm-5 ">
                <h2 class="card-title text-center text-uppercase mb-2 fw-bold fs-5">
                  Reset your password
                </h2>
                <p class="fw-italic text-muted">
                  Please enter your email address below, we will promptly send
                  you a passcode to reset your password
                </p>
                <form>
                  <div class="ipt-forgot-password mb-3">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email"
                    />
                  </div>

                  <div class="d-grid">
                    <button
                      class="btn btn-forgot-password text-uppercase fw-bold"
                      type="submit"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
