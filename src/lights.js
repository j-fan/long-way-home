import * as BABYLON from "babylonjs";

let sceneLights = {};
export let shadowGenerator;
export let lightingSettings = {};
let overheadLight, outsideLight, dirLight;
let sceneRef;

export const initLights = (scene) => {
  sceneRef = scene;
  // Environment Texture
  const nightHdr = new BABYLON.CubeTexture("img/night.env", scene);
  const dayHdr = new BABYLON.CubeTexture("img/day.env", scene);
  const sunsetHDR = new BABYLON.CubeTexture("img/sunset.env", scene);

  overheadLight = new BABYLON.PointLight(
    "overheadLight",
    new BABYLON.Vector3(0, 0.7, 0.5),
    scene
  );
  overheadLight.intensity = 8;

  outsideLight = new BABYLON.PointLight(
    "outsideLight",
    new BABYLON.Vector3(0, 0, -3),
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
    outsideLight.intensity = 30;
    outsideLight.diffuse = new BABYLON.Color3.FromHexString("#478fed");
    scene.environmentTexture = nightHdr;
    scene.imageProcessingConfiguration.exposure = 0.1;
    scene.imageProcessingConfiguration.contrast = 1.0;

    doLightColorAnim();
  };

  const dayLighting = () => {
    overheadLight.diffuse = new BABYLON.Color3.FromHexString("#8c8151");
    outsideLight.diffuse = new BABYLON.Color3.FromHexString("#85f2e7");
    outsideLight.intensity = 40;
    scene.environmentTexture = dayHdr;
    scene.imageProcessingConfiguration.exposure = 0.2;
    scene.imageProcessingConfiguration.contrast = 1.0;

    doLightColorAnim();
  };

  const sunsetLighting = () => {
    overheadLight.diffuse = new BABYLON.Color3.FromHexString("#c4bdff");
    outsideLight.diffuse = new BABYLON.Color3.FromHexString("#e06234");
    outsideLight.intensity = 60;
    scene.environmentTexture = sunsetHDR;
    scene.imageProcessingConfiguration.exposure = 0.05;
    scene.imageProcessingConfiguration.contrast = 1.0;

    doLightColorAnim();
  };

  createLightIntensityAnim(overheadLight);
  createDirLightColorAnim();
  createDirLightIntensityAnim();
  sunsetLighting();

  lightingSettings.setDay = dayLighting;
  lightingSettings.setNight = nightLighting;
  lightingSettings.setSunset = sunsetLighting;

  shadowGenerator = new BABYLON.ShadowGenerator(1024, dirLight, true);
  shadowGenerator.usePoissonSampling = true;
};

export const turnOverHeadLightOff = () => {
  sceneRef.beginAnimation(overheadLight, 20, 0, false);
};

export const turnOverHeadLightOn = () => {
  sceneRef.beginAnimation(overheadLight, 0, 20, false);
};

const createLightIntensityAnim = (light) => {
  const fullIntensity = light.intensity;
  const lightAnim = new BABYLON.Animation(
    "lightAnimIntensity",
    "intensity",
    30,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  );
  let keys = [];
  keys.push({
    frame: 0,
    value: 0,
  });
  keys.push({
    frame: 20,
    value: fullIntensity,
  });
  lightAnim.setKeys(keys);
  light.animations.push(lightAnim);
};

const createDirLightColorAnim = () => {
  const lightAnim = new BABYLON.Animation(
    "anim",
    "diffuse",
    30,
    BABYLON.Animation.ANIMATIONTYPE_COLOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  );

  let keys = [];
  keys.push({
    frame: 0,
    value: new BABYLON.Color3.FromHexString("#85f2e7"),
  });
  keys.push({
    frame: 30,
    value: new BABYLON.Color3.FromHexString("#c97424"),
  });
  keys.push({
    frame: 60,
    value: new BABYLON.Color3.FromHexString("#478fed"),
  });
  keys.push({
    frame: 90,
    value: new BABYLON.Color3.FromHexString("#85f2e7"),
  });
  lightAnim.setKeys(keys);
  dirLight.animations.push(lightAnim);
};

const createDirLightIntensityAnim = () => {
  const lightAnim = new BABYLON.Animation(
    "anim",
    "intensity",
    30,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  );

  let keys = [];
  keys.push({
    frame: 0,
    value: 10,
  });
  keys.push({
    frame: 30,
    value: 50,
  });
  keys.push({
    frame: 60,
    value: 1,
  });
  keys.push({
    frame: 90,
    value: 10,
  });
  lightAnim.setKeys(keys);
  dirLight.animations.push(lightAnim);
};

let timeOfDayIndex = 0;
const doLightColorAnim = (light) => {
  sceneRef.beginAnimation(
    dirLight,
    timeOfDayIndex * 30,
    (timeOfDayIndex + 1) * 30,
    false
  );
  timeOfDayIndex = (timeOfDayIndex + 1) % 3;
};
