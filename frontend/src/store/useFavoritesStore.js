// Global favorites state managed with Zustand.

import { create } from 'zustand';
import { getFavorites, addFavorite, removeFavorite } from '../api/favorites.api';

const useFavoritesStore = create((set, get) => ({
  favorites: [],
  pagination: {
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 2,
  },

  fetchFavorites: async (page = 1) => {
    try {
      const response = await getFavorites(page, get().pagination.limit);
      set({
        favorites: response.data.data ?? [],
        pagination: { ...get().pagination, ...response.data.pagination },
      });
    } catch (err) {
      console.error('Error fetching favorites:', err);
    }
  },

  setFavoritesPage: (page) => get().fetchFavorites(page),

  toggleFavorite: async (item) => {
    const { favorites } = get();
    const existing = favorites.find(
      f => f.content?.Id === item.id || f.contentId === item.id
    );

    try {
      if (existing) {
        await removeFavorite(existing.id);
        set({ favorites: favorites.filter(f => f.id !== existing.id) });

        const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        localStorage.setItem('favorites', JSON.stringify(
          localFavorites.filter(f => f.id !== item.id)
        ));
      } else {
        const response = await addFavorite(item.id);
        set({ favorites: [...favorites, response.data.favorite] }); 

        const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        localFavorites.push(item);
        localStorage.setItem('favorites', JSON.stringify(localFavorites));
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  },

  isFavorite: (id) => {
    const { favorites } = get();
    return favorites.some(f => f.content?.Id === id || f.contentId === id);
  },
}));

export default useFavoritesStore;