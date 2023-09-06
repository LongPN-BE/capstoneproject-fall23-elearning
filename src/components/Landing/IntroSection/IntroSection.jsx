import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import introImg from "../../../assets/images/intro-img.png";
import "./IntroSection.scss";

const IntroSection = () => {
  return (
    <section className="mt-5 mb-5">
      <Container className="pt-5 pb-5">
        <Row>
          <Col lg="6" md="6">
            <div className="intro__content">
              <h2 className="mb-4 intro__title">
                Anytime Anywhere <br /> Learn on your <br /> Suitable Schedule
              </h2>
              <p className="mb-5 w-75">
                Start, switch, or advance your career with more than 5,800
                courses, Professional Certificates, and degrees from world-class
                universities and companies.
              </p>
            </div>
            <div className="intro__button">
              <a href="#" class="btn btn-lg">
                JOIN FOR FREE
              </a>
            </div>
          </Col>

          <Col lg="6" md="6">
            <img src={introImg} alt="" className="w-100 intro__img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default IntroSection;
