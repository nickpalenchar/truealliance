import $ from 'jquery';
import env from '../env';
const BACKEND_URL = env.BACKEND_URL;

export function updateOptions(roomDocId, options) {
  var optionsParse = JSON.stringify(options);
  console.log("sending str ", optionsParse);
  return $.post(BACKEND_URL + "/api/rooms/options/" + roomDocId, {options: optionsParse});
}