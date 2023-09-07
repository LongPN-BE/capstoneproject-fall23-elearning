import React from "react";
import Logo from "../../assets/images/logo.png";
import "bootstrap/dist/css/bootstrap.css";
import Styles from "./Login.module.scss";
import classNames from "classnames";

const Login = () => {
  return (
    <div class="vh-100">
      <nav class="navbar navbar-light px-5 mb-5 pt-4">
        <div class="container-fluid">
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
                  Log in
                </h2>

                <form>
                  <div class="mb-3">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email"
                    />
                  </div>

                  <div className={classNames(Styles.ipt_login)} class="mb-3">
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                    />
                  </div>

                  <div class="mb-3 d-flex justify-content-end">
                    <p>
                      <a href="/">Forgot password?</a>
                    </p>
                  </div>

                  <div class="d-grid">
                    <button
                      class="btn text-uppercase fw-bold"
                      className={classNames(Styles.btn_login)}
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>

                  <hr class="my-4" />
                  <div class="d-grid mb-2">
                    <button
                      class="btn text-uppercase fw-bold"
                      className={classNames(
                        Styles.btn_login,
                        Styles.btn_google
                      )}
                      type="submit"
                    >
                      Continue with Google
                    </button>
                  </div>
                  <div class="mb-3 d-flex justify-content-center">
                    <p class="form-check-label">
                      Don't have an account? <a href="/">Sign up now</a>
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

export default Login;
