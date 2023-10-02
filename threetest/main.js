import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let selectedShape = "Cube"; // Default shape

// Create GUI
const gui = new dat.GUI();
const guiControls = {
  numShapes: 1,
  shape: selectedShape,
};

const shapeSelector = gui.add(guiControls, "shape", [
  "Cube",
  "Pyramid",
  "Rectangle",
  "Cylinder",
]);

gui.add(guiControls, "numShapes", 1, 10, 1).onChange(function (value) {
  updateShapes(value);
});

shapeSelector.onChange(function (value) {
  selectedShape = value;
  updateShapes(guiControls.numShapes);
});

const geometryMap = {
  Cube: new THREE.BoxGeometry(1, 1, 1),
  Pyramid: new THREE.ConeGeometry(1, 1, 4),
  Rectangle: new THREE.BoxGeometry(1.5, 1, 0.5),
  Cylinder: new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
};

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Create an empty group to hold multiple shapes
const shapeGroup = new THREE.Group();
scene.add(shapeGroup);

// Function to create or update shapes based on the selected shape and number of shapes
function updateShapes(numShapes) {
  shapeGroup.clear();

  const numRowsCols = Math.ceil(Math.sqrt(numShapes));

  for (let row = 0; row < numRowsCols; row++) {
    for (let col = 0; col < numRowsCols; col++) {
      const geometry = geometryMap[selectedShape];
      const shape = new THREE.Mesh(geometry, material);
      shape.position.x = (col - numRowsCols / 2) * 2; // Adjust spacing
      shape.position.y = (row - numRowsCols / 2) * 2; // Adjust spacing
      shapeGroup.add(shape);
    }
  }
}

// Call the function to create the initial shapes
updateShapes(guiControls.numShapes);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  shapeGroup.rotation.x += 0.01;
  shapeGroup.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
