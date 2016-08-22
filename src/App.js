import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Navbar from './smartComponents/navBar/Navbar';

injectTapEventPlugin();


class App extends Component {

  render() {


    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="splash-header App-header">
            <h1>discover your true alliance</h1>
          </div>
          <Navbar/>
          <div className="app-view">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
