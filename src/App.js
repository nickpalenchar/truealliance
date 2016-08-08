import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="splash-header App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h1>discover your true alliance</h1>
        </div>
        <div className="app-view">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
