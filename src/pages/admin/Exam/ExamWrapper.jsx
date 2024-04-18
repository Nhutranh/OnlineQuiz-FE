import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getExams } from '~/apis';
import { Backdrop } from '~/components';
import { useExamStore } from '~/store';
import DetailExam from './DetailExam';
import UpdateExam from './UpdateExam';
import DeleteExam from './DeleteExam';
import ExamList from './ExamList';

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

  return (
    <>
      <div className="w-full">
        <ExamList />
      </div>

      {targetExam && modal && ModalFormObj[modal]}
    </>
  );
}

export default ExamWrapper;
