import $ from 'jquery';

import env from '../env';
var BACKEND_URL = env.BACKEND_URL;


export function joinRoom(playerId, roomId, andGo) {
  return $.post(BACKEND_URL + '/api/rooms/player/' + playerId, { roomId: roomId })
    .then(function(updatedRoom){
      console.log("[register.controller:joinRoom] new room ", updatedRoom);
      window._activeRoom = updatedRoom;
      if(andGo) window.location.href = "/#/gameRoom/" + updatedRoom._id;
    })
    .catch(function (err) {
      console.log("the error!!!")
    })
}