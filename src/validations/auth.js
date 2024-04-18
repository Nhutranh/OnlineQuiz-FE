import { z } from 'zod';

const uppercaseRegex = /[A-Z]/;
const symbolRegex = /[^a-zA-Z0-9]/;

export const FormSignInInput = z.object({
  email: z.string().email('Địa chỉ email không hợp lệ!'),
  password: z.string().min(1, 'Mật khẩu không được để trống!'),
});

export const FormSignUpInput = z
  .object({
    fullName: z.string().min(3, 'Họ và tên phải có ít nhất 3 ký tự!'),
    email: z.string().email('Địa chỉ email không hợp lệ!'),
    password: z
      .string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự!')
      .refine((password) => uppercaseRegex.test(password) && symbolRegex.test(password), {
        message: 'Mật khẩu phải chứa ít nhất 1 ký tự viết hoa và 1 ký tự đặc biệt',
      }),
    confirmPassword: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự!'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp!',
    path: ['confirmPassword'],
  });

  
