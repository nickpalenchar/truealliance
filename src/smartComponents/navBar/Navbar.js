import React from 'react'
import FlatButton from 'material-ui/FlatButton';

import * as controller from './navbar.controller';

class Navbar extends React.Component {

  render() {
    return (
      <div className="sc-navbar">
        <div className="container">
          <FlatButton className="right" label="Start Over"  onClick={controller.clearAllData}/>
        </div>
      </div>
    )
  }
}

export default Navbar;