import { Link } from 'react-router-dom';
import Bookmark from '~/assets/icons/Bookmark';
import Clock from '~/assets/icons/Clock';
import Question from '~/assets/icons/Question';
import { router } from '~/routes';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function PracticeItem({ list }) {
  console.log('log', list);
  return (
    <Link className="flex flex-wrap" to={router.practice}>
      {list.map((exam) => (
        <div
          key={exam.id}
          className="border border-2 h-[120px] w-[300px] items-center justify-between p-2 m-3 rounded-lg shadow-md bg-white hover:shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-center space-x-4">
            <div className="text-xs rounded px-2 py-1 text-yellow-500">
              <Bookmark />
            </div>
            <div className="text-sm">
              <h3 className=" text-sm font-semibold">{exam.title}</h3>
              <p>Ngày tạo: {moment(exam.createdAt).format('HH:mm, DD/MM/YYYY')}</p>
              <p className="flex">
                <Clock /> Thời gian:
                {exam.maxMarks} phút
              </p>
              <p className="flex">
                <Question />
                Điểm: {exam.durationMinutes}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Link>
  );
}

PracticeItem.propTypes = {
  list: PropTypes.array,
};
