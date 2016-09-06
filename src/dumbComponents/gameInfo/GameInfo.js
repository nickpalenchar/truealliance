import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


class GameInfo extends React.Component {

  render() {
    let { message } = this.props;

    return (
      <Card>
        <CardTitle title="Your Info"
                   subtitle="Click the arrow on the right to reveal your knowledge"
                   actAsExpander={true}
                   showExpandableButton={true}
        />
        <CardText expandable={true}>
          { message.map((line, k) => <div key={k}>{line}</div>) }
        </CardText>
      </Card>
    )
  }

}

export default GameInfo;