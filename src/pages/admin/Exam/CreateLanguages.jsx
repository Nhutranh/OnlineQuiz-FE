import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { axiosClient, getAllCategories } from '~/apis';
import Icons from '~/assets/icons';
import { Button } from '~/components';

const CreateLanguages = ({ onRemove }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [newLanguage, setNewLanguage] = useState('');
  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
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
        setSelectedLanguage(newLanguage);
        setIsOpen(false);
        console.log('Ngôn ngữ vừa được tạo:', newLanguage);
        setNewLanguage('');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addLanguage();
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center px-4 py-2 border border-gray-400 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        {selectedLanguage ? selectedLanguage : 'Danh mục'}
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 max-w-[200px] origin-top-left border border-gray-400 bg-white divide-y divide-gray-100 rounded-md shadow-lg ">
          {categories.map((categoris, index) => (
            <div key={index} className="flex">
              <button
                onClick={() => selectLanguage(categoris.display)}
                className="block px-4 py-2 text-sm text-gray-700 w-full"
                role="menuitem"
              >
                {categoris.display}
              </button>
              <Button
                onClick={onRemove}
                className="p-2 text-danger hover:bg-danger hover:bg-opacity-10 disabled:hover:bg-transparent"
              >
                <Icons.Trash />
              </Button>
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

export default CreateLanguages;

CreateLanguages.propTypes = {
  onRemove: PropTypes.func,
};
