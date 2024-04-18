import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Icons from '~/assets/icons';
import { DialogComfirm } from '~/components';

export default function DeleteCategory({ cate }) {
  console.log('Tới đây ròi', typeof cate);

  const handleDeleteExam = async () => {
    toast.success('Xóa bài tập thành công', { toastId: 'delete_exam' });
  };

  const handleCancel = () => {
    // openModal(null);
    // setTargetExam(null);
  };

  return (
    <DialogComfirm
      icon={<Icons.Exclamation />}
      title="Xác nhận xóa bài tập"
      body="Bạn có chắc chắn muốn xóa bài tập này không?"
      onCancel={handleCancel}
      onConfirm={handleDeleteExam}
      className="max-w-lg text-danger"
    />
  );
}

DeleteCategory.propTypes = {
  cate: PropTypes.func,
};
