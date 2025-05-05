// stores/useGalleryStore.ts
import { create } from 'zustand';

type GalleryState = {
  mainImage: any;
  setMainImage: (image: any) => void;
  hoveredImage: any;
  setHoveredImage: (image: any) => void;
};

export const useGalleryStore = create<GalleryState>((set) => ({
  mainImage: null,
  setMainImage: (image) => set({ mainImage: image }),
  hoveredImage: null,
  setHoveredImage: (image) => set({ hoveredImage: image }),
}));