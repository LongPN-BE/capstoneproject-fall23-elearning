import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SmsIcon from '@mui/icons-material/Sms';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { CourseControllerApi, SyllabusControllerApi } from '../../../../api/generated/generate-api';
import { CourseControllerApi, SyllabusControllerApi } from '../../../../../api/generated/generate-api';
import ApiClientSingleton from '../../../../../api/apiClientImpl';

const courseApi = new CourseControllerApi(ApiClientSingleton.getInstance());
const syllabusApi = new SyllabusControllerApi(ApiClientSingleton.getInstance());
function CourseInfo() {
  const [course, setCourse] = useState();
  const [syllabus, setSyllabus] = useState();
  const { courseId } = useParams([]);

  useEffect(() => {
    courseApi.getCourseById(courseId, (error, res) => {
      setCourse(res);
    });
    syllabusApi.findSyllabusByCourseId(courseId, (err, res) => {
      console.log(res);
      setSyllabus(res);
    });
  }, [courseId]);

  return (
    <>
      <div className="d-flex flex-column gap-3">
        <Typography variant="h6">Course Info</Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <InsertDriveFileIcon />
                  {course?.name}
                </TableCell>
                <TableCell>{course?.description}</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <CheckCircleIcon />
                  Level
                </TableCell>
                <TableCell>Beginner</TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <SmsIcon />
                  Language
                </TableCell>
                <TableCell>
                  English, Subtitles: Romanian, Russian Volunteer to translate subtitles for this course
                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <WorkspacePremiumIcon />
                  How To Pass
                </TableCell>
                <TableCell>Pass all graded assignments to complete the course.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6">Syllabus</Typography>
        <Divider />
        <div>
          {syllabus?.map((data) => {
            return (
              <>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography>{data?.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet
                      blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CourseInfo;
