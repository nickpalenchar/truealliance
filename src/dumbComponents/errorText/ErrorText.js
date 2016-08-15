import React from 'react';

class ErrorText extends React.Component {

  render() {
    return <div className="dc-errorText">{this.props.errorMessage}</div>
  }
}

export default ErrorText;