import { axiosClient } from './axiosClient';

export const getMe = async () => await axiosClient.get('/user/me');
export const createAccountWithSocial = async (form) => await axiosClient.post('/user/add', form);
export const register = async (form) => await axiosClient.post('/auth/register', form);
export const changePassword = async (form) => await axiosClient.put('/user/changePassword', form);

// Get List Admin Account
export const getAllAccounts = async () => await axiosClient.get('/admin/adminAccount');
export const deleteAccountById = async (userId) =>
await axiosClient.delete(`/admin/delete/adminAccount`, { data: { userId } });


