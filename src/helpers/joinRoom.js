import $ from 'jquery';

import env from '../env';
var BACKEND_URL = env.BACKEND_URL;


export function joinRoom(playerId, roomId, andGo, andEdit) {
  return $.post(BACKEND_URL + '/api/rooms/player/' + playerId, { roomId: roomId })
    .then(function(updatedRoom){
      // var socket = io(BACKEND_URL);
      // socket.emit('update-room')
      window._activeRoom = updatedRoom;
      if(andGo) window.location.href = "/#/gameRoom/" + updatedRoom._id;
      else if(andEdit) window.location.href = "/#/editRoom/" + updatedRoom._id;
    })
    .catch(function (err) {
      console.log("the error!!!")
    })
}

export function createRoom(roomId, player) {
  //NOTE roomId is the ip Id
  return $.post(BACKEND_URL + '/api/rooms', { user: player, id: roomId })
    .then(room => {
      return room;
    })
}