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
      return more;
    })
    .catch(function(err) {throw err});
}

//@TODO: DELETE 30 DAYS AFTER MORGANA RELEASE
export function getLocalUsers() {
  console.warn("[getLocalUsers] DEPRECATED: use `controller.getGuests` instead");
  return parseRoomNumber()
    .then(function (res) {
      return $.get(BACKEND_URL + '/api/players/local/' + res.id)
    })
    .catch(error => { throw error })
    .then(function(players){
      console.log("players: ", players);
      return players;
    })
}
export function getGuests(){
  return parseRoomNumber()
    .then(function(res){
      return $.get(BACKEND_URL + '/api/rooms/guest/' + res.id)
    })
    .then(function(guests){
      return guests;
    })
}

export function registerPlayer(name, id) {
  return $.post(BACKEND_URL + '/api/players/', {name: name, id: id})
    .then(function(res) { return res});
}
