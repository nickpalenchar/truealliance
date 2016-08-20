import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style/index.css';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Register from './smartComponents/register/Register';
import Home from './smartComponents/Home';
import GameRoom from './smartComponents/gameRoom/GameRoom';
import RoomSelection from './smartComponents/roomSelection/RoomSelection';
import { parseRoomNumber } from './helpers/localRoom'
import { requireRegistration } from './thunks/requireRegistration';

import { setActiveId } from './thunks/setActiveId';

function startApp() {
  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Register} />
        <Route path="step" component={Home}/>
        {/*CreateRoom*/}
        <Route path="/gameRoom/:roomId" component={GameRoom}/>
        <Route path="/browse" component={requireRegistration(RoomSelection)}/>
      </Route>
    </Router>,
    document.getElementById('root')
  )
}

parseRoomNumber()
  .then(res => {
    console.log("hello", res.id);
    sessionStorage.setItem("activeId", res.id);
    var activeRoom = localStorage.getItem("activeRoom");
    if (activeRoom) window.location.href = "/#/gameRoom/" + activeRoom;
    else {
      var activePlayer = JSON.parse(localStorage.getItem(res.id));
      if(activePlayer) window.location.href = "/#/browse";
    }
    startApp();
  });

// parseRoomNumber()
//   .then(() => )


