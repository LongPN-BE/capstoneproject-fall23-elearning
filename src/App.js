import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { loadingState$ } from "./redux/selectors/LoadingSelector";
import { getAllAccountState$ } from "./redux/selectors/AccountSelector";
import { useEffect } from "react";
import * as accountActions from "./redux/actions/AccountAction";
import Loading from "./components/Loading/Loading";
import { Route, Routes, useLocation } from "react-router-dom";
import PrivateRoute from "./util/PrivateRoute";
import TeacherPage from "./pages/Teacher/TeacherPage";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'boxicons/css/boxicons.min.css';
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NavBar from "./components/Navigation/NavBar";
import ListCourse from "./components/Coures/ListCourse/ListCourse";
import InsertCourse from "./components/Coures/InsertCourse/InsertCourse";
import { useState } from "react";
import Lessons from "./components/Lessons/Lessons/Lessons";
import LandingPage from "./pages/Landing/LandingPage";
import ListSubject from "./components/Subjects/ListSubject/ListSubject";
import Dashboard from "./pages/Dashboard/Dashboard";
import ListCourseQuestion from "./components/Coures/ListCourseQuestion/ListCourseQuestion";
import ListQuiz from "./components/Lessons/Quizs/ListQuiz";
import ListQuizQuestion from "./components/Lessons/QuestionQuiz/ListQuestionQuiz";
import ListCourseFeedback from "./components/Coures/ListFeedback/ListCourseFeedback";
import ListResultQuizLesson from "./components/Lessons/ResultQuiz/ListResultQuizLesson";
import ListSyllabus from "./components/Coures/ListSyllabus/ListSyllabus";
import Accounts from "./components/DataTable/Account";

const App = () => {
  let isLoading = useSelector(loadingState$);
  const [user, setUser] = useState({})
  const location = useLocation();
  // const dispatch = useDispatch();
  // let listAccount = useSelector(getAllAccountState$);
  // const location = useLocation();
  // console.log(location.state);
  // useEffect(() => {
  //   dispatch(accountActions.getAllAccount.getAllAccountRequest());

  // }, [dispatch]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [location])

  // console.log("list-account: " + JSON.stringify(listAccount));

  return (
    isLoading ? <Loading /> :
      <>
        {
          user !== null && user.role === 'teacher' ? (
            <NavBar>
              <Routes>
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<TeacherPage />} />
                  <Route path="/subjects" element={<ListSubject />} />
                  <Route path="/subjects/:subjectId/courses" element={<ListCourse />} />
                  <Route path="/courses/:courseId/courseQuestions" element={<ListCourseQuestion />} />
                  <Route path="/create-course" element={<InsertCourse />} />
                  <Route path="/courses/:courseId/lessons" element={<Lessons />} />
                  <Route path="/courses/:courseId/feedbacks" element={<ListCourseFeedback />} />
                  <Route path="/lessons/:lessonId/quizs" element={<ListQuiz />} />
                  <Route path="/quizs/:quizId/quizQuestion" element={<ListQuizQuestion />} />
                  <Route path="/courses/:courseId/syllabus" element={<ListSyllabus />} />
                  {/* <Route path="/lesson" element />
                  <Route path="/create-lesson" element={<InsertLesson />} /> */}
                </Route>

              </Routes>
            </NavBar >
          ) : user?.role === 'manager' ? (
            <NavBar>
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </NavBar>
          ) : user?.role === 'admin' ? (
            <NavBar>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/accounts" element={<Accounts />} />
              </Routes>
            </NavBar>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<LandingPage />} />
            </Routes>
          )
        }
      </>
  );
}

export default App;
