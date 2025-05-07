// stores/useGalleryStore.ts
import { create } from 'zustand';


// stores/useGalleryStore.ts
type GalleryState = {
    mainImage: any;
    setMainImage: (image: any) => void;
    hoveredImage: any;
    setHoveredImage: (image: any) => void;
    resetGallery: () => void;
};
  
export const useGalleryStore = create<GalleryState>((set) => ({
    mainImage: null,
    setMainImage: (image) => set({ mainImage: image }),
    hoveredImage: null,
    setHoveredImage: (image) => set({ hoveredImage: image }),
    resetGallery: () => set({ 
      mainImage: null, 
      hoveredImage: null 
    }),
}));