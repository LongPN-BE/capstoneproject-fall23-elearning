import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Typography,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardMedia,
  Avatar,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Cookies from 'js-cookie';
import { fetchData } from '../../../services/AppService';
import moment from 'moment/moment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CustomBreadcrumbs from '../../../components/Breadcrumbs';
import { Box } from '@mui/system';
import { CardContent, Divider } from '@mui/material';

export default function SyllabusByCourse() {
  const { courseId } = useParams();
  const { subjectId } = useParams();
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [subjectData, setSubjectData] = useState({});
  const [courseData, setCourseData] = useState({});
  const [teacherData, setTeacherData] = useState({
    fullName: '',
    email: '',
    avatar: '',
    rating: ''
  });


  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchData('/subject/byId?subject-id=' + subjectId, token).then((resp) => {
        setSubjectData(resp)
      })
      fetchData('/course/byId?id=' + courseId, token).then((resp) => {
        if (resp) {
          setCourseData(resp);
          fetchData('/teacher/byId?teacher_id=' + resp.teacher.id, token).then((resp1) => {
            if (resp1) {
              setTeacherData({
                fullName: resp1.account.profile.firstName + " " + resp1.account.profile.firstName,
                email: resp1.account.profile.email,
                avatar: resp1.account.profile.avatar,
                rating: resp1.rating
              });
            }
          });
          fetchData('/syllabus/byCourseId?course_id=' + resp.id, token).then((resp1) => {
            if (resp1) {
              setData(resp1);
            }
          });
        }
      });
    }
  }, [courseId]);

  const breadcrumbItems = [
    {
      url: '/',
      label: 'Trang chủ',
    },
    {
      url: `/subjects`,
      label: `Danh sách môn học`,
    },
    {
      url: `/course/subject/` + subjectId,
      label: `Môn ` + subjectData.name,
    },
    {
      url: `/subject/${subjectId}/course/${courseId}/syllabus`,
      label: 'Khóa ' + courseData.name,
    },
  ];

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filterData = data.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    data && (
      <div className="m-5">
        <Box>
          <CustomBreadcrumbs items={breadcrumbItems} />
          <Card sx={{ minWidth: 275 }}>
            <CardMedia
              component="img"
              height="194"
              image={courseData.image}
              alt="Ảnh bìa môn học"
            />
            <CardContent>
              <Typography variant="h3" component="div" style={{ fontWeight: 'bold' }}>
                {courseData.name}
              </Typography>
              <Typography style={{ marginTop: 5, marginBottom: 10 }} color="textPrimary">
                {courseData.description}
              </Typography>
              <Divider style={{ color: 'black', height: 2 }} />
              <div className="d-flex justify-content-sm-between">
                <div className='d-flex'>
                  <Typography sx={{ mb: 1.5 }} color="textPrimary" variant='caption'>
                    Điểm qua môn: {courseData.averagePoint}<br />
                    Giá tiền: {courseData.price} <br />
                    Tạo ngày: {moment(courseData.createDate).format('DD/MM/YYYY')}<br />

                    Môn: {subjectData.name}<br />

                  </Typography>
                </div>
                <div className="p-3">
                  <Avatar alt={teacherData.fullName} src={teacherData.avatar} />
                  {teacherData.rating} -
                  {teacherData.fullName} <br />
                  {teacherData.email}
                </div>
              </div>
            </CardContent>
          </Card>
        </Box>
        <div className="mt-2">
          <Paper style={{ padding: '20px' }}>
            <div className="d-flex justify-content-center mt-1">
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                Danh sách khung chương trình
              </Typography>
            </div>

            <div className="d-flex align-items-center" style={{ marginTop: '20px' }}>
              <InputBase
                placeholder="Tìm kiếm"
                style={{ marginLeft: '20px' }}
                startAdornment={<Search />}
                onChange={handleSearchChange}
              />
            </div>

            <Table style={{ marginTop: '20px' }}>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterData.map((s, index) => {
                  return (
                    <TableRow hover={true} key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{s.status}</TableCell>
                      <TableCell>{moment(s.createDate).format('DD/MM/YYYY')}</TableCell>
                      <TableCell>
                        <Link
                          to={`/subject/course/syllabus/courses/${courseId}/preview`}
                          title="Xem"
                          className="btn btn-secondary m-1"
                        >
                          <VisibilityIcon />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    )
  );
}
