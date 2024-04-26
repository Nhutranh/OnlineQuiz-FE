import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button, FormInput, FormSelect, TextView } from '~/components';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { createExam, getQuestions } from '~/apis';
import Icons from '~/assets/icons';
import { useExamStore, useQuestionStore } from '~/store';
import Question from './Question';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormExamCreateSchema } from '~/validations/exam';

const FormCreateExam = ({ onClose, cate }) => {
  const { addNewExam } = useExamStore((state) => state);
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
  const [quesPoint, setQuesPoint] = useState([]); // chứa quesID + Point
  const [containerQues, setContainerQues] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);

  //tính điểm
  useEffect(() => {
    const points = quesPoint.map(element => parseInt(element.point)).reduce((acc, curr) => acc + curr, 0);
    setTotalPoints(points)
  }, [quesPoint]);

  


  const handleQuestionSelect = (questionID) => {
    if (selectedQuestions && selectedQuestions.includes(questionID)) {
      setSelectedQuestions(selectedQuestions.filter((id) => id !== questionID));
    } else {
      setSelectedQuestions([...selectedQuestions, questionID]);
    }
  };

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
      console.log(quesPoint);
      const body = {
        title: data.examName,
        categoryId: data.category,
        description: data.description,
        maxMarks: totalPoints,
        durationMinutes: data.time,
        listQuestion: quesPoint.map((q) => ({
          questionId: q.id,
          marksOfQuestion: parseInt(q.point) || 0,
        })),
      };
      console.log("BODY", body)

      const response = await createExam(body);

      if (response) {
        addNewExam(response);
        toast.success('Tạo mới bài tập thành công', { toastId: 'create_exam' });
        onClose();
      }
    } catch (error) {
      toast.error(error.message, { toastId: 'create_exam' });
    }
  };

  const handlePointsChange = (id, value) => {
    setQuesPoint((prev) => {
      const foundPoint = prev.find((p) => p.id === id);
      if (!foundPoint) {
        return [...prev, { id, point: value }];
      } else {
        foundPoint.point = value;
        return [...prev];
      }
    });
  };

  const handleCategoryForFilter = (e) => {
    const cloneQuesList = [...questionList];
    setContainerQues(cloneQuesList.filter((q) => q.category.id === parseInt(e)));
  };

  return (
    <div className="flex items-center justify-center pt-6">
      <div className="container mx-auto p-4 bg-slate-100 rounded-md w-[1000px]">
        <h3 className="mb-5">Tạo bài tập</h3>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full flex px-3">
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
                  <TextView
                    control={control}
                    value={totalPoints}
                    className='text-sm border rounded-md'
                  />
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

            <div>
              <Button
                type="button"
                onClick={handleChooseFromBank}
                className="border border-gray-500 p-2 ml-3 flex text-sm"
              >
                Chọn câu hỏi <Icons.DownArrow />
              </Button>
            </div>
          </div>

          {showQuestionList && (
            <div className="mb-4">
              <div className="flex text-sm">
                <span className="text-sm font-semibold mb-2 mr-5">Danh sách câu hỏi</span>
                <span className="text-sm font-semibold mb-2 mr-5">Số câu đã chọn: </span>
              </div>
              <div className="bg-gray-400 w-full rounded-md">
                <div className="max-h-[500px] overflow-y-auto">
                  <Question
                    onPointChange={handlePointsChange}
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
              Tạo bài tập
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="px-6 ml-5 py-2 text-sm !border border-solid !border-danger text-danger hover:bg-danger hover:bg-opacity-5"
            >
              Hủy
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCreateExam;

FormCreateExam.propTypes = {
  onClose: PropTypes.func,
  cate: PropTypes.array.isRequired,
};
