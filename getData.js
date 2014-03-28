var http = require("http");

// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback, id) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

// steam id array
var ids = ["76561197996863574", "76561198047456561", "76561197972915812", "76561197964368900", "76561198047039166",
              "76561198079785466", "76561197961020807", "76561198059676294", "76561197982432381", "76561198057160393",
              "76561198004532679"];

// data header
console.log("\nUSER:             STEAMID:             LOCATION:");
console.log("--------------------------------------------------------------");
for(var i = 0; i < ids.length; i++){

  url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=EF5215972E3FD6D6F5BEB1A24B6B17CE&steamids=" + ids[i];
  
  download(url, function(data) {
    if (data) {
      steamData = JSON.parse(data);
      var user = steamData.response.players[0].personaname;

      while(user.length < 8){
        user = user + " ";
      }

      console.log(user.substring(0,8) + "        " + 
        steamData.response.players[0].steamid + "      " + steamData.response.players[0].loccountrycode + "");
      
    }
    else console.log("error");  
  });
}
setTimeout(function(){
  // number of players online
  url = "http://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?key=EF5215972E3FD6D6F5BEB1A24B6B17CE&appid=570";
  var steamData = "";
  download(url, function(data) {
    if (data) {
      steamData = JSON.parse(data);
      console.log("\nPlayers currently online: " + steamData.response.player_count + "");
      console.log("-------------------------------------------------------------------\n")
      
    }
    else console.log("error");  
  });
}, 500);


