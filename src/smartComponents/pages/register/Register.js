import React from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Register extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      name: "",
      page: "name",
    }
  }

  handleInput = e => {
    this.setState({
      name: e.target.value,
    });
  };


  render() {

    let pages = {
      name: <div className="p-register default-style">
        <Paper className="container">
          <h2>What name are you called?</h2>
          <div className="g-sectionMargin">
            <TextField
              floatingLabelText={"A name they will know you by."}
              floatingLabelFixed={true}
              hintText={"Sir Lancelot"}
              value={this.state.name}
              onChange={this.handleInput}
            />
          </div>
          <div className="g-sectionMargin">
            <RaisedButton
              disabled={!this.state.name}
              primary={true}
              label="Next"
            />
          </div>
        </Paper>
      </div>
    };

    return <div>{pages.name}</div>;
  }
}

export default Register;