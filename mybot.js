// Import the discord.js module
const Discord = require("discord.js");

//Import the Mathjs module
const math = require("mathjs");

//Create an instance of a Discord Client
const client = new Discord.Client();

//Probably move this stuff to a settings file sometime
const { prefix, token } = require('./config.json');

//IDs for testing
var blaster = "89130841321504768";
var toki = "83603637393166336";

//Adding Discord ID
var darkferrets = "185562247093813249";



//The 'ready' event is necessary. The bot will only react to information after this event.
client.on("ready", async () => {
  console.log(`I am ready! ${client.user.username}`);
  try {
    let link = await client.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
  } catch (e){
    console.log(e.stack);
  }
});
 
client.on("message", async message => {
  //Validate commands: Starts with prefix, no bots, no dms.
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if(message.content === "?prefix")
  {message.channel.send(prefix);}
  else if (!message.content.startsWith(prefix)) return;

  //Split messages into command and arguments.
  //Remove prefix from the message.
  //Space is the delimiter
  let messageArray = message.content.slice(1).split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  
  switch (command){
    case "userinfo":
      //userinfo command
      console.log(`${message.author.username} used the userinfo command.`);
      //Chaining!
      let userembed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("This is the user's info!")
        .setColor("#9B59B6")
        .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
        .addField("ID", `${message.author.id}`)
        .addField("Created at", `${message.author.createdAt}`);

      message.channel.send(userembed);
    break;
    case "r":
      //We want to roll some dice so get what we are rolling and set some default stuff
      let diceAmount = messageArray[1].split("d");
      let diceSides = diceAmount[1].split(" ");
      let diceMod = 0;
      if(messageArray[2] === '+')
      {
        diceMod = parseInt(messageArray[3]);
      }
      let dieRollTotal = 0;
      //let dieArray = [];
      let dieString = "";
      let dieRoll = 0;

      diceAmount = parseInt(diceAmount[0]);
      diceSides = parseInt(diceSides[0]);

      //Create starting point for String
      dieString = dieString.concat(messageArray[1], " = (")

      //Make the rolls
      for(x=0; x < diceAmount; x++)
      {
          //Number between 1 and Number of Sides on Dice
          dieRoll = Math.floor(Math.random() * (diceSides) + 1);
          //dieArray[x] = dieRoll;
          dieRollTotal += dieRoll;

          //Set up the return string for the user
          if(x+1 === diceAmount){
            dieString = dieString.concat(dieRoll, ")");
          }
          else{
            dieString = dieString.concat(dieRoll, " + ");
          }
      }

      if(!(diceMod === 0))
      {
        dieRollTotal += diceMod;
        dieString = dieString.concat(" + ", diceMod, " = ", dieRollTotal);
      }
      else
      {
        dieString = dieString.concat(" = ", dieRollTotal);
      }

      message.channel.send(dieString);
      //message.channel.send(dieArray);
      //message.channel.send(dieRollTotal);
      //message.channel.send(diceAmount);
      //message.channel.send(diceSides);
    break;
  }

  //debug
  //console.log(command);
  //console.log(args);
  

  
  /* //Examples
  if (message.content.startsWith("ping")) {
    message.channel.send("pong! ");
    return;
  }
  */
  
  /*
  //Special Toki command
  else if (message.author.id == toki){
    //special toki command
    if (message.content.match("Michael")){
      //message.channel.send("testping command"); //debug
      //console.log("Author ID: " + message.author.id); //debug
      //Pings toki in the channel he's in and in 7 other sadbois channels
        message.channel.send(`<@${toki}>`);
        client.channels.get("96356079172067328").send(`<@${toki}>`);
        client.channels.get("193517583754985473").send(`<@${toki}>`);
        client.channels.get("555147574777085973").send(`<@${toki}>`);
        client.channels.get("320325670901252096").send(`<@${toki}>`);
        client.channels.get("476867190088531978").send(`<@${toki}>`);
        client.channels.get("522244510781145098").send(`<@${toki}>`);
        client.channels.get("320692453143478272").send(`<@${toki}>`);

    }
  }
  */
});
 
client.login(token);