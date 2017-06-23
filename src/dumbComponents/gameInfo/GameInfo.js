import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


class GameInfo extends React.Component {

  render() {
    let { message, alliance } = this.props;

    return (
      <div>
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
        <br/>
        <Card>
          <CardTitle title="Your Alliance"
                     subtitle="Click the arrow on the right to reveal your alliance only (for ladying)"
                     actAsExpander={true}
                     showExpandableButton={true}
          />
          <CardText expandable={true}>
            { alliance }
          </CardText>
        </Card>
      </div>
    )
  }

}

export default GameInfo;