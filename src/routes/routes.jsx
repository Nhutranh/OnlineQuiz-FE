import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AuthLayout, DashBoardLayout } from '~/layouts';
import NotFound from '~/pages/NotFound';

import { Account, Category, ConfigurationLayout } from '~/pages/admin/Configuration';
//import { DetailExam, ExamList } from '~/pages/admin/Exam';

import Overview from '~/pages/admin/Overview';
import { QuestionWrapper } from '~/pages/admin/Question';
import { SignInPage, SignUpPage } from '~/pages/auth';
import { StartPractice, StudentExcises } from '~/pages/student';
import router from './const';
import ExamWrapper from '~/pages/admin/Exam/ExamWrapper';
import { CreateCategory } from '~/pages/admin/Caterogy';

const routes = createBrowserRouter([
  {
    path: router.root,
    element: <DashBoardLayout />,
    children: [
      {
        path: router.admin,
        children: [
          {
            index: true,
            element: <Navigate to={`${router.admin}/overview`} />,
          },
          {
            path: 'overview',
            element: <Overview />,
          },

          {
            path: 'question',
            element: <QuestionWrapper />,
          },
          {
            path: 'category',
            element: <CreateCategory />,
          },
          {
            path: 'exam',
            children: [
              {
                index: true,
                element: <ExamWrapper />,
              },
            ],
          },
          {
            path: 'students',
            element: <div>students</div>,
          },
          {
            path: 'configurations',
            element: <ConfigurationLayout />,
            children: [
              {
                index: true,
                element: <Navigate to={`${router.admin}/configurations/account`} />,
              },
              {
                path: 'account',
                element: <Account />,
              },
              {
                path: 'category',
                element: <Category />,
              },
            ],
          },
        ],
      },
      {
        path: router.student,
        children: [
          {
            index: true,
            element: <Navigate to={`${router.student}/excises`} />,
          },
          {
            path: 'excises',
            element: <StudentExcises />,
          },
          {
            path: 'practice',
            element: <StartPractice />,
          },
        ],
      },
    ],
  },

  // Auth Route
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: router.signIn,
        element: <SignInPage />,
      },
      {
        path: router.signUp,
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
