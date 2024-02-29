import { create } from "zustand";

type iRecordType = "VIDEO" | "PHOTO";

interface iRecordTypeStore {
  type: iRecordType;
  setType: (newType: iRecordType) => void;
}

export const useRecordTypeStore = create<iRecordTypeStore>((set) => ({
  type: "VIDEO",
  setType: (type: iRecordType) => set({ type }),
}));
