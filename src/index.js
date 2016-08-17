import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style/index.css';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Register from './smartComponents/register/Register';
import Home from './smartComponents/Home';
import GameRoom from './smartComponents/gameRoom/GameRoom';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Register} />
      <Route path="step" component={Home}/>
      {/*CreateRoom*/}
      <Route path="/gameRoom/:roomId" component={GameRoom}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
