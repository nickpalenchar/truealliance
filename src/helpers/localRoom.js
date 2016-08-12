// function to get the IP of the user. Will be used by the server to open up a socket that only others

export function parseRoomNumber(noParse){
  return new Promise(function(resolve, reject) {
    try {
      $.getJSON('http://ipinfo.io', function (data) {
        if(noParse) return resolve(data);
        var parsed = {id: data.ip.match(/^\d+\.\d+\.\d+/)[0].replace(/\./g,"")};
        resolve(parsed);
      })
    } catch (e) {
      reject(e);
    }
  })
}