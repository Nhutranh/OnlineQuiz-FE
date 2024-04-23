import { Backdrop, Button, Input } from '~/components';
import { useState } from 'react';
import FormCreateExam from './FormCreateExam';
import Icons from '~/assets/icons';
import { useExamStore } from '~/store';
import Bookmark from '~/assets/icons/Bookmark';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ExamList({ category }) {
  const { examList, setTargetExam, openModal } = useExamStore((state) => state);
  const [isCreatingExam, setIsCreatingExam] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState('');

  const handleCreateExam = () => {
    setIsCreatingExam(true);
  };

  const handleOpenModal = ({ type, exam }) => {
    setTargetExam(exam);
    openModal(type);
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg w-full">
      <div className="flex justify-end mb-5">
        <div className="flex items-center space-x-2">
          <Input
            icon={<Icons.Search />}
            placeholder="Tìm kiếm theo tên danh mục"
            value={searchKeywords}
            onChange={(e) => setSearchKeywords(e.target.value)}
            className="md:max-w-[350px] flex-0"
          />
        </div>
        <Button
          className="w-[120px] ml-10 px-5 py-2 text-sm text-white bg-primary shadow-success hover:shadow-success_hover"
          onClick={handleCreateExam}
        >
          Tạo bài tập
        </Button>
      </div>
      <div className="pb-4 bg-white rounded-md">
        <div className="h-full overflow-y-auto w-full flex flex-wrap">
          {examList.map((exam) => (
            <div key={exam.id}>
              <div className=" border-2 h-[160px] w-[280px] items-center justify-between p-2 m-3 rounded-lg shadow-md bg-slate-100 hover:shadow-lg hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-4">
                  <div className="text-sm rounded text-yellow-500">
                    <Bookmark />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold overflow-ellipsis whitespace-nowrap">
                      {exam.title}
                    </h3>
                    <p className="text-[12px]">{exam.category.title}</p>

                    <p className="mt-2 text-[14px]">
                      Ngày tạo: {moment(exam.createdAt).format('DD/MM/YYYY, HH:mm')}
                    </p>
                    <p className="text-[14px] flex">
                      Thời gian:
                      {exam.maxMarks} phút
                    </p>
                    <p className="text-[14px] flex">Điểm: {exam.durationMinutes}</p>
                    <Link
                      to={`checkpractice/${exam.id}`}
                      className="px-4 py-1 text-sm text-white bg-primary shadow-success hover:shadow-success_hover rounded-md"
                    >
                      Làm bài
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <Button
                  onClick={() => handleOpenModal({ type: 'view', exam })}
                  className="ml-16 text-xs rounded px-2 py-1 text-yellow-500 hover:bg-yellow-200 hover:bg-opacity-40"
                >
                  <Icons.Eye />
                </Button>
                <Button
                  onClick={() => handleOpenModal({ type: 'edit', exam })}
                  className="ml-3 text-xs rounded px-2 py-1 text-blue-500 hover:bg-blue-200 hover:bg-opacity-40"
                >
                  <Icons.Pencil />
                </Button>
                <Button
                  onClick={() => handleOpenModal({ type: 'delete', exam })}
                  className="ml-3 text-xs rounded px-2 py-1 text-red-500 hover:bg-red-200 hover:bg-opacity-40"
                >
                  <Icons.Trash />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isCreatingExam && (
        <Backdrop opacity={0.35} className="overflow-auto">
          <FormCreateExam cate={category} onClose={() => setIsCreatingExam(false)} />
        </Backdrop>
      )}
    </div>
  );
}

ExamList.propTypes = {
  category: PropTypes.array,
};
