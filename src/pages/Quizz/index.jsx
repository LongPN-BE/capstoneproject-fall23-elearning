import moment from "moment/moment";
import HeaderQuiz from "./components/Header";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Container } from "reactstrap";

const QuizzInfo = {
  id: 1,
  name: "Module 1 Challenge",
  timeMinute: 50,
  point: 10,
  due: moment(new Date()).format("DD/MM/YYYY HH:MM:SS"),
  questions: [
    {
      id: 1,
      questionName:
        "Which of the following best describes why there is increasing demand for project management roles in today’s job market?",
      options: [
        {
          id: 1,
          optionName:
            "There’s significant turnover in the project management field.",
        },
        {
          id: 2,
          optionName:
            "Project management roles are designed to adapt to changes and handle new processes as they come up.",
        },
        {
          id: 3,
          optionName: "Project management is a relatively new job title.",
        },
        {
          id: 4,
          optionName:
            "Project management isn’t adequately compensated when compared to similar roles.",
        },
      ],
    },
    {
      id: 2,
      questionName:
        "Which of the following best describes why there is increasing demand for project management roles in today’s job market?",
      options: [
        {
          id: 1,
          optionName:
            "There’s significant turnover in the project management field.",
        },
        {
          id: 2,
          optionName:
            "Project management roles are designed to adapt to changes and handle new processes as they come up.",
        },
        {
          id: 3,
          optionName: "Project management is a relatively new job title.",
        },
        {
          id: 4,
          optionName:
            "Project management isn’t adequately compensated when compared to similar roles.",
        },
      ],
    },
  ],
};

function Quizz() {
  return (
    <>
      <HeaderQuiz
        name={QuizzInfo.name}
        timeMinute={QuizzInfo.timeMinute}
        point={QuizzInfo.point}
        due={QuizzInfo.due}
      />
      <Container className="my-4">
        <div className="d-flex align-items-center justify-content-center gap-4 flex-column">
          {QuizzInfo?.questions?.map((question, index) => {
            return (
              <FormControl>
                <FormLabel
                  style={{ color: "#1f1f1f" }}
                  id="demo-radio-buttons-group-label"
                >
                  <strong>{index + 1}: </strong>
                  {question.questionName}
                </FormLabel>
                <Container>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    {question?.options?.map((option) => {
                      return (
                        <>
                          <FormControlLabel
                            value={option.id}
                            control={<Radio />}
                            label={option.optionName}
                          />
                        </>
                      );
                    })}
                  </RadioGroup>
                </Container>
              </FormControl>
            );
          })}
        </div>
      </Container>
    </>
  );
}

export default Quizz;
