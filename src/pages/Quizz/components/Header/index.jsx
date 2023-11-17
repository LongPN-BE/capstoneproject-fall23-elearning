import classNames from 'classnames';
import Styles from './HeaderQuiz.module.scss';
import 'bootstrap/dist/css/bootstrap.css';
import Timer from '../Timer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function HeaderQuiz({ name, timeMinute, point, due, onAutoSubmit, lesson }) {
  const { courseId, lessonId, id } = useParams();
  const user = JSON.parse(Cookies.get('user'));
  return (
    <>
      <div className={`d-flex ${classNames(Styles.header__quiz)} align-items-center`}>
        <div style={{ marginLeft: '4rem' }}>
          <Link to={`/courses/${courseId}/learn/${lessonId}/Quiz/${id}`} style={{ height: '100%' }} className="d-block">
            <Button variant="outlined" startIcon={<ArrowBackIcon />} style={{ border: 'none' }}>
              <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                Trở lại
              </Typography>
            </Button>
          </Link>
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
              Graded Quiz.• {timeMinute}m • Pass Score {point}/10 total point
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1">
              <strong>Họ Tên: </strong> {user?.name}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1">
              <strong>Due</strong> {due}
            </Typography>
            <Timer timeMinute={timeMinute} onAutoSubmit={onAutoSubmit} />
          </div>
        </div>
      </div>
      <hr className="m-0" />
    </>
  );
}

export default HeaderQuiz;
