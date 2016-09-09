import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Loading from '../../dumbComponents/loading/Loading';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import { parseRoomNumber } from '../../helpers/localRoom';
import { joinRoom } from '../../helpers/joinRoom';

import env from '../../env';
var BACKEND_URL = env.BACKEND_URL;

import * as controller from './roomSelection.controller';

class RoomSelection extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      rooms: [],
      me: JSON.parse(localStorage.getItem(sessionStorage.getItem("activeId"))),
      page: "loading",
    }
  }

  componentWillMount() {
    if(window._localRooms) {
      this.setState({rooms: window._localRooms, page: 'roomSelection'});
      delete window._localRooms;
    }
    else {
      console.log("[roomSelection] getting rooms" );
      parseRoomNumber()
        .then(res => {
          console.log("the res ", res);
          this.setState({me: JSON.parse(window.localStorage.getItem(res.id))});
          return controller.getRoomsByLocalId(res.id)
        })
        .then(rooms => {
          console.log(rooms);
          this.setState({rooms, page: 'roomSelection'});
        })
    }
  }
  componentDidMount() {
    var roomSocket = io(BACKEND_URL);
    roomSocket.on('update-room', function(newRoomObj){
      console.log("[socket:update-room] triggered newRoomObj = ", newRoomObj);
      var tempRooms = [];
      for(var i = 0; i < this.state.rooms.length; i++){
        console.log("triggering with")
      }
    })
  }

  render() {

    let pages = {
      loading: <Loading/>,
      roomSelection: <div>{this.state.rooms.map((room, i) => {
        if(room.active) return null;
        return (
            <Card key={i}>
              <CardTitle title={room.name} subtitle={"By " + (room.admin||{name: "nobody"}).name + " | " + room.players.length + " players"}/>
              <CardActions>
                <RaisedButton primary={true} disabled={room.players.length === room.options.maxPlayers}
                              label={room.players.length === room.options.maxPlayers ? "Room Full" : "Join"} onClick={() => joinRoom(this.state.me._id,room._id,true)}/>
              </CardActions>
            </Card>)
        }
      )}</div>,
    };

    return <div className="sc-roomSelection">{pages[this.state.page]}</div>
  }

}

export default RoomSelection;