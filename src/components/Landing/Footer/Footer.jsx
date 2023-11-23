import React from "react";
import { Container } from "reactstrap";
import Styles from "./Footer.module.scss";
import classNames from "classnames";

const Footer = () => {
  return (
    <footer className={`${classNames(Styles.footer)} mt-5 mb-5`}>
      <Container>
        <hr />
        <div className="footer__content">
          <h5>2023 Onlearn.</h5>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
