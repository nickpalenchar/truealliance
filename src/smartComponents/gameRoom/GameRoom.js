import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Chip from 'material-ui/Chip';

import * as controller from './gameRoom.controller';

///// /game/:id
// @id: the mongoose _id of the game room. Will get all information from that.

class GameRoom extends React.Component {
  constructor(props){
    super(props);
    this.state = {room: "", errorMessage: null}
  }

  componentWillMount() {
    console.log("THE PARAMS ", this);
    var self = this;
    if(window._activeRoom) {
      console.log("getting active room locally. its ", window._activeRoom);
      this.setState({gameRoom: window._activeRoom});
      window.localStorage.setItem("activeRoom", window._activeRoom._id);
      delete window._activeRoom;
    }
    else {
      /// long polling from param roomId
      return controller.getRoomDocumentById(this.props.params.roomId)
        .then(function(room){
          return self.setState({room: room});
        })
        .catch(function(err){
          console.log('the error ', err);
          return self.setState({errorMessage: err.statusText});
        })
    }
  }

  render() {
    var roomView = (<Card>
      <CardTitle title={this.state.room.name} subtitle={"Game Master: Someone"}/>
      <Subheader>Roster {this.state.room.players && "("+this.state.room.players.length+")"}</Subheader>
      <div className="roster">{this.state.room.players &&
        this.state.room.players.map((player, i) => <Chip key={i}>{player.name}</Chip>)}</div>
    </Card>);

    var loadingView = <Card>
      <div>Just a moment...</div>
    </Card>

    var errorView = <Card>
      <CardTitle title="This quest has failed..." subtitle={"("+this.state.errorMessage+")"}/>
      <CardText>You can try joining this room again, or quickly re-register (which might clear a few things up)</CardText>
      <CardActions>
        <RaisedButton primary={true} label="Try Again"/>
        <FlatButton label={"Re-Register"}/>
      </CardActions>
    </Card>;

    return <div className="sc-gameRoom">
      {this.state.errorMessage && errorView}
      {!this.state.errorMessage && <div>{this.state.room ? roomView : loadingView}</div>}
    </div>
  }
}

export default GameRoom;