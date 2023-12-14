import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import { Divider } from '@mui/material';
import NavBarLesson from './components/NavBarLesson';
import CustomBreadcrumbs from '../../../components/Breadcrumbs';
import { CourseControllerApi, SubjectControllerApi } from '../../../api/generated/generate-api';
import ApiClientSingleton from '../../../api/apiClientImpl';
import { Paper, Typography } from '@material-ui/core';
import Cookies from 'js-cookie';
import { fetchData } from '../../../services/AppService';

const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
const subjectApi = new SubjectControllerApi(ApiClientSingleton.getInstance());
function PreviewCourse() {
  const [course, setCourse] = useState();
  const { courseId, subjectId, syllabusId } = useParams();
  const [subjectData, setSubject] = useState();
  const [lessons, setLessons] = useState([]);

  const breadcrumbItems = [
    {
      url: '/dashboard',
      label: 'Trang chủ',
    },
    {
      url: '/subjects',
      label: 'Danh sách chủ đề',
    },
    {
      url: `/subject/${subjectId}/course/`,
      label: `Chủ đề: ${subjectData?.name}`,
    },
    {
      url: `/subject/${subjectId}/course/${courseId}/syllabus/`,
      label: `Khoá học ${course?.name}`,
    },
    {
      url: `/subject/course/${courseId}/syllabus/`,
      label: `Xem tổng quan`,
    },
  ];

  const getCourseById = () => {
    courseApi.getCourseById(courseId, (err, res) => {
      if (res) {
        setCourse(res);
      }
    });
  };
  const getSubjectById = () => {
    subjectApi.findSubjectById(subjectId, (err, res) => {
      if (res) {
        setSubject(res);
        console.log(res);
      }
    });
  };
  useEffect(() => {
    getCourseById();
    getSubjectById();
    const token = Cookies.get('token');
    fetchData('/lesson/by-syllabus?syllabus_id=' + syllabusId, token).then((resp) => {
      if (resp) {
        setLessons(resp);
      }
    });
  }, [courseId]);

  return (
    <div className="px-5 py-3">
      <div className="row">
        <div className="col-9">
          <h4 style={{ fontWeight: 'bold' }}>Tổng quan khoá học</h4>
          <CustomBreadcrumbs items={breadcrumbItems} />
        </div>
        <div className="col-3">
          <div className="d-flex justify-content-end">
            <button className="btn m-1" style={{ backgroundColor: '#dbf6e5', color: '#2a9a68', fontWeight: 700 }}>
              Xét duyệt
            </button>
            <button className="btn m-1" style={{ backgroundColor: '#ffe4de', color: '#c64843', fontWeight: 700 }}>
              Từ chối
            </button>
          </div>
        </div>
      </div>
      <Container className="mt-4 vh-100" style={{ maxHeight: 800, padding: '10px' }}>
        {lessons?.length === 0 ? (
          <div className="row" style={{ height: 700, overflow: 'auto' }}>
            <h3 className="text-center" style={{ fontWeight: 700, color: '#cdd2d6' }}>
              HIỆN KHÔNG CÓ BÀI HỌC TRONG KHUNG CHƯƠNG TRÌNH
            </h3>
          </div>
        ) : (
          <div
            className="row"
            style={{ height: 700, overflow: 'auto', borderRadius: '20px', padding: '20px', backgroundColor: '#f4f6f8' }}
          >
            <div className="col-4 p-2">
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px', height: '100%' }}>
                <div className="d-flex flex-column gap-3">
                  <div>
                    <NavBarLesson courseId={courseId} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8 p-2">
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px', height: '100%' }}>
                <Outlet />
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default PreviewCourse;
