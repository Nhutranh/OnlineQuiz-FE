import { compile } from 'html-to-text';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getQuizToStart, submitQuiz } from '~/apis';
export default function Check_Practice() {
  const { id } = useParams();

  const compiledConvert = compile({
    limits: {
      ellipsis: ' ...',
    },
  });

  const [quizToStart, setQuizToStart] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const body = {
          quizId: parseInt(id),
        };
        const response = await getQuizToStart(body);
        setQuizToStart(response);
        setAnswers(response.questionResponseList.map(question => ({
          questionId: question.id,
          selectedOptions: []
        })));
      } catch (error) {
        toast.error(error.message, { toastId: 'get_exam' });
      }
    })();
  }, []);

  const handleAnswer = (questionId, answerId) => {
    setAnswers(prevAnswers => {
      const newAnswers = prevAnswers.map(answer => {
        if (answer.questionId === questionId) {
          
          const selectedOptions = [...answer.selectedOptions];
          const answerIndex = selectedOptions.indexOf(answerId);
          if (answerIndex === -1) {
            selectedOptions.push(answerId);
          } else {
            selectedOptions.splice(answerIndex, 1);
          }
          return {
            ...answer,
            selectedOptions
          };
        }
        return answer;
      });
      return newAnswers;
    });
  };

  const handleCreateQuestion = async (data) => {
    try {
      const body = {
        userQuizResultId: data.userQuizResultId,
        quizId: data.quizId,
        answers: answers,
      };
       const response = await submitQuiz(body);
      
     
      console.log("BODY", body)
      if (response) {
        toast.success('Nộp bài thành công', { toastId: 'done_quiz' });
        onClose();
      }
    } catch (error) {
      toast.error(error.message, { toastId: 'done_quiz' });
    }
  };

  return (
    <div>
      <div className="fixed text-sm rounded-md mr-3 mt-3 border border-2 shadow-md right-0 w-[300px] h-[350px] bg-gray-100 p-4">
        <p>
          <span className="font-bold">- {quizToStart.title} -</span>
        </p>
        <p>
          <span>---------- * - * ----------</span>
        </p>
        <p className="mt-2">
          <span className="font-bold">Mô tả:</span> {quizToStart.description}
        </p>
        <p className="mt-2">
          <span className="font-bold ">Ngày tạo:</span> {quizToStart.title}
        </p>
        <p className="mt-2">
          <span className="font-bold ">Thời gian làm bài:</span> {quizToStart.durationMinutes} phút
        </p>
        <p className="mt-2">
          <span className="font-bold ">Điểm số:</span> {quizToStart.maxMarks} điểm
        </p>
        <p>
        <button
            onClick={()=>handleCreateQuestion(quizToStart)}
            className="px-6 mt-5 py-2 text-sm text-white bg-primary shadow-success hover:shadow-success_hover"
          >
            Nộp bài
          </button>
        </p>
      </div>
      <div className=" bg-slate-50 shadow-md h-full w-screen rounded-md p-3 m-3">
        {quizToStart.questionResponseList &&
          quizToStart.questionResponseList.map((item, index) => (
            <div key={item.id}>
              <p className="mt-5 font-mono">
                Câu hỏi: {index + 1} - {compiledConvert(item.content)}
              </p>
              <div>
                {item.answers.map((ans) => (
                  <div key={ans.id} className="ml-3">
                    <input
                      type={item.questionType.alias === 'single_choice' ? 'radio' : 'checkbox'}
                      name={`answer_${index}`}
                      checked={answers[index]?.selectedOptions?.includes(ans.id)}

                      onChange={() => handleAnswer(item.id, ans.id)}
                    />
                    <button
                      className="px-6 py-2 w-[800px] text-left border m-1 rounded-md shadow-sm"
                    >
                      {ans.content}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
