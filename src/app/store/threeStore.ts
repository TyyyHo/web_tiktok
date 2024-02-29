import { create } from "zustand";

export type ThreeElement = {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
};

export interface iThreeStore {
  threeELement: null | ThreeElement;
  setThreeELement: (threeElement: ThreeElement) => void;
}

export const useThreeStore = create<iThreeStore>((set) => ({
  threeELement: null,
  setThreeELement: (threeElement: ThreeElement) => set({ threeELement: threeElement }),
}));
