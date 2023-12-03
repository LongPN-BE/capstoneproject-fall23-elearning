import React, { useState } from "react";
import Logo from "../../assets/images/logo.png";
import Styles from "./ForgotPassword.module.scss";
import classNames from "classnames";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: ''
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
    //Implement code here
    alert("Chưa có API! \n Email : " + formData.email);
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
      <div className="container pt-5">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow-lg rounded-3 my-5">
              <div className="card-body p-4 p-sm-5 ">
                <h2 className="card-title text-center text-uppercase mb-2 fw-bold fs-5">
                  Đặt lại mật khẩu của bạn
                </h2>

                <p className="fw-italic text-muted">
                  Vui lòng nhập địa chỉ email của bạn bên dưới, chúng tôi sẽ gửi ngay
                  bạn các thông tin cần thiết.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className={classNames(Styles.ipt_custom, "mb-3")}>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
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
                      Xác nhận
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
