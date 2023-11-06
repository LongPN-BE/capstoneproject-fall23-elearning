import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import BookRoundedIcon from "@mui/icons-material/BookRounded";
import AllLessonIcon from "@mui/icons-material/LibraryBooksOutlined";
import CreateLessonIcon from "@mui/icons-material/ImportContactsRounded";
import ListCourseIcon from "@mui/icons-material/CardTravelRounded";
import CourseIcon from '@mui/icons-material/TabRounded';
import CreateCourseIcon from '@mui/icons-material/AssignmentReturnRounded';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaidIcon from '@mui/icons-material/Paid';

export const DISPLAY_LOADING = 'DISPLAY_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';

// export const DOMAIN = "http://localhost:8080";
export const DOMAIN = 'https://dummyjson.com';
export const TOKEN = 'access_token';
export const STATUS_CODE = {
  SUCCESS: 200,
};

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
    // {
    //     label: 'Quản lý khóa học',
    //     icon: <ListCourseIcon />,
    //     path: '/subjects',
    // },
    {
      label: 'Quản lý khóa học',
      icon: <ListCourseIcon />,
      path: '/manage-course',
    },
    {
      label: 'Ngân hàng câu hỏi',
      icon: <QuestionMarkIcon />,
      path: '/question-banks',
    },
    {
      label: 'Chính sách tài chính',
      icon: <LocalPoliceOutlinedIcon />,
      path: '/policies',
    },
    {
      label: 'Quản lí hồ sơ',
      icon: <Person2OutlinedIcon />,
      path: '/profile',
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
  staff: [
    {
      label: 'Dashboard',
      icon: <GridViewRoundedIcon />,
      path: '/dashboard',
    },
    {
      label: 'Quản lý môn học',
      icon: <BookRoundedIcon />,
      subItems: [
        {
          label: 'Mon hoc',
          icon: <GridViewRoundedIcon />,
          path: '/subjects',
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
          label: 'Quản lý khóa học',
          icon: <ListCourseIcon />,
          path: '/manage-course',
        },
        {
          label: 'Ngân hàng câu hỏi',
          icon: <QuestionMarkIcon />,
          path: '/question-bank',
        },
        {
          label: 'Chính sách tài chính',
          icon: <LocalPoliceOutlinedIcon />,
          path: '/policies'

        },
        {
          label: 'Danh sách môn học',
          icon: <AllLessonIcon />,
          path: '/subjects',
        },
        {
          label: 'Danh sách khoá học',
          icon: <CreateLessonIcon />,
          path: '/all-courses',
        },
      ],
    },
    {
      label: 'Quản lý tài chính',
      icon: <AccountBalanceIcon />,
      subItems: [
        {
          label: 'Lịch sử giao dịch',
          icon: <ReceiptIcon />,
          path: '/transaction',
        },
        {
          label: 'Lịch sử chi trả',
          icon: <PaidIcon />,
          path: '/payment-history',
        },
      ],
    },
    // Add more manager-specific items
  ],
};

export const rating = [
  {
    id: 1,
    rate: 1,
    label: 'Rất không hài lòng'
  },
  {
    id: 3,
    rate: 2,
    label: 'Không hài lòng'
  },
  {
    id: 3,
    rate: 3,
    label: 'Bình thường'
  }
  , {
    id: 4,
    rate: 4,
    label: 'Hài lòng'
  }
  , {
    id: 5,
    rate: 5,
    label: 'Rất hài lòng'
  }
]

export const vapidKey = "BNuvvPsZSm3fWGQXoH5-jar9X-tfA1a6ux3usC1ESFl5bsvc2FaZP4vLsk9lvCXDvlOpO-w1jBphfUy7_uszC9k"