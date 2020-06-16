import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {
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

  // Environment Texture
  const nightHdr = new BABYLON.CubeTexture("img/night.env", scene);
  const dayHdr = new BABYLON.CubeTexture("img/day.env", scene);
  const sunsetHDR = new BABYLON.CubeTexture("img/sunset.env", scene);

  const overheadLight = new BABYLON.PointLight(
    "overheadLight",
    new BABYLON.Vector3(0, 0.7, 0.5),
    scene
  );

  const outsideLight = new BABYLON.PointLight(
    "outsideLight",
    new BABYLON.Vector3(0, 0, -0.2),
    scene
  );

  var dirLight = new BABYLON.DirectionalLight(
    "dir01",
    new BABYLON.Vector3(-1, -2, -1),
    scene
  );
  dirLight.position = new BABYLON.Vector3(20, 40, 4);

  const nightLighting = () => {
    overheadLight.diffuse = new BABYLON.Color3(0.9, 0.9, 0.9);
    overheadLight.intensity = 4;
    dirLight.intensity = 2;
    dirLight.diffuse = new BABYLON.Color3(0.2, 0.7, 0.7);
    scene.environmentTexture = nightHdr;
    scene.imageProcessingConfiguration.exposure = 0.2;
    scene.imageProcessingConfiguration.contrast = 1.0;
  };

  const dayLighting = () => {
    overheadLight.diffuse = new BABYLON.Color3(0.9, 0.9, 0.9);
    overheadLight.intensity = 4;
    dirLight.intensity = 2;
    dirLight.diffuse = new BABYLON.Color3(0.2, 0.7, 0.7);
    scene.environmentTexture = dayHdr;
    scene.imageProcessingConfiguration.exposure = 0.5;
    scene.imageProcessingConfiguration.contrast = 1.0;
  };

  const sunsetLighting = () => {
    overheadLight.diffuse = new BABYLON.Color3.FromHexString("#c4bdff");
    overheadLight.intensity = 2;
    dirLight.intensity = 6;
    dirLight.diffuse = new BABYLON.Color3.FromHexString("#c97424");
    outsideLight.diffuse = new BABYLON.Color3.FromHexString("#e06234");
    outsideLight.intensity = 10;
    scene.environmentTexture = sunsetHDR;
    scene.imageProcessingConfiguration.exposure = 0.3;
    scene.imageProcessingConfiguration.contrast = 1.0;
  };

  sunsetLighting();

  const shadowGenerator = new BABYLON.ShadowGenerator(1024, dirLight, true);
  shadowGenerator.usePoissonSampling = true;

  const addShadowsToMeshes = (container) => {
    const meshes = container.meshes;
    meshes.forEach((mesh) => {
      shadowGenerator.getShadowMap().renderList.push(mesh);
      mesh.receiveShadows = true;
    });
    container.addAllToScene();
  };
  BABYLON.SceneLoader.LoadAssetContainer(
    "./resources/",
    "base.glb",
    scene,
    addShadowsToMeshes
  );
  // BABYLON.SceneLoader.LoadAssetContainer(
  //   "./resources/",
  //   "day.glb",
  //   scene,
  //   addShadowsToMeshes
  // );
  // BABYLON.SceneLoader.LoadAssetContainer(
  //   "./resources/",
  //   "night.glb",
  //   scene,
  //   addShadowsToMeshes
  // );
  BABYLON.SceneLoader.LoadAssetContainer(
    "./resources/",
    "sunset.glb",
    scene,
    addShadowsToMeshes
  );

  const glowLayer = new BABYLON.GlowLayer("glow", scene, {
    mainTextureFixedSize: 256,
    blurKernelSize: 32,
  });

  scene.debugLayer.show();

  return scene;
};

const initBabylonCanvas = () => {
  const scene = createScene();
  engine.runRenderLoop(function () {
    scene.render();
  });
  window.addEventListener("resize", function () {
    engine.resize();
  });
};

export { initBabylonCanvas };
