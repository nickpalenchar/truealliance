import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { deepOrange300 } from 'material-ui/styles/colors';

import { leaveRoom } from './gameRoom.controller';

class LeaveRoom extends React.Component {

  componentDidMount() {
    if(!this.props.roomId) console.warn("[LeaveGame] no prop set for `roomId`, this is needed to remove a player!!");
  }

  render() {
    return <FlatButton
      label="Leave"
      onClick={() => leaveRoom(this.props.roomId, this.props.roomDocId)}
      backgroundColor={deepOrange300}
    />
  }

}

export default LeaveRoom;
