import { useEffect, useRef } from "react";
import { fetchFile } from "@ffmpeg/util";

// state management
import { useLoadingStore } from "../store/loadingStore";
import { useDownloadStore } from "@/app/store/downloadStore";
import { useThreeStore } from "../store/threeStore";

export const useMediaRecorder = (isRecord: boolean) => {
  const canvas = useRef<null | HTMLCanvasElement>(null);
  const mediaRecorder = useRef<null | MediaRecorder>(null);
  const microphoneRecorder = useRef<null | MediaRecorder>(null);
  const { threeELement } = useThreeStore();
  const { ffmpeg, bgmBlob } = useLoadingStore();
  const { setIsDownloading } = useDownloadStore();
  const chunkState = { videoChunk: false, audioChunk: false };

  function download(url: string, fileName: string) {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    anchor.remove();
    setTimeout(() => setIsDownloading(false), 1000);
  }

  async function mergeFile(video: Blob, envirAudio: Blob, bgmAudio: Blob, videoType: string) {
    if (!ffmpeg || !video || !envirAudio || !bgmAudio) return;
    chunkState.videoChunk = false;
    chunkState.audioChunk = false;
    ffmpeg.writeFile(`video.${videoType}`, await fetchFile(video));
    ffmpeg.writeFile("envirAudio.mp3", await fetchFile(envirAudio));
    ffmpeg.writeFile("bgmAudio.mp3", await fetchFile(bgmAudio));

    const command_mergedAudio = [
      "-i",
      "envirAudio.mp3",
      "-i",
      "bgmAudio.mp3",
      "-filter_complex",
      "amix=inputs=2:duration=first:dropout_transition=2",
      "mergedAudio.mp3",
    ];

    const command_mergedAll = ["-i", `video.${videoType}`, "-i", "mergedAudio.mp3", "-c:v", "copy", "-c:a", "aac", "output.mp4"];

    await ffmpeg.exec(command_mergedAudio);
    await ffmpeg.exec(command_mergedAll);

    const data = await ffmpeg.readFile("output.mp4");

    // download
    const blob = new Blob([data], { type: "video/mp4" });
    const url = URL.createObjectURL(blob);
    download(url, "video.mp4");
  }

  async function createRecorder(canvas: HTMLCanvasElement) {
    const chunks_video: Blob[] = [];
    const chunks_audio: Blob[] = [];
    const chunks_bgm: Blob[] = [bgmBlob!];
    // video recorder
    const stream = canvas.captureStream(60);
    const videoType = MediaRecorder.isTypeSupported("video/webm") ? "webm" : "mp4";
    mediaRecorder.current = new MediaRecorder(stream, { mimeType: `video/${videoType}` });
    mediaRecorder.current.addEventListener("dataavailable", (e) => {
      chunks_video.push(e.data);
      chunkState.videoChunk = true;
      if (chunkState.videoChunk && chunkState.audioChunk) {
        mergeFile(chunks_video[0], chunks_audio[0], chunks_bgm[0], videoType);
      }
    });

    // microphone recorder
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      microphoneRecorder.current = new MediaRecorder(stream);
      microphoneRecorder.current.addEventListener("dataavailable", async (e) => {
        chunks_audio.push(e.data);
        chunkState.audioChunk = true;
        if (chunkState.videoChunk && chunkState.audioChunk) {
          mergeFile(chunks_video[0], chunks_audio[0], chunks_bgm[0], videoType);
        }
      });
    });
  }

  function startRecord() {
    mediaRecorder.current?.start();
    microphoneRecorder.current?.start();
  }

  const stopRecord = () => {
    setIsDownloading(true);
    mediaRecorder.current?.stop();
    microphoneRecorder.current?.stop();
  };

  const screenShot = async () => {
    if (!threeELement) return;
    threeELement.renderer.render(threeELement.scene, threeELement.camera);
    setIsDownloading(true);
    const node = document.querySelector("canvas") as HTMLCanvasElement;
    const _canvas = document.createElement("canvas");
    _canvas.width = node.offsetWidth;
    _canvas.height = node.offsetHeight;
    const context = _canvas.getContext("2d");
    context?.drawImage(node, 0, 0, node.offsetWidth, node.offsetHeight);

    const dataUrl = _canvas.toDataURL("image/png");
    download(dataUrl, "image.png");
  };

  useEffect(() => {
    canvas.current = document.getElementById("canvasContainer")?.firstChild as HTMLCanvasElement | null;
  }, []);

  useEffect(() => {
    // Creating a new recorder for next record when stopping record
    if (!canvas.current || !ffmpeg) return;
    if (!isRecord) createRecorder(canvas.current);
  }, [isRecord, ffmpeg]);

  return { startRecord, stopRecord, screenShot };
};
