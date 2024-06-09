import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { filterQuizByCategory, getAllCategories, getExams, searchQuiz } from '~/apis';
import { Backdrop, FormSelect, Input } from '~/components';
import { useExamStore } from '~/store';
import DetailExam from './DetailExam';
import UpdateExam from './UpdateExam';
import DeleteExam from './DeleteExam';
import ExamList from './ExamList';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icons from '~/assets/icons';
import { useDebounce } from '~/hooks';

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
  const [searchKeywords, setSearchKeywords] = useState('');

  const debounceQuery = useDebounce(searchKeywords, 200);
  const {control} = useForm();

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

  const handleInputChange = (e) => {
    setSearchKeywords(e.target.value);
  };

  useEffect(() => {
    (async () => {
      const searchValue = await searchQuiz({ searchContent: debounceQuery });
      setExamList(searchValue || []);
    })();
  }, [debounceQuery]);

  const handleSelectCate = async (e) => {
    try {
      const filterQuizbyCate = await filterQuizByCategory(e);
      setExamList(filterQuizbyCate)
    } catch (error) {
      toast.error("Không có dữ liệu", { toastId: 'fliter_quiz' });
    }
  };
  return (
    <>
      <div className='w-full'>
        <div className='flex w-full mb-2'>
        <div className='w-[20%]'>
          <div className='flex'>
          <FormSelect
            control={control}
            name="category"
            label='Danh sách danh mục'
            options={categories}
            onChange={handleSelectCate}
            />
          </div>
          
          </div>
          <div className='w-[40%]'>
          <Input
            icon={<Icons.Search />}
            placeholder="Tìm kiếm theo tên bài tập"
            value={searchKeywords}
            onChange={handleInputChange}
            className='mt-5 ml-[100%]'
          />
          </div>
         
        </div>
        <ExamList category={categories} />
      </div>

      {targetExam && modal && ModalFormObj[modal]}
    </>
  );
}

export default ExamWrapper;
