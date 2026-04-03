// Global gallery state managed with Zustand.

import { create } from 'zustand';
import { getAllContent } from '../api/content.api';

const useGalleryStore = create((set, get) => ({
  content: [],
  loading: false,
  error: null,
  activeCategory: 'All',
  selectedItems: [],


  pagination: {
  page: 1,
  totalPages: 1,
  total: 0,
  limit: 10,
},

 fetchContent: async (page = 1, category = null) => {
  set({ loading: true, error: null });
  try {
    const response = await getAllContent(page, get().pagination.limit, category);
    set({
      content: response.data.data ?? [],
      pagination: { ...get().pagination, ...response.data.pagination },
      loading: false,
    });
  } catch (err) {
    set({ error: err.message, loading: false });
  }
},

  setActiveCategory: (category) => set({ activeCategory: category }),
  setPage: (page, category = null) => get().fetchContent(page, category),
  setLimit: (limit) => {
  set({ pagination: { ...get().pagination, limit, page: 1 } });
  get().fetchContent(1, get().activeCategory === 'All' ? null : get().activeCategory);
},


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