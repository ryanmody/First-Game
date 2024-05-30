namespace Pray_to_Jesus_RPG_by_Benjamin_Khadem
{
    internal class Program
    {
        static string playerName;
        static string rangedWeapon;
        static string meleeWeapon;
        
        static int playerHp = 100;
        static int rangedWeaponDamage;
        static int rangedChanceOfAttack;
        static int meleeWeaponDamage;
        static int meleeWeaponChanceOfAttack;
        static int prayerChanceOfAttack = 1;
        static bool attackHits;
        
        static int goblinHp = 250;
        static int goblinDamage = 15;
        static void Main(string[] args)
        {

            Console.WriteLine("Welcome to Pray to Jesus RPG. State your name adventurer.");
            playerName = Console.ReadLine();
            NoInputCatcher(ref playerName);
            Console.WriteLine("Your name is " + playerName);

            //Choosing your Ranged Weapon -----------------------------------------------------------------------
            ChoosingRangedWeapon(ref rangedWeapon, ref rangedWeaponDamage, ref rangedChanceOfAttack);
            Console.WriteLine("You chose a " + rangedWeapon + " for your ranged weapon.");
            Console.ReadLine();

            //Chossing your Melee Weapon ------------------------------------------------------------------------
            ChoosingMeleeWeapon(ref meleeWeapon, ref meleeWeaponDamage, ref meleeWeaponChanceOfAttack);
            Console.WriteLine("You chose " + meleeWeapon + " for your melee weapon.");


            //Goblin Fight -------------------------------------------------------------------------------------
            Console.ReadLine();
            WriteColoredText("A satanic goblin wants to beat you up so, you get into a fight with it.",ConsoleColor.Red);
            Console.WriteLine();
            Console.ReadLine();
            GoblinBattle();

        }
         
        
        static void GoblinBattle()
        {

            while (goblinHp > 0 && playerHp > 0)
                {
                    Console.WriteLine("How do you want to attack?");
                    WriteColoredText("Type 'A' for) "+rangedWeapon +": "+ rangedWeaponDamage+ " damage with a " + rangedChanceOfAttack +"% chance to hit.", ConsoleColor.Blue);
                    WriteColoredText("Type 'B' for) "+meleeWeapon +": "+ meleeWeaponDamage+ " damage with a " + meleeWeaponChanceOfAttack +"% chance to hit.", ConsoleColor.Blue);
                    WriteColoredText("Type 'Jesus' for) Faith: 9999 damage with a 1% chance to hit.", ConsoleColor.Blue);
                    string chosenAttack = Console.ReadLine() ;
                    while (chosenAttack != "A" && chosenAttack != "B" && chosenAttack != "Jesus") 
                        {
                            Console.WriteLine("Please choose your attack by writing 'A' or 'B' or 'Jesus'. ");
                            chosenAttack = Console.ReadLine();
                        }

                if (chosenAttack == "A")
                    {
                        WeaponAttackLanding(rangedChanceOfAttack, ref attackHits);

                    if (attackHits == true)
                        {
                            WriteColoredText("Your attack was a SUCCESS!", ConsoleColor.Green);
                            goblinHp = goblinHp - rangedWeaponDamage;
                            Console.WriteLine("The Goblin took " + rangedWeaponDamage + " damage. It's total hp is: " + goblinHp + "/250");
                            Console.ReadLine();

                        }
                    else
                        {
                            WriteColoredText("Your attack MISSED!", ConsoleColor.Red);
                            Console.WriteLine("The Goblin took no damage. It's total hp is: " + goblinHp + "/250");
                            Console.ReadLine();


                        }
                    }
                else if (chosenAttack == "B")
                    {
                        WeaponAttackLanding(meleeWeaponChanceOfAttack, ref attackHits);

                    if (attackHits == true)
                        {
                            WriteColoredText("Your attack was a SUCCESS!", ConsoleColor.Green);
                            goblinHp = goblinHp - meleeWeaponDamage;
                            Console.WriteLine("The Goblin took " + meleeWeaponDamage + " damage. It's total hp is: " + goblinHp + "/250");
                            Console.ReadLine();

                        }
                    else
                        {
                            WriteColoredText("Your attack MISSED!", ConsoleColor.Red);
                            Console.WriteLine("The Goblin took no damage. It's total hp is: " + goblinHp + "/250");
                            Console.ReadLine();


                        }
                }
                else if (chosenAttack == "Jesus")
                {
                    WeaponAttackLanding(prayerChanceOfAttack, ref attackHits);

                    if (attackHits == true)
                        {
                            WriteColoredText("JESUS SMITES THE GOBLIN FROM THE CLOUDS! HOLY SH!T IT LANDED!", ConsoleColor.Magenta);
                            goblinHp = goblinHp - 9999;
                            Console.WriteLine("The Goblin took " + 9999 + " damage. It's total hp is: " + goblinHp + "/250");
                            Console.ReadLine();

                        }
                    else
                        {
                            WriteColoredText("Jesus didn't hear your prayer. MISS!", ConsoleColor.Red);
                            prayerChanceOfAttack = prayerChanceOfAttack + 10;
                            WriteColoredText("Your faith went up, your chance of prayer being answered is now " + prayerChanceOfAttack+"%", ConsoleColor.Yellow);
                            Console.WriteLine("The Goblin took no damage. It's total hp is: " + goblinHp + "/250");
                            Console.ReadLine();


                        }
                }

                if (goblinHp > 0)
                    {
                        playerHp = playerHp - goblinDamage;
                        Console.WriteLine("The Goblin hit you and did " + goblinDamage + " damage. Your total hp is: " + playerHp + "/100");
                        Console.ReadLine();
                        PlayerDeath();
                }
                else
                    {
                        WriteColoredText("The goblin has been deafeated!", ConsoleColor.Yellow);
                        WriteColoredText("Good job, YOU WON!", ConsoleColor.Yellow);
                    }

                

            }

        }
       
        static void WeaponAttackLanding(int chanceOfAttackSuccess, ref bool attackHits)
        {
            Random randomNumberMachine = new Random();

            int rolledNumber = randomNumberMachine.Next(0, 101);
            Console.WriteLine("Press enter to attack.");
            Console.ReadLine();

           if (chanceOfAttackSuccess >= rolledNumber)
            {

                //Console.WriteLine("generated number = " + rolledNumber);
                //Console.WriteLine("You attacked your opponent");
                attackHits = true;
            }
           else
            {
                //Console.WriteLine("generated number = " + rolledNumber);
                //Console.WriteLine("You did NOT attacked your opponent");
                attackHits = false;
            }
        }

        static void ChoosingRangedWeapon (ref string declareRangedWeaponName, ref int declareRangedWeaponDamage,ref int declareRangedAttackChance)
        {
            Console.WriteLine("Please choose the following ranged weapons by typing their respective option, choose only one.");

            WriteColoredText("Type ' A ' for - Pistol: 45 damage per hit, Attack Success Chance: 65%", ConsoleColor.Blue);
            WriteColoredText("Type ' B ' for - Bazooka: 150 damage per hit, Attack Success Chance: 25%", ConsoleColor.Blue);
            rangedWeapon = Console.ReadLine();
            
            if (rangedWeapon == "A")
            {
                rangedWeapon = "Pistol";
                declareRangedWeaponDamage = 45;
                declareRangedAttackChance = 65;
            }
            
            else if (rangedWeapon == "B")
            {
                rangedWeapon = "Bazooka";
                declareRangedWeaponDamage = 150;
                declareRangedAttackChance = 25;
            }
            
            else
            {
                while (declareRangedWeaponName != "A" && declareRangedWeaponName != "B")
                {
                    WriteColoredText("Type in 'A' or 'B', to select a ranged weapon", ConsoleColor.DarkRed);
                    declareRangedWeaponName = Console.ReadLine();
                }

                if (declareRangedWeaponName == "A")
                {
                //Console.WriteLine("Your ranged weapon is the Pistol.");
                declareRangedWeaponName = "Pistol";
                declareRangedWeaponDamage = 45;
                declareRangedAttackChance = 65;
                }
            
                if (declareRangedWeaponName == "B")
                {
                //Console.WriteLine("Your ranged weapon is the Bazooka.");
                declareRangedWeaponName = "Bazooka";
                declareRangedWeaponDamage = 150;
                declareRangedAttackChance = 25;
                }
            }
        }
        static void ChoosingMeleeWeapon(ref string declareMeleeWeaponName, ref int declareMeleeWeaponDamage, ref int declareMeleeAttackChance)
        {
            Console.WriteLine("Please choose one of the following melee weapons by typing their respective options.");
            WriteColoredText("Type ' A ' for - Nunchucks: 20 damage per hit, Attack Success Chance: 90%", ConsoleColor.Blue);
            WriteColoredText("Type ' B ' for - Bare Fists: 15 damage per hit, Attack Success Chance: 100%", ConsoleColor.Blue);
            meleeWeapon = Console.ReadLine();

            if (meleeWeapon == "A")
            {
                meleeWeapon = "Nunchucks";
                declareMeleeWeaponDamage = 20;
                declareMeleeAttackChance = 90;
            }

            else if (meleeWeapon == "B")
            {
                meleeWeapon = "Bare Fists";
                declareMeleeWeaponDamage = 15;
                declareMeleeAttackChance = 100;
            }

            else
            {
                while (declareMeleeWeaponName != "A" && declareMeleeWeaponName != "B")
                {
                    WriteColoredText("Type in 'A' or 'B', to select a ranged weapon", ConsoleColor.DarkRed);
                    declareMeleeWeaponName = Console.ReadLine();
                }

                if (declareMeleeWeaponName == "A")
                {
                    
                    declareMeleeWeaponName = "Pistol";
                    declareMeleeWeaponDamage = 45;
                    declareMeleeAttackChance = 65;
                }

                if (declareMeleeWeaponName == "B")
                {
                    
                    declareMeleeWeaponName = "Bazooka";
                    declareMeleeWeaponDamage = 150;
                    declareMeleeAttackChance = 25;
                }
            }
        }

        static void NoInputCatcher(ref string inputWord)
        {
            while (inputWord == "")
            {
                WriteColoredText("Please input something that makes sense before pressing enter", ConsoleColor.Red);
                inputWord = Console.ReadLine();            
            }
        }

        static void WriteColoredText(string text,ConsoleColor color)
        {
            Console.ForegroundColor = color;
            Console.WriteLine(text);
            Console.ForegroundColor = ConsoleColor.White;
        }

        static void PlayerDeath()
        {
            if (playerHp <= 0)
            {
                WriteColoredText("The goblin beat you up and now you're DEAD!", ConsoleColor.Red);
                WriteColoredText("Nice try, YOU LOST", ConsoleColor.Red);
            }
            
        }

        

    }
}
