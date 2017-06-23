import $ from 'jquery';
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import {getMe} from '../../helpers/getMe';
import {getInfo} from '../../helpers/roles';


import env from '../../env';
var BACKEND_URL = env.BACKEND_URL;

export function getRoomDocumentById(mongooseId) {
  return $.get(BACKEND_URL + '/api/rooms/one/'+mongooseId)
    .then(function (res) {
      console.log("the result ", res);
      return res;
    })
}

export function leaveRoom(roomId, roomDocId) {
  var me = JSON.parse(window.localStorage.getItem(roomId));
  console.log("got ", me, " from " + roomId );
  $.post(BACKEND_URL + '/api/rooms/player/' + me._id + '/delete', { roomId: roomDocId })
    .then(function (res) {
      localStorage.removeItem("activeRoom");
      console.log("I think it worked");
      window.location.href = "/#/browse";
    })
    .catch(err => console.err("err"));
}

export function startGame(info) {
  try {
    var character = _.find(info.characters, {_id: getMe("_id") });
    var humanInfo = getInfo(info, character);
    console.log("INFO", humanInfo);
    console.log("the character", character);
    console.log("started game with info ", info);
  } catch (e) {
    alert("Something went wrong. Please refresh the page to view your alliance");
  }
  ReactDOM.render(<div className="gameScrim">
    <div className="message">
      { humanInfo.message[0].map((message, i) => <div key={i} className="messageItem">{message === " & undefined" ? "Hmm... you can't see anyone. It's just you and Oberon" : message}</div>) }
      <div className="messageItem button"><MuiThemeProvider><RaisedButton secondary={true} label="hide this" onClick={hideInfo}/></MuiThemeProvider>
      </div>
    </div>
  </div>, document.getElementById('overlay'));
  setTimeout(function(){$('.gameScrim').addClass('opened')},10);

  var int = 1;
  var messageInterval = setInterval(function(){
    $('.messageItem:nth-child('+int+')').addClass('opened');
    int++;
    if(int > 10) clearTimeout(messageInterval);
  },2500);

  return humanInfo;
}

function hideInfo() {
  $('.gameScrim').fadeOut(2000);
}

export function continueGame(info) {
  if(!info) return console.warn("[continueGame] no param `info` passed. Refusing to execute");
  console.log("[gameRoom.ctrl continueGame ", info);
  var character = _.find(info.characters, {_id: getMe("_id") });
  return getInfo(info, character);
}