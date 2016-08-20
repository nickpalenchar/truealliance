import React from 'react';
import { parseRoomNumber } from '../helpers/localRoom'

export function setActiveId(Component) {

  class ActiveIdGate extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        status: "PENDING",
      }
    }

    componentWillMount() {
      parseRoomNumber()
        .then(roomObj => {
          window.localStorage.setItem("activeRoomId", roomObj.id);
          this.setState({status: "READY"})
        })
        .catch(err => this.setState({status: "ERROR"}))
    }

    render() {
      return <div className="t-activeIdGate">
        {this.state.status === "PENDING" && <span>Just a moment...</span>}
        {this.state.status === "READY" && <Component {...this.props}/>}
        {this.state.status === "ERROR" && <span>Something went wrong. How is your internet?</span>}
      </div>
    }

  }
}