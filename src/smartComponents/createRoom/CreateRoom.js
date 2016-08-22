import React from 'react';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import { updateOptions } from '../../helpers/options';
import * as controller from '../gameRoom/gameRoom.controller';

class CreateRoom extends React.Component {

  constructor(props){
    super(props);
    this.state = {room: null, options: null}
  }

  componentWillMount() {
    var self = this;

    if(window._activeRoom) {
      this.setState({room: window._activeRoom, options: window._activeRoom.options});
      delete window._activeRoom;
    }
    else {
      return controller.getRoomDocumentById(this.props.params.roomId)
        .then(room => {
          if(!room) return window.location.href = "/#/browse";
          return self.setState({room: room, options: room.options});
        })
    }
  }

  handleToggle = (e, toggle) => {
    this.setState({options: Object.assign({}, this.state.options, {specialCharacters: toggle })});
  };
  handleSlider = (e, value) => {
    console.log("val before ", value);
    if(value < 5) value = 5;
    console.log("val after", value);
    this.setState({options: Object.assign({}, this.state.options, {maxPlayers: value})});
  };
  handleSliderEnd = (e, value) => {
    console.log("teh end is ", value, this);
  }
  characterToggle = (e, toggle, character) => {
    var update = {};
    update[character] = toggle;
    this.setState({options: Object.assign({}, this.state.options, update)});
  };

  render() {
    var options = (this.state.options) || {};

    return <Card expanded={options.specialCharacters} className="sc-createRoom">
      <CardTitle title="Room Options" subtitle="You can always change this later."/>
      <CardText>
        <Toggle
          toggled={options.specialCharacters}
          onToggle={this.handleToggle}
          label="Special characters?"
        />
      </CardText>
      <CardText expandable={true} className="columnContainer clearfix">
        <Divider />
        <div className="leftColumn">
          <Toggle label="Merlin" labelPosition='right'
                  toggled={options.merlin} onToggle={(e, toggle) => this.characterToggle(e, toggle, "merlin")} />
          <Toggle label="Percival" labelPosition='right'
                  toggled={options.percival} onToggle={(e, toggle) => this.characterToggle(e, toggle, "percival")} />
        </div>
        <div className="rightColumn">
          <Toggle label="Mordred" labelPosition='right'
                  toggled={options.mordred} onToggle={(e, toggle) => this.characterToggle(e, toggle, "mordred")} />
          <Toggle label="Morgana" labelPosition='right'
                  toggled={options.morgana} onToggle={(e, toggle) => this.characterToggle(e, toggle, "morgana")} />
          <Toggle label="Assassin" labelPosition='right'
                  toggled={options.assassin} onToggle={(e, toggle) => this.characterToggle(e, toggle, "assassin")} />
          <Toggle label="Oberon" labelPosition='right'
                  toggled={options.oberon} onToggle={(e, toggle) => this.characterToggle(e, toggle, "oberon")} />
        </div>
      </CardText>
      <Divider/>
      <CardText label="Max Players">
        <span>Max Players: {options.maxPlayers}</span>
        <Slider value={options.maxPlayers} step={1} min={5} max={10} style={{ maxWidth: "300px"}}
                onChange={this.handleSlider}
                onDragStop={this.handleSliderEnd.bind(this)}
        />
      </CardText>
      <CardActions>
        <RaisedButton
          primary={true}
          label="Save"
          onClick={() => {
            updateOptions(this.props.params.roomId, options)
              .then((room) => {
                console.log("update? ", room);
                window.location.href = "/#/gameRoom/" + this.props.params.roomId;
              })
          }}
        />
        <RaisedButton
          label="Cancel"
          onClick={()=> {
            window.location.href = "/#/gameRoom/" + this.props.params.roomId;
          }}
        />
      </CardActions>
    </Card>;
  }

}

export default CreateRoom;