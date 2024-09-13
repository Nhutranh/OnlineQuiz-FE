import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button, FormInput, FormSelect } from '~/components';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getQuestions } from '~/apis';
import { useQuestionStore } from '~/store';
import Question from './Question';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormExamCreateSchema } from '~/validations/exam';
import { useContext } from 'react';
import { AppContext } from '~/useContext/AppContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FormCreateExam = () => {
  const { cate } = useContext(AppContext);
  const navigate = useNavigate();
  //const { addNewExam } = useExamStore((state) => state);
  const { questionList, setQuestionList } = useQuestionStore((state) => state);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(FormExamCreateSchema),
  });
  const [showQuestionList, setShowQuestionList] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  //const [quesPoint, setQuesPoint] = useState([]); // chứa quesID + Point
  const [containerQues, setContainerQues] = useState([]);
  //const [totalPoints, setTotalPoints] = useState(0);

  //tính điểm
  // useEffect(() => {
  //   const points = quesPoint
  //     .map((element) => parseInt(element.point))
  //     .reduce((acc, curr) => acc + curr, 0);
  //   setTotalPoints(points);
  // }, [quesPoint]);

  const handleQuestionSelect = (question) => {
    if (selectedQuestions && selectedQuestions.includes(question)) {
      setSelectedQuestions(selectedQuestions.filter((id) => id !== question));
    } else {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };
  console.log(selectedQuestions);

  const handleChooseFromBank = () => {
    setShowQuestionList(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const listQuestion = await getQuestions();
        setQuestionList(listQuestion);
        setContainerQues(listQuestion);
      } catch (error) {
        toast.error(error.message, { toastId: 'fetch_question' });
      }
    })();
  }, [setQuestionList]);

  const handleFormSubmit = async (data) => {
    try {
      if (selectedQuestions.length === 0) {
        toast.error('Bạn cần chọn ít nhất 1 câu hỏi cho bài tập', {
          toastId: 'ít_nhất_một_câu_hỏi',
        });
        return;
      }
      const body = {
        title: data.examName,
        categoryId: data.category,
        description: data.description,
        durationMinutes: data.time,
        listQuestion: selectedQuestions,
        // listQuestion: quesPoint.map((q) => ({
        //   questionId: q.id,
        //   marksOfQuestion: parseInt(q.point) || 0,
        // })),
      };

      navigate('/admin/exam/doneCreateExam', { state: { examData: body } });
      //const response = await createExam(body);

      // if (response) {
      //   addNewExam(response);
      //   toast.success('Tạo mới bài tập thành công', { toastId: 'create_exam' });
      // }
    } catch (error) {
      toast.error(error.message, { toastId: 'data_exam' });
    }
  };

  // const handlePointsChange = (id, value) => {
  //   setQuesPoint((prev) => {
  //     const foundPoint = prev.find((p) => p.id === id);
  //     if (!foundPoint) {
  //       return [...prev, { id, point: value }];
  //     } else {
  //       foundPoint.point = value;
  //       return [...prev];
  //     }
  //   });
  // };

  const handleCategoryForFilter = (e) => {
    const cloneQuesList = [...questionList];
    setContainerQues(cloneQuesList.filter((q) => q.category.id === parseInt(e)));
  };

  return (
    <div className="w-full">
      <div className="p-4 bg-slate-50 rounded-md ">
        <h3 className="mb-5">Thông tin bài tập</h3>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full flex px-2">
              <div className="m-3 w-[50%]">
                <FormInput
                  control={control}
                  name="examName"
                  title="Tên bài tập"
                  placeholder="Nhập tên bài tập"
                  required
                />
                <FormInput
                  control={control}
                  name="description"
                  title="Mô tả"
                  placeholder="Nhập mô tả bài tập"
                  required
                />
              </div>

              <div className="m-3 w-[50%]">
                <FormSelect
                  control={control}
                  name="category"
                  label="Danh mục"
                  placeholder="Chọn danh mục..."
                  required
                  error={errors.category?.message}
                  options={cate}
                  onChange={handleCategoryForFilter}
                />
                <div className="mt-5">
                  <span className="text-sm font-bold text-icon mb-1">Điểm của bài tập</span>
                  {/* <TextView
                    control={control}
                    value={totalPoints}
                    className="text-sm border rounded-md"
                  /> */}
                </div>
              </div>
              <div className="m-3 w-[50%]">
                <FormInput
                  control={control}
                  name="time"
                  title="Thời gian làm bài cho bài tập"
                  placeholder="Nhập thời gian làm bài"
                  required
                />
              </div>
            </div>

            <div className="flex">
              <Button
                type="button"
                onClick={handleChooseFromBank}
                className="border border-gray-500 p-2 ml-3 flex text-sm"
              >
                Chọn câu hỏi <p className="text-blue-500 ml-1"> tại đây</p>
              </Button>
            </div>
          </div>

          {showQuestionList && (
            <div className="mb-4 px-2">
              <div className="flex text-sm">
                <span className="text-sm font-semibold mb-2">
                  Số câu đã chọn: {selectedQuestions.length}
                </span>
              </div>
              <div className="bg-gray-400 w-full rounded-md">
                <div className="max-h-[500px] overflow-y-auto">
                  <Question
                    // onPointChange={handlePointsChange}
                    selectQues={selectedQuestions}
                    onQuestionSelect={handleQuestionSelect}
                    listQuestion={containerQues}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <Button
              type="submit"
              className="px-6 py-2 text-sm text-white bg-primary shadow-success hover:shadow-success_hover"
            >
              Tiếp tục
            </Button>
            {/* <Link
              type="submit"
              to="/admin/exam/doneCreateExam"
              className="px-6 py-2 text-sm rounded-md text-white bg-primary shadow-success hover:shadow-success_hover"
            >
              Tiếp tục
            </Link> */}
            <Link
              to="/admin/exam"
              className="px-6 ml-5 py-2 text-sm rounded-md !border border-solid !border-danger text-danger hover:bg-danger hover:bg-opacity-5"
            >
              Thoát
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCreateExam;

// FormCreateExam.propTypes = {
//   onClose: PropTypes.func,
//   cate: PropTypes.array.isRequired,
// };
