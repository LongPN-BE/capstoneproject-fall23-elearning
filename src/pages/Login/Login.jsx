import React from "react";
import Logo from "../../assets/images/logo.png";
import Styles from "./Login.module.scss";
import classNames from "classnames";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { account } from "../../mock/mock-data";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = account.find((user) => user.email === formData.email);

    if (user && user.password === formData.password) {
      // Authentication successful, you can redirect the user or perform other actions here
      console.log("Authentication successful!");
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/')
    } else {
      // Authentication failed, handle the error (e.g., show an error message)
      console.error("Authentication failed. Invalid email or password.");
    }
  };


  return (
    <div className="vh-100">
      <nav className="navbar navbar-light px-5 mb-5 pt-4">
        <div className="container-fluid">
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
                  Log in
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className={classNames(Styles.ipt_custom, "mb-3")}>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="d-grid">
                    <button
                      className={classNames(
                        Styles.btn_custom,
                        " text-uppercase fw-bold"
                      )}
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>
                </form>

                <hr className="my-4" />
                <div className="d-grid mb-2">
                  <button
                    className={classNames(
                      Styles.btn_custom,
                      Styles.btn_google,
                      " text-uppercase fw-bold"
                    )}
                    type="submit"
                  >
                    Continue with Google
                  </button>
                </div>
                <div className="mb-3 d-flex justify-content-center">
                  <p className="form-check-label">
                    Don't have an account? <a href="/">Sign up now</a>
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
