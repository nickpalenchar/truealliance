import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import { parseRoomNumber } from '../../helpers/localRoom';
import { joinRoom } from '../../helpers/joinRoom';

import * as controller from './roomSelection.controller';

class RoomSelection extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      rooms: [],
      me: null
    }
  }

  componentWillMount() {
    if(window._localRooms) {
      this.setState({rooms: window._localRooms});
    delete window._localRooms;
    }
    else {
      console.log("[roomSelection] getting rooms" );
      parseRoomNumber()
        .then(res => {
          this.setState({me: JSON.parse(window.localStorage.getItem(res.id))});
          return controller.getRoomsByLocalId(res.id)
        })
        .then(rooms => {
          console.log(rooms);
          this.setState({rooms})
        })
    }
  }

  render() {
    return <div className="sc-roomSelection">This is where the room<br/> {this.state.rooms.map((room, i) => (
      <Card key={i}>
        <CardTitle title={room.name} subtitle={"By " + (room.admin||{name: "nobody"}).name + " | " + room.players.length + " players"}/>
        <CardActions>
          <RaisedButton primary={true} label="Join" onClick={() => joinRoom(this.state.me._id,room._id,true)}/>
        </CardActions>
        </Card>)
    )}</div>
  }

}

export default RoomSelection;