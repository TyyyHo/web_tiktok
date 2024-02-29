import { ReactNode } from "react";
import "./waitForDownload.css";
import { useDownloadStore } from "@/app/store/downloadStore";

export default function WaitForDownload(): ReactNode {
  const { isDownloading } = useDownloadStore();

  return (
    <>
      {isDownloading ? (
        <section className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="bg-[#1e1e1e]/[0.95] w-4/5 h-[40%] max-w-[600px] max-h-[300px] flex flex-col justify-evenly items-center p-2 pb-8 rounded-xl">
            <span className="tape"></span>
            <span className="text">轉存中</span>
          </div>
        </section>
      ) : null}
    </>
  );
}
