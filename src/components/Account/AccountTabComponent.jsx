import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
    InputBase
} from '@mui/material';
import { Paper } from '@material-ui/core';
import { Search } from '@material-ui/icons';

function AccountTabComponent({ activeCourses, pendingCourses, deActiveCourses }) {
    const [tabValue, setTabValue] = useState(1);
    const [searchText, setSearchText] = useState('');

    // Determine the course array based on the selected tab
    let selectedCourses;
    switch (tabValue) {
        case 0:
            selectedCourses = activeCourses;
            break;
        case 1:
            selectedCourses = pendingCourses;
            break;
        case 2:
            selectedCourses = deActiveCourses;
            break;
        default:
            selectedCourses = pendingCourses;
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
                <Tab className="p-3" label="Không hoạt động" />
            </Tabs>

            <Paper style={{ padding: '10px' }}>
                <div className="search-box d-flex justify-content-between">
                    <div className="d-flex">
                        <InputBase
                            placeholder="Tìm kiếm..."
                            className="search-input"
                            startAdornment={<Search />}
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </Paper>

            <CourseTableComponent courses={filteredCourses} />
        </div>
    );
}

export default AccountTabComponent;
