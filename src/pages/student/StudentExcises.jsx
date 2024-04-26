import { FormSelect, Input } from '~/components';
import ExamStudent from './ExamStudent';
import Icons from '~/assets/icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { getAllCategories, getExams } from '~/apis';
import { toast } from 'react-toastify';
import { useExamStore } from '~/store';

function StudentExcises() {
  const { examList, setExamList } = useExamStore((state) => {
    return state;
  });
  const [searchKeywords, setSearchKeywords] = useState('');
  const {control} = useForm();

  const handleInputChange = (e) => {
    setSearchKeywords(e.target.value);
  };

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

  const handleSelectCate = async () => {
    // try {
    //   const filterQuizbyCate = await filterQuizByCategory(e);
    //   setExamList(filterQuizbyCate)
    // } catch (error) {
    //   toast.error("Không lọc được dữ liệu", { toastId: 'fliter_quiz' });
    // }
  };

  return (
    <div>
      <div className='flex w-full mb-5'>
        <div className='w-[20%]'>
          <div className='flex'>
          <Icons.Funnel/>
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
            className='mt-5 ml-10'
          />
          </div>
        </div>
      <ExamStudent list={examList}/>
    </div>
  );
}

export default StudentExcises;
