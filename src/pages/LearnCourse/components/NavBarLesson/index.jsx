import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CodeIcon from "@mui/icons-material/Code";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function NavBarLesson(props) {
  const { courseId } = props;
  const lesson = [
    {
      id: 1,
      name: "Getting started with the program",
      contents: [
        {
          id: 1,
          type: "Video",
          name: "Welcome to the Google Project Management Certificate",
          success: false,
        },
        {
          id: 2,
          type: "Reading",
          name: "Program and course overview",
          success: true,
        },
        {
          id: 3,
          type: "Ungraded Plugin",
          name: "Commit to completing the program",
          success: false,
        },
      ],
    },
    {
      id: 2,
      name: "Understanding the basics of project management",
      contents: [
        {
          id: 1,
          type: "Video",
          name: "Welcome to the Google Project Management Certificate",
          success: false,
        },
        {
          id: 2,
          type: "Reading",
          name: "Program and course overview",
          success: true,
        },
        {
          id: 3,
          type: "Ungraded Plugin",
          name: "Commit to completing the program",
          success: false,
        },
      ],
    },
  ];
  const localtion = useLocation();
  const [expanded, setExpanded] = useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <>
      <div>
        {lesson.map((data) => {
          return (
            <>
              <Accordion
                expanded={expanded === data.id}
                onChange={handleChange(data.id)}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography>{data.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="d-flex flex-column gap-3">
                    {data?.contents?.map((item) => {
                      return (
                        <div className="d-flex align-items-start gap-2">
                          {item.success ? (
                            <CheckCircleOutlineIcon />
                          ) : item.type === "Video" ? (
                            <PlayCircleOutlineIcon />
                          ) : item.type === "Reading" ? (
                            <ImportContactsIcon />
                          ) : item.type === "Ungraded Plugin" ? (
                            <CodeIcon />
                          ) : (
                            ""
                          )}
                          <Link to={`/courses/2/learn/${item.id}`}>
                            <strong>{item.type}</strong>: {item.name}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </AccordionDetails>
              </Accordion>
            </>
          );
        })}
      </div>
    </>
  );
}

export default NavBarLesson;
