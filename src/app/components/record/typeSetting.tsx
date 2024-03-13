import { ReactNode } from "react";

// state management
import { useRecordStore } from "@/app/store/recordStore";
import { useRecordTypeStore } from "@/app/store/recordTypeStore";

export default function TypeSetting(): ReactNode {
  const { type, setType } = useRecordTypeStore();
  const { isRecord } = useRecordStore();

  const options: (typeof type)[] = ["PHOTO", "VIDEO"];
  return (
    <div className="flex justify-center items-center absolute w-full h-[8dvh] bottom-[14dvh] text-white bg-black/[0.9]">
      {options.map((option) => {
        return (
          <button
            key={option}
            disabled={isRecord}
            className={`${type === option ? "bg-[#dfdfdf] font-extrabold text-[#3c3c3c]" : "bg-black/[0]"}
             transition-all duration-300 rounded-xl h-8 min-w-[15%] mx-2 px-2`}
            onClick={() => setType(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
