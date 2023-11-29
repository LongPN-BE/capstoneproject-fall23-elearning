import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import AllLessonIcon from '@mui/icons-material/LibraryBooksOutlined';
import CreateLessonIcon from '@mui/icons-material/ImportContactsRounded';
import ListCourseIcon from '@mui/icons-material/CardTravelRounded';
import CourseIcon from '@mui/icons-material/TabRounded';
import CreateCourseIcon from '@mui/icons-material/AssignmentReturnRounded';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaidIcon from '@mui/icons-material/Paid';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import ReportIcon from '@mui/icons-material/Report';

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
    // {
    //   label: 'Chính sách tài chính',
    //   icon: <LocalPoliceOutlinedIcon />,
    //   path: '/policies',
    // },
    {
      label: 'Quản lí hồ sơ',
      icon: <Person2OutlinedIcon />,
      path: '/my-profile',
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
    // {
    //   label: 'Dashboard',
    //   icon: <GridViewRoundedIcon />,
    //   path: '/dashboard',
    // },
    // {
    //   label: 'Quản lý tài khoản',
    //   icon: <GridViewRoundedIcon />,
    //   subItems: [
    //     {
    //       label: 'Tài khoản',
    //       icon: <PeopleAltIcon />,
    //       path: '/accounts',
    //     },
    //     {
    //       label: 'Báo cáo',
    //       icon: <ReportIcon />,
    //       path: '/report-accounts',
    //     },
    //   ],
    // },
    {
      label: 'Quản lý môn học',
      icon: <GridViewRoundedIcon />,
      subItems: [
        {
          label: 'Môn học',
          icon: <BookRoundedIcon />,
          path: '/subjects',
        },
        // {
        //   label: 'Báo cáo',
        //   icon: <ReportIcon />,
        //   path: '/report-accounts',
        // },
      ],
    },
    {
      label: 'Quản lý tài chính',
      icon: <AccountBalanceIcon />,
      subItems: [
        {
          label: 'Lịch sử giao dịch',
          icon: <ReceiptIcon />,
          path: '/transactions',
        },
        {
          label: 'Lịch sử thanh toán',
          icon: <PaidIcon />,
          path: '/payments',
        },
        // {
        //   label: 'Duyệt tiền',
        //   icon: <PaidIcon />,
        //   path: '/transaction-aprroved',
        // },
      ],
    },
    // {
    //   label: 'Cấu hình hệ thống',
    //   icon: <SettingsIcon />,
    //   path: '/configs',
    // },
    // Add more manager-specific items
  ],

  admin: [
    // {
    //   label: 'Dashboard',
    //   icon: <GridViewRoundedIcon />,
    //   path: '/dashboard',
    // },
    {
      label: 'Quản lý tài khoản',
      icon: <GridViewRoundedIcon />,
      subItems: [
        {
          label: 'Tài khoản',
          icon: <PeopleAltIcon />,
          path: '/accounts',
        },
        // {
        //   label: 'Báo cáo',
        //   icon: <ReportIcon />,
        //   path: '/report-accounts',
        // },
      ],
    },

    // {
    //   label: 'Cấu hình hệ thống',
    //   icon: <SettingsIcon />,
    //   path: '/configs',
    // },
    // Add more manager-specific items
  ],
};

export const rating = [
  {
    id: 1,
    rate: 1,
    label: 'Rất không hài lòng',
  },
  {
    id: 3,
    rate: 2,
    label: 'Không hài lòng',
  },
  {
    id: 3,
    rate: 3,
    label: 'Bình thường',
  },
  {
    id: 4,
    rate: 4,
    label: 'Hài lòng',
  },
  {
    id: 5,
    rate: 5,
    label: 'Rất hài lòng',
  },
];

export const vapidKey = 'BNuvvPsZSm3fWGQXoH5-jar9X-tfA1a6ux3usC1ESFl5bsvc2FaZP4vLsk9lvCXDvlOpO-w1jBphfUy7_uszC9k';

export const invalidInput = 'number should positive and string should not be empty';
export const YOUR_SERVICE_ID = 'service_u5xhemm';
export const YOUR_TEMPLATE_ID = 'template_5gs2vrg';
export const YOUR_USER_ID = 'ePeH2byzQF0PCUbKv';
