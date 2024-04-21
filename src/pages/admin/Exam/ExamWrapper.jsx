import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllCategories, getExams } from '~/apis';
import { Backdrop } from '~/components';
import { useExamStore } from '~/store';
import DetailExam from './DetailExam';
import UpdateExam from './UpdateExam';
import DeleteExam from './DeleteExam';
import ExamList from './ExamList';
import { useState } from 'react';

const ModalFormObj = {
  ['view']: (
    <Backdrop opacity={0.25}>
      <DetailExam />
    </Backdrop>
  ),
  ['edit']: (
    <Backdrop opacity={0.25}>
      <UpdateExam />
    </Backdrop>
  ),
  ['delete']: <DeleteExam />,
};

function ExamWrapper() {
  const { setExamList, modal, targetExam } = useExamStore((state) => {
    return state;
  });

  useEffect(() => {
    (async () => {
      try {
        const listExam = await getExams();
        setExamList(listExam);
      } catch (error) {
        toast.error(error.message, { toastId: 'get_exam' });
      }
    })();
  }, [setExamList]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const listCategories = await getAllCategories();

        if (listCategories && listCategories.length > 0) {
          setCategories(
            listCategories.map((category) => ({
              display: category.title,
              value: category.id,
            }))
          );
        }
      } catch (error) {
        toast.error(error.message, { toastId: 'fetch_question' });
      }
    })();
  }, []);

  // const handleQuizOfCateChange = (newQuizOfCate) => {
  //   setExamList(newQuizOfCate);
  // };

  return (
    <>
      <div className="w-full">
        <div className=" m-2 p-2 flex">
          <div className="z-10">
            {/* <CreateCategory cate={categories} onQuizOfCateChange={handleQuizOfCateChange} /> */}
          </div>
        </div>
        <ExamList category={categories} />
      </div>

      {targetExam && modal && ModalFormObj[modal]}
    </>
  );
}

export default ExamWrapper;
