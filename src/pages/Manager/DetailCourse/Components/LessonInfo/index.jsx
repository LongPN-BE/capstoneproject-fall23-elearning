import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { LessonControllerApi } from '../../../../../api/generated/generate-api';
import ApiClientSingleton from '../../../../../api/apiClientImpl';
import { useNavigate, useParams } from 'react-router-dom';

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const lessonApi = new LessonControllerApi(ApiClientSingleton.getInstance());

function LessonInfo() {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);

  const { courseId } = useParams();
  useEffect(() => {
    lessonApi.findLessonByCourseId(courseId, (error, res) => {
      console.log(res);
      setLessons(res);
    });
  }, [courseId]);

  return (
    <>
      <div>
        {lessons?.map((data) => {
          return (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Typography>{data?.name}</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ cursor: 'pointer' }} onClick={() => navigate(`/courses/${courseId}/learn`)}>
                <Typography>{data?.description}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </>
  );
}

export default LessonInfo;
