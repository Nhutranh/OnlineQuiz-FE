import { axiosClient } from './axiosClient';

export const getMe = async () => await axiosClient.get('/user/me');
export const createAccountWithSocial = async (form) => await axiosClient.post('/user/add', form);
export const register = async (form) => await axiosClient.post('/auth/register', form);
