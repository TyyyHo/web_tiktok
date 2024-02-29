import { create } from "zustand";

interface iRecordStore {
  isRecord: boolean;
  setIsRecord: (state: boolean) => void;
}

export const useRecordStore = create<iRecordStore>((set) => ({
  isRecord: false,
  setIsRecord: (state: boolean) => set({ isRecord: state }),
}));
