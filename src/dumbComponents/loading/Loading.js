import React from 'react';

class Loading extends React.Component {

  render() {
    return <div className="dc-loading">
      <div className="label">{this.props.label || "Just a moment..."}</div>
      { this.props.imgSrc && <div><img src={this.props.imgSrc}/></div> }
    </div>
  }

}

export default Loading;