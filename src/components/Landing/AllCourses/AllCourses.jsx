import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CourseCard from './CourseCard';
import 'bootstrap/dist/css/bootstrap.css';
import Divider from '@mui/material/Divider';
import { CourseControllerApi } from '../../../api/generated/generate-api';
import ApiClientSingleton from '../../../api/apiClientImpl';

const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
const AllCourses = ({ courses }) => {
  return (
    <section className="d-flex justify-content-between align-items-center">
      <Container className="pt-5 pb-5">
        <Row>
          <Divider style={{ color: 'black', height: 2 }} />
          {courses?.map((data) => {
            return (
              <>
                <Col key={data.id} lg="4" md="6" sm="6">
                  <CourseCard item={data} />
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default AllCourses;
