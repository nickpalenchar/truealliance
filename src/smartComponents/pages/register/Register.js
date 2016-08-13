import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import * as controller from './register.controller';

class Register extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      name: "",
      page: "name",
    }
  }

  handleInput = e => {
    this.setState({
      name: e.target.value,
    });
  };

  goToPage = page => {
    this.setState({
      page: page
    })
  };

  getAvailableRooms = () => {
    controller.getAvailableRooms()
      .then(rooms => {
        console.log("get back from rooms in component ", rooms);
      })
  };


  render() {

    let pages = {
      name: <div className="p-register default-style">
        <Paper className="container">
          <h2>What name are you called?</h2>
          <div className="g-sectionMargin">
            <TextField
              floatingLabelText={"A name they will know you by."}
              floatingLabelFixed={true}
              hintText={"Sir Lancelot"}
              value={this.state.name}
              onChange={this.handleInput}
            />
          </div>
          <div className="g-sectionMargin">
            <RaisedButton
              disabled={!this.state.name}
              primary={true}
              label="Next"
              onClick={this.getAvailableRooms}
            />
          </div>
        </Paper>
      </div>,

      rooms: <div className="p-register default-style">
        <Paper className="container">
          <h2>Find your clan.</h2>
        </Paper>
      </div>,

      test: <div>YOOOO YOU FOUND THE TEST!!!!!</div>
    };

    return <div>{pages[this.state.page]}</div>;
  }
}

export default Register;