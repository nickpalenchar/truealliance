// function to get the IP of the user. Will be used by the server to open up a socket that only others
import $ from 'jquery';
import env from '../env';
const BACKEND_URL = env.BACKEND_URL;

//!!!CAUTION!!!
// MUST resolve the id as Object{id: String#idNumber}

export function parseRoomNumber(noParse){
  return new Promise(function(resolve, reject) {
    try {
      $.get(BACKEND_URL + '/ip', function(roomNumber){
        console.log("THE ROOM NUMBER", roomNumber);
        // if(roomNumber !== "cc1") return resolve({id: roomNumber});
        $.getJSON('http://ipinfo.io', function (data) {
          if(noParse) return resolve(data);
          var parsed = {id: data.ip.match(/^\d+\.\d+\.\d+/)[0].replace(/\./g,"")};
          resolve(parsed);
        })
      });
    } catch (e) {
      reject(e);
    }
  })
}