import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CourseTableComponent from '../CourseTableComponent/CourseTableComponent';
import {
  InputBase,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Typography,
  Box,
  Divider,
} from '@mui/material';

function CourseTabComponent({ activeCourses, pendingCourses }) {
  const [tabValue, setTabValue] = useState(0);
  const [searchText, setSearchText] = useState('');
  // const navigate = useNavigate()

  // Determine the course array based on the selected tab
  let selectedCourses;
  switch (tabValue) {
    case 0:
      selectedCourses = activeCourses;
      break;
    case 1:
      selectedCourses = pendingCourses;
      break;
    default:
      selectedCourses = activeCourses;
  }

  // Filter courses based on the search text
  const filteredCourses = selectedCourses.filter((course) =>
    course.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <Tabs value={tabValue} onChange={handleTabChange} centered className="d-flex ">
        <Tab className="p-3" label="Đang hoạt động" />
        <Tab className="p-3" label="Chờ xét duyệt" />
      </Tabs>
      <div className="search-box d-flex justify-content-between">
        <div className="d-flex">
          <InputBase
            placeholder="Search..."
            className="search-input"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <CourseTableComponent courses={filteredCourses} />
    </div>
  );
}

export default CourseTabComponent;
