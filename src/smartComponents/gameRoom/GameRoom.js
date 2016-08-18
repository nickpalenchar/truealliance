import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import {blue300, indigo900, blueGrey200} from 'material-ui/styles/colors';
import playerChip from './gameRoom.inlineStyles';
import env from '../../env';
var BACKEND_URL = env.BACKEND_URL;

import LeaveRoom from './gameRoom.components';

import * as controller from './gameRoom.controller';

///// /game/:id
// @id: the mongoose _id of the game room. Will get all information from that.

class GameRoom extends React.Component {
  constructor(props){
    super(props);
    this.state = {room: "", errorMessage: null}
  }

  componentWillMount() {

    var self = this;
    if(window._activeRoom) {
      console.log("getting active room locally. its ", window._activeRoom);
      this.setState({room: window._activeRoom});
      window.localStorage.setItem("activeRoom", window._activeRoom._id);
      delete window._activeRoom;
    }
    else {
      /// long polling from param roomId
      return controller.getRoomDocumentById(this.props.params.roomId)
        .then(function(room){
          if(!room) return self.setState({noRoom: true})
          return self.setState({room: room});
        })
        .catch(function(err){
          console.log('the error ', err);
          return self.setState({errorMessage: err.statusText});
        })
    }
  }
  componentDidMount() {
    //// SOCKET ////
    window.socket = io(BACKEND_URL);
    console.log('socketttttttt');
    console.dir(socket);
    window.socket.on("test", function(){console.info("test recieved", arguments)})
    setTimeout(()=>window.socket.emit("test"),3000);
  }

  render() {
    var roomView = (<Card>
      <CardTitle title={<div>
          <div className="titleLeft">
            {this.state.room.name}</div>
          <div className="titleRight">
            <div><LeaveRoom roomId={this.state.room.id} roomDocId={this.state.room._id}/></div>
          </div>
        </div>}
                 subtitle={"Game Master: " + (this.state.room.admin||{name: "nobody"}).name}/>
      <Subheader>Roster {this.state.room.players && "("+this.state.room.players.length+")"}</Subheader>
      <div className="roster">{this.state.room.players &&
        this.state.room.players.map((player, i) => {
          var imAdmin = player._id === this.state.room.admin._id;
          if(imAdmin) return <Chip className="playerChip" style={{margin: "0 8px"}} key={i} backgroundColor={blue300}><Avatar size={32} backgroundColor={indigo900} color={blue300}>{player.name.slice(0,1)}</Avatar>{player.name}</Chip>;
          return <Chip key={i}><Avatar size={32} backgroundColor={blueGrey200}>{player.name.slice(0,1)}</Avatar>{player.name}</Chip>;
        })}
      </div>
    </Card>);

    var loadingView = <Card>
      <div>Just a moment...</div>
    </Card>;

    var errorView = <Card>
      <CardTitle title="This quest has failed..." subtitle={"("+this.state.errorMessage+")"}/>
      <CardText>You can try joining this room again, or quickly re-register (which might clear a few things up)</CardText>
      <CardActions>
        <RaisedButton primary={true} label="Try Again"/>
        <FlatButton label={"Start Over"}/>
      </CardActions>
    </Card>;
    var noRoom = <Card>
      <CardTitle title="This quest has failed..." subtitle={"(No Room)"}/>
      <CardText>This room no longer exists. Try creating a new room</CardText>
      <CardActions>
        <RaisedButton primary={true} label="Create Room"/>
        <FlatButton label={"Join Another"}/>
        <FlatButton label={"Start Over"}/>
      </CardActions>
    </Card>;

    return <div className="sc-gameRoom">
      {this.state.errorMessage && errorView}
      {this.state.noRoom && noRoom}
      {!this.state.errorMessage && !this.state.noRoom && <div>{this.state.room ? roomView : loadingView}</div>}
    </div>
  }
}

export default GameRoom;