let health = 100;
let currentWeaponIndex = 0;
let monsterHealth = 120;
let currentMonsterIndex = 0;
let dread = 0;

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const healthText = document.querySelector("#healthText");
const dreadText = document.querySelector("#dreadText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const inventory = [
  { name: "fists", 
    power: 10
  }, 
  { 
    name: "kitchen knife",
    power: 20
  }
];
const monsters = [
  {
    name: "ghostly figure 1",
    level: 20,
    health: 100,
    abilities: ["shriek", "throws glass"]
  },
  {
    name: "ghostly figure 2",
    level: 30,
    health: 150
  }
];


// initialize buttons
button1.onclick = attackFists;
button2.onclick = buildDread;
button3.onclick = uniqueAction;

function attackFists() {
  //Code for changing the text
  text.innerText = "You swing at the ghost.";

  // Code for changing player health values
  monsterAttacks();

  // Code for changing monster's health values
  monsterHealth -= inventory[currentWeaponIndex].power + dread;
  monsterHealthText.innerText = monsterHealth;

  // Code for if health drops to 0
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    winGame();
  }
}

function monsterAttacks() {
    const ability = monsters[currentMonsterIndex].abilities[Math.floor(Math.random() * monsters[currentMonsterIndex].abilities.length)];
    switch (ability) {
        case "shriek":
        health -= monsters[currentMonsterIndex].level * 0.5;
        text.innerText += "\n\nThe ghostly-figure shrieks! Your vision blurs and you feel your head splitting.";
        break;
        case "throws glass":
        health -= monsters[currentMonsterIndex].level * 0.8;
        text.innerText += "\n\nThe ghostly-figure launches glassware at you! You feel the sharp pain as the broken glass cuts into your skin.";
        break;
    }
healthText.innerText = health;
}

function buildDread() {
    text.innerText = "You stand still amidst the chaos of the kitchen, letting the foul odors and disarray wash over you. For a moment, you can see the glimpses of your forgotten memories - but they quickly dissapate as you steel yourself against the horror in front of you. Your attacks have become more reckless and dangerous as your DREAD has increased";

    monsterAttacks();
    dread += Math.floor(Math.random() * (10 - 1)) + 1;
    dreadText.innerText = dread;

      // Code for if health drops to 0
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        winGame();
    }
}

function uniqueAction() {
    text.innerText = "You pick up the kitchen knife. It feels familiar in your hands.";
    currentWeaponIndex += 1;

    // Code to change button text and function
    button3.innerText = "Slash with kitchen knife";
    button3.onclick = slashWithKnife;

    //The monster still attacks you
    monsterAttacks();

      // Code for if health drops to 0
    if (health <= 0) {
      lose();
    } else if (monsterHealth <= 0) {
      winGame();
    }
}

function slashWithKnife() {
    //Code to change text
    text.innerText = "You slash at the ghostly-figure with your knife."

    // Code for changing player health values
    monsterAttacks();

    // Code for changing monster's health values
    monsterHealth -= inventory[currentWeaponIndex].power + dread;
    monsterHealthText.innerText = monsterHealth;

    // Code for if health drops to 0
    if (health <= 0) {
    lose();
    } else if (monsterHealth <= 0) {
    winGame();
    }
    
}

function lose() {
  text.innerText = "You lose.";
  button1.onclick = function () {
    location.href = "/index.html";
  }
  button1.innerText = "Start over"

  // Get rid of other buttons appearing
  button3.style.display = "none";
  button2.style.display = "none";
}

function winGame() {
  text.innerText = "The apparition dissolves into a wisp of dark smoke, and the kitchen falls silent except for your own heavy breathing. The air is thick with fear, but you feel a momentary relief. The shattered remnants of the ghostly encounter lie around you, a testament to your survival.";
  button1.onclick = function () {
    location.href = "living-room.html";
    }
}