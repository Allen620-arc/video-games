const inventory = [];

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
      { text: "Keep walking", next: "start" },
    ],
    giveItem: "Glowing Stone",
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
const inventoryElement = document.getElementById("inventory-items");
const itemActionsElement = document.getElementById("item-actions");

function addToInventory(item) {
  if (!inventory.includes(item)) {
    inventory.push(item);
    updateInventoryUI();
  }
}

function removeFromInventory(item) {
  const index = inventory.indexOf(item);
  if (index !== -1) {
    inventory.splice(index, 1);
    updateInventoryUI();
  }
}

function updateInventoryUI() {
  inventoryElement.innerHTML = "";
  itemActionsElement.innerHTML = "";
  if (inventory.length === 0) {
    inventoryElement.innerHTML = "<p>(You have nothing yet...)</p>";
  } else {
    inventory.forEach((item) => {
      const div = document.createElement("div");
      div.className = "inventory-item";
      div.textContent = item;
      inventoryElement.appendChild(div);

      // Add a use button for each item
      const useButton = document.createElement("button");
      useButton.textContent = `Use ${item}`;
      useButton.className = "choice-btn";
      useButton.onclick = () => useItem(item);
      itemActionsElement.appendChild(useButton);
    });
  }
}

function showScene(sceneKey) {
  const scene = scenes[sceneKey];
  textElement.textContent = scene.text;
  choicesElement.innerHTML = "";

  if (scene.giveItem) {
    addToInventory(scene.giveItem);
  }

  scene.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice.text;
    button.classList.add("choice-btn");
    button.onclick = () => showScene(choice.next);
    choicesElement.appendChild(button);
  });
}

showScene("start");
