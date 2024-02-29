import { ReactNode, useEffect } from "react";
import { useThreeStore } from "@/app/store/threeStore";

// utils
import { createBasis } from "./createBasis";
import { createBackground } from "./createBackground";
import { createVideoTexture } from "./createVideoTexture";

// state management
import { useCameraTypeStore } from "@/app/store/cameraTypeStore";

export default function Canvas(): ReactNode {
  const { threeELement, setThreeELement } = useThreeStore();
  const { cameraType } = useCameraTypeStore();

  useEffect(() => {
    let id: number;
    const basicElement = createBasis();
    setThreeELement(basicElement);
    const background = createBackground(basicElement.scene, cameraType);
    createVideoTexture(basicElement.scene);
    basicElement!.scene.background = background;

    document.getElementById("canvasContainer")!.appendChild(basicElement.renderer.domElement);
    function animate() {
      id = requestAnimationFrame(animate);
      basicElement.renderer.render(basicElement.scene, basicElement.camera);
    }
    animate();

    return () => {
      document.getElementById("canvasContainer")?.removeChild(basicElement.renderer.domElement);
      cancelAnimationFrame(id);
    };
  }, []);

  useEffect(() => {
    if (!threeELement) return;
    const texture = createBackground(threeELement!.scene, cameraType);
    threeELement!.scene.background = texture;
  }, [cameraType]);

  return <div id="canvasContainer" onContextMenu={(e) => e.preventDefault()}></div>;
}
