import * as BABYLON from "babylonjs";
import { shadowGenerator } from "./lights";

export let sceneContainers = {};
let sceneRef;

export const initScenes = async (scene) => {
  sceneRef = scene;

  const baseContainer = await BABYLON.SceneLoader.LoadAssetContainerAsync(
    "./resources/",
    "base.glb",
    scene
  );
  const dayContainer = await BABYLON.SceneLoader.LoadAssetContainerAsync(
    "./resources/",
    "day.glb",
    scene
  );
  const nightContainer = await BABYLON.SceneLoader.LoadAssetContainerAsync(
    "./resources/",
    "night.glb",
    scene
  );
  const sunsetContainer = await BABYLON.SceneLoader.LoadAssetContainerAsync(
    "./resources/",
    "sunset.glb",
    scene
  );
  const sunsetSkyContainer = await BABYLON.SceneLoader.LoadAssetContainerAsync(
    "./resources/",
    "skySunset.glb",
    scene
  );
  const daySkyContainer = await BABYLON.SceneLoader.LoadAssetContainerAsync(
    "./resources/",
    "skyDay.glb",
    scene
  );
  const nightSkyContainer = await BABYLON.SceneLoader.LoadAssetContainerAsync(
    "./resources/",
    "skyNight.glb",
    scene
  );
  const bottomLightContainer = await BABYLON.SceneLoader.LoadAssetContainerAsync(
    "./resources/",
    "planeLight.glb",
    scene
  );
  sceneContainers.base = baseContainer;
  sceneContainers.day = dayContainer;
  sceneContainers.night = nightContainer;
  sceneContainers.sunset = sunsetContainer;
  sceneContainers.bottomLight = bottomLightContainer;

  Object.values(sceneContainers).forEach((container) => {
    const meshes = container.meshes;
    meshes.forEach((mesh) => {
      shadowGenerator.getShadowMap().renderList.push(mesh);
      mesh.receiveShadows = true;
    });
    container.addAllToScene();
    hideSceneContainer(container);
  });

  sceneContainers.sunsetSky = sunsetSkyContainer;
  sceneContainers.sunsetSky.addAllToScene();
  sunsetSkyContainer.meshes[1].visibility = 1;
  addSkyTextureFadeAnim(sunsetSkyContainer.meshes[1]);

  sceneContainers.daySky = daySkyContainer;
  sceneContainers.daySky.addAllToScene();
  daySkyContainer.meshes[1].visibility = 0;
  addSkyTextureFadeAnim(daySkyContainer.meshes[1]);

  sceneContainers.nightSky = nightSkyContainer;
  sceneContainers.nightSky.addAllToScene();
  nightSkyContainer.meshes[1].visibility = 0;
  addSkyTextureFadeAnim(nightSkyContainer.meshes[1]);

  showSceneContainer(baseContainer);
  showSceneContainer(bottomLightContainer);
  showSceneContainer(sunsetContainer);
};

export const showSceneContainer = (container) => {
  const meshes = container.meshes;
  meshes.forEach((mesh) => {
    mesh.position = new BABYLON.Vector3(0, 0, 0);
  });
};

export const hideSceneContainer = (container) => {
  const meshes = container.meshes;
  meshes.forEach((mesh) => {
    mesh.position = new BABYLON.Vector3(10, 10, 10);
  });
};

const addSkyTextureFadeAnim = (skyMesh) => {
  const fadeAnim = new BABYLON.Animation(
    `fadeAnim${skyMesh.id}`,
    "visibility",
    30,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  let keys = [];
  keys.push({
    frame: 0,
    value: 0,
  });
  keys.push({
    frame: 30,
    value: 1,
  });

  fadeAnim.setKeys(keys);
  skyMesh.animations.push(fadeAnim);
};

export const fadeInSky = (timeOfDay) => {
  let mesh;
  if (timeOfDay === "day") {
    mesh = sceneContainers.daySky.meshes[1];
  } else if (timeOfDay === "sunset") {
    mesh = sceneContainers.sunsetSky.meshes[1];
  } else if (timeOfDay === "night") {
    mesh = sceneContainers.nightSky.meshes[1];
  } else {
    return;
  }
  sceneRef.beginAnimation(mesh, 0, 30, true);
};
export const fadeOutSky = (timeOfDay) => {
  let mesh;
  if (timeOfDay === "day") {
    mesh = sceneContainers.daySky.meshes[1];
  } else if (timeOfDay === "sunset") {
    mesh = sceneContainers.sunsetSky.meshes[1];
  } else if (timeOfDay === "night") {
    mesh = sceneContainers.nightSky.meshes[1];
  } else {
    return;
  }
  sceneRef.beginAnimation(mesh, 30, 0, true);
};
