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
  var hdrTexture = new BABYLON.CubeTexture("img/night.env", scene);
  scene.imageProcessingConfiguration.exposure = 0.2;
  scene.imageProcessingConfiguration.contrast = 1.0;
  scene.environmentTexture = hdrTexture;

  // Skybox
  var hdrSkybox = BABYLON.Mesh.CreateBox("hdrSkyBox", 1000.0, scene);
  var hdrSkyboxMaterial = new BABYLON.PBRMaterial("skyBox", scene);
  hdrSkyboxMaterial.backFaceCulling = false;
  hdrSkyboxMaterial.reflectionTexture = hdrTexture.clone();
  hdrSkyboxMaterial.reflectionTexture.coordinatesMode =
    BABYLON.Texture.SKYBOX_MODE;
  hdrSkyboxMaterial.microSurface = 1.0;
  hdrSkyboxMaterial.disableLighting = true;
  hdrSkybox.material = hdrSkyboxMaterial;
  hdrSkybox.infiniteDistance = true;

  const overheadLight = new BABYLON.PointLight(
    "overheadLight",
    new BABYLON.Vector3(0, 0.5, 0.5),
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
  };

  const dayLighting = () => {
    overheadLight.diffuse = new BABYLON.Color3(0.9, 0.9, 0.9);
    overheadLight.intensity = 4;
    dirLight.intensity = 2;
    dirLight.diffuse = new BABYLON.Color3(0.2, 0.7, 0.7);
  };

  const sunsetLighting = () => {
    overheadLight.diffuse = new BABYLON.Color3(0.9, 0.9, 0.9);
    overheadLight.intensity = 4;
    dirLight.intensity = 2;
    dirLight.diffuse = new BABYLON.Color3(0.2, 0.7, 0.7);
  };

  nightLighting();

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
  BABYLON.SceneLoader.LoadAssetContainer(
    "./resources/",
    "night.glb",
    scene,
    addShadowsToMeshes
  );
  // BABYLON.SceneLoader.LoadAssetContainer(
  //   "./resources/",
  //   "sunset.glb",
  //   scene,
  //   addShadowsToMeshes
  // );

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
