import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import { Divider } from '@mui/material';
import NavBarLesson from './components/NavBarLesson';
//import CustomBreadcrumbs from '../../components/Breadcrumbs';
import { CourseControllerApi } from '../../../api/generated/generate-api';
import ApiClientSingleton from '../../../api/apiClientImpl';
import { Paper } from '@material-ui/core';

const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
function PreviewCourse() {
  const [course, setCourse] = useState();
  const { courseId } = useParams();
  // const breadcrumbItems = [
  //   {
  //     url: '/student-home',
  //     label: 'Home',
  //   },
  //   {
  //     url: `/course/${courseId}`,
  //     label: `Learn Course: ${course?.name}`,
  //   },
  // ];

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
      {/* <CustomBreadcrumbs items={breadcrumbItems} /> */}
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
    </>
  );
}

export default PreviewCourse;
