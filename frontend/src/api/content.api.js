// Handles all gallery content related API calls.

import client from './client';

export const getAllContent = (page = 1, limit = 6, category = null) => {
  const params = new URLSearchParams({ page, limit });
  if (category) params.append('category', category);
  return client.get(`/content?${params.toString()}`);
};
export const getContentById = (id) => client.get(`/content/${id}`);