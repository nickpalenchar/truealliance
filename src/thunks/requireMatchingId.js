import React from 'react';
import { parseRoomNumber } from '../helpers/localRoom'

export function requireMatchingId(Component, roomId) {

  // ensures the Id of the room matches that of the session. Redirects to browse otherwise.

  class MatchingIdGate extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        status: "PENDING",
      }
    }

    componentWillMount() {
      var activeId = sessionStorage.getItem("activeId");
      console.log("actuve id ", activeId);
      console.log("roomid", roomId);
      if(activeId === roomId) return this.setState({ status: "READY" });
      window.location.href = "/#/browse";
    }

    render() {
      return <div className="t-matchingIdGate">
        {this.state.status === "PENDING" && <span>Just a moment...</span>}
        {this.state.status === "READY" && <Component {...this.props}/>}
        {this.state.status === "ERROR" && <span>Something went wrong. How is your internet?</span>}
      </div>
    }

  }
  return MatchingIdGate;
}

export function requireMatchingId2(roomId, roomMongoId) {
  var activeId = sessionStorage.getItem("activeId");
  console.log("actuve id ", activeId);
  console.log("roomid", roomId);
  if(activeId === roomId) return true;
  if(localStorage.getItem("activeRoom") === roomMongoId) localStorage.removeItem("activeRoom");
  window.location.href = "/#/browse";
}