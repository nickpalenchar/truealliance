import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Loading from '../../dumbComponents/loading/Loading';

import { parseRoomNumber } from '../../helpers/localRoom';

import * as controller from './register.controller';

class Register extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      name: "",
      page: "name",
      localPlayerNames: [],
      error: null,
    }
  }
  componentWillMount() {
    return this.getLocalPlayers()
  }

  handleInput = e => {
    var newName = e.target.value.replace(/[^\w\d\s]/g, "").replace(/\s/g, "_").toUpperCase();
    this.setState({
      name: newName,
    });
    if (this.state.localPlayerNames.indexOf(newName) !== -1) this.setState({error: "Someone else already has that name."});
    else if (this.state.error) this.setState({error: null});
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
  getLocalPlayers = () => {
    return controller.getLocalUsers()
      .then(players => this.setState({localPlayerNames: players.map(function (player) {
        return player.name;
      })}));
  };
  handleRegister = () => {
    return parseRoomNumber()
      .then(res => controller.registerPlayer(this.state.name, res.id))
      .then(player => {
        localStorage.setItem(player.id, JSON.stringify(player));
        console.log("THE PLAYER ", player);
      })
  };


  render() {

    let pages = {
      loading: <Loading/>,
      name: <div className="p-register default-style">
        <Paper className="container">
          <h2>What name are you called? {this.state.error}</h2>
          <div className="g-sectionMargin">
            <TextField
              floatingLabelText={"A name they will know you by:"}
              floatingLabelFixed={true}
              maxLength={18}
              hintText={"YOUR NAME HERE"}
              value={this.state.name}
              onChange={this.handleInput}
            />
          </div>
          <div className="g-sectionMargin">
            <RaisedButton
              disabled={!this.state.name || !!this.state.error}
              primary={true}
              label="Next"
              onClick={this.handleRegister}
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