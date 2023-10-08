import React from "react";
import Logo from "../../assets/images/logo.png";
import "bootstrap/dist/css/bootstrap.css";
import classNames from "classnames";
import Styles from "./Register.module.scss";

const Register = () => {
  return (
    <div className=" vh-100 ">
      <nav className="navbar navbar-light px-5 mb-5 pt-4">
        <div className="container-fluid p-0">
          <a className="navbar-brand" href="/">
            <img src={Logo} style={{ height: 30 }} alt="" />
          </a>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow-lg rounded-3 my-5">
              <div className="card-body p-4 p-sm-5 ">
                <h2 className="card-title text-center text-uppercase mb-5 fw-bold fs-5">
                  Create an account
                </h2>
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="firstName"
                          className="form-control"
                          placeholder="First name"
                        />
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div className="form-outline">
                        <input
                          type="text"
                          id="lastName"
                          className="form-control"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className={classNames(Styles.ipt_custom, "mb-3")}>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>

                  <div className={classNames(Styles.ipt_custom, "mb-3")}>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>

                  <div className={classNames(Styles.ipt_custom, "mb-5")}>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Repeat Password"
                    />
                  </div>

                  <div className="d-grid">
                    <button
                      className={classNames(
                        Styles.btn_custom,
                        "btn text-uppercase fw-bold"
                      )}
                      type="submit"
                    >
                      Sign up
                    </button>
                  </div>

                  <hr className="my-4" />

                  <div className="d-grid mb-5">
                    <button
                      className={classNames(
                        Styles.btn_google,
                        "btn btn-login text-uppercase fw-bold"
                      )}
                      type="submit"
                    >
                      Continue with Google
                    </button>
                  </div>
                  <div className="d-flex justify-content-center">
                    <p className="form-check-label">
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
