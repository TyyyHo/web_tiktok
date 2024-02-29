import { ReactNode } from "react";

// compoents
import Shutter from "./shutter";
import TypeSetting from "./typeSetting";

export default function Record(): ReactNode {
  return (
    <>
      <TypeSetting />
      <Shutter />
    </>
  );
}
