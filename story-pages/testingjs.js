let playerName;
let rangedWeapon;
let meleeWeapon;

let playerHp = 100;
let rangedWeaponDamage;
let rangedChanceOfAttack;
let meleeWeaponDamage;
let meleeWeaponChanceOfAttack;
let prayerChanceOfAttack = 1;
let attackHits;

let goblinHp = 250;
let goblinDamage = 15;

const outputElement = document.getElementById('output');
const inputElement = document.getElementById('input');
const submitButton = document.getElementById('submit');

function handleInput() {
    const input = inputElement.value.trim();
    inputElement.value = '';
    if (currentCallback) {
        currentCallback(input);
    }
}

function appendOutput(text, color = 'white') {
    const paragraph = document.createElement('p');
    paragraph.style.color = color;
    paragraph.textContent = text;
    outputElement.appendChild(paragraph);
    outputElement.scrollTop = outputElement.scrollHeight;
}

let currentCallback;

function ask(question, callback) {
    appendOutput(question);
    currentCallback = callback;
}

function main() {
    ask("Welcome to Pray to Jesus RPG. State your name adventurer.", name => {
        playerName = name;
        noInputCatcher(name, input => {
            playerName = input;
            appendOutput("Your name is " + playerName);
            choosingRangedWeapon((weapon, damage, chance) => {
                rangedWeapon = weapon;
                rangedWeaponDamage = damage;
                rangedChanceOfAttack = chance;
                appendOutput("You chose a " + rangedWeapon + " for your ranged weapon.");
                appendOutput("");

                choosingMeleeWeapon((weapon, damage, chance) => {
                    meleeWeapon = weapon;
                    meleeWeaponDamage = damage;
                    meleeWeaponChanceOfAttack = chance;
                    appendOutput("You chose " + meleeWeapon + " for your melee weapon.");

                    appendOutput("");
                    writeColoredText("A satanic goblin wants to beat you up so, you get into a fight with it.", "red");
                    appendOutput("");
                    goblinBattle();
                });
            });
        });
    });
}

function goblinBattle() {
    if (goblinHp > 0 && playerHp > 0) {
        ask("How do you want to attack?\nType 'A' for) " + rangedWeapon + ": " + rangedWeaponDamage + " damage with a " + rangedChanceOfAttack + "% chance to hit.\nType 'B' for) " + meleeWeapon + ": " + meleeWeaponDamage + " damage with a " + meleeWeaponChanceOfAttack + "% chance to hit.\nType 'Jesus' for) Faith: 9999 damage with a 1% chance to hit.", chosenAttack => {
            while (chosenAttack !== "A" && chosenAttack !== "B" && chosenAttack !== "Jesus") {
                ask("Please choose your attack by writing 'A' or 'B' or 'Jesus'.", response => chosenAttack = response);
            }

            if (chosenAttack === "A") {
                weaponAttackLanding(rangedChanceOfAttack, success => {
                    attackHits = success;
                    if (attackHits) {
                        writeColoredText("Your attack was a SUCCESS!", "green");
                        goblinHp -= rangedWeaponDamage;
                        appendOutput("The Goblin took " + rangedWeaponDamage + " damage. Its total hp is: " + goblinHp + "/250");
                    } else {
                        writeColoredText("Your attack MISSED!", "red");
                        appendOutput("The Goblin took no damage. Its total hp is: " + goblinHp + "/250");
                    }
                    goblinAfterAttack();
                });
            } else if (chosenAttack === "B") {
                weaponAttackLanding(meleeWeaponChanceOfAttack, success => {
                    attackHits = success;
                    if (attackHits) {
                        writeColoredText("Your attack was a SUCCESS!", "green");
                        goblinHp -= meleeWeaponDamage;
                        appendOutput("The Goblin took " + meleeWeaponDamage + " damage. Its total hp is: " + goblinHp + "/250");
                    } else {
                        writeColoredText("Your attack MISSED!", "red");
                        appendOutput("The Goblin took no damage. Its total hp is: " + goblinHp + "/250");
                    }
                    goblinAfterAttack();
                });
            } else if (chosenAttack === "Jesus") {
                weaponAttackLanding(prayerChanceOfAttack, success => {
                    attackHits = success;
                    if (attackHits) {
                        writeColoredText("JESUS SMITES THE GOBLIN FROM THE CLOUDS! HOLY SH!T IT LANDED!", "magenta");
                        goblinHp -= 9999;
                        appendOutput("The Goblin took " + 9999 + " damage. Its total hp is: " + goblinHp + "/250");
                    } else {
                        writeColoredText("Jesus didn't hear your prayer. MISS!", "red");
                        prayerChanceOfAttack += 10;
                        writeColoredText("Your faith went up, your chance of prayer being answered is now " + prayerChanceOfAttack + "%", "yellow");
                        appendOutput("The Goblin took no damage. Its total hp is: " + goblinHp + "/250");
                    }
                    goblinAfterAttack();
                });
            }
        });
    }
}

function goblinAfterAttack() {
    if (goblinHp > 0) {
        playerHp -= goblinDamage;
        appendOutput("The Goblin hit you and did " + goblinDamage + " damage. Your total hp is: " + playerHp + "/100");
        playerDeath();
        goblinBattle();
    } else {
        writeColoredText("The goblin has been defeated!", "yellow");
        writeColoredText("Good job, YOU WON!", "yellow");
    }
}

function weaponAttackLanding(chanceOfAttackSuccess, callback) {
    let rolledNumber = Math.floor(Math.random() * 101);
    if (chanceOfAttackSuccess >= rolledNumber) {
        callback(true);
    } else {
        callback(false);
    }
}

function choosingRangedWeapon(callback) {
    ask("Please choose the following ranged weapons by typing their respective option, choose only one.\nType 'A' for - Pistol: 45 damage per hit, Attack Success Chance: 65%\nType 'B' for - Bazooka: 150 damage per hit, Attack Success Chance: 25%", weapon => {
        if (weapon === "A") {
            callback("Pistol", 45, 65);
        } else if (weapon === "B") {
            callback("Bazooka", 150, 25);
        } else {
            choosingRangedWeapon(callback);
        }
    });
}

function choosingMeleeWeapon(callback) {
    ask("Please choose one of the following melee weapons by typing their respective options.\nType 'A' for - Nunchucks: 20 damage per hit, Attack Success Chance: 90%\nType 'B' for - Bare Fists: 15 damage per hit, Attack Success Chance: 100%", weapon => {
        if (weapon === "A") {
            callback("Nunchucks", 20, 90);
        } else if (weapon === "B") {
            callback("Bare Fists", 15, 100);
        } else {
            choosingMeleeWeapon(callback);
        }
    });
}

function noInputCatcher(input, callback) {
    if (input === "") {
        writeColoredText("Please input something that makes sense before pressing enter", "red");
        ask("", newInput => {
            noInputCatcher(newInput, callback);
        });
    } else {
        callback(input);
    }
}

function writeColoredText(text, color) {
    appendOutput(text, color);
}

function playerDeath() {
    if (playerHp <= 0) {
        writeColoredText("The goblin beat you up and now you're DEAD!", "red");
        writeColoredText("Nice try, YOU LOST", "red");
    }
}

main();