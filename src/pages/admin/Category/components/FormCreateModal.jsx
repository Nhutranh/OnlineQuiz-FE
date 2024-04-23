import { zodResolver } from '@hookform/resolvers/zod';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createCategory } from '~/apis';
import { FormInput, FormModalWarpper, FormTextArea } from '~/components';
import { CategorySchema } from '~/validations';

export default function FormCreateModal({ onCancel, className, onClose }) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(CategorySchema),
  });

  const onSubmit = async (data) => {
    try {
      const body = {
        title: data.title,
        description: data.description,
      }
      await createCategory(body);
      toast.success('Tạo danh mục thành công', { toastId: 'create_category' });
      onClose()
    } catch (error) {
      toast.error('Có lỗi xảy ra', { toastId: 'fail_category' });
    } 
  };

  return (
    <FormModalWarpper
      title="Tạo mới danh mục"
      className={`mx-auto ${className}`}
      onCancel={onCancel}
      onConfirm={handleSubmit(onSubmit)}
    >
      <FormInput
        control={control}
        name="title"
        title="Tên danh mục"
        placeholder="Nhập tên danh mục"
        required
        error={errors.title?.message}
      />
      <FormTextArea
        control={control}
        name="description"
        title="Mô tả"
        placeholder="Viết mô tả danh mục..."
      />
    </FormModalWarpper>
  );
}

FormCreateModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  className: PropTypes.string,
};
