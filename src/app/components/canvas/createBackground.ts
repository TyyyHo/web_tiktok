import * as THREE from "three";

export function createBackground(scene: THREE.Scene, cameraType: "user" | "environment") {
  const video = document.createElement("video");
  const texture = new THREE.VideoTexture(video);
  texture.colorSpace = THREE.SRGBColorSpace;

  if (navigator.mediaDevices?.getUserMedia) {
    const constraints = {
      video: { facingMode: cameraType },
      audio: true,
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        video.srcObject = stream;
        video.playsInline = true;
        video.muted = true;
        video.addEventListener("canplay", () => {
          video.play();
        });
        video.remove();
      })
      .catch((error) => {
        alert("欲使用此服務，請先開啟相機與麥克風權限");
      });
  } else {
    console.error("MediaDevices interface not available.");
  }

  return texture;
}
