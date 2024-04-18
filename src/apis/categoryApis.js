import { axiosClient } from './axiosClient';

export const getAllCategories = async () => await axiosClient.get('/category/');

export const deleteCategoryById = async (id) => await axiosClient.delete(`/category/delete/${id}`);
