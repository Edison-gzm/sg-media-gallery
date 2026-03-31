// Handles all favorites related API calls. Requires authentication.

import client from './client';

export const getFavorites = () => client.get('/favorites');
export const addFavorite = (contentId) => client.post('/favorites', { contentId  });
export const removeFavorite = (id) => client.delete(`/favorites/${id}`);