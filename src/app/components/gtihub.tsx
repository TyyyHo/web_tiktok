import { ReactNode } from "react";
import Image from "next/image";

export default function Gtihub(): ReactNode {
  return (
    <a className="absolute top-0 right-0 w-[25dvw] h-[25dvw] m-0" href="https://github.com/TyyyHo/web_tiktok" target="_blank">
      <div className="triangle absolute right-0"></div>
      <Image className="absolute right-[5px] top-[5px]" src="/img/github-white.webp" alt="切換前後鏡頭" priority width={50} height={50} />
    </a>
  );
}
