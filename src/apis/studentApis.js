import { axiosClient } from './axiosClient';

export const getHistory = async () => await axiosClient.get('/history/');

export const searchHistory = async (body) => await axiosClient.post('/history/search', body);