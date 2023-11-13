import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'reactstrap';
import { Outlet, useParams } from 'react-router-dom';
import { Avatar, Dialog, Divider, Typography } from '@mui/material';
import LeftNavBar from './Components/LeftNavBar';


const CourseDetail = ({ isOpen, onClose, course }) => {

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <Container className="mt-4">
        <Divider className="my-4" />
        <div className="row">
          <div className="col-3">
            <div className="d-flex flex-column gap-3">
              <Avatar variant="rounded" alt={course?.name} src={course?.image} sx={{ width: 114, height: 114 }} />
              <Typography variant="h5">{course?.name}</Typography>
              <div>
                <LeftNavBar courseId={course?.id} />
              </div>
            </div>
          </div>
          <div className="col-9">
            <Outlet />
          </div>
        </div>
      </Container>
    </Dialog>
  );
};
export default CourseDetail;
