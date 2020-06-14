import * as BABYLON from "babylonjs";

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const createScene = function () {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera(
    "Camera",
    Math.PI / 2,
    Math.PI / 2,
    2,
    new BABYLON.Vector3(0, 0, 5),
    scene
  );
  camera.attachControl(canvas, true);

  // Environment Texture
  var hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData(
    "img/nightEnvSpecularHDR.dds",
    scene
  );
  scene.imageProcessingConfiguration.exposure = 0.1;
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

  const sphere = BABYLON.MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2 },
    scene
  );
  var plastic = new BABYLON.PBRMaterial("plastic", scene);
  plastic.reflectionTexture = hdrTexture;
  plastic.microSurface = 0.96;
  plastic.albedoColor = new BABYLON.Color3(0.206, 0.94, 1);
  plastic.reflectivityColor = new BABYLON.Color3(0.003, 0.003, 0.003);
  sphere.material = plastic;

  // const light1 = new BABYLON.HemisphericLight(
  //   "light1",
  //   new BABYLON.Vector3(1, 1, 0),
  //   scene
  // );
  // const light2 = new BABYLON.PointLight(
  //   "light2",
  //   new BABYLON.Vector3(0, 1, -1),
  //   scene
  // );

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
