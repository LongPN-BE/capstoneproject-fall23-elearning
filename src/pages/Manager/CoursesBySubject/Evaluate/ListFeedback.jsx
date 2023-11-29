import React, { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { fetchData } from '../../../../services/AppService';
import CustomBreadcrumbs from '../../../../components/Breadcrumbs';
import {
  CourseControllerApi,
  FeedbackControllerApi,
  SubjectControllerApi,
} from '../../../../api/generated/generate-api';
import ApiClientSingleton from '../../../../api/apiClientImpl';
import { Container } from 'reactstrap';
import FeedbackModal from './FeedbackModal';

const subjectApi = new SubjectControllerApi(ApiClientSingleton.getInstance());
const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
const feedbackApi = new FeedbackControllerApi(ApiClientSingleton.getInstance());

const ListFeedback = () => {
  const { courseId, subjectId } = useParams();
  const [searchValue, setSearchValue] = useState('');
  // const [data, setData] = useState();
  const [evaluate, setEvaluate] = useState();
  const [totalRate, setTotalRate] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [rating, setRating] = useState(0);
  const [course, setCourse] = useState();
  const [subjectData, setSubject] = useState();
  const [feedback, setFeedback] = useState();

  const breadcrumbItems = [
    {
      url: '/dashboard',
      label: 'Trang chủ',
    },
    {
      url: '/subjects',
      label: 'Danh sách môn học',
    },
    {
      url: `/subject/${subjectId}/course/`,
      label: `Môn ${subjectData?.name}`,
    },
    {
      url: `/subject/${subjectId}/course/${courseId}/syllabus/`,
      label: `Khoá học ${course?.name}`,
    },
    {
      url: `/subject/${subjectId}/course/${courseId}/syllabus/evaluate`,
      label: `Danh sách đánh giá`,
    },
  ];

  const getCourseById = () => {
    courseApi.getCourseById(courseId, (err, res) => {
      if (res) {
        setCourse(res);
      }
    });
  };
  const getSubjectById = () => {
    subjectApi.findSubjectById(subjectId, (err, res) => {
      if (res) {
        setSubject(res);
        console.log(res);
      }
    });
  };

  // const getFeedbackByCourse = () => {
  //   feedbackApi.findAllByCourseId(courseId, (err, res) => {
  //     if (res) {
  //       setFeedback(res);
  //       console.log(res);
  //     }
  //   });
  // };

  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      getCourseById();
      getSubjectById();
      fetchData(`/feedback/ByCourse?course_id=${courseId}`, token)
        .then((resp) => {
          if (resp) {
            setEvaluate(resp);
            setTotalRate(resp.length);
            const averageRating = calculateAverageRating(resp);
            setRating(averageRating);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function calculateAverageRating(data) {
    let sum = 0;
    let count = 0;

    for (const item of data) {
      for (const feedback of item.feedbackDetails) {
        if (feedback.rate !== undefined) {
          sum += feedback.rate;
          count++;
        }
      }
    }

    const averageRating = count > 0 ? (sum / count).toFixed(2) : 0.0;
    return averageRating;
  }

  function calculateSingleAverageRating(feedbackDetails) {
    let sum = 0;
    let count = 0;

    for (const item of feedbackDetails) {
      if (item.rate !== undefined) {
        sum += item.rate;
        count++;
      }
    }

    const averageRating = count > 0 ? (sum / count).toFixed(2) : 0.0;
    return averageRating;
  }

  const handleOpenModal = (feedback) => {
    feedback?.feedbackDetails.sort((a, b) => {
      if (a.type === 'TEXT') return -1;
      if (b.type === 'TEXT') return 1;
      return 0;
    });
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (event) => {
    const searchInput = event.target.value;
    setSearchValue(searchInput);
  };

  // Filter the evaluate array based on the search input value and username
  const filteredEvaluate =
    evaluate &&
    evaluate.filter((s) => s.enroll.student.account.username.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    evaluate && (
      <div className="m-5">
        <div style={{ margin: '20px' }}>
          <Paper style={{ padding: '20px' }}>
            <CustomBreadcrumbs items={breadcrumbItems} />

            <div style={{ marginTop: '20px' }}>
              <TextField label="Tổng đánh giá:" value={totalRate} />
              <TextField label="Độ uy tín:" style={{ marginLeft: '20px' }} value={rating} />
            </div>

            <div style={{ marginTop: '20px' }} className="d-flex align-items-center">
              <Typography variant="h6">Danh sách nhận xét</Typography>
              <InputBase
                placeholder="Search"
                style={{ marginLeft: '20px' }}
                startAdornment={<Search />}
                onChange={handleSearchChange}
              />
            </div>

            <Table style={{ marginTop: '20px' }}>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Tên sinh viên</TableCell>
                  <TableCell>Điểm đánh giá</TableCell>
                  <TableCell>Ngày Tạo</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEvaluate &&
                  filteredEvaluate.length > 0 &&
                  filteredEvaluate.map((s, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{s.enroll.student.account.username}</TableCell>
                        <TableCell>{calculateSingleAverageRating(s?.feedbackDetails)} / 5</TableCell>
                        <TableCell>{s.createDate}</TableCell>
                        <TableCell>
                          <Button variant="outlined" onClick={() => handleOpenModal(s)}>
                            Chi tiết
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Paper>
        </div>
        <FeedbackModal open={isModalOpen} onClose={handleCloseModal} data={selectedFeedback} />
      </div>
    )
  );
};

export default ListFeedback;
