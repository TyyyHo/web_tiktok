import { create } from "zustand";

interface iDownloadStore {
  isDownloading: boolean;
  setIsDownloading: (state: boolean) => void;
}

export const useDownloadStore = create<iDownloadStore>((set) => ({
  isDownloading: false,
  setIsDownloading: (state: boolean) => set({ isDownloading: state }),
}));
