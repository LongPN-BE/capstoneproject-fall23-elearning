import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, CardMedia, Button, styled } from '@mui/material';
import { useNavigate } from 'react-router';
import { CourseControllerApi, EnrollControllerApi } from '../../../api/generated/generate-api';
import ApiClientSingleton from '../../../api/apiClientImpl';

const CustomCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
  padding: theme.spacing(2),
  transition: 'box-shadow 0.3s ease', // Add transition for smooth hover effect
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add box-shadow on hover
    cursor: 'pointer',
  },
}));

const ImageContainer = styled(CardMedia)(({ theme }) => ({
  width: 200,
  height: 140,
  marginRight: theme.spacing(2),
}));

const ContentContainer = styled(CardContent)(({ theme }) => ({
  flex: 1,
}));

const ButtonContainer = styled(Button)(({ theme }) => ({
  marginLeft: 'auto',
}));

const TypographyWithPadding = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2), // Add more margin (padding) between Typography components
}));

const enrollApi = new EnrollControllerApi(ApiClientSingleton.getInstance());
const TabCourse = ({ courseData, courseAccount, type }) => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    enrollApi.getCourseEnroll({ status: type === 'completed' ? 'DONE' : 'PROCESSING', page: 0, size: 20 }, (err, res) =>
      setCourses(res.contents),
    );
  }, []);
  return (
    <div className="container">
      <Typography variant="h4" gutterBottom>
        {type} courses
      </Typography>
      <div>
        {courses?.map((course) => {
          return (
            <div
              key={course.id}
              className="my-5"
              onClick={() => {
                navigate(`/courses/${course.id}`);
              }}
            >
              <TypographyWithPadding variant="h6" component="div">
                {course.name}
              </TypographyWithPadding>
              <CustomCard>
                <ImageContainer component="img" image={course.image} alt={course.name} />
                <ContentContainer>
                  <TypographyWithPadding variant="body2" color="text.secondary">
                    {course.description}
                  </TypographyWithPadding>
                  <TypographyWithPadding variant="body2" color="text.secondary">
                    Deadline: {course.limitTime}
                  </TypographyWithPadding>
                  <TypographyWithPadding variant="body2" color="error">
                    ⚠️ Warning Icon
                  </TypographyWithPadding>
                </ContentContainer>
                <div>
                  <ButtonContainer variant="contained" color="primary">
                    Go to Course
                  </ButtonContainer>
                  <TypographyWithPadding variant="body2" color="text.secondary">
                    Push And Date
                  </TypographyWithPadding>
                </div>
              </CustomCard>
            </div>
          );

          // if (inProcessAccount) {
          //   return (
          //     <div
          //       key={course.id}
          //       className="my-5"
          //       onClick={() => {
          //         window.location.href = `/courses/${course.id}`;
          //       }}
          //     >
          //       <TypographyWithPadding variant="h6" component="div">
          //         {course.name}
          //       </TypographyWithPadding>
          //       <CustomCard>
          //         <ImageContainer
          //           component="img"
          //           image={course.image}
          //           alt={course.name}
          //         />
          //         <ContentContainer>
          //           <TypographyWithPadding
          //             variant="body2"
          //             color="text.secondary"
          //           >
          //             {course.description}
          //           </TypographyWithPadding>
          //           <TypographyWithPadding
          //             variant="body2"
          //             color="text.secondary"
          //           >
          //             Deadline: {course.limitTime}
          //           </TypographyWithPadding>
          //           <TypographyWithPadding variant="body2" color="error">
          //             ⚠️ Warning Icon
          //           </TypographyWithPadding>
          //         </ContentContainer>
          //         <div>
          //           <ButtonContainer variant="contained" color="primary">
          //             Go to Course
          //           </ButtonContainer>
          //           <TypographyWithPadding
          //             variant="body2"
          //             color="text.secondary"
          //           >
          //             Push And Date
          //           </TypographyWithPadding>
          //         </div>
          //       </CustomCard>
          //     </div>
          //   );
          // }

          // return null;
        })}
      </div>
    </div>
  );
};

export default TabCourse;
