import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import {
  LessonControllerApi,
  QuizControllerApi,
  QuizResultQuizView,
  ResourceControllerApi,
  ResultQuizControllerApi,
} from '../../../../api/generated/generate-api';
import ApiClientSingleton from '../../../../api/apiClientImpl';
import LearnReading from './components/LearnReading';
import LearnVideo from './components/LearnVideo';
import ReactPlayer from 'react-player';
import { Typography } from '@mui/material';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import 'react-quill/dist/quill.snow.css';
import './index.scss';
import Cookies from 'js-cookie';
import PreviewQuizz from './Quizz';

const resourceApi = new ResourceControllerApi(ApiClientSingleton.getInstance());
const lessonApi = new LessonControllerApi(ApiClientSingleton.getInstance());
const quizApi = new QuizControllerApi(ApiClientSingleton.getInstance());
const quizResultApi = new ResultQuizControllerApi(ApiClientSingleton.getInstance());
function PreviewLesson() {
  const { lessonId, type, id } = useParams();
  const [resources, setResources] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [quizResult, setQuizResult] = useState();
  const [lesson, setLesson] = useState();
  const user = JSON.parse(Cookies.get('user'));
  useEffect(() => {
    lessonApi.getLessonById(lessonId, (err, res) => {
      if (res) {
        setLesson(res);
      }
    });
    if (type === 'Quiz') {
      quizApi.findQuizById(id, (err, res) => {
        setQuiz(res);
      });
    } else {
      resourceApi.getResourceByLesson(lessonId, (err, res) => {
        if (res) {
          setResources(res);
        }
      });
    }
  }, [lessonId, type, id]);
  const resultMax = () => {
    if (quizResult) {
      quizResult?.sort((q1, q2) => q2?.lastPoint - q1?.lastPoint);
      return quizResult[0];
    }
    return undefined;
  };
  const checkTimeQuiz = () => {
    const now = new Date().getTime();
    const dateTo = new Date(moment(quiz?.dateCreate).add(quiz?.dateRange, 'days').format('YYYY-MM-DD')).getTime();
    if (now > dateTo) {
      return false;
    }
    return true;
  };
  return (
    <>
      <div className="d-flex ">
        {type === 'Quiz' ? (
          <></>
        ) : (
          <>
            <Typography className="mt-3" variant="h5" gutterBottom>
              {lesson?.name}: <span style={{ color: '#495057' }}>{lesson?.description}</span>
            </Typography>
          </>
        )}
      </div>
      {type === 'VIDEO' ? (
        <div className="d-flex justify-content-center">
          {lesson?.url ? (
            <LearnVideo url={lesson?.url} />
          ) : (
            <div className="ql-editor cus-video" style={{ padding: 0, marginLeft: '20px', wordBreak: 'break-word' }}>
              <div dangerouslySetInnerHTML={{ __html: lesson?.content || '' }} />
            </div>
          )}
        </div>
      ) : type === 'READING' ? (
        <LearnReading content={lesson?.content} />
      ) : type === 'Quiz' ? (
        <>
          <PreviewQuizz />
        </>
      ) : (
        <></>
      )}
      {resources?.map((data) => {
        if (data.resourceType === 'READING') {
          if (data.content.startsWith('http')) {
            return (
              <div className="mt-3 d-flex align-items-center gap-2">
                <div>
                  <CodeIcon /> Link tài liệu:{' '}
                </div>
                <div>
                  <a href={data.content} target="_blank">
                    {data.content}
                  </a>
                </div>
              </div>
            );
          }
          return <div>{data.content}</div>;
        }
      })}
    </>
  );
}

export default PreviewLesson;
