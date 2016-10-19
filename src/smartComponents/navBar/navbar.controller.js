import $ from 'jquery';
import env from '../../env';
const BACKEND_URL = env.BACKEND_URL;

import { getMe } from '../../helpers/getMe';

export function clearAllData() {
  if(confirm("Are you sure?")) {
    var me = getMe();
    if(me) $.post(BACKEND_URL + '/api/players/delete', {name: me.name, code: me.code})
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

  }
}