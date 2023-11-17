import { Divider, IconButton, Typography } from '@mui/material';
import Footer from '../../../../components/Landing/Footer/Footer';
import Header from '../../../../components/Landing/Header/Header';
import { Container } from 'reactstrap';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import moment from 'moment/moment';
import { ResultQuizControllerApi } from '../../../../api/generated/generate-api';
import ApiClientSingleton from '../../../../api/apiClientImpl';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const resultQuizApi = new ResultQuizControllerApi(ApiClientSingleton.getInstance());
function Grades() {
  const user = JSON.parse(Cookies.get('user'));
  const { courseId } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    resultQuizApi.findAllByStudentAndCourse(user?.studentId, courseId, (err, res) => {
      if (res) {
        console.log(res);
        setResults(res);
      }
    });
  }, [courseId]);
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-1"></div>
        <div className="col-4">
          <Typography variant="subtitle1">Bài kiểm tra</Typography>
        </div>
        <div className="col-2">
          <Typography variant="subtitle1">Điểm</Typography>
        </div>
        <div className="col-2">
          <Typography variant="subtitle1">Trạng thái</Typography>
        </div>
        <div className="col-2">
          <Typography variant="subtitle1">Ngày nộp</Typography>
        </div>
      </div>
      <Divider className="py-2" />
      {results?.map((grade) => {
        if (grade) {
          return (
            <>
              <div
                className="row align-items-center justify-content-center py-3"
                style={{
                  border: '1px solid #e5e7e8',
                }}
              >
                <div className="col-1  d-flex justify-content-end">
                  {grade?.resultStatus === 'PASS' ? (
                    <IconButton style={{ color: '#1d7c50' }}>
                      <CheckCircleIcon />
                    </IconButton>
                  ) : (
                    <IconButton style={{ color: '#ff173d' }}>
                      <CancelIcon />
                    </IconButton>
                  )}
                </div>
                <div className="col-4">
                  <Typography variant="subtitle1">{grade?.quiz.title}</Typography>
                </div>
                <div className="col-2">
                  <Typography variant="subtitle1">{grade?.lastPoint}</Typography>
                </div>
                <div className="col-2">
                  <Typography variant="subtitle1">{grade?.resultStatus}</Typography>
                </div>
                <div className="col-1">
                  <Typography variant="subtitle1">{moment(grade?.submitTime).format('DD/MM/YYYY HH:MM:SS')}</Typography>
                </div>
              </div>
            </>
          );
        }
      })}
    </>
  );
}

export default Grades;
