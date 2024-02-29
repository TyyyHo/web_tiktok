import { ReactNode } from "react";
import Flip from "./flip";
import Volume from "./volume";
import ControlItem from "./controlItem";

export default function Control(): ReactNode {
  return (
    <section className="absolute top-[3dvw] right-[3dvw]">
      <ControlItem>
        <Flip />
      </ControlItem>
      <ControlItem>
        <Volume />
      </ControlItem>
    </section>
  );
}
