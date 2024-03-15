import { ReactNode } from "react";
import Flip from "./flip";
import Volume from "./volume";
import ControlItem from "./controlItem";

export default function Control(): ReactNode {
  return (
    <section className="absolute bottom-[22dvh] right-[3dvw]">
      <ControlItem>
        <Volume />
      </ControlItem>
      <ControlItem>
        <Flip />
      </ControlItem>
    </section>
  );
}
