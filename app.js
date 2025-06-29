import * as THREE from 'https://cdn.skypack.dev/three';
import { FontLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://cdn.skypack.dev/three/examples/jsm/geometries/TextGeometry.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas3D'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// Initial values
let mesh, geometry, font;
let fontSize = 1;
let rotationSpeed = 0.01;
let displayText = "SPACE";

const loader = new FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (loadedFont) {
  font = loadedFont;
  createText();
  animate();
});

function createText() {
  if (mesh) scene.remove(mesh); // remove previous mesh

  geometry = new TextGeometry(displayText, {
    font: font,
    size: fontSize,
    height: 0.2,
  });

  const material = new THREE.MeshPhongMaterial({ color: 0x00ffcc });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  camera.position.z = 5;
}

function animate() {
  requestAnimationFrame(animate);
  if (mesh) mesh.rotation.y += rotationSpeed;
  renderer.render(scene, camera);
}

// 👇 Event Listeners

document.getElementById("textInput").addEventListener("input", (e) => {
  displayText = e.target.value || " "; // prevent empty string crash
  createText();
});

document.getElementById("sizeSlider").addEventListener("input", (e) => {
  fontSize = parseFloat(e.target.value);
  createText();
});

document.getElementById("speedSlider").addEventListener("input", (e) => {
  rotationSpeed = parseFloat(e.target.value);
});
