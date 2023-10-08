import React, { useState } from 'react';
import {
    AppBar,
    Tabs,
    Tab,
    Typography,
    Box,
    Card,
    CardContent,
    CardMedia,
    Button,
    Grid,
} from '@mui/material';
import InProcessCourses from '../InProcessCourse/TabCourse';
import { courseAccount, courseData } from '../../../mock/mock-data';
import TabCourse from '../InProcessCourse/TabCourse';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
};

const StudentTabComponent = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                    sx={{
                        backgroundColor: 'white', // White background
                        '& .MuiTab-textColorInherit': {
                            color: 'black', // Black text color for all tabs
                        },
                        '& .Mui-selected': {
                            borderBottom: '2px solid blue', // Blue underline for the active tab
                            padding: '16px 24px', // Add more padding to the active tab (top and bottom)
                        },
                    }}
                >
                    <Tab label="Home" />
                    <Tab label="In Process" />
                    <Tab label="Completed" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Typography variant="h4" gutterBottom>
                    Home
                </Typography>
                {/* Add your home content here */}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TabCourse courseAccount={courseAccount} courseData={courseData} type={'in-process'} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TabCourse courseAccount={courseAccount} courseData={courseData} type={'completed'} />
            </TabPanel>
        </div>
    );
};

export default StudentTabComponent;
