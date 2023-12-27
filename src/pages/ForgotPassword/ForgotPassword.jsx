import React from "react";
import Logo from "../../assets/images/logo.png";
import Styles from "./ForgotPassword.module.scss";
import classNames from "classnames";
import "bootstrap/dist/css/bootstrap.css";

const ForgotPassword = () => {
  return (
    <div className="vh-100">
      <nav className="navbar navbar-light px-5 mb-5 pt-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={Logo} style={{ height: 30 }} alt="" />
          </a>
        </div>
      </nav>
      <div className="container pt-5">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow-lg rounded-3 my-5">
              <div className="card-body p-4 p-sm-5 ">
                <h2 className="card-title text-center text-uppercase mb-2 fw-bold fs-5">
                  Reset your password
                </h2>
                <p className="fw-italic text-muted">
                  Please enter your email address below, we will promptly send
                  you a passcode to reset your password
                </p>
                <form>
                  <div className={classNames(Styles.ipt_custom, "mb-3")}>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
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
