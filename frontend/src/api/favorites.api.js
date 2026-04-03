// Handles all favorites related API calls. Requires authentication.

import client from './client';

export const getFavorites = (page = 1, limit = 6) =>
  client.get(`/favorites?page=${page}&limit=${limit}`);
export const addFavorite = (contentId) => client.post('/favorites', { contentId  });
export const removeFavorite = (id) => client.delete(`/favorites/${id}`);