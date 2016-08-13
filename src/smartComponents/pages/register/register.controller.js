import { parseRoomNumber } from '../../../helpers/localRoom';
import { BACKEND_URL } from '../../../env/development';
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