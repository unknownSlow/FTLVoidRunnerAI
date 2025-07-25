
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

let scene, camera, renderer, faceMesh, blinkTimer;
const container = document.getElementById('avatar-container');

function initAvatar() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(1.5, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0xffccaa, roughness: 0.7, metalness: 0.1 });
  faceMesh = new THREE.Mesh(geometry, material);
  scene.add(faceMesh);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  blinkTimer = 0;
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  faceMesh.rotation.y += 0.002;
  blinkTimer += 0.02;
  const blinkCycle = (Math.sin(blinkTimer) + 1) / 2;
  const blinkScale = blinkCycle < 0.1 ? 0.15 + blinkCycle * 1.5 : 1;
  faceMesh.scale.y = blinkScale;
  renderer.render(scene, camera);
}

window.addEventListener('load', () => {
  if (container) initAvatar();
});
