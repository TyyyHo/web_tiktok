import { ReactNode } from "react";
import Image from "next/image";

// state management
import { useRecordStore } from "@/app/store/recordStore";
import { useCameraTypeStore } from "@/app/store/cameraTypeStore";

export default function Flip(): ReactNode {
  const { isRecord } = useRecordStore();
  const { setCameraType } = useCameraTypeStore();

  return (
    <button className="rounded-full z-10 m-[2px]" disabled={isRecord} onClick={setCameraType}>
      <Image
        className="bg-[#1a1a1a] rounded-full p-2 w-[55px] h-[55px]"
        src="/img/flip.webp"
        alt="切換前後鏡頭"
        priority
        width={55}
        height={55}
      ></Image>
    </button>
  );
}
