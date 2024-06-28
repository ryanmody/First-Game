let health = 200;
let currentWeaponIndex = 0;
let monsterHealth = 250;
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
button4.onclick = violentReprisal;

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
        text.innerText += "\n\nThe creature shrieks! Your vision blurs and you feel your head splitting.";
        break;
        case "throws glass":
        health -= monsters[currentMonsterIndex].level * 0.8;
        text.innerText += "\n\nThe creature hurls glass at you! You feel the sharp pain as the broken glass cuts into your skin.";
        break;
    }
healthText.innerText = health;
}

function buildDread() {
    text.innerText = "You stand still amidst the chaos of the kitchen, letting the foul odors and disarray wash over you. You steady your breath, as you've grown accustomed to doing during those sleepless nights overseas.  Your attacks have become more reckless and dangerous as your DREAD has increased";

    // Code for monster attacking
    monsterAttacks();

    // Code for how much dread is built up
    dread += Math.floor(Math.random() * (10 - 1)) + 1;
    dreadText.innerText = dread;

    // Code for if the 4th button will appear
    if(dread >= 20) {
        button4.style.display = "flex";
    }

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
    text.innerText = "You slash desperately with your knife."

    // Code for changing player health values
    monsterAttacks();

    // Code for changing monster's health values
    monsterHealth -= inventory[currentWeaponIndex].power + dread * 0.5;
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
  text.innerText = "The creature slinks away back into the darkness, and you're alone once again with only the rotting smell of the kitchen.";
  button1.onclick = function () {
    location.href = "living-room-2.html";
    }

    button1.onclick = function () {
        location.href = "living-room-2.html";
      }
      button1.innerText = "Leave Kitchen"
    
      // Get rid of other buttons appearing
      button4.style.display = "none";
      button3.style.display = "none";
      button2.style.display = "none";
}

function violentReprisal() {
    text.innerText = "You unleash a surge of pent-up fury from deep within your being."
    // document.querySelector(".image").src = "images/bathroom-horror-mess.jpeg";

    // Code for changing player health values
    monsterAttacks();

    // Code for changing monster's health values
    monsterHealth -= dread * inventory[currentWeaponIndex].power * 0.2;
    monsterHealthText.innerText = monsterHealth;

    //Code for reducing dread
    dread -= Math.floor(Math.random() * (dread - 5)) + 5;
    dreadText.innerText = dread;
    if(dread < 20) {
        button4.style.display = "none";
    }

    // Code for if health drops to 0
    if (health <= 0) {
    lose();
    } else if (monsterHealth <= 0) {
    winGame();
    }
}