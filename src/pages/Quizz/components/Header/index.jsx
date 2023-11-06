import classNames from "classnames";
import Styles from "./HeaderQuiz.module.scss";
import "bootstrap/dist/css/bootstrap.css";
import Timer from "../Timer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

function HeaderQuiz(props) {
  const { courseId, lessonId } = useParams();
  const { name, timeMinute, point, due } = props;
  return (
    <>
      <div
        className={`d-flex ${classNames(
          Styles.header__quiz
        )} align-items-center`}
      >
        <div style={{ marginLeft: "4rem" }}>
          <Link
            to={`/courses/${courseId}/learn/${lessonId}`}
            style={{ height: "100%" }}
            className="d-block"
          >
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              style={{ border: "none" }}
            >
              <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                Back
              </Typography>
            </Button>
          </Link>
        </div>
        <div
          className="d-flex flex-grow-1 align-items-start"
          style={{ margin: "0 1rem", height: "90%" }}
        >
          <div className="flex-grow-1">
            <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
              {name}
            </Typography>
            <Typography variant="caption">
              Graded Quiz.• {timeMinute}m • {point} total point
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle2">
              <strong>Due</strong> {due}
            </Typography>
            <Timer timeMinute={timeMinute} />
          </div>
        </div>
      </div>
      <hr className="m-0" />
    </>
  );
}

export default HeaderQuiz;
