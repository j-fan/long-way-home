import * as BABYLON from "babylonjs";

let sceneLights = {};
export let shadowGenerator;
export let lightingSettings = {};
let overheadLight, outsideLight, dirLight;

export const initLights = (scene) => {
  // Environment Texture
  const nightHdr = new BABYLON.CubeTexture("img/night.env", scene);
  const dayHdr = new BABYLON.CubeTexture("img/day.env", scene);
  const sunsetHDR = new BABYLON.CubeTexture("img/sunset.env", scene);

  overheadLight = new BABYLON.PointLight(
    "overheadLight",
    new BABYLON.Vector3(0, 0.7, 0.5),
    scene
  );

  outsideLight = new BABYLON.PointLight(
    "outsideLight",
    new BABYLON.Vector3(0, 0, -0.2),
    scene
  );

  dirLight = new BABYLON.DirectionalLight(
    "dir01",
    new BABYLON.Vector3(-1, -2, -1),
    scene
  );
  dirLight.position = new BABYLON.Vector3(20, 40, 4);

  const nightLighting = () => {
    overheadLight.diffuse = new BABYLON.Color3.FromHexString("#ad9f72");
    overheadLight.intensity = 6;
    dirLight.intensity = 2;
    dirLight.diffuse = new BABYLON.Color3.FromHexString("#478fed");
    outsideLight.intensity = 0.5;
    outsideLight.diffuse = new BABYLON.Color3.FromHexString("#478fed");
    scene.environmentTexture = nightHdr;
    scene.imageProcessingConfiguration.exposure = 0.1;
    scene.imageProcessingConfiguration.contrast = 1.0;
  };

  const dayLighting = () => {
    overheadLight.diffuse = new BABYLON.Color3.FromHexString("#c2b372");
    overheadLight.intensity = 1;
    dirLight.intensity = 4;
    dirLight.diffuse = new BABYLON.Color3.FromHexString("#85f2e7");
    outsideLight.diffuse = new BABYLON.Color3.FromHexString("#85f2e7");
    outsideLight.intensity = 10;
    scene.environmentTexture = dayHdr;
    scene.imageProcessingConfiguration.exposure = 0.5;
    scene.imageProcessingConfiguration.contrast = 1.0;
  };

  const sunsetLighting = () => {
    overheadLight.diffuse = new BABYLON.Color3.FromHexString("#c4bdff");
    overheadLight.intensity = 6;
    dirLight.intensity = 6;
    dirLight.diffuse = new BABYLON.Color3.FromHexString("#c97424");
    outsideLight.diffuse = new BABYLON.Color3.FromHexString("#e06234");
    outsideLight.intensity = 10;
    scene.environmentTexture = sunsetHDR;
    scene.imageProcessingConfiguration.exposure = 0.1;
    scene.imageProcessingConfiguration.contrast = 1.0;
  };

  sunsetLighting();

  lightingSettings.setDay = dayLighting;
  lightingSettings.setNight = nightLighting;
  lightingSettings.setSunset = sunsetLighting;

  shadowGenerator = new BABYLON.ShadowGenerator(1024, dirLight, true);
  shadowGenerator.usePoissonSampling = true;
};

export const turnOverHeadLightOff = () => {
  overheadLight.setEnabled(false);
};

export const turnOverHeadLightOn = () => {
  overheadLight.setEnabled(true);
};
