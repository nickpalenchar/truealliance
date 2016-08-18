import $ from 'jquery';
import _ from 'lodash';

import env from '../../env';
var BACKEND_URL = env.BACKEND_URL;

export function getRoomDocumentById(mongooseId) {
  console.log("DID IT WORK??", BACKEND_URL);
  return $.get(BACKEND_URL + '/api/rooms/one/'+mongooseId)
    .then(function (res) {
      console.log("the result ", res)
      return res;
    })
}

export function leaveRoom(roomId, roomDocId) {
  var me = JSON.parse(window.localStorage.getItem(roomId));
  console.log("got ", me, " from " + roomId );
  $.post(BACKEND_URL + '/api/rooms/player/' + me._id + '/delete', { roomId: roomDocId })
    .then(function (res) {
      console.log("I think it worked");
      window.location.href = "/#/browse";
    })
    .catch(err => console.err("err"));
}