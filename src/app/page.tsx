"use client";

// components
import Record from "./components/record/record";
import Canvas from "./components/canvas/canvas";
import WaitForDownload from "./components/load/waitForDownload";
import Control from "./components/controls/control";
import Gtihub from "./components/gtihub";

export default function Home() {
  return (
    <main className="">
      <Canvas />
      <Gtihub />
      <Control />
      <Record />
      <WaitForDownload />
      <audio src="/music/bgm.mp3" loop></audio>
    </main>
  );
}
