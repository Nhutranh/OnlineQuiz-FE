import { zodResolver } from '@hookform/resolvers/zod';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FormInput, FormModalWarpper, FormTextArea } from '~/components';
import { CategorySchema } from '~/validations';

export default function FormCreateModal({ onCancel, className }) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(CategorySchema),
  });

  const onSubmit = (data) => {
    console.log(data);
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
  className: PropTypes.string,
};
