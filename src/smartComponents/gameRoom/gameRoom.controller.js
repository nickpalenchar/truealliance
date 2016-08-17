import $ from 'jquery'

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