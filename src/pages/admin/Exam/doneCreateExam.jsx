import { compile } from 'html-to-text';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createExam } from '~/apis';
import { Button } from '~/components';
import { useExamStore } from '~/store';

const compiledConvert = compile({
  limits: {
    ellipsis: ' ...',
  },
});

export default function DoneCreateExam() {
  const { addNewExam } = useExamStore((state) => state);
  const data = useLocation();
  const dataExam = [data?.state.examData];
  const prevDataOfExam = data?.state.examData;

  const [quesPoint, setQuesPoint] = useState([]); // chứa quesID + Point
  const [totalPoints, setTotalPoints] = useState(0);

  //tính điểm
  useEffect(() => {
    const points = quesPoint
      .map((element) => parseInt(element.point))
      .reduce((acc, curr) => acc + curr, 0);
    setTotalPoints(points);
  }, [quesPoint]);

  const handlePoint = (e) => {
    e.stopPropagation();
  };

  const handlePointsChange = (id, e) => {
    const quesPoint = e.target.value;
    setQuesPoint((prev) => {
      const foundPoint = prev.find((p) => p.id === id);
      if (!foundPoint) {
        return [...prev, { id, point: quesPoint }];
      } else {
        foundPoint.point = quesPoint;
        return [...prev];
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const body = {
        title: prevDataOfExam.title,
        categoryId: prevDataOfExam.categoryId,
        description: prevDataOfExam.description,
        durationMinutes: prevDataOfExam.durationMinutes,
        listQuestion: quesPoint.map((q) => ({
          questionId: q.id,
          marksOfQuestion: parseInt(q.point) || 0,
        })),
      };
      const response = await createExam(body);

      if (response) {
        addNewExam(response);
        toast.success('Tạo mới bài tập thành công', { toastId: 'create_exam' });
      }
      console.log(body);
    } catch (error) {
      toast.error(error.message, { toastId: 'data_exam' });
    }
  };

  return (
    <div className="w-full rounded-md px-3 py-4 bg-slate-50">
      <h3 className="text-lg font-semibold">Tạo bài tập</h3>
      <div>
        <div className="mt-3 text-sm text-gray-500 font-bold">Chi tiết bài tập</div>
        {dataExam.length > 0 &&
          dataExam.map((item, index) => (
            <div key={index + 1}>
              <p>Mã đề: {index + 1}</p>
              <p>Tiêu đề: {item.title}</p>
              <p>Mô tả: {item.description}</p>
              <p>Thời gian kiểm tra: {item.durationMinutes} phút</p>
              <div>Điểm của bài tập: {totalPoints || 0} </div>
              <div className=" grid grid-cols-7 bg-slate-300 text-gray-800 rounded-md justify-between hover:bg-slate-100">
                <div className="col-span-5  rounded-md px-4 py-3">
                  <div className="grid grid-cols-4">
                    <div className="col-span-1">Mã câu </div>
                    <div className="col-span-2">Nội dung </div>
                    <div className="col-span-1">Phân loại </div>
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-center">Nhập điểm</div>
              </div>
              {item.listQuestion.map((ques) => (
                <div key={ques.id} className=" grid grid-cols-7 bg-white hover:bg-slate-100">
                  <div className="col-span-5  rounded-md px-4 py-3">
                    <div className="grid grid-cols-4">
                      <div className="col-span-1">{ques.id} </div>
                      <div className="col-span-2"> {compiledConvert(ques.content)} </div>

                      <div className="col-span-1">{ques.questionType.displayName} </div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-center">
                    <input
                      min="1"
                      max="10"
                      onClick={handlePoint}
                      onChange={(e) => handlePointsChange(ques.id, e)}
                      className="h-[40px] w-[60px] border-2 shadow-lg rounded-md"
                      type="number"
                      name="point"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            className="px-6 py-2 text-sm text-white bg-primary shadow-success hover:shadow-success_hover"
          >
            Tạo bài tập
          </Button>

          <Link
            to="/admin/exam"
            className="px-6 ml-5 py-2 text-sm rounded-md !border border-solid !border-danger text-danger hover:bg-danger hover:bg-opacity-5"
          >
            Thoát
          </Link>
        </div>
      </div>
    </div>
  );
}
