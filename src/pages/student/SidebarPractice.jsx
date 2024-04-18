import { useState } from 'react';

export default function SidebarPractice() {
  //const data = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
  const [timeLeft] = useState(60); // Thời gian làm bài thực (đơn vị: giây)

  // Hàm format thời gian dạng mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Hàm xử lý khi nút Nộp bài được nhấn
  const handleFinishExam = () => {
    // TODO: Xử lý logic khi nộp bài
  };

  return (
    <div className="fixed rounded-md shadow-md right-0 w-60 bg-gray-100 p-4">
      <div className="mb-4">
        <button
          className="w-full bg-green-500 text-white rounded-lg py-2 px-4 font-semibold"
          onClick={handleFinishExam}
        >
          Nộp bài
        </button>
      </div>
      <div className="mb-4">
        <p className="text-sm font-semibold">Thời gian còn lại:</p>
        <p className="text-2xl">{formatTime(timeLeft)}</p>
      </div>
      <table className="w-full">
        <tbody>
          <tr>
            <td>
              <div className="flex flex-wrap">
                {/* {data.map((item) => (
                  <button
                    key={item}
                    className="w-7 h-7 m-1 bg-gray-200 rounded-full flex items-center justify-center"
                  >
                    {item}
                  </button>
                ))} */}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
