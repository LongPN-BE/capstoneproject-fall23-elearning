import moment from 'moment/moment';
import HeaderQuiz from './components/Header';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Container } from 'reactstrap';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import {
  EnrollControllerApi,
  LessonControllerApi,
  QuizControllerApi,
  UsedQuestionControllerApi,
} from '../../api/generated/generate-api';
import ApiClientSingleton from '../../api/apiClientImpl';
import { useForm } from 'react-hook-form';

const questionApi = new UsedQuestionControllerApi(ApiClientSingleton.getInstance());
const quizApi = new QuizControllerApi(ApiClientSingleton.getInstance());
const enrollApi = new EnrollControllerApi(ApiClientSingleton.getInstance());
const lessonApi = new LessonControllerApi(ApiClientSingleton.getInstance());
function Quizz() {
  const { courseId, lessonId, id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState();
  const [lesson, setLesson] = useState();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    quizApi.findQuizById(id, (err, res) => {
      if (res) {
        setQuiz(res);
      }
    });
    questionApi.findAllUsedQuestionByDoQuizId(id, (err, res) => {
      setQuestions(res);
    });
    lessonApi.getLessonById(lessonId, (err, res) => {
      if (res) {
        setLesson(res);
      }
    });
  }, [id]);
  const onSubmitQuiz = (data) => {
    enrollApi.findEnrollByCourseId(courseId, (err, res) => {
      if (res) {
        const enrollId = res[0]?.id;
        // đán án thực hiện
        const params = {
          quizId: id,
          enrollId: enrollId,
          doQuizDetailRequests: questions
            ?.map((item) => {
              if (data[`${item.id}`])
                return {
                  questionId: item.id,
                  answerIds: [Number(data[`${item.id}`])],
                };
            })
            ?.filter((item) => item),
        };
        quizApi.doQuiz(params, (err, res) => {
          if (res) {
            navigate(`/courses/${courseId}/learn/${lessonId}/Quiz/${id}`);
          }
        });
      }
    });
  };
  console.log(moment(quiz?.dateCreate).add(quiz?.dateRange, 'days').format('DD/MM/YYYY'));
  return (
    <>
      <HeaderQuiz
        name={quiz?.title}
        timeMinute={quiz?.duration}
        point={quiz?.passScore}
        due={quiz ? moment(quiz?.dateCreate).add(quiz?.dateRange, 'days').format('DD/MM/YYYY') : undefined}
        onAutoSubmit={handleSubmit(onSubmitQuiz)}
        lesson={lesson}
      />
      <Container className="my-4">
        <form onSubmit={handleSubmit(onSubmitQuiz)}>
          <div className="d-flex align-items-start justify-content-center">
            <div className="d-flex align-items-start justify-content-center gap-4 flex-column" style={{ width: '70%' }}>
              <FormControl>
                {questions?.map((question, index) => {
                  return (
                    <>
                      <FormLabel style={{ color: '#1f1f1f' }} id="demo-radio-buttons-group-label">
                        <strong>{index + 1}: </strong>
                        {question.content}
                      </FormLabel>
                      <Container>
                        <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                          {question?.usedAnswers?.map((option) => {
                            return (
                              <>
                                <FormControlLabel
                                  {...register(`${question.id}`)}
                                  value={option.id}
                                  control={<Radio />}
                                  label={option.content}
                                />
                              </>
                            );
                          })}
                        </RadioGroup>
                      </Container>
                    </>
                  );
                })}
              </FormControl>
              <button
                type="submit"
                style={{
                  padding: '8px 20px',
                  backgroundColor: '#00419e',
                  color: '#fff',
                  borderRadius: '6px',
                }}
                onClick={() => {
                  console.log(useForm);
                }}
              >
                Nộp bài
              </button>
            </div>
          </div>
        </form>
      </Container>
    </>
  );
}

export default Quizz;
