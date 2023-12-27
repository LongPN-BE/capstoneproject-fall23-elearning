import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import courseImg1 from '../../../assets/images/web-design.png';
import courseImg2 from '../../../assets/images/graphics-design.png';
import courseImg3 from '../../../assets/images/ui-ux.png';
import Styles from './Courses.module.scss';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.css';
import { CourseControllerApi } from '../../../api/generated/generate-api';
import ApiClientSingleton from '../../../api/apiClientImpl';
import { useNavigate } from 'react-router';
import CourseCard from './CourseCard';

const Courses = ({ courses }) => {
  const navigate = useNavigate();
  return (
    <Container className="pt-5 pb-5">
      <Row>
        <Col lg="12" className="mb-5">
          <div className="d-flex justify-content-between align-items-center">
            <div className={classNames(Styles.course__top)}>
              <div className={classNames(Styles.course__top__left, 'w-70')}>
                <h2>Khóa học phổ biến</h2>
              </div>
            </div>

            <div className={classNames('w-50 text-end')}>
              <button onClick={() => navigate('/all-courses')} className={classNames('btn', Styles.course__btn)}>
                Xem tất cả
              </button>
            </div>
          </div>
        </Col>
        {courses?.map((item) => (
          <Col key={item.id} lg="4" md="6" sm="6">
            <CourseCard item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Courses;
