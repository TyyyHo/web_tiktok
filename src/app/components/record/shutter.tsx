import { ReactNode, useState, useRef } from "react";

// hook
import { useMediaRecorder } from "../../hook/useMediaRecorder";

// state management
import { useRecordStore } from "@/app/store/recordStore";
import { useRecordTypeStore } from "@/app/store/recordTypeStore";

export default function Shutter(): ReactNode {
  const [pending, setPending] = useState<boolean>(false);
  const timeout = useRef<null | NodeJS.Timeout>(null);
  const { isRecord, setIsRecord } = useRecordStore();
  const { type } = useRecordTypeStore();
  const { startRecord, stopRecord, screenShot } = useMediaRecorder(isRecord);
  const counter = (time: number) => {
    timeout.current = setTimeout(() => stop(), time * 1001);
  };

  function handleRecord() {
    if (pending) return;
    setPending(true);
    if (type === "VIDEO") {
      isRecord ? stop() : start();
    }
    if (type === "PHOTO") {
      screenShot();
    }
    setTimeout(() => setPending(false), 2000);
  }

  function start() {
    setIsRecord(true);
    counter(22);
    startRecord();
  }
  function stop() {
    setIsRecord(false);
    clearTimeout(timeout.current!);
    stopRecord();
  }

  return (
    <section
      className={`flex justify-center items-center transition-all duration-500 absolute bottom-0 bg-black/[0.9] w-full h-[14dvh]`}
    >
      <button
        className={`rounded-full border flex justify-center items-center bg-black transition-all duration-300 max-w-[150px] max-h-[150px] ${
          isRecord ? "w-[12dvh] h-[12dvh] border-[#fffc5c]" : "w-[11dvh] h-[11dvh] border-[#ececec]"
        }`}
        style={{ borderWidth: "min(7px, 0.3em)" }}
        onClick={handleRecord}
      >
        <div
          className={`bg-[#ff3939] ${
            isRecord ? "w-[50%] h-[50%] rounded" : "w-[70%] h-[70%] rounded-[50px]"
          } max-w-[100px] max-h-[100px]`}
        ></div>
      </button>
    </section>
  );
}
