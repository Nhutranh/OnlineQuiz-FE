import { useState } from 'react';
import { axiosClient, deleteCategoryById, getQuizOfCategory } from '~/apis';
import Icons from '~/assets/icons';
import { Button, DialogComfirm } from '~/components';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const CreateCategory = ({ cate, onQuizOfCateChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showDisplay, setShowDisplay] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDiaLog, setIsOpenDiaLog] = useState(false);
  const [newLanguage, setNewLanguage] = useState('');
  const [languages, setLanguages] = useState([]);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const select = (value, display) => {
    setSelectedLanguage(value);
    setShowDisplay(display);
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    setNewLanguage(event.target.value);
  };

  const addLanguage = async () => {
    if (newLanguage.trim() !== '') {
      try {
        const response = await axiosClient.post('/category/add', {
          title: newLanguage,
        });
        console.log('Response:', response.data);
        const updatedLanguages = [...languages, newLanguage];
        setLanguages(updatedLanguages);
        setIsOpen(false);
        setNewLanguage('');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const [quizOfCate, setQuizOfCate] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const listQuizsOfCate = await getQuizOfCategory(selectedLanguage || 0);
        setQuizOfCate(listQuizsOfCate);
      } catch (error) {
        toast.error(error.message, { toastId: 'fetch_quiz_of_category' });
      }
    })();
  }, [selectedLanguage]);

  // onQuizOfCateChange props gửi ds Quiz Of Cate cho ExamList
  useEffect(() => {
    onQuizOfCateChange(quizOfCate);
  }, [quizOfCate]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addLanguage();
    }
  };

  const handleDelete = async (categories) => {
    console.log('XOA', categories);
    //const isSelect = cate.filter((item) => item.id !== categories);
    try {
      const response = await deleteCategoryById(categories);
      if (response) {
        toast.success('Xóa danh mục thành công', { toastId: 'delete_category' });
      }
    } catch (error) {
      toast.error(error.message, { toastId: 'delete_category' });
    }
  };
  const handleCancel = () => {
    setIsOpenDiaLog(false);
  };

  return (
    <div className="relative">
      <div className="flex border p-3 rounded-md">
        <Icons.Menu />
        <button className="text-sm ml-1" onClick={toggleDropdown}>
          {showDisplay ? showDisplay : 'Danh mục'}
        </button>
      </div>
      {isOpen && (
        <div className="absolute left-0 mt-2 max-w-[250px] origin-top-left border border-gray-400 bg-white divide-y divide-gray-100 rounded-md shadow-lg ">
          {cate.map((categoris, index) => (
            <div key={index} className="flex">
              <button
                onClick={() => select(categoris.value, categoris.display)}
                className="block px-4 py-2 text-sm text-gray-700 w-full"
                role="menuitem"
              >
                {categoris.display}
              </button>
              <Button
                onClick={() => setIsOpenDiaLog(true)}
                className="p-2 text-danger hover:bg-danger hover:bg-opacity-10 disabled:hover:bg-transparent"
              >
                <Icons.Trash />
              </Button>
              {isOpenDiaLog && (
                <DialogComfirm
                  icon={<Icons.Exclamation />}
                  title="Xác nhận xóa danh mục"
                  body="Bạn có chắc chắn muốn xóa danh mục này không?"
                  onCancel={handleCancel}
                  onConfirm={() => handleDelete(categoris.value)}
                  className="max-w-lg text-danger"
                />
              )}
            </div>
          ))}
          <div className="px-4 py-2 text-sm">
            <input
              type="text"
              placeholder="Thêm ngôn ngữ mới..."
              className="border border-gray-300 w-[150px] rounded-md shadow-sm px-2 py-1"
              value={newLanguage}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCategory;

CreateCategory.propTypes = {
  cate: PropTypes.array,
  onQuizOfCateChange: PropTypes.func,
};
