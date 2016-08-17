import $ from 'jquery'

import env from '../../env';
var BACKEND_URL = env.BACKEND_URL

export function getRoomsByLocalId(id){
  return $.get(BACKEND_URL + '/api/rooms/find/' + id)
    .then(function (rooms) {
      if(Array.isArray(rooms)) return rooms;
      else return [rooms];
    })
};