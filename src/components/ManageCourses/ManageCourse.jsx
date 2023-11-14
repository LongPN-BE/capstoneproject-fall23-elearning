import React, { useEffect, useState } from 'react';
import { courseData } from '../../mock/mock-data';
import CourseTabsComponent from './CourseTabComponent/CourseTabsComponent';
import { Container } from 'reactstrap';
import { Box } from '@mui/system';
import { fetchData } from '../../services/AppService';
import Loading from '../Loading/Loading';
import Cookies from 'js-cookie';

function ManageCourse() {
    const [activeCourses, setActiveCourses] = React.useState([]);
    const [inactiveCourses, setInactiveCourses] = React.useState([]);
    const [pendingCourses, setPendingCourses] = React.useState([]);
    const [draftCourses, setDraftCourses] = React.useState([]);
    const [rejectCourses, setRejectCourses] = React.useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userTmp = JSON.parse(Cookies.get('user'));
        const token = Cookies.get('token')
        if (userTmp !== null && token !== null) {
            setLoading(true)

            try {
                const courseData = fetchData(`/course/byTeacherId?teacher-id=${userTmp?.teacherId}`, token).then(resp => {
                    if (resp) {
                        const active = resp.filter((course) => course.status === 'ACTIVE');
                        const inactive = resp.filter((course) => course.status === 'DEACTIVE');
                        const pending = resp.filter((course) => course.status === 'PENDING');
                        const draft = resp.filter((course) => course.status === 'DRAFT');
                        const reject = resp.filter((course) => course.status === 'REJECT');

                        setActiveCourses(active);
                        setInactiveCourses(inactive);
                        setPendingCourses(pending);
                        setDraftCourses(draft);
                        setRejectCourses(reject);
                        setLoading(false);
                    } else {
                        // Handle the case when courseData is not an array (e.g., an error occurred)
                        console.error('courseData is not an array:', courseData);
                    }
                })
            } catch (error) {
                console.error("Error fetching user data:", error.message);
            }
        }

    }, []);

    return (
        loading ? <Loading /> :
            <Container>
                <Box textAlign="center" mt={2}>
                    <CourseTabsComponent
                        size={activeCourses.length + inactiveCourses.length + pendingCourses.length + draftCourses.length}
                        activeCourses={activeCourses}
                        inactiveCourses={inactiveCourses}
                        pendingCourses={pendingCourses}
                        draftCourses={draftCourses}
                        rejectCourses={rejectCourses}
                    />
                </Box>
            </Container>
    );
}

export default ManageCourse;
