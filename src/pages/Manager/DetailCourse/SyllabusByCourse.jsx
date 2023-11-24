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
import SourceIcon from '@mui/icons-material/Source';
import CustomBreadcrumbs from '../../../components/Breadcrumbs';
import { Box } from '@mui/system';
import { CardContent, Divider } from '@mui/material';
import AccountDetailModal from '../ManageAccounts/AccountDetail';

export default function SyllabusByCourse() {
  const { courseId } = useParams();
  const { subjectId } = useParams();

  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [numEnroll, setNumEnroll] = useState('');
  const [subjectData, setSubjectData] = useState({});
  const [courseData, setCourseData] = useState({});
  const [accountData, setAccountData] = useState(null);
  const [teacherData, setTeacherData] = useState({
    fullName: '',
    email: '',
    avatar: '',
    rating: '',
  });

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      fetchData('/enroll/byCourseId?course_id=' + courseId, token).then((resp) => {
        setNumEnroll(resp.length);
        console.log(numEnroll)
      });
      fetchData('/subject/byId?subject-id=' + subjectId, token).then((resp) => {
        setSubjectData(resp);
      });
      fetchData('/course/byId?id=' + courseId, token).then((resp) => {
        if (resp) {
          setCourseData(resp);
          fetchData('/teacher/byId?teacher_id=' + resp.teacher.id, token).then((resp1) => {
            if (resp1) {
              setAccountData(resp1.account)
              setTeacherData({
                fullName: resp1.account.profile.firstName + ' ' + resp1.account.profile.firstName,
                email: resp1.account.profile.email,
                avatar: resp1.account.profile.avatar,
                rating: resp1.rating,
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
      url: `/subject/${subjectId}/course/`,
      label: `Môn ` + subjectData.name,
    },
    {
      url: `/subject/${subjectId}/course/${courseId}/syllabus`,
      label: 'Khóa học ' + courseData.name,
    },
  ];

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filterData = data.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));
  const [isAccountDetailModalOpen, setIsAccountDetailModalOpen] = useState(false);

  const handleAccountDetailModalClose = () => {
    setIsAccountDetailModalOpen(false);
  };

  return (
    data && (
      <div className="m-5">
        <Box>
          <CustomBreadcrumbs items={breadcrumbItems} />
          <Card className="d-flex" style={{ backgroundColor: '#4356ff12' }}>
            <div className="d-flex">
              <div className="p-3">
                <div className="p-3 border rounded" style={{ height: 200, width: 200, backgroundColor: 'white' }}>
                  <CardMedia component="img" sx={{ width: 151 }} image={courseData.image} alt="Ảnh bìa môn học" />
                </div>
              </div>
              <CardContent>
                <div className="d-flex">
                  <div>
                    <Typography variant="h4" component="div" style={{ fontWeight: 'bold' }}>
                      {courseData.name}
                    </Typography>
                    <div className="vw-75">
                      <Typography className="w-75" variant="subtitle2" style={{ marginTop: 5, marginBottom: 10 }}>
                        {courseData.description}
                      </Typography>
                    </div>
                  </div>

                  {/* Teacher button */}
                  <div className="m-2">
                    <div className="btn hover-overlay btn-light border rounded d-flex text-center"
                      onClick={() => {
                        setIsAccountDetailModalOpen(true);
                      }}>
                      <Avatar alt={teacherData.fullName} src={teacherData.avatar} />
                      <div className="p-2">
                        <Typography variant="subtitle2">{teacherData.fullName}</Typography>
                      </div>
                    </div>
                  </div>
                </div>
                <Divider style={{ color: 'black', height: 2 }} />

                <div className="d-flex justify-content-sm-between">
                  <div className="d-flex w-100 py-3">
                    <div className="px-5 text-center">
                      <Typography variant="caption">
                        <strong>MÔN HỌC </strong>
                      </Typography>
                      <Typography>{subjectData?.name}</Typography>
                    </div>

                    <div className="px-5 text-center">
                      <Typography variant="caption">
                        <strong>GIÁ TIỀN </strong>
                      </Typography>
                      <Typography>{courseData.price?.toLocaleString()} VNĐ</Typography>
                    </div>

                    <div className="pr-5 text-center">
                      <Typography variant="caption">
                        <strong>ĐIỂM QUA MÔN</strong>
                      </Typography>
                      <Typography>{courseData?.averagePoint} /10</Typography>
                    </div>

                    <div className="px-5 text-center">
                      <Typography variant="caption">
                        {' '}
                        <strong>TẠO NGÀY </strong>
                      </Typography>
                      <Typography>{moment(courseData?.createDate).format('DD/MM/YYYY')}</Typography>
                    </div>

                    <div className="px-5 text-center">
                      <Typography variant="caption">
                        {' '}
                        <strong>LƯỢT ĐĂNG KÝ </strong>
                      </Typography>
                      <Typography>{numEnroll}</Typography>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
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
                  {/* <TableCell>Tài liệu</TableCell> */}
                  <TableCell>Xem tổng quan</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterData.map((s, index) => {
                  return (
                    <TableRow hover={true} key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{s.status === "Deactive" ? "Không hoạt động" : s.status === "Active" ? "Đang hoạt động" : (<></>)}</TableCell>
                      <TableCell>{moment(s.createDate).format('DD/MM/YYYY')}</TableCell>
                      {/* <TableCell>
                        <Link to={`##`} aria-label="Tài liệu" className="btn btn-secondary m-1">
                          <SourceIcon />
                        </Link>
                      </TableCell> */}
                      <TableCell>
                        <Link
                          to={`/subject/${subjectId}/course/${courseId}/syllabus/preview/${s.id}`}
                          aria-label="Xem"
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
          < AccountDetailModal
            isOpen={isAccountDetailModalOpen}
            onClose={handleAccountDetailModalClose}
            account={accountData !== null ? accountData : null}
          />
        </div>
      </div>
    )
  );
}
