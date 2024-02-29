import { create } from "zustand";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { get, set } from "idb-keyval";

export interface iLoadingStore {
  loading: boolean;
  ffmpeg: null | FFmpeg;
  bgmBlob: null | Blob;
  fetchFFmpeg: () => void;
}

interface iFFmpegUrl {
  coreUrl: string;
  wasmUrl: string;
}

export const useLoadingStore = create<iLoadingStore>((set) => ({
  loading: true,
  ffmpeg: null,
  bgmBlob: null,
  fetchFFmpeg: async () => {
    const response = await accessIndexedDB();
    const ffmpeg = new FFmpeg();
    ffmpeg.load({
      coreURL: response.coreUrl,
      wasmURL: response.wasmUrl,
    });

    const bgm = await fetch("/music/bgm.mp3");
    const bgmBlob = await bgm.blob();
    set({ loading: false, ffmpeg: ffmpeg, bgmBlob: bgmBlob });
  },
}));

async function accessIndexedDB() {
  const response = await new Promise<iFFmpegUrl>((resolve, reject) => {
    get("ffmpeg.wasm").then(async (value) => {
      let coreBlob, wasmBlob;
      if (value) {
        coreBlob = value.core;
        wasmBlob = value.wasm;
      } else {
        const core = await fetch("https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js");
        coreBlob = await core.blob();
        const wasm = await fetch("https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm");
        wasmBlob = await wasm.blob();
        const data = { core: coreBlob, wasm: wasmBlob };
        set("ffmpeg.wasm", data);
      }
      const coreUrl = URL.createObjectURL(coreBlob);
      const wasmUrl = URL.createObjectURL(wasmBlob);
      resolve({ coreUrl, wasmUrl });
    });
  });

  return response;
}
