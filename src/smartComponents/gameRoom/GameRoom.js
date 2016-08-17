import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import * as controller from './gameRoom.controller';

///// /game/:id
// @id: the mongoose _id of the game room. Will get all information from that.

var GameRoom = React.createClass({
  componentWillMount: function() {
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
          // return self.setState({room: room});
        })
    }
  },
  render: () => {

    var roomView = (<Card>
      <CardTitle title={"ROOM: " + this.state} subtitle={"Game Master: Someone"}/>
    </Card>);

    var loadingView = <Card>
      <div>Just a moment...</div>
    </Card>;

    return <div className="sc-gameRoom">
      {this.state.room ? roomView : loadingView}
    </div>
  }
});

export default GameRoom;