const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("im about to oof up this city");
  client.user.setGame("!help for a list of commands.")

client.on("message", (message) => {

  let prefix = "!"


  ///COMMANDS LIST\\\
  if(message.content.startsWith(prefix+"help")){
    message.channel.send("I have sent you a Direct Message with a list of commands.")
    message.author.send({
      "embed":{
        "title": "Command List",
        "color": 0xffffff,
        "author":{
          "icon_url": client.user.avatarURL,
          "name": "PoroNet's Command List",
        },
        "thumbnail":{
          "url": client.user.avatarURL
        },
        "fields":[{
          "name": "Urban Dictionary (!urban)",
          "value": "Searches Urban Dictionary for any given term. If no response is sent, the message is too long."
        },
        {
          "name": "Pokedex Search (!pokedex)",
          "value": "Searches the Pokedex for a given Pokemon. Will error if the Pokemon does not exist."
        },
        {
          "name": "Pokemon Gif Search (!pokegif)",
          "value": "Returns a gif of the Pokemon specified, if it has a valid entry in the Pokedex."
        },
        {
          "name": "User Information Gatherer (!info (usermention))",
          "value": "Shows the information of a user given (ADDING MORE INFO SOON)."
        },
        {
          "name": "Ask the 8ball a question (!8ball)",
          "value": "Asks the 8ball for a given question."
        }]
      }
    })
  }
  else
  if(message.content.startsWith(prefix+"urban ")) {
  let MessageSubstr = message.content.substr(7);
  let DefinitionToCheck = MessageSubstr
  UrbanDictionary.term(DefinitionToCheck,function(error,entries,tags,sounds) {
    if(error) {
      message.channel.send({
        "embed":{
          "title": "An error has occured in the following command: Urban",
          "color": 0xff0000,
          "description": error.message
        }
      })
    } else {
    message.channel.send({
      "embed":{
        "title": "Urban Dictionary Word Check: "+DefinitionToCheck,
        "color": 0xff0000,
        "author":{
          "name": entries[0].author,
          "icon_url": "http://marcmarut.com/wp-content/uploads/2013/12/Urban-Dictionary-Icon3.png"
        },
        "thumbnail":{
          "url": "http://marcmarut.com/wp-content/uploads/2013/12/Urban-Dictionary-Icon3.png"
        },
        "fields":[{
          "name": "Definition:",
          "value": entries[0].definition
        },
        {
          "name": "Thumbs Up Value:",
          "value": entries[0].thumbs_up
        },
        {
          "name": "Thumbs Down Value:",
          "value": entries[0].thumbs_down
        },
        {
          "name": "Example:",
          "value": entries[0].example
        },
        {
          "name": "Link:",
          "value": entries[0].permalink
        }]
      }
    })
    }
  })
  }
  else
    if(message.content.startsWith(prefix+"pokedex ")){
      pokedex = new Pokedex();
      let MessageSubstr = message.content.substr(9);
      console.log(pokedex.pokemon(MessageSubstr).id)
      try{
        message.channel.send({
          "embed":{
            "title": "Pokedex Search",
            "author":{
              "name":MessageSubstr,
              "icon_url":pokedex.pokemon(MessageSubstr).sprites.normal
            },
            "color": 0xffffff,
            "thumbnail":{
              "url": pokegif(MessageSubstr)
            },
            "fields":[{
              "name": "ID:",
              "value": pokedex.pokemon(MessageSubstr).id
            },
            {
              "name": "Species ID:",
              "value": pokedex.pokemon(MessageSubstr).species_id
            },
            {
              "name": "Height:",
              "value": pokedex.pokemon(MessageSubstr).height
            },
            {
              "name": "Weight:",
              "value": pokedex.pokemon(MessageSubstr).weight
            },
            {
              "name": "Base Experience:",
              "value": pokedex.pokemon(MessageSubstr).base_experience
            },
            {
              "name": "Order:",
              "value": pokedex.pokemon(MessageSubstr).order
            },
            {
              "name": "Pokemon Name:",
              "value": pokedex.pokemon(MessageSubstr).name
            }]
        }
      });
      }
      catch(error){
        message.channel.send({
          "embed":{
            "color": 0xff0000,
            "title": "Error in command: Pokedex",
            "description": error.message
          }
        })
      }
    }
    else
    if(message.content.startsWith(prefix+"pokegif ")){
      let MessageSubstr = message.content.substr(9);
      try {
      let thegif = pokegif(MessageSubstr)
      message.channel.send({
        "embed":{
          "color":008000,
          "thumbnail":{
            "url": thegif
          } 
        }
      })
    }
    catch(err) {
      message.channel.send({
        "embed":{
          "color":0xff0000,
          "description": err.message,
          "thumbnail":{
            "url": "https://vignette.wikia.nocookie.net/leagueoflegends/images/1/1b/Does_Not_Compute_Emote.png/revision/latest?cb=20171120235504"
          }
        }
      })
    }}
    else
  if(message.content.startsWith(prefix+"8ball ")){
        let a = message.content.substr(7)
        messages = ["It is certain.","It is decidedly so.","Without a doubt.","Yes, definetely.","You may rely on it.","As I see it, yes.","Most likely.","Outlook good.","Yes","Signs point to yes.","Reply hazy, try again.","Ask again later.","Better not tell you now.","Cannot predict now.","Concentrate, and ask again.","Don't count on it.","My reply is no.","My sources say no.","Outlook not so good.","Very doubtful."];
          message.channel.send({
            "embed":{
              "title": "8ball",
              "color":0xFFFFFF,
              "fields":[{
                "name": "Question: ```"+a+"```",
                "value": "**Answer:** ```"+messages[Math.floor(Math.random()*messages.length)]+"```"
                }]
            }
          })
      }
  else
    if(message.content.startsWith(prefix+"info ")){
      let userlist = message.mentions.users
      userlist.forEach(function(user){
      message.channel.send({
        "embed":{
          "title": "User info command",
          "description": "The user info of "+user.username,
          "color":0xff0000,
          "footer":{
            "icon_url": user.avatarURL,
            "text": "User Info of "+user.username
          },
          "thumbnail":{
            "url": user.avatarURL
          },
          "author":{
            "name": user.username,
            "icon_url": user.avatarURL
          },
          "fields":[{
            "name": "User is a bot:",
            "value": user.bot
          },
          {
            "name": "Discriminator:",
            "value": user.discriminator
          },
          {
            "name": "User's ID:",
            "value": user.id
          }]
        }
      })
    });
  }
  });
});
client.login(process.env.BOT_TOKEN);
