const scenes = {
  start: {
    text: "You wake up in a dark forest. The trees whisper. Paths stretch in every direction.",
    choices: [
      { text: "Go north", next: "north" },
      { text: "Head east", next: "east" },
    ],
  },
  north: {
    text: "You find a ruined tower. A hooded figure watches you.",
    choices: [
      { text: "Approach the figure", next: "figure" },
      { text: "Return to the forest", next: "start" },
    ],
  },
  east: {
    text: "A river blocks your path. A boat is moored nearby.",
    choices: [
      { text: "Take the boat", next: "boat" },
      { text: "Go back", next: "start" },
    ],
  },
  figure: {
    text: "The figure gives you a glowing stone and vanishes. You feel a strange power.",
    choices: [
      { text: "Use the stone", next: "endPower" },
      { text: "Keep walking", next: "start" },
    ],
  },
  boat: {
    text: "You cross safely and find a village of friendly folk.",
    choices: [
      { text: "Talk to the villagers", next: "village" },
      { text: "Go back to the forest", next: "start" },
    ],
  },
  village: {
    text: "The villagers welcome you. You decide to stay for a while.",
    choices: [],
  },
  endPower: {
    text: "The stone glows brightly. Time rewinds. You are back at the start... but changed.",
    choices: [{ text: "Begin again", next: "start" }],
  },
};

const textElement = document.getElementById("text");
const choicesElement = document.getElementById("choices");

function showScene(sceneKey) {
  const scene = scenes[sceneKey];
  textElement.textContent = scene.text;
  choicesElement.innerHTML = "";

  scene.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.classList.add("choice-btn");
    button.onclick = () => showScene(choice.next);
    choicesElement.appendChild(button);
  });
}

showScene("start");
