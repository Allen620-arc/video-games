const inventory = [];

let scenes = {};

fetch("scenes.json")
  .then((response) => response.json())
  .then((data) => {
    scenes = data;
    showScene("start");
  });

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

function useItem(item) {
  if (item === "Glowing Stone") {
    removeFromInventory(item);
    showScene("endPower");
  } else {
    alert(`Nothing happens when you use the ${item}.`);
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

  updateInventoryUI();
}

showScene("start");
