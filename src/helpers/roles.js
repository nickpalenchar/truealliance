var Role = function(alliance, character) {
  this.alliance = alliance;
  this.character = character;
};
var Player = function(name){
  this.name = name;
  this.role = null;
  this.myInfo = null;

  this.assignRole = function(alliance, character) {
    this.role = new Role(alliance, character);
  };
  this.getInfo = function(roster){
    this.myInfo = roster.getInfo(this);
  };
};
var Info = function(message, people) {
  this.message = message;
  this.people = people || [];
};
function listWithGrammar(arr){
  if(arr.length === 1) return arr[0];
  return arr.length === 2 ? arr.join(" & ") : arr.slice(0,-1).join(", ") + " & " + arr[arr.length-1];
}
var Roster = function(avalon){
  this.players = [];
  this.avalon = avalon;

  this.addPlayer = function(player){
    this.players.push(player);
    return this.players.length;
  };

  this.getInfo = function(player) {
    var info = [];

    ////// AVALON VARIENT//////
    if(this.avalon) {

      if(player.role.alliance === "GOOD"){
        if(!player.role.character) return new Info(["You are a loyal servant of King Arthur. You are good.", "Discover the evil minions in your group and stop them from sabotauging your quest!"]);

        if(player.role.character === "MERLIN"){
          info = this.players.filter(p => p.role.alliance === "EVIL" && p.role.character !== "MORDRED")
            .map(p => p.name);
          return new Info(["You are Merlin. You are good, but must remain hidden.", "You know evil to be:" ,
            listWithGrammar(info), "prevent these evildoers from going on quests without getting assasinated."
          ],info);
        }
        if(player.role.character === "PERCIVAL"){
          info = this.players.filter(p => p.role.character === "MERLIN" || p.role.character === "MORGANA").map(p => p.name);
          return new Info(["You are Percival. You are good. You see two Merlin's, but only one is good: ",
            listWithGrammar(info), "Learn who the real Merlin is and proctect him from assasination"]);
        }
      }
      if(player.role.alliance === "EVIL") {
        if(!player.role.character) {
          info = this.players.filter(p => p.role.alliance === "EVIL" && p.role.character !== "OBERON" && p.name !== player.name).map(p => p.name);
          return new Info(["You are a minoin of Mordred. You are evil, along with:",
            listWithGrammar(info),
            "Earn the trust of the clan and fail their quests."
          ], info);
        }
        if(player.role.character === "OBERON") {
          return new Info(["You are Oberon. You are evil, but do not know them (nor do they know you).","Earn the trust of the clan and fail their quests."]);
        }
        if(player.role.character === "MORGANA"){
          info = this.players.filter(p => p.role.alliance === "EVIL" && p.role.character !== "OBERON" && p.name !== player.name).map(p => p.name);
          return new Info(["You are Morgana. You are evil, and appear as Merlin. Your fellow evildoers follow: ",
            listWithGrammar(info), "Earn the trust of the clan, and prevent Pervival from finding Merlin."
          ]);
        }
        if(player.role.character === "ASSASIN"){
          info = this.players.filter(p => p.role.alliance === "EVIL" && p.role.character !== "OBERON" && p.name !== player.name).map(p => p.name);
          return new Info(["You are the assasin. You are evil, along with: ", listWithGrammar(info), "Find Merlin for the chance to assasinate him should good rein supreme"])
        }
        if(player.role.character === "MORDRED"){
          info = this.players.filter(p => p.role.alliance === "EVIL" && p.role.character !== "OBERON" && p.name !== player.name).map(p => p.name);
          return new Info(["You are Mordred, leader of evil. You are unknown to Merlin. Your minoins are: ",
            listWithGrammar(info), "Earn the trust of the clan and fail their quests."])
        }
      }
    }

    ////// RESESTANCE ///////
    else {
      if(player.role.alliance === "GOOD"){
        return new Info(["You are the resistance, you are good", "Discover who is undercover as a spy and prevent them from sabotaging your quest"]);
      }
      if(player.role.alliance === "EVIL"){
        info = this.players.filter(p => p.role.alliance === "EVIL" && p.name !== player.name)
          .map(p => p.name);
        return new Info(["You are an Imperial Spy. You are evil. Your fellow " +
        (info.length === 1 ? "spy is:" : "spies are:"),
          listWithGrammar(info),
          "Earn the trust of the resistance and fail their quests."
        ], info)
      }
    }
  };
};
var roster = new Roster(true);

var me = new Player("Nick");
var everett = new Player("Everett");
var jon = new Player("Jon");
var marie = new Player("Marie");
var matt = new Player("Matt");

me.assignRole("EVIL", "MORDRED");
everett.assignRole("EVIL");
jon.assignRole("GOOD", "MERLIN");
matt.assignRole("EVIL");
marie.assignRole("EVIL", "");

roster.addPlayer(me);
roster.addPlayer(everett);
roster.addPlayer(jon);
roster.addPlayer(marie);
roster.addPlayer(matt);

marie.getInfo(roster);
matt.getInfo(roster);
me.getInfo(roster);
everett.getInfo(roster);
jon.getInfo(roster);
console.log("ME: ", me);

/* true, false
 'MERLIN', 'MORGANA', 'ASSASIN', 'PERCIVAL', 'OBERON'
 */