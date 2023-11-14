import React, { useEffect, useState } from 'react';
import Header from '../../components/Landing/Header/Header';
import StudentIntroSection from '../../components/StudentLanding/IntroSection/StudentIntroSection';
import StudentTabComponent from '../../components/StudentLanding/StudentTabComponent/StudentTabComponent';
import Courses from '../../components/Landing/CourseSection/Courses';
import Features from '../../components/Landing/Features/Features';
import Testimonials from '../../components/Landing/Testimonials/Testimonials';
import ContactUs from '../../components/Landing/ContactUs/ContactUs';
import Footer from '../../components/Landing/Footer/Footer';
import { CourseControllerApi } from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';

const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
const StudentLanding = () => {
  const [courses, setCourses] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getCourses = () => {
    console.log(searchValue);
    courseApi.searchCourse({ value: searchValue }, (err, res) => {
      if (res) {
        setCourses(res);
      }
    });
  };
  useEffect(() => {
    getCourses();
  }, []);
  return (
    <>
      <Header setSearchValue={setSearchValue} getCourses={getCourses} />
      <StudentIntroSection />
      <StudentTabComponent />
      <Courses courses={courses} />
      <Footer />
    </>
  );
};

export default StudentLanding;
