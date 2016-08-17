import { parseRoomNumber } from '../../helpers/localRoom';
import env from '../../env';
var BACKEND_URL = env.BACKEND_URL;
import $ from 'jquery';

export function getAvailableRooms() {
  return parseRoomNumber()
    .then(function (res) {
      console.log("using the result: ", res);
      return $.get(BACKEND_URL + '/api/rooms/find/' + res.id);
    })
    .then(function (more) {
      console.log("will this work this way??", more);
      return more;
    })
    .catch(function(err) {throw err});
}

export function getLocalUsers() {
  return parseRoomNumber()
    .then(function (res) {
      return $.get(BACKEND_URL + '/api/players/local/' + res.id)
    })
    .then(function(players){
      console.log("players: ", players);
      return players;
    })
}

export function registerPlayer(name, id) {
  return $.post(BACKEND_URL + '/api/players/', {name: name, id: id})
    .then(function(res) { return res});
}