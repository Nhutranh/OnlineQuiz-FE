import { Backdrop, Button } from '~/components';
import { useState } from 'react';
import FormCreateExam from './FormCreateExam';
import Icons from '~/assets/icons';
import { useEffect } from 'react';
import { getAllCategories, getQuizToStart } from '~/apis';
import { toast } from 'react-toastify';
import { useExamStore } from '~/store';
import { CreateCategory } from '../Caterogy';
import Bookmark from '~/assets/icons/Bookmark';
import moment from 'moment';
import { StartPractice } from '~/pages/student';

export default function ExamList() {
  const { examList, setExamList, setTargetExam, openModal } = useExamStore((state) => state);
  const [isCreatingExam, setIsCreatingExam] = useState(false);
  const [isStartQuiz, setIsStartQuiz] = useState(false);

  const handleCreateExam = () => {
    setIsCreatingExam(true);
  };

  const handleOpenModal = ({ type, exam }) => {
    setTargetExam(exam);
    openModal(type);
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const listCategories = await getAllCategories();

        if (listCategories && listCategories.length > 0) {
          setCategories(
            listCategories.map((category) => ({
              display: category.title,
              value: category.id,
            }))
          );
        }
      } catch (error) {
        toast.error(error.message, { toastId: 'fetch_question' });
      }
    })();
  }, []);

  const handleQuizOfCateChange = (newQuizOfCate) => {
    setExamList(newQuizOfCate);
  };

  const [quizToStart, setQuizToStart] = useState();
  const handleStartQuiz = async (examId) => {
    try {
      const body = {
        quizId: examId,
      };
      const response = await getQuizToStart(body);
      if (response) {
        console.log('Tới đây chưa', response);
        setQuizToStart(response);
        setIsStartQuiz(true);
        toast.success('Lấy bài tập thành công', { toastId: 'get_exam' });
      }
    } catch (error) {
      toast.error(error.message, { toastId: 'get_exam' });
    }
  };
  console.log('Tới đây chưa', quizToStart);

  // const handleDeleteCategory = () => {
  //   const updatedCate = categories.filter((item) => item.id !== categoryId);
  //   setCategories(updatedCate);
  // };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg w-full">
      <div className="flex justify-end mb-5">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Icons.Search />
            <input
              type="text"
              id="search"
              className="block pt-2 ps-1 ml-2 text-sm text-gray-500 border border-gray-300 rounded-lg w-80 h-[40px] bg-gray-50 "
              placeholder="Nhập tên danh mục..."
            />
          </div>
        </div>
        <Button
          className="w-[120px] ml-10 px-5 py-2 text-sm text-white bg-primary shadow-success hover:shadow-success_hover"
          onClick={handleCreateExam}
        >
          Tạo bài tập
        </Button>
      </div>
      <div className="pb-4 bg-slate-400 rounded-md">
        <div className="relative m-2 p-2 flex justify-between">
          <div className=" z-10">
            <CreateCategory cate={categories} onQuizOfCateChange={handleQuizOfCateChange} />
          </div>
        </div>
        <div className="h-[350px] overflow-y-auto w-full flex flex-wrap">
          {examList.map((exam) => (
            <div key={exam.id}>
              {/* <Link to={router.practice}> */}
              <div className="border border-2 h-[130px] w-[300px] items-center justify-between p-2 m-3 rounded-lg shadow-md bg-slate-100 hover:shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-4">
                  <div className="text-sm rounded text-yellow-500">
                    <Bookmark />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold overflow-ellipsis whitespace-nowrap">
                      {exam.title}
                    </h3>
                    <p className="text-[12px]">{exam.category.title}</p>

                    <p className="mt-2 text-[14px]">
                      Ngày tạo: {moment(exam.createdAt).format('DD/MM/YYYY, HH:mm')}
                    </p>
                    <p className="text-[14px] flex">
                      Thời gian:
                      {exam.maxMarks} phút
                    </p>
                    <p className="text-[14px] flex">Điểm: {exam.durationMinutes}</p>
                    <Button
                      onClick={() => handleStartQuiz(exam.id)}
                      className="px-4 py-1 text-sm text-white bg-primary shadow-success hover:shadow-success_hover"
                    >
                      Làm bài
                    </Button>
                  </div>
                </div>
              </div>
              {/* </Link> */}
              <div className="mb-5">
                <Button
                  onClick={() => handleOpenModal({ type: 'view', exam })}
                  className="ml-24 text-xs rounded px-2 py-1 text-yellow-500 hover:bg-yellow-200 hover:bg-opacity-40"
                >
                  <Icons.Eye />
                </Button>
                <Button
                  onClick={() => handleOpenModal({ type: 'edit', exam })}
                  className="ml-3 text-xs rounded px-2 py-1 text-blue-500 hover:bg-blue-200 hover:bg-opacity-40"
                >
                  <Icons.Pencil />
                </Button>
                <Button
                  onClick={() => handleOpenModal({ type: 'delete', exam })}
                  className="ml-3 text-xs rounded px-2 py-1 text-red-500 hover:bg-red-200 hover:bg-opacity-40"
                >
                  <Icons.Trash />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isCreatingExam && (
        <Backdrop opacity={0.35} className="overflow-auto">
          <FormCreateExam cate={categories} onClose={() => setIsCreatingExam(false)} />
        </Backdrop>
      )}
      {isStartQuiz && <StartPractice onClose={() => setIsStartQuiz(false)} />}
    </div>
  );
}
