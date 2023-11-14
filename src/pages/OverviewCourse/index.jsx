import Header from '../../components/Landing/Header/Header';
import Footer from '../../components/Landing/Footer/Footer';
import CustomBreadcrumbs from '../../components/Breadcrumbs';
import { Container } from 'reactstrap';
import classNames from 'classnames';
import Styles from './OverviewCourse.module.scss';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Modal,
  Tab,
  Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useEffect, useState } from 'react';
import ApiClientSingleton from '../../api/apiClientImpl';
import {
  CourseControllerApi,
  EnrollControllerApi,
  LessonControllerApi,
  TeacherControllerApi,
} from '../../api/generated/generate-api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import courseImg1 from '../../assets/images/web-design.png';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const enrollApi = new EnrollControllerApi(ApiClientSingleton.getInstance());
const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
const lessonApi = new LessonControllerApi(ApiClientSingleton.getInstance());
const teacherApi = new TeacherControllerApi(ApiClientSingleton.getInstance());
const OverviewCourse = () => {
  const breadcrumbItems = [
    {
      url: '/student-home',
      label: 'Home',
    },
    {
      url: 'overview-course',
      label: 'Overview course',
    },
  ];
  const notifySuccess = () => {
    toast.success('Đăng ký thành công !', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const notifyErorr = () => {
    toast.error('Đăng ký không thành công !', {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const userTmp = JSON.parse(Cookies.get('user'));
  const { courseId } = useParams();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [course, setCourse] = useState();
  const [lessons, setLessons] = useState([]);
  const [teacher, setTeacher] = useState();

  const [value, setValue] = useState(0);
  const [expanded, setExpanded] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeAcc = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    if (courseId) {
      courseApi.getCourseById(courseId, (err, res) => {
        if (res) {
          setCourse(res);
          teacherApi.getTeacherById(res.teacher.id, (err, res) => {
            if (res) {
              console.log(res);
              setTeacher(res);
            }
          });
        }
      });
      lessonApi.findLessonByCourseId(courseId, (err, res) => {
        if (res) {
          setLessons(res);
        }
      });
    }
  }, [courseId]);

  return (
    <>
      <ToastContainer />
      <Header />
      <hr />
      <CustomBreadcrumbs items={breadcrumbItems} />
      <div className={classNames(Styles.info__common)}>
        <Container>
          <div className="py-48" style={{ padding: '48px 0' }}>
            <div className="row ">
              <div className="col-8">
                <div className={`${classNames(Styles.course__img)} col-6`}>
                  <img src={courseImg1} alt="" className="w-100" />
                </div>
                <Typography variant="h4" gutterBottom>
                  {course?.name}
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                  {course?.description}
                </Typography>
                <div className="mt-4 ">
                  <div className="d-flex align-items-center gap-2">
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Typography variant="subtitle1">
                      Giáo viên:{' '}
                      <Link to={'/student-home'}>
                        {teacher?.account?.profile?.firstName} {teacher?.account?.profile?.lastName}
                      </Link>
                    </Typography>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="contained"
                    size="large"
                    style={{ height: '64px' }}
                    onClick={() => setIsOpenModal(true)}
                  >
                    <Typography style={{ fontWeight: 600 }} variant="button">
                      Đăng ký ngay
                    </Typography>
                  </Button>
                </div>
                <div className="mt-4">
                  <Typography variant="subtitle1">
                    <strong>44,325</strong> already enrolled
                  </Typography>
                </div>
              </div>
              <div className="col-4 position-relative">
                <div className="position-sticky" style={{ zIndex: 999 }}>
                  <div
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: '0.5rem',
                      boxShadow: '0 0 32px -8px rgb(0 0 0 / 50%)',
                    }}
                  >
                    <div className="px-4 py-3">
                      <div className=" py-3">
                        <Typography style={{ fontWeight: 600 }} variant="subtitle1">
                          {course?.name}
                        </Typography>

                        <Typography variant="body2">{course?.description}</Typography>
                      </div>
                      <Divider />
                      {lessons?.map((lesson, index) => {
                        return (
                          <div className=" py-3">
                            <div className="py-2">
                              <Typography style={{ fontWeight: 600 }} variant="subtitle1">
                                {lesson?.name}
                              </Typography>
                            </div>
                          </div>
                        );
                      })}
                      <Divider />
                      <div className=" py-3">
                        <Link to={'/'}>View all course</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="About" value="1" />
                <Tab label="Course" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="row">
                <div className="col-8">
                  <div className="row">
                    <Typography style={{ fontWeight: 600 }} variant="subtitle1">
                      What you'll learn
                    </Typography>
                  </div>
                  <div className="row">
                    <div className="col-6">1</div>
                    <div className="col-6">2</div>
                    <div className="col-6">3</div>
                    <div className="col-6">4</div>
                  </div>
                  <div className="row">
                    <Typography style={{ fontWeight: 600 }} variant="subtitle1">
                      Skills you'll gain
                    </Typography>
                  </div>
                  <div className="row">
                    <div className="d-flex align-items-center gap-3">
                      <Chip variant="inlined" size="sm" label={'Programming Principles'} />
                      <Chip variant="inlined" size="sm" label={'Programming Principles'} />
                      <Chip variant="inlined" size="sm" label={'Programming Principles'} />
                      <Chip variant="inlined" size="sm" label={'Programming Principles'} />
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2">
              {lessons?.map((lesson, index) => {
                return (
                  <>
                    <Accordion key={index} expanded={expanded === index} onChange={handleChangeAcc(index)}>
                      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>{lesson.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{lesson.description}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  </>
                );
              })}
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
      <Footer />

      <Modal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Đăng ký khóa học: {course?.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Bạc có chắc chắn đăng ký khóa học này không ?
          </Typography>
          <Button
            variant="contained"
            size="medium"
            style={{ height: '36px', marginTop: '8px' }}
            onClick={() => {
              enrollApi.saveEnroll(
                {
                  studentId: userTmp.studentId,
                  courseId: Number(courseId),
                },
                (err, res) => {
                  if (res) {
                    setIsOpenModal(false);
                    notifySuccess();
                  } else {
                    notifyErorr();
                  }
                },
              );
            }}
          >
            <Typography style={{ fontWeight: 600 }} variant="button">
              Xác nhận
            </Typography>
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default OverviewCourse;
