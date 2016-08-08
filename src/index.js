import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style/index.css';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import Register from './smartComponents/pages/register/Register';
import Home from './smartComponents/Home';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Register} />
      <Route path="step" component={Home}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
