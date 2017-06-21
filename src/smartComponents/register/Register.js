import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Loading from '../../dumbComponents/loading/Loading';
import ErrorText from '../../dumbComponents/errorText/ErrorText';

import { parseRoomNumber } from '../../helpers/localRoom';
import { joinRoom } from '../../helpers/joinRoom';

import * as controller from './register.controller';

class Register extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      name: "",
      page: "name",
      localPlayerNames: [], //@TODO: DEPRECATED: delete 30 days after morgana
      guests: [],
      error: null,
    }
  }
  componentWillMount() {
    return parseRoomNumber()
      .then(res => {
        if(localStorage.getItem(res.id)){
          return window.location.href = "/#/browse"
        }
        return controller.getWaitingRoom()
          .then(waitingRoom => {
            console.log("THEE ROOM ", waitingRoom);
            this.setState({guests: waitingRoom.guests})
          });
      })
  }

  handleInput = e => {
    var newName = e.target.value.replace(/[^\w\d\s]/g, "").replace(/\s/g, "_").toUpperCase();
    this.setState({
      name: newName,
    });
    if (this.state.guests.indexOf(newName) !== -1) this.setState({error: "Someone else already has that name."});
    if (this.state.localPlayerNames.indexOf(newName) !== -1) this.setState({error: "Someone else already has that name."}); //@TODO: delete after morgana!
    else if (this.state.error) this.setState({error: null});
  };


  goToPage = page => {
    this.setState({
      page: page
    })
  };

  getAvailableRooms = () => controller.getAvailableRooms();

  //@TODO DELETE THIS 30 DAYS AFTER MORGANA RELEASE
  getLocalPlayers = () => {
    console.warn("DEPRECATION NOTICE: Use `getWaitingRoom` instead")
    return controller.getLocalUsers()
      .then(players => this.setState({localPlayerNames: players.map(function (player) {
        return player.name;
      })}));
  };

  handleRegister = () => {

    this.setState({page: "loading"});

    let thePlayer;
    return parseRoomNumber()
      .then(res => controller.registerPlayer(this.state.name, res.id))
      .then(player => {
        localStorage.setItem(player.id, JSON.stringify(player));
        thePlayer = player;
        console.log("THE PLAYER ", player);
        return this.getAvailableRooms()
      })
      .then(rooms => {
        if(!Array.isArray(rooms)) joinRoom(thePlayer._id, rooms._id, false, true);
        else {
          window._localRooms = rooms;
          window.location.href = "/#/browse"
        }
      })
      .catch(error => {
        console.log("WHATS THE ERRER?", error);
        if(error.status === 400) return this.getLocalPlayers()
          .then(() => this.setState({page: "name", error: "Someone just took that name. They're probably evil.", name: ""}));
        else this.setState({page: "name", error: "UNKNOWN ERROR! We don't know who is evil. Try again or try starting over."});
      })
  };


  render() {

    let pages = {
      loading: <Loading/>,
      name: <div className="p-register default-style">
        <Paper className="container">
          <h2>What name are you called?</h2>
          <div className="g-sectionMargin">
            <TextField
              floatingLabelText={"A name they will know you by:"}
              floatingLabelFixed={true}
              maxLength={18}
              hintText={"YOUR NAME HERE"}
              value={this.state.name}
              onChange={this.handleInput}
            />
            <ErrorText errorMessage={this.state.error}/>
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
