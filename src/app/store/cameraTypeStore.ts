import { create } from "zustand";

export interface iCameraTypeStore {
  cameraType: "user" | "environment";
  setCameraType: () => void;
}

export const useCameraTypeStore = create<iCameraTypeStore>((set) => ({
  cameraType: "environment",
  setCameraType: () => set((state) => ({ cameraType: state.cameraType === "user" ? "environment" : "user" })),
}));
