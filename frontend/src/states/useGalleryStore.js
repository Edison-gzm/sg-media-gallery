// Global gallery state managed with Zustand.

import { create } from 'zustand';
import { getAllContent } from '../api/content.api';

const useGalleryStore = create((set, get) => ({
  content: [],
  loading: false,
  error: null,
  activeCategory: 'All',
  selectedItems: [],

  fetchContent: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllContent();
      set({ content: response.data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  setActiveCategory: (category) => set({ activeCategory: category }),

  toggleSelectItem: (item) => {
    const { selectedItems } = get();
    const exists = selectedItems.find(i => i.id === item.id);
    if (exists) {
      set({ selectedItems: selectedItems.filter(i => i.id !== item.id) });
    } else {
      set({ selectedItems: [...selectedItems, item] });
    }
  },

  clearSelection: () => set({ selectedItems: [] }),

  isSelected: (id) => get().selectedItems.some(i => i.id === id),
}));

export default useGalleryStore;