import * as THREE from "three";
export function createBasis() {
  // Scene
  const scene = new THREE.Scene();

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.toneMappingExposure = 0.5;

  // light
  const light = new THREE.AmbientLight(0xffffff, 4);
  light.position.set(0.5, 1, 1).normalize();
  scene.add(light);

  // Camera
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 400);

  // listener
  window.addEventListener("resize", () => onWindowResize());

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  return { scene, renderer, camera };
}
