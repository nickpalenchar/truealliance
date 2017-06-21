import $ from 'jquery';
import env from '../../env';
const BACKEND_URL = env.BACKEND_URL;

import { getMe } from '../../helpers/getMe';
import { parseRoomNumber } from '../../helpers/localRoom'

export function clearAllData() {
  if(confirm("Are you sure?")) {
    var me = getMe();
    parseRoomNumber()
      .then((roomNumberObj => {
        if(me) return $.post(BACKEND_URL + '/api/players/remove/guest/'+me.name,{roomId: roomNumberObj.id})
          .then(() => {
            window.localStorage.clear();
            window.sessionStorage.clear();
            window.location.href = "/";
          });
        else {
          //TODO: refactor
          window.localStorage.clear();
          window.sessionStorage.clear();
          window.location.href = "/";
        }
      }))
  }
}