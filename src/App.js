import './App.css';
import { useEffect } from 'react';
import Loading from './components/Loading/Loading';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoute from './util/PrivateRoute';
import TeacherPage from './pages/Teacher/TeacherPage';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'boxicons/css/boxicons.min.css';
import CreateQuiz from './components/ManageCourses/Quiz/CreateQuiz';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NavBar from './components/Navigation/NavBar';
import { useState } from 'react';
// import LandingPage from './pages/Landing/LandingPage';
import LandingPage from './pages/Landing/Landing';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import ManageCourse from './components/ManageCourses/ManageCourse';
import CourseDetail from './components/ManageCourses/CourseDetail/CourseDetail';
import Evaluate from './components/ManageCourses/Evaluate/Evaluate';
import SyllabusDetail from './components/ManageCourses/Syllabus/SyllabusDetail/SyllabusDetail';
import LessonDetail from './components/ManageCourses/Lesson/LessonDetail';
import { fetchData, postData } from './services/AppService';
import StudentLanding from './pages/Landing/StudentLanding';
import OverviewCourse from './pages/OverviewCourse';
import UserCourseDetail from './pages/DetailCourse';
import CourseInfo from './pages/DetailCourse/Components/CourseInfo';
import Grades from './pages/DetailCourse/Components/Grades';
import LessonInfo from './pages/DetailCourse/Components/LessonInfo';
import Resources from './pages/DetailCourse/Components/Resources';
import LearnCourse from './pages/LearnCourse';
import DetailLesson from './pages/DetailLesson';
import Quizz from './pages/Quizz';
import StudentProfile from './pages/StudentProfile';
import StudentPrivateRouter from './util/StudentPrivateRouter';
import ManageSubject from './pages/Manager/ManageSubject/ManageSubject';
import CourseBySubject from './pages/Manager/CoursesBySubject/CoursesBySubject';
import Cookies from 'js-cookie';
import ListQuestionBank from './components/Questions/QuestionBanks/ListQuestionBank';
import QuizDetail from './components/Quizs/QuizDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'boxicons/css/boxicons.min.css';
import StudentMyCourse from './pages/StudentMyCourse';
import ListQuizQuestion from './components/ManageCourses/Quiz/LitsQuizQuestion/ListQuizQuestion';
import Notification from './util/Notification';
import ListResources from './components/ManageCourses/Resources/ListResources';
import PayPalCapture from './pages/PayPalCapture';
import StaffLanding from './pages/Landing/StaffLanding';
import Accounts from "./pages/Manager/ManageAccounts/ManageAccounts";
import ListConfig from './pages/Manager/ManageConfig/ManageConfig';
import SyllabusByCourse from './pages/Manager/DetailCourse/SyllabusByCourse';
import PreviewCourse from './pages/Manager/PreviewCourse';
import Report from './pages/Manager/ReportAccount/ReportAccount';
import PreviewLesson from './pages/Manager/DetailCourse/DetailLesson';
import PreviewQuizz from './pages/Manager/DetailCourse/DetailLesson/Quizz';
import ListPaymenHistory from './pages/Manager/ManageFiancial/ManageHistoryPayment';
import ListTransactionHistory from './pages/Manager/ManageFiancial/ManageHistoryTransaction';
import ListTransactionAproved from './pages/Manager/ManageFiancial/ManageApproved';
import AllCourses from './components/Landing/AllCourses/AllCourses';
import CoursesPage from './pages/Landing/CoursesPage';
import ListFeedback from './pages/Manager/CoursesBySubject/Evaluate/ListFeedback';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let userTmp = Cookies.get('user');
    const token = Cookies.get('token');
    if ((userTmp === null || userTmp === undefined) && token !== null && token !== undefined) {
      setLoading(true);
      const fetchUserData = async () => {
        try {
          if (token) {
            const userData = await fetchData('/auth/me', token);
            if (userData) {
              const deviceToken = Cookies.get('deviceToken');
              const body = {
                token: deviceToken,
                accountId: userData.id,
              };
              await postData(`/device/save`, body, token);
            }
            Cookies.set('user', JSON.stringify(userData), { expires: 1 });
            setUser(userData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        } finally {
          setLoading(false);
        }
      };
      if (location.pathname === '/') {
        // Only fetch user data if the user is on the homepage ("/")
        fetchUserData();
      }
    } else if (userTmp) {
      userTmp = JSON.parse(userTmp);
      setUser(userTmp);
    }
  }, [location.pathname]);

  if (!user) {
    let userTmp = Cookies.get('user');
    if (!userTmp && location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/all-courses') {
      return (window.location.href = '/');
    }
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      {user && user.role === 'TEACHER' ? (
        <NavBar>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<TeacherPage />} />
              <Route path="/my-profile" element={<Profile />} />
              <Route path="/manage-course" element={<ManageCourse />} />
              <Route path="/courses/:courseId" element={<CourseDetail />} />
              <Route path="/courses/:courseId/syllabus/:syllabusId" element={<SyllabusDetail />} />
              <Route path="/courses/:courseId/syllabus/:syllabusId/lessons/:lessonId" element={<LessonDetail />} />
              <Route
                path="/courses/:courseId/syllabus/:syllabusId/lessons/:lessonId/resources"
                element={<ListResources />}
              />
              <Route
                path="/courses/:courseId/syllabus/:syllabusId/lessons/:lessonId/quiz/:quizId"
                element={<QuizDetail />}
              />
              <Route path="/paypal/capture" element={<PayPalCapture />} />
              <Route
                path="/courses/:courseId/syllabus/:syllabusId/lessons/:lessonId/quiz/:quizId/questions"
                element={<ListQuizQuestion />}
              />
              <Route
                path="/courses/:courseId/syllabus/:syllabusId/lessons/:lessonId/create-quiz"
                element={<CreateQuiz />}
              />
              <Route path="/courses/:courseId/evaluate" element={<Evaluate />} />
              <Route path="/question-banks" element={<ListQuestionBank />} />
            </Route>
          </Routes>
        </NavBar>
      ) : user?.role === 'STAFF' ? (
        <NavBar>
          <Routes>
            <Route path="/" element={<Navigate to="/subjects" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/subjects" element={<ManageSubject />} />
            <Route path="/subject/:subjectId/course" element={<CourseBySubject />} />
            <Route path="/subject/:subjectId/course/:courseId/evaluate" element={<ListFeedback />} />
            <Route path="/subject/:subjectId/course/:courseId/syllabus" element={<SyllabusByCourse />} />
            <Route path="/subject/:subjectId/course/:courseId/syllabus/preview">
              <Route path=":syllabusId" element={<PreviewCourse />}>
                <Route path=":lessonId/:type/:id" element={<PreviewLesson />} />
                <Route path=":lessonId/:type" element={<PreviewLesson />} />
              </Route>
              <Route path=":lessonId/quiz/:id/view" element={<PreviewQuizz />} />
            </Route>
            <Route path="/payments" element={<ListPaymenHistory />} />
            <Route path="/transactions" element={<ListTransactionHistory />} />
            <Route path="/transaction-aprroved" element={<ListTransactionAproved />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/configs" element={<ListConfig />} />
            <Route path="/report-accounts" element={<Report />} />
          </Routes>
        </NavBar>
      ) : user?.role === 'ADMIN' ? (
        <NavBar>
          <Routes>
            <Route path="/" element={<Navigate to="/accounts" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/configs" element={<ListConfig />} />
            <Route path="/report-accounts" element={<Report />} />
          </Routes>
        </NavBar>
      ) : user?.role === 'STUDENT' ? (
        <Routes element={<StudentPrivateRouter />}>
          <Route path="/" element={<Navigate to="/student-home" replace />} />
          <Route path="/student-home" element={<StudentLanding />} />
          <Route path="/my-profile" element={<StudentProfile />} />
          <Route path="/my-course" element={<StudentMyCourse />} />
          <Route path="/overview-course/:courseId" element={<OverviewCourse />} />
          <Route path="/paypal/capture" element={<PayPalCapture />} />
          <Route path="/courses/:courseId/learn">
            <Route path="" element={<LearnCourse />}>
              <Route path=":lessonId/:type/:id" element={<DetailLesson />} />
              <Route path=":lessonId/:type" element={<DetailLesson />} />
            </Route>
            <Route path=":lessonId/quiz/:id/start" element={<Quizz />} />
          </Route>
          <Route path="/courses" element={<UserCourseDetail />}>
            <Route path=":courseId" element={<LessonInfo />} />
            <Route path=":courseId/grades" element={<Grades />} />
            <Route path=":courseId/resources" element={<Resources />} />
            <Route path=":courseId/info" element={<CourseInfo />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/all-courses" element={<CoursesPage />} />
        </Routes>
      )}
    </>
  );
};

export default App;
