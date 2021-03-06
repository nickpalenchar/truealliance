
var Info = function(message, people) {
  this.message = message;
  this.people = people || [];
};

function listWithGrammar(arr){
  if(arr.length === 1) return arr[0];
  return arr.length === 2 ? arr.join(" & ") : arr.slice(0,-1).join(", ") + " & " + arr[arr.length-1];
}

export function getInfo(globalInfo, player) {
  var info = [];
  var allChars = globalInfo.characters;

  ////// WITH SPECIAL CHARACTERS//////
  if(globalInfo.specialCharacters) {

    if(player.alliance === "good"){
      if(!player.character) return new Info([["You are a loyal servant of King Arthur. You are good.", "Discover the evil minions in your group and stop them from sabotauging your quest!"], "good"]);

      if(player.character === "merlin"){
        info = allChars.filter(p => p.alliance === "evil" && p.character !== "mordred")
          .map(p => p.name);
        return new Info([["You are Merlin. You are good, but must remain hidden.You know evil to be:" ,
          listWithGrammar(info), "prevent these evildoers from going on quests without getting assassinated."
        ], "good"],info);
      }
      if(player.character === "percival"){
        info = allChars.filter(p => p.character === "merlin" || p.character === "morgana").map(p => p.name);
        return new Info([["You are Percival. You are good. You see two Merlins, but only one is good: ",
          listWithGrammar(info), "Learn who the real Merlin is and proctect him from assassination"],"good"]);
      }
    }
    if(player.alliance === "evil") {
      //WARNING! DO NOT PUT THE TEXT "good" IN THE EVILS INFOS. I use a hack to display alliance by looking for that keyword
      if(!player.character || player.character === "specialCharacters") {
        info = allChars.filter(p => p.alliance === "evil" && p.character !== "oberon" && p.name !== player.name).map(p => p.name);
        return new Info([["You are a minoin of Mordred. You are evil, along with:",
          listWithGrammar(info),
          "Earn the trust of the clan and fail their quests."
        ], "evil"], info);
      }
      if(player.character === "oberon") {
        return new Info([["You are Oberon. You are evil, but do not know them (nor do they know you).","Earn the trust of the clan and fail their quests."],"evil"]);
      }
      if(player.character === "morgana"){
        info = allChars.filter(p => p.alliance === "evil" && p.character !== "oberon" && p.name !== player.name).map(p => p.name);
        return new Info([["You are Morgana. You are evil, and appear as Merlin. Your fellow evildoers follow: ",
          listWithGrammar(info), "Earn the trust of the clan, and prevent Pervival from finding Merlin."
        ],"evil"]);
      }
      if(player.character === "assassin"){
        info = allChars.filter(p => p.alliance === "evil" && p.character !== "oberon" && p.name !== player.name).map(p => p.name);
        return new Info([["You are the assasin. You are evil, along with: ", listWithGrammar(info), "Find Merlin for the chance to assassinate him should good rein supreme."],"evil"])
      }
      if(player.character === "mordred"){
        info = allChars.filter(p => p.alliance === "evil" && p.character !== "oberon" && p.name !== player.name).map(p => p.name);
        return new Info([["You are Mordred, leader of evil. You are unknown to Merlin. Your minoins are: ",
          listWithGrammar(info), "Earn the trust of the clan and fail their quests."],"evil"])
      }
    }
    console.error("[roles.js:getInfo]\n!!!!!!!!!!!!!!\n!!!!!!!!!! WARNING! !!!!!!!!!!!\n!!!!!!!!!!!!!!!!!\n\n " +
      "Get info function did not get a return. Paramaters were not properly handled.\nParams:\n", arguments);
  }

  ////// WITHOUT SPECIAL CHARACTERS ///////
  else {
    if(player.alliance === "good"){
      return new Info([["You are the resistance, you are good", "Discover who is undercover as a spy and prevent them from sabotaging your quest"],"good"]);
    }
    if(player.alliance === "evil"){
      info = allChars.filter(p => p.alliance === "evil" && p.name !== player.name)
        .map(p => p.name);
      return new Info([["You are an Imperial Spy. You are evil. Your fellow " +
      (info.length === 1 ? "spy is:" : "spies are:"),
        listWithGrammar(info),
        "Earn the trust of the resistance and fail their quests."
      ], "evil"], info)
    }
  }
}