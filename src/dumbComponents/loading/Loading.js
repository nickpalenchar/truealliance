import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { clearAllData } from '../../smartComponents/navBar/navbar.controller';

let style = {
  padding: "30px",
};

class Loading extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      error: false,
      waiting: false,
    }
  }

  time = null;

  componentDidMount(){
    // after some time, display a message that there might be something wrong.
    this.time = setTimeout(() => this.setState({waiting: true}), 10000);
  }

  componentWillUnmount(){
    clearTimeout(this.time);
  }

  render() {
    return <Card style={style}>
        <div className="dc-loading">
          <div className="label" style={{textAlign: "center"}}>{this.props.label || "Just a moment..."}</div>
          { this.props.imgSrc && <div><img src={this.props.imgSrc}/></div> }
          { this.state.waiting && (
            <div className="waitingMessage">
              <CardText>
                <div className="title">This is taking longer than usual...</div>
                <div className="body">You can continue waiting, or try an option below</div>
              </CardText>
              <CardActions>
                <RaisedButton
                  label="refresh"
                  primary={true}
                  onClick={()=> window.location.reload()}
                />
                <RaisedButton
                  label="start over"
                  onClick={clearAllData}
                />
              </CardActions>
            </div>
          )}
        </div>
      </Card>
  }

}

export default Loading;