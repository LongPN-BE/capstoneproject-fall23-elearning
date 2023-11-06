import { Divider, IconButton, Typography } from "@mui/material";
import Footer from "../../../../components/Landing/Footer/Footer";
import Header from "../../../../components/Landing/Header/Header";
import { Container } from "reactstrap";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import moment from "moment/moment";

function Grades() {
  const grades = [
    {
      id: 1,
      name: "Module 1 Challenge",
      type: "QUIZ",
      status: "Passed",
      due: moment(new Date()).format("MMMM Do YYYY, h:mm:ss a"),
      weight: "25%",
      grade: "100%",
    },
    {
      id: 2,
      name: "Module 2 Challenge",
      type: "QUIZ",
      status: "Passed",
      due: moment(new Date()).format("MMMM Do YYYY, h:mm:ss a"),
      weight: "25%",
      grade: "100%",
    },
    {
      id: 3,
      name: "Module 3 Challenge",
      type: "QUIZ",
      status: "Passed",
      due: moment(new Date()).format("MMMM Do YYYY, h:mm:ss a"),
      weight: "25%",
      grade: "100%",
    },
    {
      id: 4,
      name: "Module 4 Challenge",
      type: "QUIZ",
      status: "Passed",
      due: moment(new Date()).format("MMMM Do YYYY, h:mm:ss a"),
      weight: "25%",
      grade: "100%",
    },
  ];
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-1"></div>
        <div className="col-4">
          <Typography variant="subtitle1">Item</Typography>
        </div>
        <div className="col-2">
          <Typography variant="subtitle1">Status</Typography>
        </div>
        <div className="col-2">
          <Typography variant="subtitle1">Due</Typography>
        </div>
        <div className="col-1">
          <Typography variant="subtitle1">Weight</Typography>
        </div>
        <div className="col-2">
          <Typography variant="subtitle1">Grade</Typography>
        </div>
      </div>
      <Divider className="py-2" />
      {grades.map((grade) => {
        return (
          <>
            <div
              className="row align-items-center justify-content-center py-3"
              style={{
                border: "1px solid #e5e7e8",
              }}
            >
              <div className="col-1  d-flex justify-content-end">
                <IconButton style={{ color: "#1d7c50" }}>
                  <CheckCircleIcon />
                </IconButton>
              </div>
              <div className="col-4">
                <Typography variant="subtitle1">{grade.name}</Typography>
              </div>
              <div className="col-2">
                <Typography variant="subtitle1">{grade.status}</Typography>
              </div>
              <div className="col-2">
                <Typography variant="subtitle1">{grade.due}</Typography>
              </div>
              <div className="col-1">
                <Typography variant="subtitle1">{grade.grade}</Typography>
              </div>
              <div className="col-2">
                <Typography variant="subtitle1">{grade.grade}</Typography>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default Grades;
