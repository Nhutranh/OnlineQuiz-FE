import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getStatistic } from '~/apis';
import Icons from '~/assets/icons';
import { Card } from '~/components';

function Overview() {
  const [statistic, setStatistic] = useState([]);
  console.log({statistic})

  useEffect(() => {
    (async () => {
      try {
        const statistics = await getStatistic();
        setStatistic(statistics);
      } catch (error) {
        toast.error('Không thể lấy dữ liệu thống kê', { toastId: 'get_statistic' });
      } 
    })();
  }, []);


  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-x-5 w-full">
        <Card className="w-full min-h-20 ">
            <div className=" bg-green-300 shadow-lg rounded-lg p-6 w-60%  transition-transform duration-300">
          <div className="flex items-center">
            <div className="bg-white rounded-full h-8 w-8 flex items-center justify-center">
              <Icons.Question/>
            </div>
            <div className="ml-4">
              <p className="text-white text-lg">Số lượng câu hỏi</p>
              <p className="text-2xl font-bold">{statistic.totalNumberOfQuestions}</p>
            </div>
          </div>
        </div>
        </Card>
        <Card className="w-full min-h-20">
            <div className="bg-blue-300 shadow-lg rounded-lg p-6 w-70%  transition-transform duration-300 ">
          <div className="flex items-center">
            <div className="bg-white rounded-full h-8 w-8 flex items-center justify-center">
              <Icons.Plus/>
            </div>
            <div className="ml-4">
              <p className="text-white text-lg">Số lượng bài tập</p>
              <p className="text-2xl font-bold">{statistic.totalNumberOfQuizzes}</p>
            </div>
          </div>
        </div>
        </Card>
        <Card className="w-full min-h-20 ">
            <div className="bg-purple-300 shadow-lg rounded-lg p-6 w-70%  transition-transform duration-300">
          <div className="flex items-center">
            <div className="bg-white rounded-full h-8 w-8 flex items-center justify-center">
              <Icons.Person/>
            </div>
            <div className="ml-4">
              <p className="text-white text-lg">Số lượng học viên</p>
              <p className="text-2xl font-bold">{statistic.totalNumberOfStudents}</p>
            </div>
          </div>
        </div>
        </Card>
       
      </div>
    </div>
  );
}

export default Overview;
