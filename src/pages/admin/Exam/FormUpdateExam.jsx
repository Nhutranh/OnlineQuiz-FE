import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormInput, TextView } from '~/components';
import { FormExamCreateSchema } from '~/validations/exam';
import classNames from 'classnames';
import Question from './Question';
import { compile } from 'html-to-text';
import { useExamStore, useQuestionStore } from '~/store';
import { useEffect } from 'react';
import { getQuesOfQuiz } from '~/apis';
import { toast } from 'react-toastify';

export default function FormUpdateExam() {
  const { targetExam } = useExamStore((state) => state);
  const { questionList } = useQuestionStore((state) => state);
  const [showQuestionList, setShowQuestionList] = useState('showQuestion');
  const [selectedQuestions, setSelectedQuestions] = useState([]); // lưu câu hỏi
  const [quesOfQuiz, setQuesOfQuiz] = useState([]);
  const [containerQues, setContainerQues] = useState([]); // ds câu hỏi được cập nhật thêm
  const {
    control,
    formState: { errors },
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
  console.log('a', selectedQuestions);
  console.log('b', quesOfQuiz);
  console.log('c', containerQues);

  const compiledConvert = compile({
    limits: {
      ellipsis: ' ...',
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await getQuesOfQuiz(targetExam.id);
        if (response) {
          setQuesOfQuiz(response); //point
          const cloneQuesList = [...questionList];
          setContainerQues(cloneQuesList.filter((q) => q.category.id === targetExam.category.id)); //listQues
          //setSelectedQuestions(response.map((q) => q.id));
        }
      } catch (error) {
        toast.error(error);
      }
    })();
  }, [targetExam.id]);

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
  return (
    <div className="flex items-center justify-center px-40 py-6">
      <div className="container mx-auto p-4 bg-slate-100 rounded-md">
        <form className="w-full">
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
                  //onChange={handleCategoryForFilter}
                />
                {showQuestionList === 'showQuestion' && (
                  <div className="mt-5">
                    <span className="text-sm font-bold text-icon mb-1">Điểm của bài tập</span>
                    <TextView
                      control={control}
                      //value={totalPoints}
                      className="text-sm border rounded-md"
                    />
                  </div>
                )}
                {showQuestionList === 'select' && (
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
              //onClick={onClose}
              className="px-6 py-2 ml-3 text-sm !border border-solid !border-danger text-danger hover:bg-danger hover:bg-opacity-10"
            >
              Thoát
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
