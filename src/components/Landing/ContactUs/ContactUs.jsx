import React from "react";
import "./ContactUs.scss";
import { Container, Row, Col } from "reactstrap";
import imgContact from "../../../assets/images/contact-us.png";

const ContactUs = () => {
  return (
    <section className="mt-5 mb-5">
      <Container className="pt-5 pb-5">
        <Row className="contact__us" style={{ opacity: 1, transform: "none" }}>
          <Col lg="12" className="text-start">
            <div className=" mb-4 z-3 position-relative ">
              <div>
                <h2
                  className="mb-4 fw-bold fs-1"
                  style={{ opacity: 1, transform: "none" }}
                >
                  LET'S GET STARTED
                </h2>
                <p
                  className=" fw-bolder"
                  style={{ opacity: 1, transform: "none" }}
                >
                  OnLearn is developed based on the purpose of flexible study
                  time, courses will be divided by class and someone is willing
                  to assist in guiding the course content.
                </p>
              </div>
              <a
                href="#"
                className="mt-4 btn contact__btn fw-bold text-body-tertiary"
              >
                Contact Us
              </a>
            </div>

            <div className="contact__img position-absolute bottom-100 start-100 translate-middle">
              <img src={imgContact} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactUs;
