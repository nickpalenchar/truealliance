import React from 'react';
import {parseRoomNumber} from '../helpers/localRoom'

export function requireRegistration(Component) {

  // ensures the Id of the room matches that of the session. Redirects to browse otherwise.

  class RequireRegistrationGate extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        status: "PENDING",
      }
    }

    direct = () => {
      var player = JSON.parse(localStorage.getItem(sessionStorage.getItem("activeId")));
      if(player) return this.setState({status: "READY"});
      /// no player found. Start at registration
      localStorage.removeItem("activeRoom");
      window.location.href = "/";
    };

    componentWillMount() {
      var activeId = sessionStorage.getItem("activeId");
      if (!activeId) return parseRoomNumber()
          .then(res => {
            sessionStorage.setItem("activeId", res.id);
            return this.direct();
          });
      this.direct();
    }

    render() {
      return <div className="t-matchindIdGate">
        {this.state.status === "PENDING" && <span>Just a moment...</span>}
        {this.state.status === "READY" && <Component {...this.props}/>}
        {this.state.status === "ERROR" && <span>Something went wrong. How is your internet?</span>}
      </div>
    }

  }
  return RequireRegistrationGate;
}