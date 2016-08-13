import React from 'react';

class PlayerPanel extends React.Component {

  render() {
    return <div className="dc-playerPanel">
      <Paper>{this.props.name}</Paper>
    </div>
  }

}


export default class RoomPanel extends React.Component {

  render() {
    return <div className="dc-roomPanel">
      <div className="overview">
        <div className="title">{this.props.title}</div>
        <div className="players number">{this.props.players.length} / {this.props.maxPlayers || "10"}</div>
        <div className="players label">players</div>
      <div className="players">
        {this.props.players.map(player => <PlayerPanel name={player.name}/>)}
      </div>
    </div>
  }

}