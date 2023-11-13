import React from 'react';
import CourseTabComponent from './CourseTabComponent/CourseTabComponent';
import { Container } from 'reactstrap';
import { Box } from '@mui/system';
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import moment from 'moment';
import { fetchData, postData } from '../../../services/AppService';

// export const courseData = [
//   {
//     id: 1,
//     name: 'Basic Java',
//     status: 'active',
//     image:
//       'https://3.bp.blogspot.com/-V1gqKeeRVuc/W88-jU8qF0I/AAAAAAAAEVU/v9yN6L9rraASuHYTW0aezkFyNhYTLn0fwCLcBGAs/s1600/react-basics.jpg',
//     description: 'Basic',
//     createDate: '2023-09-25T16:02:47.864Z',
//     price: 500,
//     limitTime: '2023-09-25T16:02:47.864Z',
//     quizTime: 15,
//     averagePoint: 10,
//     teacherId: 1,
//     subject: {
//       id: 1,
//       name: 'Java',
//     },
//   },
//   {
//     id: 2,
//     name: 'Java Advanced',
//     status: 'pending',
//     image:
//       'https://3.bp.blogspot.com/-V1gqKeeRVuc/W88-jU8qF0I/AAAAAAAAEVU/v9yN6L9rraASuHYTW0aezkFyNhYTLn0fwCLcBGAs/s1600/react-basics.jpg',
//     description: 'Basic',
//     createDate: '2023-09-25T16:02:47.864Z',
//     price: 500,
//     limitTime: '2023-09-25T16:02:47.864Z',
//     quizTime: 15,
//     averagePoint: 10,
//     teacherId: 1,
//     subject: {
//       id: 1,
//       name: 'Java',
//     },
//   },

//   {
//     id: 3,
//     name: 'Java OOP',
//     status: 'pending',
//     image:
//       'https://3.bp.blogspot.com/-V1gqKeeRVuc/W88-jU8qF0I/AAAAAAAAEVU/v9yN6L9rraASuHYTW0aezkFyNhYTLn0fwCLcBGAs/s1600/react-basics.jpg',
//     description: 'Basic',
//     createDate: '2023-09-25T16:02:47.864Z',
//     price: 500,
//     limitTime: '2023-09-25T16:02:47.864Z',
//     quizTime: 15,
//     averagePoint: 10,
//     teacherId: 1,
//     subject: {
//       id: 1,
//       name: 'Java',
//     },
//   },
// ];

const CourseBySubject = ({ isOpen, onClose, subject }) => {
  const [courseData, setcourseData] = useState([]);
  const [activeCourses, setActiveCourses] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [user, setUser] = useState({});

  const [editedSubject, setEditedSubject] = useState({
    id: '',
    name: '',
    description: '',
    minPrice: '',
    createDate: new Date(),
    staffId: user.username,
    status: 'Chưa kích hoạt'
  });
  useEffect(() => {
    async function fetchMyAPI() {
      setUser(JSON.parse(Cookies.get('user')));
      if (await subject) {
        // Populate the form fields if a subject is provided for editing
        setEditedSubject({
          id: subject.id,
          name: subject.name,
          description: subject.description,
          minPrice: subject.minPrice,
          createDate: subject.createDate,
          staffId: 'Staff ' + subject.staff.id,
          status: 'Đang hoạt động',
        });
      }
      const token = await Cookies.get('token');
      if (token) {
        try {
          await fetchData('/course/bySubjectId?subject-id=' + editedSubject.id, token).then(resp => {
            if (resp) {
              console.log("List course :", resp)
              setcourseData(resp);
            }
          })
        } catch (error) {
          console.log(error)
        }
      }
      // Filter courses based on their status
      const active = courseData.filter((course) => course.status === 'ACTIVE');
      const pending = courseData.filter((course) => course.status === 'PENDING');

      setActiveCourses(active);
      setPendingCourses(pending);
    }

    fetchMyAPI()
  }, [subject]);

  return (
    <Dialog open={isOpen} onClose={onClose} minWidth="80%">
      <DialogTitle>
        <Box textAlign="center" mt={2}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Chi tiết môn {editedSubject.name}.
              </Typography>
              <Typography variant="h5" component="div">
                {editedSubject.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {editedSubject.description}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Giá thấp nhất : {editedSubject.minPrice} <br />Tạo ngày: {moment(editedSubject.createDate).format("DD/MM/YYYY")}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Container>
          <Box textAlign="center" mt={2}>
            <CourseTabComponent activeCourses={activeCourses} pendingCourses={pendingCourses} />
          </Box>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Quay lại
        </Button>
      </DialogActions>
    </Dialog>

  );
}

export default CourseBySubject;
