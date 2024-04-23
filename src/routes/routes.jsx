import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AuthLayout, DashBoardLayout } from '~/layouts';
import NotFound from '~/pages/NotFound';
import { CheckPractice } from '~/pages/admin/Exam';
import ExamWrapper from '~/pages/admin/Exam/ExamWrapper';
import { Overview, QuestionWarehouse, Category, Teachers, Trainees } from '~/pages/admin';
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
            element: <QuestionWarehouse />,
          },
          {
            path: 'exam',
            children: [
              {
                index: true,
                element: <ExamWrapper />,
              },
              {
                path: 'checkpractice/:id',
                element: <CheckPractice/>,
              },
            ],
          },
          // {
          //   path: 'checkpractice/:id',
          //   element: <CheckPractice/>,
          // },
          {
            path: 'students',
            children: [
              {
                index: true,
                element: <Trainees />,
              },
            ],
          },
          {
            path: 'teachers',
            children: [
              {
                index: true,
                element: <Teachers />,
              },
            ],
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
