// Handles all gallery content related API calls.

import client from './client';

export const getAllContent = () => client.get('/content');
export const getContentById = (id) => client.get(`/content/${id}`);