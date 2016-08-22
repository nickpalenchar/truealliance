import $ from 'jquery';

import env from '../env';
var BACKEND_URL = env.BACKEND_URL;


export function joinRoom(playerId, roomId, andGo, andEdit) {
  return $.post(BACKEND_URL + '/api/rooms/player/' + playerId, { roomId: roomId })
    .then(function(updatedRoom){
      window._activeRoom = updatedRoom;
      if(andGo) window.location.href = "/#/gameRoom/" + updatedRoom._id;
      else if(andEdit) window.location.href = "/#/editRoom/" + updatedRoom._id;
    })
    .catch(function (err) {
      console.log("the error!!!")
    })
}