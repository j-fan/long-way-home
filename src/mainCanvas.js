import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { initLights } from "./lights";
import { initScenes } from "./sceneContainers";
import { initDomControls, setLoadingScreenReady } from "./domControls";

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = async () => {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    Math.PI / 2,
    Math.PI * 0.43,
    1,
    new BABYLON.Vector3(0.1, 0.1, 1.2),
    scene
  );
  camera.fov = 0.42;
  // camera.attachControl(canvas, true);

  initLights(scene);
  await initScenes(scene);

  const glowLayer = new BABYLON.GlowLayer("glow", scene, {
    mainTextureFixedSize: 512,
    blurKernelSize: 32,
  });
  const defaultPipeline = new BABYLON.DefaultRenderingPipeline(
    "default",
    true,
    scene,
    [camera]
  );
  defaultPipeline.grainEnabled = true;
  defaultPipeline.grain.intensity = 8;
  defaultPipeline.grain.animated = true;

  defaultPipeline.fxaaEnabled = true;

  defaultPipeline.chromaticAberrationEnabled = true;
  defaultPipeline.chromaticAberration.aberrationAmount = 1;

  defaultPipeline.imageProcessing.exposure = 0.1;
  defaultPipeline.imageProcessing.contrast = 0.8;

  defaultPipeline.imageProcessing.vignetteEnabled = true;
  defaultPipeline.imageProcessing.vignetteBlendMode =
    BABYLON.ImageProcessingPostProcess.VIGNETTEMODE_MULTIPLY;
  defaultPipeline.imageProcessing.vignetteWeight = 4;

  initDomControls();
  // scene.debugLayer.show();
  return scene;
};

const resizeAndConstrainRatio = () => {
  console.log("here");
  let winWidth = window.innerWidth;
  let winHeight = window.innerHeight;

  let currentAspectRatio = winWidth / winHeight;

  let desiredAspectRatio = 1.777777777778; // 16:9

  if (currentAspectRatio > desiredAspectRatio) {
    let heightTimesAspect = Math.round(winHeight * desiredAspectRatio);

    if (winWidth <= heightTimesAspect) {
      canvas.width = winWidth;
      canvas.height = Math.round(winWidth / desiredAspectRatio);
    } else {
      canvas.width = heightTimesAspect;
      canvas.height = winHeight;
    }
  } else {
    canvas.width = winWidth;
    canvas.height = winHeight;
  }
};

const initBabylonCanvas = async () => {
  const scene = await createScene();
  resizeAndConstrainRatio();
  window.addEventListener("resize", function () {
    resizeAndConstrainRatio();
    engine.resize();
  });
  setLoadingScreenReady();
  engine.runRenderLoop(function () {
    scene.render();
  });
};

export { initBabylonCanvas };
