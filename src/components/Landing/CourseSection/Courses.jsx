import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import courseImg1 from '../../../assets/images/web-design.png';
import courseImg2 from '../../../assets/images/graphics-design.png';
import courseImg3 from '../../../assets/images/ui-ux.png';
import CourseCard from './CourseCard';
import Styles from './Courses.module.scss';
import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.css';
import { CourseControllerApi } from '../../../api/generated/generate-api';
import ApiClientSingleton from '../../../api/apiClientImpl';

const coursesData = [
  {
    id: '01',
    title: 'Web Design BootCamp-2022 for Beginners',
    lesson: 12,
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg1,
  },

  {
    id: '02',
    title: 'Professional Graphics Design',
    lesson: 12,
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg2,
  },

  {
    id: '03',
    title: 'UI/UX BootCamp for Beginners in 2022',
    lesson: 12,
    students: 12.5,
    rating: 5.9,
    imgUrl: courseImg3,
  },
];

const Courses = ({ courses }) => {
  return (
    <section className="mt-5 mb-5">
      <Container className="pt-5 pb-5">
        <Row>
          <Col lg="12" className="mb-5">
            <div className="d-flex justify-content-between align-items-center">
              <div className={classNames(Styles.course__top)}>
                <div className={classNames(Styles.course__top__left, 'w-70')}>
                  <h2>Our Popular Courses</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae consequatur libero quod voluptatibus
                    ullam quia quas, vitae voluptatem recusandae reprehenderit!
                  </p>
                </div>
              </div>

              <div className={classNames('w-50 text-end')}>
                <button className={classNames('btn', Styles.course__btn)}>See All</button>
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
    </section>
  );
};

export default Courses;
