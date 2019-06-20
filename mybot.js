// Import the discord.js module
const Discord = require("discord.js");

//Create an instance of a Discord Client
const client = new Discord.Client();

//Probably move this stuff to a settings file sometime
const { prefix, token } = require('./config.json');

//IDs for testing
var blaster = "89130841321504768"; 
var toki = "83603637393166336";



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

  //Special command 
  if (message.content === "?prefix"){
    message.channel.send(prefix);
  }

  if (!message.content.startsWith(prefix)) return;

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
      let userembed = new Discord.RichEmbed();
      let recipient; 
      //Check if the command mentions anyone
      if (message.mentions.users.size){
        console.log(`Mentions: ${message.mentions.users.size} `);
          recipient = message.mentions.users.first();
          console.log(recipient); 
      }
      else if (args.length != 0){
        console.log(`Mentions: ${message.mentions.users.size} `);
        try {
        recipient = message.guild.members.get(args[0]).user;
        }
        catch (e) {
            message.channel.send("There is no user with this userid.");
            return;
        }
        console.log(recipient); 

      }
      else{
        recipient = message.author;
      }
      userembed
      .setAuthor(recipient.username)
      .setDescription("This is the user's info!")
      .setColor("#9B59B6")
      .addField("Full Username", `${recipient.username}#${recipient.discriminator}`)
      .addField("ID", `${recipient.id}`)
      .addField("Created at", `${recipient.createdAt}`);
      message.channel.send(userembed);
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