import Styles from "./Navbar.module.scss";
import classNames from "classnames";
import "boxicons";

const Navbar = () => {
  return (
    <div className={classNames(Styles.navbar)}>
      <div className={classNames(Styles.logo)}>
        <img src="logo.svg" alt="" />
        <span>Dashboard</span>
      </div>
      <div className={classNames(Styles.icons)}>
        <div className={classNames(Styles.notification)}>
          <box-icon
            name="bell"
            type="solid"
            animation="tada-hover"
            flip="horizontal"
            color="rgba(0,0,0,0.71)"
          ></box-icon>
          <span>1</span>
        </div>
        <div className={classNames(Styles.user)}>
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span>Admin</span>
        </div>
        <box-icon
          name="cog"
          type="solid"
          animation="spin-hover"
          color="rgba(0, 0, 0, 0.611)"
        ></box-icon>
      </div>
    </div>
  );
};

export default Navbar;
