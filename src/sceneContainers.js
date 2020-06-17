import * as BABYLON from "babylonjs";
import { shadowGenerator } from "./lights";

export let sceneContainers = {};

export const initScenes = async (scene) => {
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
  sceneContainers.base = baseContainer;
  sceneContainers.day = dayContainer;
  sceneContainers.night = nightContainer;
  sceneContainers.sunset = sunsetContainer;

  Object.values(sceneContainers).forEach((container) => {
    const meshes = container.meshes;
    meshes.forEach((mesh) => {
      shadowGenerator.getShadowMap().renderList.push(mesh);
      mesh.receiveShadows = true;
    });
    container.addAllToScene();
    hideSceneContainer(container);
  });
  showSceneContainer(baseContainer);
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
