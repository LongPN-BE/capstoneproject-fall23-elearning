
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
// import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
// import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
// import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
// import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
// import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
// import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
// import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
// import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

import BookRoundedIcon from "@mui/icons-material/BookRounded";
import AllLessonIcon from "@mui/icons-material/LibraryBooksOutlined";
import CreateLessonIcon from "@mui/icons-material/ImportContactsRounded";
import CourseIcon from "@mui/icons-material/TabRounded";
import ListCourseIcon from "@mui/icons-material/CardTravelRounded";
import CreateCourseIcon from "@mui/icons-material/AssignmentReturnRounded";

export const DISPLAY_LOADING = "DISPLAY_LOADING";
export const HIDE_LOADING = "HIDE_LOADING";

// export const DOMAIN = "http://localhost:8080";
export const DOMAIN = "https://dummyjson.com";
export const TOKEN = "access_token";
export const STATUS_CODE = {
    SUCCESS: 200,
};

// export const nav = [
//     { icon: 'fa-palette', label: 'Your Work', roles: ['admin', 'teacher', 'manager'], },
//     { icon: 'fa-images', label: 'Assets', roles: ['admin', 'teacher'] },
//     { icon: 'fa-thumbtack', label: 'Pinned Items', roles: ['admin', 'manager'] },
//     { icon: 'fa-heart', label: 'Following', roles: ['teacher', 'manager'] },
//     { icon: 'fa-chart-line', label: 'Trending', roles: ['admin', 'manager'] },
//     { icon: 'fa-fire', label: 'Challenges', roles: ['teacher'] },
//     { icon: 'fa-magic', label: 'Spark', roles: ['admin'] },
//     { icon: 'fa-gem', label: 'Codepen Pro', roles: ['admin', 'manager'] },
// ];


export const navData = {
    admin: [
        {
            label: 'Dashboard',
            icon: <GridViewRoundedIcon />,
            path: '/',
        },
        // Add more admin-specific items
    ],
    teacher: [
        {
            label: 'Dashboard',
            icon: <GridViewRoundedIcon />,
            path: '/',
        },
        {
            // label: 'Quản lý môn học',
            // icon: <CourseIcon />,
            // subItems: [
            //     {

            //     }
            //     // ,
            //     // {
            //     //     label: 'Create Course',
            //     //     icon: <CreateCourseIcon />,
            //     //     path: '/create-course',
            //     // },
            // ],
            label: 'Quản lý môn học',
            icon: <ListCourseIcon />,
            path: '/subjects',
        },
        // {
        //     label: 'Manage Lesson',
        //     icon: <BookRoundedIcon />,
        //     subItems: [
        //         {
        //             label: 'List Lesson',
        //             icon: <AllLessonIcon />,
        //             path: '/lessons',
        //         },
        //         {
        //             label: 'Create Lesson',
        //             icon: <CreateLessonIcon />,
        //             path: '/create-lesson',
        //         },
        //     ],
        // },
        // Add more teacher-specific items
    ],
    manager: [
        {
            label: 'Dashboard',
            icon: <GridViewRoundedIcon />,
            path: '/',
        },
        {
            label: 'Manage Lesson',
            icon: <BookRoundedIcon />,
            subItems: [
                {
                    label: 'List Lesson',
                    icon: <AllLessonIcon />,
                    path: '/lessons',
                },
                {
                    label: 'Create Lesson',
                    icon: <CreateLessonIcon />,
                    path: '/create-lesson',
                },
            ],
        },
        // Add more manager-specific items
    ],
    admin: [
        {
            label: 'Dashboard',
            icon: <GridViewRoundedIcon />,
            path: '/',
        },
        {
            label: 'Manage Account',
            icon: <BookRoundedIcon />,
            path: '/accounts',
        },
        // Add more manager-specific items
    ],
};