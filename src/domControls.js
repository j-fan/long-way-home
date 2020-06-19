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

const seatBeltSound = new Audio("./sound/seatBelt.mp3");
const rumble = new Audio("./sound/rumble.mp3");

const initSceneSwitchControl = () => {
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
      timeButton.classList.remove("night");
      timeButton.classList.add("day");
    } else if (nextTimeOfDay == "sunset") {
      hideSceneContainer(sceneContainers.night);
      showSceneContainer(sceneContainers.sunset);
      hideSceneContainer(sceneContainers.day);
      fadeInSky("sunset");
      fadeOutSky("day");
      fadeOutSky("night");
      lightingSettings.setSunset();
      timeButton.classList.remove("day");
      timeButton.classList.add("sunset");
    } else {
      showSceneContainer(sceneContainers.night);
      hideSceneContainer(sceneContainers.sunset);
      hideSceneContainer(sceneContainers.day);
      fadeInSky("night");
      fadeOutSky("sunset");
      fadeOutSky("day");
      lightingSettings.setNight();
      timeButton.classList.remove("sunset");
      timeButton.classList.add("night");
    }
  });
};

const initOverheadLightControl = () => {
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
    overHeadLightButton.classList.toggle("off");
  });
};

const initAttendentControl = () => {
  const attendentButton = document.getElementById("attendent");
  attendentButton.addEventListener("click", () => {
    attendentButton.classList.toggle("off");
    if (!attendentButton.classList.contains("off")) {
      seatBeltSound.play();
    }
  });
};

const initSeatBeltControl = () => {
  const seatBeltButton = document.getElementById("seatBelt");
  setInterval(() => {
    seatBeltButton.classList.toggle("off");
    if (!seatBeltButton.classList.contains("off")) {
      seatBeltSound.play();
    }
  }, 90000);
};

const initSounds = () => {
  rumble.loop = true;
  rumble.play();
};

export const initDomControls = () => {
  initSounds();
  initOverheadLightControl();
  initSceneSwitchControl();
  initAttendentControl();
  initSeatBeltControl();
};
