import {
  hideSceneContainer,
  sceneContainers,
  showSceneContainer,
  fadeInSky,
  fadeOutSky,
} from "./sceneContainers";
import {
  lightingSettings,
  turnOverHeadLightOn,
  turnOverHeadLightOff,
} from "./lights";

export const initSceneSwitchControl = (scenes) => {
  const timesOfDay = ["sunset", "night", "day"];
  let currentTimeIndex = 0;
  const timeButton = document.getElementById("time");
  timeButton.addEventListener("click", () => {
    currentTimeIndex = (currentTimeIndex + 1) % timesOfDay.length;
    const nextTimeOfDay = timesOfDay[currentTimeIndex];
    if (nextTimeOfDay === "day") {
      hideSceneContainer(sceneContainers.night);
      hideSceneContainer(sceneContainers.sunset);
      showSceneContainer(sceneContainers.day);
      fadeInSky("day");
      fadeOutSky("sunset");
      fadeOutSky("night");
      lightingSettings.setDay();
    } else if (nextTimeOfDay == "sunset") {
      hideSceneContainer(sceneContainers.night);
      showSceneContainer(sceneContainers.sunset);
      hideSceneContainer(sceneContainers.day);
      fadeInSky("sunset");
      fadeOutSky("day");
      fadeOutSky("night");
      lightingSettings.setSunset();
    } else {
      showSceneContainer(sceneContainers.night);
      hideSceneContainer(sceneContainers.sunset);
      hideSceneContainer(sceneContainers.day);
      fadeInSky("night");
      fadeOutSky("sunset");
      fadeOutSky("day");
      lightingSettings.setNight();
    }
  });
};

export const initOverheadLightControl = () => {
  let isOverheadLightOn = true;
  const overHeadLightButton = document.getElementById("overheadLight");
  overHeadLightButton.addEventListener("click", () => {
    isOverheadLightOn = !isOverheadLightOn;
    console.log("overhead", isOverheadLightOn);
    if (isOverheadLightOn) {
      turnOverHeadLightOn();
    } else {
      turnOverHeadLightOff();
    }
  });
};
