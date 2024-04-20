import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AuthLayout, DashBoardLayout } from '~/layouts';
import NotFound from '~/pages/NotFound';

import { Account, Category } from '~/pages/admin/Configuration';
//import { DetailExam, ExamList } from '~/pages/admin/Exam';

import { CreateCategory } from '~/pages/admin/Caterogy';
import { Check_Practice } from '~/pages/admin/Exam';
import ExamWrapper from '~/pages/admin/Exam/ExamWrapper';
import Overview from '~/pages/admin/Overview';
import { QuestionWrapper } from '~/pages/admin/Question';
import { SignInPage, SignUpPage } from '~/pages/auth';
import { StudentExcises } from '~/pages/student';
import router from './const';

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
            element: <Navigate to={`${router.admin}/exam`} />,
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
              {
                path: 'check_practice/:id',
                element: <Check_Practice />,
              },
            ],
          },
          {
            path: 'students',
            element: <div>students</div>,
          },
          {
            path: 'accounts',
            element: <Account />,
          },
          {
            path: 'categories',
            element: <Category />,
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
