import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { initLights } from "./lights";
import { initScenes } from "./sceneContainers";
import {
  initSceneSwitchControl,
  initOverheadLightControl,
} from "./domControls";

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = async () => {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    Math.PI / 2,
    Math.PI / 2,
    2,
    new BABYLON.Vector3(0, 0, 1),
    scene
  );
  camera.attachControl(canvas, true);

  initLights(scene);
  await initScenes(scene);

  const glowLayer = new BABYLON.GlowLayer("glow", scene, {
    mainTextureFixedSize: 256,
    blurKernelSize: 32,
  });

  initSceneSwitchControl();
  initOverheadLightControl();
  scene.debugLayer.show();

  return scene;
};

const initBabylonCanvas = async () => {
  const scene = await createScene();
  engine.runRenderLoop(function () {
    scene.render();
  });
  window.addEventListener("resize", function () {
    engine.resize();
  });
};

export { initBabylonCanvas };
