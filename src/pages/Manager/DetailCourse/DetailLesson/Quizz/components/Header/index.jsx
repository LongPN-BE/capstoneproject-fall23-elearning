import classNames from 'classnames';
import Styles from './HeaderQuiz.module.scss';
import 'bootstrap/dist/css/bootstrap.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function HeaderQuiz({ name, timeMinute, point, due, onAutoSubmit, lesson }) {
  const { courseId, lessonId, id } = useParams();
  const user = JSON.parse(Cookies.get('user'));
  const navigate = useNavigate();
  return (
    <>
      <div className={`d-flex ${classNames(Styles.header__quiz)} align-items-center`}>
        <div style={{ marginLeft: '4rem' }}>
          <Button
            onClick={(e) => navigate(-1)}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            style={{ border: 'none' }}
          >
            <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
              Trở lại
            </Typography>
          </Button>
        </div>
        <div
          className="d-flex flex-grow-1 align-items-center justify-content-between"
          style={{ margin: '0 1rem', height: '90%' }}
        >
          <div className="">
            <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
              {lesson?.name} - {name}
            </Typography>
            <Typography variant="subtitle2">
              Bài {name} • {timeMinute} phút • Điểm đạt là {point}/10 tổng điểm
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1">
              <bold>Ngày hết hạn:</bold> {due}
            </Typography>
          </div>
        </div>
      </div>
      <hr className="m-0" />
    </>
  );
}

export default HeaderQuiz;
