import { compile } from 'html-to-text';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getQuizToStart } from '~/apis';

export default function Check_Practice() {
  const { id } = useParams();

  const compiledConvert = compile({
    limits: {
      ellipsis: ' ...',
    },
  });

  const [quizToStart, setQuizToStart] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const body = {
          quizId: parseInt(id),
        };
        const response = await getQuizToStart(body);
        setQuizToStart(response);
      } catch (error) {
        toast.error(error.message, { toastId: 'get_exam' });
      }
    })();
  }, []);
  console.log(quizToStart);

  // const [answer, setAnswer] = useState([]);
  // const handleAnswer = (id) => {
  //   setAnswer(id);
  // };
  // console.log('ID: ', answer);

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
      </div>
      <p className=" bg-slate-50 shadow-md h-full w-screen rounded-md p-3 m-3">
        {quizToStart.questionResponseList &&
          quizToStart.questionResponseList.map((item, index) => (
            <div key={item.id}>
              <p className="mt-5 font-mono">
                Câu hỏi: {index + 1} - {compiledConvert(item.content)}
              </p>
              <div>
                {item.questionType.alias === 'single_choice' ? (
                  <div>
                    <div>
                      {item.answers.map((ans) => (
                        <div key={ans.id} className="ml-3">
                          <input type="radio" name="answer" />
                          <button
                            // onClick={() => handleAnswer(ans.id)}
                            className="px-6 py-2 w-[800px] text-left border m-1 rounded-md shadow-sm"
                          >
                            {ans.content}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    {item.answers.map((ans) => (
                      <div key={ans.id} className="ml-3">
                        <input type="checkbox" name="answer" />
                        <button
                          // onClick={() => handleAnswer(ans.id)}
                          className="px-6 py-2 w-[800px] text-left border m-1 rounded-md shadow-sm"
                        >
                          {ans.content}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* {item.answers.map((ans) => (
                <div key={ans.id} className="ml-3">
                  <button
                    // onClick={() => handleAnswer(ans.id)}
                    className="px-6 py-2 w-[800px] text-left border m-1 rounded-md shadow-sm"
                  >
                    {ans.content}
                  </button>
                </div>
              ))} */}
            </div>
          ))}
      </p>
    </div>
  );
}
