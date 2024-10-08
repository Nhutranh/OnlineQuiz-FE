import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button, FormInput, TextView } from '~/components';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getQuesOfQuiz, updateQuiz } from '~/apis';
import { useExamStore, useQuestionStore } from '~/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormExamCreateSchema } from '~/validations/exam';
import Icons from '~/assets/icons';
import { compile } from 'html-to-text';
import Question from './Question';
import classNames from 'classnames';

const FormEditExam = () => {
  const [showQuestionList, setShowQuestionList] = useState('showQuestion');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [quesPoint, setQuesPoint] = useState([]); // chứa quesID + Point
  const [containerQues, setContainerQues] = useState([]);
  const [quesOfQuiz, setQuesOfQuiz] = useState([]);
  const { targetExam, setTargetExam, openModal, updateExam } = useExamStore((state) => state);
  const { questionList } = useQuestionStore((state) => state);

  const compiledConvert = compile({
    limits: {
      ellipsis: ' ...',
    },
  });

  const [totalPoints, setTotalPoints] = useState(0);
  //tính điểm
  useEffect(() => {
    const points = quesPoint
      .map((element) => parseInt(element.point))
      .reduce((acc, curr) => acc + curr, 0);
    setTotalPoints(points);
  }, [quesPoint]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getQuesOfQuiz(targetExam.id);
        if (response) {
          setQuesOfQuiz(response); //point
          const cloneQuesList = [...questionList];
          setContainerQues(cloneQuesList.filter((q) => q.category.id === targetExam.category.id)); //listQues
          setSelectedQuestions(response.map((q) => q.id));
        }
      } catch (error) {
        toast.error(error);
      }
    })();
  }, [questionList, targetExam.category.id, targetExam.id]);
  console.log('ques', quesOfQuiz);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(FormExamCreateSchema),
    defaultValues: {
      examName: targetExam.title,
      category: targetExam.category.title,
      description: targetExam.description,
      time: targetExam.durationMinutes,
      point: targetExam.maxMarks,
      listQuestion: selectedQuestions.map((item) => ({
        questionId: item,
        marksOfQuestion: item.marksOfQuestion,
      })),
    },
  });
  console.log(selectedQuestions);

  const handleQuestionSelect = (question) => {
    if (selectedQuestions && selectedQuestions.includes(question)) {
      setSelectedQuestions(selectedQuestions.filter((id) => id !== question));
    } else {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleChooseFromBank = () => {
    setShowQuestionList('select');
  };

  const handleShowQuestion = () => {
    setShowQuestionList('showQuestion');
  };

  const handleFormUpdate = async (data) => {
    try {
      const body = {
        title: data.examName,
        categoryId: targetExam.category.id,
        description: data.description,
        maxMarks: totalPoints,
        durationMinutes: parseInt(data.time),
        listQuestion: quesPoint.map((ques) => ({
          questionId: ques.id,
          marksOfQuestion: ques.point,
        })),
      };

      const response = await updateQuiz(targetExam.id, body);

      if (response) {
        updateExam(response);
        toast.success('Cập nhật bài tập thành công', { toastId: 'update_exam' });
        onClose();
      }
    } catch (error) {
      toast.error(error.message, { toastId: 'update_exam' });
    }
  };

  // const handlePointsChange = (id, value) => {
  //   setQuesPoint((prev) => {
  //     if (value < 1 || value > 10) {
  //       toast.error('Giá trị điểm chỉ từ 1 đến 10!', { toastId: 'fail_point' });
  //     }

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

  const onClose = () => {
    setTargetExam(null);
    openModal(null);
  };

  return (
    <div className="flex items-center justify-center px-40 py-6">
      <div className="container mx-auto p-4 bg-slate-100 rounded-md">
        <h3 className="mb-5">Chỉnh sửa bài tập</h3>
        <form onSubmit={handleSubmit(handleFormUpdate)} className="w-full">
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

              <div className="m-2 w-[50%]">
                <span className="text-sm font-bold text-icon">Danh mục</span>
                <FormInput
                  control={control}
                  name="category"
                  label="Danh mục"
                  disabled
                  error={errors.category?.message}
                  onChange={handleCategoryForFilter}
                />
                {showQuestionList ? (
                  <div className="mt-5">
                    <span className="text-sm font-bold text-icon mb-1">Điểm của bài tập</span>
                    <TextView
                      control={control}
                      value={totalPoints}
                      className="text-sm border rounded-md"
                    />
                  </div>
                ) : (
                  <div className="mt-5">
                    <FormInput
                      control={control}
                      name="point"
                      title="Điểm cho bài tập"
                      required
                      disabled
                    />
                  </div>
                )}
              </div>

              <div className="m-3 w-[50%]">
                <FormInput
                  control={control}
                  name="time"
                  title="Nhập thời gian làm bài cho bài tập"
                  placeholder="Nhập thời gian làm bài"
                  required
                />
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <Button
                  type="button"
                  onClick={handleChooseFromBank}
                  className={classNames(
                    'border border-gray-500 p-2 ml-3 flex text-sm hover:text-green-600',
                    {
                      'text-green-600 border-b-green-600': showQuestionList === 'select',
                    }
                  )}
                >
                  Thêm câu hỏi
                </Button>
              </div>
              <div className="text-sm">
                <Button
                  onClick={handleShowQuestion}
                  className={classNames(
                    'cursor-pointer text-sm font-semibold hover:text-green-600',
                    {
                      'text-green-600 border-b-green-600 py-2': showQuestionList === 'showQuestion',
                    }
                  )}
                >
                  Danh sách câu hỏi
                </Button>
              </div>
            </div>
          </div>

          {showQuestionList === 'select' && (
            <div className="mb-4">
              <div className="bg-gray-200 w-full rounded-md">
                <div className="max-h-[500px] overflow-y-auto">
                  <Question
                    selectQues={selectedQuestions}
                    onQuestionSelect={handleQuestionSelect}
                    //onPointChange={handlePointsChange}
                    listQuestion={containerQues}
                    //point={quesOfQuiz}
                  />
                </div>
              </div>
            </div>
          )}
          {showQuestionList === 'showQuestion' && (
            <div className="mb-4">
              <div className="bg-gray-200 w-full rounded-md">
                <div className="max-h-[500px] overflow-y-auto">
                  {quesOfQuiz.map((ques, index) => (
                    <div className="m-3" key={ques.id}>
                      {index + 1}.{compiledConvert(ques.content)} (
                      {ques.additionalFields.marksOfQuestion} điểm)
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <Button
              type="submit"
              className="px-6 py-2 text-sm text-white bg-primary shadow-success hover:shadow-success_hover"
            >
              Cập nhật
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="px-6 py-2 ml-3 text-sm !border border-solid !border-danger text-danger hover:bg-danger hover:bg-opacity-10"
            >
              Thoát
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEditExam;

FormEditExam.propTypes = {
  onClose: PropTypes.func,
};
