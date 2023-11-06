import React from 'react';
import CourseTabComponent from './CourseTabComponent/CourseTabComponent';
import { Container } from 'reactstrap';
import { Box } from '@mui/system';

export const courseData = [
  {
    id: 1,
    name: 'Basic Java',
    status: 'active',
    image:
      'https://3.bp.blogspot.com/-V1gqKeeRVuc/W88-jU8qF0I/AAAAAAAAEVU/v9yN6L9rraASuHYTW0aezkFyNhYTLn0fwCLcBGAs/s1600/react-basics.jpg',
    description: 'Basic',
    createDate: '2023-09-25T16:02:47.864Z',
    price: 500,
    limitTime: '2023-09-25T16:02:47.864Z',
    quizTime: 15,
    averagePoint: 10,
    teacherId: 1,
    subject: {
      id: 1,
      name: 'Java',
    },
  },
  {
    id: 2,
    name: 'Java Advanced',
    status: 'pending',
    image:
      'https://3.bp.blogspot.com/-V1gqKeeRVuc/W88-jU8qF0I/AAAAAAAAEVU/v9yN6L9rraASuHYTW0aezkFyNhYTLn0fwCLcBGAs/s1600/react-basics.jpg',
    description: 'Basic',
    createDate: '2023-09-25T16:02:47.864Z',
    price: 500,
    limitTime: '2023-09-25T16:02:47.864Z',
    quizTime: 15,
    averagePoint: 10,
    teacherId: 1,
    subject: {
      id: 1,
      name: 'Java',
    },
  },

  {
    id: 3,
    name: 'Java OOP',
    status: 'pending',
    image:
      'https://3.bp.blogspot.com/-V1gqKeeRVuc/W88-jU8qF0I/AAAAAAAAEVU/v9yN6L9rraASuHYTW0aezkFyNhYTLn0fwCLcBGAs/s1600/react-basics.jpg',
    description: 'Basic',
    createDate: '2023-09-25T16:02:47.864Z',
    price: 500,
    limitTime: '2023-09-25T16:02:47.864Z',
    quizTime: 15,
    averagePoint: 10,
    teacherId: 1,
    subject: {
      id: 1,
      name: 'Java',
    },
  },
];

function CourseBySubject() {
  const [activeCourses, setActiveCourses] = React.useState([]);
  const [pendingCourses, setPendingCourses] = React.useState([]);

  React.useEffect(() => {
    // Filter courses based on their status
    const active = courseData.filter((course) => course.status === 'active');
    const pending = courseData.filter((course) => course.status === 'pending');

    setActiveCourses(active);
    setPendingCourses(pending);
  }, []);

  return (
    <Container>
      <Box textAlign="center" mt={2}>
        <CourseTabComponent activeCourses={activeCourses} pendingCourses={pendingCourses} />
      </Box>
    </Container>
  );
}

export default CourseBySubject;
