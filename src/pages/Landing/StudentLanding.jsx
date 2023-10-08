import React from 'react'
import Header from '../../components/Landing/Header/Header'
import StudentIntroSection from '../../components/StudentLanding/IntroSection/StudentIntroSection'
import StudentTabComponent from '../../components/StudentLanding/StudentTabComponent/StudentTabComponent'
import Courses from '../../components/Landing/CourseSection/Courses'
import Features from '../../components/Landing/Features/Features'
import Testimonials from '../../components/Landing/Testimonials/Testimonials'
import ContactUs from '../../components/Landing/ContactUs/ContactUs'
import Footer from '../../components/Landing/Footer/Footer'

const StudentLanding = () => {
    return (
        <>
            <Header />
            <StudentIntroSection />
            <StudentTabComponent />
            <Courses />
            <Footer />
        </>
    )
}

export default StudentLanding
