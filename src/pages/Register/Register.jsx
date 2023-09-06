import React from "react";
import Logo from "../../assets/images/logo.png";
import "./Register.scss";

const Register = () => {
  return (
    <div class=" vh-100 ">
      <nav class="navbar navbar-light px-5 mb-5 pt-4">
        <div class="container-fluid p-0">
          <a class="navbar-brand" href="/">
            <img src={Logo} style={{ height: 30 }} alt="" />
          </a>
        </div>
      </nav>
      <div class="container">
        <div class="row">
          <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card border-0 shadow-lg rounded-3 my-5">
              <div class="card-body p-4 p-sm-5 ">
                <h2 class="card-title text-center text-uppercase mb-5 fw-bold fs-5">
                  Create an account
                </h2>
                <form>
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <div class="form-outline">
                        <input
                          type="text"
                          id="firstName"
                          class="form-control"
                          placeholder="First name"
                        />
                      </div>
                    </div>

                    <div class="col-md-6 mb-3">
                      <div class="form-outline">
                        <input
                          type="text"
                          id="lastName"
                          class="form-control"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="ipt-register mb-3">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email"
                    />
                  </div>

                  <div class="ipt-register mb-3">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                    />
                  </div>

                  <div class="ipt-login mb-5">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Repeat Password"
                    />
                  </div>

                  <div class="d-grid">
                    <button
                      class="btn btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Sign up
                    </button>
                  </div>

                  <hr class="my-4" />

                  <div class="d-grid mb-5">
                    <button
                      class="btn btn-google btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Continue with Google
                    </button>
                  </div>
                  <div class="d-flex justify-content-center">
                    <p class="form-check-label">
                      Already have an account? <a href="/">Sign up now</a>
                    </p>
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

export default Register;
