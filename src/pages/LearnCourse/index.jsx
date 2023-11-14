import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { courseData } from '../../mock/mock-data';
import Footer from '../../components/Landing/Footer/Footer';
import Header from '../../components/Landing/Header/Header';
import { Container } from 'reactstrap';
import { Divider } from '@mui/material';
import NavBarLesson from './components/NavBarLesson';
import CustomBreadcrumbs from '../../components/Breadcrumbs';
import { CourseControllerApi } from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';

const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
function LearnCourse() {
  const [course, setCourse] = useState();
  const { courseId } = useParams();
  const breadcrumbItems = [
    {
      url: '/student-home',
      label: 'Home',
    },
    {
      url: `/course/${courseId}`,
      label: `Learn Course: ${course?.name}`,
    },
  ];

  const getCourseById = () => {
    courseApi.getCourseById(courseId, (err, res) => {
      if (res) {
        setCourse(res);
      }
    });
  };
  useEffect(() => {
    getCourseById();
  }, [courseId]);

  return (
    <>
      <Header />
      <CustomBreadcrumbs items={breadcrumbItems} />
      <Container className="mt-4">
        <Divider className="my-4" />
        <div className="row">
          <div className="col-3">
            <div className="d-flex flex-column gap-3">
              <div>
                <NavBarLesson courseId={courseId} />
              </div>
            </div>
          </div>
          <div className="col-9">
            <Outlet />
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default LearnCourse;
