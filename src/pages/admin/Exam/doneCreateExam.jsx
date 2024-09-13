import { compile } from 'html-to-text';
import { useLocation } from 'react-router-dom';

const compiledConvert = compile({
  limits: {
    ellipsis: ' ...',
  },
});

export default function DoneCreateExam() {
  const data = useLocation();
  const dataExam = [data?.state.examData];
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
                      // onClick={handlePoint}
                      // onChange={(e) => onPointChange(item.id, e.target.value)}
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
      </div>
    </div>
  );
}
