import { axiosClient } from './axiosClient';

export const createCategory = async (data) => await axiosClient.post('/category/add', data);

export const getAllCategories = async () => await axiosClient.get('/category/');

export const deleteCategoryById = async (id) => await axiosClient.delete(`/category/delete/${id}`);
