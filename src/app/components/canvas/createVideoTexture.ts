import * as THREE from "three";
import { VERTEX_SHADER, FRAGMENT_SHADER } from "./shader";

const keyColor = new THREE.Color(0x00cf04);

export function createVideoTexture(scene: THREE.Scene) {
  const video = document.createElement("video");
  video.src = "/media/toothless.mp4";
  video.playsInline = true;
  video.muted = true;
  video.loop = true;
  video.addEventListener("loadedmetadata", () => {
    video.play();
    video.remove();
  });

  const texture = new THREE.VideoTexture(video);
  texture.colorSpace = THREE.SRGBColorSpace;

  const uniforms = {
    tex: { value: texture },
    keyColor: { value: keyColor },
    similarity: { value: 0.1 },
    smoothness: { value: 0.18 },
    spill: { value: 0.1 },
  };
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    transparent: true,
  });
  const geometry = new THREE.PlaneGeometry(108, 192);
  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);
  mesh.position.set(0, -20, -200);

  return mesh;
}
