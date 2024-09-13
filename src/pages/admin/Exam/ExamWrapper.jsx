import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getAllCategories } from '~/apis';
import { Backdrop } from '~/components';
import { useExamStore } from '~/store';
import DetailExam from './DetailExam';
import UpdateExam from './UpdateExam';
import DeleteExam from './DeleteExam';
import ExamList from './ExamList';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '~/useContext/AppContext';
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
  const { modal, targetExam } = useExamStore((state) => {
    return state;
  });
  // const [searchKeywords, setSearchKeywords] = useState('');

  // const debounceQuery = useDebounce(searchKeywords, 200);
  // const { control } = useForm();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const listExam = await getExams();
  //       setExamList(listExam);
  //     } catch (error) {
  //       toast.error(error.message, { toastId: 'get_exam' });
  //     }
  //   })();
  // }, [setExamList]);

  const [categories, setCategories] = useState([]);
  const { setCate } = useContext(AppContext);
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
          setCate(
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
  }, [setCate]);

  // const handleInputChange = (e) => {
  //   setSearchKeywords(e.target.value);
  // };

  // useEffect(() => {
  //   (async () => {
  //     const searchValue = await searchQuiz({ searchContent: debounceQuery });
  //     setExamList(searchValue || []);
  //   })();
  // }, [debounceQuery, setExamList]);

  // const handleSelectCate = async (e) => {
  //   try {
  //     const filterQuizbyCate = await filterQuizByCategory(e);
  //     setExamList(filterQuizbyCate);
  //   } catch (error) {
  //     toast.error('Không có dữ liệu', { toastId: 'fliter_quiz' });
  //   }
  // };
  return (
    <>
      <ExamList category={categories} />

      {targetExam && modal && ModalFormObj[modal]}
    </>
  );
}

export default ExamWrapper;
